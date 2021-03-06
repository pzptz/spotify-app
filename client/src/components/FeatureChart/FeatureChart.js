import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

const properties = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "speechiness",
  "valence",
];

class FeatureChart extends Component {
    static propTypes = {
      features: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
      type: PropTypes.string,
    };
  
    componentDidMount() {
      this.parseData();
    }
  
    componentDidUpdate() {
      this.parseData();
    }
  
    parseData = () => {
      const { features } = this.props;
      const dataset = this.createDataset(features);
      this.createChart(dataset);
    };
  
    avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  
    createDataset(features) {
      const dataset = {};
      properties.forEach(prop => {
        dataset[prop] = features.length
          ? this.avg(features.map(feat => feat && feat[prop]))
          : features[prop];
      });
      return dataset;
    }
  
    createChart(dataset) {
      const { type } = this.props;
      const ctx = document.getElementById('chart');
      const labels = Object.keys(dataset);
      const data = Object.values(dataset);
  
      new Chart(ctx, {
        type: type || 'bar',
        data: {
          labels,
          datasets: [
            {
              label: '',
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 159, 64, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(104, 132, 245, 0.3)',
                'rgba(153, 102, 255, 0.3)',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(104, 132, 245, 1)',
                'rgba(153, 102, 255, 1)',
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
            text: `Audio Features`,
            fontSize: 18,
            fontFamily: `Circular Std, system, -apple-system, BlinkMacSystemFont, sans-serif`,
            fontColor: '#ffffff',
            padding: 30,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
                ticks: {
                  fontFamily: `Circular Std, system, -apple-system, BlinkMacSystemFont, sans-serif`,
                  fontSize: 12,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
                ticks: {
                  beginAtZero: true,
                  fontFamily: `Circular Std, system, -apple-system, BlinkMacSystemFont, sans-serif`,
                  fontSize: 12,
                },
              },
            ],
          },
        },
      });
    }
  
    render() {
      return (
        <div className="featureChart__container">
          <canvas id="chart" width="800" height="800" />
        </div>
      );
    }
  }
  
  export default FeatureChart;