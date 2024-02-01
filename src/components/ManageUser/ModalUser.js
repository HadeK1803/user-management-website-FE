import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { fetchGroup, createNewUser, updateCurrentUser } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {
    const { action, dataModalUser } = props;

    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, [])
    //Change data modal user when clicked update button
    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' });
        }
    }, [dataModalUser]);

    //When user changed action from 'UPDATE' to 'CREATE' 
    // userData is signed with update info not your empty create info(default).
    // => So resign userData with create info
    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                //Set default group value
                setUserData({ ...userData, group: userGroups[0].id, sex: '1' })
            }
        }
    }, [action])

    // Automatically load groups info
    const getGroups = async () => {
        let response = await fetchGroup();
        if (response && +response.EC === 0) {
            setUserGroups(response.DT);
            if (response.DT && response.DT.length > 0) {
                let groups = response.DT;
                //Set default group value
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(response.EM);
        }
    }
    let defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '1',
        group: '',
    }
    const [userData, setUserData] = useState(defaultUserData);

    let defaultValidInputs = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    }
    const [validInputs, setValidInputs] = useState(defaultValidInputs);

    // Check valid input
    const isValidInputs = () => {
        //Check action of modal user
        if (action === 'UPDATE') return true;

        //set default input values is valid
        setValidInputs(defaultValidInputs);
        // arr of required inputs
        let arr = ["email", "phone", "password", "group"];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                //Clone validInputs
                let _validInputs = _.cloneDeep(defaultValidInputs);
                _validInputs[arr[i]] = false;
                //set valid input with clone of validInputs
                setValidInputs(_validInputs);

                toast.error(`Your ${arr[i]} is empty`);
                check = false;
                break;
            }
        }
        return check;
    }

    // Handle onchange input event
    const handleOnchangeInput = (value, name) => {
        //Clone userData with lodash
        let _userData = _.cloneDeep(userData);
        // Overrwrite property 'name' with value
        _userData[name] = value;
        setUserData(_userData);
    }
    // Handle clicked save button (or Create user)
    const handleClickSave = async () => {
        let check = isValidInputs();
        if (check === true) {
            //Invoke api
            let response = action === 'CREATE' ?
                await createNewUser({ ...userData, groupId: userData['group'] })
                : await updateCurrentUser({ ...userData, groupId: userData['group'] });

            // Invoked api successfully
            if (response && +response.EC === 0) {
                toast.success(response.EM);
                // Hide Modal User after saving new user
                handleCloseModal();
                // Reset user data after saving new user
                // setUserData({ ...defaultUserData, group: userGroups[0].id });
            }
            // Invoked api fail
            if (response && +response.EC !== 0) {
                toast.error(response.EM);
                //Clone validInputs
                let _validInputs = _.cloneDeep(defaultValidInputs);
                //set input what is incorrect or not valid
                _validInputs[response.DT] = false;
                //set valid input with clone of validInputs
                setValidInputs(_validInputs);
            }
        }
    }

    const handleCloseModal = () => {
        props.onHide();
        setValidInputs(defaultValidInputs);
        setUserData(defaultUserData);
    }
    return (
        <Modal size="lg" show={props.show} onHide={() => handleCloseModal()} className='modal-user'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>{action === 'CREATE' ? 'Create new user' : 'Edit a user'}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Email address (<span className='red'>*</span>):</label>
                        <input className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                            disabled={action === 'CREATE' ? false : true}
                            type='email'
                            value={userData.email}
                            onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                        ></input>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Phone number (<span className='red'>*</span>):</label>
                        <input className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                            disabled={action === 'CREATE' ? false : true}
                            type='text'
                            value={userData.phone}
                            onChange={(event) => handleOnchangeInput(event.target.value, "phone")}

                        ></input>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Username</label>
                        <input className={validInputs.username ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={userData.username}
                            onChange={(event) => handleOnchangeInput(event.target.value, "username")}

                        ></input>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        {action === 'CREATE' &&
                            <>
                                <label>Password (<span className='red'>*</span>):</label>
                                <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                    type='password'
                                    value={userData.password}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "password")} a
                                ></input>
                            </>
                        }
                    </div>

                    <div className='col-12  form-group'>
                        <label>Address</label>
                        <input className={validInputs.address ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={userData.address}
                            onChange={(event) => handleOnchangeInput(event.target.value, "address")}

                        ></input>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Gender:</label>
                        <select className={validInputs.sex ? 'form-select' : 'form-select is-invalid'}
                            aria-label="Default select example"
                            onChange={(event) => handleOnchangeInput(event.target.value, "sex")}
                            // 
                            value={+userData.sex === 1 ? "1" : "0"}
                        >
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Group (<span className='red'>*</span>):</label>
                        <select className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                            aria-label="Default select example"
                            onChange={(event) => handleOnchangeInput(event.target.value, "group")}
                            value={userData.group ? userData.group : ""}

                        >
                            <option value="">None</option>
                            {
                                userGroups.length > 0 && userGroups.map((item, index) => {
                                    return (
                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                    )

                                })
                            }
                        </select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={() => handleCloseModal()}
                >
                    Close
                </Button>
                <Button variant="primary"
                    onClick={() => handleClickSave()}
                >
                    {action === "UPDATE" ? "Update" : "Save"}
                </Button>
            </Modal.Footer>
        </Modal >
    );
}
export default ModalUser;