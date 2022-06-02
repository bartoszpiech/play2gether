import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Assets/Styles/index.css";
import "moment/locale/pl";

import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "Store/index";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { myTheme } from "Assets/theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={myTheme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </Provider>
);

// root.render(
//     <Provider store={store}>
//         <Router>
//             <App />
//         </Router>
//     </Provider>
// );
