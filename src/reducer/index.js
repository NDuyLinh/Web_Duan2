import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import globalSlice from './slices/GlobalSlice';
import modalSlice from './slices/ModalSlice';
import membersSlice from './slices/MembersSlice';

const reducer = combineReducers({
  // here we will be adding reducers
  globalSlice: globalSlice,
  modalSlice: modalSlice,
  membersSlice: membersSlice,
})

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production' ? true : false,
});

export default store;