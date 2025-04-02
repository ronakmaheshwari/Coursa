import { useState } from "react";
import InputBox from "./InputBox";
import axios from "axios";
import { Backend_Url } from "../../config";
import { toast } from "react-toastify";

export default function CreateCard() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title || !description || !price || !file) {
            toast.error("All fields are required!");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("file", file);

        try {
            const response = await axios.post(`${Backend_Url}/admin/create`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("Course Created Successfully!");
                setTitle("");
                setDescription("");
                setPrice("");
                setFile(null);
            }
        } catch (error: any) {
            console.error("Error creating course:", error);
            toast.error(error.response?.data?.message || "Failed to create course.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg flex flex-col gap-5">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Create a New Course</h2>

                <InputBox 
                    type="text" 
                    label="Title" 
                    placeholder="Enter Course Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />

                <InputBox 
                    type="text" 
                    label="Description" 
                    placeholder="Enter Course Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />

                <InputBox 
                    type="number" 
                    label="Price ($)" 
                    placeholder="Enter Course Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                />

                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">Upload Image</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setFile(e.target.files?.[0] || null)} 
                        className="border rounded-lg p-2 text-gray-700 cursor-pointer focus:outline-none"
                    />
                </div>

                <button 
                    className={`mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg transition-all font-semibold ${
                        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Course"}
                </button>
            </div>
        </div>
    );
}
