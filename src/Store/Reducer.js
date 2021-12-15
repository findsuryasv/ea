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
            case 'Remove Item To Cart':
                return {...state, cart: state.cart.filter(item => item.name !== action?.payload?.name)}
                break;
        default:
            return state;
            break;
    }
}