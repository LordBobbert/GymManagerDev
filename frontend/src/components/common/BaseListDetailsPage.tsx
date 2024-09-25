// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';

interface BaseListDetailsPageProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  renderDetails: (item: T) => React.ReactNode;
  section: 'clients' | 'trainers' | 'sessions'; // Section type for heading and button text
}

const BaseListDetailsPage = <T,>({ data, renderItem, renderDetails, section }: BaseListDetailsPageProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Pass the section prop to BaseList */}
      <BaseList data={data} onSelect={handleSelect} renderItem={renderItem} section={section} />
      {selectedItem && (
        <BaseListDetails item={selectedItem} renderDetails={renderDetails} />
      )}
    </div>
  );
};

export default BaseListDetailsPage;
