import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import SearchBox from './components/SearchBox/SearchBox';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
        <Navbar title="PLAY2GETHER" icon="fa-solid fa-volleyball"/>
        <SearchBox title="Wyszukaj"/>
        <div className="map" style={{textAlign: "center", height: "1000px", backgroundColor: "green", float: "left", width: "55%"}}>
            Mapa
        </div>
        <div className="ad" style={{textAlign: "center", height: "1000px", backgroundColor: "red", float: "left", width: "20%"}}>
            Miejsce na twoją reklamę
        </div>
        <Footer creatorName="Play2Gether inc."/>
    </div>
  );
}

export default App;
