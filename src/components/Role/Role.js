import './Role.scss';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import { createRoles } from '../../services/roleService';

const Role = (props) => {
    let defaultDataChild = {
        url: '',
        description: '',
        isValidInput: true
    }
    const [listChild, setListChild] = useState({
        child1: defaultDataChild
    })
    const handleOnchangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[key][name] = value;
        if (value && name === 'url') {
            _listChild[key]['isValidInput'] = true;
        }
        setListChild(_listChild);
    }
    const handleAddNewRole = () => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[`child${uuidv4()}`] = defaultDataChild;
        setListChild(_listChild);

    }
    const handleDeleteRole = (key) => {
        let _listChild = _.cloneDeep(listChild);
        delete _listChild[key]
        setListChild(_listChild);

    }

    const buildDataToPersist = () => {
        let _listChild = _.cloneDeep(listChild);
        let result = [];
        Object.entries(listChild).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result;
    }

    const handleClickSave = async () => {

        let invalidObj = Object.entries(listChild).find(([key, child], index) => {
            return child && !child.url;
        })

        if (!invalidObj) {
            //call api
            let data = buildDataToPersist();

            let response = await createRoles(data);

            if (response && +response.EC === 0) {
                toast.success(response.EM);
            } else {
                toast.error(response.EM);
            }
        }
        else {
            toast.error("URL must be provided");
            let _listChild = _.cloneDeep(listChild);
            let key = invalidObj[0];
            _listChild[key]['isValidInput'] = false;
            setListChild(_listChild);
        }
    }
    return (
        <div className='role-container'>
            <div className='container'>

                <div className='role-title mt-3'>
                    <h3>
                        Adding a new role
                    </h3>
                </div>
                <div className='role-body'>
                    {
                        Object.entries(listChild).map(([key, child], index) => {
                            return (
                                <div className='row col-12 role-child ' key={`child-${key}`}>
                                    <div className='col-5 form-group'>
                                        <label>URL:</label>
                                        <input type='text'
                                            className={child.isValidInput ? 'form-control' : 'form-control is-invalid'}
                                            value={child.url}
                                            onChange={(event) => handleOnchangeInput('url', event.target.value, key)}
                                        />
                                    </div>
                                    <div className='col-5 form-group'>
                                        <label>Description:</label>
                                        <input type='text'
                                            className='form-control'
                                            value={child.description}
                                            onChange={(event) => handleOnchangeInput('description', event.target.value, key)}
                                        />
                                    </div>
                                    <div className='col-2 mt-4 actions'>
                                        <i className="fa fa-plus-circle add"
                                            onClick={() => handleAddNewRole()}
                                        ></i>
                                        {
                                            Object.keys(listChild).length === 1 ?
                                                ''
                                                :
                                                <i className="fa fa-trash delete"
                                                    onClick={() => handleDeleteRole(key)}
                                                ></i>
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }

                    <div>
                        <button className='btn btn-warning mt-3'
                            onClick={() => handleClickSave()}
                        >Save</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Role;