import "./header.css";
import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCartState} from "../../Context/Cart/cartContext";
import {useAuthDispatch, useAuthState} from "../../Context/Auth/authContext";

export default function Header() {
    let activeClassName = "active-link";

    const savedUser = useAuthState()
    const dispatch = useAuthDispatch()
    const {cart} = useCartState()

    const [savedCart, setSavedCart] = useState(cart);

    useEffect(() => {
        setSavedCart(cart)
    }, [cart]);

    const onSignOut = () => {
        dispatch({
            type: 'USER_SIGN_OUT'
        })
    }

    return (
        <header className="header-wrapper">
            <div className="container">
                <div className="menu-wrapper">
                    <div className="main-menu-container">
                        <nav className="navbar navbar-expand-lg">
                            <Link to="/" className="navbar-brand">Shop Admin</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#main_menu" aria-controls="main_menu"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="main_menu">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink
                                            to="/"
                                            className={({isActive}) =>
                                                isActive ? activeClassName : undefined
                                            }
                                        >
                                            خانه
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/shop"
                                            className={({isActive}) =>
                                                isActive ? activeClassName : undefined
                                            }
                                        >
                                            فروشگاه
                                        </NavLink>
                                    </li>
                                    {savedUser && savedUser.user && savedUser.user.email === 'mansour.sarhani@gmail.com' &&
                                        <li className="nav-item">
                                            <NavLink
                                                to="/admin"
                                                className={({isActive}) =>
                                                    isActive ? activeClassName : undefined
                                                }
                                            >
                                                ادمین
                                            </NavLink>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="alt-menu-container">
                        <nav className="navbar navbar-expand-lg">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {savedUser.user ?
                                    <>
                                        <li className="nav-item">
                                            <a href="/" onClick={onSignOut}>
                                                خروج
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                to="/profile"
                                                className={({isActive}) =>
                                                    isActive ? activeClassName : undefined
                                                }
                                            >
                                                حساب کاربری
                                            </NavLink>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <NavLink
                                                to="/auth"
                                                className={({isActive}) =>
                                                    isActive ? activeClassName : undefined
                                                }
                                            >
                                                ثبت نام | ورود
                                            </NavLink>
                                        </li>
                                    </>
                                }
                                <li className="nav-item cart-nav">
                                    <NavLink
                                        to="/cart"
                                        className={({isActive}) =>
                                            isActive ? activeClassName : undefined
                                        }
                                    >
                                        سبد خرید
                                    </NavLink>
                                    {savedCart && <span className="nav-cart-qty">{savedCart.length}</span>}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
