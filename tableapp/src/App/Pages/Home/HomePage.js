import React, { useReducer } from "react";
import Header from "../../Components/Header";
import Content from "../../Components/Content";
import Footer from "../../Components/Footer";
import "../../../App/Styles/_Home.scss";
import { contextData } from "../../Context/ContextApi";
import mockData from "../../MockData/data.json";
import {removeDataItem} from "../../JavaScript/Utility";

function HomePage(props) {
  const [data, setData] = useReducer(removeDataItem, mockData.data);
  
  return (
    <div>
      <Header />
      <contextData.Provider value={{ data, setData }}>
        <div className="content-container">
          <Content />
        </div>
      </contextData.Provider>
      <Footer />
      {/* <div className="footer-container">
        
      </div> */}
    </div>
  );
}

export default HomePage;
