import React from 'react';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import severity_csv from '../csv/output.csv';

function SeverityLine({ district }) {
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
        
        // Filter data based on the provided district name
        const filteredData = result.data.filter(row => row.DISTRICTNAME === district);

        if (filteredData.length > 0) {
          const years = Array.from(new Set(filteredData.map(row => row.Year))); // Get unique years
          const severityTypes = Array.from(new Set(filteredData.map(row => row.Severity))); // Get unique severity types

          const data = severityTypes.map(severity => {
            const countsPerYear = years.map(year =>
              filteredData.reduce((acc, row) => {
                if (row.Year === year && row.Severity === severity) {
                  return acc + 1;
                }
                return acc;
              }, 0)
            );
            return {
              x: years,
              y: countsPerYear,
              type: 'scatter',
              mode: 'lines+markers',
              name: severity
            };
          });

          console.log(data);
          setLabels(years);
          setChartData(data);
        } else {
          console.log(`No data found for district: ${district}`);
        }
      })
    })
  }, [district]);
  
  return (
    <div>
      <Plot 
        data={chartData}
        layout={{
          width:  1200, 
          height: 450, 
          title: `SEVERITY OF ACCIDENTS IN ${district.toUpperCase()} OVER THE YEARS`,
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

export default SeverityLine;