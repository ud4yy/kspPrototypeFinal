import OscarData from '../csv/output.csv';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import React from 'react';
import Plot from 'react-plotly.js';

function OoCountPlot() {
  //const [chartOptions, setChartOptions] = useState({})
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    Papa.parse(OscarData, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: ((result) => {
        console.log(result);
        const counts = result.data.reduce((acc, row) => {
          if (row.DISTRICTNAME !== null && row.DISTRICTNAME !== "null") {
            acc[row.DISTRICTNAME] = (acc[row.DISTRICTNAME] || 0) + 1;
          }
          return acc;
          //Year 'Accident_Classification'
        }, {});
        const labels = Object.keys(counts);
        const data = Object.values(counts);
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
          type: 'bar',
          marker: {color: '#E3867D'}
        }]}
        layout={{
          width: 1200, 
          height: 450, 
          title: 'OVERALL ACCIDENT DISTRIBUTION BY DISTRICT',
          transition: {
            duration: 500,
            easing: 'poly-in-out'
          }
        }}
      />
      </div>

    );
}

export default OoCountPlot