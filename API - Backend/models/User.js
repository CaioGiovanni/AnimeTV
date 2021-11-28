const mongoose = require("mongoose");

mongoose.model("User", {
    username: {type: String, unique: true},
    password: {type: String},
    list: {type: Object},
    history: {type: Object}
});