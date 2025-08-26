'use client'; 

import { useEffect, useState } from 'react';
import Notifi from './notification';


interface CourseRegister {
    maHPDK: string;
    tenHPDK: string;
    ngayDK: string;
    TTDK: string;
    soTCDK: string;
}

interface CourseRegisterData {
    thongtinHK: string;
    tongtinchi: string;
    thongtinDK: CourseRegister[];
}



export default function StudentClass() {
    const [dataRes, setData] = useState<CourseRegisterData | null>(null);

    useEffect(() => {
        const data = localStorage.getItem('courseRegister');
        if (data) {
            setData(JSON.parse(data));
        }
    }, []);

    if (!dataRes) return <Notifi/>;


    return (
        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">ĐĂNG KÍ HỌC PHẦN</h1>
            {dataRes && (
                <>
                    <span>Bảng đăng ký học phần kỳ {dataRes.thongtinHK} của sinh viên</span>
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead className="bg-[#E0ECFF]">
                            <tr>
                                <th className="border px-2 py-1">Mã HPDK</th>
                                <th className="border px-2 py-1">Tên HPDK</th>
                                <th className="border px-2 py-1">Ngày đăng kí</th>
                                <th className="border px-2 py-1">Trạng thái DK</th>
                                <th className="border px-2 py-1">Số TC DK</th>
                            </tr>
                        </thead>
                        <tbody>
                        {dataRes.thongtinDK.map((stdterm, idx) => (
                            <tr key={idx}>
                            <td className="border px-2 py-1">{stdterm.maHPDK}</td>
                            <td className="border px-2 py-1">{stdterm.tenHPDK}</td>
                            <td className="border px-2 py-1">{stdterm.ngayDK}</td>
                            <td className="border px-2 py-1">{stdterm.TTDK}</td>
                            <td className="border px-2 py-1">{stdterm.soTCDK}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <span>Tổng số tín chỉ đăng kí: {dataRes.tongtinchi}</span>
                </>
            )}
        </div>
    );

}