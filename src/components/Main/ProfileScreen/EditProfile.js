import React, {useEffect, useState} from 'react'
import "./profile.css";
import {Link, useHistory} from 'react-router-dom'; // must from dom, react-route won't work
import userService, {getProfile} from '../../service/userService'
import {useDispatch, useSelector} from 'react-redux'
import firebase from '../../../firebase'
import Header from "../Header";

const selectProfile = (profile) => profile;

const EditProfile = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => getUser(dispatch), [history, dispatch]);

    let profile = useSelector(selectProfile);

    const [location, setLocation] = useState(profile.location);
    const [bio, setBio] = useState(profile.bio);
    const [dateOfBirth, setDOB] = useState(profile.dateOfBirth);

    const [imageName, setImageName] = useState("");
    const [imageUrl, setImageUrl] = useState(profile.userAvatar);

    const redirectLogin = () => {
        history.push('/login');
    }

    const getUser = (dispatch) => {
        getProfile(dispatch)
            .then(newUser => {
                // console.log("returned from SESSION", newUser.favRecipeList);
                if (newUser.username && newUser.password) {
                    profile = newUser;
                    // setImageUrl(profile.userAvatar);
                    console.log("imageUrl");
                    console.log(imageUrl);
                } else {
                    redirectLogin();
                }
            })
            .catch(e => redirectLogin());
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        // setImage(file);
        const name = file.name + "-" + Date.now();
        setImageName(name);
        let storageRef = firebase.storage().ref(`${name}`);
        let uploadTask = storageRef.put(file);
        uploadTask
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                () => {
                    let downloadUrl = uploadTask.snapshot.getDownloadURL;
                })
    }

    const handleSave = () => {
      
        let storageRef = firebase.storage().ref();
        // let spaceRef = storageRef.child(imageName);
        storageRef.child(imageName).getDownloadURL()
            .then(url => {
                setImageUrl(url)
            })

    }

    // const logoutHandler = (dispatch) => {
    //     logout(dispatch)
    //         .then(res => {
    //             // history.push("/");
    //         });
    // }

    const saveProfile = (dispatch) => {
        const newProfile = {
            ...profile,
            location,
            bio,
            dateOfBirth,
            userAvatar: imageUrl
        };

        // console.log("newProfile 88888888888888888888");
        // console.log(newProfile);

        userService.updateProfile(dispatch, newProfile)
            .then(res => {
                alert("Profile updated.")
            })

    }

    return (
        <>
            <div className="container mt-2">
                <Header active='profile'/>

                <div className="row align-items-top">
                    <div className="d-none d-md-block col-md-4">
                        <img className="wd-create-bg"
                             src="/images/edit-bg.jpg"
                             alt=""/>
                    </div>
                    <div className="d-block d-md-none col-12 mb-3">
                        <img className="wd-create-bg-small"
                             src="/images/edit-bg-small.jpg"
                             alt=""/>
                    </div>

                    {/*start form*/}

                    <div className="col-12 col-md-8">

                        <Link to="/profile">
                            <div className="d-flex">
                                <i className="fas fa-arrow-left wd-color-coral fa-sm align-self-center"/>
                                <p className="wd-color-coral align-self-center m-0 ms-3 fw-bolder">Back</p>
                            </div>
                        </Link>

                        <div className="text-center mb-3">
                            <img className="wd-profile-img"
                                 src={imageUrl || profile.userAvatar || "/images/sample-user.jpeg"}/>
                            <h5 className="mt-3">{`Update ${profile.username}'s Profile`}</h5>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                            <button className="btn btn-outline-primary wd-button mx-2"
                                    onClick={() => saveProfile(dispatch)}>
                                Save Profile
                            </button>
                            
                        </div>

                        <hr/>

                        {/*birthday*/}
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInputBirthDay"
                                   placeholder={dateOfBirth}
                                   value={dateOfBirth}
                                   onChange={e => setDOB(e.target.value)}/>
                            <label htmlFor="floatingInputBirthDay" className="form-label">
                                Birth date
                            </label>
                        </div>

                        {/*location*/}
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInputLocation"
                                   placeholder={location}
                                   value={location}
                                   onChange={e => setLocation(e.target.value)}/>
                            <label htmlFor="floatingInputLocation" className="form-label">
                                Location
                            </label>
                        </div>

                        {/*bio*/}
                        <label htmlFor="bioInput" className="form-label ps-1">
                            Bio
                        </label>
                        <textarea className="form-control wd-bio-input mb-3"
                                  placeholder={bio}
                                  id="bioInput"
                                  value={bio}
                                  onChange={(e) => setBio(e.target.value)}>
                        </textarea>

                        {/*avatar*/}
                        <div className="mb-4">
                            <label htmlFor="userImgInput" className="form-label ps-1">
                                Change Profile Picture
                            </label>
                            <div className="d-flex">
                                <input type="file" className="form-control"
                                       id="userImgInput" alt=""
                                       onChange={e => handleChange(e)}/>
                                <button className="btn wd-button-transparent"
                                        type="button"
                                        onClick={handleSave}><i className="fas fa-upload"/>
                                </button>
                            </div>
                            {/*{imageUrl ? (*/}
                            {/*    <div className='row mt-2'>*/}
                            {/*        <div className='col-md-6 m-auto justify-content-center'>*/}
                            {/*            /!*<h4 className='text-center'>{imageName.split("-",1)}</h4>*!/*/}
                            {/*            <img className="wd-upload-thumbnail justify-self-center" src={imageUrl} alt=''/>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*) : (<h6 className="text-sm-center mt-4">Your uploaded picture will show here.</h6>)}*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default EditProfile;