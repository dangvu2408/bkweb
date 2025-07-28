export default function notification() {
    return(
        <div className="flex flex-col gap-[10px] items-center self-center">
            <span className="text-black text-[14px]">Bạn chưa đăng nhập, vui lòng đăng nhập!</span>
            <a className="mr-[12px] px-[25px] py-[10px] rounded-full bg-red-600 text-white text-[14px] font-bold leading-[20px] tracking-[0.1px] cursor-pointer">Đăng nhập</a>
        </div>
    );
}