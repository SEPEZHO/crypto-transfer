import React from "react";
import { Divider } from "antd";

import Main from "./Components/Main/";
import "./App.css";

const App = () => (
  <div className="App">
    <div className="Container">
      <p>
        👋 Hello!
        <br />
        🔄 Im a simple crypto transfer project.
      </p>
      <Divider dashed />
      <Main />
      <Divider dashed />
      <p className="Footer">
        Created by <a href="https://sepezho.com">sepezho</a> 2021
      </p>
    </div>
  </div>
);

export default App;
