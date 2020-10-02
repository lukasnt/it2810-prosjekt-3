import express, { Router, Request, Response } from "express";
import crypto from "crypto";

interface User {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
}

const users : Array<User> = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        // This is the SHA256 hash for value of `password`
        password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
    }
]

function getHashedPassword(password : string) : string {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const router : Router = express.Router();

router.post("/register", (req : Request, res : Response) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPassword) {

        // Check if user with the same email is also registered
        if (users.find(user => user.email === email)) {
            res.sendStatus(403);
            return;
        }

        const hashedPassword : string = getHashedPassword(password);

        // Store user into the database if you are using one
        users.push({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.sendStatus(201);
        console.log(users);
    } else {
        res.sendStatus(403);
    }
});

export default router;