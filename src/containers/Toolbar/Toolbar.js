import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import useActions from '../../utils/useActions';

import { Creators as FilterActionsCreator } from '../../store/ducks/filter';
import { Creators as OverlayActionsCreator } from '../../store/ducks/overlay';
import { Creators as ProductsActionsCreator } from '../../store/ducks/products';

import '../../styles/containers/Toolbar.scss';

import Container from '../../layout/Container';
import Button from '../../components/Button';
import FilterOptions from '../../components/FilterOptions';

const Toolbar = ({ intro }) => {
  const [active, setActive] = useState(-1);

  const visible = useSelector(state => state.filter);
  const overlay = useSelector(state => state.overlay.toolbar);
  const quantity = useSelector(state => state.products.data.length);

  const { toggleFilter } = useActions(FilterActionsCreator);
  const { overlayToolBar } = useActions(OverlayActionsCreator);
  const {
    orderByBestPrice,
    orderByBiggestPrice,
    orderByDiscount,
  } = useActions(ProductsActionsCreator);

  const handleToggleFilters = () => {
    if (visible) {
      toggleFilter(false);
      overlayToolBar(false);
    } else {
      toggleFilter(true);
      overlayToolBar(true);
    }
  };

  const handleFilterOption = ev => {
    const { value, index } = ev.target.dataset;
    setActive(index);
    toggleFilter(false);
    overlayToolBar(false);
    if (value === 'BEST_PRICE') {
      orderByBestPrice();
    }
    if (value === 'BIGGEST_PRICE') {
      orderByBiggestPrice();
    }
    if (value === 'DISCOUNT') {
      orderByDiscount();
    }
  };

  return (
    <div className="am-toolbar">
      <Container
        className={`am-toolbar__wrapper ${
          overlay ? 'is--active' : ''
        }`}
      >
        <nav className="am-toolbar__nav">
          <span className="am-toolbar__nav-itens">
            <strong>
              {quantity}
              {` `}
            </strong>
            itens
          </span>
          <div className="am-toolbar__nav-filter">
            <Button
              className={`am-toolbar__nav-filter-button ${
                visible ? 'is--active' : ''
              }`}
              type="button"
              onClick={() => handleToggleFilters()}
            >
              Ordernar
            </Button>
            <FilterOptions
              activeIndex={active}
              onClick={ev => handleFilterOption(ev)}
            />
          </div>
        </nav>
      </Container>
      <Container className="am-toolbar__wrapper">
        <h1 className="am-toolbar__intro">{intro}</h1>
      </Container>
    </div>
  );
};

export default Toolbar;
