exports.getMenu = (req, res, next) => {
    const category = req.params.category;
    if(menu[category]){
        res.render("menu", {pageTitle: "Menu", category: category, items: menu[category].items, image: menu[category].image});
    }
    else{
        res.sendStatus("<h1>Oops! no page found</h1>")
    }
    
}

exports.getMenuItem = (req, res, next) => {
    const id = parseInt(req.params.id);
    const category = req.params.category;
    const item = menu[category].items.find(item => item.id === id);
    console.log(item);
    res.render('menu-item', {pageTitle: item.name, category: category, item: item, image: item.img})

}