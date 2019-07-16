import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal_ZiwonSerch from "./Modal_ZiwonSerch";
import Grid_Ziwon from "./Grid_Ziwon";
import "./index.css";
import {
  Button,
  Modal,
  Row,
  Col,
  Container,
  Form,
  ButtonToolbar,
  Table,
  InputGroup,
  FormControl
} from "react-bootstrap";

import "font-awesome/css/font-awesome.css";
// react-datepicker 관련 https://reactdatepicker.com/

import {
  Loading,
  ADD_Saup_Grid_REQUEST,
  ADD_Saup_Grid_SUCCESS
} from "../../../../modules/Main/CompanyInfo/SaupGwanRi/SaupGwanRiReducer";
import axios from "axios";

const Grid_ZiwonCol = [
  { key: "DDD", name: "전체선택", width: 40, editable: true },
  { key: "STNAMEKOR", name: "이름", width: 80, editable: false },
  { key: "SSSWGUBUN", name: "근로구분", width: 80, editable: false },
  { key: "STJUMIN", name: "주민번호", width: 80, editable: true },
  {
    name: "Group",
    Grid_ZiwonCol: [
      {
        key: "SSMSTRDATE",
        name: "나이",
        width: 80,
        editable: true
      },
      { key: "SHMEMO", name: "성별", width: 80, editable: true },
      { key: "SSMMIDALYN", name: "미달", width: 80, editable: true }
    ]
  },

  { key: "STTEL", name: "연락처", width: 80, editable: true },
  { key: "SHNAMESHORT", name: "사업명", width: 80, editable: true },
  { key: "SDNAME", name: "세부사업배정", width: 80, editable: true },
  { key: "SANAME", name: "수행부서", width: 80, editable: true },
  { key: "SSMGUBUN", name: "선발구분", width: 80, editable: true },
  { key: "SSMEMO", name: "메모", width: 80, editable: true }
];

const ZiwonGwanRi = props => {
  // 모달 보여주기
  const [Modals_ZiwonSerch, setMD_ZiwonSerch] = useState(false);
  const [ZiwonList, setZiwonList] = useState("");
  const [getSDSHCODE, setSDSHCODE] = useState("");
  const [getSHCODE, setSHCODE] = useState("");

  useEffect(() => {
    console.log("ZiwonGwanRi - useEffect 실행됨");
  }, [ZiwonList, getSHCODE, getSDSHCODE]);

  const getCellValue = value => {
    setSHCODE(value.SHCODE); // 셀 내용 저장
    setSDSHCODE(value.SDSHCODE);
    console.log(value, value.SDSHCODE, value.SDCODE);
    getZiwonData(value.SDSHCODE, value.SDCODE);
  };
  // 지원자 관리 리스트
  const getZiwonData = (SDSHCODE, SDCODE) => {
    console.log("getZiwonData 실행됨", SDSHCODE);
    var parm = [
      {
        SDSHCODE: SDSHCODE,
        SDCODE: SDCODE,
        KeyWord: "",
        Gubun: "전체"
      }
    ];

    axios
      .post(
        "http://localhost:5000/CompanyInfo/ZiwonGwanRi/getZiwonGwanRi",
        parm
      )
      .then(res => {
        if (res.data === "NoData") {
          console.log("Damdang 쿼리 에러");
        } else {
          console.log("FindUser 가져오기 완료", res.data);

          setZiwonList(res.data.ZiwonList);
          console.log("검색된 사업 리스트", ZiwonList);
        }
      })
      .catch(err => {
        console.log("사업 검색 에러", err);
      });
  };
  // 모달 닫기
  const handleClose_ZiwonSerch = () => {
    setMD_ZiwonSerch(Modals_ZiwonSerch ? false : true);
  };
  return (
    <div>
      <div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
          <input
            type="text"
            // className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <Modal_ZiwonSerch
            Modals={Modals_ZiwonSerch}
            handleClose={handleClose_ZiwonSerch}
            getCellValue={getCellValue}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => setMD_ZiwonSerch(true)}
            >
              검색
            </button>
            <span className="input-group-text" id="inputGroup-sizing-default">
              Default
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
          <input
            type="text"
            // className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <div className="input-group-append">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Default
            </span>

            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
              <div role="separator" className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Separated link
              </a>
            </div>
            <div className="btnSideFun">
              <button className="btn btn-outline-secondary" type="button">
                Button
              </button>
              <button className="btn btn-outline-secondary" type="button">
                Button
              </button>
              <button className="btn btn-outline-secondary" type="button">
                Button
              </button>
              <button className="btn btn-outline-secondary" type="button">
                Button
              </button>
              <button className="btn btn-outline-secondary" type="button">
                Button
              </button>
              <button className="btn btn-outline-secondary" type="button">
                Button
              </button>
            </div>
          </div>
        </div>
        <div>
          <Grid_Ziwon
            columns={Grid_ZiwonCol}
            rows={ZiwonList}
            getCellValue={getCellValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ZiwonGwanRi;
