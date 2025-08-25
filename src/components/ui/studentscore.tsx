'use client'; 

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import GaugeComponent from "react-gauge-component";

interface studentscore {
    HocKi: string;
    MaHocPhan: string;
    TenHocPhan: string;
    TinChi: string;
    LopHoc: string;
    diemQT: string;
    diemThi: string;
    diemChu: string;
}

interface countTC {
    hockihoc: string;
    mahp: string;
    tenhp: string;
    tinchi: string;
    diemhp: string;
    tenhpE: string;
}

const GRADES = ["A+", "A", "B+", "B", "C+", "C", "D+", "D", "F"];

const COLORS = [
    "#ff6384", // A+
    "#36a2eb", // A
    "#4bc0c0", // B+
    "#9966ff", // B
    "#ff9f40", // C+
    "#ffcd56", // C
    "#c9cbcf", // D+
    "#8d6e63", // D
    "#e53935", // F
];

const TOTAL_TIN_CHI = 132;

export default function StudentScore() {
    const [data, setData] = useState<studentscore[]>([]);
    const [dataTC, setDataTC] = useState<countTC[]>([]);

    useEffect(() => {
        const data = localStorage.getItem('studentScore');
        if (data) {
            setData(JSON.parse(data));
        } 
    }, []);

    useEffect(() => {
        const data = localStorage.getItem('studentcoursegrade');
        if (data) {
            setDataTC(JSON.parse(data));
        } 
    }, []);

    const gradeCounts: Record<string, number> = {};
    data.forEach((item) => {
        const grade = item.diemChu.trim();
        if (!grade) return;
        gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
    });

    const chartData = GRADES.map((grade) => ({
        name: grade,
        value: gradeCounts[grade] || 0,
    })).filter((item) => item.value > 0);

    const totalTinChiDaHoc = dataTC.reduce((sum, item) => sum + Number(item.tinchi || 0), 0);
    const percent = (totalTinChiDaHoc / TOTAL_TIN_CHI) * 100;

    return (

        <div className="w-full flex flex-col gap-[10px] text-[#32323d] pb-[10px]">
            <h1 className="[font-family:'Poppin_Bold'] mb-2 text-center text-2xl">BẢNG ĐIỂM HỌC PHẦN</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-[#E0ECFF]">
                    <tr>
                        <th className="border px-2 py-1">Học kì</th>
                        <th className="border px-2 py-1">Mã học phần</th>
                        <th className="border px-2 py-1">Tên học phần</th>
                        <th className="border px-2 py-1">Tín chỉ</th>
                        <th className="border px-2 py-1">Lớp học</th>
                        <th className="border px-2 py-1">Điểm QT</th>
                        <th className="border px-2 py-1">Điểm thi</th>
                        <th className="border px-2 py-1">Điểm chữ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((stdscore, idx) => (
                        <tr key={idx}>
                            <td className="border px-2 py-1">{stdscore.HocKi}</td>
                            <td className="border px-2 py-1">{stdscore.MaHocPhan}</td>
                            <td className="border px-2 py-1">{stdscore.TenHocPhan}</td>
                            <td className="border px-2 py-1">{stdscore.TinChi}</td>
                            <td className="border px-2 py-1">{stdscore.LopHoc}</td>
                            <td className="border px-2 py-1">{stdscore.diemQT}</td>
                            <td className="border px-2 py-1">{stdscore.diemThi}</td>
                            <td className="border px-2 py-1">{stdscore.diemChu}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="w-full h-[400px] flex ">
                <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} label >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[GRADES.indexOf(entry.name)]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="w-1/2 h-full flex items-center justify-center">
                    <GaugeComponent className='h-full w-[420px]'
                        value={percent}
                        type="radial"
                        labels={{
                            valueLabel: { 
                                formatTextValue: () => `${totalTinChiDaHoc}/${TOTAL_TIN_CHI} tín chỉ` 
                            },
                            tickLabels: {
                                type: "inner",
                                ticks: [
                                    { value: 0 },
                                    { value: 100 },
                                ],
                            },
                        }}
                        arc={{
                            colorArray: ["#FF4D4F", "#FAAD14", "#52C41A"],
                            subArcs: [{ limit: 33 }, { limit: 66 }, { limit: 100 }],
                            width: 0.3,
                        }}
                    />
                </div>
            </div>

        </div>
    );

}