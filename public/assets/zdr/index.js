var Header = React.createClass(
    {
        render: function ()
        {
            return (<header><h1>Hello</h1></header>);
        }
    }
);

React.render(
    <Header />,
    document.body
);