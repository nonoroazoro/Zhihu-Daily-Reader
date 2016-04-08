import "./res/index.less";

import React     from "react";
import ReactDOM  from "react-dom";
import Navbar    from "./components/Navbar";
import DailyPage from "./daily/DailyPage";

ReactDOM.render(
    <div>
        <Navbar />
        <DailyPage />
    </div>,
    document.getElementById("MainContainer")
);
