// File: components/common/BaseListDetails.tsx
import React from 'react';

interface BaseListDetailsProps<T> {
  item: T; // Generic item type
  renderDetails: (item: T) => React.ReactNode; // Custom render function for item details
}

const BaseListDetails = <T,>({ item, renderDetails }: BaseListDetailsProps<T>) => {
  return (
    <div style={{ flex: 2, padding: '20px' }}>
      {renderDetails(item)} {/* Render the details using the provided function */}
    </div>
  );
};

export default BaseListDetails;
