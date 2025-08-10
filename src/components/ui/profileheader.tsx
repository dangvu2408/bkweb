import Link from "next/link";

interface field {
    fullname: string;
    mssv: string;
}

export default function profileheader({ fullname, mssv }: field) {
    return(
        <div className="flex flex-row gap-[20px] items-center self-center">
            <div className="flex flex-col text-right text-[14px]">
                <span className="text-[#000] [font-family:'Poppin_Bold']">{fullname}</span>
                <span className="text-[#000] [font-family:'Poppin_Bold']">{mssv}</span>
            </div>
            <figure className="w-[45px] h-[45px] bg-transparent rounded-full overflow-hidden">
                <img alt="default avatar" className="h-auto w-full aspect-square inline-block align-top rounded-full object-cover object-center" src={'/images/avatar.jpg'}></img>
            </figure>
        </div>
    );
}