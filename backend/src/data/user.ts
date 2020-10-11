import e from "express";
import { Document, model, Model, Schema } from "mongoose";
import { db } from "./database";

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

export interface IUserModel extends Model<UserDocument> {};

export const UserModel = model<UserDocument>("user", UserSchema);

export function addUser(user : User) {
    UserModel.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    }).catch(error => {
        if (error.code == 11000) console.log("Unable to add duplicate email.");
    });
};