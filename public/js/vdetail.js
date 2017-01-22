$(function () {
    /*//location.href='http://mvvideo1.meitudata.com/587f367622263720.mp4';

    $($('.v-title').get(0)).text(sessionStorage.getItem('v-title'));
    var _vurl=$.trim(sessionStorage.getItem('v-videourl'));
    /!*$.getJSON(''+_vurl+'',function (data) {

    })*!/
    SewisePlayer.setup({
        server: "vod",
        type: "mp4",
        videourl:_vurl ,
        poster: sessionStorage.getItem('v-poster'),
        skin: "vodFlowPlayer",
        logo:"/images/xwc_v_logo.png",
        lang: 'zh_CN',
        topbardisplay:'disable',
        customdatas: {
            "logoLink": "http://v.xinwangchong.com/"
        }
        /!*
        fallbackurls:{
            ogg: "http://jackzhang1204.github.io/materials/mov_bbb.ogg",
            webm: "http://jackzhang1204.github.io/materials/mov_bbb.webm"
        }*!/
    },"video-container");*/
   /* SewisePlayer.setup({
        server: "vod",
        type: "flv",
        videourl: $.trim('http://mvvideo1.meitudata.com/587f27b4540579293.mp4'),
        poster: "http://jackzhang1204.github.io/materials/poster.png",
        skin: "vodWhite",
        title: "",
        lang: 'zh_CN',
        claritybutton: 'disable'
    }, "video-container");*/
    document.cookie="CNZZDATA1256786412=1459975039-1485076504-https%3A%2F%2Fwww.baidu.com%2F|1485076504";
   //cookie.set('CNZZDATA1256786412','1459975039-1485076504-https%3A%2F%2Fwww.baidu.com%2F|1485076504')
    SewisePlayer.setup({
        server: "vod",
        type: "flv",
        videourl: 'http://mvvideo1.meitudata.com/588475bdbd0058184.mp4',
        poster: "http://jackzhang1204.github.io/materials/poster.png",
        skin: "vodWhite",
        title: "Tile 标题",
        lang: 'en_US',
        claritybutton: 'disable'
    }, "video-container");
});