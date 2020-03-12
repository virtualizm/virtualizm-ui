import React from 'react';
import '../App.scss';

export default function TabPanel({index, activeTab, children}) {
    return index === activeTab ? (
      <div className='tabPanel'>{children}</div>
    ) : null;
  };