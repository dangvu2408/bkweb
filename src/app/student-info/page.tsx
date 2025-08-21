import Image from "next/image";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StudentInfo from "@/components/ui/studentinfo";
import Footer from "@/components/layout/Footer";

export default function Home() {
    return (
        <>
            <title>Thông tin sinh viên - HUST SA</title>

            <div className="flex w-full min-w-[768px] bg-white">
                <Header/>
                <Sidebar/>
                <div className="flex-grow relative min-h-full" style={{ width: "calc(100% - 570px)" }}>
                    <div className="relative overflow-hidden w-full h-full">
                        <main className="absolute inset-0 overflow-y-scroll overflow-x-hidden -mr-[6px] mb-0 mx-auto">
                            <div className="h-full mt-[85px] flex flex-col">
                                <div className='px-[60px]'>
                                    <StudentInfo></StudentInfo>
                                </div>
                                <Footer/>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
        
    );
}
