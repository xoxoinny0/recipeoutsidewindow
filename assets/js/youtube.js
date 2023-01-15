import utilHelper from '../helper/UtilHelper.js';

const API_KEY = "AIzaSyB64Q9HqcxKUt09mU-Gd9U4F99hJBhmxLc";

const params = utilHelper.getUrlParams();
const searchKeyword = encodeURI("검색어");

const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyword}&maxResults=3&key=${API_KEY}`;


(async() => {
    let json = null;

    try {
        const response = await axios.get(url);
        json = response.data;
    } catch (e) {
        console.error(e);
        alert('요청을 처리하지 못했습니다.');
        return;
    }

    // console.log(json);    

    json.items.forEach((v, i) => {
        document.querySelectorAll('.wrap2').forEach((v2, i2) => {
            v2.querySelector('.left > img').setAttribute('src, v.snippet.thumbnails.medium.url');
        })
        
    })
})();