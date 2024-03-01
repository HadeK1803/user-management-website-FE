import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import { getAllRoles, deleteRole } from '../../services/roleService';

import { toast } from 'react-toastify';


const TableRole = forwardRef((props, ref) => {

    const [listRole, setListRole] = useState([]);

    const fetchAllRoles = async () => {
        let response = await getAllRoles();
        if (response && +response.EC === 0) {
            setListRole(response.DT);
        }
    }

    const handleEditRole = (role) => {
        alert("edit");
    }
    const handleDeleteRole = async (role) => {
        let response = await deleteRole(role);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            fetchAllRoles();
        } else {
            toast.error(response.EM);
        }
    }

    useEffect(() => {
        fetchAllRoles();
    }, [])

    useImperativeHandle(ref, () => ({
        fetchListRoleAgain() {
            fetchAllRoles();
        }
    }))
    return (
        <>
            <div className="table-role-header my-3">
                <h4>
                    List of role
                </h4>
            </div>
            <div className="table-role-body">
                <table className="table table-hover table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">URL</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRole && listRole.length > 0 ?
                            <>
                                {listRole.map((item, index) => {
                                    return (
                                        <tr key={`row-${index}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.url}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <button className='btn btn-warning mx-3'
                                                    onClick={() => handleEditRole(item)}
                                                >
                                                    <i className="fa fa-pencil"></i>
                                                    Edit
                                                </button>
                                                <button className='btn btn-danger'
                                                    onClick={() => handleDeleteRole(item)}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </>
                            :
                            <>
                                <tr>
                                    <td colSpan="4">
                                        <span>Not found roles</span>
                                    </td>
                                </tr>
                            </>
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
})
export default TableRole;