import { Modal } from 'antd';
import React from 'react';
import { emissionReduced } from '../Utility Functions/Emissions';

// eslint-disable-next-line
export default function Modal_List(props: any) {
  return (
    <Modal
      title="Total Trees Planted"
      visible={props.VisibleList}
      onOk={() => {
        props.VisibleListFunc(false);
      }}
      onCancel={() => {
        props.VisibleListFunc(false);
      }}>
      {props.D.map(({ tree, name }: { tree: string; name: string }, i: number) => (
        <div key={i}>
          <li>
            Name: {name}, &nbsp; Type of Tree: {tree}, &nbsp; Emissions reduced: {emissionReduced(tree)}
          </li>
        </div>
      ))}
    </Modal>
  );
}
