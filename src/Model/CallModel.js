

export default class CallModel {
    // #parseRoom     // storing the parseUser object as a private field (might need to use it)
    constructor(parseCall) {
        this.id = parseCall.id;
        this.title = parseCall.get("title");
        this.urgentLevel = parseCall.get("urgentLevel");
        this.description = parseCall.get("description");
        this.parseCall = parseCall;
    }

    async deleteCall() {
        const call = this.parseCall.destroy();
        return call;
    }
}
