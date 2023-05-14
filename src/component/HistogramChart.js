import React, { useState } from "react";
import Chart from "react-apexcharts";
import { saveAs } from "file-saver";

import style from "./Histogram.module.css";

export default function HistogramChart() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      plotOptions: {
        bar: {
          columnWidth: "100%",
          distributed: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#00122e"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#ADD8E6"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    },
    series: [
      {
        name: "Word Count",
        data: [],
      },
    ],
  });

  const fetchData = async () => {
    const response = await fetch("https://www.terriblytinytales.com/test.txt");
    const text = await response.text();
    const wordCount = {};
    text
      .toLowerCase()
      .replace(/[\W_]+/g, " ")
      .split(/\s+/)
      .forEach((word) => {
        if (wordCount[word]) {
          wordCount[word] = wordCount[word] + 1;
        } else {
          wordCount[word] = 1;
        }
      });

  
    const sortedWords = Object.entries(wordCount).sort(([, a], [, b]) => b - a);
    const categories = sortedWords.slice(0, 20).map(([word]) => word);
    const data = sortedWords.slice(0, 20).map(([, count]) => count);

    setChartData({
      options: {
        ...chartData.options,
        xaxis: {
          categories,
        },
      },
      series: [
        {
          name: "Word Count",
          data,
        },
      ],
    });
    setShowSubmitButton(false);
  };

  const handleExport = () => {
    const data = [
      ["Word", "Count"],
      ...chartData.series[0].data.map((count, i) => [
        chartData.options.xaxis.categories[i],
        count,
      ]),
    ];
    const csv = data.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "histogram-data.csv");
  };

  return (
    <div id={style.MainContainer}>
      {showSubmitButton && (
        <div id={style.FetchDataContainer}>
          <button onClick={fetchData} className={style.Button}>
            Submit
          </button>
        </div>
      )}
      {!showSubmitButton && (
        <div id={style.ChartMainContainer}>
          <div id={style.ChartContainer}>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height="450"
              width="800"
            />
          </div>
          <div id={style.ExportButtonContainer}>
            <button onClick={handleExport} className={style.Button}>
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
