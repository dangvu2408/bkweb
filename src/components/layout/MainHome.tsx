"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MainHome() {
    return(
        <div className="flex flex-col gap-[10px] text-[#32323d] w-full ">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-xl flex items-center justify-between">
                Thông báo đại học
                <Link className="[font-family:'Poppin'] flex items-center text-[15px] uppercase" href={'https://ctt.hust.edu.vn/DisplayWeb/DisplayListBaiViet?tag=%C4%90T%C4%90H'}>
                    Xem thêm
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
            </h1>
            <div className="flex items-center justify-center gap-[20px]">
                <div className="w-[33.333333%] p-[10px] bg-amber-200 rounded-[8px] cursor-pointer"></div>
                <div className="w-[33.333333%] p-[10px] bg-amber-200 rounded-[8px] cursor-pointer"></div>
                <div className="w-[33.333333%] p-[10px] bg-amber-200 rounded-[8px] cursor-pointer"></div>
            </div>

        </div>
    );
}