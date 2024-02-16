import React, { useState, useEffect } from "react";
import Notepad from "./Notepad";
import CreateProject from "../Modals/CreateProject";
import "../App.css";
const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [notesList, setnotesList] = useState([]);
  const [selectedNotes, setselectedNotes] = useState("");
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  const savenotes = (taskObj) => {
    const currentDate = new Date();
    taskObj["Date"] = currentDate.toLocaleString();

    let tempList = [...notesList, taskObj];
    try {
      localStorage.setItem(
        "notesData",
        JSON.stringify({ notesList: tempList, activeButtonIndex })
      );
      setnotesList(tempList);
    } catch (error) {
      setError("Error saving notes data");
      console.error("Error saving notes data:", error);
    } finally {
      setModal(false);
    }
  };

  const handlenotesClick = (index) => {
    setselectedNotes(notesList[index]);
    setActiveButtonIndex(index);
    try {
      localStorage.setItem(
        "notesData",
        JSON.stringify({ notesList, activeButtonIndex: index })
      );
    } catch (error) {
      setError("Error updating notes data");
      console.error("Error updating notes data:", error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      let storedData = localStorage.getItem("notesData");
      if (storedData) {
        let { notesList, activeButtonIndex } = JSON.parse(storedData);
        setnotesList(notesList);
        setActiveButtonIndex(activeButtonIndex);
        setselectedNotes(notesList[activeButtonIndex]);
      }
    } catch (error) {
      setError("Error fetching notes data");
      console.error("Error fetching notes data:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <>
      <div className="intialPage">
        <div className="sidebar">
          <div className="task-board">
            <div className="heading">
              <p>My Notes</p>
            </div>
            <div className="task-container">
              <div className="notesList">
                <div className="notesListInner">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    notesList &&
                    notesList.map((object, index) => (
                      <p
                        key={index}
                        className={`${
                          activeButtonIndex === index ? "active" : ""
                        }`}
                        onClick={() => handlenotesClick(index)}
                      >
                        {object.Name}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="notesBtn">
              <p onClick={toggle}>+ New Note</p>
            </div>
          </div>
        </div>
        <div className="content">
          {selectedNotes && <Notepad notes={selectedNotes} />}
        </div>
      </div>
      <CreateProject toggle={toggle} modal={modal} save={savenotes} />
    </>
  );
};

export default Dashboard;
