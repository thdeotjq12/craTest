import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/Login";

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
      <LoginPage />
    </div>
  );
};

export default App;
