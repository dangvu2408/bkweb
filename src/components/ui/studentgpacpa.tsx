'use client'; 

import { useEffect, useState } from 'react';
import {
    AreaChart, BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area
} from 'recharts';

interface StudentGPACPA {
    hockihoc: string;
    gpa: string;
    cpa: string;
    tinchiqua: string;
    tinchitichluy: string;
    tinchino: string;
    tinchidk: string;
    trinhdo: string;
    canhbao: string;
    thieudiem: string;
    khongtinh: string;
    ctdtsv: string;
    dukienxlht: string;
    xulichinhthuc: string;
}

export default function StudentGPACPA() {
    const [data, setData] = useState<StudentGPACPA[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) return;

        const cached = localStorage.getItem('aggregatescore_cache');
        if (cached) {
            const { data, time } = JSON.parse(cached);
            if (Date.now() - time < 10 * 60 * 1000) {
                setData(data);
                setLoading(false);
                return;
            }
        }

        fetch('/api/aggregatescore', {
            method: 'POST',
            body: JSON.stringify({ sessionId }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setData(json.data);
                    localStorage.setItem('aggregatescore_cache', JSON.stringify({
                        data: json.data,
                        time: Date.now()
                    }));
                } else {
                    console.error('API trả về lỗi:', json.message);
                }
            })
            .catch((err) => console.error('Lỗi lấy:', err))
            .finally(() => setLoading(false));
    }, []);
    const sortedData = [...data].sort((a, b) => a.hockihoc.localeCompare(b.hockihoc));

    if (loading) return <div>Đang tải ...</div>;

    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">BẢNG ĐIỂM TỔNG HỢP</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                    <tr>
                        <th className="border px-2 py-1">Học kì</th>
                        <th className="border px-2 py-1">GPA</th>
                        <th className="border px-2 py-1">CPA</th>
                        <th className="border px-2 py-1">Tín chỉ qua</th>
                        <th className="border px-2 py-1">Tín chỉ tích lũy</th>
                        <th className="border px-2 py-1">Tín chỉ nợ</th>
                        <th className="border px-2 py-1">Tín chỉ đăng ký</th>
                        <th className="border px-2 py-1">Trình độ</th>
                        <th className="border px-2 py-1">Cảnh báo</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((stdcpagpa, idx) => (
                    <tr key={idx}>
                        <td className="border px-2 py-1">{stdcpagpa.hockihoc}</td>
                        <td className="border px-2 py-1">{stdcpagpa.gpa}</td>
                        <td className="border px-2 py-1">{stdcpagpa.cpa}</td>
                        <td className="border px-2 py-1">{stdcpagpa.tinchiqua}</td>
                        <td className="border px-2 py-1">{stdcpagpa.tinchitichluy}</td>
                        <td className="border px-2 py-1">{stdcpagpa.tinchino}</td>
                        <td className="border px-2 py-1">{stdcpagpa.tinchidk}</td>
                        <td className="border px-2 py-1">{stdcpagpa.trinhdo}</td>
                        <td className="border px-2 py-1">{stdcpagpa.canhbao}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {sortedData.length > 0 && (
                <div className='flex flex-col gap-4 mt-6'>
                    <h2 className="text-center [font-family:'Poppin_Bold'] text-lg mb-2">PHÂN TÍCH KẾT QUẢ HỌC TẬP</h2>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full md:w-[48%] h-64 bg-white p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sortedData.map(d => ({
                                    term: d.hockihoc,
                                    GPA: parseFloat(d.gpa),
                                }))}>
                                    <defs>
                                        <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#d32f2f" stopOpacity={0.5} />
                                            <stop offset="100%" stopColor="#d32f2f" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" strokeWidth={1.2}/>
                                    <XAxis dataKey="term" />
                                    <YAxis domain={[0, 4]} tickCount={9} />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="GPA" stroke="none" fill="url(#gpaGradient)" />
                                    <Line type="monotone" dataKey="GPA" stroke="#d32f2f" dot strokeWidth={2} fill="url(#gpaGradient)"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="w-full md:w-[48%] h-64 bg-white p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sortedData.map(d => ({
                                    term: d.hockihoc,
                                    CPA: parseFloat(d.cpa),
                                }))}>
                                    <defs>
                                        <linearGradient id="cpaGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1976d2" stopOpacity={0.5} />
                                            <stop offset="100%" stopColor="#1976d2" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" strokeWidth={1.2} />
                                    <XAxis dataKey="term" />
                                    <YAxis domain={[0, 4]} tickCount={9} />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="CPA" stroke="none" fill="url(#cpaGradient)" />
                                    <Line type="monotone" dataKey="CPA" stroke="#1976d2" dot strokeWidth={2} fill="url(#cpaGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full md:w-[48%] h-64 bg-white p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sortedData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hockihoc" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar name="Tín chỉ qua" dataKey="tinchiqua" fill="#22c55e" barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full md:w-[48%] h-64 bg-white p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sortedData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hockihoc" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar name="Tín chỉ tích lũy" dataKey="tinchitichluy" fill="#f59e0b" barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}