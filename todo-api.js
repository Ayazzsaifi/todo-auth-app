const express = require("express");
const bcrypt = require('bcrypt')
const app = express();
require('dotenv').config()
app.use(express.static('public'))
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
app.use(express.json());

const users = [];
let todoList = []

//------------bcrypt encryptipon Added----
async function encrypt(req, res, next) {
    const password = req.body.password
    async function hashPassword(password) {
        const pass = await bcrypt.hash(password, 10);
        return pass
    }
    //----------------------------------------
    const hashedPassword = await (hashPassword(password));
    req.hashedPassword = hashedPassword
    next();
}



app.post("/signup", encrypt, async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const existinguser = users.find(function (u) {
        return u.username === username;
    })

    if (!existinguser) {
        users.push({ username, hashedPassword: req.hashedPassword });
        res.json({ message: "Successfully signin" })
    }
    else { res.json({ err: username + " is already exist" }) }


});

app.post("/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = users.find(function (u) {
        return u.username === username;
    })
    if (userExist) {
        const isMatch = await bcrypt.compare(password,userExist.hashedPassword);
        if(isMatch){
            const token=jwt.sign({username:userExist.username},JWT_SECRET)
            res.json({token:token});
        }
        else {
            res.json({ err: "password is wrong" });
        }
    } else {
        res.json({ err: "No user Found" });
    }
});

// Token verifaction middleware

function checkToken(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.json("Youre not logged In")
    }
    try {
        jwt.verify(authorization, JWT_SECRET);
        next();
    }
    catch (err) { res.json("err:token is invalid/expire") };

}


app.get("/todos", checkToken, function (req, res) {
    res.json(todoList)
});

app.post("/todos", checkToken, function (req, res) {
    const text = req.body.text;
    const id = Math.floor(Math.random() * 99999);
    const completed = false;
    todoList.push({ text, id, completed })
    res.json({ message: "Todo is added" });
});

app.put("/todos/:id", checkToken, function (req, res) {
    const id = Number(req.params.id);
    const todo = todoList.find(function (u) {
        return u.id === id;
    })
    if (!todo) {
        return res.json({ err: "No todo find" })
    }
    if (req.body.text) {
        todo.text = req.body.text;
    }
    if (req.body.completed) {
        todo.completed = req.body.completed
    }
    res.json({ message: "updated" })

});

app.delete("/todos/:id", checkToken, function (req, res) {
    const id = Number(req.params.id);

    todoList = todoList.filter(function (u) {
        return u.id != id;
    });

    res.json({
        message: "Todo Deleted"
    });

});


app.listen(3000);