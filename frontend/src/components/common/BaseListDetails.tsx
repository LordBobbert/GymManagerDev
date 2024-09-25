// File: src/components/common/BaseListDetails.tsx

import React from 'react';

interface BaseListDetailsProps<T> {
  item: T; // The selected item
  renderDetails: (item: T) => React.ReactNode; // Function to render details of the item
}

const BaseListDetails = <T,>({ item, renderDetails }: BaseListDetailsProps<T>) => {
  return <div style={{ flex: 2 }}>{renderDetails(item)}</div>;
};

export default BaseListDetails;
