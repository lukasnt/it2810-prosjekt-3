import mongoose, { Connection } from "mongoose";

// Connects to the database set up on the virtual machine
export function connect() : void {
    const connectionString : string = "mongodb://it2810-24.idi.ntnu.no:27017/moviedb?gssapiServiceName=mongodb";
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
}

export let db : Connection = mongoose.connection;

