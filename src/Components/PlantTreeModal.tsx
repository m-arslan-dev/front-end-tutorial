import { Button, Modal } from 'antd';
import React from 'react';
import { handleSubmitPlant } from '../Utility Functions/Modal_Plant';

// eslint-disable-next-line
export default function PlantTreeModal(props: any) {
  return (
    <>
      <Modal
        title="Plant a Tree"
        visible={props.Visible}
        onOk={() => handleSubmitPlant(props)}
        onCancel={() => {
          props.VisibleFunc(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              props.VisibleFunc(false);
            }}>
            Cancel
          </Button>,
          <Button key="link" type="primary" onClick={() => handleSubmitPlant(props)}>
            Plant a Tree
          </Button>,
        ]}>
        <div className="grid-container">
          <div className="grid-item">
            <label className="label-margin">Select Tree Type*</label>
          </div>
          <div className="grid-item">
            <select name="tree" id="tree" ref={props.TREE}>
              <option value="White Oak">White Oak</option>
              <option value="Red Maple">Red Maple</option>
              <option value="Hemlock">Hemlock</option>
            </select>
          </div>

          <br />
          <div className="grid-container">
            <div className="grid-item">
              <label className="label-margin">Name*</label>
            </div>
            <div className="grid-item">
              <input ref={props.NAME} id="name" type="text" />
            </div>
          </div>
          <br />
          <div className="grid-container">
            <div className="grid-item">
              <label className="label-margin">Note</label>
            </div>
            <div className="grid-item">
              <input ref={props.NOTE} id="note" type="text" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
