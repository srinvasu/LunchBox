import React from "react";
import QrCodeGenerator from '../components/QrCodeGenerator';

const app = () => {
    const url = `${process.env.NEXT_PUBLIC_URL}`;// replace with our URL
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-1 text-center py-3">Lunch BOX</h1>
        </div>
      </div>
      <div className="row">
        <div className="col text-center py-5">
            <QrCodeGenerator  url={url} />
        </div>
      </div>
      <div className="row">
        <div className="col">
            <small className="text-center">
                <p className="fst-italic"><span className="fw-bold">H</span>ot <span className="fw-bold">H</span>ealthy <span className="fw-bold">H</span>ygiene</p>
            </small>
        </div>
      </div>
    </div>
  );
};

export default app;
