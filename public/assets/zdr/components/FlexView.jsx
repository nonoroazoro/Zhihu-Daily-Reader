require("./res/FlexView.less");

var React = require("react");

var FlexView = React.createClass(
{
        render: function ()
        {
            var items = [];
            for (var i = 0; i < 12; i++)
            {
                items.push(<div className="flex-tile" id={"tile" + i} />);
            }

            return (
                <div className="FlexView">
                    {items}
                </div>
            );
        }
});

module.exports = FlexView;