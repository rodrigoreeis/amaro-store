import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { useSelector } from 'react-redux';

import useActions from '../../utils/useActions';

import { Creators as OverlayActionsCreator } from '../../store/ducks/overlay';
import { Creators as MinicartActionsCreator } from '../../store/ducks/minicart';

import '../../styles/containers/HeaderAmaro.scss';

import LogoIcon from '../../assets/icons/logo.svg';
import CartIcon from '../../assets/icons/shopping-bag.svg';

import Button from '../../components/Button';
import Container from '../../layout/Container';

const HeaderAmaro = () => {
  const toolbar = useSelector(state => state.overlay.toolbar);
  const quantity = useSelector(state =>
    state.minicart.data.reduce(
      (total, product) => total + product.amount,
      0,
    ),
  );
  const { toggleOverlay } = useActions(OverlayActionsCreator);
  const { toggleMinicart } = useActions(MinicartActionsCreator);

  const handleToggleMinicart = () => {
    toggleOverlay(true);
    toggleMinicart(true);
  };
  return (
    <header className={`am-header ${toolbar ? 'is--active' : ''}`}>
      <div className="am-header__top">
        <p className="am-header__top-text">Amaro Front-End</p>
      </div>
      <Container>
        <div className="am-header__wrapper">
          <Link to="/" className="am-header__wrapper-logo">
            <ReactSVG src={LogoIcon} />
          </Link>
          <Button
            type="button"
            className="am-header__wrapper-cart"
            onClick={() => handleToggleMinicart()}
          >
            {quantity >= 1 && (
              <span className="am-header__wrapper-cart-qty">
                {quantity}
              </span>
            )}
            <ReactSVG
              className="am-header__wrapper-cart-icon"
              src={CartIcon}
            />
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default HeaderAmaro;
