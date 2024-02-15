import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Notes = ({ saveNotes, notes }) => {
  const [data, setData] = useState('');
  const [lastEdited, setLastEdited] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem('notesTextData');
    if (savedData && notes.Name) {
      const savedNotes = JSON.parse(savedData);
      if (savedNotes[notes.Name]) {
        setData(savedNotes[notes.Name].data);
        setLastEdited(savedNotes[notes.Name].lastEdited);
        countWords(savedNotes[notes.Name].data);
      } else {
        setData('');
      }
    } else {
      setData('');
    }
  }, [notes]);

  const handleChange = (content, delta, source, editor) => {
    const newData = editor.getHTML();
    setData(newData);
    const currentDate = new Date();
    const newLastEdited = currentDate.toLocaleString();
    setLastEdited(newLastEdited);
    countWords(newData);
    saveNotes(newData, newLastEdited, wordCount);
  };

  const countWords = (content) => {
    if (typeof content === 'string') {
      const cleanContent = content.replace(/<[^>]+>/g, '').trim();
      const words = cleanContent.split(/\s+/);
      const filteredWords = words.filter(word => word !== '');
      setWordCount(filteredWords.length);
    } else {
      console.error("Invalid content provided to countWords function:", content);
      if (typeof content === 'number') {
        setWordCount(0);
      }
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean'],
      [{ 'color': ['#F00', '#0F0', '#00F', '#000', '#FFF', 'color-picker'] }],
      [{ 'background': ['#000', '#F00', '#0F0', '#00F', '#FFF'] }],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
    ],
  };

  const formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background'
  ];

  return (
    <>
      <div className='notepad-container'>
        <div className='title'>
          <p>{notes.Name}</p>
        </div>
        <form>
          <div className='notes-data'>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={data ? data : ''}
              onChange={handleChange}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                color: '#FFF',
                border: 'none',
                borderRadius: '5px',
                boxShadow: '6px 6px 8px rgba(21, 21, 21, 0.2)',
                minHeight: '500px',
                maxHeight: '500px',
                backgroundImage: 'url(../images/back1.jpg)',
                backgroundSize: 'cover'
              }}
              className='quill data'
              preserveWhitespace
            />
          </div>
        </form>
      </div>
      <div className='info'>
        <center><b>Info :</b></center>
        <p>Created By : {notes.Name}</p>
        <p>Created On : {notes.Date}</p>
        <p>Last Edited : {lastEdited}</p>
        <p>No Of Words : {wordCount}</p>
      </div>
    </>
  );
};

export default Notes;
