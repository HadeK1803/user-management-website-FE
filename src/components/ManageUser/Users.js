import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './users.scss';
import { toast } from 'react-toastify';

import { fetchAllUsers, deleteUser } from '../../services/userService'

import ModalDelete from './ModalDelete';

import ModalUser from './ModalUser';


const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalUser, setIsShowModalUser] = useState(false);

    const [dataModal, setDataModal] = useState({});

    useEffect(() => {
        fetchUsers();
    }, [currentPage])

    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit);
        if (response && response.data && +response.data.EC === 0) {

            setListUsers(response.data.DT.users);

            setTotalPages(response.data.DT.totalPages);
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        // await fetchUsers(+event.selected + 1);
    }
    // Handle when clicked delete user button
    const handleDeleteUser = async (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    }
    // Handle close modal
    const handleClose = () => {
        setDataModal({});
        setIsShowModalDelete(false);

    }
    // Handle when user is clicked confirm delete user button in Modal
    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);

        if (response && response.data && +response.data.EC === 0) {
            toast.success(response.data.EM);
            handleClose();
            await fetchUsers();
        }
        if (response && response.data && +response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
    }
    const onHideModalUser = () => {
        setIsShowModalUser(false);
    }
    return (
        <>
            <div className='container'>

                <div className='manage-user-container'>
                    <div className='user-header'>
                        <div className='title'>
                            <h3>Table users</h3>
                        </div>
                        <div className='action'>
                            <button className='btn btn-success'>Refresh</button>
                            <button className='btn btn-primary' onClick={() => setIsShowModalUser(true)}>Add new user</button>
                        </div>
                    </div>
                    <div className='user-body'>
                        <table className="table table-hover table-bordered border-primary">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className='btn btn-warning mx-3'>Edit</button>
                                                        <button className='btn btn-danger'
                                                            onClick={() => handleDeleteUser(item)}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td>
                                                <span>Not found users</span>
                                            </td>
                                        </tr>
                                    </>
                                }

                            </tbody>
                        </table>

                    </div>
                    {totalPages > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>

            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                title="Create a new user"
                show={isShowModalUser}
                onHide={onHideModalUser}
            />
        </>
    )
}
export default Users;