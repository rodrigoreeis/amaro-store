import React from 'react';
import shortid from 'shortid';

import useActions from '../../utils/useActions';

import { Creators as QuickViewActionsCreator } from '../../store/ducks/quickview';
import { Creators as OverlayActionsCreator } from '../../store/ducks/overlay';

import '../../styles/containers/ProductsShelf.scss';

import Shelf from '../../components/Shelf';
import Container from '../../layout/Container';

const ProductsShelf = ({ content }) => {
  const { productQuickView, toggleQuickView } = useActions(
    QuickViewActionsCreator,
  );
  const { toggleOverlay } = useActions(OverlayActionsCreator);

  const handleOpenProduct = product => {
    productQuickView(product);
    toggleOverlay(true);
    toggleQuickView(true);
  };

  return (
    <Container>
      <section className="am-products-shelf">
        {content.map(product => {
          const {
            name,
            image,
            installments,
            color,
            regular_price: regularPrice,
            actual_price: actualPrice,
            discount_percentage: discount,
            bullet_color: bulletColor,
          } = product;
          return (
            <Shelf
              key={shortid.generate()}
              name={name}
              image={image || 'http://via.placeholder.com/470x594'}
              installments={installments}
              regularPrice={regularPrice}
              actualPrice={actualPrice}
              discount={discount}
              colorName={color}
              color={bulletColor}
              onClick={() => handleOpenProduct(product)}
            />
          );
        })}
      </section>
    </Container>
  );
};

export default ProductsShelf;
