import React from 'react';
import '../../App/Styles/_Content.scss';
// eslint-disable-next-line
import { useState, useContext, useEffect, useRef } from 'react';
import { contextData } from '../Context/ContextApi';
// eslint-disable-next-line
import { Button, Modal, Typography, Box, TextField, Input } from '@mui/material';

function Content(props) {
    const { data, setData } = useContext(contextData)
    const [size, setSize] = useState(data.length);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const rollNoRef = useRef(null);
    const nameRef = useRef(null);
    const ageRef = useRef(null);

    const addElement = () => {
        if (rollNoRef.current.value && nameRef.current.value && ageRef.current.value) {
            setData({ type: "add", payload: { rollNo: rollNoRef.current.value, name: nameRef.current.value, age: ageRef.current.value } });
            // eslint-disable-next-line
            if (size == data.length) {
                handleClose();
                setSize(data.length);
            }
            else console.log("Failed to add");
        }
    }

    // useEffect(() => {
    //     let subscription = true;
    //     if (subscription) {
            
    //     }
    //     return () => (subscription = false);
    //     // eslint-disable-next-line
    // }, []);

    const tableItems = data.map((item) =>
        <tr key={item.rollNo}>
            <td className='odd-element'>{item.rollNo}</td>
            <td className='even-element'>{item.name}</td>
            <td className='odd-element'>{item.age}</td>

            <td className='even-element'>
                <Button className="button remove-button" color="error" variant="contained" onClick={() => setData({ type: "remove", payload: item.rollNo })}> Remove </Button>
            </td>
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
            <div className="add-button">
                <Button className="button" color="primary" variant="contained" onClick={handleOpen}> Add New </Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box className="modal-content" component="form" autoComplete='off'>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new element
                    </Typography>

                    <TextField
                        required
                        inputRef={rollNoRef}
                        margin='dense'
                        id="outlined-required"
                        label="RollNo"
                        variant='standard'
                        className='modal-content-input'
                    />
                    <br />
                    <TextField
                        required
                        inputRef={nameRef}
                        margin='dense'
                        id="outlined-required"
                        label="Name"
                        variant='standard'
                        className='modal-content-input'
                    />
                    <br />
                    <TextField
                        required
                        inputRef={ageRef}
                        margin='dense'
                        id="outlined-required"
                        label="Age"
                        variant='standard'
                        className='modal-content-input'
                    />

                    <br />
                    <div className="add-button">
                        <Button className="button" color="primary" variant="contained" type='submit' onClick={addElement}> Add</Button>
                    </div>

                </Box>
            </Modal>

        </div>
    )
}

export default Content;