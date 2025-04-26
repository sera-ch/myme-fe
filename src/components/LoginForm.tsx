import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { SyntheticEvent, useState } from "react";
import form from "../objects/Form";

function LoginForm() {
    const navigate = useNavigate();
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [invalidPass, setInvalidPass] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const apiBaseUrl = process.env.API_BASE_URL;
    return (
        <>
            <Header search={false} ></Header>
            <div className='row'>
                <div className='col-4'>
                </div>
                <form id='login-form' onSubmit={event => login(event, event as unknown as form)} className={ disabled ? 'col-4 disabled' : 'col-4'}>
                    <div className='error-message'>
                        { errorMessage }
                    </div>
                    <div className='input row'>
                        <label htmlFor='username' className='col-3 required'>
                            Username
                        </label>
                        <input disabled={disabled} id='username' name='username' onChange={(event) => validateUsername(event)} type='text' className={invalidUsername ? 'col-9 invalid' : 'col-9'} required />
                    </div>
                    <div className='input row'>
                        <label htmlFor='password' className='col-3 required'>
                            Password
                        </label>
                        <input disabled={disabled} id='password' name='password' onChange={(event) => validatePass(event)} type='password' className={invalidPass ? 'col-9 invalid' : 'col-9'} required />
                    </div>
                    <div className='input row'>
                        <button disabled={disabled} type='submit' id='submit' className='col-3'>Login</button>
                    </div>
                </form>
                <div className='col-4'>
                </div>
            </div>
        </>
    );

    function validateUsername(event: SyntheticEvent) {
        setInvalidUsername((event.target as HTMLInputElement).value == '')
    }

    function validatePass(event: SyntheticEvent) {
        setInvalidPass((event.target as HTMLInputElement).value == '')
    }

    function login(event: SyntheticEvent, form: form) {
        event.preventDefault();
        const username = form.target[0].value
        const password = form.target[1].value
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
        setDisabled(true);
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
            if (error.response.data.code == 300400 || error.response.data.code == 300404) {
                setInvalidUsername(true)
                setInvalidPass(true)
                setDisabled(false)
                setErrorMessage('Username or password is incorrect')
            }
            else {
                navigate("/error", { state: { code: error.response.data.code, message: error.response.data.message } })
            }
        })
    }
}

export default LoginForm;