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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        PUBLIC_URL: string;
    }
}

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);

// root.render(
//     <Provider store={store}>
//         <Router>
//             <App />
//         </Router>
//     </Provider>
// );
