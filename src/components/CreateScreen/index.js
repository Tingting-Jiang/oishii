import React, {useEffect, useState} from 'react';
import userService from '../service/userService';
import {useCookies} from 'react-cookie';
import "./create.css";
import Header from "../Header";
import {Helmet} from "react-helmet";

const CreateScreen = () => {
    // const [cookies, setCookie] = useCookies(['avatar']);
    // console.log(cookies.avatar);

    const [recipe] = useState({});

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [servings, setServings] = useState(0);
    const [time, setTime] = useState(0);
    const [file, setFile] = useState(new FormData());
    const [fileName, setFileName] = useState("Choose File");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState(
        ["", "", "", ""]);

    const [uploadedFile, setUploadedFile] = useState();

    useEffect(() => setInstructions(instructions), [instructions])

    const submitRecipe = () => {
        const oldIngredients = ingredients.split(",");
        let newIngredients = [];
        for (let item of oldIngredients) {
            newIngredients.push({original: item});
        }

        let newInstructions = [];
        let steps = []
        for (let item of instructions) {
            steps.push({step: item});
        }
        const content = {steps: steps};

        newInstructions.push(content);

        const newRecipe = {
            ...recipe,
            title,
            summary,
            servings,
            readyInMinutes: time,
            extendedIngredients: newIngredients,
            analyzedInstructions: newInstructions,
        };
        console.log("submit");
        const formData = new FormData()
        formData.append('file', file)
        formData.append("username", "kk");
        formData.append("recipe", JSON.stringify(newRecipe));

        userService.createRecipe(formData)
            .then(response => response.blob())
            .then(blob => {
                console.log("returned");
                setUploadedFile({src: URL.createObjectURL(blob)})
            })
            .catch(error => {
                console.error(error)
            })
    }


    const handleImageUpload = (event) => {
        const files = event.target.files;
        setFileName(files[0].name);
        setFile(files[0]);
    }

    const addInstructions = () => {
        setInstructions([...instructions, ""]);
    }

    const deleteStepHandler = (index) => {
        setInstructions(
            instructions.slice(0, index).concat(instructions.slice(index+1, instructions.length)))
    }

    const submitFile = () => {
        console.log("file added")
    };


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
                                       onChange={handleImageUpload}/>
                                <button className="btn wd-button-transparent"
                                        type="button"
                                        onClick={submitFile}><i className="fas fa-upload"/>
                                </button>

                            </div>
                            {uploadedFile ? (
                                <div className='row mt-5'>
                                    <div className='col-md-6 m-auto'>
                                        <h3 className='text-center'>{fileName}</h3>
                                        <img style={{width: '100%'}} src={uploadedFile.src} alt=''/>
                                    </div>
                                </div>
                            ) : null}
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