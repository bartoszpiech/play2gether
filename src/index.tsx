import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Assets/Styles/index.css"
import "moment/locale/pl";


import ReactDOM from "react-dom/client";

import { UserProvider } from "./context/UserContext";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <UserProvider>
        <App />
    </UserProvider>
);
