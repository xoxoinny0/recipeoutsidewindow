import utilHelper from '../helper/UtilHelper.js';

// http://openapi.foodsafetykorea.go.kr/api/인증키/서비스명/요청파일타입/요청시작위치/요청종료위치

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
 const startIdx = "1";
 const endIdx = "5";

// const url = "http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/5";
let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/${DATA_TYPE}/${startIdx}/${endIdx}`;

let json = null;
let manual = {};
const selected = JSON.parse(sessionStorage.getItem('selected'));
console.group('selected');
console.log(selected);
console.groupEnd();


let manualCnt = 0;
for (const k in selected) {
    const element = document.querySelector(`#${k}`);
    if (element) {
        if (element.id == "ATT_FILE_NO_MAIN") {
            document.querySelector(`#${k}`).setAttribute('src', selected[k]);
        } else {
            element.setAttribute('value', selected[k] || "null");
        }
    }

    if (k.indexOf("MANUAL") != -1 && selected[k] != "") {
        manualCnt++;
        manual[k] = selected[k];
    }
}
console.group('manual');
console.log(manualCnt);
console.log(manual);
console.groupEnd();

document.querySelector('#step').setAttribute('value', manualCnt);

document.querySelector('#addRecipe-form__submit').addEventListener('click', async e => {
    e.preventDefault();

    url = "http://localhost:3001/recipes"

    json = {};

    const labels = document.querySelectorAll('label');

    labels.forEach(v => {
        const key = v.getAttribute('for');
        if (key == "mainImg") {
            json["ATT_FILE_NO_MAIN"] = document.querySelector(`#ATT_FILE_NO_MAIN`).src;
        } else if (key == 'step') {
            
        } else {
            json[key] = document.querySelector(`#${key}`).value;
        }
    });

    for (const k in manual) {
        json[k] = manual[k];
    }

    try {
        const response = await axios.post(url, json);
        window.location = `recipeDetail.html?itemNo=${response.data.id}`;
    } catch (e) {
        console.error(e);
        alert("데이터 추가 실패");
        return;
    }
});