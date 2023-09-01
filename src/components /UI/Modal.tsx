import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

//this backdrop component will be in middle of parent component and ModalOverlay component
//it will prevent writing or changing element in parent component when modal is dispalyed 
//this is done by using css
const Backdrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement: any = document.getElementById("overlays");

const Modal = (props: any) => {
  return (
    <Fragment>
      {/* This is the alternative way to do, but we are using portals so that out html code in DOM does not 
      spread all over the place. And to write more clean code 
       <Backdrop />
      <ModalOverlay {props.children}/> */}

      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
