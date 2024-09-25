// File: src/components/common/BaseList.tsx

import React from 'react';

interface BaseListProps<T> {
  data: T[]; // Generic data array
  onSelect: (item: T) => void; // Item selection handler
  renderItem: (item: T) => React.ReactNode; // Render function for list items
}

const BaseList = <T,>({ data, onSelect, renderItem }: BaseListProps<T>) => {
  return (
    <div style={{ flex: 1 }}>
      <ul>
        {data.map((item, index) => (
          <li key={index} onClick={() => onSelect(item)}>
            {renderItem(item)} {/* Render each item based on provided function */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaseList;
