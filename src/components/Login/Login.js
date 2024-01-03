import './Login.scss';
const Login = (props) => {
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
                        <input type='text' className='form-control' placeholder='Email'></input>
                        <input type='password' className='form-control' placeholder='Password'></input>
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href="#">
                                Forgot your password?
                            </a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;