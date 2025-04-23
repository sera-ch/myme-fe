import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function LoginForm() {
    const navigate = useNavigate();
    const apiBaseUrl = process.env.API_BASE_URL;
    return (
        <>
            <Header></Header>
            <div className='row'>
                <div className='col-4'>
                </div>
                <form id='login-form' onSubmit={login} className='col-4'>
                    <div className='input row'>
                        <label htmlFor='username' className='col-3'>
                            Username
                        </label>
                        <input id='username' name='username' type='text' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='password' className='col-3'>
                            Password
                        </label>
                        <input id='password' name='password' type='password' className='col-9' />
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

    function login(event: any) {
        event.preventDefault();
        const request = {
            username: event.target[0].value,
            password: event.target[1].value
        }
        axios.post(
            apiBaseUrl + '/user',
            request
        ).then(response => {
            if (response.status == 200) {
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('userRole', response.data.role);
                navigate("/")
            } else {
                navigate("/error", { errorCode: response.data.code })
            }
        });
    }
}

export default LoginForm;