const userDao = require('./user-dao');
const { ObjectID } = require('mongodb')


module.exports = (app) => {
    
    const findAllUsers = (req, res) =>
        userDao.findAllUsers()
            .then(users => res.json(users));
    
    const findUserById = (req, res) =>
        userDao.findUserById(req.userId)
            .then(user => res.json(user));
    
    const deleteUser = (req, res) =>
        userDao.deleteUser(req.params.userId)
            .then(status => res.send(status));
    
    const updateUser = (req, res) =>
        userDao.updateUser(req.body)
            .then(status => req.send(status));
    
    const login = (req, res) => {
        userDao.findByUsernameAndPassword(req.body)
            .then(user => {
                if(user) {
                    req.session['profile'] = user;
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
                        user["fav-dish"] = user.favRecipeList;
                        // console.log("user in Mongo -->", user);
                        req.session['profile'] = user;
                        req.session['/'] = user;
                        // console.log("In session --> ", req.session);
    
                        res.json(user)
                    });
            })
    }
    
    
    const likeRecipe= (req, res) => {
        const recipe = req.body.recipeID;
        userDao.findByUsername(req.body)
            .then(user => {
                const idx = user.favRecipeList.indexOf(recipe);
                if (idx === -1 ) {
                    user.favRecipeList.push(recipe)
                } else {
                    user.favRecipeList.splice(idx, 1);
                }
                userDao.updateFavRecipe(req.body.username, user.favRecipeList)
                    .then(status => res.json(user.favRecipeList)
            );
    })};
    
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
                return list.filter(item => item._id === ObjectID(req.body.recipeID));
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
    app.put('/db/users', updateUser);
    app.delete('/db/users/:userId', deleteUser);
    app.get('/db/users', findAllUsers);
    app.get('/db/users/:userId', findUserById);
    app.put('/db/like', likeRecipe);
    app.post('/db/create', createRecipe);
    app.post('/db/get', getRecipe);
};