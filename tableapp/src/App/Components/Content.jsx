import React from 'react'
import { useReducer, useRef  } from "react";
import Students  from "../MockData/data.json";
import "../../App.css";

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

function Content() {

  const rolln = useRef();
  const namee = useRef();
  const dept = useRef();

   const [state, dispatch] = useReducer(reducer, Students.students);

  //  const [inputs, setInputs] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    //alert(namee.current.value);
    if (rolln.current.value != '' && namee.current.value != '' && dept.current.value != ''){
    dispatch({
      type: 'add',
      rollno: rolln.current.value,
      name: namee.current.value,
      department: dept.current.value
    });
    rolln.current.value='';
    namee.current.value='';
    dept.current.value='';
  }
}

  return (
    <div>
      <div>
      <table className='center'>
          <th>Roll No.</th>
          <th>Name</th>
          <th>Department</th>
      {state.map((item, i) => (
          <tr key={i}>
              <td>{item.rollno}</td>
              <td>{item.name }</td>
              <td>{item.department }</td>
              <button className='Del-btn' onClick={() => dispatch({ type: 'remove', i })}> REMOVE </button>
          </tr>
          ))}
        </table>
      </div>
      <div className='margin-div'>
      <label>Enter your Roll Number
      <input 
        ref={rolln}
        type="text" 
      />
      </label>
      <label>Enter your Name
      <input 
        ref={namee}
        type="text" 
      />
      </label>
        <label>Enter your Department
        <input 
          ref={dept}
          type="text" 
        />
        </label>
        </div>
        <div className='margin-div'>
    <button className='Add-btn' onClick = {handleSubmit}>
  ADD
</button>
</div>
    </div>
  );
}

export default Content