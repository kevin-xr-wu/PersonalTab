import React, { Component } from 'react';
import './App.css';
import './Tab.css';
import '../css/notes.css'; 
import '../css/filestorage.css'; 
var WeatherRow = require('./WeatherRow.js');
var Thumbnail = require('./Thumbnail.js'); 
var Tabs = require("./Tabs.js"); 
var Pane = require("./Pane.js"); 
var Notes = require("../pages/notes.js"); 
var FileStorage = require("../pages/file-storage.js"); 

class App extends Component {
  render() {
    return (
      <div className="App">

      <Tabs > 
        <Pane label="Home"> 
          <div className="tab3-content-background"> 
          </div>
          <div className="tab-content-spacing">
                <WeatherRow /> 
                <Thumbnail />
          </div> 
        </Pane> 
        <Pane label="Notes">
          <div className="tab2-content-background"> 
          </div>
          <div className="tab-content-spacing"><Notes/></div> 
        </Pane> 
        <Pane label="File Storage">
          <div className="tab-content-background"> 
          </div> 
          <div className="tab-content-spacing"><FileStorage/></div> 
        </Pane> 
        <Pane label="Calendar">
          <div className="tab-content-background"> 
          </div> 
          <div className="tab-content-spacing">Calendar is underdevelopment right now!</div> 
        </Pane> 
      </Tabs>
    </div>
    );
  }
}

export default App;
