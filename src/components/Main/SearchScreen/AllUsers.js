import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import userService from '../../service/userService'
import './search.css';
import Header from "../Header";
import {Helmet} from 'react-helmet';

const AllUsers = () => {

    // get login user information
    // const dispatch = useDispatch();
    // const history = useHistory();
    // useEffect(() => getUser(dispatch), [history, dispatch]);
    //
    // let user = useSelector(selectProfile);


    // const getUser = () => {
    //     getProfile()
    //         // .then(res => setUser(profile))
    //         .then(newUser => {
    //             // console.log("returned from SESSION", newUser.favRecipeList);
    //             if (newUser.username && newUser.password) {
    //                 user = newUser;
    //             } else {
    //                 history.push('/login');
    //             }
    //             if (user.role !== 'admin') {
    //                 history.push('/');
    //             }
    //         })
    //
    //         .catch(e => history.push('/login'));
    //     // .catch(e => console.log(e));
    // }

    const [userList, setUserList] = useState([]);
    useEffect(() => {
        userService.getAllUsers()
            .then(data => {
                // console.log("menu list ", data.recipeList);
                setUserList(data);
            })
    }, []);

    console.log(userList);

    const mid = Math.round(userList.length / 2);

    const deleteUser = (userId) => {
        console.log("to delete ", userId);
        userService.deleteUser(userId)
            .then(data => {
                setUserList(userList.filter(item=> item.id !== userId));
                console.log("user deleted");
            })
    }

    const changeRole = (userId, currentRole) => {
        console.log("current role--", currentRole);
        userService.changeRole(userId, currentRole)
            .then(res => {
                console.log("---", res)
                if (res.ok){
                    const newRole = (currentRole === 'editor') ?  'normal' : 'editor';
                    setUserList(userList.map(user => {
                        if (user.id === userId) {
                            user.role = newRole;
                            return user;
                        } else return user;
                    }));
             
                    console.log("role changed");
                } else throw res;
            })
            .catch(e =>console.log(e));
    }

    return (
        <>
            <Helmet>
                <title>User Management | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active="none"/>

                <img className="wd-search-bg"
                     src="/images/search-bg.jpg"
                     alt=""/>

                <div className="text-center my-4">
                    <h1 className="wd-menu-title">- User Management -</h1>
                    <h6 className="my-2 text-black">Changes will be applied immediately.</h6>
                </div>

                <div className="row justify-content-evenly">
                    <ul className="list-group wd-search-result col-12 col-md-6 row border-0">
                        {userList.slice(0, mid)
                            .map(item => {
                            return (
                                <>
                                    <Link to={`/profile/${item.id}`}>
                                        <li className="list-group-item wd-search-result-item d-flex"
                                            key={item.id}>

                                        <span>
                                            <img className="wd-search-result-image"
                                                 src={item.userAvatar} alt=""/>
                                        </span>

                                            <span className="ms-3">
                                            <h4 className="wd-search-result-name fw-bold wd-color-coral">{item.username}</h4>
                                            <h6 className="my-1">Role: &nbsp;&nbsp;&nbsp;&nbsp;{item.role}</h6>
                                            <h6>ID: {item.id}</h6>
                                    </span>
                                        </li>
                                    </Link>
                                    <div className="ms-2 d-flex">
                                        <button className="btn btn-outline-danger mx-2"
                                                onClick={() => deleteUser(item.id)}> Delete User
                                        </button>

                                        <button className="btn btn-outline-primary mx-2"
                                                onClick={() => changeRole(item.id, item.role)}> Change Role
                                        </button>
                                    </div>

                                </>
                            )
                        })}
                    </ul>
                    <ul className="list-group wd-search-result col-12 col-md-6 row border-0">
                        {userList.slice(mid, userList.length).filter(user => user.role !== 'admin')
                            .map(item => {
                                return (
                                    <>
                                        <Link to={`/profile/${item.id}`}>
                                            <li className="list-group-item wd-search-result-item d-flex"
                                                key={item.id}>
    
                                            <span>
                                                <img className="wd-search-result-image"
                                                     src={item.userAvatar} alt=""/>
                                            </span>
                                                <span className="ms-3">
                                                <h4 className="wd-search-result-name fw-bold wd-color-coral">{item.username}</h4>
                                                <h6 className="my-1">Role: &nbsp;&nbsp;&nbsp;&nbsp;{item.role}</h6>
                                                <h6>ID: {item.id}</h6>
                                                </span>
                                            </li>
                                        </Link>
                                        <div className="ms-2 d-flex">
                                            <button className="btn btn-outline-danger mx-2"
                                                    onClick={() => deleteUser(item.id)}> Delete User
                                            </button>

                                            <button className="btn btn-outline-primary mx-2"
                                                    onClick={() => changeRole(item.id, item.role)}> Change Role
                                            </button>
                                        </div>


                                    </>
                                )
                            }
                        )}
                    </ul>
                </div>
            </div>
        </>

    );
};
export default AllUsers;
