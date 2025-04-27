import React from 'react';
import './tabs.css';

export interface TabContentProps {
  tabId: string;
  tabName: string;
  children: React.ReactNode;
  defaultChecked?: boolean;
  className?: string;
}

export default function TabContent({
  tabId,
  tabName,
  children,
  defaultChecked = false,
  className = ''
}: TabContentProps) {
  return (
    <>
      <input
        type="radio"
        className="tab-input"
        id={tabId}
        name={tabName}
        defaultChecked={defaultChecked}
      />
      <div className={`tab-content ${className}`}>
        {children}
      </div>
    </>
  );
}