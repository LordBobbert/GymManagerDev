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
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div style={{ flex: '0 0 25%', borderRight: '1px solid #ccc' }}>
        <BaseList
          data={data}
          onSelect={handleSelect}
          renderItem={renderItem}
          section={section}
          getKey={getKey} // Pass the getKey function to BaseList
        />
      </div>
      <div style={{ flex: '1', paddingLeft: '20px' }}>
        {selectedItem && <BaseListDetails item={selectedItem} renderDetails={renderDetails} />}
      </div>
    </div>
  );
};

export default BaseListDetailsPage;
