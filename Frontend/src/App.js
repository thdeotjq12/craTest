import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import Main from "./pages/Main";

// 로그인 컴포넌트들을 가운데로 보내기위한 코드
const App = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    // componentDidMount
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <div
      className="App"
      style={{ width: width, height: height, display: "flex" }}
    >
      <Router>
        <Route exact path="/" component={LoginContainer} />
        <Route path="/Main" component={Main} />
      </Router>
    </div>
  );
};

export default App;
