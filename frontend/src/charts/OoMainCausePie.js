import OscarData from '../csv/output.csv';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import React from 'react';
import Plot from 'react-plotly.js';

function OoMainCausePie() {
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
          if (row.Main_Cause !== null && row.Main_Cause !== "undefined") {
            acc[row.Main_Cause] = (acc[row.Main_Cause] || 0) + 1;
          }
          return acc;
          //Year 'Accident_Classification'
        }, {});
        const labels = Object.keys(counts).slice(0, -1);
        const data = Object.values(counts).slice(0, -1);
        console.log(labels);
        console.log(data);
        setLabels(labels);
        setChartData(data);
      })
    })
  }, [])
  
  return(
    <div>
       <Plot 
    data={[{
        values: chartData,
        labels: labels,
        type: 'pie'
    }]}
    layout={{
        width: 600, 
        height: 450, 
        title: 'OVERALL MAIN CAUSE OF ACCIDENTS',
        legend: {
            font: {
                size: 10
            },
        },
        transition: {
            duration: 500,
            easing: 'poly-in-out'
        }
    }}
/>

    </div>
       );

  }

export default OoMainCausePie;