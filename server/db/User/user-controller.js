
const userDao = require('./user-dao');
const { ObjectId } = require('mongodb')
const allRecipeDao = require("../AllRecipes/allRecipe-dao");



module.exports = (app) => {
    
    const findAllUsers = (req, res) =>
        userDao.findAllUsers()
            .then(users => res.json(users));
    
    const findUserById = (req, res) =>
        userDao.findUserById(req.userId)
            .then(user => {
                res.json(user)
            });
    
    const deleteUser = (req, res) =>
        userDao.deleteUser(req.params.userId)
            .then(status => res.send(status));
    
    const updateProfile = (req, res) => {
        console.log("before update user");
        userDao.updateUser(req.body.user)
            .then(status => res.sendStatus(200));
    }
    
    const login = (req, res) => {
        userDao.findByUsernameAndPassword(req.body)
            .then(user => {
                if(user) {
                    console.log(" USER login")
                    req.session['profile'] = user;
                    console.log(user);
                    res.json(user);
                    return;
                }
                res.sendStatus(403);
            })
    }
    
    const register = (req, res) => {
        userDao.findByUsername(req.body)
            .then(user => {
                if(user) {
                    res.sendStatus(404);
                    return;
                }

                userDao.createUser(req.body)
                    .then(user => {
                        req.session['profile'] = user;
                        res.json(user)
                    });
            })
    }
    
    
    
    
    
    const likeRecipe1= (req, res) => {
        const recipeID = req.body.recipeID;
        const username = req.body.username;
        userDao.findByUsername(req.body)
            .then(user => {
                // check if the recipe in users fav list, delete, else add
                user.favRecipeList = addOrDelete(recipeID, user.favRecipeList)
                allRecipeDao.findRecipeById(recipeID)
                    .then(recipe => {
                        if (recipe) {
                            recipe.followers = addOrDelete(username, recipe.followers);
                            console.log("recipe in DB");
                            allRecipeDao.updateFollower(recipeID, recipe.followers)
                                .then(status =>
                                    console.log("update recipe followers list"))
                        } else {
                            const newRecipe = {
                                id: recipeID,
                                followers: [username]
                            }
                            allRecipeDao.addRecipeAndFollower(newRecipe)
                                .then(status =>
                                    console.log("add recipe and its followers to DB"))
                        }
                    })
                        
                        res.json(user.favRecipeList)
                }
            );
    };
    
    
    
    const addOrDelete = (item, recipeList) =>{
        const idx = recipeList.indexOf(item);
        if (idx === -1 ) {
            recipeList = [item, ...recipeList];
        } else {
            recipeList.splice(idx, 1);
        }
        return recipeList;
    }
    
    
    const likeRecipe= (req, res) => {
        const recipeID = req.body.recipeID;
        const username = req.body.username;
        console.log("in like recipe, received -->", recipeID);
        userDao.addFavRecipe(username, recipeID)
            .then(status => {
                allRecipeDao.addFollower(recipeID, username)
                    .then(status => console.log(`add ${username} to recipeList`));
                console.log(`add recipe from ${username}fav list`);
                res.sendStatus(200)
            })
    };
    
    const unlikeRecipe= (req, res) => {
        const recipeID = req.body.recipeID;
        const username = req.body.username;
        console.log("in -unlike- recipe, received -->", recipeID);
        userDao.removeFavRecipe(username, recipeID)
            .then(status => {
                allRecipeDao.removeFollower(recipeID, username)
                    .then(status => console.log(`remove ${username} to recipeList`));
                console.log(`remove recipe from ${username}fav list`)
                res.sendStatus(200)
            })
    };
    
    
    
    
    
    
    const createRecipe = (req, res) =>{
        
        // deal with ingredients
        let oldIngredients = req.body.extendedIngredients;
        const symbol = /\s*(?:;,|$)\s*/
        const ingredients = oldIngredients.split(",");
        let newIngredients = [];
        for (let item of ingredients) {
            let container = { original : item};
            newIngredients.push(container);
        }
        console.log("after parsing : =====", newIngredients);
        
        
        let instructions = req.body.analyzedInstructions;
        let newInstructions = [];
        for (let item of instructions) {
            let steps = { steps : item};
            newInstructions.push(steps);
        }
        console.log("after parsing : =====", newInstructions);
    
    
       
        const recipe = {
            ...req.body,
            extendedIngredients: newIngredients,
            analyzedInstructions: newInstructions,
        };
        console.log(" in create recipe:", req.body);
    
        userDao.createRecipe("kk", recipe )
            .then(status => res.sendStatus(200));
      
    }
    
   const getRecipe = (req, res) =>{
        const recipeId = req.body.recipeID;
        console.log(recipeId);
        userDao.getRecipe(req.body.username, recipeId)
            // .then(res=> res.json())
            .then(list => {
                return list.filter(item => item._id === ObjectId(req.body.recipeID));
                }
            )
            .then(data => {
                console.log(data);
                res.json(data);
            }).catch(e =>{
                console.log(e)
        });
   }
    
    
    const profile = (req, res) =>
        res.json(req.session['profile']);
    
    const logout = (req, res) =>
        res.send(req.session.destroy());
    
    
    
    
    
    app.post('/db/login', login);
    app.post('/db/register', register);
    app.post('/db/profile', profile);
    app.post('/db/logout', logout);
    app.put('/db/editProfile', updateProfile);
    app.delete('/db/users/:userId', deleteUser);
    app.get('/db/users', findAllUsers);
    app.get('/db/users/:userId', findUserById);
    app.put('/db/like', likeRecipe);
    app.put('/db/unlike', unlikeRecipe);
    app.post('/db/create', createRecipe);
    app.post('/db/get', getRecipe);
};