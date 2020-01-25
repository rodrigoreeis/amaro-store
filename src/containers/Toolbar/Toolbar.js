import React from 'react';

import '../../styles/containers/Toolbar.scss';

import Container from '../../layout/Container';
import Button from '../../components/Button';
import FilterOptions from '../../components/FilterOptions';

const Toolbar = ({ intro }) => {
  return (
    <div className="am-toolbar">
      <Container className="am-toolbar__wrapper">
        <nav className="am-toolbar__nav">
          <span className="am-toolbar__nav-itens">
            <strong>3003 </strong>
            itens
          </span>
          <div className="am-toolbar__nav-filter">
            <Button
              className="am-toolbar__nav-filter-button"
              type="button"
            >
              Ordernar
            </Button>
            <FilterOptions />
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
