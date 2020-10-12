import { Document, model, Model, Schema } from "mongoose";

export interface User {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
}

export const UserSchema : Schema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

export interface UserDocument extends User, Document {};

export const UserModel = model<UserDocument>("user", UserSchema);

export function addUser(user : User) : void {
    UserModel.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    }).catch(error => {
        if (error.code == 11000) console.log("Unable to add duplicate email.");
    });
};

export async function findUser(email : string) : Promise<User | null> {
    return UserModel.findOne({ "email": email }, (err, doc) => {
        return (doc == null ? null : doc as User);
    });
}

export async function getAllUsers() : Promise<Array<User>> {
    return UserModel.find({}, (err, docs) => {
        return docs;
    });
}

// UserSchema.index({"$**": "text"}); // Only created once
export async function searchUsers(query : string) : Promise<Array<User>> {
    return UserModel.find(
        { $text: { $search: "lukas"} },
        { score: { $meta: "textScore" }})
    .sort({score: {$meta: 'textScore'}});
}