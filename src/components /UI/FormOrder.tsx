import React from "react";
import Modal from "./Modal";

const FormOrder = () => {
  return (
    <Modal>
      <form>
        <div>
          <label htmlFor="name">Your Name</label>
          <input type="text" />

          <label htmlFor="email"> Your Email</label>
          <input type="text" />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default FormOrder;
