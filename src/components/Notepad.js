import React, { useState, useEffect } from 'react';
import './Notepad.css';
import Notes from './Notes';

const Notepad = ({ notes }) => {
  const [notesTextData, setNotesTextData] = useState(() => {
    const savedData = localStorage.getItem('notesTextData');
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    localStorage.setItem('notesTextData', JSON.stringify(notesTextData));
  }, [notesTextData]);

  const saveNotes = (data, lastEdited, wordCount) => {
    if (notes.Name) {
      const notesNameKey = notes.Name;
      const updatedData = {
        ...notesTextData,
        [notesNameKey]: {
          data,
          lastEdited,
          wordCount
        },
      };
      setNotesTextData(updatedData);
    }
  };
  

  return (
    <>
      <div className='tododata'>
        <div className='data-content'>
          <Notes saveNotes={(data, lastEdited, wordCount) => saveNotes(data, lastEdited, wordCount)} notes={notes} />
        </div>
      </div>
    </>
  );
};

export default Notepad;
