import "./header.css";
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {USER_LOG_OUT} from "../../Redux/authSlice";

export default function Header() {
    const dispatch = useDispatch()
    const {cart} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.auth)

    const onSignOut = () => {
        dispatch(USER_LOG_OUT())
    }

    let activeClassName = "active-link";

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
                                    {user && user.email === 'mansour.sarhani@gmail.com' &&
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
                                {user ?
                                    <>
                                        <li className="nav-item">
                                            <Link to={"/"} onClick={onSignOut}>
                                                خروج
                                            </Link>
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
                                    {cart && <span className="nav-cart-qty">{cart.length}</span>}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
