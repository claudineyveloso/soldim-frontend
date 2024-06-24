"use client";
import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const OrdersChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const hddData = [
        { period: "Nov-04", hddSpace: 57 },
        { period: "Nov-05", hddSpace: 69 },
        { period: "Nov-06", hddSpace: 70 },
        { period: "Nov-07", hddSpace: 62 },
        { period: "Nov-08", hddSpace: 73 },
        { period: "Nov-09", hddSpace: 79 },
        { period: "Nov-10", hddSpace: 76 },
        { period: "Nov-11", hddSpace: 77 },
        { period: "Nov-12", hddSpace: 73 },
        { period: "Nov-13", hddSpace: 52 },
        { period: "Nov-14", hddSpace: 57 },
        { period: "Nov-15", hddSpace: 50 },
        { period: "Nov-16", hddSpace: 60 },
        { period: "Nov-17", hddSpace: 55 },
        { period: "Nov-18", hddSpace: 70 },
        { period: "Nov-19", hddSpace: 68 },
        { period: "Nov-20", hddSpace: 57 },
        { period: "Nov-21", hddSpace: 62 },
        { period: "Nov-22", hddSpace: 53 },
        { period: "Nov-23", hddSpace: 69 },
        { period: "Nov-24", hddSpace: 59 },
        { period: "Nov-25", hddSpace: 67 },
        { period: "Nov-26", hddSpace: 69 },
        { period: "Nov-27", hddSpace: 59 },
        { period: "Nov-28", hddSpace: 67 },
        { period: "Nov-29", hddSpace: 69 },
        { period: "Nov-30", hddSpace: 58 },
        { period: "Dez-01", hddSpace: 50 },
        { period: "Dez-02", hddSpace: 47 },
        { period: "Dez-03", hddSpace: 65 },
      ];

      const hddChart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: hddData.map((data) => data.period),
          datasets: [
            {
              label: "Peças",
              data: hddData.map((data) => data.hddSpace),
              borderColor: "white",
              backgroundColor: "rgba(255,255,255,.4)",
              fill: "start",
              parsing: {
                xAxisKey: "period",
                yAxisKey: "hddSpace",
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          resizeDelay: 250,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              caretSize: 0,
              yAlign: "center",
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || "";
                  if (context.parsed.y !== null)
                    label += " : " + context.parsed.y;
                  return label;
                },
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
            },
            x: {
              display: false,
            },
          },
          elements: {
            point: {
              radius: 1,
            },
            line: {
              tension: 0.15,
            },
          },
        },
      });

      return () => {
        hddChart.destroy();
      };
    }
  }, []);

  return (
    <canvas
      ref={chartRef}
      id="_dm-hddChart"
      style={{ height: "70px", margin: "0 -5px -5px" }}
    />
  );
};

export default OrdersChart;
