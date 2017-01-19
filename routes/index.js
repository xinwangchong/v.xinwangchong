var express = require('express');
var db = require('./common/db.js');
var router = express.Router();
/*
 * 首页
 * */
router.get('/', function (req, res, next) {
    var sql = "SELECT * FROM crawler_video  order by createTime  LIMIT 0,30 ";
    db.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.render('index', {vs: result});
        }
    })
});
/*
 * 根据类型加载不同类型的视频数据页面
 * */
router.get('/:type:pagesize:pageindex.html', function (req, res, next) {
    var _type=req.params.type;
    var _pagesize=req.params.pagesize;
    var _pageindex=req.params.pageindex;
    var value=getTypeValueByKey(req.get(_type));
    var vs=value.split('-');
    var sql = "SELECT * FROM crawler_video WHERE parentType='"+vs[0]+"' and type='"+vs[1]+"'  order by createTime ASC LIMIT "+(_pageindex-1)*_pagesize+","+_pagesize*_pageindex;
    db.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.render(""+vs[2]+"",{"parentType":vs[0],"childType":vs[1]});
        }
    })

});
function getTypeValueByKey(key) {
    var map = {
        "1": "娱乐-搞笑-entertainment",
        "2": "娱乐-明星-star",
        "3": "娱乐-美妆-beauty",
        "4": "娱乐-男神-menGod",
        "5": "娱乐-萌娃-adorableBaby",
        "6": "娱乐-美食-deliciousFood ",
        "7": "娱乐-音乐-music",
        "8": "娱乐-舞蹈-dance",
        "9": "娱乐-宠物-pet",
        "10": "娱乐-吃秀-eatShow",
        "11": "娱乐-手工-manual",
        "12": "娱乐-影视-movies",
        "13": "娱乐-生活-life",
        "14": "娱乐-健身-bodybuilding",
        "15": "娱乐-世界-world",
        "16": "娱乐-新闻-news",
        "17": "娱乐-体育-sports",
        "18": "娱乐-军事-military",
        "19": "娱乐-剧集-drama"
    }
    return map['1'];
}
module.exports = router;
