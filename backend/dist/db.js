import mongoose, { Schema } from "mongoose";
if (!process.env.Mongo_URL) {
    throw new Error("Mongo_URL is not defined in the environment variables");
}
mongoose.connect(process.env.Mongo_URL);
const userSchema = new Schema({
    email: { type: String, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String
});
const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    createrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    }
});
const purchaseSchema = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);
export { userModel, adminModel, courseModel, purchaseModel };
