import './Register.scss';
import { useHistory } from 'react-router-dom';
const Register = (props) => {
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }
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
                            <input type='email' className='form-control' id="email" placeholder='Enter email'></input>
                        </div>
                        <div className="form-group">
                            <label for="phone" className=''> Phone number</label>
                            <input type='text' className='form-control' id="phone" placeholder='Enter phone number'></input>
                        </div>
                        <div className="form-group">
                            <label for="username" className=''>Username</label>
                            <input type='text' className='form-control' id="username" placeholder='Enter username'></input>
                        </div>
                        <div className="form-group">
                            <label for="password" className=''>Password</label>
                            <input type='password' className='form-control' id="password" placeholder='Enter password'></input>
                        </div>
                        <div className="form-group">
                            <label for="retypePassword" className=''>Re-type password</label>
                            <input type='password' className='form-control' id="retypePassword" placeholder='Enter password again'></input>
                        </div>
                        <button className='btn btn-primary'>Register</button>
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