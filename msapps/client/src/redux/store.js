import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './reducers/itemsReducer';
import errorsReducer from './reducers/errorsReducer';

const reducer = {
    items: itemsReducer,
    errors: errorsReducer,
};

const store = configureStore({
    reducer: reducer,
});

export default store;