import {configureStore} from '@reduxjs/toolkit';
import reducer from 'modules/reducer';

const store = configureStore({
  reducer,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default store;
export type {RootState, AppDispatch};
