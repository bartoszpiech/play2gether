import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import SearchBox from './components/SearchBox/SearchBox';

function App() {
  return (
    <div className="App">
        <Navbar title="PLAY2GETHER">
        </Navbar>
        <SearchBox>
        </SearchBox>
        <div className="map" style={{float: "left", width: "50%"}}>
            map
        </div>
        <div className="ad" style={{float: "left", width: "20%"}}>
            ad
        </div>
        <div className="footer" style={{clear: "both"}}>
            footer
        </div>
    </div>
  );
}

export default App;
