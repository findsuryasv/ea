const initialState = {
    cart: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'Add Item To Cart':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
            break;
        default:
            return state;
            break;
    }
}