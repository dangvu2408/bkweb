import axios from 'axios';
import * as cheerio from 'cheerio';

interface LoginParams {
    username: string;
    password: string;
    captcha: string;
    hfInput: string;
    cookies: Record<string, string>;
    mode: number; 
}

export async function login({
    username,
    password,
    captcha,
    hfInput,
    cookies,
    mode,
}: LoginParams): Promise<boolean> {
    const BASE_URL = 'https://ctt-sis.hust.edu.vn/';
    const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

    let DXCss = '';
    let DXScript = '';
    let string02 = 'ctl00$ctl00$TopMenuPane$ctl10$menuTop';

    if (mode === 0) {
        DXCss = '0_2870,1_67,1_68,1_69,0_2875,0_2,0_2786,1_206,0_2791,1_207,1_204,1_203,https://fonts.googleapis.com/css?family=Arimo,../Content/bootstrap/css/bootstrap.min.css,../Content/bootstrap/css/bootstrap-combobox.css,../Content/docs.min.css,../Content/Site.css';
        DXScript = '1_10,1_11,1_22,1_63,1_13,1_14,1_29,1_48,1_16,1_23,1_33,1_180,1_185,1_186,1_181,1_200,1_179,1_32';
    } else if (mode === 1) {
        DXCss = '0_2944,1_67,1_68,1_69,0_2949,0_2,0_2860,1_206,0_2865,1_207,1_204,1_203,https://fonts.googleapis.com/css?family=Arimo,../Content/bootstrap/css/bootstrap.min.css,../Content/bootstrap/css/bootstrap-combobox.css,../Content/docs.min.css,../Content/Site.css';
        DXScript = '1_11,1_12,1_23,1_63,1_14,1_15,1_48,1_17,1_24,1_33,1_180,1_185,1_186,1_181,1_200,1_179,1_32';
        string02 = 'ctl00$ctl00$TopMenuPane$ctl09$menuTop';
    }

    try {
        const formData = new URLSearchParams();
        formData.append('__EVENTTARGET', '');
        formData.append('__EVENTARGUMENT', '');
        formData.append('__VIEWSTATE', '...'); // nên lấy bằng API fetch trang login trước
        formData.append('__VIEWSTATEGENERATOR', 'CD85D8D2');
        formData.append('__EVENTVALIDATION', '...');
        formData.append('ctl00$ctl00$TopMenuPane$menuTop', '{"selectedItemIndexPath":"","checkedState":""}');
        formData.append(string02, '{"selectedItemIndexPath":"","checkedState":""}');
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$chbParents', 'I');
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$tbUserName', username);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$tbUserName$State', `{"rawValue":"${username}","validationState":""}`);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$tbPassword', password);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$tbPassword$State', `{"rawValue":"${password}","validationState":""}`);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$ASPxCaptcha1$TB', captcha);
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$ASPxCaptcha1$TB$State', '{"validationState":""}');
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$btLogin', '["0":"Đăng+nhập","1":""]');
        formData.append('ctl00$ctl00$contentPane$MainPanel$MainContent$hfInput', hfInput);
        formData.append('DXCss', DXCss);
        formData.append('DXScript', DXScript);

        const response = await axios.post(BASE_URL, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': USER_AGENT,
                Cookie: Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; '),
            },
            maxRedirects: 0,
            validateStatus: (status) => status >= 200 && status < 400,
        });

        const redirectedUrl = response.headers.location || response.request.res.responseUrl;
        return redirectedUrl === BASE_URL;
    } catch (error) {
        console.error('[Login error]', error);
        return false;
    }
}
