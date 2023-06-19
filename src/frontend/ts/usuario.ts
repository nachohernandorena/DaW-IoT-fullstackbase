class Usuario extends Persona implements ComportamientoAcceso{
  public email: string;
  constructor(usr: string, x: string) {
      super(x);
      this.email = usr;
      
  }
  public mostrar(): string{
      return "usuario " + this.email;
  }
  accesoAmodificaciones(): boolean{
          return false;
  }
  accesoAlLogin(): boolean{
      return true;
  }
  
}