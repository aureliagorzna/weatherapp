import React from "react";
import { WiSunrise, WiSunset } from "react-icons/wi";
import "./index.css";

const Daytime = ({ sunrise, sunset }) => {
  return (
    <div className="daytime-wrapper">
      <div className="daytime-section">
        <span>Sunrise</span>
        <br></br>
        <p>{sunrise}</p>
        <WiSunrise style={{ color: "orange", fontSize: "80px" }} />
      </div>
      <div className="daytime-section">
        <span>Sunset</span>
        <br></br>
        <p>{sunset}</p>
        <WiSunset style={{ color: "#e6435e", fontSize: "80px" }} />
      </div>
    </div>
  );
};

export default Daytime;
