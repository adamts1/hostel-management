

export default class RoomlModel {
    // #parseRoom     // storing the parseUser object as a private field (might need to use it)
    constructor(parseRoom) {
        this.id = parseRoom.id;
        this.pricePerDay = parseRoom.get("pricePerDay");
        this.maxBed = parseRoom.get("maxBed");
        this.roomNumber = parseRoom.get("roomNumber");
        this.notes = parseRoom.get("notes");
        this.parseRoom = parseRoom;
    }


    async deleteRoom() {
        const hostel = this.parseRoom.destroy();
        return hostel;
    }

    async updateRoom(roomNumber, maxBeds, pricePerDay, notes) {
        const room = this.parseRoom;
        room.set("roomNumber", roomNumber);
        room.set("maxBeds", maxBeds);
        room.set("pricePerDay", pricePerDay);
        room.set("notes", notes);
        const updatedRoom = await room.save();
        return updatedRoom;
    }


}
