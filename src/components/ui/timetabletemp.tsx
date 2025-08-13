'use client'; 

import { useEffect, useState } from 'react';

interface TimetableClass {
    Ma_lop: string;
    Ma_lop_kem: string;
    Ten_lop: string;
    Ma_HP: string;
    Loai_lop: string;
    TT_lop: string;
    Yeu_cau: string;
    Trang_thai_DK: string;
    Loai_DK: string;
    Tin_chi: string;
}

interface TimetableTime {
    Thu: string;
    Thoi_gian: string;
    Tuan_hoc: string;
    Phong_hoc: string;
    Lop_hoc: string;
}

export default function TimetableTemp() {
    const [timetable, setTimetable] = useState<TimetableClass[]>([]);
    const [timetableTime, setTimetableTime] = useState<TimetableTime[]>([]);

    useEffect(() => {
        const data = localStorage.getItem('timetabletemp');
        if (data) {
            const parsed = JSON.parse(data);
            setTimetable(parsed.timetable || []);
            setTimetableTime(parsed.timetable_time || []);
        }
    }, []);

    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">THỜI KHÓA BIỂU TẠM THỜI</h1>
            <h3 className="[font-family:'Poppin_Bold'] mb-2 text-center text-xl">Các lớp đăng ký của sinh viên</h3>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                    <tr>
                        <th className="border px-2 py-1">Mã lớp</th>
                        <th className="border px-2 py-1">Mã lớp kèm</th>
                        <th className="border px-2 py-1">Tên lớp</th>
                        <th className="border px-2 py-1">Mã HP</th>
                        <th className="border px-2 py-1">Loại lớp</th>
                        <th className="border px-2 py-1">Trạng thái lớp</th>
                        <th className="border px-2 py-1">Yêu cầu</th>
                        <th className="border px-2 py-1">Trạng thái ĐK</th>
                        <th className="border px-2 py-1">Loại ĐK</th>
                        <th className="border px-2 py-1">TC</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((tkb, idx) => (
                        <tr key={idx}>
                            <td className="border px-2 py-1">{tkb.Ma_lop}</td>
                            <td className="border px-2 py-1">{tkb.Ma_lop_kem}</td>
                            <td className="border px-2 py-1">{tkb.Ten_lop}</td>
                            <td className="border px-2 py-1">{tkb.Ma_HP}</td>
                            <td className="border px-2 py-1">{tkb.Loai_lop}</td>
                            <td className="border px-2 py-1">{tkb.TT_lop}</td>
                            <td className="border px-2 py-1">{tkb.Yeu_cau}</td>
                            <td className="border px-2 py-1">{tkb.Trang_thai_DK}</td>
                            <td className="border px-2 py-1">{tkb.Loai_DK}</td>
                            <td className="border px-2 py-1">{tkb.Tin_chi}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="[font-family:'Poppin_Bold'] mb-2 text-center text-xl">Thời khóa biểu các lớp đăng ký</h3>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                    <tr>
                        <th className="border px-2 py-1">Thứ</th>
                        <th className="border px-2 py-1">Thời gian</th>
                        <th className="border px-2 py-1">Tuần học</th>
                        <th className="border px-2 py-1">Phòng học</th>
                        <th className="border px-2 py-1">Lớp học</th>
                    </tr>
                </thead>
                <tbody>
                    {timetableTime.map((tkb, idx) => (
                        <tr key={idx}>
                            <td className="border px-2 py-1">{tkb.Thu}</td>
                            <td className="border px-2 py-1">{tkb.Thoi_gian}</td>
                            <td className="border px-2 py-1">{tkb.Tuan_hoc}</td>
                            <td className="border px-2 py-1">{tkb.Phong_hoc}</td>
                            <td className="border px-2 py-1">{tkb.Lop_hoc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}