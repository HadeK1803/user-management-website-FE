import './GroupRole.scss';
import { useState, useEffect } from 'react';
import { fetchGroup } from '../../services/userService';
import { toast } from 'react-toastify';
import { getAllRoles, getRolesByGroupId, assignRolesToGroup } from '../../services/roleService';

import _ from 'lodash';

const GroupRole = () => {
    const [listGroup, setListGroup] = useState([]);
    const [listRole, setListRole] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");

    const [assignedRolesByGroup, setAssignedRolesByGroup] = useState([])

    useEffect(() => {
        fetchGroups();
        fetchAllRoles();
    }, [])

    const fetchGroups = async () => {
        let response = await fetchGroup();
        if (response && +response.EC === 0) {
            if (response.DT && response.DT.length > 0) {
                setListGroup(response.DT);
            }
        } else {
            toast.error(response.EM);
        }
    }

    const fetchAllRoles = async () => {
        let response = await getAllRoles();
        if (response && +response.EC === 0) {
            setListRole(response.DT);
        }
    }

    //build list of assigned role
    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map((role, index) => {

                let object = {};
                object.id = role.id;
                object.url = role.url;
                object.description = role.description;
                object.isAssigned = false;

                // Find url that is assigned
                if (groupRoles && groupRoles.length > 0) {
                    // Find url that is Assigned then set isAssigned property to true
                    object.isAssigned = groupRoles.some((item) => item.url === object.url)
                }
                result.push(object);
            })
        }
        return result;
    }
    //Handle onchange Group event
    const handleOnchangeGroup = async (groupId) => {
        setSelectGroup(groupId);
        if (groupId) {
            // Invoke api to get roles by group id
            let response = await getRolesByGroupId(groupId);
            if (response && +response.EC === 0) {
                //build list of assigned role
                let result = buildDataRolesByGroup(response.DT.Roles, listRole);
                setAssignedRolesByGroup(result);
            } else {
                toast.error(response.EM);
            }
        }
    }
    //Handle onchange role (check box) event
    const handleOnchangeRole = (roleId) => {
        let _assignedRolesByGroup = _.cloneDeep(assignedRolesByGroup);
        let foundIndex = _assignedRolesByGroup.findIndex(item => +item.id === +roleId);
        if (foundIndex > -1) {
            _assignedRolesByGroup[foundIndex].isAssigned = !_assignedRolesByGroup[foundIndex].isAssigned;
            setAssignedRolesByGroup(_assignedRolesByGroup);
        }
    }

    //Build data to assign roles to group
    // data ={ groupId: '', [{groupId: '', roleId: ''}, {groupId: '', roleId:''}, ...rest]}

    const buildDatatoAssignRolesToGroup = () => {
        let data = {};
        let groupRoleArr = [];
        let _assignedRolesByGroup = _.cloneDeep(assignedRolesByGroup);

        // data = _assignedRolesByGroup.filter(item => item.isAssigned === true);
        // return data;
        _assignedRolesByGroup.map(item => {
            if (item.isAssigned === true) {
                groupRoleArr.push({
                    groupId: +selectGroup,
                    roleId: item.id
                })
            }
        });
        data.groupId = +selectGroup;
        data.groupRole = groupRoleArr;
        return data;
    }

    // Handle onclick save button event
    const handleOnclickSave = async () => {
        // assignRolesToGroup
        let finalArr = buildDatatoAssignRolesToGroup();
        let response = await assignRolesToGroup(finalArr);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }

    }

    return (
        <>
            <div className='group-role-container'>
                <div className='container'>
                    <div className='title mt-3'>
                        <h2>Group Permissions</h2>
                    </div>
                    <div className='list-group'>
                        <h4>Select Group:</h4>
                        <div className='col-12 col-sm-4 form-group'>
                            <select className='form-select'
                                aria-label="Default select example"
                                // onChange={(event) => handleOnchangeInput(event.target.value, "group")}
                                // value={userData.group ? userData.group : ""}
                                onChange={(event) => handleOnchangeGroup(event.target.value)}

                            >
                                <option value="">Please select your group</option>
                                {
                                    listGroup.length > 0 && listGroup.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}
                                            </option>
                                        )

                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className='list-role'>
                        <h5>Assigned role:</h5 >
                        {
                            selectGroup &&
                            <div className=''>
                                <div className=''>
                                    {
                                        assignedRolesByGroup && assignedRolesByGroup.length > 0
                                        && assignedRolesByGroup.map((item, index) => {
                                            return (
                                                <>
                                                    <div className="form-check" key={`list-role-${index}`}>
                                                        <input className="form-check-input"
                                                            type="checkbox"
                                                            value={item.id}
                                                            id={`list-role-${index}`}
                                                            checked={item.isAssigned}
                                                            onChange={(event) => handleOnchangeRole(event.target.value)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                            {item.url}
                                                        </label>
                                                    </div>
                                                </>

                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <button className='btn btn-success mt-2'
                                        onClick={() => handleOnclickSave()}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>

                        }
                    </div>


                </div>
            </div >
        </>
    )
}
export default GroupRole;