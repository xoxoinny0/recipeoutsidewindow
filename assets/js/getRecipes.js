import utilHelper from '../helper/UtilHelper.js';

// http://openapi.foodsafetykorea.go.kr/api/keyId/serviceId/dataType/startIdx/endIdx
// http://openapi.foodsafetykorea.go.kr/api/인증키/서비스명/요청파일타입/요청시작위치/요청종료위치
// http://openapi.foodsafetykorea.go.kr/api/인증키/서비스명/요청파일타입/요청시작위치/요청종료위치/변수명=값&변수명=값2

/**
 * @param   {string}    keyId           - 발급된 인증키
 * @param   {string}    serviceId       - 요청 대상 서비스명
 * @param   {string}    dataType        - 요청파일 타입( xml / json )
 * @param   {string}    startIdx        - 요청 시작 위치
 * @param   {string}    endIdx          - 요청 종료 위치
 * @param   {string}    RCP_NM          - 메뉴명
 * @param   {string}    RCP_PARTS_DTLS  - 재료 정보
 * @param   {string}    CHNG_DT         - 변경 일자(YYYYMMDD) // 변경일자 기준 이후 자료만 출력
 */

const API_KEY = "1cf548eb09e043b08c57";
const SERVICE_ID = "COOKRCP01";
const DATA_TYPE = "json";
let startIdx = 0;
let endIdx = 0;

const params = utilHelper.getUrlParams();

if (!params.page) {
    startIdx = 1;
    endIdx = 50;
} else {
    document.querySelector('#page').value = params.page;
    startIdx = (Number(params.page) - 1) * 50 + 1;
    endIdx = startIdx + 49;
}

const url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/${DATA_TYPE}/${startIdx}/${endIdx}`;
// const url = "http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/5";

(async () => {

    let json = null;

    try {
        const response = await axios.get(url);
        json = response.data[SERVICE_ID].row;
    } catch (e) {
        console.error(e);
        alert('요청을 처리하지 못했습니다.');
        return;
    }

    const listBody = document.querySelector('#listBody');

    json.forEach(v => {
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td4 = document.createElement('td');
        const td3 = document.createElement('td');
        const btn = document.createElement('button');
        btn.innerHTML = "추가하기";
        btn.addEventListener('click', e => {
            window.sessionStorage.setItem("selected", JSON.stringify(v));
            console.log(JSON.stringify(v));
            window.location = 'addRecipes-manual.html';
        });

        td1.innerHTML = v.RCP_PAT2;
        td2.innerHTML = v.RCP_WAY2;
        td3.innerHTML = v.RCP_NM;
        td4.appendChild(btn);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        listBody.appendChild(tr);
    });
})();