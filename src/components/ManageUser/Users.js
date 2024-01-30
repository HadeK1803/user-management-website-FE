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

    // Modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [dataModal, setDataModal] = useState({});

    //Modal user (create and update)
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalUser, setDataModalUser] = useState({});

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
    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setDataModalUser({});
        await fetchUsers();

    }

    const handleEditUser = (user) => {
        setDataModalUser(user);
        setIsShowModalUser(true);
        setActionModalUser('UPDATE');
    }
    const handleClickedRefresh = async () => {
        toast.success("Refresh successfully");
        await fetchUsers();
    }
    return (
        <>
            <div className='container'>

                <div className='manage-user-container'>
                    <div className='user-header'>
                        <div className='title mt-3'>
                            <h3>User List</h3>
                        </div>
                        <div className='action my-3'>
                            <button className='btn btn-success'
                                onClick={() => handleClickedRefresh()}
                            >
                                <i class="fa fa-refresh"></i>
                                Refresh
                            </button>
                            <button className='btn btn-primary mx-3'
                                onClick={() => { setIsShowModalUser(true); setActionModalUser("CREATE"); }}
                            >
                                <i class="fa fa-plus-circle"></i>
                                Add new user
                            </button>
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
                                    <th scope="col">Gender</th>
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
                                                    <td>{item.sex === true ? "Male" : "Female"}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className='btn btn-warning mx-3'
                                                            onClick={() => handleEditUser(item)}
                                                        >
                                                            <i class="fa fa-pencil"></i>
                                                            Edit
                                                        </button>
                                                        <button className='btn btn-danger'
                                                            onClick={() => handleDeleteUser(item)}
                                                        >
                                                            <i class="fa fa-trash"></i>
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

            </div >
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                action={actionModalUser}
                show={isShowModalUser}
                onHide={onHideModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    )
}
export default Users;