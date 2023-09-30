const Cart = require("./Cart");
const Category = require("./Category");
const Imagen = require("./Imagen");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");


Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(Imagen)
Imagen.belongsTo(Product)

User.hasMany(Cart)
Cart.belongsTo(User)

Product.hasMany(Cart)
Cart.belongsTo(Product)

Product.hasMany(Purchase)
Purchase.belongsTo(Product)

User.hasMany(Purchase)
Purchase.belongsTo(User)

