
import React, { useRef, useEffect } from "react";
import "./OffcanvasDemo.css";
import WebChat from "../chat/WebChat";


export default function OffcanvasDemo() {
  const chatRef = useRef(null);

  useEffect(() => {
    const offcanvas = document.getElementById("offcanvasScrolling");
    if (!offcanvas) return;
    const handleShown = () => {
      if (chatRef.current && chatRef.current.focusInput) {
        chatRef.current.focusInput();
      }
    };
    offcanvas.addEventListener("shown.bs.offcanvas", handleShown);
    return () => {
      offcanvas.removeEventListener("shown.bs.offcanvas", handleShown);
    };
  }, []);

  return (
    <>
      <button className="btn offcanvas-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
        실시간 채팅
      </button>

      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h2 className="offcanvas-title" id="offcanvasScrollingLabel">실시간 채팅방</h2>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div>
          <WebChat ref={chatRef} />
        </div>
      </div>
    </>
  );
}
