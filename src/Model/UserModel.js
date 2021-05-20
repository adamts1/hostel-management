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
        this.roomKey = parseUser.get("roomKey");
        this.payment = parseUser.get("payment");
        this.start = parseUser.get("start");
        this.end = parseUser.get("end");
        this.img = parseUser.get("img");
        this.activate = parseUser.get("activate");
        this.tenant = parseUser.get("tenant");
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
        query.equalTo("activate", true);
        const parseTenants = await query.find();
        const tenants = parseTenants.map(parseTenant => new UserModel(parseTenant));
        return tenants;
    }

    async getRoomTenants(roomlKey) {
        const userTable = Parse.Object.extend('User');
        const query = new Parse.Query(userTable);
        query.equalTo("roomKey", roomlKey);
        const parseTenants = await query.find();
        const tenants = parseTenants.map(parseTenant => new UserModel(parseTenant));
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

    static async signupTenant(tenantFName, tenantLName ,tenantEmail, tenantUsername,tenantPassword, tenantRoom, tenantRoomKey, tenantPayment, tenantStart, tenantEnd, hostelKey, img) {
        const user = new Parse.User()
        user.set("fname", tenantFName);
        user.set("lname", tenantLName);
        user.set("email", tenantEmail);
        user.set("showEmail", tenantEmail);
        user.set("username", tenantUsername);
        user.set("password", tenantPassword);
        user.set("room", tenantRoom);
        user.set("roomKey", tenantRoomKey);
        user.set("payment", tenantPayment);
        user.set("username", tenantUsername);
        user.set("tenant", true);
        user.set("start", tenantStart);
        user.set("end", tenantEnd);

        // Save Hostel as a string for reference
        user.set("hostelKey", hostelKey);
        // Save Tenant as active true, in case of delete it will change to false 
        user.set("activate", true);
        
        if (img) {
            user.set('img', new Parse.File(img.name, img)); 
        }
        var acl = new Parse.ACL();
        acl.setPublicWriteAccess(true);
        acl.setPublicReadAccess(true);

        user.setACL(acl);

        await user.save({ useMasterKey: true });
        var sessionToken = Parse.User.current().get("sessionToken");
        const parseTenant =  await user.signUp()

         // Create tenant user before returning to admin user
        const userModelTenant = new UserModel(parseTenant)
        // Return to admin user
        await Parse.User.become(sessionToken)
        return userModelTenant;
    }

    async updateTenantRoom(tenantToUpdate) {
        const tenant = this.#parseUser.set('room', "ddddS");;
        console.log(tenant)
        // return(tenant)
    }

    async getTenant() {
        const tenant = this.#parseUser;
        const tenantUserModel = new UserModel(tenant);
        return tenantUserModel
    }

    async deactivateTenant() {
        const tenant = this.#parseUser.set('activate', false);
        this.#parseUser.set('room', "");
        this.#parseUser.set('roomKey', "");
        const deactivatedTenant =  await tenant.save()
        const removedTenant = new UserModel(deactivatedTenant);

        return removedTenant
    }

    static loadActiveUser() {
        UserModel.activeUser = Parse.User.current() ? new UserModel(Parse.User.current()) : null;
        return UserModel.activeUser;
    }
}
