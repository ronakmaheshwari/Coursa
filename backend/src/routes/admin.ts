import express from "express"
import zod from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import { SigninSchema, SignupSchema } from "./user.js"
import { adminModel, courseModel } from "../db.js"
import { JWT_SECRET, saltrounds } from "../index.js"
import { adminMiddleware } from "../middleware.js"

const adminRouter = express.Router()

const SUPABASE_URL = "https://ckasuyzkqxqeqbjqljvw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrYXN1eXprcXhxZXFianFsanZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0OTUwMzQsImV4cCI6MjA1OTA3MTAzNH0._zsPu7AGlP24mcbP__wWmHUo7Mz3cONIkr2mXM47QH4";

if (!SUPABASE_KEY) {
    throw new Error("SUPABASE_KEY is not defined");
  }

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileExtensions: Record<string, RegExp> = {
    image: /\.(jpg|jpeg|png|gif|webp)$/i,
};

const courseSchema = zod.object({
    title:zod.string().min(4),
    description:zod.string().min(8),
    price:zod.preprocess((val) => Number(val), zod.number().min(500).max(10000)),
    imageUrl:zod.string().optional()
})

const updateSchema = zod.object({
    courseId:zod.string(),
    title: zod.string().min(4),
    description:zod.string().min(8),
    price:zod.number().min(500).max(10000),
    imageUrl:zod.string().optional()
})

adminRouter.post("/signup",async(req:any,res:any)=>{
    try{
        const {success} = SignupSchema.safeParse(req.body);
        if(!success){
            return res.status(404).json({
                message:"Wrong Inputs Provided"
            })
        }
        const {email,password,firstName,lastName} = req.body

        const ExistingUser = await adminModel.findOne({email})
        
        if(ExistingUser){
            return res.status(404).json({
                message:"Email Provided Already Exists"
            })
        }

        const hash =await bcrypt.hash(password,saltrounds)
        const response = await adminModel.create({
            email,
            password:hash,
            firstName,
            lastName
        })
        const id = response._id
        const token = jwt.sign({adminId:id},JWT_SECRET,{ expiresIn: "7d" });
        return res.status(200).json({
            message:"Admin Successfully Added",
            token:token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal Error Occured"
        })
    }
})

adminRouter.post("/signin",async(req:any,res:any)=>{
    try{
        const {success} = SigninSchema.safeParse(req.body)

        if(!success){
            return res.status(404).json({
                message:"Wrong Inputs Provided"
            })
        }

        const {email,password} = req.body
        const ExistingUser = await adminModel.findOne({email})

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
            token:token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal Error Occured"
        })
    }
})

adminRouter.get("/",adminMiddleware ,async(req:any,res:any)=>{
    try{
        const id = req.adminId
        const response = await courseModel.find({createrId:id})
        return res.status(200).json({courses: response})
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal Error Occured"
        })
    }
})

adminRouter.post(
    "/create",
    adminMiddleware,
    upload.single("file"),
    async (req: any, res: any) => {
      try {
        const id = req.adminId; 
        const { success, data } = courseSchema.safeParse(req.body);
  
        if (!success) {
          return res.status(400).json({ message: "Wrong Inputs Provided" });
        }
  
        const { title, description, price } = data; 
        let fileUrl = "";
  
        if (req.file) {
          const fileName = `${Date.now()}_${req.file.originalname}`;
          const { data: uploadData, error } = await supabase.storage
            .from("images")
            .upload(fileName, req.file.buffer, {
              contentType: req.file.mimetype,
              upsert: false,
            });
  
          if (error) {
            console.error("Supabase upload error:", error);
            return res.status(500).json({
              message: "Failed to upload file",
              error,
            });
          }
  
          fileUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;
        }
  
        if (!fileUrl) {
          return res.status(400).json({
            message: "A file or a valid link is required",
          });
        }
  
        const response = await courseModel.create({
          title,
          description,
          price,
          imageUrl: fileUrl,
          createrId: id,
        });
  
        console.log(response._id);
        return res.status(200).json({
          message: `Course Successfully added at ${response._id}`,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Internal Error Occurred",
        });
      }
    }
);

adminRouter.put("/update",adminMiddleware,async(req:any,res:any)=>{
    try{
        const id = req.adminId
        const {success} = updateSchema.safeParse(req.body)
        if(!success){
            return res.status(400).json({
                message:"Wrong Inputs Provided"
            })
        }
        const {courseId,title,description,price,imageUrl} = req.body

        const response = await courseModel.findOneAndUpdate(
            { _id: courseId, createrId: id }, 
            { title, description, price, imageUrl },
            { new: true } 
        );
        console.log(response?._id);
        return res.status(200).json({message: `Course Successfully Updated at ${response?._id} `})
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal Error Occured"
        })
    }
})

adminRouter.delete("/delete",adminMiddleware,async(req:any,res:any)=>{
    try{
        const id = req.adminId
        const courseId = req.body.courseId
        const response = await courseModel.findByIdAndDelete(courseId);
        console.log(`Deleted Course ID: ${response?._id}`);
        return res.status(200).json({ message: "Course deleted successfully" });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal Error Occured"
        })
    }
})

export {adminRouter}