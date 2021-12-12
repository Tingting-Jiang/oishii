
const userDao = require('./user-dao');
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
    
    
    
    
    const getUserInfo =(req, res) => {
        console.log("11111111111111111111");
        console.log("begin to get user info", req.body.userID);
        userDao.getUserInfo(req.body.userID)
            .then(user =>{
                // console.log("inside get user info function ", user);
                res.json(user[0]);
                }
            )
    };
    
    
    
    
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
                const newUSer = {
                    ...req.body.user,
                    id: Date.now()
                }
                userDao.createUser(newUSer)
                    .then(user => {
                        req.session['profile'] = user;
                        res.json(user)
                    });
            })
    }
    
    
    
    
    
    
    const likeRecipe= (req, res) => {
        const recipeID = req.body.recipeID;
        const userID = req.body.userID;
        console.log("in like recipe, received -->", recipeID);
        userDao.addFavRecipe(userID, recipeID)
            .then(status => {
                allRecipeDao.addFollower(recipeID, userID)
                    .then(status => console.log(`add ${userID} to recipeList`));
                console.log(`add recipe to ${userID} fav list`);
                // console.log(req.session['profile']);
                const user = req.session['profile'];
                user.favRecipeList = [recipeID, ...user.favRecipeList];
                req.session['profile'] = user;
                // console.log(req.session['profile']);
                // res.json(recipeID);
                res.send(status);
            })
    };
    
    const unlikeRecipe= (req, res) => {
        const recipeID = req.body.recipeID;
        const userID = req.body.userID;
        console.log("in -unlike- recipe, received -->", recipeID);
        userDao.removeFavRecipe(userID, recipeID)
            .then(status => {
                allRecipeDao.removeFollower(recipeID, userID)
                    .then(status => console.log(`remove ${userID} from recipeList`));
                const user = req.session['profile'];
                user.favRecipeList = user.favRecipeList.filter(recipeId => recipeId !== recipeID)
                req.session['profile'] = user;
                res.send(status);
            })
    };
    
    
    
    
    const profile = (req, res) => {
        if (req.session['profile']) {
            res.json(req.session['profile']);
        } else {
            res.sendStatus(403);
        }

    }

    
    const logout = (req, res) => {
        console.log("LOG OUT");
        res.send(req.session.destroy());
    }

    

    

    app.post('/db/user/login', login);
    app.post('/db/user//register', register);
    app.post('/db/user/profile', profile);
    app.post('/db/user/logout', logout);
    app.put('/db/user/editProfile', updateProfile);
    app.delete('/db/user//delete/:userId', deleteUser);
    app.post('/db/user/allUsers', findAllUsers);
    app.post('/db/user/:userId', findUserById);
    // app.post('/db/user/userInfo', getUserInfo);
    
    app.post('/db/userInfo', getUserInfo);
    
    
    app.put('/db/recipe/like', likeRecipe);
    app.put('/db/recipe/unlike', unlikeRecipe);



};