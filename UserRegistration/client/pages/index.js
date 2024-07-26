import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import AuthForm from "../components/AuthForm";

const home = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  //submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user details", name, phone, address);
    //hit the back-end
    try {
      setLoading(true);
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`,{
        name,
        phone,
        address
      });
      setOk(data.ok);
      setName("");
      setPhone("");
      setAddress("");
      //console.log("data from back-end=>", data);
      setLoading(false);
    }
    catch(err){
      console.log("error",err);
      setLoading(false);
      toast.error(err.response.data);
    }
    
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <h1 className="display-1  py-3">Lunch Box</h1>
          <hr />
        </div>
      </div>
      <div className="row py-2">
        <div className="col px-5">
          <AuthForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            loading={loading}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Modal show={ok} onHide={() => setOk(false)}>
            <Modal.Header closeButton>
              <Modal.Title>"Congratulations!"</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You Registered successfully</p>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <small className="text-center">
        <p className="fst-italic">
          <span className="fw-bold">H</span>ot {" "}
          <span className="fw-bold">H</span>ealthy {" "}
          <span className="fw-bold">H</span>ygiene
        </p>
      </small>
    </div>
  );
};

export default home;
