import React, { useState, useReducer } from "react";
import Header from "../../Components/Header";
import Content from "../../Components/Content";
import Footer from "../../Components/Footer";
import "../../../App.css"
import { contextData } from "../../Context/ContextApi";
import mockData from "../../MockData/data.json";

const reducer = (state, action) => {
  console.log(state)
  if (action.type === "remove") {
    return state.filter((_, i) => i != action.i); 
  }
  if (action.type === "add") {
    return[
      ...state,
      {
        rollno: action.rollno,
        name: action.name,
        department: action.department
      }
    ];
  }
      return state;
  }

function HomePage(props) {
  const [state, dispatch] = useReducer(reducer, mockData.students);
  //const [data,setData] = useState(mockData);
  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <contextData.Provider value={{state,dispatch}} >
        <div className="content-container">
          <Content />
        </div>
      </contextData.Provider>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
