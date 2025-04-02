import express from "express";
import { courseModel, purchaseModel } from "../db.js";
import { authMiddleware } from "../middleware.js";
const courseRouter = express.Router();
courseRouter.get("/preview", async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const finder = await courseModel.find({
            $or: [
                { title: { "$regex": filter, "$options": "i" } },
                { description: { "$regex": filter, "$options": "i" } },
            ]
        });
        return res.status(200).json({ courses: finder });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Error Occured"
        });
    }
});
courseRouter.post("/purchase", authMiddleware, async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.userid;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        const AlreadyPurchased = await purchaseModel.findOne({ courseId, userId });
        if (AlreadyPurchased) {
            return res.status(400).json({ message: "Course Already Purchased" });
        }
        const response = await purchaseModel.create({ courseId, userId });
        return res.status(200).json({
            message: "Course Purchased Successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Error Occured"
        });
    }
});
export { courseRouter };
