//general.js

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise 1 resolved")
        },2000)})

        myPromise1.then((successMessage) => {
            res.send(JSON.stringify(books, null, 4));
          })

    //res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise 1 resolved")
        },2000)})

        myPromise1.then((successMessage) => {
            res.send(books[isbn]);
          })

    //res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const keys = Object.keys(books);

    let myPromise1 = new Promise((resolve,reject) => {
                setTimeout(() => {
                  resolve("Promise 1 resolved")
                },2000)})
                
    for (const bookKey of keys)
    {
        if (books[bookKey].author == author)
        {

                myPromise1.then((successMessage) => {
                    res.send(books[bookKey]);
                  })

            //res.send(books[bookKey]);
        }
        
    }
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const keys = Object.keys(books);

    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise 1 resolved")
        },2000)})

    for (const bookKey of keys)
    {
        if (books[bookKey].title == title)
        {

            myPromise1.then((successMessage) => {
                res.send(books[bookKey])
              })

            //res.send(books[bookKey]);
        }
        
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
