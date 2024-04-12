import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import victims_age from '../csv/victims_age.csv';

function AgeDistributionPlot() {
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    Papa.parse(victims_age, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const ages = result.data.map(row => row.age).filter(age => !isNaN(age));
        setAgeData(ages);
      }
    });
  }, []);

  return (
    <div>
      <Plot
        data={[
          {
            x: ageData,
            type: 'histogram',
            marker: { color: 'skyblue' },
            xbins: {  // Specify the number of bins
              size: 1  // Adjust the size of each bin as needed
            }
          }
        ]}
        layout={{
          width: 600,
          height: 450,
          title: 'Distribution of Ages of Accident Victims',
          xaxis: { title: 'Age' },
          yaxis: { title: 'Frequency' }
        }}
      />
    </div>
  );
}

export default AgeDistributionPlot;
