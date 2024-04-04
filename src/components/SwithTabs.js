import React, { useState } from "react";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const handleTabSelection = (tab, index) => {
    setLeft(index * 100);
    setSelectedTab(index);
    setTimeout(() => {
      onTabChange(tab, index);
    }, 300);
  };

  return (
    <div className="h-10 bg-white rounded-3xl overflow-hidden">
      <div className="flex items-center h-8 relative">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`h-full flex items-center justify-center w-[100px] text-base relative z-10 cursor-pointer transition-colors duration-300 ${
              selectedTab === index ? "text-white" : "text-black"
            }`}
            onClick={() => handleTabSelection(tab, index)}
          >
            {tab}
          </span>
        ))}

        <span
          style={{ left }}
          className="h-10 w-[100px] left-0 rounded-3xl bg-gradient-to-r from-yellow-400 to-pink-600 absolute top-0 transition-all ease-in-out duration-300"
        />
      </div>
    </div>
  );
};

export default SwitchTabs;
