import React, { useState, useEffect } from "react";
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
import { formatRelative } from "date-fns/esm";
const Modal_ZiwonSerch = props => {
  const { handleClose, Modals } = props;

  const Close = Closer => {
    props.handleClose(Closer);
  };

  const Save = e => {
    console.log("Save", e);
  };
  return (
    <Modal
      show={Modals}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="ModalContainer"
      centered
      // modal-dialog modal-lg
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">메모</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group-append">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
            <div role="separator" class="dropdown-divider" />
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </div>
          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
            <div role="separator" class="dropdown-divider" />
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </div>

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
          <button className="btn btn-primary">검색123</button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">저장</Button>

        <Button onClick={() => Close(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal_ZiwonSerch;
