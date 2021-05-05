import Parse from 'parse';

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

    // login is an async function that tries to login the user given the email and password.
    // If successfull it will resolve the promise with a UserModel instance of the logged in user
    // If unsuccessfull it will reject the promise with an appropriate error
    static async login(email, pwd) {
        const parseUser = await Parse.User.logIn(email, pwd);
        UserModel.activeUser = new UserModel(parseUser);
        return UserModel.activeUser;
    }


    static loadActiveUser() {
        UserModel.activeUser = Parse.User.current() ? new UserModel(Parse.User.current()) : null;
        return UserModel.activeUser;
    }

    static async signup(email, fname, lname, pwd) {
        const user = new Parse.User()
        user.set('username', email);
        user.set('email', email);
        user.set('fname', fname);
        user.set('lname', lname);
        user.set('password', pwd);

        const parseUser = await user.signUp();
        UserModel.activeUser = new UserModel(parseUser);
        return UserModel.activeUser;
    }

}
