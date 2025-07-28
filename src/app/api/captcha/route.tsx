import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import axios from 'axios';

export async function GET() {
    try {
        const loginUrl = 'https://ctt-sis.hust.edu.vn/Account/Login.aspx';

        const response = await axios.get(loginUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            },
        });

        const cookies = response.headers['set-cookie']?.join('; ') || '';
        const $ = cheerio.load(response.data);

        const viewState = $('#__VIEWSTATE').val();
        const eventValidation = $('#__EVENTVALIDATION').val();
        const captchaImgId = '#ctl00_ctl00_contentPane_MainPanel_MainContent_ASPxCaptcha1_IMG';
        const captchaSrc = $(captchaImgId).attr('src');

        if (!captchaSrc) {
            return NextResponse.json({ error: 'CAPTCHA not found' }, { status: 500 });
        }

        const captchaUrl = `https://ctt-sis.hust.edu.vn${captchaSrc}`;
        const captchaRes = await axios.get(captchaUrl, {
            headers: {
                'Cookie': cookies,
                'User-Agent': 'Mozilla/5.0',
            },
            responseType: 'arraybuffer',
        });

        const captchaBase64 = `data:image/png;base64,${Buffer.from(captchaRes.data).toString('base64')}`;

        return NextResponse.json({
            viewState,
            eventValidation,
            captchaUrl: captchaBase64,
            cookies,
        });
    } catch (err) {
        console.error('Lỗi CAPTCHA:', err);
        return NextResponse.json({ error: 'Lỗi server khi tải CAPTCHA' }, { status: 500 });
    }
}
