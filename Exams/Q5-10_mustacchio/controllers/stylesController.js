const Styles = require("../models/mustacheStyles");
const bulkStyles = require("../data/bulk-add-styles.json")

exports.getStyles = async (req, res, next) => { 
 try{
    styles = await Styles.findAll();
    console.log("Selected Style: ", styles);
    if(styles){
        res.render("gallery", {pageTitle: "Styles", items: styles})
    }else {
        res.send("<h1>Oops!  No page found.</h1>")
    }
} catch (err) {
    console.log(err)
} 
}

exports.getStyleItem = async (req, res, next) => {
    const stylesSlug = req.params.titleSlug;
    try{
        style = await Styles.findOne({where: {titleSlug: stylesSlug}});
        if(style){
            res.render("gallery-single-post", {pageTitle: "Styles", items: style})
        }
    }catch(err){
        console.log("An Error Occured in SylesController getStyleItem", err);
    }
}


exports.bulkAddStyles = (req, res, next) => {
  Styles.bulkCreate(bulkStyles)
    .then((result) => {
      console.log("Styles Created!");
    })
    .catch((err) => console.log(err));
};