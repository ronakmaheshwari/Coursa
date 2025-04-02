import { useState } from "react";
import HeaderIcon from "./icons/HeaderIcon";
import { useNavigate } from "react-router-dom";
import SearchIcon from "./icons/SearchIcon";

export default function Header() {
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between w-full h-16 px-6 bg-white shadow-md">

            <div className="flex items-center gap-4">
                <HeaderIcon size={28} color="black" />
                <h3 className="text-xl font-bold text-gray-800">Coursa</h3>
            </div>

            <div className="flex items-center w-[500px] bg-neutral-100 border border-gray-300 rounded-lg px-3 py-2">
                <input
                    type="text"
                    placeholder="Search..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full text-gray-700 bg-neutral-100 focus:outline-none"
                />
                <SearchIcon />
            </div>

            <div className="flex gap-5">
                <button
                    className="font-medium bg-blue-600 text-white w-[120px] h-12 p-2 text-center rounded-md hover:bg-green-500 hover:text-white transition-all"
                    onClick={() => navigate("/signup")}
                >
                    Signup
                </button>
                <button
                    className="font-medium bg-blue-600 text-white w-[120px] h-12 p-2 text-center rounded-md hover:bg-green-500 hover:text-white transition-all"
                    onClick={() => navigate("/signin")}
                >
                    Sign In
                </button>
            </div>
        </header>
    );
}
