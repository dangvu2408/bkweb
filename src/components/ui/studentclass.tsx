'use client'; 

import { useEffect, useState } from 'react';

interface studentclass {
    maSV: string;
    hoSV: string;
    demSV: string;
    tenSV: string;
    ngaysinh: string;
    tenlop: string;
    ctdt: string;
    trangthai: string;
}

export default function StudentClass() {
    const [data, setData] = useState<studentclass[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');

        const cachedStr = localStorage.getItem('class_cache');
        if (cachedStr) {
            try {
                const parsed = JSON.parse(cachedStr);
                const cachedData = Array.isArray(parsed) ? parsed : parsed.data; // lấy mảng thực
                if (Array.isArray(cachedData)) {
                    setData(cachedData);
                    setLoading(false);
                }
            } catch {
                console.error('Cache bị lỗi, xóa cache');
                localStorage.removeItem('class_cache');
            }
        }

        if (sessionId) {
            fetch('/api/studentclass', {
                method: 'POST',
                body: JSON.stringify({ sessionId }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        setData(json.data);
                        localStorage.setItem('class_cache', JSON.stringify(json.data));
                    } else {
                        console.error('API trả về lỗi:', json.message);
                    }
                })
                .catch(err => console.error('Lỗi lấy lớp:', err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);


    if (loading) return <div>Đang tải lớp...</div>;

    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">THÔNG TIN LỚP SINH VIÊN</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                    <tr>
                        <th className="border px-2 py-1">MSSV</th>
                        <th className="border px-2 py-1">Họ</th>
                        <th className="border px-2 py-1">Đệm</th>
                        <th className="border px-2 py-1">Tên</th>
                        <th className="border px-2 py-1">Ngày sinh</th>
                        <th className="border px-2 py-1">Tên lớp</th>
                        <th className="border px-2 py-1">Chương trình đào tạo</th>
                        <th className="border px-2 py-1">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((stdclass, idx) => (
                        <tr key={idx}>
                            <td className="border px-2 py-1">{stdclass.maSV}</td>
                            <td className="border px-2 py-1">{stdclass.hoSV}</td>
                            <td className="border px-2 py-1">{stdclass.demSV}</td>
                            <td className="border px-2 py-1">{stdclass.tenSV}</td>
                            <td className="border px-2 py-1">{stdclass.ngaysinh}</td>
                            <td className="border px-2 py-1">{stdclass.tenlop}</td>
                            <td className="border px-2 py-1">{stdclass.ctdt}</td>
                            <td className="border px-2 py-1">{stdclass.trangthai}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}