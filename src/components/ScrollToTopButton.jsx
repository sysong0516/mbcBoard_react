import React from "react";

const ScrollToTopButton = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        right: "2rem",
        bottom: "2rem",
        zIndex: 1000,
        padding: "1rem",
        borderRadius: "50%",
        background: "#e2b3a3",
        color: "#fff",
        border: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        cursor: "pointer"
      }}
    >
      ↑
    TOP
    </button>
  );
};

export default ScrollToTopButton;
