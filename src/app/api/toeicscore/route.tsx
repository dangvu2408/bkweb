import { NextRequest, NextResponse } from 'next/server';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
import * as cheerio from 'cheerio';

const TOEIC_URL = 'https://ctt-sis.hust.edu.vn/Students/ToeicMarks.aspx';
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

        const response = await client.get(TOEIC_URL, {
            responseType: 'arraybuffer',
        });

        const html = Buffer.from(response.data).toString('utf-8');
        const $ = cheerio.load(html);

        if (html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbUserName_I') || html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbPassword_I')) {
            return NextResponse.json({ success: false, message: 'Session hết hạn' }, { status: 401 });
        }

        const rows = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_gvStudents .dxgvDataRow');
        const studentclass: any[] = [];

        rows.each((_, row) => {
            const columns = $(row).find('td.dx-nowrap');

            studentclass.push({
                maSV: $(columns[0]).text().trim(),
                hotenSV: $(columns[1]).text().trim(),
                ngaySinh: $(columns[2]).text().trim(),
                hocKi: $(columns[3]).text().trim(),
                ghiChu: $(columns[4]).text().trim(),
                ngayThi: $(columns[5]).text().trim(),
                diemNghe: $(columns[6]).text().trim(),
                diemDoc: $(columns[7]).text().trim(),
                diemViet: $(columns[8]).text().trim(),
                diemNoi: $(columns[9]).text().trim(),
                diemTong: $(columns[10]).text().trim(),
            });
        });

        return NextResponse.json({ success: true, data: studentclass });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Lỗi khi lấy info' }, { status: 500 });
    }
}