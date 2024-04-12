import React, { useState } from "react";
import "./Analysis.css"; // Import the CSS file
import RoadAccidentPlot from "../charts/typesRoad.js";
import OoCountPlot from "../charts/OoCountPlot.js";
import LineChart from "../charts/linechart.js";
import OoMainCausePie from "../charts/OoMainCausePie.js";
import Sev from "../charts/Sev.js";
import AccLocPie from "../charts/AccLocPie.js";
import SexDistributionPiePlot from "../charts/vicSex.js"
import SeverityLine from "../charts/SeverityLine.js";
import MainCausePie from "../charts/MainCausePie.js";
import AccOverYearsDis from "../charts/AccOverYearsDis.js";
import AgeDistributionPlot from "../charts/AgeHist.js";
function Analysis() {
  // Define an array of districts
  const districts = ['Bagalkot', 'Ballari', 'Belagavi City', 'Belagavi Dist',
  'Bengaluru City', 'Bengaluru Dist', 'Bidar', 'Chamarajanagar',
  'Chickballapura', 'Chikkamagaluru', 'Chitradurga',
  'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan',
  'Haveri', 'Hubballi Dharwad City', 'K.G.F', 'Kalaburagi',
  'Kalaburagi City', 'Karnataka Railways', 'Kodagu', 'Kolar',
  'Koppal', 'Mandya', 'Mangaluru City', 'Mysuru City', 'Mysuru Dist',
  'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi',
  'Uttara Kannada', 'Vijayanagara', 'Vijayapur', 'Yadgir'];

  // State to hold the selected district
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [prevSelectedDistrict, setPrevSelectedDistrict] = useState("");
  const [showBoxes, setShowBoxes] = useState(false);

  // Function to handle district selection and logging
  const handleDistrictChange = (event) => {
    const selectedDistrictValue = event.target.value;
    setSelectedDistrict(selectedDistrictValue);
    console.log("Selected District:", selectedDistrictValue);
  };

  // Function to toggle the visibility of boxes
  const toggleBoxesVisibility = () => {
    if (selectedDistrict !== "") {
      setShowBoxes(true);
      setPrevSelectedDistrict(selectedDistrict);
    } else {
      setShowBoxes(false);
    }
  };

  return (
    <div>
      <div className="overall">
        <div className="overall-heading">OVERALL ANALYSIS</div>
        <div className="analysis-container">
          <div className="row">
            <div className="box box-100">
              <OoCountPlot />
            </div>
          </div>
          <div className="row">
            <div className="box box-50">
              <LineChart />
            </div>
            <div className="box box-50">
              <OoMainCausePie />
            </div>
          </div>
          <div className="row">
            <div className="box box-50">
              <AccLocPie />
            </div>
            <div className="box box-50">
              <Sev />
            </div>
          </div>
          <div className="row">
            <div className="box box-50">
            <AgeDistributionPlot/>
             </div>
            <div className="box box-50">
           <SexDistributionPiePlot/>  
            </div> 
          </div>
          <div className="row">
            <div className="box box-100">
            <RoadAccidentPlot/>
            </div>
          </div>
        </div>

        <div className="district">
          <div className="district-heading">DISTRICT ANALYSIS</div>

          <div>
            <select value={selectedDistrict} onChange={handleDistrictChange}>
              <option value="">Select a district</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <button onClick={toggleBoxesVisibility}>Submit</button>
          </div>

          {/* Conditionally render boxes based on toggleBoxesVisibility */}
          {showBoxes && (
            <div className="analysis-container">
              <div className="row">
                <div className="box box-100"><SeverityLine district={prevSelectedDistrict} /></div>
              </div>
              <div className="row">
                <div className="box box-50"><MainCausePie district={prevSelectedDistrict} /></div>
                <div className="box box-50"><AccOverYearsDis district={prevSelectedDistrict} /></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
