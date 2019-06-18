import React, { Component } from "react";
import BasicInfo from "./BasicInfo";
import SaupGwanRi from "./SaupGwanRi";
class CompanyInfo extends Component {
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
          <button onClick={() => this.onMenuClick(1)}>기본정보</button>
          <button onClick={() => this.onMenuClick(2)}>사업관리</button>
          <button onClick={() => this.onMenuClick(3)}>지원자관리</button>
          <button onClick={() => this.onMenuClick(4)}>공통근로정보</button>
        </div>
        <div>
          {this.state.selectedMenu === 1 && <BasicInfo />}
          {this.state.selectedMenu === 2 && <SaupGwanRi />}
          {this.state.selectedMenu === 3 && <div />}
          {this.state.selectedMenu === 4 && <div />}
        </div>
      </div>
    );
  }
}

export default CompanyInfo;
