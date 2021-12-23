export const addItemToCart = payload => ({
    type: 'Add Item To Cart',
    payload
});

export const removeItemFromCart = payload => ({
    type: 'Remove Item To Cart',
    payload
});

export const updateItemQuantityInCart = payload => ({
    type: 'Update Item In Cart',
    payload
});