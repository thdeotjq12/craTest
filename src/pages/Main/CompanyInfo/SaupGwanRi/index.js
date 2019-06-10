import React, { Component } from "react";
import "./index.css";
import DatePicker from "../../../../components/DatePicker/DatePicker.js";

class SaupGwanRi extends Component {
  constructor(props) {
    super(props);
    this.onDayClick = this.onDayClick.bind(this);
    this.state = {
      selectedDate: new Date()
    };
  }
  render() {
    const { selectedDate } = this.state;
    return (
      <div>
        <div>
          <label className="TableTitle">사업명 등록</label>
          <div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="ColGubun">기준연도(사업시작일기준)</td>
                  <td class="input-group date" id="datetimepicker1">
                    <span class="glyphicon glyphicon-calendar" />
                  </td>
                  <div className="MainContent">
                    <DatePicker
                      fullDate={selectedDate}
                      onDayClick={this.onDayClick}
                    />
                  </div>
                  <td>~</td>
                  <td>#</td>
                  <td className="ColGubun">대표자</td>
                  <td>#</td>
                  <td className="ColGubun">고유번호</td>
                  <td>#</td>
                </tr>
              </tbody>
            </table>
          </div>
          <label className="TableTitle">기관 담당자 정보</label>
          <div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="ColGubun">총괄업무담당</td>
                  <td>#</td>
                  <td className="ColGubun">이메일</td>
                  <td>#</td>
                  <td className="ColGubun">전화번호</td>
                  <td>#</td>
                </tr>
                <tr>
                  <td className="ColGubun">휴대폰 번호</td>
                  <td>#</td>
                  <td className="ColGubun">팩스 번호</td>
                  <td>#</td>
                  <td className="ColGubun">비고</td>
                  <td>#</td>
                </tr>
                <tr>
                  <td className="ColGubun">메모</td>
                  <td colSpan="5">
                    <textarea style={{ width: "100%", border: "0" }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  onDayClick(newDay) {
    const { selectedDate } = this.state;

    this.setState({
      selectedDate: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        newDay
      )
    });
  }
}

export default SaupGwanRi;
