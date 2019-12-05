import React from 'react';

export default function TabPanel({index, activeTab, children}) {
    return index === activeTab ? (
      <div>{children}</div>
    ) : null;
  };