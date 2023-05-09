const initialState = {
    error1: false,
};

export default function errorsReducer(state = initialState, action) {
    switch (action.type) {
        case "a":
            return state;

        default:
            return state;
    }
}
