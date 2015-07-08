define(["react"], function (React)
{
    return React.createClass(
        {
            displayName: "HelloComponent",
            render: function ()
            {
                return (<header><h1>Hello</h1></header>);
            }
        }
    );
});