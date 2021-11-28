const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Configurando Body Parser
    app.use(bodyParser.json());

// Configurando MongoDB
    mongoose.connect("mongodb+srv://AnimeTVAccess:0000@cluster0.rr7ul.mongodb.net/AnimeTV-Database?retryWrites=true&w=majority", {useNewUrlParser: true}, () => {
        console.log("DB Connected!")
    });

// Carregando modelo
    require("./models/User");
    const User = mongoose.model("User");

// Endpoints
    // Cadastro
        app.post("/User", (req, res) => {
            if (req.body.username != undefined && req.body.password != undefined) {
                if (req.body.list == undefined) {
                    req.body.list = [];
                }
                if (req.body.history == undefined) {
                    req.body.history = {};
                }
                var user = new User({
                    username: req.body.username,
                    password: req.body.password,
                    list: req.body.list,
                    history: req.body.history
                });
                user.save().then(() => {
                    // Dado salvo com sucesso
                    res.statusCode = 201;
                    res.send("Usuário salvo.");
                }).catch((erro) => {
                    if (erro) {
                        //throw erro;
                        if (erro.name === 'MongoServerError' && erro.code === 11000) {
                            // Duplicate username
                            return res.status(422).send({ succes: false, message: 'This username is already in use.' });
                          }
                    }
                    // Aconteceu uma falha
                    res.statusCode = 417;
                    res.send("Something got wrong.");
                })
            }
            else {
                res.statusCode = 400;
                res.send("Empty field.");
            }
        })

        app.get("/Users", (req, res) => {
            User.find({}, (erro, dados) => {
                if (erro) {
                    res.statusCode = 417;
                    res.send("Erro.");
                }
                res.json(dados);
            })
        })

        app.get("/Users/:username", (req, res) => {
            User.findOne({"username": req.params.username}).then((user) => {
                res.statusCode = 200;
                res.json(user);
            }).catch((erro) => {
                if (erro) {
                    res.statusCode = 417;
                    res.send("Erro.");
                    throw erro;
                }
            })
        })

        app.delete("/Users/:username", (req, res) => {
            User.findOneAndRemove({"username": req.params.username}).then((user) => {
                if (user) {
                    res.statusCode = 200;
                    res.send("Deleted.");
                }
                else {
                    res.statusCode = 404;
                    res.send("Erro.");
                }
            }).catch((erro) => {
                if (erro) {
                    res.statusCode = 417;
                    res.send("Erro.");
                    throw erro;
                }
            })
        })

        app.patch("/Users/:id", (req, res) => {
            var userUpdate = new User({
                _id: req.params.id,
                username: req.body.username,
                password: req.body.password,
                list: req.body.list,
                history: req.body.history
            });
            User.findByIdAndUpdate(req.params.id, userUpdate).then((user) => {
                if (user) {
                    res.statusCode = 200;
                    res.send("Updated.");
                }
                else {
                    res.statusCode = 404;
                    res.send("Erro.");
                }
            }).catch((erro) => {
                if (erro) {
                    res.statusCode = 417;
                    res.send("Erro.");
                    throw erro;
                }
            })
        })

app.listen(8080,() => {
    console.log("API rodando!");
})