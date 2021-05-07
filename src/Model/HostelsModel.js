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

}
