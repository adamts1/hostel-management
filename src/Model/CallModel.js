export default class CallModel {
    // #parseRoom     // storing the parseUser object as a private field (might need to use it)
    constructor(parseCall) {
        this.id = parseCall.id;
        this.title = parseCall.get("title");
        this.urgentLevel = parseCall.get("urgentLevel");
        this.description = parseCall.get("description");
        this.status = parseCall.get("status");
        this.notes = parseCall.get("notes");
        this.parseCall = parseCall;
    }

    async deleteCall() {
        const call = this.parseCall.destroy();
        return call;
    }

    async updateCall(notes, status) {
        console.log(notes, status, this.parseCall)
        const callInstance = this.parseCall;
        callInstance.set('notes', notes);
        callInstance.set('status', status);
 
        const parseHostel = await callInstance.save();
        // const call = this.parseCall.destroy();
        // return call;
    }
}
