// /app/api/tuition/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
import * as cheerio from 'cheerio';

const TUITION_URL = 'https://ctt-sis.hust.edu.vn/Students/CheckTuition.aspx';

declare global {
  var sessionStore: Record<string, { jar: CookieJar }>;
}
globalThis.sessionStore = globalThis.sessionStore || {};

export async function POST(req: NextRequest) {
    try {
        const { sessionId } = await req.json();
        const jar = globalThis.sessionStore[sessionId]?.jar;

        if (!jar) {
            return NextResponse.json({ success: false, message: 'Session expired' }, { status: 401 });
        }

        const client = wrapper(axios.create({ jar }));
        const { data: htmlBuffer } = await client.get(TUITION_URL, {
            responseType: 'arraybuffer',
        });

        const html = Buffer.from(htmlBuffer).toString('utf-8');
        const $ = cheerio.load(html);

        const table = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_rpEditTables_ASPxCallbackPanel1_gvCourseRegister');
        const note = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_rpEditTables_ASPxCallbackPanel1_TuitionInfo');

        const tuitionList: any[] = [];
        table.find('.dxgvDataRow_Mulberry').each((_, row) => {
            const cells = $(row).find('td.dxgv');
            tuitionList.push({
                maHocPhanHP: $(cells[0]).text().trim(),
                tenHocPhanHP: $(cells[1]).text().trim(),
                soTien1TC: $(cells[2]).text().trim(),
                tinChiHocPhi: $(cells[3]).text().trim(),
                heSoHocPhi: $(cells[4]).text().trim(),
                tongTienHP: $(cells[5]).text().trim(),
                trangThaiDK: $(cells[6]).text().trim(),
                loaiDangKi: $(cells[7]).text().trim(),
                ghiChuHP: $(cells[8]).text().trim(),
            });
        });

        const soTienCanDongHP = note.find('li span').first().text().substring(23).replace('đ.', '').trim();
        const ghiChuSoTienHP = note.find('li span').eq(1).text().replace('tại đây', 'tại https://ctt.hust.edu.vn/DisplayWeb/DisplayBaiViet?baiviet=43430');

        return NextResponse.json({
            success: true,
            data: {
                toanBoCongNoHP: tuitionList,
                soTienCanDongHP,
                ghiChuSoTienHP,
            },
        });
    } catch (err) {
        console.error('Tuition API error:', err);
        return NextResponse.json({ success: false, message: 'Lỗi khi lấy học phí' }, { status: 500 });
    }
}
