class Usuario extends Persona {
    constructor(usr, x) {
        super(x);
        this.email = usr;
    }
    mostrar() {
        return "usuario " + this.email;
    }
    accesoAmodificaciones() {
        return false;
    }
    accesoAlLogin() {
        return true;
    }
}
