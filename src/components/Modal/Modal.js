import React from 'react';

import useActions from '../../utils/useActions';

import { Creators as OverlayActionsCreator } from '../../store/ducks/overlay';
import { Creators as QuickViewActionsCreator } from '../../store/ducks/quickview';

import '../../styles/components/Modal.scss';

import Button from '../Button';

const Modal = ({ children, className }) => {
  const { toggleOverlay } = useActions(OverlayActionsCreator);
  const {
    toggleQuickView,
    sizeProductQuickView,
    errorSizeBullets,
  } = useActions(QuickViewActionsCreator);

  const handleClose = () => {
    toggleOverlay(false);
    toggleQuickView(false);
    errorSizeBullets(false);
    sizeProductQuickView(false);
  };
  return (
    <div className={`am-modal ${className}`}>
      <Button
        className="am-modal__close"
        onClick={() => handleClose()}
      />
      {children}
    </div>
  );
};

export default Modal;
