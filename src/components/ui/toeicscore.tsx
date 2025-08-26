'use client'; 

import { useEffect, useState } from 'react';
import Notifi from './notification';

interface TOEIC {
    maSV: string;
    hotenSV: string;
    ngaySinh: string;
    hocKi: string;
    ghiChu: string;
    ngayThi: string;
    diemNghe: string;
    diemDoc: string;
    diemViet: string;
    diemNoi: string;
    diemTong: string;
}

export default function TOEICScore() {
    const [data, setData] = useState<TOEIC[]>([]);

    useEffect(() => {
        const data = localStorage.getItem('toeic');
        if (data) {
            setData(JSON.parse(data));
        }
    }, []);
    if (!data) return <Notifi/>;


    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">ĐIỂM THI TOEIC</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                    <tr>
                        <th className="border px-2 py-1">MSSV</th>
                        <th className="border px-2 py-1">Họ tên SV</th>
                        <th className="border px-2 py-1">Ngày sinh</th>
                        <th className="border px-2 py-1">Học kì</th>
                        <th className="border px-2 py-1">Ghi chú</th>
                        <th className="border px-2 py-1">Ngày thi</th>
                        <th className="border px-2 py-1">Điểm nghe</th>
                        <th className="border px-2 py-1">Điểm đọc</th>
                        <th className="border px-2 py-1">Điểm viết</th>
                        <th className="border px-2 py-1">Điểm nói</th>
                        <th className="border px-2 py-1">Điểm tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((toeic, idx) => (
                        <tr key={idx}>
                            <td className="border px-2 py-1">{toeic.maSV}</td>
                            <td className="border px-2 py-1">{toeic.hotenSV}</td>
                            <td className="border px-2 py-1">{toeic.ngaySinh}</td>
                            <td className="border px-2 py-1">{toeic.hocKi}</td>
                            <td className="border px-2 py-1">{toeic.ghiChu}</td>
                            <td className="border px-2 py-1">{toeic.ngayThi}</td>
                            <td className="border px-2 py-1">{toeic.diemNghe}</td>
                            <td className="border px-2 py-1">{toeic.diemDoc}</td>
                            <td className="border px-2 py-1">{toeic.diemViet}</td>
                            <td className="border px-2 py-1">{toeic.diemNoi}</td>
                            <td className="border px-2 py-1">{toeic.diemTong}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}