import CreateCard from "./AdminCreate";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideboard";

export default function CreateCards(){
    return (
            <div className="flex flex-col w-screen h-screen overflow-hidden">
                <AdminHeader />
                <div className="flex flex-1 bg-slate-50 p-2 gap-2 overflow-hidden">
                    <AdminSideBar />
    
                    <main className="flex-1 bg-white rounded-lg shadow-md p-4 h-full overflow-hidden">
                        <CreateCard />
                    </main>
                </div>
            </div>
    );
}