import { NextRequest, NextResponse } from 'next/server';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
import * as cheerio from 'cheerio';

const TIMETABLE_URL = 'https://ctt-sis.hust.edu.vn/Students/Timetables.aspx';
declare global {
    var sessionStore: Record<string, { jar: CookieJar }>;
}
globalThis.sessionStore = globalThis.sessionStore || {};

export async function POST(req: NextRequest) {
    try {
        const { sessionId } = await req.json(); 
        
        const jar = globalThis.sessionStore[sessionId]?.jar;

        if (!jar) {
            return NextResponse.json({ success: false, message: 'Session hết hạn' }, { status: 401 });
        }

        const client = wrapper(axios.create({ jar }));

        const response = await client.get(TIMETABLE_URL, {
            responseType: 'arraybuffer',
        });

        const html = Buffer.from(response.data).toString('utf-8');
        const $ = cheerio.load(html);

        const rows = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_gvStudentRegister_DXMainTable .dxgvDataRow_Mulberry');
        const timetable: any[] = [];

        rows.each((_, row) => {
            const columns = $(row).find('td.dxgv');

            timetable.push({
                Thoi_gian: $(columns[0]).text().trim(),
                Tuan_hoc: $(columns[1]).text().trim(),
                Phong_hoc: $(columns[2]).text().trim(),
                Ma_lop: $(columns[3]).text().trim(),
                Loai_lop: $(columns[4]).text().trim(),
                Nhom: $(columns[5]).text().trim(),
                Ma_HP: $(columns[6]).text().trim(),
                Ten_lop: $(columns[7]).text().trim(),
                Ghi_chu: $(columns[8]).text().trim(),
                Hinh_thuc_day: $(columns[9]).text().trim(),
                Giang_vien: $(columns[10]).text().trim(),
                Link_online: $(columns[11]).text().trim(),
                Code_teams: $(columns[12]).text().trim(),
            });
        });

        return NextResponse.json({ success: true, data: timetable });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Lỗi khi lấy TKB' }, { status: 500 });
    }
}
