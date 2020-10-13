import express, { Router, Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { addUser, findUser, User } from "../data/user";

const users : Array<User> = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        // This is the SHA256 hash for value of `password`
        password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
    }
];

// This will hold the users and authToken related to users
export const authTokens : Map<String, User> = new Map<String, User>();

function getHashedPassword(password : string) : string {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

function generateAuthToken() : string {
    return crypto.randomBytes(30).toString('hex');
}

function removeTokens(user : User) {
    for (let token in authTokens.keys()) {
        if ((authTokens.get(token) as User).email === user.email) authTokens.delete(token);
    }
}

export function requireAuth(req : Request, res : Response, next : NextFunction) : void {
    console.log(authTokens);
    if (req.body.user) {
        next();
    } else {
        res.send(403);
    }
};


const router : Router = express.Router();

router.post("/register", (req : Request, res : Response) => {
    console.log(req.body);
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPassword) {

        // Check if user with the same email is also registered
        if (findUser(req.body.email)) {
            res.sendStatus(403);
            return;
        }

        const hashedPassword : string = getHashedPassword(password);

        // Store user into the database
        addUser({
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

router.post('/login', (req : Request, res : Response) => {
    const { email, password } = req.body;
    const hashedPassword : string = getHashedPassword(password);
    
    findUser(email).then(user => {
        if (user != null && user.password == hashedPassword) {
            // Remove tokens already in use
            removeTokens(user);
            
            const authToken = generateAuthToken();
    
            // Store authentication token
            authTokens.set(authToken, user);
    
            // Setting the auth token in cookies
            res.cookie('AuthToken', authToken);
    
            // Sending the auth token in body as well
            res.send({"AuthToken": authToken});
        } else {
            res.sendStatus(403);
        }
    })
});

router.post('/logout', requireAuth, (req : Request, res : Response) => {
    removeTokens(req.body.user);
});

// Example function that requires authentication
router.get("/:email", requireAuth, (req : Request, res : Response) => {
    res.send(req.body.user);
});

export default router;