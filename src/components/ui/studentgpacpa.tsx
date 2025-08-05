'use client'; 

import { useEffect, useState } from 'react';

interface StudentGPACPA {
    hockihoc: string;
    gpa: string;
    cpa: string;
    tinchiqua: string;
    tinchitichluy: string;
    tinchino: string;
    tinchidk: string;
    trinhdo: string;
    canhbao: string;
    thieudiem: string;
    khongtinh: string;
    ctdtsv: string;
    dukienxlht: string;
    xulichinhthuc: string;
}

export default function StudentGPACPA() {
    const [data, setData] = useState<StudentGPACPA[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) return;

        fetch('/api/aggregatescore', {
            method: 'POST',
            body: JSON.stringify({ sessionId }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setData(json.data);
            })
            .catch((err) => console.error('Lỗi lấy:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Đang tải ...</div>;

    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">BẢNG ĐIỂM TỔNG HỢP</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                    <tr>
                        <th className="border px-2 py-1">Học kì</th>
                        <th className="border px-2 py-1">GPA</th>
                        <th className="border px-2 py-1">CPA</th>
                        <th className="border px-2 py-1">Tín chỉ qua</th>
                        <th className="border px-2 py-1">Tín chỉ tích lũy</th>
                        <th className="border px-2 py-1">Tín chỉ nợ</th>
                        <th className="border px-2 py-1">Tín chỉ đăng ký</th>
                        <th className="border px-2 py-1">Trình độ</th>
                        <th className="border px-2 py-1">Cảnh báo</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((stdcpagpa, idx) => (
                    <tr key={idx}>
                        <td className="border px-2 py-1">{stdcpagpa.hockihoc}</td>
                        <td className="border px-2 py-1">{stdcpagpa.gpa}</td>
                        <td className="border px-2 py-1">{stdcpagpa.cpa}</td>
                        <td className="border px-2 py-1">{stdcpagpa.tinchiqua}</td>
                        <td className="border px-2 py-1">{stdcpagpa.tinchitichluy}</td>
                        <td className="border px-2 py-1">{stdcpagpa.tinchino}</td>
                        <td className="border px-2 py-1">{stdcpagpa.tinchidk}</td>
                        <td className="border px-2 py-1">{stdcpagpa.trinhdo}</td>
                        <td className="border px-2 py-1">{stdcpagpa.canhbao}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}