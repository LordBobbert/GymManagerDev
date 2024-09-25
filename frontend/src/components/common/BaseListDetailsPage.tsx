"use client"; // Ensure this is a client component
import React, { useState } from 'react';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';

interface Identifiable {
  id: string | number;
}

interface BaseListDetailsPageProps<T extends Identifiable> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  renderDetails: (item: T) => React.ReactNode;
}

const BaseListDetailsPage = <T extends Identifiable>({
  data,
  renderItem,
  renderDetails
}: BaseListDetailsPageProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      {/* Render list of items */}
      <BaseList data={data} onSelect={handleSelect} renderItem={renderItem} />
      
      {/* Render details of the selected item */}
      {selectedItem && <BaseListDetails item={selectedItem} renderDetails={renderDetails} />}
    </div>
  );
};

export default BaseListDetailsPage;
