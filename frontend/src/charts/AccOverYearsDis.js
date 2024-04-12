import React from 'react';
import trends from '../csv/output.csv';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';

function AccOverYearsDis({ district }) {
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
        
        // Filter data based on the provided district name
        const filteredData = result.data.filter(row => row.DISTRICTNAME === district);

        if (filteredData.length > 0) {
          // Group the filtered data by year and count the number of accidents for each year
          const countsPerYear = filteredData.reduce((acc, row) => {
            const year = row.Year;
            acc[year] = (acc[year] || 0) + 1;
            return acc;
          }, {});

          const labels = Object.keys(countsPerYear);
          const data = Object.values(countsPerYear);
          
          console.log(labels);
          console.log(data);
          setLabels(labels);
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
        data={[{
          x: labels, 
          y: chartData,
          type: 'scatter',  // Change to 'scatter' for line plot
          mode: 'lines+markers',  // Add markers to the line plot
          marker: {color: '#553c9a'}
        }]}
        layout={{
          width: 650, 
          height: 450, 
          title: `ACCIDENTS IN ${district.toUpperCase()} OVER THE YEARS`,
          transition: {
            duration: 500,
            easing: 'poly-in-out'
          }
        }}
      />
    </div>
  );
}

export default AccOverYearsDis;