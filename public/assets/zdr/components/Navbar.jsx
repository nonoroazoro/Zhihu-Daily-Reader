var React = require("react");
var Navbar = React.createClass(
    {
        render: function ()
        {
            var navBrandStyle = {height: "73px"};
            var navButtonStyle = {top: "12px"};
            var brand = require("common/res/img/zhihu_daily_logo.png");

            var nav = 
                <nav className="navbar navbar-default navbar-fixed-top" >
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" style={navButtonStyle}>
                                <span className="sr-only">导航</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#" style={navBrandStyle}>
                                <img alt="知乎日报" src={brand} />
                            </a>
                        </div>
                    </div>
                </nav>;

            return nav;
        }
    }
);

module.exports = Navbar;