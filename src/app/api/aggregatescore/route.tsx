import { NextRequest, NextResponse } from 'next/server';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
import * as cheerio from 'cheerio';

const STUDENT_SCORE_URL = 'https://ctt-sis.hust.edu.vn/Students/StudentCourseMarks.aspx';

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

        const response = await client.get(STUDENT_SCORE_URL, {
            responseType: 'arraybuffer',
        });

        const html = Buffer.from(response.data).toString('utf-8');
        const $ = cheerio.load(html);

        if (html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbUserName_I') || html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbPassword_I')) {
            return NextResponse.json({ success: false, message: 'Session hết hạn' }, { status: 401 });
        }

        const rows = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_gvResults .dxgvDataRow');
        const studentclass: any[] = [];

        rows.each((_, row) => {
            const columns = $(row).find('td.dx-nowrap');

            studentclass.push({
                hockihoc: $(columns[0]).text().trim(),
                gpa: $(columns[1]).text().trim(),
                cpa: $(columns[2]).text().trim(),
                tinchiqua: $(columns[3]).text().trim(),
                tinchitichluy: $(columns[4]).text().trim(),
                tinchino: $(columns[5]).text().trim(),
                tinchidk: $(columns[6]).text().trim(),
                trinhdo: $(columns[7]).text().trim(),
                canhbao: $(columns[8]).text().trim(),
                thieudiem: $(columns[9]).text().trim(),
                khongtinh: $(columns[10]).text().trim(),
                ctdtsv: $(columns[11]).text().trim(),
                dukienxlht: $(columns[12]).text().trim(),
                xulichinhthuc: $(columns[13]).text().trim(),
            });
        });

        return NextResponse.json({ success: true, data: studentclass });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Lỗi khi lấy info' }, { status: 500 });
    }
}