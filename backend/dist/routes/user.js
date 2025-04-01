import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET, saltrounds } from "../index.js";
import { purchaseModel, userModel } from "../db.js";
import { authMiddleware } from "../middleware.js";
const userRouter = express.Router();
export const SignupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(20),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
});
export const SigninSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(20)
});
userRouter.post("/signup", async (req, res) => {
    try {
        const { success } = SignupSchema.safeParse(req.body);
        if (!success) {
            return res.status(404).json({
                message: "Wrong Inputs Provided"
            });
        }
        const { email, password, firstName, lastName } = req.body;
        const ExistingUser = await userModel.findOne({
            email: email
        });
        if (ExistingUser) {
            return res.status(404).json({
                message: "Email Already Exists"
            });
        }
        const hash = await bcrypt.hash(password, saltrounds);
        const NewUser = await userModel.create({
            email,
            password: hash,
            firstName,
            lastName
        });
        const id = NewUser._id;
        const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            message: "User Created Successfully",
            token: token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Error Occured"
        });
    }
});
userRouter.post("/signin", async (req, res) => {
    try {
        const { success } = SigninSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Wrong Inputs Provided" });
        }
        const { email, password } = req.body;
        const ExistingUser = await userModel.findOne({ email });
        if (!ExistingUser) {
            return res.status(404).json({ message: "Email Doesn't Exist" });
        }
        if (!ExistingUser.password) {
            return res.status(400).json({ message: "Password is missing for this user" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, ExistingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong Password Provided" });
        }
        const token = jwt.sign({ userId: ExistingUser._id }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Error Occurred" });
    }
});
userRouter.get("/purchases", authMiddleware, async (req, res) => {
    try {
        const response = await purchaseModel.find({ userId: req.userid });
        return res.status(200).json({ courses: response });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Error Occured"
        });
    }
});
export { userRouter };
