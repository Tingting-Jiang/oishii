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
                        req.session['profile'] = user;
                        req.session["home"] = user;
                        res.json(user)
                    });
            })
    }
    
    
    const likeRecipe= (req, res) => {
        const id = req.params.id;
        const recipeID = req.body.recipeId;
        userDao.findUserById(id)
            .then(user => {
                const idx = user.favRecipeList.indexOf(recipeID);
                if (idx === -1 ) {
                    user.favRecipeList.push(recipeID)
                } else {
                    user.favRecipeList.splice(idx, 1);
                }
                userDao.updateUser(id, user)
                    .then(user => res.send(user));
            });
    }
    
    
    
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
    app.post('/api/like/:recipeId', likeRecipe);
};