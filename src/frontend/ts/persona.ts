class Persona {
  public nombre:string;
  public dni: number;

  constructor(nombre: string) {
   
      this.nombre = nombre;
  }
  
  public saludar() {
      console.log("Hola soy " + this.nombre);
  }
}