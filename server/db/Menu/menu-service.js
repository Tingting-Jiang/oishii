const MenuDao = require('./menu-dao')
const recipeDao = require("../UserRecipes/recipe-dao");
const userDao = require("../User/user-dao");



module.exports = (app) => {
    
    const getMenuDetail = (req, res) =>
        MenuDao.getMenuDetail(req.body.menuId)
            .then(menuDetail => res.json(menuDetail));
    
 
    
    const addToMenu = (req, res) =>{
        MenuDao.addToMenu(req.body.menuId, req.body.recipeId)
            .then(status => res.sendStatus(200));
    };
    
    const deleteRecipeFromMenu = (req, res) =>{
        console.log("in deleteRecipe");
        const sourceName = req.body.sourceName;
        const recipeId = req.body.recipeId;
        
        MenuDao.deleteRecipe(req.body.menuId, req.body.recipeId)
            .then(status => {
                // delete from recent recipeList
                recipeDao.deleteRecipe(recipeId)
                    .then( status => {
                        // delete from user side
                        userDao.deleteRecipe(sourceName, recipeId)
                            .then(status =>{
                                res.sendStatus(200);
                            })
                        
                    })})
    }
    
    app.post("/db/menu/getMenuDetail", getMenuDetail);
    app.put("/db/menu/addToMenu", addToMenu);
    app.delete("/db/menu/deleteRecipeFromMenu", deleteRecipeFromMenu);
    
    
    
    
}
