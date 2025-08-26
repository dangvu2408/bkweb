'use client';

import { useEffect, useState } from 'react';
import Notifi from './notification';

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
}

interface HocPhiData {
    soTienCanDongHP: string;
    ghiChuSoTienHP: string;
    toanBoCongNoHP: HocPhanHP[];
}

export default function TuitionPage() {
    const [dataRes, setData] = useState<HocPhiData | null>(null);

    useEffect(() => {
        const data = localStorage.getItem('tuition');
        if (data) {
            setData(JSON.parse(data));
        }
    }, []);
    if (!dataRes) return <Notifi/>;


    return (
        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">THÔNG TIN CÔNG NỢ HỌC PHÍ</h1>

            {dataRes && (
                <>
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
                            {dataRes.toanBoCongNoHP.map((hp, i) => (
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
                        <p><strong>Số tiền cần đóng:</strong> {dataRes.soTienCanDongHP}</p>
                        <p className="mt-1"><strong>Ghi chú:</strong> {dataRes.ghiChuSoTienHP}</p>
                    </div>
                </>
            )}
        </div>
    );
}
