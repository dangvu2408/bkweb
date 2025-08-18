"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UniNoti from "../ui/universitynoti";
import TimetableCalendar from "../ui/calendar";

interface NotificationData {
    title: string;
    href: string;
    datetime: string;
}

const images = [
    "/images/banner_1.jpg",
    "/images/banner_2.jpg",
    "/images/banner_4.jpg",
];

export default function MainHome() {
    const [notiData, setNotiData] = useState<NotificationData[]>([]);
    const [index, setIndex] = useState(0);
    const [transition, setTransition] = useState(true);
    const [studentInfo, setInfo] = useState<any>(null);
    const [timetable, setTimetable] = useState<any>(null);
    const [timetableTemp, setTimetableTemp] = useState<any>(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/notification');
                const json = await res.json();
                if (json.success) {
                    setNotiData(json.data); 
                } else {
                    console.error("Fetch notification failed:", json.message);
                }
            } catch (error) {
                console.error("Error fetching ĐTĐH:", error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const data = localStorage.getItem('studentInfo');
        if (data) {
            setInfo(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        const data = localStorage.getItem('timetable');
        if (data) {
            setTimetable(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        const data = localStorage.getItem('timetabletemp');
        if (data) {
            setTimetableTemp(JSON.parse(data));
        }
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (index === images.length - 1) {
            setTimeout(() => {
                setTransition(false);
                setIndex(0);
            }, 3000);
        }
        if (index === 0) {
            setTimeout(() => {
                setTransition(false);
                setIndex(images.length - 2);
            }, 3000);
        }
    }, [index]);

    useEffect(() => {
        if (!transition) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTransition(true);
                });
            });
        }
    }, [transition]);

    return(
        <div className="flex flex-col gap-[10px] text-[#32323d] w-full">
            <div className="overflow-hidden w-full rounded-[8px]">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translate3d(-${index * 100}%, 0, 0)`, }}>
                    {images.map((src, i) => (
                        <div key={i} className="flex-shrink-0 w-full">
                            <img src={src} alt={`Banner ${i}`} className="w-full h-auto" />
                        </div>
                    ))}
                </div>
            </div>

            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-xl flex items-center justify-between">
                Thời khóa biểu{(!timetable || timetable.length === 0) && ' (tạm thời)'}
                <Link className="[font-family:'Poppin'] flex items-center text-[15px] uppercase" href={(!timetable || timetable.length === 0) ? '/timetable-temp' : '/time-table'}>
                    Xem thêm
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
            </h1>

            <TimetableCalendar/>


            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-xl flex items-center justify-between">
                Thông báo đại học
                <Link className="[font-family:'Poppin'] flex items-center text-[15px] uppercase" href={'https://ctt.hust.edu.vn/DisplayWeb/DisplayListBaiViet?tag=%C4%90T%C4%90H'}>
                    Xem thêm
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
            </h1>
            <div className="flex items-center justify-center gap-[20px]">
                {notiData.slice(0, 3).map((item, idx) => (
                    <UniNoti
                        key={idx}
                        NotiTilte={item.title}
                        NotiLink={item.href}
                        NotiDate={item.datetime}
                    />
                ))}
            </div>

            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-xl flex items-center justify-between">
                Thông tin học tập sinh viên
                <Link className="[font-family:'Poppin'] flex items-center text-[15px] uppercase" href={'/aggregate-score'}>
                    Xem thêm
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
            </h1>
            <div className="flex items-center justify-center gap-[20px]">
                <div className="flex w-[50%] h-full p-[10px] bg-[#E7000B] rounded-[8px] gap-[10px] cursor-pointer">
                    <div className="bg-[#F2F2F2] [font-family:'Poppin_Bold'] text-3xl rounded-[4px] flex items-center justify-center w-[100px] h-full">{studentInfo?.Tong_ket_diem}</div>
                    <div className="bg-[#F2F2F2] [font-family:'Poppin'] px-[10px] text-3xl rounded-[4px] flex items-center grow h-full">
                        <ul className="gap-2 text-base">
                            <li><strong>Tín chỉ tích lũy:</strong> {studentInfo?.TC_tichluy}/132</li>
                            <li><strong>Tín chỉ nợ:</strong> {studentInfo?.TC_no}</li>
                            <li><strong>Trình độ sinh viên:</strong> Năm thứ {studentInfo?.Trinhdo}</li>
                            <li><strong>Mức cảnh báo:</strong> {studentInfo?.Canhbao}</li>
                        </ul>
                    </div>

                </div>
                <div className="flex flex-col w-[50%] h-full p-[10px] bg-[rgba(0,0,0,0.05)] rounded-[8px] cursor-pointer">
                    <ul className="gap-2 text-base">
                        <li><strong>Họ tên:</strong> {studentInfo?.Ho_ten}</li>
                        <li><strong>MSSV:</strong> {studentInfo?.MSSV}</li>
                        <li><strong>Chương trình:</strong> {studentInfo?.Chuong_trinh}</li>
                        <li><strong>Bậc đào tạo:</strong> {studentInfo?.Bac_dao_tao}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}