import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import getOneProduct from "../../../Services/getOneProduct";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {EDIT_PRODUCT} from "../../../Redux/productsSlice";

function EditProductForm() {
    const dispatch = useDispatch()

    const redirect = useNavigate()
    const passedState = useLocation();
    const { productVal } = passedState.state;

    const [product, setProduct] = useState({
        name: productVal.name,
        desc: productVal.desc,
        price: productVal.price,
        offPrice: productVal.offPrice,
        image: productVal.image,
        feat: productVal.feat,
        uid: productVal.uid,
        date: productVal.date,
    })
    const [imgPreview, setImgPreview] = useState(productVal.image);
    const [switchVal, setSwitchVal] = useState(productVal.feat);

    const imgInput = useRef();

    const fetchedId = useParams()
    const productId = fetchedId.id

    useEffect(() => {
        setProduct((prevState) => ({
            ...prevState,
            feat: switchVal
        }))
        setImgPreview(imgPreview)
        // eslint-disable-next-line
    }, [switchVal, imgPreview]);

    useEffect(() => {
        const fetchedProduct = async () => {
            try {
                const {data} = await getOneProduct(productId)
                setProduct({
                    name: data.name,
                    desc: data.desc,
                    price: data.price,
                    offPrice: data.offPrice,
                    image: data.image,
                    feat: data.feat,
                    uid: data.uid,
                    date: data.date,
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchedProduct()
    }, [productId])

    const switchHandler = (e) => {
        const curVal = e.target.checked
        setSwitchVal(curVal)
    }

    const replaceOrgImage = () => {
        setImgPreview(productVal.image)
        imgInput.current.value = productVal.image
        setProduct({
            ...product,
            image: productVal.image
        })
    }

    const changeHandler = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        })
        if (e.target.name === 'image') {
            setImgPreview(e.target.value)
        }
    }

    const editProductSubmit = (e) => {
        e.preventDefault()
        dispatch(EDIT_PRODUCT({productId, product}))
        toast.warning('محصول با موفقیت ویرایش شد')
        redirect("/admin/dashboard")
    }

    return (
        <div>
            <form className="add-product-form" onSubmit={editProductSubmit}>
                <div className="form-floating mb-3">
                    <input
                        defaultValue={product.name}
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="productName"
                        name="name"
                        placeholder="نام محصول"
                    />
                    <label className="form-label" htmlFor="productName">نام محصول</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        defaultValue={product.desc}
                        onChange={changeHandler}
                        className="form-control"
                        id="productDesc"
                        name="desc"
                        placeholder="Leave a comment here"
                        style={{height: 200}}
                    />
                    <label htmlFor="productDesc">توضیحات محصول</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        defaultValue={product.price}
                        onChange={changeHandler}
                        type="number"
                        className="form-control"
                        id="productPrice"
                        name="price"
                        placeholder="قیمت اصلی محصول"
                    />
                    <label className="form-label" htmlFor="productPrice">قیمت اصلی محصول</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        defaultValue={product.offPrice}
                        onChange={changeHandler}
                        type="number"
                        className="form-control"
                        id="productOffPrice"
                        name="offPrice"
                        placeholder="قیمت با تخفیف محصول"
                    />
                    <label className="form-label" htmlFor="productOffPrice">قیمت با تخفیف محصول</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        defaultValue={product.image}
                        onChange={changeHandler}
                        ref={imgInput}
                        type="text"
                        className="form-control"
                        id="productImage"
                        name="image"
                        placeholder="لینک تصویر محصول"
                    />
                    <label className="form-label" htmlFor="productImage">لینک تصویر محصول</label>
                    {imgPreview ? <img className="product-image-preview" src={imgPreview} alt=""/> : null}
                    {imgPreview !== productVal.image && <p className="replace-org-img" onClick={replaceOrgImage}>بارگذاری تصویر اصلی محصول</p>}
                </div>
                <div className="form-check form-switch form-check-reverse mb-3">
                    <input
                        onChange={switchHandler}
                        defaultChecked={product.feat}
                        value={switchVal}
                        type="checkbox"
                        className="form-check-input"
                        id="productFeat"
                        role="switch"
                    />
                    <label className="form-check-label" htmlFor="productFeat">محصول ویژه است</label>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-success">ویرایش محصول</button>
                </div>
            </form>
        </div>
    );
}

export default EditProductForm;