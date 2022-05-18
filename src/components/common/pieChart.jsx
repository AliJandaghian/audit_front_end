import React from "react";

import { Doughnut } from "react-chartjs-2";

const PieChart = ({ labels, label, data }) => {
  return (
    <div className="pie-chart">
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              label: label,
              backgroundColor: [
                "rgba(60,179,113,0.6)",
                "rgba(220, 20, 60, 0.6)",
              ],
              borderColor: ["rgba(60,179,113,0.6)", "rgba(220, 20, 60, 0.6)"],

              hoverBackgroundColor: [
                "rgba(60,179,113,0.8)",
                "rgba(220, 20, 60, 0.8)",
              ],
              data: data,
              borderWidth: 0.0,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },

            title: {
              display: true,
              text: label,
            },
            datalabels: {
              display: true,
              color: "rgba(20,20,20,0.8)",
              anchor: "end",
              align: "start",
              clip: true,

              formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map((data) => {
                  sum += data;
                });
                let percentage = ((value * 100) / sum).toFixed(0) + "% ";
                return percentage;
              },
            },
          },

          responsive: true,
        }}
      />
    </div>
  );
};

export default PieChart;
