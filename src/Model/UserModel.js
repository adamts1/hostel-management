import Parse from 'parse';
import HostelModel from '../Model/HostelModel'

export default class UserModel {
    #parseUser  // storing the parseUser object as a private field (might need to use it)
    constructor(parseUser) {
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.showEmail = parseUser.get("showEmail");
        this.room = parseUser.get("room");
        this.payment = parseUser.get("payment");
        this.start = parseUser.get("start");
        this.end = parseUser.get("end");
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

    async getMyTenants(hostelKey) {
        const userTable = Parse.Object.extend('User');
        const query = new Parse.Query(userTable);
        query.equalTo("hostelKey", hostelKey);
        const parseTenants = await query.find();
        console.log(parseTenants)
        const tenants = parseTenants.map(parseTenant => new UserModel(parseTenant));
        console.log(tenants)
        return tenants;
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

    static async signupTenant(tenantFName, tenantLName ,tenantEmail, tenantUsername,tenantPassword, tenantRoom, tenantPayment, tenantStart, tenantEnd, hostelKey) {
        const user = new Parse.User()
        user.set("fname", tenantFName);
        user.set("lname", tenantLName);
        user.set("email", tenantEmail);
        user.set("showEmail", tenantEmail);
        user.set("username", tenantUsername);
        user.set("password", tenantPassword);
        user.set("room", tenantRoom);
        user.set("payment", tenantPayment);
        user.set("username", tenantUsername);
        user.set("tenant", true);
        user.set("start", tenantStart);
        user.set("end", tenantEnd);
        user.set("hostelKey", hostelKey);
        
        var sessionToken = Parse.User.current().get("sessionToken");
        // const parseTenant = user.signUp(null, {
        //   success: function (user) {
        //     Parse.User.become(sessionToken).then(function (user) {
        //     }, function (error) {
        //       alert('error');
        //     });
        //   },
        //   error: function (user, error) {
        //   }
        // });
        const parseTenant =  await user.signUp()


        const userModelTenant = new UserModel(parseTenant)
        await Parse.User.become(sessionToken)

        return userModelTenant;


    }


    static loadActiveUser() {
        UserModel.activeUser = Parse.User.current() ? new UserModel(Parse.User.current()) : null;
        return UserModel.activeUser;
    }
}
