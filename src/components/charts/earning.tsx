"use client";
import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const EarningChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const earningData = [
        { period: "Nov-04", earning: 945 },
        { period: "Nov-05", earning: 754 },
        { period: "Nov-06", earning: 805 },
        { period: "Nov-07", earning: 855 },
        { period: "Nov-08", earning: 678 },
        { period: "Nov-09", earning: 987 },
        { period: "Nov-10", earning: 1026 },
        { period: "Nov-11", earning: 855 },
        { period: "Nov-12", earning: 730 },
        { period: "Nov-13", earning: 920 },
        { period: "Nov-14", earning: 870 },
        { period: "Nov-15", earning: 900 },
        { period: "Nov-16", earning: 890 },
        { period: "Nov-17", earning: 750 },
        { period: "Nov-18", earning: 900 },
        { period: "Nov-19", earning: 880 },
        { period: "Nov-20", earning: 870 },
        { period: "Nov-21", earning: 820 },
        { period: "Nov-22", earning: 930 },
        { period: "Nov-23", earning: 945 },
        { period: "Nov-24", earning: 754 },
        { period: "Nov-25", earning: 805 },
        { period: "Nov-26", earning: 755 },
        { period: "Nov-27", earning: 678 },
        { period: "Nov-28", earning: 987 },
        { period: "Nov-29", earning: 1026 },
        { period: "Nov-30", earning: 885 },
        { period: "Dez-01", earning: 878 },
        { period: "Dez-02", earning: 922 },
        { period: "Dez-03", earning: 875 },
      ];

      const earningChart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: earningData.map((data) => data.period),
          datasets: [
            {
              label: "Earning",
              data: earningData.map((data) => data.earning),
              borderWidth: 2,
              borderColor: "white",
              parsing: {
                xAxisKey: "period",
                yAxisKey: "earning",
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
                    label += " : $" + context.parsed.y + ".00";
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
              radius: 0.5,
            },
            line: {
              tension: 0.5,
            },
          },
        },
      });

      return () => {
        earningChart.destroy();
      };
    }
  }, []);

  return (
    <canvas
      ref={chartRef}
      id="_dm-earningChart"
      style={{ height: "70px", margin: "0 -5px -5px" }}
    />
  );
};

export default EarningChart;
