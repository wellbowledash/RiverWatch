import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-left">
      <div
        className="text-center p-3 "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Visit the official government <a href = "http://www.uppcb.com/river_quality.htm" target="_blank">website</a> for more information.
        <br></br>
        For any Queries Contact :{" "}
        {/* <p>  </p> */}
        <a className="text-dark font-bold"  style={{ marginLeft: '.5rem' }} href="https://www.linkedin.com/in/ashmit-raj-37278b235/" target="_blank">
          Ashmit
        </a>
        <a className="text-dark  font-bold"  style={{ marginLeft: '.5rem' }}href="https://www.linkedin.com/in/aditya-sharma-95134524b/" target="_blank">
          Aditya
        </a>
        <a className="text-dark font-bold"  style={{ marginLeft: '.5rem' }} href="https://www.linkedin.com/in/ashwin-ekka-5439a5247/" target="_blank" >
          Ashwin
        </a>
        <a className="text-dark font-bold"  style={{ marginLeft: '.5rem' }} href="https://www.linkedin.com/in/devesh-kailodiya-aa2277224/" target="_blank">
          Devesh
        </a>


        
        
      </div>
    </MDBFooter>
  );
}
