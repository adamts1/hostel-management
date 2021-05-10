import Parse from 'parse';

export default class HostelModel {
    #parseHostel      // storing the parseUser object as a private field (might need to use it)
    constructor(parseHostel) {
        this.id = parseHostel.id;
        this.hostelName = parseHostel.get("hostelName");
        this.hostelAddress = parseHostel.get("hostelAddress");
        this.numberOfRooms = parseHostel.get("numberOfRooms");
        this.#parseHostel = parseHostel;
    }

    static HostelModel = null;



    static async deleteHostel(hostelId) {
        const HostelTable = Parse.Object.extend('Hostel');
        const query = new Parse.Query(HostelTable);
        // here you put the objectId that you want to delete
        const parseHostel = await query.get(hostelId);
        const hostel =  parseHostel.destroy();
        return hostel;
    }


    static async updateHostel(name, address, numOfRooms, hostelId) {
        const HostelTable = Parse.Object.extend('Hostel');
        const query = new Parse.Query(HostelTable);
        // here you put the objectId that you want to delete
        const parseHostel = await query.get(hostelId);
        
        parseHostel.set('hostelAddress', address);
        parseHostel.set('numberOfRooms', numOfRooms);
        parseHostel.set('hostelName', name);
        const updatedHostel = parseHostel.save()
        return updatedHostel;
    }

}
