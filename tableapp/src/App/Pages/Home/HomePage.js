import React from "react";
import Header from "../../Components/Header";
import Content from "../../Components/Content";
import Footer from "../../Components/Footer";
import '../../../App/Styles/_Home.scss';

function HomePage(props) {
  return (
    <div>
      <div className="header-container"><Header /></div>
      <div className="content-container"><Content /></div>
      <div className="footer-container"><Footer /></div>
    </div>
  );
}

export default HomePage;
