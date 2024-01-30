import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateProject = ({modal, toggle, save}) => {
    const [notesName, setnotesName] = useState('');

    const handleChange = (e) => {
       const {name, value} = e.target;

       if(name === 'notesName'){
            setnotesName(value);
       }
       
    }
    const handleSave = () =>{
        let taskObj = {};
        taskObj['Name'] = notesName;
        save(taskObj);
    }
    return (
        <>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Project</ModalHeader>
                <ModalBody>
                    <form>
                        <div className='form-group name'>
                            <label>Note Name</label>
                            <input type='text' className='form-control' value={notesName} onChange = {handleChange} name='notesName' required></input>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={handleSave}>
                    Create Note
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        
        </>
    );
};

export default CreateProject;