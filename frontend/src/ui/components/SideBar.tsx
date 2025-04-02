import { useNavigate } from "react-router-dom";
import { BookOpen, ShoppingCart, LogOut } from "lucide-react";
import CustomButton from "./Custombutton";

export default function SideBar() {
    const navigate = useNavigate();
    const logoutFunction= ()=>{
        localStorage.removeItem("token")
        navigate("/signin")
    }

    return (
        <aside className="flex flex-col w-64 h-full bg-white border-r border-gray-200 shadow-lg">

            <div className="flex flex-col flex-1 p-4 space-y-4">
                <h3 className="text-gray-500 font-semibold text-xs uppercase tracking-wide mb-2">
                    Main Menu
                </h3>
                <CustomButton 
                    title="Courses" 
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center gap-3 py-3 px-4 text-white font-semibold text-lg bg-blue-700 hover:bg-blue-900 hover:text-white rounded-lg transition"
                    icon={<BookOpen size={20} className="text-white" />}
                />
                <CustomButton 
                    title="Purchase" 
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center gap-3 py-3 px-4 text-white font-semibold text-lg bg-blue-700 hover:bg-blue-900 hover:text-white rounded-lg transition"
                    icon={<ShoppingCart size={20} className="text-white" />}
                />
            </div>

            <div className="p-4 border-t border-gray-300">
                <CustomButton 
                    title="Logout" 
                    onClick={() => {logoutFunction()}} 
                    className="w-full flex items-center gap-3 py-3 px-4 text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
                    icon={<LogOut size={20} />}
                />
            </div>
        </aside>
    );
}
