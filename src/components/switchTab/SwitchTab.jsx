import React, { useState } from "react";
import "./switchTabs.scss";
const SwitchTab = ({ data, onTabsChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setleft] = useState(0);

  // swicth tab active 
  const onActive = (tab, index) => {
    setleft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 200);
    onTabsChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => {
          return (
            <span
              className={`tabItem ${selectedTab === index ? "active" : ""}`}
              key={index}
              onClick={() => onActive(tab, index)}
            >
              {tab}
            </span>
          );
        })}
        <span className="movingBg" style={{ left }}></span>
      </div>
    </div>
  );
};

export default SwitchTab;
