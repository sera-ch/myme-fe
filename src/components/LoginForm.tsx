import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

function LoginForm() {
    const navigate = useNavigate();
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [invalidPass, setInvalidPass] = useState(false)
    const apiBaseUrl = process.env.API_BASE_URL;
    return (
        <>
            <Header search={false} ></Header>
            <div className='row'>
                <div className='col-4'>
                </div>
                <form id='login-form' onSubmit={login} className='col-4'>
                    <div className='input row'>
                        <label htmlFor='username' className='col-3 required'>
                            Username
                        </label>
                        <input id='username' name='username' onChange={(event) => validateUsername(event)} type='text' className={invalidUsername ? 'col-9 invalid' : 'col-9'} required />
                    </div>
                    <div className='input row'>
                        <label htmlFor='password' className='col-3 required'>
                            Password
                        </label>
                        <input id='password' name='password' onChange={(event) => validatePass(event)} type='password' className={invalidPass ? 'col-9 invalid' : 'col-9'} required />
                    </div>
                    <div className='input row'>
                        <button type='submit' id='submit' className='col-3'>Login</button>
                    </div>
                </form>
                <div className='col-4'>
                </div>
            </div>
        </>
    );

    function validateUsername(event: any) {
        setInvalidUsername(event.target.value == '')
    }

    function validatePass(event: any) {
        setInvalidPass(event.target.value == '')
    }

    function login(event: any) {
        event.preventDefault();
        const username = event.target[0].value
        const password = event.target[1].value
        if (username == '' || password == '') {
            if (username == '') {
                setInvalidUsername(true)
            }
            if (password == '') {
                setInvalidPass(true)
            }
            return
        }
        setInvalidUsername(false)
        setInvalidPass(false)
        const request = {
            username: username,
            password: password
        }
        axios.post(
            apiBaseUrl + '/user',
            request
        ).then(response => {
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('userRole', response.data.role);
                navigate("/")
        }).catch(error => {
            navigate("/error", { state: { code: error.response.data.code, message: error.response.data.message } })
        })
    }
}

export default LoginForm;