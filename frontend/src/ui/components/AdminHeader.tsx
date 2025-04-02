import { useState } from "react";
import HeaderIcon from "./icons/HeaderIcon";
import SearchIcon from "./icons/SearchIcon";

export default function AdminHeader() {
    const [filter, setFilter] = useState("");

    return (
        <header className="flex items-center justify-start w-full h-16 px-6 gap-96 bg-white shadow-md">

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

        </header>
    );
}
