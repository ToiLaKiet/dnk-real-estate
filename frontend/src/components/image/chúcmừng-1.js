import React from 'react';
import Chucmung1 from '../../assets/chúc mừng - 1.png'

function ChucMung1({ className, alt = 'Chucmung1', width = 400, height = 200 }) {
  return (
    <img
      src={Chucmung1}
      className={className}
      alt={alt}
      style={{ width: `${width}px`, height }}
    />
  );
}

export default ChucMung1;
