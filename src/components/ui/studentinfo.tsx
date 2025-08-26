'use client'; 

import { useEffect, useState } from 'react';
import Notifi from './notification';

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
        const data = localStorage.getItem('studentInfo');
        if (data) {
            setInfo(JSON.parse(data));
        }
    }, []);

    if (!studentInfo) return <Notifi/>;

    return (
        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">THÔNG TIN SINH VIÊN</h1>
            <div>
                <div className='border-b-3 border-[#CD1628] py-[10px] my-[10px]'>
                    <span className="[font-family:'Poppin_Bold'] text-xl">Thông tin sinh viên</span>
                </div>
                <ul className="grid grid-cols-2 gap-2 text-base">
                    <li><strong>MSSV:</strong> {studentInfo.MSSV}</li>
                    <li><strong>Họ tên:</strong> {studentInfo.Ho_ten}</li>
                    <li><strong>Năm vào trường:</strong> {studentInfo.Nam_vao_truong}</li>
                    <li><strong>Bậc đào tạo:</strong> {studentInfo.Bac_dao_tao}</li>
                    <li><strong>Chương trình:</strong> {studentInfo.Chuong_trinh}</li>
                    <li><strong>Khoa/Viện:</strong> {studentInfo.Khoa_vien}</li>
                    <li><strong>Tình trạng:</strong> {studentInfo.Tinh_trang}</li>
                    <li><strong>Giới tính:</strong> {studentInfo.Gioi_tinh}</li>
                    <li><strong>Lớp:</strong> {studentInfo.Lop}</li>
                    <li><strong>Khóa học:</strong> {studentInfo.Khoa}</li>
                    <li><strong>Email:</strong> {studentInfo.Email}</li>
                </ul>
            </div>
                <div className='border-b-3 border-[#CD1628] py-[10px] my-[10px]'>
                    <span className="[font-family:'Poppin_Bold'] text-xl">Thông tin cá nhân</span>
                </div>
                <ul className="grid grid-cols-2 gap-2 text-base">
                    <li><strong>Dân tộc:</strong> {studentInfo.Dan_toc}</li>
                    <li><strong>Địa chỉ:</strong> {studentInfo.Dia_chi}</li>

                    <li><strong>Tôn giáo:</strong> {studentInfo.Ton_giao}</li>
                    <li><strong>Hộ khẩu:</strong> {studentInfo.Ho_khau}</li>

                    <li><strong>Năm tốt nghiệp C3:</strong> {studentInfo.Nam_tot_nghiep_c3}</li>
                    <li><strong>Trường THPT:</strong> {studentInfo.Truong_THPT}</li>

                    <li><strong>CCCD:</strong> {studentInfo.CCCD}</li>
                    <li><strong>Nơi cấp:</strong> {studentInfo.Noi_cap}</li>
                    
                    <li><strong>SĐT:</strong> {studentInfo.SDT}</li>
                </ul>
            <div>

            </div>

            <ul className="grid grid-cols-2 gap-2 text-base">    
                <li><strong>Họ tên bố:</strong> {studentInfo.Ho_ten_bo}</li>
                <li><strong>Họ tên mẹ:</strong> {studentInfo.Ho_ten_me}</li>

                <li><strong>Năm sinh bố:</strong> {studentInfo.Nam_sinh_bo}</li>
                <li><strong>Năm sinh mẹ:</strong> {studentInfo.Nam_sinh_me}</li>

                <li><strong>Nghề nghiệp bố:</strong> {studentInfo.Nghe_nghiep_bo}</li>
                <li><strong>Nghề nghiệp mẹ:</strong> {studentInfo.Nghe_nghiep_me}</li>

                <li><strong>SĐT bố:</strong> {studentInfo.SDT_bo}</li>
                <li><strong>SĐT mẹ:</strong> {studentInfo.SDT_me}</li>

                <li><strong>Email bố:</strong> {studentInfo.Email_bo}</li>
                <li><strong>Email mẹ:</strong> {studentInfo.Email_me}</li>
            </ul>
        </div>
    );
}
