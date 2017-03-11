import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./App";

import "./index.less";

function renderRoot()
{
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById("MainContainer")
    );
}

renderRoot();

// HMR to preserve React's state.
if (module.hot)
{
    module.hot.accept("./App", renderRoot);
}
