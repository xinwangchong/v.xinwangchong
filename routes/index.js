var express = require('express');
var db = require('./common/db.js');
var splitLimit = require('split-limit');
var router = express.Router();
/*
 * 首页
 * */
router.get('/', function (req, res, next) {
    var sql = "SELECT * FROM crawler_video WHERE parentType='娱乐' and type='搞笑'  order by createTime  LIMIT 0,30 ";
    db.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.render('index', {vs: result,pagesize:30,pageindex:1});
        }
    })
});
/*
 * 首页异步加载视频数据页面
 * */
router.get('/page/:pagesize/:pageindex.html', function (req, res, next) {
    var _pagesize=req.params.pagesize;
    var _pageindex=req.params.pageindex;
    var sql = "SELECT * FROM crawler_video  order by createTime ASC LIMIT "+(_pageindex-1)*_pagesize+","+_pagesize*_pageindex;
    db.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.json( result);
        }
    });
});
/*
 * 根据类型加载不同类型的视频数据页面
 * */
router.get('/initpage/:pt/:type/:pagesize/:pageindex.html', function (req, res, next) {
    var _type=req.params.type;
    var _pagesize=req.params.pagesize;
    var _pageindex=req.params.pageindex;
    var _value=getTypeValueByKey(_type);
    var _pt=req.params.pt;
    var vs=_value.split('-');
    var sql = "SELECT * FROM crawler_video WHERE parentType='"+vs[0]+"' and type='"+vs[1]+"'  order by createTime ASC LIMIT "+(_pageindex-1)*_pagesize+","+_pagesize*_pageindex;
    db.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.render("video-list",{vs: result,p_active:_pt,c_active:_type,p_active_text:vs[0],c_active_text:vs[1],pagesize:_pagesize,pageindex:_pageindex});
        }
    });
});
router.get('/page/:pt/:type/:pagesize/:pageindex.html', function (req, res, next) {
    var _type=req.params.type;
    var _pagesize=req.params.pagesize;
    var _pageindex=req.params.pageindex;
    var _value=getTypeValueByKey(_type);
    var vs=_value.split('-');
    var sql = "SELECT * FROM crawler_video WHERE parentType='"+vs[0]+"' and type='"+vs[1]+"'  order by createTime ASC LIMIT "+(_pageindex-1)*_pagesize+","+_pagesize*_pageindex;

    db.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    });
});
router.get('/detail/:pt/:type/:id.html', function (req, res, next) {
    var _type=req.params.type;
    var _id=req.params.id;
    var _pt=req.params.pt;
    res.render('video-detail',{p_active:_pt,c_active:_type,id:_id});
});
function getTypeValueByKey(key) {
    var map = {
        "0":'娱乐',
        "1": "娱乐-搞笑",
        "2": "娱乐-明星",
        "3": "娱乐-女神",
        "4": "娱乐-美妆",
        "5": "娱乐-男神",
        "6": "娱乐-萌娃",
        "7": "娱乐-美食",
        "8": "娱乐-音乐",
        "9": "娱乐-舞蹈",
        "10": "娱乐-宠物",
        "11": "娱乐-吃秀",
        "12": "娱乐-手工",
        "13": "娱乐-影视",
        "14": "娱乐-生活",
        "15": "娱乐-健身",
        "16": "娱乐-世界",
        "17": "新闻-新闻",
        "18": "体育-体育",
        "19": "军事-军事",
        "20": "剧集-剧集",
        "21": "电影-电影"
    }
    return map[''+key+''];
}
module.exports = router;
