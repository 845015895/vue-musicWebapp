let urlLib = require('url');
// let async = require('async');
let express = require('express');
let bodyParser = require('body-parser');
let http = require('http');

let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//设置跨距
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, POST, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});


// 查询排行榜
app.get('/api/rank', function (req, res) {
    let obj = urlLib.parse(req.url, true);
    const GET = obj.query;

    let rankId = GET.rankid;
    let page = GET.page;
    let mainData = "";

    http.get(`http://m.kugou.com/rank/info/?rankid=${rankId}&page=${page}&json=true`,function (req1,res1) {
        req1.on('data',function(data){
            mainData += data;
        });
        req1.on('end',function(){
            res.send(mainData);
        });
        req1.on('error',function(){
            res.send("请求失败");
        });
    });

});

// 搜索音乐
app.get('/api/search', function (req, res) {
    let obj = urlLib.parse(req.url, true);
    const GET = obj.query;

    let keyword =encodeURIComponent(GET.keyword) ;
    let page = GET.page;
    let mainData = "";
    http.get(`http://songsearch.kugou.com/song_search_v2?keyword=${keyword}&page=${page}&clientver=&platform=WebFilter`,function (req1,res1) {

        req1.on('data',function(data){
            mainData += data;
        });
        req1.on('end',function(){
            res.send(mainData);
        });
        req1.on('error',function(){
            res.send("请求失败");
        });
    });

});

// 获取音乐
app.get('/api/music', function (req, res) {
    let obj = urlLib.parse(req.url, true);
    const GET = obj.query;

    let hash = GET.hash;
    let mainData = "";
    http.get(`http://www.kugou.com/yy/index.php?r=play/getdata&hash=${hash}`,function (req1,res1) {
        req1.on('data',function(data){
            mainData += data;
        });
        req1.on('end',function(){
            res.send(mainData);
        });
        req1.on('error',function(){
            res.send("请求失败");
        });
    });
});
app.get('/api/hotSearch', function (req, res) {
    let obj = urlLib.parse(req.url, true);
    const GET = obj.query;
    let time = GET.time;
    let mainData = "";
    http.get(`http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=jso&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${time}`,function (req1,res1) {
        req1.on('data',function(data){
            mainData += data;
        });
        req1.on('end',function(){
            res.send(mainData);
        });
        req1.on('error',function(){
            res.send("请求失败");
        });
    });
});
app.get('/api/rankList', function (req, res) {
    let obj = urlLib.parse(req.url, true);
    const GET = obj.query;
    let time = GET.time;
    let mainData = "";
    http.get(`http://m.kugou.com/rank/list&json=true`,function (req1,res1) {
        req1.on('data',function(data){
            mainData += data;
        });
        req1.on('end',function(){
            res.send(mainData);
        });
        req1.on('error',function(){
            res.send("请求失败");
        });
    });
});
app.get('/api/singerList', function (req, res) {
    let obj = urlLib.parse(req.url, true);
    const GET = obj.query;
    let mainData = "";
    http.get(`http://m.kugou.com/singer/list/88?json=true`,function (req1,res1) {
        req1.on('data',function(data){
            mainData += data;
        });
        req1.on('end',function(){
            res.send(mainData);
        });
        req1.on('error',function(){
            res.send("请求失败");
        });
    });
});
app.get('/api/slider', function (req, res) {
    let obj = urlLib.parse(req.url, true);
    const GET = obj.query;
    let mainData = "";
    http.get(`http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1`,function (req1,res1) {
        req1.on('data',function(data){
            mainData += data;
        });
        req1.on('end',function(){
            res.json(JSON.parse(mainData).data.slider);
        });
        req1.on('error',function(){
            res.json("请求失败");
        });
    });
});




//配置服务端口
let server = app.listen(7100, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});
