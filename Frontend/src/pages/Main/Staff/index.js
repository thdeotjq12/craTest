import React, { useState, useEffect } from "react";
import ING_N from "../../../Images/ING_N.bmp";
import ING_Y from "../../../Images/ING_Y.bmp";
import Info from "./Info";
import Info_Seabu from "./Info_Seabu";
import Grid_STList from "./Grid_STList";
import axios from "axios";
import "bootstrap";
import "./index.css";
var moment = require("moment");
const Grid_STListCol = [
  { key: "DDD1", name: "전체선택", width: 40, editable: true },
  { key: "DDD2", name: "구분", width: 40, editable: true },
  { key: "DDD3", name: "근로자명", width: 80, editable: true },
  { key: "DDD4", name: "세부사업명", width: 120, editable: true }
];

const Staff = props => {
  const [SaupHeadList, setSAHead] = useState(""); // 추진사업 리스트
  const [SaupDetailList, setSADetail] = useState(""); // 세부사업 리스트
  const getCellValue = value => {};
  const [selectedMenu, setSeletedMenu] = useState(1);
  const onMenuClick = idx => {
    setSeletedMenu(idx);
  };
  useEffect(() => {
    console.log("Staff Effect");
  });
  const DropDownYear = Term => {};
  const btnFindClick = () => {};
  //1.연도선택하면 사업,추진사업 콤보상자 셋팅하는 함수
  const btnYearClick = () => {};
  //1-1.추진사업 셋팅
  const SetSaupHead = Mode => {
    var moment = require("moment");
    moment.locale("ko");

    var parm = {
      KeyYear: document.getElementsByName("KeyYear")[0].value,
      Mode: Mode
    };

    axios
      .post("http://localhost:5000/Staff/getSaupHead", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
          console.log("SaupHeadList 데이터가 없습니다");
        } else {
          setSAHead(res.data.SaupHeadList);
          console.log("SaupHeadList", res.data.SaupHeadList);
        }
      })
      .catch(err => {
        console.log("SaupHeadList 에러", err);
      });
  };
  //1-2.세부사업 셋팅
  const SetSaupDetail = (SHCode, Mode) => {
    var moment = require("moment");
    moment.locale("ko");

    var parm = { SHCode: SHCode, Mode: Mode };

    axios
      .post("http://localhost:5000/Staff/getSaupDetail", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
          console.log("SetSaupDetail 데이터가 없습니다");
        } else {
          setSADetail(res.data.SaupDetailList);
          console.log("SetSaupDetail", res.data.SaupDetailList);
        }
      })
      .catch(err => {
        console.log("SetSaupDetail 에러", err);
      });
  };
  // 추진사업 콤보상자 셋팅
  const setSACombo = SaupHeadList => {
    var Combo = document.getElementsByName("SelSaup");
    var option = document.createElement("option");
    console.log("COmbo", SaupHeadList.length);
    option.text = "123";

    for (let i = 0; i < SaupHeadList.length; i++) {
      // Combo.options[Combo.options.length] = new Option("Text", "value");
      // Combo.add(option);
      Combo.appendChild(option);
    }
  };

  return (
    <div className="MainDivContainer">
      <div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColTitle" style={{ width: "150px" }}>
                사업시작연도
              </td>
              <td className="ColTitle" style={{ width: "250px" }}>
                참여사업
              </td>
              <td className="ColTitle" style={{ width: "250px" }}>
                참여 세부사업
              </td>
              <td className="ColTitle" style={{ width: "150px" }}>
                검색어
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%", height: "80px" }}
                >
                  검색
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  사원복사
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  삭제
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  엑셀
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  신규등록
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  수정
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  저장
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="input-group-prepend">
                  <select
                    class="browser-default custom-select"
                    name="KeyYear"
                    onClick={() => [SetSaupHead("전체")]}
                    onChange={() => [
                      SaupHeadList && setSACombo(SaupHeadList),
                      SetSaupDetail(
                        SaupDetailList && SaupHeadList.SHCode,
                        "전체"
                      )
                    ]}
                  >
                    <option selected>연도선택</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="input-group-prepend">
                  <select
                    class="browser-default custom-select"
                    name="SelSaup"
                    onChange={() => [
                      SetSaupHead("전체"),
                      SetSaupDetail(
                        SaupDetailList && SaupHeadList.SHCode,
                        "전체"
                      )
                    ]}
                  >
                    <option selected>연도선택</option>
                    <option value="2015">2015</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="input-group-prepend">
                  <select
                    class="browser-default custom-select"
                    name="SelSeabuSaup"
                    onChange={() => [
                      SetSaupHead("전체"),
                      SetSaupDetail(
                        SaupDetailList && SaupHeadList.SHCode,
                        "전체"
                      )
                    ]}
                  >
                    <option selected>연도선택</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </td>

              <td />
            </tr>

            <tr>
              <td className="ColGubun">범례</td>
              <td>
                <img src={ING_Y} /> 진행중
                <img src={ING_N} />
                사업종료
                <img src={ING_N} />
                선택
              </td>

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => onMenuClick(1)}
                >
                  기본정보
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => onMenuClick(2)}
                >
                  급여정보
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <Grid_STList
                  columns={Grid_STListCol}
                  rows={["123", "123"]}
                  getCellValue={getCellValue}
                />
              </td>
              <td colSpan="9" style={{ verticalAlign: "top" }}>
                {selectedMenu === 1 && <Info />}
                {selectedMenu === 2 && <Info_Seabu />}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;
