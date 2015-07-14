require("./res/errors.less");

var $ = require("jquery");
$(function ()
{
    $("#history-back").click(function ()
    {
        history.back();
    });
});