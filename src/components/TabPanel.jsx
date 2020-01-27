import React from 'react';
import '../App.css';

export default function TabPanel({index, activeTab, children}) {
    return index === activeTab ? (
      <div className='tabPanel'>{children}</div>
    ) : null;
  };