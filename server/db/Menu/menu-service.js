const MenuDao = require('./menu-dao')
const recipeDao = require("../UserRecipes/recipe-dao");
const userDao = require("../User/user-dao");




module.exports = (app) => {
    
    const getMenuDetail = (req, res) =>
        MenuDao.getMenuDetail(req.body.menuId)
            .then(menuDetail => res.json(menuDetail[0]));
    
 
    
    const addToMenu = (req, res) =>{
        // console.log(`add ${req.body.recipeId} to ${res.body.menuId}`)
        
        MenuDao.addToMenu(req.body.menuId, req.body.recipeId)
        // MenuDao.addToMenu(1, 241775)
            .then(status => {
                console.log(`add ${req.body.recipeId} to ${res.body.menuId}`)
                // console.log("add 241775 to 1 ---")
                res.sendStatus(200)
                
            });
    };
    
    const deleteRecipeFromMenu = (req, res) =>{
        console.log("in deleteRecipe");
        const sourceName = req.body.sourceName;
        const recipeId = req.body.recipeId;
        
        MenuDao.deleteRecipe(req.body.menuId, req.body.recipeId)
            .then(status => {
                // delete from recent recipeList
                if (req.body.sourceName === "NONE") {
                    console.log("API recipe deleted");
                    res.sendStatus(200);
                    return;
                } else {
                
                recipeDao.deleteRecipe(recipeId)
                    .then( status => {
                        // delete from user side
                        console.log("remove from latest recipe list");
                        userDao.deleteRecipe(sourceName, recipeId)
                            .then(status =>{
                                console.log('remove from user recipe list')
                                res.sendStatus(200);
                            })
                        
                    })}})
    }
    
    
    
    app.post("/db/menu/getMenuDetail", getMenuDetail);
    app.put("/db/menu/addToMenu", addToMenu);
    app.delete("/db/menu/deleteRecipeFromMenu", deleteRecipeFromMenu);
    
    
    
    
}
