import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { fetchGroup, createNewUser } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {

    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, [])

    // Automatically load groups info
    const getGroups = async () => {
        let response = await fetchGroup();
        if (response && response.data && +response.data.EC === 0) {
            setUserGroups(response.data.DT);
            if (response.data.DT && response.data.DT.length > 0) {
                let groups = response.data.DT;

                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(response.data.EM);
        }
    }
    let defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
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
        // setValidInputs(defaultValidInputs);
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
    // Handle clicked save button (Create user)
    const handleClickSave = async () => {
        let check = isValidInputs();
        if (check === true) {
            let response = await createNewUser({ ...userData, groupId: userData['group'] });
            if (response && response.data && +response.data.EC === 0) {
                toast.success(response.data.EM);
                // Hide Modal User after saving new user
                props.onHide();
                // Reset user data after saving new user
                setUserData({ ...defaultUserData, group: userGroups[0].id });
            }
            else {
                toast.error(response.data.EM);
            }
        }
        console.log(userData);
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.onHide} className='modal-user'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>{props.title}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Email address (<span className='red'>*</span>):</label>
                        <input className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                            type='email'
                            value={userData.email}
                            onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                        ></input>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Phone number (<span className='red'>*</span>):</label>
                        <input className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
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
                        <label>Password (<span className='red'>*</span>):</label>
                        <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                            type='password'
                            value={userData.password}
                            onChange={(event) => handleOnchangeInput(event.target.value, "password")}

                        ></input>
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

                        >
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
                    onClick={props.onHide}
                >
                    Close
                </Button>
                <Button variant="primary"
                    onClick={() => handleClickSave()}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ModalUser;