import express from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SigninSchema, SignupSchema } from "./user.js";
import { adminModel, courseModel } from "../db.js";
import { JWT_SECRET, saltrounds } from "../index.js";
import { adminMiddleware } from "../middleware.js";
const adminRouter = express.Router();
const courseSchema = zod.object({
    title: zod.string().min(4),
    description: zod.string().min(8),
    price: zod.number().min(500).max(10000),
    imageUrl: zod.string()
});
const updateSchema = zod.object({
    id: zod.number(),
    title: zod.string().min(4),
    description: zod.string().min(8),
    price: zod.number().min(500).max(10000),
    imageUrl: zod.string()
});
adminRouter.post("/signup", async (req, res) => {
    try {
        const { success } = SignupSchema.safeParse(req.body);
        if (!success) {
            return res.status(404).json({
                message: "Wrong Inputs Provided"
            });
        }
        const { email, password, firstName, lastName } = req.body;
        const ExistingUser = await adminModel.findOne({ email });
        if (ExistingUser) {
            return res.status(404).json({
                message: "Email Provided Already Exists"
            });
        }
        const hash = bcrypt.hash(password, saltrounds);
        const response = await adminModel.create({
            email,
            password: hash,
            firstName,
            lastName
        });
        const id = response._id;
        const token = jwt.sign({ adminId: id }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            message: "Admin Successfully Added",
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
adminRouter.post("/signup", async (req, res) => {
    try {
        const { success } = SigninSchema.safeParse(req.body);
        if (!success) {
            return res.status(404).json({
                message: "Wrong Inputs Provided"
            });
        }
        const { email, password } = req.body;
        const ExistingUser = await adminModel.findOne({ email });
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
        const token = jwt.sign({ adminId: ExistingUser._id }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
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
adminRouter.get("/", adminMiddleware, async (req, res) => {
    try {
        const id = req.adminId;
        const response = await courseModel.find({ createrId: id });
        return res.status(200).json({ courses: response });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Error Occured"
        });
    }
});
adminRouter.post("/create", adminMiddleware, async (req, res) => {
    try {
        const id = req.adminId;
        const { success } = courseSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Wrong Inputs Provided"
            });
        }
        const { title, description, price, imageUrl } = req.body;
        const response = await courseModel.create({
            title,
            description,
            price,
            imageUrl,
            createrId: id
        });
        console.log(response._id);
        return res.status(200).json({ message: `Course Successfully added at ${response._id} ` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Error Occured"
        });
    }
});
adminRouter.put("/update", adminMiddleware, async (req, res) => {
    try {
        const id = req.adminId;
        const { success } = updateSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Wrong Inputs Provided"
            });
        }
        const { courseId, title, description, price, imageUrl } = req.body;
        const response = await courseModel.findOneAndUpdate({ _id: courseId, createrId: id }, { title, description, price, imageUrl }, { new: true });
        console.log(response?._id);
        return res.status(200).json({ message: `Course Successfully Updated at ${response?._id} ` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Error Occured"
        });
    }
});
adminRouter.delete("/delete", adminMiddleware, async (req, res) => {
    try {
        const id = req.adminId;
        const courseId = req.body.courseId;
        const response = await courseModel.findByIdAndDelete(courseId);
        console.log(`Deleted Course ID: ${response?._id}`);
        return res.status(200).json({ message: "Course deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Error Occured"
        });
    }
});
export { adminRouter };
