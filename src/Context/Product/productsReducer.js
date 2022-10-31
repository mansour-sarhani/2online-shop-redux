import http from "../../Services/httpService";
import {toast} from "react-toastify";
import {faker} from '@faker-js/faker';

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_PRODUCTS':
            return {
                ...action.payload,
                initialized: true,
            };
        case 'ADD_NEW_PRODUCT': {
            const newProduct = action.payload

            http.post('/products', {
                ...newProduct,
                uid: faker.random.numeric(5),
                date: new Date().getTime()
            })
                .then(
                    response => {
                        console.log(response.data)
                        toast.success('محصول با موفقیت اضافه شد', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    }
                )
                .catch(err => console.error(err))

            return {
                ...state,
                initialized: true,
            }
        }
        case 'DELETE_PRODUCT': {
            const productId = action.payload
            http.delete(`/products/${productId}`)
                .then(
                    response => {
                        console.log(response)
                        toast.error('محصول با موفقیت حذف شد', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    }
                )
                .catch(err => console.error(err))

            const newProductsList = [...state.products]
            const sortedProducts = newProductsList.filter(product => product.id !== productId)

            return {
                products: sortedProducts,
                initialized: true,
            }
        }
        case 'EDIT_PRODUCT': {
            const {productId, product} = action.payload
            http.put(`/products/${productId}`, product)
                .then(response => {
                    console.log(response)
                    window.location.reload()
                })
                .catch(err => console.error(err))

            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state
    }
}