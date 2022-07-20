import React, { useEffect } from 'react';
import '../../App/Styles/_Content.scss';
import { useReducer, useRef } from 'react';
import { useState } from 'react';


function Content(props) {
    const rollNoRef = useRef(null);
    const nameRef = useRef(null);
    const ageRef = useRef(null);
    const [addForm, setAddForm] = useState(false)

    function removeDataItem(dataItem, action) {
        switch (action.type) {
            case "remove":
                {
                    // eslint-disable-next-line
                    let index = dataItem.findIndex(x => x.rollNo == action.payload)
                    return index !== -1 ? dataItem.splice(index, 1) : dataItem;
                }
            case "add":
                {
                    let index = dataItem.findIndex(x => x.rollNo === rollNoRef.current.value);
                    if (index === -1) {
                        let data = dataItem.concat({
                            rollNo: rollNoRef.current.value,
                            name: nameRef.current.value, age: ageRef.current.value
                        })
                        setAddForm(false);
                        return data;
                    }
                    else return dataItem;
                }
            default:
                throw new Error();
        }
    }
    const [data, dispatch] = useReducer(removeDataItem, require("../MockData/data.json").data);

    useEffect(() => {
        let subscription = true;
        if (subscription) {
            if (addForm) {
                rollNoRef.current.value = null;
                nameRef.current.value = null;
                ageRef.current.value = null;
            }
        }
        return () => (subscription = false);
        // eslint-disable-next-line
    }, [data]);

    const removeItem = (rollNo) => {
        dispatch({ type: "remove", payload: rollNo })
    }

    const styleBorder = (comp) => {
        comp.current.style.border = "none";
        comp.current.style.borderBottom = "1px solid black";
    }

    const addItem = () => {
        if (addForm) {
            styleBorder(rollNoRef)
            styleBorder(nameRef)
            styleBorder(ageRef)
            if (rollNoRef.current.value && nameRef.current.value && ageRef.current.value)
                dispatch({ type: "add" })
            else {
                if (!rollNoRef.current.value) rollNoRef.current.style.borderBottom = "2px solid red";
                if (!nameRef.current.value) nameRef.current.style.borderBottom = "2px solid red";
                if (!ageRef.current.value) ageRef.current.style.borderBottom = "2px solid red";
            }
        }
        else
            setAddForm(true)
    }

    const tableItems = data.map((item) =>
        <tr key={item.rollNo}>
            <td className='odd-element'>{item.rollNo}</td>
            <td className='even-element'>{item.name}</td>
            <td className='odd-element'>{item.age}</td>
            <td className='even-element'><input type="button" value="Remove" onClick={() => removeItem(item.rollNo)} /></td>
        </tr>
    );


    return (
        <div className='Content'>
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
            {addForm && <div className='add-container'>
                <input ref={rollNoRef} className="add-input" type="text" placeholder='RollNo' />
                <input ref={nameRef} className="add-input" type="text" placeholder='Name' />
                <input ref={ageRef} className="add-input" type="text" placeholder='Age' />
            </div>}
            <input type="button" className="add-button" value="Add" onClick={addItem} />
        </div>
    )
}

export default Content;