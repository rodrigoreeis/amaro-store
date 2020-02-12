import React from 'react';
import '../../styles/components/Shelf.scss';

const Shelf = ({
  image,
  name,
  installments,
  actualPrice,
  regularPrice,
  discount,
  color,
  colorName,
  onClick,
}) => {
  return (
    <div className="am-shelf">
      <button type="button" onClick={onClick}>
        <figure className="am-shelf__image">
          <img src={image} alt={name} />
          {discount && (
            <span className="am-shelf__image-flag">{`${discount} off`}</span>
          )}
        </figure>
        <h4 className="am-shelf__name">{name}</h4>
        <div className="am-shelf__pricing">
          {discount ? (
            <>
              <span className="am-shelf__pricing-price">
                {actualPrice}
              </span>
              {installments && (
                <span className="am-shelf__pricing-installments">
                  {installments}
                </span>
              )}
              <del className="am-shelf__pricing-old-price">
                {regularPrice}
              </del>
              <span className="am-shelf__pricing-discount">
                {`(${discount} off)`}
              </span>
            </>
          ) : (
            <>
              <span className="am-shelf__pricing-price">
                {actualPrice}
              </span>
              {installments && (
                <span className="am-shelf__pricing-installments">
                  {installments}
                </span>
              )}
            </>
          )}
        </div>
        <figure className="am-shelf__color">
          <img src={color} alt={colorName} />
        </figure>
      </button>
    </div>
  );
};

export default Shelf;
