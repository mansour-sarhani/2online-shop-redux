import {toast} from "react-toastify";

const saveToLocal = (updatedCart, savedTotal, savedOrgTotal) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    localStorage.setItem('cartTotal', JSON.stringify(savedTotal))
    localStorage.setItem('cartOrgTotal', JSON.stringify(savedOrgTotal))
}

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_CART': {
            const {cart, total, orgTotal} = action.payload
            return {
                ...state,
                cart: cart,
                total: total,
                orgTotal: orgTotal,
                initialized: true
            };
        }
        case 'ADD_TO_CART' : {
            const {product} = action.payload
            const productId = product.id
            const updatedCart = [...state.cart]
            const productIndex = updatedCart.findIndex(item => item.id === productId)

            function price(product) {
                if (product.offPrice) {
                    return parseInt(product.offPrice)
                }
                return parseInt(product.price)
            }

            const orgPrice = parseInt(product.price)
            const offPrice = price(product)

            const savedTotal = state.total + offPrice
            const savedOrgTotal = state.orgTotal + orgPrice

            const savedFinalPrice = state.total + price(product)

            if (productIndex < 0) {
                updatedCart.push({...product, qty: 1})
                saveToLocal(updatedCart, savedTotal, savedOrgTotal)
            } else {
                const updatedItem = {...updatedCart[productIndex]}
                updatedItem.qty++
                updatedCart[productIndex] = updatedItem
                saveToLocal(updatedCart, savedTotal, savedOrgTotal)
            }
            toast.success(`${product.name} به سبد خرید اضافه شد `)
            return {
                ...state,
                cart: updatedCart,
                total: savedFinalPrice,
                orgTotal: savedOrgTotal,
                initialized: true,
            }
        }
        case 'MINUS_FROM_CART' : {
            const {product} = action.payload
            const productId = product.id
            const updatedCart = [...state.cart]
            const productIndex = updatedCart.findIndex(item => item.id === productId)
            const updatedItem = {...updatedCart[productIndex]}

            function price(product) {
                if (product.offPrice) {
                    return parseInt(product.offPrice)
                }
                return parseInt(product.price)
            }

            const orgPrice = parseInt(product.price)
            const offPrice = price(product)

            const savedTotal = state.total - offPrice
            const savedOrgTotal = state.orgTotal - orgPrice

            const savedFinalPrice = state.total - price(product)

            if (updatedItem.qty === 1) {
                toast.error(`${product.name} از سبد خرید حذف شد `)
                const filteredCart = updatedCart.filter(item => item.id !== updatedItem.id)
                saveToLocal(filteredCart, savedTotal, savedOrgTotal)
                return {
                    ...state,
                    cart: filteredCart,
                    total: savedFinalPrice,
                    orgTotal: savedOrgTotal,
                    initialized: true,
                }
            } else {
                updatedItem.qty--
                updatedCart[productIndex] = updatedItem
                saveToLocal(updatedCart, savedTotal, savedOrgTotal)
                return {
                    ...state,
                    cart: updatedCart,
                    total: savedFinalPrice,
                    orgTotal: savedOrgTotal,
                    initialized: true,
                }
            }
        }
        case 'REMOVE_CART_ITEM': {
            const {product} = action.payload
            const productId = product.id
            const updatedCart = [...state.cart]
            const productIndex = updatedCart.findIndex(item => item.id === productId)
            const updatedItem = {...updatedCart[productIndex]}

            const filteredCart = updatedCart.filter(item => item.id !== updatedItem.id)

            function price(product) {
                if (product.offPrice) {
                    return parseInt(product.offPrice) * parseInt(product.qty)
                }
                return parseInt(product.price) * parseInt(product.qty)
            }

            const orgPrice = parseInt(product.price) * parseInt(product.qty)
            const offPrice = price(product)

            const savedTotal = state.total - offPrice
            const savedOrgTotal = state.orgTotal - orgPrice

            const savedFinalPrice = state.total - price(product)
            saveToLocal(filteredCart, savedTotal, savedOrgTotal)
            toast.error(`${product.name} از سبد خرید حذف شد `)

            return {
                ...state,
                cart: filteredCart,
                total: savedFinalPrice,
                orgTotal: savedOrgTotal,
                initialized: true,
            }
        }
        default:
            return state
    }
}
