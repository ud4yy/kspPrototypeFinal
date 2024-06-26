import React from 'react';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import severity_csv from '../csv/severity_counts.csv';
function Sev() {
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  
  useEffect(() => {
    Papa.parse(severity_csv, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: ((result) => {
        console.log("Parsed CSV Data");
        console.log(result);
        
        const labels = result.data.map(row => row.Year);
        const data = Object.keys(result.data[0]).filter(key => key !== 'Year').map(key => ({
          x: labels,
          y: result.data.map(row => row[key]),
          type: 'scatter',
          mode: 'lines+markers',
          name: key
        }));
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
        data={chartData}
        layout={{
          width:  600, 
          height: 450, 
          title: 'NUMBER OF ACCIDENTS BY SEVERITY OVER THE YEARS',
          xaxis: {
            title: 'Year'
          },
          yaxis: {
            title: 'Number of Accidents'
          }
        }}
      />
    </div>
  );
}

export default Sev;