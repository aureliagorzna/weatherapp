import { useEffect, useState } from "react";
import SearchBar from "./components/searchBar/searchBar";
import WeatherIcon from "./components/weatherIcon/weatherIcon";
import TemperatureChart from "./components/temperatureChart/temperatureChart";
import {
  getCoordinatesByCityName,
  convertToTimeFormatArray,
  convertToTimeFormat,
  mapWeatherCodeToCondition,
} from "./utlis";
import axios from "axios";
import Daytime from "./components/daytime/daytime";
import WeatherTable from "./components/weatherTable/WeatherTable";

const DEFAULT_CITY = "Warsaw";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateData = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const fetchData = async (city) => {
    const coordinates = await getCoordinatesByCityName(city);
    if (!coordinates) {
      setLoading(true);
      return;
    }
    const { latitude, longitude } = coordinates;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

    const response = await axios.get(url);
    const currentTime = new Date(response.data.current_weather.time);
    const localTime = new Date();
    const minutes = localTime.getMinutes();
    currentTime.setMinutes(minutes);

    // Round the current time to the next hour
    const currentHour =
      currentTime.getHours() + (currentTime.getMinutes() >= 45 ? 1 : 0);

    // Get the temperature and time data from the API for the next 24 hours
    let hourlyTemp = response.data.hourly.temperature_2m.slice(
      currentHour,
      currentHour + 24
    );
    let hourlyTime = response.data.hourly.time.slice(
      currentHour,
      currentHour + 24
    );

    // Convert the time to the hh:mm format
    hourlyTime = convertToTimeFormatArray(hourlyTime);
    hourlyTemp = hourlyTemp.map((item) => Math.round(item));

    const hourlyWeather = hourlyTemp.map((item, i) => ({
      time: hourlyTime[i],
      temp: item,
    }));

    const weeklyDate = response.data.daily.time;
    const weeklyWeather = weeklyDate.map((item, i) => ({
      day: i > 0 ? daysOfWeek[new Date(item).getDay()] : "Today",
      dayTemp: Math.round(response.data.daily.temperature_2m_max[i]),
      nightTemp: Math.round(response.data.daily.temperature_2m_min[i]),
    }));

    const weatherCode = response.data.current_weather.weathercode;

    // Capitalize the city name properly
    let cityString = city.toLowerCase();
    cityString = cityString.charAt(0).toUpperCase() + cityString.slice(1);

    updateData("dayOfWeek", daysOfWeek[currentTime.getDay()]);
    updateData("next24h", hourlyWeather);
    updateData("weekData", weeklyWeather);
    updateData("location", cityString);
    updateData("conditions", weatherCode);
    updateData("conditions_text", mapWeatherCodeToCondition(weatherCode));
    updateData("temp", Math.round(response.data.current_weather.temperature));
    updateData("time", convertToTimeFormat(response.data.current_weather.time));
    updateData("sunrise", convertToTimeFormat(response.data.daily.sunrise[0]));
    updateData("sunset", convertToTimeFormat(response.data.daily.sunset[0]));
    updateData("daytime", response.data.current_weather.is_day);

    setLoading(false);
  };

  useEffect(() => {
    fetchData(DEFAULT_CITY);
  }, []);

  if (loading) {
    return (
      <main className="App">
        <div className="container-wrapper">
          <SearchBar fetchData={fetchData} />
          <div className="container">
            <h2>No city found...</h2>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="App">
      <div className="container-wrapper">
        <SearchBar fetchData={fetchData} />
        <div className="container">
          <div className="overview">
            <h1 className="city">{data.location}</h1>
            <div className="temperature-info">
              <h1>
                {data.temp}
                <span className="temp-unit">°C</span>
              </h1>
              <WeatherIcon
                weatherCode={data.conditions}
                isDaytime={data.daytime}
              />
            </div>
            <div className="time">
              <p>
                {data.dayOfWeek}, {data.time}
              </p>
            </div>
          </div>
          <TemperatureChart data={data.next24h} />
          <Daytime sunrise={data.sunrise} sunset={data.sunset} />
          <WeatherTable weekData={data.weekData} />
        </div>
      </div>
    </main>
  );
}

export default App;
