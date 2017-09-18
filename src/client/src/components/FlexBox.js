import React from 'react';

const FlexBox = ({ children, direction, align, justify, className, style }) => (
  <div className={className} style={{
    display: 'flex',
    flexFlow: direction || 'row',
    alignItems: align || 'stretch',
    justifyContent: justify || 'flex-start',
    ...style
  }}>
    {children}
  </div>
);

export default FlexBox;