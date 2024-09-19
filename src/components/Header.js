
import React, { useState } from 'react';
import { ReactComponent as Display } from './assests_kanban/icons_FEtask/Display.svg';
import './Header.css'; 

function Header({ setGrouping, setSortBy }) {

  const [isDisplayVisible, setDisplayVisible] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState(null);


  const toggleDisplay = () => setDisplayVisible(!isDisplayVisible);

  const handleDropdownClick = (dropdown) => {
    setSelectedDropdown(selectedDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="header">
      <button onClick={toggleDisplay}>
        <Display className="display-icon"/>
        Display
      </button>
      {isDisplayVisible && (
        <div className="display-contents">
        <div className="dropdowns">
          <div className="grouping-controls">
            <label>Grouping</label>
              <select onChange={(e) => setGrouping(e.target.value)} defaultValue="">
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
        
          </div>
          <div className="sorting-controls">
            <label>Priority</label>
              <select onChange={(e) => setSortBy(e.target.value)} defaultValue="">
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
          </div>
        </div>
        </div>
      )}  
    </div>
  );
}

export default Header;
