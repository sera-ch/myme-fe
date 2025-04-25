import { useEffect, useState } from "react";
import { ArrowRight } from "react-bootstrap-icons";
import { replace, useLocation, useNavigate } from "react-router-dom";

function Header({ search }: {search:boolean}) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const path = useLocation().pathname;

    useEffect(() => {
        setLoggedIn(sessionStorage.getItem('token') != undefined);
        setUserRole(sessionStorage.getItem('userRole'));
    }, [])

    return (
        <>
            <div className='header row col-10'>
                <nav>
                    <ul>
                        <a href='/'>
                            <li className='logo'>
                                <h1>Myme</h1>
                            </li>
                        </a>
                        {
                            loggedIn && userRole == 'ADMIN' ? (
                                <>
                                    <a href='' onClick={ navigateToUpload } id='item-upload-meme' className='menu-item'>
                                        <li>
                                            Upload meme
                                        </li>
                                    </a>
                                    <a href='' id='logout' onClick={logOut} className='menu-item'>
                                        <li>
                                            Log out
                                        </li>
                                     </a>
                                </>
                            ) : (
                                    <a href='' onClick={ navigateToLogin } id='login' className='menu-item'>
                                    <li>
                                        Login
                                    </li>
                                </a>
                            )
                        }
                    </ul>
                </nav>
                <div>
                    <span className='breadcrumb small'>
                        { path }
                    </span>
                </div>
                {
                    search ? (
                        <form className='search-form row d-none d-xxl-block' onSubmit={(event) => searchMeme(event)}>
                            <input className='search-bar col-8' type='text' onChange={ (event) => setQuery(event.target.value) } placeholder='Input text' />
                            <button className='col-1 btn search-btn' type='submit' disabled={query == ''}>Search</button>
                            <button className='col-2 btn search-btn' type='submit' onClick={(event) => advancedSearch(event)}>Advanced search</button>
                        </form>
                    ) : ''
                }
            </div>
        </>
    )

    function navigateToLogin(event: any) {
        event.preventDefault()
        navigate('/login', {replace: true})
    }

    function navigateToUpload(event: any) {
        event.preventDefault()
        navigate('/upload', {replace: true})
    }

    function logOut(event: any) {
        event.preventDefault()
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("token");
        setUserRole('');
        setLoggedIn(false);
    }

    function searchMeme(event: any) {
        event.preventDefault()
        navigate('/search', { state: event.target[0].value, replace: true })
    }

    function advancedSearch(event: any) {
        event.preventDefault()
        navigate('/search/advanced', {replace: true})
    }

}

export default Header;