import Link from "next/link";

interface NotiProps {
    NotiTilte: string;
    NotiLink: string;
    NotiDate: string;
}

export default function UniNoti({ NotiTilte, NotiLink, NotiDate }: NotiProps) {
    return(
        <div className="flex flex-col w-[33.333333%] h-full p-[10px] bg-[rgba(0,0,0,0.05)] rounded-[8px] cursor-pointer">
            <Link href={NotiLink}>
                <div className="[font-family:'Poppin Italic'] rounded-[100px] px-[10px] py-[4px] text-[12px] italic font-bold bg-[rgba(0,0,0,0.05)] w-fit tracking-[0.2px] mb-[5px]">THÔNG BÁO MỚI NHẤT</div>
                <span className="[font-family:'Poppin_Bold'] text-[15px] line-clamp-2">{NotiTilte}</span>
                <span className="[font-family:'Poppin'] text-[15px] line-clamp-2">{NotiDate}</span>
            </Link>
        </div>
    );
}