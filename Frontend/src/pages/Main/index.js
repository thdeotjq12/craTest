import React, { Component } from "react";
import CompanyInfo from "./CompanyInfo";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: 1
    };
  }

  onMenuClick = idx => {
    this.setState({
      selectedMenu: idx
    });
  };
  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.onMenuClick(1)}>일정</button>
          <button onClick={() => this.onMenuClick(2)}>기관정보</button>
          <button onClick={() => this.onMenuClick(3)}>사원관리</button>
          <button onClick={() => this.onMenuClick(4)}>인사관리</button>
          <button
            onClick={() =>
              this.props.history.replace({
                pathname: "/"
              })
            }
          >
            로그아웃
          </button>
        </div>
        <div>
          {this.state.selectedMenu === 1}
          {this.state.selectedMenu === 2 && <CompanyInfo />}
          {this.state.selectedMenu === 3 && <div />}
          {this.state.selectedMenu === 4 && <div />}
        </div>
      </div>
    );
  }
}

export default Main;
