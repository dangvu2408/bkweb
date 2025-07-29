"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import LoginForm from '@/components/ui/loginform';

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
        <div className='fixed inset-0'>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm" style={{ backgroundImage: "url('/images/header_bgr.jpg')" }}></div>
            <div className="absolute inset-0 bg-opacity-20" />
            <LoginForm/>
        </div>
    );

    return (
        <div className='fixed inset-0'>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm" style={{ backgroundImage: "url('/images/header_bgr.jpg')" }}></div>
            <div className="absolute inset-0 bg-opacity-20" />
            <LoginForm/>
        </div>
    );
}
