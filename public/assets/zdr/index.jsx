define(["jquery", "react", "jsx!HelloComponent"], function ($, React, HelloComponent)
{
    React.render(
        <HelloComponent />,
        $(".container-fluid")[0]
    );
});