$(function () {
    $($('.v-title').get(0)).text(sessionStorage.getItem('v-title'));
    var _vedioType=$.trim(sessionStorage.getItem('v-type'));
    if(_vedioType==null||_vedioType==undefined||_vedioType==''){
        _vedioType='mp4';
    }
    SewisePlayer.setup({
        server: "vod",
        type: _vedioType,
        videourl: $.trim(sessionStorage.getItem('v-videourl')),
        poster: $.trim(sessionStorage.getItem('v-poster')),
        skin: "vodFlowPlayer",
        title: "",
        lang: 'zh_CN',
        /*customdatas: {
            "logoLink": "http://v.xinwangchong.com/"
        },
       logo:"/images/xwc_v_logo.png",*/
        topbardisplay:'disable',
        claritybutton: 'disable'
     }, "video-container");

});
function  changeChnnale() {
    location.href=$.trim(sessionStorage.getItem('v-videourl'));
}