import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import roadwise_count from '../csv/roadwise_count.csv';

function RoadAccidentPlot() {
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    Papa.parse(roadwise_count, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const counts = result.data.reduce((acc, row) => {
          if (row.Road_Type !== null && row.Road_Type !== "null" && row.Road_Type !== undefined && row.Road_Type !== "Mixed"  && row.Road_Type !== "Not Applicable"  && row.Road_Type !== "Feeder Road") {
            acc[row.Road_Type] = (acc[row.Road_Type] || 0) + 1;
          }
          return acc;
        }, {});
        const labels = Object.keys(counts);
        const data = Object.values(counts);
        setLabels(labels);
        setChartData(data);
      }
    });
  }, []);

  return (
    <div>
      <Plot 
        data={[{
          x: labels, 
          y: chartData,
          type: 'bar',
          marker: {color: '#E3867D'}
        }]}
        layout={{
          width: 1200, 
          height: 450, 
          title: 'Top 10 Roads Causing Accidents (over all years)',
          xaxis: { title: 'Road Type' },
          yaxis: { title: 'Number of Accidents' },
          transition: {
            duration: 500,
            easing: 'poly-in-out'
          }
        }}
      />
    </div>
  );
}

export default RoadAccidentPlot;
