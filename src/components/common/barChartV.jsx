import React from "react";

import { Bar } from "react-chartjs-2";

const BarChartH = ({
  labels,
  dataLabel,
  title,
  data,
  render,
  color,
  hover,
  className,
}) => {
  return (
    <div className={className}>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: dataLabel,
              backgroundColor: [color],
              hoverBackgroundColor: [hover],
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
              text: title,
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
                if (render === "inTotal") {
                  let percentage = ((value * 100) / sum).toFixed(0) + "% ";
                  return percentage;
                }
                let percentage = value && value.toFixed(1) + "% ";
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
