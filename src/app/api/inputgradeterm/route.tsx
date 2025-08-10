// /app/api/inputgradeterm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
import * as cheerio from 'cheerio';

const INPUT_GRADE_TERM_URL = 'https://ctt-sis.hust.edu.vn/Students/StudentCheckInputGradeTerm.aspx';

declare global {
    var sessionStore: Record<string, { jar: CookieJar }>;
}
globalThis.sessionStore = globalThis.sessionStore || {};

export async function scrapeInputGradeTerm(client: ReturnType<typeof wrapper>) {
    const response = await client.get(INPUT_GRADE_TERM_URL, {
        responseType: 'arraybuffer',
    });

    const html = Buffer.from(response.data).toString('utf-8');
    const $ = cheerio.load(html);

    if (
        html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbUserName_I') ||
        html.includes('ctl00_ctl00_contentPane_MainPanel_MainContent_tbPassword_I')
    ) {
        throw new Error('Session hết hạn');
    }

    const rows = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_panelGradeTable_gvClassGrade_DXMainTable .dxgvDataRow');
    const studentclass: any[] = [];

    rows.each((_, row) => {
        const columns = $(row).find('td.dxgv');

        studentclass.push({
            masinhvien: $(columns[0]).text().trim(),
            malop: $(columns[1]).text().trim(),
            tenlop: $(columns[2]).text().trim(),
            trongsoqt: $(columns[3]).text().trim(),
            diemqt: $(columns[4]).text().trim(),
            ttdiemqt: $(columns[5]).text().trim(),
            diemthi: $(columns[6]).text().trim(),
            ttdiemthi: $(columns[7]).text().trim(),
        });
    });

    return studentclass;
}

export async function POST(req: NextRequest) {
    try {
        const { sessionId } = await req.json();
        const jar = globalThis.sessionStore[sessionId]?.jar;

        if (!jar) {
            return NextResponse.json({ success: false, message: 'Session hết hạn' }, { status: 401 });
        }

        const client = wrapper(axios.create({ jar }));
        const data = await scrapeInputGradeTerm(client);

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Lỗi khi lấy info' }, { status: 500 });
    }
}
