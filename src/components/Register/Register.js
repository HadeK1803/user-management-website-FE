import './Register.scss';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { registerNewUser } from '../../services/userService';


const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInputs = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInputs);
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }
    const isValidInputs = () => {
        setObjCheckInput(defaultValidInputs);

        if (!email) {
            toast.error("Email is required");
            setObjCheckInput({ ...defaultValidInputs, isValidEmail: false })
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Email is not valid");
            setObjCheckInput({ ...defaultValidInputs, isValidEmail: false })
            return false;
        }
        if (!phone) {
            toast.error("Phone is required");
            setObjCheckInput({ ...defaultValidInputs, isValidPhone: false })

            return false;
        }
        if (!username) {
            toast.error("Username is required");
            setObjCheckInput({ ...defaultValidInputs, isValidUsername: false })
            return false;
        }

        if (!password) {
            toast.error("Password is required");
            setObjCheckInput({ ...defaultValidInputs, isValidPassword: false })

            return false;
        }
        if (password != confirmPassword) {
            toast.error("Password is not the same");
            setObjCheckInput({ ...defaultValidInputs, isValidConfirmPassword: false })

            return false;
        }
        return true;
    }

    const handleClickedRegister = async () => {
        let userData = { email, phone, username, password };
        let check = isValidInputs();
        if (check === true) {
            let response = await registerNewUser(userData);
            let serverData = response;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push("/login");
            }
            else {
                toast.error(serverData.EM);
            }
        }
    }
    const handlePressEnter = (event) => {
        console.log(event);
        if (event.charCode === 13 && event.code === "Enter") {
            handleClickedRegister();
        }
    }


    useEffect(() => {
        // axios.get("http://localhost:8080/api/v1/testApi").then(data => {
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
                            <input type='email'
                                className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                id="email" placeholder='Enter email'
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="phone" className=''> Phone number</label>
                            <input type='text'
                                className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                id="phone" placeholder='Enter phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="username" className=''>Username</label>
                            <input type='text'
                                className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                                id="username" placeholder='Enter username'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="password" className=''>Password</label>
                            <input type='password'
                                className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                id="password" placeholder='Enter password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="retypePassword" className=''>Re-type password</label>
                            <input type='password'
                                className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                                id="retypePassword" placeholder='Enter password again'
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                onKeyPress={(event) => handlePressEnter(event)}
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