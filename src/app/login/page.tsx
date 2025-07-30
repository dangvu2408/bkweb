"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import LoginForm from '@/components/ui/loginform';


export default function LoginPage() {

    return (
        <div className='fixed inset-0'>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm" style={{ backgroundImage: "url('/images/header_bgr.jpg')" }}></div>
            <div className="absolute inset-0 bg-opacity-20" />
            <LoginForm/>
        </div>
    );
}
