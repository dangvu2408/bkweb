export default function Header() {
    return (
        <header className="flex items-center fixed top-0 right-0 h-[70px] px-[60px] z-[100] min-w-[660px] left-[240px]">
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
                    <a className="mr-[12px] px-[25px] py-[10px] rounded-full bg-red-600 text-white text-[14px] font-bold leading-[20px] tracking-[0.1px] cursor-pointer">Đăng nhập</a>
                </div>
            </div>
        </header>
    );
}
