"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaUrl, setCaptchaUrl] = useState('');
    const [hiddenFields, setHiddenFields] = useState({
        __VIEWSTATE: '',
        __EVENTVALIDATION: '',
        __VIEWSTATEGENERATOR: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [sessionId, setSessionId] = useState('');

    const router = useRouter();

    const fetchCaptcha = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/login');
            const data = await res.json();
            setCaptchaUrl(data.captchaUrl);
            setHiddenFields(data.hiddenFields);
            setSessionId(data.sessionId);
            setCaptcha('');
            
        } catch (err) {
            setMessage('Lỗi khi tải CAPTCHA');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password || !captcha) {
            setMessage("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setLoading(true);
        setMessage('');

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
                captcha,
                hiddenFields: {
                    __VIEWSTATE: hiddenFields.__VIEWSTATE,
                    __EVENTVALIDATION: hiddenFields.__EVENTVALIDATION,
                    __VIEWSTATEGENERATOR: hiddenFields.__VIEWSTATEGENERATOR,
                },
                sessionId, 
            })
        });

        const data = await res.json();
        setLoading(false);
        setMessage(data.message || '');

        if (data.success) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('studentInfo', JSON.stringify(data.data));
            router.push('/student-info');
        } else {
            fetchCaptcha();
        }
    };

    return (
        <div className='relative z-10 flex items-center justify-center h-screen'>
        <div className='bg-[#AA1D2B] bg-opacity-90 rounded-[15px] p-8 shadow-lg w-full max-w-md'>
            <h1 className='text-2xl font-bold text-center mb-6 text-white'>Đăng nhập</h1>
            <form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center">
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Mã số sinh viên" className="w-full px-4 py-2 border border-gray-300 rounded-[8px] focus:outline-none" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Mật khẩu" className="w-full px-4 py-2 border border-gray-300 rounded-[8px] focus:outline-none" />
                <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder="Nhập CAPTCHA" className="w-full px-4 py-2 border border-gray-300 rounded-[8px] focus:outline-none" />
                {captchaUrl && (
                    <img src={captchaUrl} alt="captcha" className="w-[200px] h-[80px] border rounded cursor-pointer hover:opacity-80" onClick={fetchCaptcha} title="Click để reload CAPTCHA" />
                )}
                <button type="submit" disabled={loading} className="w-full bg-white text-[#AA1D2B] py-2 rounded-[8px] cursor-pointer">
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
                {message && <p className='text-white text-sm text-center'>{message}</p>}
            </form>
        </div>
        </div>
    );
}
