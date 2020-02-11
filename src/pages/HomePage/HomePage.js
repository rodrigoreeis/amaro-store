import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import useActions from '../../utils/useActions';

import { Creators as ProductsActionsCreator } from '../../store/ducks/products';

import '../../styles/pages/HomePage.scss';

import Toolbar from '../../containers/Toolbar';
import ProductsShelf from '../../containers/ProductsShelf';
import Overlay from '../../components/Overlay/Overlay';
import QuickView from '../../containers/QuickView';
import Minicart from '../../containers/Minicart';
import HeaderAmaro from '../../containers/HeaderAmaro/HeaderAmaro';

const HomePage = () => {
  const products = useSelector(state =>
    state.products.data.map(product => ({
      ...product,
      bullet_color: `https://cdn.amaro.com/uploads/icons/${product.code_color}.gif`,
    })),
  );
  const changed = useSelector(state => state.products.changed);

  const { getProducts } = useActions(ProductsActionsCreator);

  useEffect(() => {
    getProducts();
  }, []);

  const memoizedShef = useMemo(
    () => <ProductsShelf content={products} />,
    [products.length && changed],
  );

  return (
    <>
      <HeaderAmaro />
      <Toolbar intro="Produtos" />
      <Overlay />
      {memoizedShef}
      <Minicart />
      <QuickView />
    </>
  );
};

export default HomePage;
