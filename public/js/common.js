/*初始化页面*/
$(function () {
    //给视频项赋予点击事件
   /* toVedioDetail();*/
});
/*分页*/
function _page(_pageType) {
    var _pageindex = $("#pageindex").val();
    var _pagesize = $("#pagesize").val();
    var _newPageIndex = parseInt(_pageindex) + 1;
    var _url = "/page/" + _pagesize + "/" + _newPageIndex + ".html";
    if (_pageType == 'category') {
        var _pt = $("#pt").val();
        var _ct = $("#ct").val();
        _url = "/page/" + _pt + "/" + _ct + "/" + _pagesize + "/" + _newPageIndex + ".html";
    }
    $.getJSON(_url, function (result) {
        if (result == null || result == undefined || result.length == 0) {
            $("#more").fadeOut();
            return;
        }
        for (var i = 0; i < result.length; i++) {
            var _html = '<div onclick="toVedioDetailClick(this)" class="uk-width-medium-1-6 uk-width-small-1-3" v-title="' + result[i].title + '" v-poster="' + result[i].imgUrl + '" v-videourl="' + result[i].videoUrl + '" v-type="' + result[i].videoType + '" v-id="'+result[i].id+'">';
            _html += '<div class="uk-thumbnail" style="height: 200px;">';
            _html += ' <img src="' + result[i].imgUrl + '" width="200" height="200" alt="">';
            _html += '<div class="uk-thumbnail-caption">' + result[i].title + '</div>';
            _html += '</div>';
            _html += '</div>';
            $("#video-grid").append(_html);
        }
        $("#pageindex").val(_newPageIndex);
    });
}
/*跳转详情*//*
function toVedioDetail() {
    $('.v-container').each(function () {
        var _id = $(this).attr('v-id');
        var _pt = $("#pt").val();
        var _ct = $("#ct").val();
        if(_pt==null||_pt==undefined||_pt==''){
            _pt='1000000';
            _ct='1000000';
        }
        $(this).click(function () {
            sessionStorage.setItem('v-type',$(this).attr('v-type'));
            sessionStorage.setItem('v-title',$(this).attr('v-title'));
            sessionStorage.setItem('v-poster',$(this).attr('v-poster'));
            sessionStorage.setItem('v-videourl',$(this).attr('v-videourl'));
            sessionStorage.setItem('v-id',_id);
            location.href='/detail/'+_pt+'/'+_ct+'/'+_id+'.html';
        });
    })
}*/
function toVedioDetailClick(_this) {
    $('.v-container').each(function () {
        var _id = $(_this).attr('v-id');
        var _pt = $("#pt").val();
        var _ct = $("#ct").val();
        if(_pt==null||_pt==undefined||_pt==''){
            _pt='1000000';
            _ct='1000000';
        }
            sessionStorage.setItem('v-type',$(_this).attr('v-type'));
            sessionStorage.setItem('v-title',$(_this).attr('v-title'));
            sessionStorage.setItem('v-poster',$(_this).attr('v-poster'));
            sessionStorage.setItem('v-videourl',$(_this).attr('v-videourl'));
            sessionStorage.setItem('v-id',_id);
            location.href='/detail/'+_pt+'/'+_ct+'/'+_id+'.html';

    })
}