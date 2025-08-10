import Image from "next/image";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Noti from "@/components/ui/notification";
import Main from "@/components/layout/MainHome";

export default function Home() {
    return (
        <div className="flex w-full min-w-[768px] bg-white">
            <Header/>
            <Sidebar/>
            <div className="flex-grow relative min-h-full" style={{ width: "calc(100% - 570px)" }}>
                <div className="relative overflow-hidden w-full h-full">
                    <main className="absolute inset-0 overflow-y-scroll overflow-x-hidden -mr-[6px] mb-0 px-[60px] mx-auto">
                        <div className="h-full mt-[85px] flex">
                            <Main/>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
