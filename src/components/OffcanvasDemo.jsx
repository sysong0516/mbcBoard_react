import React from "react";
import "./OffcanvasDemo.css";
import WebChat from "./WebChat";

export default function OffcanvasDemo() {
  return (
    <>
      <button className="btn offcanvas-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
        실시간 채팅
      </button>

      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">실시간 채팅방 구현중..</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div>
          <WebChat />
        </div>
      </div>
    </>
  );
}
