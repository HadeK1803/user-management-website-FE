import './Home.scss';

const Home = () => {
    return (
        <>
            <div className='home-container'>
                <div className='container'>
                    <div className='title my-3'>
                        <h2>
                            Welcome to user management website
                        </h2>
                    </div>
                    <hr />
                    <div className='body'>
                        <div className='description'>
                            <div className='description-title'>
                                <h4>
                                    About this website, this is my self-learning personal project, where you can easily and efficiently experience the following features:
                                </h4>
                            </div>
                            <div className='description-body'>
                                <div className="feature">
                                    <h5>1. Login and Registration:</h5>
                                    <p>My website provides the feature to login and register an account, allowing users to access my services and features. Registering an account will enable you to experience all the utilities and enhance your user experience.</p>
                                </div>

                                <div className="feature">
                                    <h5>2. User CRUD (Create, Read, Update, Delete):</h5>
                                    <p>The CRUD functionality for users allows you to manage your personal information flexibly. You can easily create, view, update, and delete your account information.</p>
                                </div>

                                <div className="feature">
                                    <h5>3. User authorization:</h5>
                                    <p>I understand that each user has different needs and rights. Therefore, my website provides authorization functionality, allowing administrators to manage and control user permissions. This helps create a safe and secure environment for all members.</p>
                                </div>
                                <div className="feature">
                                    <h5>4. User grouping and Group permissions:</h5>
                                    <p>User grouping allows my platform to organize users into distinct groups based on various criteria such as roles, interests, or organizational structures. By grouping users, I can streamline communication, collaboration, and access control within my community.</p>
                                    <p>Group permissions empower administrators to define specific permissions and access levels for each user group. This feature ensures that users within each group have appropriate access to resources and functionalities based on their roles and responsibilities.</p>
                                </div>

                                <p><i>Thank you for visiting, and I wish you an enjoyable experience on my website!</i></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}
export default Home;