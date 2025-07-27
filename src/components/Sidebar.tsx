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
                                <a title="Thông tin sinh viên" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span>Thông tin sinh viên</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Thông tin lớp sinh viên" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>Thông tin lớp sinh viên</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="relative h-px border-t border-t-[rgba(0,0,0,0.1)] m-[0px_21px_21px_21px]"></div>
                    <nav className="w-full relative mb-4 overflow-hidden h-full">
                        <ul>
                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Chương trình đào tạo" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                    <span>Chương trình đào tạo</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Thời khóa biểu" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <span>Thời khóa biểu</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Thời khóa biểu tạm thời" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <span>Thời khóa biểu tạm thời</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Bảng điểm học phần" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-table"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg>
                                    <span>Bảng điểm học phần</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Điểm tổng hợp" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-table"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg>
                                    <span>Điểm tổng hợp</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Điểm thi TOEIC" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-table"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg>
                                    <span>Điểm thi TOEIC</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Điểm kỳ học mới nhất" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-table"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg>
                                    <span>Điểm kỳ học mới nhất</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Danh sách đồ án" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-table"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-table"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg>
                                    <span>Thông tin công nợ học phí</span>
                                </a>
                            </li>

                            <li className="text-[#32323d] border-l-[3px] border-l-transparent hover:bg-[rgba(0,0,0,0.05)] cursor-pointer">
                                <a title="Bản đồ Bách khoa" className="flex items-center gap-[10px] text-sm leading-5 font-medium py-[12px] px-[21px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-table"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg>
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