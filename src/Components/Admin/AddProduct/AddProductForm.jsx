import {useEffect, useRef, useState} from "react";
import {useProductsDispatch} from "../../../Context/Product/productsContext";

function AddProductForm() {
    const dispatch = useProductsDispatch()

    const productName = useRef(null)
    const productPrice = useRef(null)
    const productOffPrice = useRef(null)
    const productImage = useRef(null)
    const productFeat = useRef(null)
    const productDesc = useRef(null)

    const [imgPreview, setImgPreview] = useState('');

    const imgUploadedView = (e) => {
        setImgPreview(e.target.value)
    }

    useEffect(() => {
        setImgPreview(imgPreview)
    }, [imgPreview]);

    const addProductSubmit = (e) => {
        e.preventDefault()
        dispatch({
            type: 'ADD_NEW_PRODUCT',
            payload: {
                name: productName.current.value,
                desc: productDesc.current.value,
                price: productPrice.current.value,
                offPrice: productOffPrice.current.value,
                image: productImage.current.value,
                feat: productFeat.current.checked
            }
        })
        e.target.reset();
    }

    return (
        <div className="add-product-form-container">
            <form className="add-product-form" onSubmit={addProductSubmit}>
                <div className="form-floating mb-3">
                    <input
                        ref={productName}
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="نام محصول"
                    />
                    <label className="form-label" htmlFor="productName">نام محصول</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        ref={productDesc}
                        className="form-control"
                        id="productDesc"
                        placeholder="توضیحات محصول"
                        style={{height: 200}}
                    />
                    <label htmlFor="productDesc">توضیحات محصول</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        ref={productPrice}
                        type="number"
                        className="form-control"
                        id="productPrice"
                        placeholder="قیمت اصلی محصول"
                    />
                    <label className="form-label" htmlFor="productPrice">قیمت اصلی محصول</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        ref={productOffPrice}
                        type="number"
                        className="form-control"
                        id="productOffPrice"
                        placeholder="قیمت با تخفیف محصول"
                    />
                    <label className="form-label" htmlFor="productOffPrice">قیمت با تخفیف محصول</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        ref={productImage}
                        value={imgPreview}
                        onChange={imgUploadedView}
                        type="text"
                        className="form-control"
                        id="productImage"
                        placeholder="لینک تصویر محصول"
                    />
                    <label className="form-label" htmlFor="productImage">لینک تصویر محصول</label>
                    {productImage.current
                        ?
                        <img className="product-image-preview" src={productImage.current.value} alt=""/>
                        :
                        null
                    }
                </div>
                <div className="form-check form-switch form-check-reverse mb-3">
                    <input
                        ref={productFeat}
                        type="checkbox"
                        className="form-check-input"
                        role="switch"
                        id="productFeat"
                    />
                    <label className="form-check-label" htmlFor="productFeat">محصول ویژه است</label>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-success">افزودن محصول</button>
                </div>
            </form>
        </div>
    );
}

export default AddProductForm;