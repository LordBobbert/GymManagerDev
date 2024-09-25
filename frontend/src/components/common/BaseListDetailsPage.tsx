// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';

interface BaseListDetailsPageProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  renderDetails: (item: T) => React.ReactNode;
  section: 'clients' | 'trainers' | 'sessions'; // Section type for heading and button text
  getKey: (item: T) => string | number; // Function to get a unique key for each item
}

const BaseListDetailsPage = <T,>({
  data,
  renderItem,
  renderDetails,
  section,
  getKey, // Include getKey in props
}: BaseListDetailsPageProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex' }}>
      <BaseList
        data={data}
        onSelect={handleSelect}
        renderItem={renderItem}
        section={section}
        getKey={getKey} // Pass the getKey function to BaseList
      />
      {selectedItem && <BaseListDetails item={selectedItem} renderDetails={renderDetails} />}
    </div>
  );
};

export default BaseListDetailsPage;
