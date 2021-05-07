import Parse from 'parse';
import HostelsModel from '../Model/HostelsModel'

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


    static async login(email, pwd) {
        const parseUser = await Parse.User.logIn(email, pwd);
        UserModel.activeUser = new UserModel(parseUser);
        return UserModel.activeUser;
    }


    static async signup(email, pwd, fname, lname) {
        const user = new Parse.User()
        user.set('username', email);
        user.set('email', email);
        user.set('fname', fname);
        user.set('lname', lname);
        user.set('password', pwd);

        const parseUser =  await user.signUp()
        UserModel.activeUser = new UserModel(parseUser)
        return UserModel.activeUser
        
    }

    async createHostel(name, addrees, numOfRooms) {
     

        console.log(name, addrees, numOfRooms)
        const HostelTable = Parse.Object.extend('Hostel');
        const newHostel= new HostelTable();
        console.log(newHostel)

        newHostel.set('hostelName', name);
        newHostel.set('hostelAddress', addrees);
        newHostel.set('numberOfRooms', numOfRooms);
        newHostel.set('userId', this.#parseUser);

        const parseHostel = await newHostel.save();
        const hostel = new HostelsModel(parseHostel);
        return hostel;
    }

    static loadActiveUser() {
        UserModel.activeUser = Parse.User.current() ? new UserModel(Parse.User.current()) : null;
        return UserModel.activeUser;
    }
}
