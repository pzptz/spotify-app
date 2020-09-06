import React, { Component } from "react";
import PropTypes, { object } from "prop-types";
import Chart from "chart.js";

const properties = [
  "danceability",
  "energy",
  "key",
  "speechiness",
  "acousticness",
  "instrumentalness",
  "liveness",
  "valence",
  "tempo",
];

class Chart extends Component {
  static propTypes = {
    features: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
      .isRequired,
    type: PropTypes.string,
  };

  parseData = () => {
    const { features } = this.props;
    const dataset = this.createDataset(features);
    this.createChart(dataset);
  };

  createDataset = (features) => {
    const dataset = {};
    properties.forEach((prop) => {
      dataset[prop] = features.length
        ? this.avg(features.map((feat) => feat && feat[prop]))
        : features[prop];
    });
    return dataset;
  };

  avg = (arr) => {
    arr.reduce((a, b) => a + b, 0) / arr.length;
  };

  createChart = (dataset) => {
    const { type } = this.props;
    const ctx = document.getElementById("chart");
    const labels = Object.key(dataset);
    const data = Object.values(dataset);
    new Chart(ctx, {
      type: type || "bar",
      data: {
        labels,
        datasets: [
          {
            label: "",
            data,
            backgroundColor: [
              "rgba(255,0,0,0.5)",
              "rgba(0,0,255,0.5)",
              "rgba(255,165,0,0.5)",
              "rgba(60,179,113,0.5)",
              "rgba(255,255,0,0.5)",
              "rgba(106,90,205,0.5)",
              "rgba(238,130,238,0.5)",
            ],
            borderColor: [
              "rgba(255,0,0,1)",
              "rgba(0,0,255,1)",
              "rgba(255,165,0,1)",
              "rgba(60,179,113,1)",
              "rgba(255,255,0,1)",
              "rgba(106,90,205,1)",
              "rgba(238,130,238,1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        title: {
          display: true,
          text: "Audio Features",
          fontSize: 20,
          fontFamily: "sans-serif",
          fontColor: "#000000",
          padding: 20,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(120,120,120,0.5)",
              },
              ticks: {
                fontFamily: "sans-serif",
                fontSize: 12,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(120,120,120,0.5)",
              },
              ticks: {
                beginAtZero: true,
                fontFamily: "sans-serif",
                fontSize: 12,
              },
            },
          ],
        },
      },
    });
  };

  render() {
    return (
      <div>
        <canvas id="chart" width="500" height="500" />
      </div>
    );
  }
}

export default Chart;
