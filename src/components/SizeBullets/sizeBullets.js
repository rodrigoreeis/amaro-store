import React from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import '../../styles/components/SizeBullets.scss';

import Button from '../Button';

const SizeBullets = ({
  className = '',
  sizes = [],
  activeIndex,
  onClick,
}) => {
  const sizeSelected = useSelector(state => state.quickview.size);

  return (
    <div className={`am-sizes ${className}`}>
      {sizes.map(({ size, available }, index) => (
        <Button
          key={shortid.generate()}
          onClick={onClick}
          disabled={!available}
          data-index={index}
          value={size}
          className={`am-sizes__bullet ${
            +activeIndex === index && sizeSelected
              ? 'is--selected'
              : ''
          }`}
        >
          {size}
        </Button>
      ))}
    </div>
  );
};

export default SizeBullets;
