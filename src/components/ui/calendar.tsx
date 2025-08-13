"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Lesson {
  id: string;
  start: string;
  end: string;
  title: string;
  timeDetail: string;
  location: string;
}

export default function TimetableCalendar() {
    const [value, setValue] = useState<Date>(new Date());

    const markedDates = ["2025-10-01", "2025-10-08", "2025-10-15", "2025-10-22"];

    const lessons: Record<string, Lesson[]> = {
        "2025-10-01": [
            {
                id: "163185",
                start: "12:30",
                end: "15:00",
                title: "Cơ sở truyền số liệu – ET4070",
                timeDetail: "Chiều Thứ 4, Tiết 1-3",
                location: "D4-306",
            },
            {
                id: "163181",
                start: "15:05",
                end: "17:35",
                title: "Lý thuyết mật mã – ET3310",
                timeDetail: "Chiều Thứ 4, Tiết 4-6",
                location: "D4-306",
            },
        ],
    };

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return (
        <div className="flex bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
                <Calendar
                    onChange={(val) => setValue(val as Date)}
                    value={value}
                    tileContent={({ date, view }) =>
                        view === "month" && markedDates.includes(formatDate(date)) ? (
                        <div className="flex justify-center items-center">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 mt-1"></span>
                        </div>
                        ) : null
                    }
                />
            </div>

            <div className="flex-1 bg-[#F5FAFF] p-4">
                <h2 className="text-lg font-bold mb-4">Thông tin chi tiết</h2>
                {lessons[formatDate(value as Date)] ? (
                <div className="flex flex-col gap-4">
                    {lessons[formatDate(value as Date)].map((lesson) => (
                        <div
                            key={lesson.id}
                            className="bg-white p-4 rounded-lg shadow-sm flex flex-col"
                        >
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center text-gray-600 font-semibold">
                                    <span>{lesson.start}</span>
                                    <span>|</span>
                                    <span>{lesson.end}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-red-600">
                                        {lesson.id} – {lesson.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Thời gian: {lesson.timeDetail}
                                        <br />
                                        Địa điểm: {lesson.location}
                                        <br />
                                        Bài học:
                                        <br />
                                        Giảng viên:
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
