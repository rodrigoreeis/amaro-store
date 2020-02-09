import React, { useEffect, useState } from 'react';

import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  toggle,
  toolbar,
  filterActions,
  overlayActions,
  quickViewActions,
  minicartActions,
}) => {
  const [targetElement, setTargetElement] = useState(null);
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

const mapStateToProps = state => ({
  toggle: state.overlay.toggle,
  toolbar: state.overlay.toolbar,
});

const mapDispatchToProps = dispatch => ({
  filterActions: bindActionCreators(FilterActionsCreator, dispatch),
  overlayActions: bindActionCreators(OverlayActionsCreator, dispatch),
  quickViewActions: bindActionCreators(
    QuickViewActionsCreator,
    dispatch,
  ),
  minicartActions: bindActionCreators(
    MinicartActionsCreator,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
