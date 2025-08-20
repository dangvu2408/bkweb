"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, addDays } from "date-fns";
import { vi } from "date-fns/locale";

interface Lesson {
    id: string;
    start: string;
    end: string;
    title: string;
    timeDetail: string;
    location: string;
}

interface TimetableClass {
    Ma_lop: string;
    Ma_lop_kem: string;
    Ten_lop: string;
    Ma_HP: string;
    Loai_lop: string;
    TT_lop: string;
    Yeu_cau: string;
    Trang_thai_DK: string;
    Loai_DK: string;
    Tin_chi: string;
}

interface TimetableTime {
    Thu: string;
    Thoi_gian: string;
    Tuan_hoc: string;
    Phong_hoc: string;
    Lop_hoc: string;
}

export default function TimetableCalendar() {
    const [value, setValue] = useState<Date>(new Date());
    const [timetable, setTimetable] = useState<TimetableClass[]>([]);
    const [timetableTime, setTimetableTime] = useState<TimetableTime[]>([]);
    const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
    const [markedDates, setMarkedDates] = useState<string[]>([]);

    const week1Start = new Date(2025, 8, 8); 

    useEffect(() => {
        const data = localStorage.getItem("timetabletemp");
        if (data) {
            const parsed = JSON.parse(data);
            setTimetable(parsed.timetable || []);
            setTimetableTime(parsed.timetable_time || []);

            const lessonMap: Record<string, Lesson[]> = {};
            const dates: string[] = [];

            parsed.timetable_time.forEach((item: TimetableTime) => {
                const thu = parseInt(item.Thu); 
                const weeks = expandWeeks(item.Tuan_hoc); 

                weeks.forEach((week: number) => {
                    const jsDay = parseInt(item.Thu) - 2;
                    const day = addDays(week1Start, (week - 1) * 7 + jsDay);
                    const dateKey = format(day, "yyyy-MM-dd");

                    const [start, end] = item.Thoi_gian.split("-");

                    const lop = parsed.timetable.find((c: TimetableClass) => c.Ma_lop === item.Lop_hoc);
                    const title = lop ? `${lop.Ten_lop} – ${lop.Ma_HP}` : item.Lop_hoc;

                    const lesson: Lesson = {
                        id: item.Lop_hoc,
                        start,
                        end,
                        title,
                        timeDetail: `Thứ ${item.Thu}, ${item.Thoi_gian}`,
                        location: item.Phong_hoc,
                    };

                    if (!lessonMap[dateKey]) lessonMap[dateKey] = [];
                    lessonMap[dateKey].push(lesson);

                    dates.push(dateKey);
                });
            });
            setLessons(lessonMap);
            setMarkedDates([...new Set(dates)]);
        }
    }, []);


    return (
        <div className="flex">
            <Calendar
                onChange={(val) => setValue(val as Date)}
                value={value}
                tileContent={({ date, view }) =>
                    view === "month" && markedDates.includes(format(date, "yyyy-MM-dd")) ? (
                        <div className="react-calendar__tile--has-lesson"></div>
                    ) : null
                }
                formatMonthYear={(locale, date) =>
                    format(date, "MMMM, yyyy", { locale: vi })
                }
            />

            <div className="flex-1 p-[20px]">
                <h2 className="text-[20px] [font-family:'Poppin_Bold'] mb-4 text-center">Thông tin chi tiết</h2>
                {lessons[format(value as Date, "yyyy-MM-dd")]  ? (
                <div className="flex flex-col gap-4">
                    {lessons[format(value as Date, "yyyy-MM-dd")].map((lesson) => (
                        <div key={lesson.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center text-black [font-family:'Poppin']">
                                    <span>{lesson.start}</span>
                                    <div className="w-[2px] h-[20px] bg-[#D9D9D9]"></div>
                                    <span>{lesson.end}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="[font-family:'Poppin_Bold'] text-red-600">
                                        {lesson.id} – {lesson.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Thời gian: {lesson.timeDetail}
                                        <br />
                                        Địa điểm: {lesson.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                ) : (
                    <p className="text-gray-500 italic">
                        Không có lịch học cho ngày này.
                    </p>
                )}
            </div>
        </div>
    );
}


function expandWeeks(weekStr: string): number[] {
    const weeks: number[] = [];
    weekStr.split(",").forEach((part) => {
        if (part.includes("-")) {
            const [start, end] = part.split("-").map(Number);
            for (let i = start; i <= end; i++) weeks.push(i);
        } else {
            weeks.push(Number(part));
        }
    });
    return weeks;
}