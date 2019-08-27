import React, { Component } from "react";
import "./index.css";
// datepick 부분
import locale from "flatpickr/dist/l10n/ko";
import "flatpickr/dist/flatpickr.min.css";
import InputGroup from "../../../../components/DatePicker/InputGroup";
import Button from "../../../../components/DatePicker/Buttons";
import Multiple from "../../../../components/DatePicker/Mulitple";
import DatetimePicker, {
  setLocale,
  parseDate
} from "../../../../components/DatePicker/DatetimePicker";
// import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

// 출처 : https://www.youtube.com/watch?v=xGZD4L0ne_E     ,
//        https://github.com/syakuis/react-datetimepicker ,
//        https://flatpickr.js.org/plugins/
setLocale(locale.ko);

class SaupGwanRi extends Component {
  constructor(props) {
    super(props);
    this.onDatetime = this.onDatetime.bind(this);
    this.state = {
      value: {
        datetime: [],
        value: ""
      },
      value2: {
        datetime: [parseDate("2011-11-30 20:10", "Y-m-d H:i")],
        value: ""
      },
      value3: {
        datetime: [],
        value: ""
      },
      range: {
        datetime: [
          parseDate("2011-11-30 10:20:00", "Y-m-d H:i:S"),
          parseDate("2011-12-30 10:20:00", "Y-m-d H:i:S")
        ],
        value: ""
      },
      multiple: {
        datetime: [parseDate("2011-11-30")],
        value: ""
      }
    };
  }
  onDatetime(datetime, value, name) {
    this.setState({ [name]: { datetime, value } });
  }

  handleChange = newDate => {
    console.log("newDate", newDate);
    return this.setState({ date: newDate });
  };

  render() {
    return (
      <div>
        <div>
          <label className="TableTitle">사업명 등록</label>
          <div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="ColTitle">기준연도(사업시작일기준)</td>
                  <td>
                    <Multiple />
                  </td>
                  <td className="ColTitle">사업명</td>
                  <td colSpan="5">
                    <input />
                    <button type="button" className="btn btn-primary">
                      검색
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ float: "Right" }}
                    >
                      제거
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ float: "Right" }}
                    >
                      추가
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="ColTitle">사업명</td>
                  <td className="ColTitle">사업명요약</td>
                  <td className="ColTitle">시작일</td>
                  <td className="ColTitle">종료일</td>
                  <td className="ColTitle">사업담당자</td>
                  <td className="ColTitle">전화번호</td>
                  <td className="ColTitle">이메일</td>
                  <td className="ColTitle">메모</td>
                </tr>
                <tr>
                  <td>사업명</td>
                  <td>사업명요약</td>
                  <td>시작일</td>
                  <td>종료일</td>
                  <td>사업담당자</td>
                  <td>전화번호</td>
                  <td>이메일</td>
                  <td>메모</td>
                </tr>
              </tbody>
            </table>
          </div>
          <label className="TableTitle">세부사업 등록</label>
          <div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="ColTitle">기준연도(사업시작일기준)</td>
                  <td>
                    <Multiple />
                  </td>
                  <td className="ColTitle">사업명</td>
                  <td colSpan="5">
                    <input />
                    <button type="button" className="btn btn-primary">
                      검색
                    </button>
                    <button type="button" className="btn btn-secondary">
                      담당자 상세보기
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ float: "Right" }}
                    >
                      제거
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ float: "Right" }}
                    >
                      추가
                    </button>
                  </td>
                </tr>

                <tr>
                  <td rowSpan="2" className="ColTitle">
                    세부사업명
                  </td>
                  <td rowSpan="2" className="ColTitle">
                    사업명
                  </td>
                  <td className="ColTitle">모집공고</td>

                  <td colSpan="2" className="ColTitle">
                    사업기간
                  </td>
                  <td rowSpan="2" className="ColTitle">
                    담당자
                  </td>
                  <td rowSpan="2" className="ColTitle">
                    사업수행부서
                  </td>
                  <td rowSpan="2" className="ColTitle">
                    구분
                  </td>
                  <td rowSpan="2" className="ColTitle">
                    선발현황
                  </td>
                  <td rowSpan="2" className="ColTitle">
                    근로정보
                  </td>
                </tr>

                <tr>
                  <td className="ColTitle">마감일</td>

                  <td className="ColTitle">시작일</td>
                  <td className="ColTitle">종료일</td>
                </tr>

                <tr>
                  <td>세부사업명</td>
                  <td>사업명</td>
                  <td>마감일</td>
                  <td>시작일</td>
                  <td>종료일</td>
                  <td>담당자</td>
                  <td>사업수행부서</td>
                  <td>구분</td>
                  <td>선발현황</td>
                  <td>근로정보</td>
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
