import { NextRequest, NextResponse } from 'next/server';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
import * as cheerio from 'cheerio';

const PROGRAM_URL = 'https://ctt-sis.hust.edu.vn/Students/StudentProgram.aspx';
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

        const response = await client.get(PROGRAM_URL, {
            responseType: 'arraybuffer',
        });

        const html = Buffer.from(response.data).toString('utf-8');
        const $ = cheerio.load(html);

        if (html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbUserName_I') || html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbPassword_I')) {
            return NextResponse.json({ success: false, message: 'Session hết hạn' }, { status: 401 });
        }

        const rows = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_ProgramCoursePanel_gvStudentProgram .dxgvDataRow');
        const studentclass: any[] = [];

        rows.each((_, row) => {
            const columns = $(row).find('td.dxgv');

            studentclass.push({
                maHPCTDT: $(columns[2]).text().trim(),
                tenHPCTDT: $(columns[3]).text().trim(),
                kyhocCTDT: $(columns[4]).text().trim(),
                tinchiDT: $(columns[6]).text().trim(),
                maHPhoc: $(columns[8]).text().trim(),
                ghichuHPH: $(columns[9]).text().trim(),
                dienchuCTDT: $(columns[10]).text().trim(),
                diemsoCTDT: $(columns[11]).text().trim(),
                vienkhoaDT: $(columns[12]).text().trim(),
            });
        });

        return NextResponse.json({ success: true, data: studentclass });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Lỗi khi lấy info' }, { status: 500 });
    }
}