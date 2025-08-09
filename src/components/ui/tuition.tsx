'use client';

import { useEffect, useState } from 'react';

interface HocPhanHP {
    maHocPhanHP: string;
    tenHocPhanHP: string;
    soTien1TC: string;
    tinChiHocPhi: string;
    heSoHocPhi: string;
    tongTienHP: string;
    trangThaiDK: string;
    loaiDangKi: string;
    ghiChuHP: string;
    soTienCanDongHP: string;
    ghiChuSoTienHP: string;
}

export default function TuitionPage() {
    const [data, setData] = useState<HocPhanHP[]>([]);
    const [tien, setTien] = useState('');
    const [ghiChu, setGhiChu] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');

        const cachedStr = localStorage.getItem('tuition_cache');
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
                localStorage.removeItem('tuition_cache');
            }
        }

        if(sessionId) { 
            fetch('/api/tuition', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId }),
            })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setData(json.data.toanBoCongNoHP);
                    setTien(json.data.soTienCanDongHP);
                    setGhiChu(json.data.ghiChuSoTienHP);
                    localStorage.setItem('tuition_cache', JSON.stringify(json.data));
                } else {
                        console.error('API trả về lỗi:', json.message);
                    }
            })
            .catch(err => console.error('Lỗi khi lấy học phí:', err))
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

        
    }, []);

    if (loading) return <div>Đang tải ...</div>;

    return (
        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">THÔNG TIN CÔNG NỢ HỌC PHÍ</h1>

            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                <tr>
                    <th className="border px-2 py-1">Mã HP</th>
                    <th className="border px-2 py-1">Tên HP</th>
                    <th className="border px-2 py-1">Tiền/TC</th>
                    <th className="border px-2 py-1">TC</th>
                    <th className="border px-2 py-1">Hệ số</th>
                    <th className="border px-2 py-1">Tổng</th>
                    <th className="border px-2 py-1">Trạng thái</th>
                    <th className="border px-2 py-1">Loại ĐK</th>
                    <th className="border px-2 py-1">Ghi chú</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((hp, i) => (
                        <tr key={i}>
                            <td className="border px-2 py-1">{hp.maHocPhanHP}</td>
                            <td className="border px-2 py-1">{hp.tenHocPhanHP}</td>
                            <td className="border px-2 py-1">{hp.soTien1TC}</td>
                            <td className="border px-2 py-1">{hp.tinChiHocPhi}</td>
                            <td className="border px-2 py-1">{hp.heSoHocPhi}</td>
                            <td className="border px-2 py-1">{hp.tongTienHP}</td>
                            <td className="border px-2 py-1">{hp.trangThaiDK}</td>
                            <td className="border px-2 py-1">{hp.loaiDangKi}</td>
                            <td className="border px-2 py-1">{hp.ghiChuHP}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-sm">
                <p><strong>Số tiền cần đóng:</strong> {tien}</p>
                <p className="mt-1"><strong>Ghi chú:</strong> {ghiChu}</p>
            </div>
        </div>
    );
}
