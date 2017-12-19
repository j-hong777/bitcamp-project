const express = require('express');

const router = express.Router();

router.get('/state', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain;charset=UTF-8'
    })
    console.log(request.query["s1"])
    response.write('hello....\n')
    response.end()
})


module.exports = router;
