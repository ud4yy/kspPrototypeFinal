
import React from 'react';
import trends from '../csv/trends.csv';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';

function LineChart() {
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  
  useEffect(() => {
    Papa.parse(trends, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: ((result) => {
        console.log("this is Trends");
        console.log(result);
        
        const labels = result.data.map(row => row.Year);
        const data = result.data.map(row => row.Accident_Classification);
        console.log(labels);
        console.log(data);
        setLabels(labels);
        setChartData(data);
      })
    })
  }, [])
  
  return (
    <div>
      <Plot 
        data={[{
          x: labels, 
          y: chartData,
          type: 'scatter',  // Change to 'scatter' for line plot
          mode: 'lines+markers',  // Add markers to the line plot
          marker: {color: '#E3867D'}
        }]}
        layout={{
          width: 600, 
          height: 450, 
          title: 'Accidents Over Years',
          transition: {
            duration: 500,
            easing: 'poly-in-out'
          }
        }}
      />
    </div>
  );
}

export default LineChart;
