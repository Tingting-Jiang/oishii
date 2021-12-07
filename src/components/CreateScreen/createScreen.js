import React, { useState } from 'react'
import userService from '../service/userService';
import Progress  from "./Progress";
import { useSelector } from 'react-redux'



// const getUser = (state) => state.userReducer.user;
const CreateScreen = () => {
    const user = useSelector((state) => state);
    console.log(" in Create page, user is", user);
    
    const [recipe] = useState({});

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [servings, setServings] = useState(0);
    const [time, setTime] = useState(0);
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("Choose File");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState(
        ["","","",""]);
    
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    
    
    const submitRecipe = () =>{
        // console.log("before sending, image url is", imageURL);
        const newRecipe = {
            ...recipe,
            title,
            summary,
            servings,
            readyInMinutes: time,
            extendedIngredients: ingredients,
            analyzedInstructions: instructions,
        };
        console.log("NEW RECIPE => ", newRecipe);
        userService.createRecipe(newRecipe)
            .then(data => console.log(data));
        
    }
    
    
    // const handleImageUpload = (event) => {
    //     const files = event.target.files
    //     const formData = new FormData()
    //     formData.append('myFile', files[0])
    //     // setImage(formData);
    //
    //     fetch('/saveImage', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data.path)
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         })
    // }
    
    // const handleImageUpload = (event) => {
    //     // console.log("inside image function");
    //     const files = event.target.files;
    //     let reader = new FileReader();
    //     reader.readAsDataURL(files[0]);
    //     reader.onload = (e) => {
    //         const formData = {file: e.target.result};
    //         setImage(formData);
    //     };
    //
    // }
    //
    const addInstructions = () => {
        setInstructions([...instructions, ""]);
    }
    
    const handleFileChange =(e) =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }
    
    const submitFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
    
        fetch("http://localhost:4000/api/upload", {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress : progressEvent => {
            setUploadPercentage(
                parseInt(
                    Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
            );
            }
        })
            .then(res => {
                const { fileName, filePath } = res.data;
                setUploadedFile({ fileName, filePath });
                setMessage("File Uploaded");
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setMessage('There was a problem with the server');
                } else {
                    setMessage(err.response.data.msg);
                }
                setUploadPercentage(0)
            })
        };
    
   
    
    return(
        <>
            <div className="container mt-2">
                <div className="row wd-home-header">
                    <div className="col-2 col-md-2">
                        <h1>Oishii</h1>
                    </div>
                    <div className="col-6 col-md-6 align-self-center">
                        <ul className="nav justify-content-left">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link wd-color-coral fw-bold" href="/create">Recipes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-none d-md-block col-4 align-self-center">
                        <div className="align-items-center">
                            <div className="wd-magnifier">
                                <label htmlFor="SearchInput">
                                    <i className="fas fa-search"></i>
                                </label>
                            </div>
                            <div>
                                <input id="SearchInput"
                                       className="form-control wd-search-bar-input"
                                       placeholder="Search Oishii"/>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="row align-items-top">
                    <div className="d-none d-md-block col-md-4">
                        <img className="wd-create-bg"
                             src="../../images/create-bg.jpg"
                             alt=""/>
                    </div>
                    <div className="d-block d-md-none col-12 mb-3">
                        <img className="wd-create-bg-small"
                             src="../../images/create-bg-small.jpg"
                             alt=""/>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="form-floating mb-3">
                            <input className="form-control" id="recipeNameInput"
                                   placeholder="Recipe Name"
                                   value={title}
                                   onChange={e => setTitle(e.target.value)}/>
                                <label htmlFor="recipeNameInput">
                                    Recipe Name
                                </label>
                        </div>
                
                        <div className="form-floating mb-3">
                <textarea className="form-control"
                          placeholder="Recipe Description"
                          id="descriptionInput"
                            value={summary}
                            onChange={e => setSummary(e.target.value)}></textarea>
                            <label htmlFor="descriptionInput">
                                Recipe Description
                            </label>
                        </div>
                
                        <div className="d-flex">
                            <div className="form-floating mb-3 w-50 me-3">
                                <input type="number" className="form-control"
                                       placeholder="Servings"
                                       id="servingNumInput"
                                        valeu={servings}
                                        onChange={e=>setServings(e.target.value)}/>
                                    <label htmlFor="servingNumInput">
                                        Servings
                                    </label>
                            </div>
                    
                            <div className="form-floating mb-3 w-50">
                                <input type="number" className="form-control"
                                       placeholder="Time ( in minutes )"
                                       id="servingTimeInput"
                                       valeu={time}
                                       onChange={e=>setTime(e.target.value)}/>
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
                                        onChange={handleFileChange}/>
                                    <button className="btn wd-button-transparent"
                                            type="button"
                                        onClick={submitFile}><i className="fas fa-upload"></i>
                                    </button>
                                <Progress percentage={uploadPercentage} />
                        
                            {uploadedFile ? (
                                <div className='row mt-5'>
                                    <div className='col-md-6 m-auto'>
                                        <h3 className='text-center'>{uploadedFile.fileName}</h3>
                                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                                    </div>
                                </div>
                            ) : null}
                            </div>
                        </div>
                
                        <hr/>
                        
                        <div className="mb-3">
                            <label htmlFor="ingredientsInput" className="form-label">
                                Ingredients
                            </label>
                            <textarea className="form-control"
                                      id="ingredientsInput"
                                        value={ingredients}
                                        onChange={e => setIngredients(e.target.value)}>Please insert one ingredient in one line.
            </textarea>
                        </div>
                    
                        <div className="mb-3">
                            <div className="form-label">
                                Instructions
                            </div>
    
    
                            {/*<div className="d-flex mb-3">*/}
                            {/*    <label className="m-3 wd-step-number"*/}
                            {/*           htmlFor="instructionInput1">*/}
                            {/*        1*/}
                            {/*    </label>*/}
                            {/*    <textarea className="form-control" id="instructionInput1"></textarea>*/}
                            {/*</div>*/}
                           
                            
                            
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
                                              onChange={ e =>{
                                                  instructions[index] = e.target.value;
                                                  setInstructions([...instructions]);
                                              }}></textarea>
                                    {/*<button className="btn btn-danger"> Remove</button>*/}
                                </div>
                                )
                            })}
                         
                           
                            
                            <div className="d-flex mb-3">
                                <label className="m-3">
                                    (new step input box will be added here.)
                                </label>
                            </div>
                    
                    
                            <button className="btn btn-outline-primary wd-button wd-button-transparent"
                                onClick={addInstructions}>
                                Add another step
                            </button>
                        </div>
                    
                        <div className="mt-4 text-center">
                            <button className="btn btn-outline-primary wd-button w-50"
                                    onClick={submitRecipe}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
        
                </div>
        
                <div className="wd-footer">
                    <div>
                        <h3>Oishii</h3>
                        <p>Presented by Project Oishii Group</p>
                        <span>Privacy Policy</span> | <span>Send Feedback</span>
                    </div>
                </div>
            </div>
        </>
    )
};
export default CreateScreen;