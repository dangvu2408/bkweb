'use client'; 

import { useEffect, useState } from 'react';

interface InputGradeTerm {
    masinhvien: string;
    malop: string;
    tenlop: string;
    trongsoqt: string;
    diemqt: string;
    ttdiemqt: string;
    diemthi: string;
    ttdiemthi: string;
}

export default function StudentClass() {
    const [data, setData] = useState<InputGradeTerm[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) return;

        fetch('/api/inputgradeterm', {
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

    if (loading) return <div>Đang tải...</div>;

    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">THÔNG TIN NHẬP ĐIỂM KÌ MỚI NHẤT</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                <tr>
                    <th className="border px-2 py-1">MSSV</th>
                    <th className="border px-2 py-1">Mã lớp</th>
                    <th className="border px-2 py-1">Tên lớp</th>
                    <th className="border px-2 py-1">Trọng số QT</th>
                    <th className="border px-2 py-1">Điểm QT</th>
                    <th className="border px-2 py-1">TT điểm QT</th>
                    <th className="border px-2 py-1">Điểm thi</th>
                    <th className="border px-2 py-1">TT điểm thi</th>
                </tr>
                </thead>
                <tbody>
                {data.map((stdterm, idx) => (
                    <tr key={idx}>
                    <td className="border px-2 py-1">{stdterm.masinhvien}</td>
                    <td className="border px-2 py-1">{stdterm.malop}</td>
                    <td className="border px-2 py-1">{stdterm.tenlop}</td>
                    <td className="border px-2 py-1">{stdterm.trongsoqt}</td>
                    <td className="border px-2 py-1">{stdterm.diemqt}</td>
                    <td className="border px-2 py-1">{stdterm.ttdiemqt}</td>
                    <td className="border px-2 py-1">{stdterm.diemthi}</td>
                    <td className="border px-2 py-1">{stdterm.ttdiemthi}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}