var str = 'searchAddress:post=17027'

var arr = str.split(':')[1].split('=')

console.log(arr[0], arr[1])