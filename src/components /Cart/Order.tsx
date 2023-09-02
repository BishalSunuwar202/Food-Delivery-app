import React, { useState } from "react";
import FormOrder from "../UI/FormOrder";

const Order = (props: any) => {
  const [openForm, setopenForm] = useState(false);

  const openFormHandler = () => {
    setopenForm(true);
  };
  return (
    <>
      <button onClick={openFormHandler}>Order</button>
      {openForm && <FormOrder />}
    </>
  );
};

export default Order;
