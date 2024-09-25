// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';
import ActionButton from './ActionButton'; // Import the new ActionButton

interface BaseListDetailsPageProps<T> {
  data: T[]; // Generic data type for flexibility
  renderItem: (item: T) => React.ReactNode; // Function to render each list item
  renderDetails: (item: T) => React.ReactNode; // Function to render item details
  section: 'clients' | 'trainers' | 'sessions'; // Section type for button text
}

const BaseListDetailsPage = <T,>({ data, renderItem, renderDetails, section }: BaseListDetailsPageProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
  };

  const handleAddItemClick = () => {
    // Handle the "Add" button click here (this could open a modal, redirect to a form, etc.)
    console.log(`Add new ${section}`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <BaseList data={data} onSelect={handleSelect} renderItem={renderItem} />
      {selectedItem && (
        <BaseListDetails item={selectedItem} renderDetails={renderDetails} />
      )}
      <div style={{ marginLeft: '20px' }}>
        {/* Dynamic button text based on the section */}
        <ActionButton section={section} onClick={handleAddItemClick} />
      </div>
    </div>
  );
};

export default BaseListDetailsPage;
