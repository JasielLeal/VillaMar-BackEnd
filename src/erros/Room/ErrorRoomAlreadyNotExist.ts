export class ErrorRoomAlreadyNotExist extends Error {
    constructor() {
        super("Quartão não existe");
    }
}