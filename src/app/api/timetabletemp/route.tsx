
import { NextRequest, NextResponse } from 'next/server';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
import * as cheerio from 'cheerio';

const TIMETABLE_URL = 'https://ctt-sis.hust.edu.vn/Students/TimetablesTemp.aspx';

declare global {
    var sessionStore: Record<string, { jar: CookieJar }>;
}
globalThis.sessionStore = globalThis.sessionStore || {};

export async function scrapeTimetableTemp(client: ReturnType<typeof wrapper>) {
    const response = await client.get(TIMETABLE_URL, { responseType: 'arraybuffer' });
    const html = Buffer.from(response.data).toString('utf-8');
    const $ = cheerio.load(html);

    if (
        html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbUserName_I') ||
        html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbPassword_I')
    ) {
        throw new Error('Session hết hạn');
    }

    const rows = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_gvRegisteredList .dxgvDataRow_Mulberry');
    const rows_time = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_gvTimeTable .dxgvDataRow_Mulberry');
    const timetable: any[] = [];
    const timetable_time: any[] = [];

    rows.each((_, row) => {
        const columns = $(row).find('td.dxgv');
        timetable.push({
            Ma_lop: $(columns[0]).text().trim(),
            Ma_lop_kem: $(columns[1]).text().trim(),
            Ten_lop: $(columns[2]).text().trim(),
            Ma_HP: $(columns[3]).text().trim(),
            Loai_lop: $(columns[4]).text().trim(),
            TT_lop: $(columns[5]).text().trim(),
            Yeu_cau: $(columns[6]).text().trim(),
            Trang_thai_DK: $(columns[7]).text().trim(),
            Loai_DK: $(columns[8]).text().trim(),
            Tin_chi: $(columns[9]).text().trim(),
        });
    });

    rows_time.each((_, row) => {
        const columns = $(row).find('td.dxgv');
        timetable_time.push({
            Thu: $(columns[0]).text().trim(),
            Thoi_gian: $(columns[1]).text().trim(),
            Tuan_hoc: $(columns[2]).text().trim(),
            Phong_hoc: $(columns[3]).text().trim(),
            Lop_hoc: $(columns[4]).text().trim(),
        });
    });

    return {
        timetable,
        timetable_time
    };
}

export async function POST(req: NextRequest) {
    try {
        const { sessionId } = await req.json();
        const jar = globalThis.sessionStore[sessionId]?.jar;

        if (!jar) {
            return NextResponse.json({ success: false, message: 'Session hết hạn' }, { status: 401 });
        }

        const client = wrapper(axios.create({ jar }));
        const data = await scrapeTimetableTemp(client);

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Lỗi khi lấy TKB' }, { status: 500 });
    }
}
