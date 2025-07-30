// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';
import * as cheerio from 'cheerio';

import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const jar = new CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true }));

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

const tryLogin = async (
        username: string,
        password: string,
        captcha: string,
        loginCode: string,
        cookies: string,
        i: number,
        viewState: string,
        eventValidation: string
    ) => {
    const string00 =
        i === 0
        ? '0_2870,1_67,1_68,1_69,0_2875,0_2,0_2786,1_206,0_2791,1_207,1_204,1_203,https://fonts.googleapis.com/css?family=Arimo,../Content/bootstrap/css/bootstrap.min.css,../Content/bootstrap/css/bootstrap-combobox.css,../Content/docs.min.css,../Content/Site.css'
        : '0_2944,1_67,1_68,1_69,0_2949,0_2,0_2860,1_206,0_2865,1_207,1_204,1_203,https://fonts.googleapis.com/css?family=Arimo,../Content/bootstrap/css/bootstrap.min.css,../Content/bootstrap/css/bootstrap-combobox.css,../Content/docs.min.css,../Content/Site.css';

    const string01 =
        i === 0
        ? '1_10,1_11,1_22,1_63,1_13,1_14,1_29,1_48,1_16,1_23,1_33,1_180,1_185,1_186,1_181,1_200,1_179,1_32'
        : '1_11,1_12,1_23,1_63,1_14,1_15,1_48,1_17,1_24,1_33,1_180,1_185,1_186,1_181,1_200,1_179,1_32';

    const string02 =
        i === 1 ? 'ctl00$ctl00$TopMenuPane$ctl09$menuTop' : 'ctl00$ctl00$TopMenuPane$ctl10$menuTop';

    const formData = new URLSearchParams();

    formData.append('__EVENTTARGET', '');
    formData.append('__EVENTARGUMENT', '');
    formData.append('__VIEWSTATE', viewState);
    formData.append('__VIEWSTATEGENERATOR', 'CD85D8D2');
    formData.append('__EVENTVALIDATION', eventValidation);
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
    
    const res = await client.post('https://ctt-sis.hust.edu.vn/Account/Login.aspx', formData.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
            'Referer': 'https://ctt-sis.hust.edu.vn/Account/Login.aspx',
            'Origin': 'https://ctt-sis.hust.edu.vn',
        },
        maxRedirects: 0, 
        validateStatus: () => true,
    });

    const cookiesRes = await jar.getCookieString('https://ctt-sis.hust.edu.vn/');
    console.log('Cookies after login:', cookiesRes);
    console.log('Redirected to:', res.request.res.responseUrl);
    

    if (res.status >= 400) {
        return { success: false, html: res.data, cookiesRes };
    }

    const $ = cheerio.load(res.data);
    const isLoggedIn = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_lbMSSV').length > 0;

    return {
        success: isLoggedIn,
        html: res.data,
        cookiesRes,
    };
};

export async function POST(req: NextRequest) {
    try {
        const { username, password, captcha, viewState, eventValidation, cookies } = await req.json();

        const encrypted = await encryptPassword(username, password);
        if (!encrypted) return NextResponse.json({ success: false, message: 'Lỗi mã hóa mật khẩu' });

        const attempts = [25, 45, 33, 57, 25];

        let lastResult = null;
        for (let i = 0; i < attempts.length; i++) {
            const loginCode = `{&quot;data&quot;:&quot;12|#|user|4|9|1${username}pass|4|${attempts[i]}|1${encrypted}#&quot;}`;
            const result = await tryLogin(username, password, captcha, loginCode, cookies, i, viewState, eventValidation);
            lastResult = result;
            if (result.success) {
                break;
            }
        }

        if (!lastResult?.success) {
            return NextResponse.json({ success: false, message: 'Đăng nhập thất bại' }, { status: 401 });
        }
        
        // const { wrapper } = await import('axios-cookiejar-support');
        // const tough = await import('tough-cookie');
        // const jar = new tough.CookieJar();
        // await jar.setCookie(lastResult.cookies, 'https://ctt-sis.hust.edu.vn/');
        // const client = wrapper(axios.create({ jar, withCredentials: true }));

        // const response = await client.get('https://ctt-sis.hust.edu.vn/');
        console.log(lastResult.html); 
        const $ = cheerio.load(lastResult.html);

        const mssv = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_lbMSSV').text().trim().substring(5);
        const textInfo1 = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo1').text().split(':');
        const textInfo2 = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo2').text().split(':');
        const textInfo5 = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo5').text().split(':');
        const textInfo6 = $('#ctl00_ctl00_contentPane_MainPanel_MainContent_lbTextInfo6').text().split(':');

        const studentInfo = {
            MSSV: mssv,
            Ho_ten: textInfo1[1]?.trim(),
            Nam_vao_truong: textInfo1[2]?.trim(),
            Bac_dao_tao: textInfo1[3]?.trim(),
            Chuong_trinh: textInfo1[4]?.trim(),
            Khoa_vien: textInfo1[5]?.trim(),
            Tinh_trang: textInfo1[6]?.trim(),
            Gioi_tinh: textInfo2[1]?.trim(),
            Lop: textInfo2[2]?.trim(),
            Khoa: textInfo2[3]?.trim(),
            Email: textInfo2[4]?.trim(),
            Dan_toc: textInfo5[1]?.trim(),
            Nam_tot_nghiep_c3: textInfo5[2]?.trim(),
            Dia_chi: textInfo5[3]?.trim(),
            CCCD: textInfo5[4]?.trim(),
            Noi_cap: textInfo5[5]?.trim(),
            Ho_ten_bo: textInfo5[6]?.trim(),
            Nam_sinh_bo: textInfo5[7]?.trim(),
            Nghe_nghiep_bo: textInfo5[8]?.trim(),
            SDT_bo: textInfo5[9]?.trim(),
            Email_bo: textInfo5[10]?.trim(),
            Ton_giao: textInfo6[1]?.trim(),
            Truong_THPT: textInfo6[2]?.trim(),
            Ho_khau: textInfo6[3]?.trim(),
            SDT: textInfo6[4]?.trim(),
            Ho_ten_me: textInfo6[5]?.trim(),
            Nam_sinh_me: textInfo6[6]?.trim(),
            Nghe_nghiep_me: textInfo6[7]?.trim(),
            SDT_me: textInfo6[8]?.trim(),
            Email_me: textInfo6[9]?.trim(),
        };
        
        return NextResponse.json({ success: true, data: studentInfo });
    } catch (err) {
        console.error("Lỗi xử lý đăng nhập & lấy info:", err);
        return NextResponse.json({ success: false, message: 'Lỗi server khi đăng nhập' }, { status: 500 });
    }
}
