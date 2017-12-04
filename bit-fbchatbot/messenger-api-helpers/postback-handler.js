const postbackHandler = {};



//postback을 처리할 함수를 등록한다.
const addPostback = (postback, handler) => {
    postbackHandler[postback] = handler;
}

//등록된 메시지 핸들러를 찾아서 리턴한다.
const getHandler = (postback) => {
    return postbackHandler[postback];
}

module.exports = {
    getHandler    
};