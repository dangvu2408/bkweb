import { NextRequest, NextResponse } from 'next/server';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
import * as cheerio from 'cheerio';

const COURSE_REGISTER_URL = 'https://ctt-sis.hust.edu.vn/Students/CoursesRegister.aspx';
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

        const response = await client.get(COURSE_REGISTER_URL, {
            responseType: 'arraybuffer',
        });

        const html = Buffer.from(response.data).toString('utf-8');
        const $ = cheerio.load(html);

        if (html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbUserName_I') || html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbPassword_I')) {
            return NextResponse.json({ success: false, message: 'Session hết hạn' }, { status: 401 });
        }

        const rows = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_gvRegisteredList .dxgvDataRow_Mulberry');
        const titleRow = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_gvRegisteredList_DXTitle td.dxgvTitlePanel_Mulberry').first().text();
        const hk = titleRow.substring(25, 30).trim();

        const footerRow = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_gvRegisteredList_DXFooterRow td.dxgv').eq(4).text();
        const tongtinchi = footerRow.substring(19).trim();

        const thongtinDK: any[] = [];

        rows.each((_, row) => {
            const columns = $(row).find('td.dxgv');

            thongtinDK.push({
                maHPDK: $(columns[0]).text().trim(),
                tenHPDK: $(columns[1]).text().trim(),
                ngayDK: $(columns[2]).text().trim(),
                TTDK: $(columns[3]).text().trim(),
                soTCDK: $(columns[4]).text().trim()
            });
        });

        return NextResponse.json({ success: true, data: {
            thongtinHK: hk,
            tongtinchi,
            thongtinDK
        } });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Lỗi khi lấy info' }, { status: 500 });
    }
}