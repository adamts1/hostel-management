import Parse, { User } from 'parse';

export default class UserModel {
    #parseUser  // storing the parseUser object as a private field (might need to use it)
    constructor(parseUser) {
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.#parseUser = parseUser;
    }

    static activeUser = null;


    static async login(email,pwd){
        const parseUser =  await Parse.User.logIn(email,pwd);
        UserModel.activeUser = new UserModel(parseUser)
        return UserModel.activeUser

    }

    static loadActiveUser(){
        console.log(Parse.User.current())
        UserModel.activeUser = Parse.User.current() ? new UserModel(Parse.User.current()) : null
        return UserModel.activeUser
    }

    

}
