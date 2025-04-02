import AdminCourseSide from "../components/AdminCourseSide";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideboard";

export default function AdminDashboard() {
    return (
        <div className="flex flex-col w-screen h-screen overflow-hidden">
            <AdminHeader />
            <div className="flex flex-1 bg-slate-50 p-2 gap-2 overflow-hidden">
                <AdminSideBar />

                <main className="flex-1 bg-white rounded-lg shadow-md p-4 h-full overflow-y-auto scrollbar-hide">
                    <AdminCourseSide title="Courses"/>
                </main>
            </div>
        </div>
    );
}
