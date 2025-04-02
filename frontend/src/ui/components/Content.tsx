import { useEffect, useState } from "react";
import axios from "axios";
import ContentCard from "./ContentCard";
import { Backend_Url } from "../../config";
import { Bounce, toast } from "react-toastify";

interface Course {
    id: number; 
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    authorName: string;
}

export default function ContentDiv({ title }: { title: string }) {
    const [cards, setCards] = useState<Course[]>([]);

    const handlePurchase = async (courseId: number) => { 
        console.log("Attempting to purchase Course ID:", courseId); 
        try {
            const response = await axios.post(
                `${Backend_Url}/course/purchase`,
                { courseId },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Course Purchased Successfully!", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error: any) {
            console.error("Purchase Failed", error);
            toast.error(`Purchase Failed: ${error.response?.data?.message || "Please try again."}`, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${Backend_Url}/course/preview`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                console.log("Fetched Courses:", response.data.courses); 
                setCards(response.data.courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col justify-start items-center p-6 rounded-lg gap-4">
            <div className="w-full h-10 p-2 bg-white text-center flex justify-center items-center ">
                <h3 className="font-medium text-2xl text-black">{title}</h3>
            </div>

            <div className="w-full h-full bg-white flex flex-wrap gap-10 p-5 overflow-y-auto">
                {cards.length > 0 ? (
                    cards.map((course) => (
                        <ContentCard
                            key={course.id}
                            id={course.id}
                            title={course.title}
                            description={course.description}
                            imageUrl={course.imageUrl}
                            price={course.price}
                            authorName="Anonmous"
                            onClick={() => handlePurchase(course.id)} 
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No courses found.</p>
                )}
            </div>
        </div>
    );
}
