import React from 'react'
import { useRef, useContext, useState } from "react";
import "../../App.css";
import 'antd/dist/antd.css';
import {contextData} from "../Context/ContextApi";
import { Button, Modal, Space, Table } from 'antd';

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
  setIsModalVisible(false);
}
}

const columns = [
  {
    title: 'Roll No.',
    dataIndex: 'rollno',
    key: 'rollno',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    render: (text) => <a>{text}</a>,
  }
];

return (
  <div>
    <Table columns={columns} dataSource={state}></Table>
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
    <Button type="primary" onClick={showModal}>
      Add Student
    </Button>
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleSubmit} onCancel={handleCancel}>
      <div className='grid-container'>
        <div className='grid-item'>
    <label className='label-margin'>Enter your Roll Number</label>
    <input 
      ref={rolln}
      type="text" 
    />
    </div>

    <br/>
    <div className='grid-container'>
    <label className='label-margin'>Enter your Name</label>
    <input 
      ref={namee}
      type="text" 
    />
    </div>
    <br/>
    <div className='grid-container'>
    <label className='label-margin'>Enter your Department</label>
      <input 
        ref={dept}
        type="text" 
      />
      </div>
      </div>
    </Modal>
  </div>
</div>
);
}

export default Content