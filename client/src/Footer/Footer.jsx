import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-left">
      <div
        className="text-center p-3 "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Visit the official <a href = "http://www.uppcb.com/river_quality.htm" target="_blank">website</a> for more information.
        <br></br>
         For any Queries Contact :{" "}
        {/* <p>  </p> */}
        <a className="text-dark  font-bold"  style={{ marginLeft: '.5rem' }}href="https://mdbootstrap.com/">
          Aditya
        </a>
        <a className="text-dark font-bold"  style={{ marginLeft: '.5rem' }} href="https://mdbootstrap.com/">
          Ashmit
        </a>
        <a className="text-dark font-bold"  style={{ marginLeft: '.5rem' }} href="https://mdbootstrap.com/">
          Ashwin
        </a>
        <a className="text-dark font-bold"  style={{ marginLeft: '.5rem' }} href="https://mdbootstrap.com/">
          Devesh
        </a>
        
      </div>
    </MDBFooter>
  );
}
