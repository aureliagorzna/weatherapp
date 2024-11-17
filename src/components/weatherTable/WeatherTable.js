import React from "react";
import WeatherIcon from "../weatherIcon/weatherIcon";
import "./index.css";

const WeatherTable = ({ weekData }) => {
  return (
    <table className="weather-table">
      <tbody>
        {/* First Row with Empty First Column */}
        <tr>
          <td></td>
          <td style={{ paddingRight: "20px" }}>
            <WeatherIcon isDaytime={true} weatherCode={0} />
          </td>
          <td>
            <WeatherIcon isDaytime={false} weatherCode={0} />
          </td>
        </tr>

        {/* Remaining Rows with Days and Temperatures */}
        {weekData.map((dayData, index) => (
          <tr key={index}>
            <td>{dayData.day}</td>
            <td>
              {dayData.dayTemp}
              <span className="temp-unit">°C</span>
            </td>
            <td>
              {dayData.nightTemp}
              <span className="temp-unit">°C</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeatherTable;
