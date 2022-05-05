import "./Assets/Styles/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Layouts/Navbar/Navbar";
import Footer from "./Layouts/Footer";

// import MainRoute from "./Routes/MainRoute";
import { MainRoute } from "./Routes/MainRoute";
import { UserRoute } from "./Routes/UserRoute";

import { PageNotFound } from "./Pages/index";

function App() {
    return (
        <Router>
            <Navbar
                title="PLAY2GETHER"
                icon="fa-solid fa-volleyball"
            ></Navbar>
            <Routes>
                {MainRoute()}
                {UserRoute()}
                <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Footer creatorName="Play2Gether inc." />
        </Router>
    );
}

export default App;
