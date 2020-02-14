import React, { useEffect, useState, memo } from 'react';

import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

import { useSelector } from 'react-redux';

import useActions from '../../utils/useActions';

import { Creators as FilterActionsCreator } from '../../store/ducks/filter';
import { Creators as OverlayActionsCreator } from '../../store/ducks/overlay';
import { Creators as QuickViewActionsCreator } from '../../store/ducks/quickview';
import { Creators as MinicartActionsCreator } from '../../store/ducks/minicart';

import '../../styles/components/Overlay.scss';

const Overlay = ({
  className = '',
  onKeyDown,
  onKeyPress,
  onKeyUp,
  ariaLabel,
  tabIndex,
}) => {
  const [targetElement, setTargetElement] = useState(null);

  const toggle = useSelector(state => state.overlay.toggle);
  const toolbar = useSelector(state => state.overlay.toolbar);

  const filterActions = useActions(FilterActionsCreator);
  const overlayActions = useActions(OverlayActionsCreator);
  const quickViewActions = useActions(QuickViewActionsCreator);
  const minicartActions = useActions(MinicartActionsCreator);

  const { toggleFilter } = filterActions;
  const { toggleOverlay, overlayToolBar } = overlayActions;
  const { toggleQuickView, sizeProductQuickView } = quickViewActions;
  const { toggleMinicart } = minicartActions;

  const handleCloseAll = () => {
    toggleFilter(false);
    toggleOverlay(false);
    toggleQuickView(false);
    toggleMinicart(false);
    sizeProductQuickView(false);
    overlayToolBar(false);
  };

  useEffect(() => {
    setTargetElement(document.querySelector('body'));
    return toggle || toolbar
      ? disableBodyScroll(targetElement)
      : enableBodyScroll(targetElement);
  }, [toggle || toolbar]);

  return (
    <div
      className={`am-overlay ${className} ${
        toggle || toolbar ? 'is--active' : ''
      }`}
      onClick={() => handleCloseAll()}
      onKeyDown={onKeyDown}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
      role="button"
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    />
  );
};

export default memo(Overlay);
