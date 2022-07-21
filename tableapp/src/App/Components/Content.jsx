import React, { useEffect } from 'react';
import '../../App/Styles/_Content.scss';
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { contextData } from '../Context/ContextApi';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';



function Content(props) {
    const { data, setData } = useContext(contextData)
    const [key, setKey] = useState(0)

    useEffect(() => {
        let subscription = true;
        if (subscription) {
        }
        return () => (subscription = false);
        // eslint-disable-next-line
    }, [data]);

    const tableItems = data.map((item) =>
        <tr key={item.rollNo}>
            <td className='odd-element'>{item.rollNo}</td>
            <td className='even-element'>{item.name}</td>
            <td className='odd-element'>{item.age}</td>
            <td className='even-element'><input className='remove-button' type="button" value="Remove" onClick={() => setData({ type: "remove", payload: item.rollNo })} /></td>
        </tr>
    );

    return (
        <div className='Content'>
            <button onClick={() => {
                setData({ type: "add", payload: { name: 'Ali', rollNo: key.toString(), age: '20' } });
                setKey(key + 1);
            }}>Update</button>
            <table cellSpacing="0">
                <thead>
                    <tr>
                        <th>RollNo.</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </table>
            <Button type="primary" icon={<DownloadOutlined />} size={48}>
                Download
            </Button>

        </div>
    )
}

export default Content;