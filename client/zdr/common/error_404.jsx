require("./res/errors.less");

var $ = require("jquery");
$(function ()
{
    $("#logo").attr("src", require("./res/img/zhihu_daily_logo_blue.png"));

    $("#history-back").click(function ()
    {
        history.back();
    });
});