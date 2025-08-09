'use client'; 

import { useEffect, useState } from 'react';

interface CourseRegister {
    maHPDK: string;
    tenHPDK: string;
    ngayDK: string;
    TTDK: string;
    soTCDK: string;
    thongtinHK: string;
    tongtinchi: string;
}


export default function StudentClass() {
    const [data, setData] = useState<CourseRegister[]>([]);
    const [term, setTerm] = useState('');
    const [totalCredits, setTotalCredits] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        
        const cachedStr = localStorage.getItem('register_cache');
        if (cachedStr) {
            try {
                const parsed = JSON.parse(cachedStr);
                const cachedData = Array.isArray(parsed) ? parsed : parsed.data;
                if (Array.isArray(cachedData)) {
                    setData(cachedData);
                    setLoading(false);
                }
            } catch {
                console.error('Cache bị lỗi, xóa cache');
                localStorage.removeItem('register_cache');
            }
        }

        if(sessionId) {
            fetch('/api/registercourse', {
                method: 'POST',
                body: JSON.stringify({ sessionId }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.success) {
                        setData(json.data.thongtinDK);
                        setTerm(json.data.thongtinHK);
                        setTotalCredits(json.data.tongtinchi);
                        localStorage.setItem('register_cache', JSON.stringify({ data: json.data }));
                    } else {
                        console.error('API trả về lỗi:', json.message);
                    }
                })
                .catch((err) => console.error('Lỗi lấy lớp:', err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

        
    }, []);

    if (loading) return <div>Đang tải...</div>;

    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">ĐĂNG KÍ HỌC PHẦN</h1>
            <span>Bảng đăng ký học phần kỳ {term} của sinh viên</span>
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
                {data.map((stdterm, idx) => (
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
            <span>Tổng số tín chỉ đăng kí: {totalCredits}</span>
        </div>
    );

}