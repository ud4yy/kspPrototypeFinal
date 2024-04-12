import OscarData from '../csv/output.csv';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import React from 'react';
import Plot from 'react-plotly.js';

function MainCausePie({ district }) {
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Papa.parse(OscarData, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: (result) => {
        const filteredData = result.data.filter(row => row.DISTRICTNAME === district); // Filter data by district
        const counts = filteredData.reduce((acc, row) => {
          if (row.Main_Cause && row.Main_Cause !== "undefined") {
            acc[row.Main_Cause] = (acc[row.Main_Cause] || 0) + 1;
          }
          return acc;
        }, {});
        const labels = Object.keys(counts);
        const data = Object.values(counts);
        console.log(labels);
        console.log(data);
        setLabels(labels);
        setChartData(data);
      }
    });
  }, [district]);
  
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
                        title: `OVERALL MAIN CAUSE OF ACCIDENTS IN ${district.toUpperCase()}`,
                        transition: {
                          duration: 500,
                          easing: 'poly-in-out'
                        }
                      }}
        />
    </div>
       );

  }

export default MainCausePie;