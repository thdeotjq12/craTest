import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal_ZiwonSerch from "./Modal_ZiwonSerch";
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

const ZiwonGwanRi = props => {
  // 모달 보여주기
  const [Modals_ZiwonSerch, setMD_ZiwonSerch] = useState(false);

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
      </div>
    </div>
  );
};

export default ZiwonGwanRi;
