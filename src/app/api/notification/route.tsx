import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

const DTDH_URL = 'https://ctt.hust.edu.vn/DisplayWeb/DisplayListBaiViet?tag=%C4%90T%C4%90H';
const BASE_URL = 'https://ctt.hust.edu.vn';

export async function GET(req: NextRequest) {
    try {
        const { data: html } = await axios.get(DTDH_URL, {
            responseType: 'arraybuffer'
        });

        const content = Buffer.from(html).toString('utf-8');
        const $ = cheerio.load(content);

        const results: {
            title: string;
            href: string;
            datetime: string;
        }[] = [];

        $('li.serviceContent').each((i, el) => {
            if (i >= 10) return false; 

            const linkEl = $(el).find('a.contentTitle');
            const titleEl = linkEl.find('p.title');
            const datetimeEl = $(el).find('p.datetime');

            results.push({
                title: titleEl.text().trim(),
                href: BASE_URL + linkEl.attr('href'),
                datetime: datetimeEl.text().trim()
            });
        });

        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        console.error('Error fetching ĐTĐH:', error);
        return NextResponse.json({ success: false, message: 'Lỗi khi lấy dữ liệu ĐTĐH' }, { status: 500 });
    }
}
