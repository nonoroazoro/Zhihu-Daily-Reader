﻿require("./res/DailyPage.less");

var React = require("react");
var DailyManager = require("./controllers/DailyManager");

var Carousel = require("./components/Carousel");
var FlexView = require("./components/FlexView");
var ArticleView = require("./components/ArticleView");

/**
 * 知乎日报页面。
 */
var DailyPage = React.createClass(
{
    getInitialState()
    {
        return {
            topStories: []
        };
    },

    componentDidMount: function ()
    {
        DailyManager.getTopStories(function (data)
        {
            if (data && this.isMounted())
            {
                this.setState(
                {
                    topStories: data.stories
                });
            }
        }.bind(this));
    },

    handleCarouselClick: function (p_story)
    {
        console.log(p_story);
    },
    
    handleTileClick: function (p_story)
    {
        console.log(p_story);
    },

    render: function ()
    {
        var page =
            <div className="DailyPage container-fluid">
                <div className="CarouselContainer container-fluid">
                    <Carousel onClick={this.handleCarouselClick} data={this.state.topStories} />
                </div>
                <div className="FlexContainer container-fluid">
                    <FlexView onTileClick={this.handleTileClick} />
                </div>
            </div>;
        return page;
    }
});

module.exports = DailyPage;