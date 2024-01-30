import './Login.scss';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
const Login = (props) => {
    let history = useHistory();
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            history.push("/");
        }

    }, []);

    const defaultValidInputs = {
        isValidLogin: true,
        isValidPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInputs);

    const handleCreateNewAccount = () => {
        history.push("/register");
    }

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInputs);
        if (!valueLogin) {
            toast.error("Please enter your email or your phone number");
            setObjCheckInput({ ...defaultValidInputs, isValidLogin: false });
            return false;
        }
        if (!password || password.length < 8) {
            toast.error("Your password must be at least 8 characters");
            setObjCheckInput({ ...defaultValidInputs, isValidPassword: false });
            return false;
        }
        return true;
    }
    const handleLogin = async () => {

        let check = isValidInputs();
        let userData = { valueLogin, password };
        if (check === true) {
            let response = await loginUser(userData);

            if (response && +response.EC === 0) {
                toast.success("Login successfully");

                let data = {
                    isAuthenticated: true,
                    token: 'fake token',
                }
                //set session
                sessionStorage.setItem("account", JSON.stringify(data));

                history.push("/users");
                window.location.reload();
            }
            if (response && +response.EC !== 0) {
                toast.error(response.EM);
            }
        }
    }
    const handlePressEnter = (event) => {
        console.log(event);
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin();
        }
    }
    return (
        <div className="login-container p-sm-5">
            <div className="container">
                <div className='row'>
                    <div className='content-left col-12 col-sm-7 d-none d-sm-block'>
                        <div className='brand'>
                            HadeK
                        </div>
                        <div className='detail'>
                            User management website
                        </div>
                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none '>
                            HadeK
                        </div>
                        <input
                            type='text'
                            className={objCheckInput.isValidLogin ? 'form-control' : 'form-control is-invalid'}

                            placeholder='Email or phone number'
                            value={valueLogin} onChange={(event) => setValueLogin(event.target.value)}
                        ></input>
                        <input
                            type='password'
                            className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Password'
                            value={password} onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handlePressEnter(event)}

                        ></input>
                        <button
                            className='btn btn-primary'
                            onClick={() => handleLogin()}
                        >Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href="#">
                                Forgot your password?
                            </a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;