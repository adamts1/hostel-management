import Parse from 'parse';
import HostelModel from '../Model/HostelModel'

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

    async getMyHostel() {
        const HostelTable = Parse.Object.extend('Hostel');
        const query = new Parse.Query(HostelTable);
        query.equalTo("userId", this.#parseUser);
        const parseHostels = await query.find();
        const hostels = parseHostels.map(parseHostel => new HostelModel(parseHostel));
        return hostels;
    }

    async createHostel(name, addrees, numOfRooms) {
        const HostelTable = Parse.Object.extend('Hostel');
        const newHostel= new HostelTable();

        newHostel.set('hostelName', name);
        newHostel.set('hostelAddress', addrees);
        newHostel.set('numberOfRooms', numOfRooms);
        newHostel.set('userId', this.#parseUser);

        const parseHostel = await newHostel.save();
        const hostel = new HostelModel(parseHostel);
        return hostel;
    }


    static loadActiveUser() {
        UserModel.activeUser = Parse.User.current() ? new UserModel(Parse.User.current()) : null;
        return UserModel.activeUser;
    }
}
