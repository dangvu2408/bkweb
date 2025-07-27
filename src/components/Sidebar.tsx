export default function Sidebar() {
    return (
        <aside className="relative z-[100] w-[240px] bg-[rgba(0,0,0,0.05)] h-full pt-[81px] pb-[54px]">
            <div className="flex flex-col h-full">
                <nav className="w-full">
                    <div className="fixed w-[240px] top-0 px-[25px] pl-[28px] flex items-center">
                        <div className="mt-[10px] w-[150px] h-[60px] inline-block bg-[url('/images/logo.png')] bg-center bg-contain bg-no-repeat"></div>
                    </div>
                </nav>
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
            </div>
        </aside>
    );
}