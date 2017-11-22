const request = require('request');

const searchNewAddress = (type, searchWord) => {
    var uri = 'http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd';
    /* Service Key*/
    var queryString = '?ServiceKey=' + 'GsN31%2BSeUMF3ak8cQzhKH7uzuRuO2Bo6aToZaQtUDlagK1p%2FcAFo4CpUa8Z91IpnM0XrZR4rDzNb%2Fs9Z7NoRAQ%3D%3D';

    /* dong : 동(읍/면)명 road :도로명[default] post : 우편번호 */
    queryString += '&searchSe=' + type;

    /* 검색어 */
    queryString += '&srchwrd=' + encodeURIComponent(searchWord); 

    /* 페이지당 출력될 개수를 지정 */
    queryString += '&countPerPage=10';

    /* 출력될 페이지 번호 */
    queryString += '&currentPage=1';

    request({
        uri: uri + queryString,
    }, function (error, response, body) {
        console.log('=> Status', response.statusCode);
        console.log('=> Headers', JSON.stringify(response.headers));
        console.log('=> Reponse received', body);
    });  
};

searchNewAddress('road', '회기로5길142');
//searchNewAddress('post', '17072');

/*
module.exports = {
    searchNewAddress
};
*/
