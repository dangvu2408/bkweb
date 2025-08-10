'use client'; 

import { useEffect, useState } from 'react';

interface TKB {
    Thoi_gian: string;
    Tuan_hoc: string;
    Phong_hoc: string;
    Ma_lop: string;
    Loai_lop: string;
    Nhom: string;
    Ma_HP: string;
    Ten_lop: string;
    Ghi_chu: string;
    Hinh_thuc_day: string;
    Giang_vien: string;
    Link_online: string;
    Code_teams: string;
}

export default function Timetable() {
    const [data, setData] = useState<TKB[]>([]);

    useEffect(() => {
        const data = localStorage.getItem('timetable');
        if (data) {
            setData(JSON.parse(data));
        }
    }, []);


    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">THỜI KHÓA BIỂU</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                    <tr>
                        <th className="border px-2 py-1">Thời gian</th>
                        <th className="border px-2 py-1">Tuần học</th>
                        <th className="border px-2 py-1">Phòng học</th>
                        <th className="border px-2 py-1">Mã lớp</th>
                        <th className="border px-2 py-1">Mã HP</th>
                        <th className="border px-2 py-1">Tên lớp</th>
                        <th className="border px-2 py-1">Giảng viên</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((tkb, idx) => (
                        <tr key={idx}>
                            <td className="border px-2 py-1">{tkb.Thoi_gian}</td>
                            <td className="border px-2 py-1">{tkb.Tuan_hoc}</td>
                            <td className="border px-2 py-1">{tkb.Phong_hoc}</td>
                            <td className="border px-2 py-1">{tkb.Ma_lop}</td>
                            <td className="border px-2 py-1">{tkb.Ma_HP}</td>
                            <td className="border px-2 py-1">{tkb.Ten_lop}</td>
                            <td className="border px-2 py-1">{tkb.Giang_vien}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}