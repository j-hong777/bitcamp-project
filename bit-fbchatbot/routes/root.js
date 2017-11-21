//nodeJS에서 express 모듈을 사용할 경우
//다음과 같이 express 의 라우터 객체에 클라이언트 요청을 처리할 함수를 등록한다.
//만약 express 모듈을 사용하지 않는다면 다음 코드는 무효하다.
//import express from 'express';
const express = require('express');
//클라이언트 요청이 들어왔을때 함수를 호출해주는 객체
const router = express.Router();

//라우터 객체에 url에 대해 호출될 함수 등록
router.get('/', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain;charset=UTF-8'
    })
    response.write('Hello, 안녕하세요!\n')
    response.end()
})

//export default router;
module.exports = router;