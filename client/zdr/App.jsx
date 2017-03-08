import React from "react";

import Navbar from "./components/Navbar";
import DailyPage from "./daily/DailyPage";

const App = () =>
{
    return (
        <div className="App">
            <Navbar />
            <DailyPage />
        </div>
    );
};

export default App;
