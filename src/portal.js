import { createPortal } from 'react-dom';

// Portal System - MANDATORY PATTERN
export const createModalPortal = (children) => {
  return createPortal(children, document.body);
};

export const createToastPortal = (children) => {
  return createPortal(children, document.body);
};

export const createDropdownPortal = (children) => {
  return createPortal(children, document.body);
};

export default {
  createModalPortal,
  createToastPortal,
  createDropdownPortal
};
