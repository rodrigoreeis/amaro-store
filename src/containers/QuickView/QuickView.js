import React from 'react';

import { useSelector } from 'react-redux';

import '../../styles/containers/QuickView.scss';

import Modal from '../../components/Modal';
import ProductInfo from '../ProductInfo';

const QuickView = () => {
  const toggle = useSelector(state => state.quickview.toggle);
  const product = useSelector(state => state.quickview.data);

  const {
    name,
    image,
    installments,
    color,
    sizes,
    regular_price: regularPrice,
    actual_price: actualPrice,
    discount_percentage: discount,
    bullet_color: bulletColor,
  } = product;

  return (
    <Modal className={`am-quick-view ${toggle ? 'is--active' : ''}`}>
      <ProductInfo
        product={product}
        name={name}
        image={image}
        regularPrice={regularPrice}
        actualPrice={actualPrice}
        installments={installments}
        color={bulletColor}
        colorName={color}
        discount={discount}
        sizes={sizes}
      />
    </Modal>
  );
};

export default QuickView;
