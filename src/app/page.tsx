import Image from "next/image";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Noti from "@/components/ui/notification";
import Main from "@/components/layout/MainHome";
import Footer from "@/components/layout/Footer";

export default function Home() {
    return (
        <>
            <title>Trang chủ - HUST SA</title>
            <div className="flex w-full min-w-[768px] bg-white">
                <Header/>
                <Sidebar/>
                <div className="flex-grow relative min-h-full" style={{ width: "calc(100% - 570px)" }}>
                    <div className="relative overflow-hidden w-full h-full">
                        <main className="absolute inset-0 overflow-y-scroll overflow-x-hidden -mr-[6px] mb-0 mx-auto">
                            <div className="mt-[85px] flex flex-col">
                                <div className='px-[60px]'>
                                    <Main/>
                                </div>
                                <Footer></Footer>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
