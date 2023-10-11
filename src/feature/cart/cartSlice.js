import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            const exist = state.items.find(                           //// đoạn này là thêm sản phẩm vào giỏ hàng  cái find kia có tác dụng là tìm kiếm

                (item) => item.productId === action.payload.productId
            );
            if (exist) { ///// đây nếu trong hàm mà có cái exist (tức là có sản phẩm mình vừa chọn rồi) thì tăng số lượng sản phẩm hay là quantity lên
                const newItems = state.items.map(item =>
                    item.productId === exist.productId
                        ? {
                            ...item, quantity: item.quantity + action.
                                payload.quantity
                        }
                        : item
                );
                return { ...state, items: newItems }
            } else {
                return { ...state, items: [...state.items, action.payload] }
            }
        },
        increase_quantity(state, action) {
            const newItems = state.items.map((item) =>
                item.productId === action.payload.productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            return {
                ...state,
                items: newItems,

            }
        },
        decrease_quantity(state, action) {
            const newItems = state.items.map((item) => {
                if (item.productId === action.payload.productId) {

                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return null;
                    }
                }
                return item;
            });

            newItems = newItems.filter((item) => item !== null);
            return {
                ...state,
                items: newItems,
            };
        },
        totalPrice(state) {
            const initialTotalPrice = state.items.reduce(
                (total, item) => total + item.quantity * item.price,
                0
            );
            return {
                ...state,
                totalPrice: initialTotalPrice,
            }
        },
    }
})


