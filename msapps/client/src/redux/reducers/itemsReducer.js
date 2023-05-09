import { IMPORT_ITEMS, IMPORT_ITEMS_FAIL } from "../constants/ItemsConstants";

const initialState = {
    items: [],
    error: "",
};

export default function itemsReducer(state = initialState, action) {
    switch (action.type) {
        case IMPORT_ITEMS: {
            const newState = { ...state };
            newState.items = [...action.payload];

            return newState;
        }

        case IMPORT_ITEMS_FAIL: {
            const newState = { ...state };
            newState.error = action.payload;

            return newState;
        }

        default:
            return state;
    }
}
