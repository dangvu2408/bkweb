import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="relative z-[100] w-[240px] bg-[rgba(0,0,0,0.05)] h-full min-h-screen">
            <div className="flex flex-col h-full pt-[70px] overflow-hidden">
                <div
                    className="fixed top-0 left-0 w-[240px] h-[70px] px-[25px] pl-[28px] flex z-10"
                    style={{
                        WebkitMaskImage: 'linear-gradient(0deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.8) 10%, #fff 25%, #fff)',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: '100% 100%',
                        backgroundColor: '#F2F2F2', 
                    }}
                >
                    <div className="mt-[15px] w-[120px] h-[40px] inline-block bg-[url('/images/logo.png')] bg-center bg-contain bg-no-repeat" />
                </div>
                <div className="h-full overflow-hidden">
                    <nav className="w-full relative mb-4">
                        <ul>
                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <Link href="/student-info" title="Thông tin sinh viên" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="personIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="personIconTitle">Person</title> <path d="M4,20 C4,17 8,17 10,15 C11,14 8,14 8,9 C8,5.667 9.333,4 12,4 C14.667,4 16,5.667 16,9 C16,14 13,14 14,15 C16,17 20,17 20,20"/> </svg>
                                    <span>Thông tin sinh viên</span>
                                </Link>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <Link href="/student-class" title="Thông tin lớp sinh viên" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="peopleIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="peopleIconTitle">People</title> <path d="M1 18C1 15.75 4 15.75 5.5 14.25 6.25 13.5 4 13.5 4 9.75 4 7.25025 4.99975 6 7 6 9.00025 6 10 7.25025 10 9.75 10 13.5 7.75 13.5 8.5 14.25 10 15.75 13 15.75 13 18M12.7918114 15.7266684C13.2840551 15.548266 13.6874862 15.3832994 14.0021045 15.2317685 14.552776 14.9665463 15.0840574 14.6659426 15.5 14.25 16.25 13.5 14 13.5 14 9.75 14 7.25025 14.99975 6 17 6 19.00025 6 20 7.25025 20 9.75 20 13.5 17.75 13.5 18.5 14.25 20 15.75 23 15.75 23 18"/> <path strokeLinecap="round" d="M12,16 C12.3662741,15.8763472 12.6302112,15.7852366 12.7918114,15.7266684"/> </svg>
                                    <span>Thông tin lớp sinh viên</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="relative h-px border-t border-t-[rgba(0,0,0,0.1)] m-[0px_21px_21px_21px]"></div>
                    <nav className="w-full relative mb-4 overflow-hidden h-full">
                        <ul>
                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Chương trình đào tạo" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="dashboardIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="dashboardIconTitle">Dashboard</title> <rect width="20" height="20" x="2" y="2"/> <path d="M11 7L17 7M11 12L17 12M11 17L17 17"/> <line x1="7" y1="7" x2="7" y2="7"/> <line x1="7" y1="12" x2="7" y2="12"/> <line x1="7" y1="17" x2="7" y2="17"/> </svg>
                                    <span>Chương trình đào tạo</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <Link href="/time-table" title="Thời khóa biểu" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="calendarIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="calendarIconTitle">Calendar</title> <path d="M3 5H21V21H3V5Z"/> <path d="M21 9H3"/> <path d="M7 5V3"/> <path d="M17 5V3"/> </svg>
                                    <span>Thời khóa biểu</span>
                                </Link>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Thời khóa biểu tạm thời" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="calendarEventIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="calendarEventIconTitle">Calendar event</title> <path d="M3 5H21V21H3V5Z"/> <path d="M21 9H3"/> <path d="M7 5V3"/> <path d="M17 5V3"/> <rect x="15" y="15" width="2" height="2"/> </svg>
                                    <span>Thời khóa biểu tạm thời</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <Link href="/student-score" title="Bảng điểm học phần" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="tableVerticalIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="tableVerticalIconTitle">Data table</title> <rect x="3" y="2" width="18" height="20"/> <line x1="12" y1="2" x2="12" y2="22"/> <line x1="21" y1="7" x2="3" y2="7"/> <line x1="21" y1="17" x2="3" y2="17"/> <line x1="21" y1="12" x2="3" y2="12"/> </svg>
                                    <span>Bảng điểm học phần</span>
                                </Link>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Điểm tổng hợp" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="tableHorizontalIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="tableHorizontalIconTitle">Data table</title> <path d="M22 4V19H2L2 4L22 4Z"/> <line x1="22" y1="9" x2="2" y2="9"/> <line x1="22" y1="14" x2="2" y2="14"/> <path d="M12 19L12 4"/> </svg>
                                    <span>Điểm tổng hợp</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <Link href="/toeic-score" title="Điểm thi TOEIC" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="languageIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="languageIconTitle">Language</title> <circle cx="12" cy="12" r="10"/> <path strokeLinecap="round" d="M12,22 C14.6666667,19.5757576 16,16.2424242 16,12 C16,7.75757576 14.6666667,4.42424242 12,2 C9.33333333,4.42424242 8,7.75757576 8,12 C8,16.2424242 9.33333333,19.5757576 12,22 Z"/> <path strokeLinecap="round" d="M2.5 9L21.5 9M2.5 15L21.5 15"/> </svg>
                                    <span>Điểm thi TOEIC</span>
                                </Link>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Điểm kỳ học mới nhất" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="inboxAltIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="inboxAltIconTitle">Inbox</title> <path d="M3 13H9V16H15V13H21"/> <path fillRule="evenodd" clipRule="evenodd" d="M3 13L5 4H19L21 13V20H3V13Z"/> <path d="M7 7H17"/> <path d="M6.5 10H17.5"/> </svg>
                                    <span>Điểm kỳ học mới nhất</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Danh sách đồ án" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="newsIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="newsIconTitle">News</title> <path d="M22 5L22 17C22 18.3333333 21.3333333 19 20 19 18.6666667 19 18 18.3333333 18 17L18 5 2 5 2 16C2 18 3 19 5 19 7 19 12 19 20 19M6 14L7 14M11 14L14 14M6 10L14 10"/> </svg>
                                    <span>Danh sách đồ án</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="relative h-px border-t border-t-[rgba(0,0,0,0.1)] m-[0px_21px_21px_21px]"></div>
                    <nav className="w-full relative mb-4 overflow-hidden h-full">
                        <ul>
                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Thông tin công nợ học phí" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="dolarIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="dolarIconTitle">Dolar</title> <path d="M12 4L12 6M12 18L12 20M15.5 8C15.1666667 6.66666667 14 6 12 6 9 6 8.5 7.95652174 8.5 9 8.5 13.140327 15.5 10.9649412 15.5 15 15.5 16.0434783 15 18 12 18 10 18 8.83333333 17.3333333 8.5 16"/> </svg>
                                    <span>Thông tin công nợ học phí</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Bản đồ Bách khoa" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="mapIconTitle" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000" className="w-[20px]"> <title id="mapIconTitle">Map</title> <polygon points="9 19 3 21 3 5 9 3 15 5 21 3 21 18.5 15 21"/> <path strokeLinecap="round" d="M15 5L15 21M9 3L9 19"/> </svg>
                                    <span>Bản đồ Bách khoa</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
}