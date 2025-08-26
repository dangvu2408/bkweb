"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface field {
    fullname: string;
    mssv: string;
}

export default function profileheader({ fullname, mssv }: field) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.replace("/login"); 
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if ( dropdownRef.current && !dropdownRef.current.contains(e.target as Node) ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return(
        <div className="flex flex-row gap-[20px] items-center self-center">
            <div className="flex flex-col text-right text-[14px]">
                <span className="text-[#000] [font-family:'Poppin_Bold']">{fullname}</span>
                <span className="text-[#000] [font-family:'Poppin_Bold']">{mssv}</span>
            </div>
            <div ref={dropdownRef} className="relative">
                <figure onClick={() => setOpen((prev) => !prev)} className="w-[45px] h-[45px] bg-transparent rounded-full overflow-hidden cursor-pointer">
                    <img
                        alt="default avatar"
                        className="h-auto w-full aspect-square inline-block align-top rounded-full object-cover object-center"
                        src={"/images/avatar.jpg"}
                    />
                </figure>

                {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2 z-50">
                        <Link href="/student-info" className="block px-4 py-2 [font-family:'Poppin_Bold'] text-gray-700 hover:bg-gray-100">Thông tin cá nhân</Link>
                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 [font-family:'Poppin_Bold'] text-gray-700 hover:bg-gray-100">Đăng xuất</button>
                    </div>
                )}
            </div>
        </div>
    );
}