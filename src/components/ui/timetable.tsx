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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        
        const cachedStr = localStorage.getItem('timetable_cache');
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
                localStorage.removeItem('timetable_cache');
            }
        }

        if (sessionId) { 
            fetch('/api/timetable', {
                method: 'POST',
                body: JSON.stringify({ sessionId }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.success) {
                        setData(json.data);
                        localStorage.setItem('term_cache', JSON.stringify({
                            data: json.data,
                        }));
                    } else {
                        console.error('API trả về lỗi:', json.message);
                    }
                })
                .catch((err) => console.error('Lỗi:', err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

        
    }, []);

    if (loading) return <div>Đang tải...</div>;

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