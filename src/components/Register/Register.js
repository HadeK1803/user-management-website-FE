import './Register.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';


const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }
    const isValidInputs = () => {
        if (!email) {
            toast.error("Email is required");
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Email is not valid");
            return false;
        }
        if (!phone) {
            toast.error("Phone is required");
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            return false;
        }
        if (password != confirmPassword) {
            toast.error("Password is not the same");
            return false;
        }
        return true;
    }

    const handleClickedRegister = () => {
        let userData = { email, phone, username, password, confirmPassword };
        console.log(userData);
        let check = isValidInputs();
    }


    useEffect(() => {
        // axios.get("http://localhost:8080/api/testApi").then(data => {
        //     console.log(">>>Check data: ", data);
        // })
    }, [])
    return (
        <div className="register-container p-sm-5">
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
                        <div className="form-group">
                            <label for="email" className=''>Email</label>
                            <input type='email' className='form-control' id="email" placeholder='Enter email'
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="phone" className=''> Phone number</label>
                            <input type='text' className='form-control' id="phone" placeholder='Enter phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="username" className=''>Username</label>
                            <input type='text' className='form-control' id="username" placeholder='Enter username'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="password" className=''>Password</label>
                            <input type='password' className='form-control' id="password" placeholder='Enter password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="retypePassword" className=''>Re-type password</label>
                            <input type='password' className='form-control' id="retypePassword" placeholder='Enter password again'
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            ></input>
                        </div>
                        <button className='btn btn-primary' onClick={() => handleClickedRegister()}>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already have an account? Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;