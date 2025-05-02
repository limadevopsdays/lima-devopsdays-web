import React from 'react';

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
}: Readonly<TabContentProps>) {
  return (
    <div>
      <input
        type="radio"
        id={tabId}
        name={tabName}
        defaultChecked={defaultChecked}
        className="peer hidden"
      />
      <div className={`hidden peer-checked:block ${className}`}>
        {children}
      </div>
    </div>
  );
}
