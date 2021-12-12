import React, { useEffect, useState } from 'react'
import "./profile.css";
import { useHistory } from 'react-router-dom'; // must from dom, react-route won't work
import userService, {getProfile, logout} from '../../service/userService'
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../../../firebase'
import Header from "../Header";

const selectProfile = (profile) => profile;

const EditProfile = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => getUser(dispatch), [history, dispatch]);

    let profile = useSelector(selectProfile);

    const [username, setUsername] = useState(profile.username);
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
            // .then(res => setUser(profile))
            .then(newUser => {
                // console.log("returned from SESSION", newUser.favRecipeList);
                if (newUser.username && newUser.password) {
                    profile = newUser;
                } else {
                    redirectLogin();
                }
            })
            .catch(e => redirectLogin());
        // .catch(e => console.log(e));
    }
    
    const handleChange = (e) => {
        const file = e.target.files[0];
        // setImage(file);
        const name = file.name + "-"+ Date.now();
        setImageName(name);
        let storageRef = firebase.storage().ref(`${name}`);
        let uploadTask = storageRef.put(file);
        uploadTask
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                () =>{
                    let downloadUrl = uploadTask.snapshot.getDownloadURL;
                })
    }
    
    const handleSave = () =>{
        // console.log("in handle save");
        // console.log(imageName);
        let storageRef = firebase.storage().ref();
        // let spaceRef = storageRef.child(imageName);
        storageRef.child(imageName).getDownloadURL()
            .then(url=>{
                setImageUrl(url)
            })
        
    }

    const logoutHandler = (dispatch) => {
        logout(dispatch)
            .then(res => {
                // history.push("/");
            });
    }
    
    const saveProfile = (dispatch) =>{
        const newProfile = {
            ...profile,
            username,
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
                // res.json();
                // history.push("/profile")
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
                        <h4 className="wd-color-coral">Update Profile</h4>
                        <hr/>

                        {/*birthday*/}
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInputBirthDay"
                                   placeholder="Birth date"
                                   value={dateOfBirth}
                                   onChange={e => setDOB(e.target.value)}/>
                            <label htmlFor="floatingInputBirthDay" className="form-label">
                                Birth date
                            </label>
                        </div>

                        {/*location*/}
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInputLocation"
                                   placeholder="Location"
                                   value={location}
                                   onChange={e => setLocation(e.target.value)}/>
                            <label htmlFor="floatingInputLocation" className="form-label">
                                Birth date
                            </label>
                        </div>

                        {/*bio*/}
                        <div className="form-floating mb-3">
                                <textarea className="form-control"
                                          placeholder="Bio"
                                          id="bioInput"
                                          value={bio}
                                          onChange={(e) => setBio(e.target.value)}/>
                            <label htmlFor="bioInput">
                                Bio
                            </label>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="userImgInput" className="form-label">
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
                            {imageUrl ? (
                                <div className='row mt-5'>
                                    <div className='col-md-6 m-auto'>
                                        <h3 className='text-center'>{imageName.split("-",1)}</h3>
                                        <img style={{width: '100%'}} src={imageUrl} alt=''/>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                    </div>
                </div>
    
                <div className="wd-profile-container">
                    <img className="wd-profile-bg"
                         src="/images/profile-bg.jpg"/>
                    <div className="wd-profile-info  flex">
                        <div className="text-center">
                        <img className="wd-profile-img"
                             src={imageUrl}/>
                        <input type="file" className="ps-5"
                               id="recipeImgInput" alt=""
                               onChange={e => handleChange(e)}/>
                        <button className="btn wd-button-transparent"
                                type="button"
                                onClick={handleSave}><i className="fas fa-upload"/>
                        </button>
                        </div>
                        
                        <div className="row wd-username">
                            <div className="col-4">
                            <label htmlFor="floatingInputName" className="form-label">
                                User Name
                            </label>
                            <input
                                type="text"
                                className="form-control border-1 "
                                id="floatingInputName"
                                placeholder={username}
                                value={username}
                                onChange={e=> setUsername(e.target.value)}/>
                            </div>
    
                            <div className="col-4">
                                <label htmlFor="floatingInputBirthDay" className="form-label">
                                    <i className="fas fa-birthday-cake me-2 wd-color-coral"/>
                                    Birth date
                                </label>
                                <input className="form-control me-2"
                                       placeholder={dateOfBirth}
                                       value={dateOfBirth}
                                       onChange={e => setDOB(e.target.value)}/>
                            </div>
                            <div className="col-4">
                                       
                                <label htmlFor="floatingInputLocation" className="form-label">
                                    <i className="fas fa-map-marker-alt me-2 wd-color-coral"/>
                                    Location
                                </label>
                            
                              <input
                                  type="text"
                                  className="form-control border-1 pb-3 "
                                  id="floatingInputLocation"
                                  placeholder={location}
                                  value={location}
                                  onChange={e => setLocation(e.target.value)}
                              />
                            </div>
                         
                  
                                <label htmlFor="floatingInputBio" className="form-label mb-2">
                                    Bio
                                </label>
                                  <textarea
                                      className="form-control border-1 pb-3"
                                      id="floatingInputBio"
                                      placeholder={bio}
                                      rows="2"
                                      value={bio}
                                      onChange={(e) => setBio(e.target.value)}
                                  />
                         
                            
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-outline-primary wd-button mx-3"
                                onClick={() => saveProfile(dispatch)}>
                                Save Profile
                            </button>
                            
                            <button className= "btn btn-outline-danger ms-3"
                                    onClick={() => logoutHandler(dispatch)}>
                                Log out
                            </button>
                            </div>
                    
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default EditProfile;