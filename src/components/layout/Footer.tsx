"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


export default function Footer() {
    return (
        <footer className="m-0 px-[100px] py-[10px] bg-[rgba(0,0,0,0.05)]">
            <div className="pt-4 pb-4 flex flex-col gap-12">
                <div className="flex flex-wrap min-w-0 p-[10px]">
                    <div className="flex flex-col gap-5 basis-4/5 max-w-4/5">
                        <div className="footer-logo-seee flex gap-5 items-center">
                            <Link href="/">
                                <div className="w-[180px] h-[60px] inline-block bg-[url('/images/logo.png')] bg-center bg-contain bg-no-repeat" />
                            </Link>
                            <div className="flex flex-col gap-[10px]">
                                <span className="[font-family:'Poppin_Bold'] text-[#32323d] text-[18px]">Trường Đại học Bách Khoa Hà Nội</span>
                                <span className="[font-family:'Poppin'] text-[#32323d] text-[16px]">Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 basis-1/5 max-w-1/5">
                        <div className="flex flex-col gap-5 relative">
                            <div className="text-[18px] [font-family:'Poppin_Bold'] leading-[30.92px] text-black">
                                Liên kết nhanh
                                <div className="mt-[4px] w-[50px] h-[3px] bg-[#CE1628]"></div>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <div className="text-[16px] [font-family:'Poppin'] leading-[25.6px] text-black cursor-pointer transition-all duration-200 ease-in-out">
                                    <Link href="/">
                                        Trang chủ
                                    </Link>
                                </div>
                                <div className="text-[16px] [font-family:'Poppin'] leading-[25.6px] text-black cursor-pointer transition-all duration-200 ease-in-out">
                                    <Link href="/student-info">
                                        Thông tin sinh viên
                                    </Link>
                                </div>
                                <div className="text-[16px] [font-family:'Poppin'] leading-[25.6px] text-black cursor-pointer transition-all duration-200 ease-in-out">
                                    <Link href="/student-score">
                                        Bảng điểm học phần
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}