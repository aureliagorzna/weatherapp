import React from "react";
import {
  WiDaySunny,
  WiNightClear,
  WiRain,
  WiNightRain,
  WiDayCloudy,
  WiNightCloudy,
  WiThunderstorm,
  WiNightThunderstorm,
  WiDayFog,
  WiNightFog,
} from "react-icons/wi";
import "./index.css";

const WeatherIcon = ({ weatherCode, isDaytime }) => {
  const getIcon = (code, isDaytime) => {
    const iconStyle = {
      fill: "", // This will be set individually for each icon
    };

    switch (code) {
      // Clear Sky
      case 0:
        iconStyle.fill = isDaytime ? "#e6b800" : "#d4a500"; // Darker yellow for nighttime
        return isDaytime ? (
          <WiDaySunny style={iconStyle} />
        ) : (
          <WiNightClear style={iconStyle} />
        );

      // Few Clouds, Scattered Clouds, Broken Clouds
      case 1:
      case 2:
      case 3:
        iconStyle.fill = isDaytime ? "#ffffff" : "#4f4f4f"; // White for day, dark gray for night
        return isDaytime ? (
          <WiDayCloudy style={iconStyle} />
        ) : (
          <WiNightCloudy style={iconStyle} />
        );

      // Fog
      case 45:
      case 48:
        iconStyle.fill = isDaytime ? "#c0c0c0" : "#4f4f4f"; // Light gray for day, dark gray for night
        return isDaytime ? (
          <WiDayFog style={iconStyle} />
        ) : (
          <WiNightFog style={iconStyle} />
        );

      // Rain
      case 51:
      case 53:
      case 55:
        iconStyle.fill = "#1e90ff"; // Dodger blue
        return isDaytime ? (
          <WiRain style={iconStyle} />
        ) : (
          <WiNightRain style={iconStyle} />
        );

      // Thunderstorm
      case 71:
      case 73:
      case 75:
      case 77:
      case 80:
      case 81:
      case 82:
        iconStyle.fill = "#808080"; // Dark gray
        return isDaytime ? (
          <WiThunderstorm style={iconStyle} />
        ) : (
          <WiNightThunderstorm style={iconStyle} />
        );

      // Snow and Other Storms
      case 95:
      case 96:
      case 99:
        iconStyle.fill = "#808080"; // Dark gray
        return isDaytime ? (
          <WiThunderstorm style={iconStyle} />
        ) : (
          <WiNightThunderstorm style={iconStyle} />
        );

      // Default: Cloudy
      default:
        iconStyle.fill = isDaytime ? "#ffffff" : "#4f4f4f"; // White for day, dark gray for night
        return isDaytime ? (
          <WiDayCloudy style={iconStyle} />
        ) : (
          <WiNightCloudy style={iconStyle} />
        );
    }
  };

  return <div className="icon">{getIcon(weatherCode, isDaytime)}</div>;
};

export default WeatherIcon;
