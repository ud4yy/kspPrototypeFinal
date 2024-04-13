// import React from "react";
// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import logoLeft from "../images/policeNew.png";
// import logoRight from "../images/h2s.png";

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo-left">
//         <a href="https://ksp.karnataka.gov.in/english" target="__blank">
//           <img
//             src={logoLeft}
//             alt="Left Logo"
//             className="navbar-logo-left-img"
//           />
//         </a>
//       </div>
//       <ul className="navbar-list">
//         <li className="navbar-item">
//           <Link to="/" className="navbar-link">
//             Home
//           </Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/analysis" className="navbar-link">
//             Analysis
//           </Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/about" className="navbar-link">
//             About Us
//           </Link>
//         </li>
//       </ul>
//       <div className="navbar-logo-right">
//         <a href="https://hack2skill.com/" target="__blank">
//           <img
//             src={logoRight}
//             alt="Right Logo"
//             className="navbar-logo-right-img"
//           />
//         </a>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;









































import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logoLeft from "../images/policeNew.png";
import logoRight1 from "../images/DrAlokMohan.png";
import logoRight2 from "../images/h2s.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo-left">
          <a href="https://ksp.karnataka.gov.in/english" target="__blank">
            <img
              src={logoLeft}
              alt="Left Logo"
              className="navbar-logo-left-img"
            />
          </a>
        </div>
      </div>
      <div className="navbar-middle">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/analysis" className="navbar-link">
              Analysis
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/aware" className="navbar-link">
              Awareness
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
      <p>Dr. Alok Mohan</p>
        <div className="navbar-logo-right">
          
            <img
              src={logoRight1}
              alt="Right Logo 1"
              className="navbar-logo-right-img1"
            />
        </div>
        <div className="navbar-logo-right">
          <a href="https://hack2skill.com/" target="__blank">
            <img
              src={logoRight2}
              alt="Right Logo 2"
              className="navbar-logo-right-img2"
            />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
