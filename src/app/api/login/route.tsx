import { NextRequest, NextResponse } from 'next/server';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';
import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { randomUUID } from 'crypto';
import crypto from 'crypto';

import { scrapeTuition  } from '../tuition/route';
import { scrapeStudentGPACPA } from '../aggregatescore/route';
import { scrapeInputGradeTerm } from '../inputgradeterm/route';
import { scrapeProgram } from '../program/route';
import { scrapeCourseRegister } from '../registercourse/route';
import { scrapeStudentClass } from '../studentclass/route';
import { scrapeStudentScore } from '../studentscore/route';
import { scrapeTimetable } from '../timetable/route';
import { scrapeToeic } from '../toeicscore/route';
import { scrapeTimetableTemp } from '../timetabletemp/route';



const LOGIN_URL = 'https://ctt-sis.hust.edu.vn/Account/Login.aspx';
declare global {
    var sessionStore: Record<string, { jar: CookieJar }>;
}
globalThis.sessionStore = globalThis.sessionStore || {};


function maHoaMD5(str: string): string {
    return crypto.createHash('md5').update(Buffer.from(str, 'utf-8')).digest('hex');
}


export async function encryptPassword(username: string, password: string) {
    try {
        const getRes = await axios.get("https://encode-decode.com/des-ecb-encrypt-online/");
        const cookies = getRes.headers['set-cookie']?.map((c) => c.split(';')[0]).join('; ') || '';
        const $ = cheerio.load(getRes.data);
        const _token = $('#encryption__token').attr('value');
        if (!_token) throw new Error("Không tìm thấy token mã hóa");

        const key = maHoaMD5(`${username}.${password}`).toString(); 

        const formData = new URLSearchParams({
            'encryption[algorithm]': 'des-ecb',
            'encryption[sourceText]': password,
            'encryption[destinationText]': '',
            'encryption[secret]': key,
            'encryption[encrypt]': '',
            'encryption[_token]': _token,
        });

        const encryptRes = await axios.post(
            "https://encode-decode.com/des-ecb-encrypt-online/",
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookies,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                },
            }
        );

        const $$ = cheerio.load(encryptRes.data);
        const encrypted = $$('#encryption_destinationText').text().trim();
        if (!encrypted) throw new Error("Không lấy được kết quả mã hóa DES");

        return encrypted;
    } catch (err) {
        return null;
    }
}

export async function GET() {
    const sessionId = randomUUID();
    const jar = new CookieJar();
    globalThis.sessionStore[sessionId] = { jar };

    const client = wrapper(axios.create({ jar }));
    const { data: pageBuffer } = await client.get(LOGIN_URL, {
        responseType: 'arraybuffer',
    });

    const html = iconv.decode(pageBuffer, 'windows-1258');
    const $ = cheerio.load(html);

    const viewState = $('#__VIEWSTATE').val();
    const eventValidation = $('#__EVENTVALIDATION').val();
    const viewStateGen = $('#__VIEWSTATEGENERATOR').val();
    const captchaPath = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_ASPxCaptcha1_IMG').attr('src');
    if (!captchaPath) return NextResponse.json({ error: 'CAPTCHA not found' }, { status: 500 });
    

    const captchaUrl = 'https://ctt-sis.hust.edu.vn' + captchaPath;
    
    const captchaResp = await client.get(captchaUrl, { 
        responseType: 'arraybuffer' 
    });

    const captchaBase64 = `data:image/jpeg;base64,${Buffer.from(captchaResp.data).toString('base64')}`;
    
    return NextResponse.json({
        captchaUrl: captchaBase64,
        hiddenFields: {
            __VIEWSTATE: viewState,
            __EVENTVALIDATION: eventValidation,
            __VIEWSTATEGENERATOR: viewStateGen,
        },
        sessionId,
    });
}

