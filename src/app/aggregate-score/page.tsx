'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StudentGPACPA from "@/components/ui/studentgpacpa";


export default function StudentCPAGPA() {
    return (
        <>
            <title>Điểm tổng hợp - HUST SA</title>
            <div className="flex w-full min-w-[768px] bg-white">
                <Header/>
                <Sidebar/>
                <div className="flex-grow relative min-h-full" style={{ width: "calc(100% - 570px)" }}>
                    <div className="relative overflow-hidden w-full h-full">
                        <main className="absolute inset-0 overflow-y-scroll overflow-x-hidden -mr-[6px] mb-0 px-[60px] mx-auto">
                            <div className="h-full mt-[85px] flex">
                                <StudentGPACPA></StudentGPACPA>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
        
        
    );
}
