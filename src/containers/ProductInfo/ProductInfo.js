import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import useActions from '../../utils/useActions';

import { Creators as QuickViewActionsCreator } from '../../store/ducks/quickview';
import { Creators as MinicartActionsCreator } from '../../store/ducks/minicart';

import '../../styles/containers/ProductInfo.scss';

import Button from '../../components/Button';
import SizeBullets from '../../components/SizeBullets';

const ProductInfo = ({
  image,
  name,
  discount,
  actualPrice,
  installments,
  regularPrice,
  color,
  colorName,
  sizes,
  product,
}) => {
  const [active, setActive] = useState(-1);

  const sizeSelected = useSelector(state => state.quickview.size);
  const sizeError = useSelector(state => state.quickview.sizeError);

  const { toggleMinicart, addToCart } = useActions(
    MinicartActionsCreator,
  );
  const {
    sizeProductQuickView,
    errorSizeBullets,
    toggleQuickView,
  } = useActions(QuickViewActionsCreator);

  const handleSizeSelected = ev => {
    const { index } = ev.target.dataset;
    const { value } = ev.target;
    sizeProductQuickView(value);
    setActive(index);
  };

  const handleAddToCart = () => {
    if (!sizeSelected) return errorSizeBullets(true);
    errorSizeBullets(false);
    sizeProductQuickView(false);
    toggleQuickView(false);
    toggleMinicart(true);
    return addToCart({
      name: product.name,
      image: product.image,
      price: product.actual_price,
      color: product.color,
      size: sizeSelected,
      amount: 1,
    });
  };

  return (
    <div className="am-product">
      <figure className="am-product__image">
        <img
          src={image || 'http://via.placeholder.com/470x594'}
          alt={name}
        />
      </figure>
      <div className="am-product__info">
        <h1 className="am-product__info-name">{name}</h1>
        <div className="am-product__info-pricing">
          {discount ? (
            <>
              <del className="am-product__info-pricing-old-price">
                {regularPrice}
              </del>
              <span className="am-product__info-pricing-price">
                {actualPrice}
              </span>
              <span className="am-product__info-pricing-discount">
                {`(${discount} off)`}
              </span>
              <span className="am-product__info-pricing-installments">
                {installments}
              </span>
            </>
          ) : (
            <>
              <span className="am-product__info-pricing-price">
                {actualPrice}
              </span>
              {installments && (
                <span className="am-product__info-pricing-installments">
                  {installments}
                </span>
              )}
            </>
          )}
        </div>
        <div className="am-product__info-color">
          <span className="am-product__info-color-name">
            Cor:
            <strong>{colorName}</strong>
          </span>
          <figure className="am-product__info-color-bullet">
            <img src={color} alt={colorName} />
          </figure>
        </div>
        <div className="am-product__info-size">
          <span className="am-product__info-size-name">
            Tamanho:
            <strong>{sizeSelected}</strong>
          </span>
          <SizeBullets
            onClick={ev => handleSizeSelected(ev)}
            className="am-product__info-size-bullets"
            sizes={sizes}
            activeIndex={active}
          />
        </div>
        <p
          className={`am-product__info-error ${
            sizeError && !sizeSelected ? 'is--active' : ''
          }`}
        >
          Selecione um tamanho!
        </p>
        <Button
          variant="--primary"
          className="am-product__info-button"
          type="button"
          onClick={() => handleAddToCart()}
        >
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
