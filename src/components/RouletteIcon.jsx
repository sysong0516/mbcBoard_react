import React from "react";
import rouletteImg from "../assets/roulette.png";

const RouletteIcon = ({ onClick }) => (
  <img
    src={rouletteImg}
    alt="룰렛"
    style={{
      position: "fixed",
      right: "2rem",
      bottom: "6.5rem",
      width: "80px",
      height: "80px",
      zIndex: 1001,
      cursor: "pointer",
      borderRadius: "50%",
      objectFit: "cover",
      aspectRatio: "1 / 1"
    }}
    onClick={onClick}
  />
);

export default RouletteIcon;
