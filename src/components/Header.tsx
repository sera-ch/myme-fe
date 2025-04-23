import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        setLoggedIn(sessionStorage.getItem('token') != undefined);
        setUserRole(sessionStorage.getItem('userRole'));
    }, [])

    return (
        loggedIn && userRole == 'ADMIN' ? (
            <>
                <div className='header row'>
                    <nav>
                        <ul>
                            <a href='/'>
                                <li className='logo'>
                                    <h1>Myme</h1>
                                </li>
                            </a>
                            <a href='upload' id='item-upload-meme' className='menu-item'>
                                <li>
                                    Upload meme
                                </li>
                            </a>
                            <a href='#' id='logout' onClick={logOut} className='menu-item'>
                                <li>
                                    Log out
                                </li>
                            </a>
                        </ul>
                    </nav>
                </div>
            </>
        ) : (
            <>
                <div className='header row'>
                    <nav>
                        <ul>
                            <a href='/'>
                                <li className='logo'>
                                    <h1>Myme</h1>
                                </li>
                            </a>
                            <a href='login' id='login' className='menu-item'>
                                <li>
                                    Login
                                </li>
                            </a>
                        </ul>
                    </nav>
                </div>
            </>
        )
    )

    function logOut(event: any) {
        event.preventDefault()
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("token");
        setUserRole('');
        setLoggedIn(false);
    }

}

export default Header;