'use client'; // Nếu bạn đang dùng App Router

import { useEffect, useState } from 'react';

interface StudentInfo {
    MSSV: string;
    Ho_ten: string;
    Nam_vao_truong: string;
    Bac_dao_tao: string;
    Chuong_trinh: string;
    Khoa_vien: string;
    Tinh_trang: string;
    Gioi_tinh: string;
    Lop: string;
    Khoa: string;
    Email: string;
    Dan_toc: string;
    Nam_tot_nghiep_c3: string;
    Dia_chi: string;
    CCCD: string;
    Noi_cap: string;
    Ho_ten_bo: string;
    Nam_sinh_bo: string;
    Nghe_nghiep_bo: string;
    SDT_bo: string;
    Email_bo: string;
    Ton_giao: string;
    Truong_THPT: string;
    Ho_khau: string;
    SDT: string;
    Ho_ten_me: string;
    Nam_sinh_me: string;
    Nghe_nghiep_me: string;
    SDT_me: string;
    Email_me: string;
}

export default function StudentInfo() {
    const [studentInfo, setInfo] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('studentInfo');
        if (stored) {
            setInfo(JSON.parse(stored));
        }
    }, []);

    if (!studentInfo) return <p>Đang tải thông tin sinh viên...</p>;

    return (
        <div className="flex flex-col gap-[10px] text-[#32323d]">
            <h1 className="text-xl font-bold mb-2">Thông tin sinh viên</h1>
            <ul className="grid grid-cols-2 gap-2 text-sm">
                <li><strong>MSSV:</strong> {studentInfo.MSSV}</li>
                <li><strong>Họ tên:</strong> {studentInfo.Ho_ten}</li>
                <li><strong>Lớp:</strong> {studentInfo.Lop}</li>
                <li><strong>Khoa:</strong> {studentInfo.Khoa}</li>
                <li><strong>Email:</strong> {studentInfo.Email}</li>
                <li><strong>Địa chỉ:</strong> {studentInfo.Dia_chi}</li>
                <li><strong>SDT:</strong> {studentInfo.SDT}</li>
                <li><strong>Tình trạng:</strong> {studentInfo.Tinh_trang}</li>
                {/* Thêm các trường khác tùy ý */}
            </ul>
        </div>
    );
}
