import ContentDiv from "../components/Content";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

export default function Dashboard() {
    return (
        <div className="flex flex-col w-screen h-screen overflow-hidden">
            <Header />
            <div className="flex flex-1 bg-slate-50 p-2 gap-2 overflow-hidden">
                <SideBar />

                <main className="flex-1 bg-white rounded-lg shadow-md p-4 h-full overflow-y-auto scrollbar-hide">
                    <ContentDiv title="Courses"/>
                </main>
            </div>
        </div>
    );
}
