import React, { memo } from 'react';
import shortid from 'shortid';

import { useSelector } from 'react-redux';

import useActions from '../../utils/useActions';

import { Creators as OverlayActionsCreator } from '../../store/ducks/overlay';
import { Creators as MinicartActionsCreator } from '../../store/ducks/minicart';

import '../../styles/containers/Minicart.scss';

import Button from '../../components/Button';
import priceToNumber from '../../utils/priceToNumber';
import formatPrice from '../../utils/formatPrice';

const Minicart = () => {
  const toggle = useSelector(state => state.minicart.toggle);
  const products = useSelector(state => state.minicart.data);
  const quantity = useSelector(state =>
    state.minicart.data.reduce(
      (total, product) => total + product.amount,
      0,
    ),
  );
  const total = useSelector(state =>
    formatPrice(
      state.minicart.data.reduce(
        (acc, product) =>
          acc + (priceToNumber(product.price) * product.amount) / 100,
        0,
      ),
    ),
  );
  const { toggleOverlay } = useActions(OverlayActionsCreator);
  const { toggleMinicart, removeFromCart, updateAmount } = useActions(
    MinicartActionsCreator,
  );

  const handleCloseCart = () => {
    toggleMinicart(false);
    toggleOverlay(false);
  };

  const handleRemove = index => {
    removeFromCart(index);
  };

  const handleIncrement = index => {
    updateAmount(index, products[index].amount + 1);
  };

  const handleDecrement = index => {
    updateAmount(index, products[index].amount - 1);
  };

  return (
    <div className={`am-minicart ${toggle ? 'is--active' : ''}`}>
      <div className="am-minicart__header">
        <Button
          className="am-minicart__header-close"
          onClick={() => handleCloseCart()}
        />
        <h3 className="am-minicart__header-title">
          Sacola
          {` (${quantity})`}
        </h3>
      </div>
      {quantity >= 1 ? (
        <>
          <ul className="am-minicart__items">
            {products.map(
              (
                { image, name, size, color, amount, price },
                index,
              ) => (
                <li
                  className="am-minicart__item"
                  key={shortid.generate()}
                >
                  <div className="am-minicart__item-left">
                    <figure className="am-minicart__item-image">
                      <img src={image} alt={name} />
                    </figure>
                  </div>
                  <div className="am-minicart__item-right">
                    <h2 className="am-minicart__item-name">{name}</h2>
                    <p className="am-minicart__item-size">
                      Tam.:
                      <span>{` ${size}`}</span>
                    </p>
                    <p className="am-minicart__item-color">
                      Cor:
                      <span>{` ${color}`}</span>
                    </p>
                    <div className="am-minicart__item-wrapper">
                      <div className="am-minicart__item-qty">
                        <Button
                          className={`am-minicart__item-qty-btn has--minus ${
                            amount <= 1 ? 'is--inactive' : ''
                          }`}
                          type="button"
                          onClick={() => handleDecrement(index)}
                        />
                        <input
                          className="am-minicart__item-qty-val"
                          type="text"
                          value={amount}
                          readOnly
                        />
                        <Button
                          type="button"
                          className="am-minicart__item-qty-btn has--plus"
                          onClick={() => handleIncrement(index)}
                        />
                      </div>
                      <span className="am-minicart__item-price">
                        {price}
                      </span>
                    </div>
                    <Button
                      className="am-minicart__item-remove"
                      type="button"
                      onClick={() => handleRemove(index)}
                    />
                  </div>
                </li>
              ),
            )}
          </ul>
          <div className="am-minicart__footer">
            <div className="am-minicart__footer-subtotal">
              <p className="am-minicart__footer-subtotal-text">
                Subtotal
              </p>
              <span className="am-minicart__footer-subtotal-price">
                {total}
              </span>
            </div>
            <Button
              className="am-minicart__footer-checkout"
              variant="--primary"
            >
              Ir para o pagamento
            </Button>
          </div>
        </>
      ) : (
        <div className="am-minicart__empy">
          <p className="am-minicart__empy-text">
            Sua sacola está vazia :(
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(Minicart);
