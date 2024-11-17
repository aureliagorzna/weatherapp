import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./index.css";

// Register required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const TemperatureChart = ({ data }) => {
  // Find the minimum and maximum temperature to add margin
  const minTemp = Math.min(...data.map((item) => item.temp));
  const maxTemp = Math.max(...data.map((item) => item.temp));
  const margin = 1;
  const yAxisMin = minTemp - margin;
  const yAxisMax = maxTemp + margin;

  // Prepare the chart data
  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: "",
        data: data.map((item) => item.temp),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
        pointBackgroundColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        datalabels: {
          display: false,
        },
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 16,
            color: "black",
          },
        },
      },
      x2: {
        display: true,
        position: "top",
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          callback: (value, index) => `${data[index].temp}°C`,
          font: {
            size: 16,
            color: "black",
            weight: "bold",
          },
        },
      },
      y: {
        display: false,
        min: yAxisMin,
        max: yAxisMax,
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
      point: {
        radius: 5,
        backgroundColor: "rgba(75,192,192,1)",
      },
    },
    animation: {
      duration: 500,
    },
  };

  // Set a fixed width to display only 5 elements initially
  const chartWidth = data.length > 5 ? `${data.length * 50}px` : "100%";

  return (
    <div className="chart-wrapper">
      <div
        style={{
          overflowX: data.length > 5 ? "scroll" : "hidden",
          width: "100%",
        }}
      >
        <div style={{ width: chartWidth }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default TemperatureChart;
