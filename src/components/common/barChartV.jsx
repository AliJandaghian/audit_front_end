import React from "react";

import { Bar } from "react-chartjs-2";

const BarChartH = ({ labels, label, data }) => {
  return (
    <div className="bar-chart">
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: label,
              backgroundColor: ["rgba(220, 20, 60, 0.6)"],
              borderColor: ["rgba(220, 20, 60, 0.6)"],

              hoverBackgroundColor: ["rgba(220, 20, 60, 0.8)"],
              data: data,
              borderWidth: 0.0,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          indexAxis: "y",
          scales: {
            xAxes: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
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

export default BarChartH;
