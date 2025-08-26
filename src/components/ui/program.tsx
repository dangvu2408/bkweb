'use client'; 

import { useEffect, useState } from 'react';
import Notifi from './notification';

interface StudentProgram {
    maHPCTDT: string;
    tenHPCTDT: string;
    kyhocCTDT: string;
    tinchiDT: string;
    maHPhoc: string;
    ghichuHPH: string;
    dienchuCTDT: string;
    diemsoCTDT: string;
    vienkhoaDT: string;
}

export default function StudentClass() {
    const [data, setData] = useState<StudentProgram[]>([]);

    useEffect(() => {
        const data = localStorage.getItem('program');
        if (data) {
            setData(JSON.parse(data));
        }
    }, []);
    if (!data) return <Notifi/>;

    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">CHƯƠNG TRÌNH ĐÀO TẠO SINH VIÊN</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                    <tr>
                        <th className="border px-2 py-1">Mã HP</th>
                        <th className="border px-2 py-1">Tên HP</th>
                        <th className="border px-2 py-1">Kì học</th>
                        <th className="border px-2 py-1">Tín chỉ</th>
                        <th className="border px-2 py-1">Mã HP học</th>
                        <th className="border px-2 py-1">Ghi chú</th>
                        <th className="border px-2 py-1">Điểm chữ</th>
                        <th className="border px-2 py-1">Điểm số</th>
                        <th className="border px-2 py-1">Viện/khoa</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((stdprg, idx) => (
                        <tr key={idx}>
                            <td className="border px-2 py-1">{stdprg.maHPCTDT}</td>
                            <td className="border px-2 py-1">{stdprg.tenHPCTDT}</td>
                            <td className="border px-2 py-1">{stdprg.kyhocCTDT}</td>
                            <td className="border px-2 py-1">{stdprg.tinchiDT}</td>
                            <td className="border px-2 py-1">{stdprg.maHPhoc}</td>
                            <td className="border px-2 py-1">{stdprg.ghichuHPH}</td>
                            <td className="border px-2 py-1">{stdprg.dienchuCTDT}</td>
                            <td className="border px-2 py-1">{stdprg.diemsoCTDT}</td>
                            <td className="border px-2 py-1">{stdprg.vienkhoaDT}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}