export default function queryParse(url, reqParams) {
    let query = '?';
    let queryArr = [];
    const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ| 가-힣]/;
    
    for (const key in reqParams) {
        if (checkKor.test(reqParams[key])) {
            queryArr.push(key + '=' + encodeURI(reqParams[key]));
        } else {
            queryArr.push(key + '=' + reqParams[key]);
        }
    };
    const queryString = query + queryArr.join("&");
    return url + queryString;
};