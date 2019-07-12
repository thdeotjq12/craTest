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
const Modal_Memo = props => {
  const { handleClose, Modals } = props;

  const Close = handleCloser => {
    props.handleClose(handleCloser);
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
        <FormControl as="textarea" aria-label="With textarea" id="Id" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">저장</Button>

        <Button onClick={() => Close(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal_Memo;
