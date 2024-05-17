export class ErrorWithoutPermission extends Error {
    constructor() {
        super("Sem permissão");
    }
}