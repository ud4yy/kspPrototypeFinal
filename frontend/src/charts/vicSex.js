import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';
import victims_sex from '../csv/victim_sex.csv';

function SexDistributionPiePlot() {
  const [sexCounts, setSexCounts] = useState([]);

  useEffect(() => {
    Papa.parse(victims_sex, {
      download: true,
      header: true,
      complete: (result) => {
        const counts = result.data;
        setSexCounts(counts);
      }
    });
  }, []);

  return (
    <div>
      <Plot
        data={[
          {
            values: sexCounts.map(item => item.count),
            // labels: sexCounts.map(item => item.sex),
            labels : ["male","female"],
            type: 'pie'
          }
        ]}
        layout={{
            width: 600, 
            height: 450, 
            title: 'DISTRIBUTION OF VICTIMS BY SEX',
            transition: {
              duration: 500,
              easing: 'poly-in-out'
            }
          }}
      />
    </div>
  );
}

export default SexDistributionPiePlot;
