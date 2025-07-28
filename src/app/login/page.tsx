"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoginData {
    viewState: string;
    eventValidation: string;
    captchaUrl: string;
    cookies: string;
}

export default function LoginPage() {
    const [loginData, setLoginData] = useState<LoginData | null>(null);

    useEffect(() => {
        fetch('/api/captcha')
        .then(res => res.json())
        .then(data => {
            console.log("Data từ API:", data);
            setLoginData(data)
        });
    }, []);

    if (!loginData) return (
        <div className='container'>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm" style={{ backgroundImage: "url('/images/header_bgr.jpg')" }}></div>
            <div className="absolute inset-0 bg-opacity-20" />
            <p>Đang tải...</p>
        </div>
        
    );

    return (
        <div className='fixed inset-0'>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm" style={{ backgroundImage: "url('/images/header_bgr.jpg')" }}></div>
            <div className="absolute inset-0 bg-opacity-20" />
            <div className='relative z-10 flex items-center justify-center h-screen'>
                <div className='bg-[#AA1D2B] bg-opacity-90 rounded-[15px] p-8 shadow-lg w-full max-w-md'>
                    <h1 className='text-2xl font-bold text-center mb-6'>Đăng nhập</h1>
                    <form className="space-y-4 flex flex-col items-center">
                        <input name="username" placeholder="Mã số sinh viên" className="w-full px-4 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring focus:ring-blue-500"/>
                        <input name="password" type="password" placeholder="Mật khẩu" className="w-full px-4 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring focus:ring-blue-500"/>
                        <input name="captcha" placeholder="Nhập CAPTCHA" className="w-full px-4 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring focus:ring-blue-500"/>
                        <img src={loginData.captchaUrl} width={200} height={50} alt="CAPTCHA"/>
                        <button type="submit" className="w-full bg-white text-[#AA1D2B] py-2 rounded-[8px]">Đăng nhập</button>
                    </form>
                </div>
                
            </div>
            
        </div>
    );
}
