import React, { useEffect, useRef } from 'react';
import QRCode from "qrcode";

const QrCodeGenerator = ({url}) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        if(canvasRef.current){
            QRCode.toCanvas(canvasRef.current, url , {width:300}, (err) => {
                if(err) console.error(err);
            });
        }
    },[url]);

    return (
        <div>
          <canvas ref={canvasRef}></canvas>
        </div>
      );
}

export default QrCodeGenerator;
