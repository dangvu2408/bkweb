import { NextRequest, NextResponse } from 'next/server';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';
import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { randomUUID } from 'crypto';
import crypto from 'crypto';

const LOGIN_URL = 'https://ctt-sis.hust.edu.vn/Account/Login.aspx';
const sessionStore: Record<string, { jar: CookieJar }> = {};

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
        console.error("DES encrypt error:", err);
        return null;
    }
}

export async function GET() {
    const sessionId = randomUUID();
    const jar = new CookieJar();
    sessionStore[sessionId] = { jar };

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
        if (res.status === 302 && location.includes('default.aspx')) {
        return NextResponse.json({ success: true });
        }
    }

    return NextResponse.json({ success: false, message: 'Đăng nhập thất bại' }, { status: 401 });
}
