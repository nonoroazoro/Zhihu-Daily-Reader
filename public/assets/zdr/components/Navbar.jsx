require("./res/Navbar.less");

var React = require("react");
var Navbar = React.createClass(
    {
        render: function ()
        {
            const logo = require("common/res/img/zhihu_daily_logo.png");

            var nav =
                <nav className="Navbar navbar navbar-default navbar-fixed-top" >
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#navbarContent">
                                <span className="sr-only">导航</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/">
                                <img alt="知乎日报" src={logo} />
                            </a>
                        </div>

                        <div className="NavbarContent navbar-collapse collapse" >
                            <ul className="nav navbar-nav navbar-right">
                                <li className="active"><a href="#">日报</a></li>
                                <li><a href="#">专栏</a></li>
                                <li><a href="#">关于</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>;

            return nav;
        }
    }
);

module.exports = Navbar;