export async function POST(req: NextRequest) {
    const { username, password, captcha, hiddenFields, sessionId } = await req.json();
    const jar = sessionStore[sessionId]?.jar;
    if (!jar) return NextResponse.json({ success: false, message: 'Session expired' }, { status: 400 });

    const encrypted = await encryptPassword(username, password);
    if (!encrypted) return NextResponse.json({ success: false, message: 'Mã hóa mật khẩu lỗi' }, { status: 500 });

    const client = wrapper(axios.create({ jar }));
    const attempts = [25, 45, 33, 57, 25];

    for (let i = 0; i < attempts.length; i++) {
        const loginCode = `{&quot;data&quot;:&quot;12|#|user|4|9|1${username}pass|4|${attempts[i]}|1${encrypted}#&quot;}`;

        const string00 = i === 0
        ? '0_2870,1_67,1_68,1_69,0_2875,0_2,0_2786,1_206,0_2791,1_207,1_204,1_203,https://fonts.googleapis.com/css?family=Arimo,../Content/bootstrap/css/bootstrap.min.css,../Content/bootstrap/css/bootstrap-combobox.css,../Content/docs.min.css,../Content/Site.css'
        : '0_2944,1_67,1_68,1_69,0_2949,0_2,0_2860,1_206,0_2865,1_207,1_204,1_203,https://fonts.googleapis.com/css?family=Arimo,../Content/bootstrap/css/bootstrap.min.css,../Content/bootstrap/css/bootstrap-combobox.css,../Content/docs.min.css,../Content/Site.css';

        const string01 = i === 0
        ? '1_10,1_11,1_22,1_63,1_13,1_14,1_29,1_48,1_16,1_23,1_33,1_180,1_185,1_186,1_181,1_200,1_179,1_32'
        : '1_11,1_12,1_23,1_63,1_14,1_15,1_48,1_17,1_24,1_33,1_180,1_185,1_186,1_181,1_200,1_179,1_32';

        const string02 = i === 1 ? 'ctl00$ctl00$TopMenuPane$ctl09$menuTop' : 'ctl00$ctl00$TopMenuPane$ctl10$menuTop';

        const formData = new URLSearchParams();
        
        formData.append('__EVENTTARGET', '');
        formData.append('__EVENTARGUMENT', '');
        formData.append('__VIEWSTATE', hiddenFields.__VIEWSTATE);
        formData.append('__VIEWSTATEGENERATOR', 'CD85D8D2');
        formData.append('__EVENTVALIDATION', hiddenFields.__EVENTARGUMENT);
        formData.append('ctl00$ctl00$TopMenuPane$menuTop', '{&quot;selectedItemIndexPath&quot;:&quot;&quot;,&quot;checkedState&quot;:&quot;&quot;}');
        formData.append(string02, '{&quot;selectedItemIndexPath&quot;:&quot;&quot;,&quot;checkedState&quot;:&quot;&quot;}');
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$chbParents', 'I');
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$tbUserName$State', `{&quot;rawValue&quot;:&quot;${username}&quot;,&quot;validationState&quot;:&quot;&quot;}`);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$tbUserName', username);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$tbPassword$State', `{&quot;rawValue&quot;:&quot;${password}&quot;,&quot;validationState&quot;:&quot;&quot;}`);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$tbPassword', password);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$ASPxCaptcha1$TB$State', '{&quot;validationState&quot;:&quot;&quot;}');
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$ASPxCaptcha1$TB', captcha);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$btLogin', '{"0":"Đăng nhập","1":""}');
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$hfInput', loginCode);
        formData.append('DXScript', string01);
        formData.append('DXCss', string00);

        const res = await client.post(LOGIN_URL, formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0',
                'Referer': LOGIN_URL,
                'Origin': 'https://ctt-sis.hust.edu.vn',
            },
            maxRedirects: 0,
            validateStatus: () => true,
        });
        
        const location = res.headers['location'] || '';
        if (res.status === 302 && (location === '/' || location.includes('default.aspx'))) {
            const homeRes = await client.get('https://ctt-sis.hust.edu.vn/', {
                responseType: 'arraybuffer',
            });
            
            const htmlUtf8 = Buffer.from(homeRes.data).toString('utf-8');
            const $ = cheerio.load(htmlUtf8);

            const getText = (id: string) => $(`#${id}`).text().trim();
            const text1 = getText('ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo1').split(':');
            const text2 = getText('ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo2').split(':');
            const text3 = getText('ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo3').split(':');
            const text4 = getText('ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo4').split(':');
            const text5 = getText('ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo5').split(':');
            const text6 = getText('ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo6').split(':');


            const data = {
                MSSV: getText('ctl00_ctl00_contentPane_MainPanel_MainContent_lbMSSV').substring(5),

                Ho_ten: text1[1]?.trim().substring(0, text1[1].length - 16),
                Nam_vao_truong: text1[2]?.trim().substring(0, text1[2].length - 13),
                Bac_dao_tao: text1[3]?.trim().substring(0, text1[3].length - 14),
                Chuong_trinh: text1[4]?.trim().substring(0, text1[4].length - 19),
                Khoa_vien: text1[5]?.trim().substring(0, text1[5].length - 20),
                Tinh_trang: text1[6]?.trim().substring(0),

                Gioi_tinh: text2[1]?.trim().substring(0, text2[1].length - 5),
                Lop: text2[2]?.trim().substring(0, text2[2].length - 10),
                Khoa: text2[3]?.trim().substring(0, text2[3].length - 7),
                Email: text2[4]?.trim(),

                HK_TK: text3[1]?.trim().substring(0, text3[1].length - 21),
                Tong_ket_diem: text3[2]?.trim().substring(0, text3[2].length - 18),
                TC_no: text3[3]?.trim(),

                TC_tichluy: text4[1]?.trim().substring(0, text4[1].length - 20),
                Trinhdo: text4[2]?.trim().substring(0, text4[2].length - 14),
                Canhbao: text4[3]?.trim(),

                Dan_toc: text5[1]?.trim().substring(0, text5[1].length - 14),
                Nam_tot_nghiep_c3: text5[2]?.trim().substring(0, text5[2].length - 9),
                Dia_chi: text5[3]?.trim().substring(0, text5[3].length - 11),
                CCCD: text5[4]?.trim().substring(0, text5[4].length - 9),
                Noi_cap: text5[5]?.trim().substring(0, text5[5].length - 11),
                Ho_ten_bo: text5[6]?.trim().substring(0, text5[6].length - 10),
                Nam_sinh_bo: text5[7]?.trim().substring(0, text5[7].length - 13),
                Nghe_nghiep_bo: text5[8]?.trim().substring(0, text5[8].length - 12),
                SDT_bo: text5[9]?.trim().substring(0, text5[9].length - 7),
                Email_bo: text5[10]?.trim(),

                Ton_giao: text6[1]?.trim().substring(0, text6[1].length - 13),
                Truong_THPT: text6[2]?.trim().substring(0, text6[2].length - 9),
                Ho_khau: text6[3]?.trim().substring(0, text6[3].length - 16),
                SDT: text6[4]?.trim().substring(0, text6[4].length - 11),
                Ho_ten_me: text6[5]?.trim().substring(0, text6[5].length - 10),
                Nam_sinh_me: text6[6]?.trim().substring(0, text6[6].length - 13),
                Nghe_nghiep_me: text6[7]?.trim().substring(0, text6[7].length - 12),
                SDT_me: text6[8]?.trim().substring(0, text6[8].length - 7),
                Email_me: text6[9]?.trim(),
            };

            const [
                tuition,
                gpaCpa,
                inputGradeTerm,
                program,
                courseRegister,
                studentClass,
                studentScore,
                timetable,
                toeic,
                timetabletemp
            ] = await Promise.all([
                scrapeTuition(client),
                scrapeStudentGPACPA(client),
                scrapeInputGradeTerm(client),
                scrapeProgram(client),
                scrapeCourseRegister(client),
                scrapeStudentClass(client),
                scrapeStudentScore(client),
                scrapeTimetable(client),
                scrapeToeic(client),
                scrapeTimetableTemp(client)
            ]);

            return new NextResponse(
                JSON.stringify({ success: true, sessionId, data: {
                    data,
                    tuition,
                    gpaCpa,
                    inputGradeTerm,
                    program,
                    courseRegister,
                    studentClass,
                    studentScore,
                    timetable,
                    toeic,
                    timetabletemp
                } }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                }
            );
        }
    }

    
    return NextResponse.json({ success: false, message: 'Đăng nhập thất bại' }, { status: 401 });
}
