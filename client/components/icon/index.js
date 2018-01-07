import React from 'react';

const CustomIcon = ({ type, className = '', ...restProps }) => (
  <svg
    className={`am-icon am-icon-${type && type.default.id} ${className}`}
    {...restProps}
  >
    <use xlinkHref={`#${type && type.default.id}`} /> {/* svg-sprite-loader@0.3.x */}
    {/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@lastest */}
  </svg>
);

export default CustomIcon;
