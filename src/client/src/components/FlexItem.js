import React from 'react';

const FlexItem = ({ children, flex, className, style }) => (
  <div className={className} style={{
    flex: flex || '1',
    ...style
  }}>
    {children}
  </div>
);

export default FlexItem;