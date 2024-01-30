import React, { useState, useEffect } from 'react';
import CreateProject from '../Modals/CreateProject';

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [notesLIst, setnotesLIst] = useState([]);
  const [selectedNotes, setselectedNotes] = useState('');
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  const saveProject = (taskObj) => {
    let tempList = [...notesLIst, taskObj];
    try {
      localStorage.setItem('notesData', JSON.stringify({ notesLIst: tempList, activeButtonIndex }));
      setnotesLIst(tempList);
    } catch (error) {
      setError('Error saving project data');
      console.error('Error saving project data:', error);
    } finally {
      setModal(false);
    }
  };

  const handleProjectClick = (index) => {
    setselectedNotes(notesLIst[index]);
    setActiveButtonIndex(index);
    try {
      localStorage.setItem('notesData', JSON.stringify({ notesLIst, activeButtonIndex: index }));
    } catch (error) {
      setError('Error updating project data');
      console.error('Error updating project data:', error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      let storedData = localStorage.getItem('notesData');
      if (storedData) {
        let { notesLIst, activeButtonIndex } = JSON.parse(storedData);
        setnotesLIst(notesLIst);
        setActiveButtonIndex(activeButtonIndex);
        setselectedNotes(notesLIst[activeButtonIndex]);
      }
    } catch (error) {
      setError('Error fetching project data');
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  }, []);
    return (
        <>
        <div className='sidebar'>
          <div className='task-board'>
            <div className='heading'>
              <p>My Notes</p>
            </div>
            <div className='task-container'>
              <div className='notesLIst'>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  notesLIst &&
                  notesLIst.map((object, index) => (
                    <p
                      key={index}
                      className={` ${activeButtonIndex === index ? 'active' : ''}`}
                      onClick={() => handleProjectClick(index)}
                    >
                      {object.Name}
                    </p>
                  ))
                )}
              </div>
            </div>
            <div className='projectBtn'>
              <p onClick={toggle}>+ New Note</p>
            </div>
          </div>
        </div>
        {/* <div className='content'>{selectedNotes && <TodoData project={selectedNotes} />}</div> */}
        <CreateProject toggle={toggle} modal={modal} save={saveProject} />
      </>
    );
};

export default Dashboard;