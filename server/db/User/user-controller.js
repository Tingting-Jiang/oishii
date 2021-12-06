const userDao = require('./user-dao');

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
                        console.log("user in Mongo -->", user);
                        req.session['profile'] = user;
                        req.session['/'] = user;
                        console.log("In session --> ", req.session);
    
                        res.json(user)
                    });
            })
    }
    
    
    const likeRecipe= (req, res) => {
        const username = req.body.username;
        console.log("user is -->", username);
        const recipe = req.body.recipeID;
        console.log("recipeID", recipe);
        userDao.findByUsername(req.body)
            .then(user => {
                // console.log("returned user -->", user);
                
                const idx = user.favRecipeList.indexOf(recipe);
                if (idx === -1 ) {
                    user.favRecipeList.push(recipe)
                } else {
                    user.favRecipeList.splice(idx, 1);
                }
                // console.log(" new list -->", favRecipeList);
                userDao.updateFavRecipe(req.body.username, user)
                    .then(status => res.json(user.favRecipeList)
            );
    })};
    
    
    
    const profile = (req, res) =>
        res.json(req.session['profile']);
    
    const logout = (req, res) =>
        res.send(req.session.destroy());
    
    app.post('/api/login', login);
    app.post('/api/register', register);
    app.post('/api/profile', profile);
    app.post('/api/logout', logout);
    app.put('/api/users', updateUser);
    app.delete('/api/users/:userId', deleteUser);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:userId', findUserById);
    app.put('/api/like', likeRecipe);
};