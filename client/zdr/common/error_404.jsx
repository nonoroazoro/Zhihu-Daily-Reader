import "./res/errors.less";

import $ from "jquery";
import logo from "./res/img/zhihu_daily_logo_blue.png";

$(() =>
{
    $("#logo").attr("src", logo);

    $("#history-back").click(() =>
    {
        history.back();
    });
});