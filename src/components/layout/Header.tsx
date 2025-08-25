"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Field from "../ui/profileheader";

interface User {
    Ho_ten: string;
    MSSV: string;
}

export default function Header() {
    const [user, setUser] = useState<User | null>(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

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

    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    
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
        const savedLastUpdated = localStorage.getItem("lastUpdated");
        if (savedLastUpdated) {
            setLastUpdated(savedLastUpdated);
        }
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        if (!captcha) {
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
            localStorage.setItem('studentInfo', JSON.stringify(data.data.data));
            localStorage.setItem('tuition', JSON.stringify(data.data.tuition));
            localStorage.setItem('gpaCpa', JSON.stringify(data.data.gpaCpa));
            localStorage.setItem('inputGradeTerm', JSON.stringify(data.data.inputGradeTerm));
            localStorage.setItem('program', JSON.stringify(data.data.program));
            localStorage.setItem('courseRegister', JSON.stringify(data.data.courseRegister));
            localStorage.setItem('studentClass', JSON.stringify(data.data.studentClass));
            localStorage.setItem('studentScore', JSON.stringify(data.data.studentScore));
            localStorage.setItem('timetable', JSON.stringify(data.data.timetable));
            localStorage.setItem('toeic', JSON.stringify(data.data.toeic));
            localStorage.setItem('timetabletemp', JSON.stringify(data.data.timetabletemp));
            localStorage.setItem('studentcoursegrade', JSON.stringify(data.data.studentcoursegrade));

            localStorage.setItem('sessionId', data.sessionId);

            const now = new Date().toLocaleString("vi-VN");
            localStorage.setItem("lastUpdated", now);
            setLastUpdated(now);
            setIsOpenDialog(false)
            router.push('/');
        } else {
            fetchCaptcha();
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem("studentInfo");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);
    return (
        <header className="flex items-center fixed top-0 right-0 h-[70px] px-[60px] z-[100] min-w-[660px] left-[240px] [font-family:'Poppin']">
            <div className="flex items-center justify-between relative z-[1] w-full">
                <div className="flex items-center justify-start flex-grow mr-[10px] basis-auto shrink-0">
                    <form className="relative w-full max-w-[440px]">
                        <div className="flex items-center gap-[10px] px-[10px] h-[40px] rounded-[20px] bg-[rgba(0,0,0,0.05)]">
                            <button className="inline-flex items-center text-[14px] rounded-full leading-normal border-0 font-normal uppercase-none text-center cursor-pointer relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#696969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search cursor-pointer text-[20px] left-[10px]">
                                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                            <div className="w-full">
                                <input type="text" placeholder="Tìm kiếm tiện ích..." className="m-0 inline-block w-[95%] text-[14px] text-[#282828] bg-clip-padding border-0 relative h-[34px] px-0 py-[5px] leading-[34px] focus:outline-none focus:ring-0 focus:border-none"></input>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-end flex-grow mr-[10px] basis-auto shrink-0">
                    {user ? (
                        <>
                            <div onClick={() => setIsOpenDialog(true)} className="mr-5 px-5 py-[10px] rounded-[100px] bg-[#CE1628] text-white text-[14px] [font-family:'Poppin_Bold'] leading-[20px] tracking-[0.1px] cursor-pointer">Cập nhật dữ liệu</div>
                            <Transition appear show={isOpenDialog}>
                                <Dialog as="div" className="relative z-1000" onClose={() => setIsOpenDialog(false)}>
                                    <div className="fixed inset-0 bg-black/30" />
                                    <div className="fixed inset-0 flex items-center justify-center">
                                        <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-[18px] shadow-xl">
                                            <div className="flex justify-between">
                                                <Dialog.Title className="text-[20px] text-[#CE1628] [font-family:'Poppin_Bold']">Cập nhật dữ liệu học tập</Dialog.Title>
                                                <button onClick={() => setIsOpenDialog(false)} className="rounded-[50%] bg-[rgba(0,0,0,0.04)] w-[30px] h-[30px] flex items-center justify-center cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x "><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                </button>
                                            </div>
                                            <Dialog.Description className="mt-2 text-[16px] text-black">
                                                Vui lòng nhập mã Captcha dưới đây!
                                            </Dialog.Description>
                                            <form onSubmit={handleUpdate} className="flex flex-col gap-[10px] items-center justify-center py-[10px]">
                                                {captchaUrl && (
                                                    <img src={captchaUrl} alt="captcha" className="w-[200px] h-[80px] bg-[#CE1628] border rounded-[10px] cursor-pointer hover:opacity-80" onClick={fetchCaptcha} title="Click để reload CAPTCHA" />
                                                )}
                                                <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder="Nhập CAPTCHA" className="w-full px-4 py-2 border border-gray-300 rounded-[8px] focus:outline-none" />
                                                <button type="submit" disabled={loading} className="bg-[#CE1628] text-white [font-family:'Poppin_Bold'] py-2 px-[12px] rounded-[8px] cursor-pointer">
                                                    {loading ? 'Đang cập nhật dữ liệu...' : 'Cập nhật dữ liệu'}
                                                </button>
                                            </form>

                                            <div className="[font-family:'Poppin_Italic']">
                                                Lần cập nhật gần đây nhất: {lastUpdated ? lastUpdated : 'Chưa có'}
                                            </div>
                                        </Dialog.Panel>
                                    </div>
                                </Dialog>
                            </Transition>
                            
                            <Field fullname={user.Ho_ten} mssv={user.MSSV}></Field>
                        </>
                    ) : (
                        <Link href="/login" className="mr-[12px] px-[25px] py-[10px] rounded-full bg-[#CE1628] text-white text-[14px] [font-family:'Poppin_Bold'] leading-[20px] tracking-[0.1px] cursor-pointer">
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
