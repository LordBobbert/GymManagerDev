// File: components/common/BaseList.tsx
import React from 'react';

interface Identifiable {
  id: string | number; // Ensure items have an 'id' of type string or number
}

interface BaseListProps<T extends Identifiable> {
  data: T[]; // Generic data type with 'id'
  onSelect: (item: T) => void; // Item selection handler
  renderItem: (item: T) => React.ReactNode; // Custom render function for list items
}

const BaseList = <T extends Identifiable>({ data, onSelect, renderItem }: BaseListProps<T>) => {
  return (
    <div style={{ flex: 1 }}>
      <ul>
        {data.map((item) => (
          <li key={item.id} onClick={() => onSelect(item)}>
            {renderItem(item)} {/* Render each item based on the provided function */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaseList;
