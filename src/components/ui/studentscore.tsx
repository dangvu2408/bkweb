'use client'; 

import { useEffect, useState } from 'react';

interface studentscore {
    HocKi: string;
    MaHocPhan: string;
    TenHocPhan: string;
    TinChi: string;
    LopHoc: string;
    diemQT: string;
    diemThi: string;
    diemChu: string;
}

export default function StudentScore() {
    const [data, setData] = useState<studentscore[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) return;

        fetch('/api/studentscore', {
            method: 'POST',
            body: JSON.stringify({ sessionId }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setData(json.data);
            })
            .catch((err) => console.error('Lỗi lấy lớp:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Đang tải ...</div>;

    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">BẢNG ĐIỂM HỌC PHẦN</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                <tr>
                    <th className="border px-2 py-1">Học kì</th>
                    <th className="border px-2 py-1">Mã học phần</th>
                    <th className="border px-2 py-1">Tên học phần</th>
                    <th className="border px-2 py-1">Tín chỉ</th>
                    <th className="border px-2 py-1">Lớp học</th>
                    <th className="border px-2 py-1">Điểm QT</th>
                    <th className="border px-2 py-1">Điểm thi</th>
                    <th className="border px-2 py-1">Điểm chữ</th>
                </tr>
                </thead>
                <tbody>
                {data.map((stdscore, idx) => (
                    <tr key={idx}>
                    <td className="border px-2 py-1">{stdscore.HocKi}</td>
                    <td className="border px-2 py-1">{stdscore.MaHocPhan}</td>
                    <td className="border px-2 py-1">{stdscore.TenHocPhan}</td>
                    <td className="border px-2 py-1">{stdscore.TinChi}</td>
                    <td className="border px-2 py-1">{stdscore.LopHoc}</td>
                    <td className="border px-2 py-1">{stdscore.diemQT}</td>
                    <td className="border px-2 py-1">{stdscore.diemThi}</td>
                    <td className="border px-2 py-1">{stdscore.diemChu}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}