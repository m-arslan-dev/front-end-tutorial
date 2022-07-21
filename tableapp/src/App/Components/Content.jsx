import React from 'react'
import { useRef, useContext, useState } from "react";
import "../../App.css";
import {contextData} from "../Context/ContextApi";
import { Button, Modal } from 'antd';

function Content() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const {state, dispatch } = useContext(contextData);

  const rolln = useRef();
  const namee = useRef();
  const dept = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
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
<div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  </div>
  );
}

export default Content