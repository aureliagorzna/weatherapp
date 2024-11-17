import axios from "axios";

/**
 * Sends API request to transform city name into lat and lon
 * @param {string} city - city name
 * @returns {object} - object with latitude and longtitude
 */
export const getCoordinatesByCityName = async (city) => {
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&count=1`;

  try {
    const response = await axios.get(geocodingUrl);
    if (response.data.results && response.data.results.length > 0) {
      const { latitude, longitude } = response.data.results[0];
      console.log("returning coordinates");
      return { latitude, longitude };
    } else {
      console.log("City not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
};

/**
 * @param {string[]} timestamps - array of date format "yyyy-mm-ddThh:mm"
 * @returns {string[]} - array of dates formated "hh:mm"
 */
export const convertToTimeFormatArray = (timestamps) => {
  return timestamps.map((time) => convertToTimeFormat(time));
};

/**
 * @param {string} time - required date format "yyyy-mm-ddThh:mm"
 * @returns {string} - date formated to "hh:mm"
 */
export const convertToTimeFormat = (time) => {
  return time.split("T")[1].slice(0, 5);
};

/**
 * @param {number} weatherCode - weather code
 * @returns {string} - human readable description of the weather
 */
export const mapWeatherCodeToCondition = (weatherCode) => {
  const weatherConditions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    56: "Light freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorms",
    96: "Thunderstorms with light hail",
    99: "Thunderstorms with heavy hail",
  };

  return weatherConditions[weatherCode] || "Unknown condition";
};
