'use client'; 

import { useEffect, useState } from 'react';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        
        const cachedStr = localStorage.getItem('toeic_cache');
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
                localStorage.removeItem('toeic_cache');
            }
        }

        if (sessionId) { 
            fetch('/api/toeicscore', {
                method: 'POST',
                body: JSON.stringify({ sessionId }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.success) {
                        setData(json.data);
                        localStorage.setItem('toeic_cache', JSON.stringify({
                            data: json.data,
                        }));
                    } else {
                        console.error('API trả về lỗi:', json.message);
                    }
                })
                .catch((err) => console.error('Lỗi lấy TOEIC:', err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

        
    }, []);

    if (loading) return <div>Đang tải ...</div>;

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