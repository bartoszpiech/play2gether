import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Assets/Styles/index.css";
import "moment/locale/pl";

import React from "react";
import ReactDOM from "react-dom/client";

import { UserProvider } from "./Context/UserContext";
import { Provider } from "react-redux";
import store from "./store/index";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <UserProvider>
                <App />
            </UserProvider>
        </Provider>
    </React.StrictMode>
);
