"use client";
import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const DailyChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const areaData = [
        { period: "Out-12", dl: 94, up: 2 },
        { period: "Out-13", dl: 97, up: 22 },
        { period: "Out-14", dl: 93, up: 7 },
        { period: "Out-15", dl: 92, up: 6 },
        { period: "Out-16", dl: 98, up: 17 },
        { period: "Out-17", dl: 90, up: 15 },
        { period: "Out-18", dl: 80, up: 17 },
        { period: "Out-19", dl: 80, up: 7 },
        { period: "Out-20", dl: 77, up: 18 },
        { period: "Out-21", dl: 96, up: 18 },
        { period: "Out-22", dl: 86, up: 18 },
        { period: "Out-23", dl: 103, up: 29 },
        { period: "Out-24", dl: 100, up: 23 },
        { period: "Out-25", dl: 114, up: 10 },
        { period: "Out-26", dl: 110, up: 22 },
        { period: "Out-27", dl: 109, up: 7 },
        { period: "Out-28", dl: 100, up: 6 },
        { period: "Out-29", dl: 105, up: 17 },
        { period: "Out-30", dl: 110, up: 15 },
        { period: "Out-31", dl: 105, up: 17 },
        { period: "Nov-01", dl: 107, up: 7 },
        { period: "Nov-02", dl: 60, up: 18 },
        { period: "Nov-03", dl: 67, up: 18 },
        { period: "Nov-04", dl: 76, up: 18 },
        { period: "Nov-05", dl: 73, up: 29 },
        { period: "Nov-06", dl: 94, up: 13 },
        { period: "Nov-07", dl: 105, up: 2 },
        { period: "Nov-08", dl: 115, up: 22 },
        { period: "Nov-09", dl: 110, up: 7 },
        { period: "Nov-10", dl: 100, up: 6 },
        { period: "Nov-11", dl: 105, up: 17 },
        { period: "Nov-12", dl: 109, up: 15 },
        { period: "Nov-13", dl: 90, up: 17 },
        { period: "Nov-14", dl: 70, up: 7 },
        { period: "Nov-15", dl: 67, up: 18 },
        { period: "Nov-16", dl: 86, up: 18 },
        { period: "Nov-17", dl: 86, up: 18 },
        { period: "Nov-18", dl: 113, up: 29 },
        { period: "Nov-19", dl: 130, up: 23 },
        { period: "Nov-20", dl: 125, up: 10 },
        { period: "Nov-21", dl: 128, up: 22 },
        { period: "Nov-22", dl: 129, up: 7 },
        { period: "Nov-23", dl: 122, up: 6 },
        { period: "Nov-24", dl: 105, up: 17 },
        { period: "Nov-25", dl: 110, up: 15 },
        { period: "Nov-26", dl: 102, up: 17 },
        { period: "Nov-27", dl: 107, up: 7 },
        { period: "Nov-28", dl: 70, up: 18 },
        { period: "Nov-29", dl: 77, up: 18 },
        { period: "Nov-30", dl: 76, up: 18 },
        { period: "Dez-01", dl: 73, up: 29 },
        { period: "Dez-02", dl: 94, up: 13 },
        { period: "Dez-03", dl: 79, up: 24 },
      ];

      const primaryColor = "#24447f";
      const secondaryColor = "#E2E3E5";
      const textColor = "#000";

      const networkChart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: areaData.map((data) => data.period),
          datasets: [
            {
              label: "Período Anterior",
              data: areaData.map((data) => data.up),
              borderColor: primaryColor,
              backgroundColor: primaryColor,
              fill: "start",
            },
            {
              label: "Período Atual",
              data: areaData.map((data) => data.dl),
              borderColor: secondaryColor,
              backgroundColor: secondaryColor,
              fill: "start",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              align: "start",
              labels: {
                boxWidth: 10,
                color: textColor,
              },
            },
          },
          interaction: {
            mode: "index",
            intersect: false,
          },
          scales: {
            y: {
              display: false,
              suggestedMax: 200,
            },
            x: {
              grid: {
                drawOnChartArea: false,
              },
              ticks: {
                font: { size: 11 },
                color: textColor,
                autoSkip: true,
                maxRotation: 0,
                minRotation: 0,
                maxTicksLimit: 9,
              },
            },
          },
          elements: {
            point: {
              radius: 1,
            },
            line: {
              tension: 0.25,
            },
          },
        },
      });

      return () => {
        networkChart.destroy();
      };
    }
  }, []);

  return (
    <canvas
      ref={chartRef}
      id="_dm-networkChart"
      style={{ height: "70px", margin: "0 -5px -5px" }}
    />
  );
};

export default DailyChart;
