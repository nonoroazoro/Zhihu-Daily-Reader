import "./res/errors.less";
import $ from "jquery";

$(() =>
{
    $("#logo").attr("src", require("./res/img/zhihu_daily_logo_blue.png"));

    $("#history-back").click(() =>
    {
        history.back();
    });
});