import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import userService, {getProfile} from '../../service/userService';
import "./create.css";
import Header from "../Header";
import firebase from '../../../firebase';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const selectProfile = (profile) => profile;

const CreateScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => getUser(dispatch), [history, dispatch]);

    let user = useSelector(selectProfile);

    const redirectLogin = () => {
        history.push('/login');
    }

    const getUser = (dispatch) => {
        getProfile(dispatch)
            .then(newUser => {
                if (newUser.username && newUser.password) {
                    user = newUser;
                } else {
                    redirectLogin();
                }
            })
            .catch(e => {
                alert("Please login to submit a recipe.");
                redirectLogin()
            });
    }
    

    const [recipe] = useState({});

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [servings, setServings] = useState(0);
    const [time, setTime] = useState(0);
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState(
        ["", "", "", ""]);
    
    const [imageName, setImageName] = useState();
    const [imageUrl, setImageUrl] = useState();
    

    useEffect(() => setInstructions(instructions), [instructions])
    
    const handleChange = (e) => {
        const file = e.target.files[0];
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
        let storageRef = firebase.storage().ref();
        storageRef.child(imageName).getDownloadURL()
            .then(url=>{
                console.log(url);
                setImageUrl(url)
            })
    }
    
    const submitRecipe = () => {
        if (title === "") {
            alert("Please add a name for this wonderful recipe");
            return;
        }
        if (ingredients === "") {
            alert("Please add the ingredients for this wonderful recipe");
            return;
        }
        
        const oldIngredients = ingredients.split(",");
        let newIngredients = [];
        for (let item of oldIngredients) {
            if (item !== "")
                newIngredients.push({original: item});
        }

        let newInstructions = [];
        let steps = []
        for (let item of instructions) {
            if (item !== "")
                steps.push({step: item});
        }
        if(steps.length !== 0)
            newInstructions.push({steps: steps});

        const newRecipe = {
            ...recipe,
            title,
            summary,
            servings,
            image: imageUrl,
            readyInMinutes: time,
            extendedIngredients: newIngredients,
            analyzedInstructions: newInstructions,
            sourceName:user.username,
            id: Date.now(),
        };
   
        userService.createRecipe(newRecipe, user.username)
            .then(data => {
                console.log("DONE")
                const path = "/details/" + newRecipe.id;
                history.push(path);
            })
            .catch(error => {
                console.error(error)
            })
    }
    
    const addInstructions = () => {
        setInstructions([...instructions, ""]);
    }

    const deleteStepHandler = (index) => {
        setInstructions(
            instructions.slice(0, index).concat(instructions.slice(index+1, instructions.length)))
    }
    

    return (
        <>
            <Helmet>
                <title>Create Recipe | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active="create"/>

                <div className="row align-items-top">
                    <div className="d-none d-md-block col-md-4">
                        <img className="wd-create-bg"
                             src="/images/create-bg.jpg"
                             alt=""/>
                    </div>
                    <div className="d-block d-md-none col-12 mb-3">
                        <img className="wd-create-bg-small"
                             src="/images/create-bg-small.jpg"
                             alt=""/>
                    </div>

                    <div className="col-12 col-md-8">
                        <form className="form-floating mb-3">
                            <input className="form-control" id="recipeNameInput"
                                   placeholder="Recipe Name"
                                   value={title}
                                   required={true}
                                   onChange={e => setTitle(e.target.value)}/>
                            <label htmlFor="recipeNameInput">
                                Recipe Name
                            </label>
                        </form>

                        <div className="form-floating mb-3">
                                <textarea className="form-control"
                                          placeholder="Recipe Description"
                                          id="descriptionInput"
                                          value={summary}
                                          onChange={e => setSummary(e.target.value)}/>
                            <label htmlFor="descriptionInput">
                                Recipe Description
                            </label>
                        </div>

                        <div className="d-flex">
                            <div className="form-floating mb-3 w-50 me-3">
                                <input type="number" className="form-control"
                                       placeholder="Servings"
                                       id="servingNumInput"
                                       value={servings}
                                       onChange={e => {
                                           e.target.value >=0 &&
                                           setServings(e.target.value)
                                       }}/>
                                <label htmlFor="servingNumInput">
                                    Servings
                                </label>
                            </div>

                            <div className="form-floating mb-3 w-50">
                                <input type="number" className="form-control"
                                       placeholder="Time ( in minutes )"
                                       id="servingTimeInput"
                                       value={time}
                                       onChange={e => {
                                           e.target.value >=0 &&
                                           setTime(e.target.value)
                                       }}/>
                                <label htmlFor="servingTimeInput">
                                    Time ( in minutes )
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="recipeImgInput" className="form-label">
                                Upload an Image for Your Recipe
                            </label>
                            <div className="d-flex">
                                <input type="file" className="form-control"
                                       id="recipeImgInput" alt=""
                                       onChange={e => handleChange(e)}/>
                                <button className="btn wd-button-transparent"
                                        type="button"
                                        onClick={handleSave}><i className="fas fa-upload"/>
                                </button>

                            </div>
                            {imageUrl ? (
                                <div className='row mt-2'>
                                    <div className='col-md-6 m-auto justify-content-center'>
                                        {/*<h4 className='text-center'>{imageName.split("-",1)}</h4>*/}
                                        <img className="wd-upload-thumbnail justify-self-center" src={imageUrl} alt=''/>
                                    </div>
                                </div>
                            ) : (<h6 className="text-sm-center mt-4">Your uploaded picture will show here.</h6>)}
                        </div>

                        <hr/>

                        <div className="mb-3">
                            <label htmlFor="ingredientsInput" className="form-label">
                                Ingredients
                            </label>
                            <textarea className="form-control"
                                      id="ingredientsInput"
                                      placeholder="Use comma (&quot;,&quot;) to separate your ingredients."
                                      value={ingredients}
                                      onChange={e => setIngredients(e.target.value)}>Please insert one ingredient in one line.
                            </textarea>
                        </div>

                        <div className="mb-3">
                            <div className="form-label">
                                Instructions
                            </div>

                            {instructions.map((data, index) => {
                                return (
                                    <div className="d-flex mb-3">
                                        <label className="m-3 wd-step-number"
                                               htmlFor="instructionInput1">
                                            {index + 1}
                                        </label>
                                        <textarea className="form-control"
                                                  id="instructionInput1"
                                                  value={instructions[index]}
                                                  onChange={e => {
                                                      instructions[index] = e.target.value;
                                                      setInstructions([...instructions]);
                                                  }}/>
                                        {
                                            instructions.length > 1 &&
                                            <button className="btn btn-outline-danger wd-button-transparent"
                                                    onClick={() => deleteStepHandler(index)}>
                                                <i className="fas fa-times"/>
                                            </button>
                                        }
                                        {
                                            instructions.length <= 1 &&
                                            <button className="btn btn-outline-danger wd-button-transparent" disabled>
                                                <i className="fas fa-times"/>
                                            </button>
                                        }
                                    </div>
                                )})}

                            <button className="btn btn-outline-primary wd-button wd-button-transparent"
                                    onClick={addInstructions}>
                                Add another step
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <button className="btn btn-outline-primary wd-button w-50"
                                    onClick={submitRecipe}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default CreateScreen;