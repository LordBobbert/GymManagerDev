// File: components/common/BaseListDetailsPage.tsx
import React, { useState } from 'react';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';

"use client";

interface Identifiable {
  id: string | number;
}

interface BaseListDetailsPageProps<T extends Identifiable> {
  data: T[]; // Ensure the data array contains items with an 'id'
  renderItem: (item: T) => React.ReactNode; // Custom render function for list items
  renderDetails: (item: T) => React.ReactNode; // Custom render function for item details
}

const BaseListDetailsPage = <T extends Identifiable>({ data, renderItem, renderDetails }: BaseListDetailsPageProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
      {/* Render the list of items */}
      <BaseList data={data} onSelect={handleSelect} renderItem={renderItem} />

      {/* Render details of the selected item */}
      {selectedItem && <BaseListDetails item={selectedItem} renderDetails={renderDetails} />}
    </div>
  );
};

export default BaseListDetailsPage;
