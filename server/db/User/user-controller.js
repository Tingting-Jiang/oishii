

const userDao = require('./user-dao');
const allRecipeDao = require("../AllRecipes/allRecipe-dao");
const defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/oishii-794ac.appspot.com/o/category-dessert.jpg-1639336882948?alt=media&token=33586928-61f0-4926-a9af-67ebd84cc87e";



module.exports = (app) => {
    
    const findAllUsers = (req, res) =>
        userDao.findAllUsers()
            .then(users => {
                console.log(" all user list ==>", users.length)
                res.json(users)
            });


    const findUserById = (req, res) =>
        userDao.findUserById(req.body.userId)
            .then(user => {
                console.log("get all user info by Id ", user[0].usersFollowers)
                if (user[0]) {
                    res.json(user[0])
                } else {
                    res.sendStatus(404);
                }
            });
    

    const getUserInfo =(req, res) => {
        // console.log("11111111111111111111");
        // console.log("begin to get user info", req.body.userID);
        userDao.getUserInfo(req.body.userID)
            .then(user =>{
                // console.log("inside get user info function ", user);
                res.json(user[0]);
                }
            )
    };
    
    const changeRole = (req, res) =>{
        const current = req.body.currentRole;
        console.log(req.body.userId, current)
        
        if (current === "normal") {
            userDao.changeRoleToEditor(req.body.userId)
                .then(status => res.sendStatus(200));
        }
        else {
            userDao.changeRoleToNormal(req.body.userId)
                .then(status => res.sendStatus(200));
        }
    }
    

    const deleteUser = (req, res) => {
        console.log("delete --", req.body.userId)
        userDao.deleteUser(req.body.userId)
            .then(status => res.send(status));
    }


    const updateProfile = (req, res) => {
        console.log("before update user");
        userDao.updateUser(req.body.user)
            .then(status => {
                req.session['profile'] = req.body.user;
                console.log("UPDATED PROFILE", req.session['profile']);
                res.send(status);
            });
    }


    const login = (req, res) => {
        userDao.findByUsernameAndPassword(req.body)
            .then(user => {
                if(user && !user.isDeleted) {
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
        console.log(" NEW REGISTER REQUEST", req.body);
        userDao.findByUsername(req.body)
            .then(user => {
                if(user) {
                    res.sendStatus(404);
                    return;
                }
                const newUser = {
                    ...req.body,
                    id: Date.now(),
                    userAvatar: defaultAvatar
                }
                userDao.createUser(newUser)
                    .then(user => {
                        console.log("after register: ", user);
                        req.session['profile'] = user;
                        res.json(user)
                    });
            })
    }
    
    
    
    
    
    
    const likeRecipe= (req, res) => {
        const recipeID = req.body.recipeID;
        const userID = req.body.userID;
        console.log("in like recipe, received -->", recipeID, userID);
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
    
    
    const likeUser= (req, res) => {
        const userId = req.body.userId;
        const otherUserId = req.body.otherUserId;
        console.log("in like user, received -->", userId, otherUserId);
        userDao.likeUser(userId, otherUserId)
            .then(status => {
                res.send(status);
            })
    };
    
    
    const unLikeUser = (req, res) => {
        const userId = req.body.userId;
        const otherUserId = req.body.otherUserId;
        console.log("in -unlike- user, received -->", userId, otherUserId);
        userDao.unLikeUser(userId, otherUserId)
            .then(status => {
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
    app.post('/db/user/register', register);
    app.post('/db/user/profile', profile);
    app.post('/db/user/logout', logout);
    app.put('/db/user/editProfile', updateProfile);
    app.delete('/db/user/delete', deleteUser);
    app.put('/db/user/changeRole', changeRole)
    app.post('/db/user/allUsers', findAllUsers);
    app.post('/db/user/findUser', findUserById);
    app.put('/db/user/likeUser', likeUser);
    app.put('/db/user/unLikeUser', unLikeUser);
    
    
    // app.post('/db/user/userInfo', getUserInfo);
    
    app.post('/db/userInfo', getUserInfo);
    
    
    app.put('/db/recipe/like', likeRecipe);
    app.put('/db/recipe/unlike', unlikeRecipe);



};