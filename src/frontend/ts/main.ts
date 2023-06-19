var M;

class Main implements EventListenerObject, httpResponse {
  private framework: Framework = new Framework();

  // Función para realizar la consulta inicial
  initialQuery() {
    this.framework.devRequest("GET", "http://localhost:8000/devices", this);
  }
  
  // Función para consultar un dispositivo específico
  queryDevice(devID: number, action: string) {
    return this.framework.makeRequest("GET", `http://localhost:8000/devices/${devID}`, this, action);
  }
  
  // Función para agregar un dispositivo nuevo
  addDevice(name: string, description: string, type: string, user_id: string) {
    const newDevice = { name, description, type, state: 0, user_id };
    this.framework.addRequest("POST", "http://localhost:8000/devices/", this, newDevice);
  }
  
  // Función para cambiar el estado de un dispositivo
  changeState(devID: number, state: number) {
    const changedDevice = { state };
    this.framework.changeRequest("PUT", `http://localhost:8000/devices/state/${devID}`, this, changedDevice);
  }
  
  // Función para cambiar los detalles de un dispositivo
  changeDevice(devID: number, name: string, description: string, type: number) {
    const changedDevice = { name, description, type };
    this.framework.changeRequest("PUT", `http://localhost:8000/devices/${devID}`, this, changedDevice);
  }
  
  // Función para eliminar un dispositivo
  deleteDevice(devID: number) {
    this.framework.deleteRequest("DELETE", `http://localhost:8000/devices/${devID}`, this);
  }
  
  // Función para verificar usuarios
  loginUser(email: string, password: string) {
    const user = { email, password };
    return this.framework.loginRequest("POST", `http://localhost:8000/login`, this, user);
  }

  // Función para obtener el user_id --- pendiente implementacion
  currentUserID(email: string){
    this.framework.currentUserIDRequest("GET", "http://localhost:8000/user_id", this, email);
  }
     
  // Función para actualizar la SPA (Single Page Application)
  refreshSPA(tipoModal: string) {
    this.initialQuery();
    const modal = document.getElementById(tipoModal);
    const instanceModal = M.Modal.getInstance(modal);
    instanceModal.close();
  }

  loadGrid(devList: Array<Device>) {
    const devbox = document.getElementById("devbox");
    let grid = `<ul class="collection">`;
  
    // Ocultar elementos relacionados al inicio de sesión
    const divEmail = document.getElementById("divEmail");
    divEmail.hidden = true;
    const divPassword = document.getElementById("divPassword");
    divPassword.hidden = true;
    const divEnter = document.getElementById("divEnter");
    divEnter.hidden = true;
    const welcome = document.getElementById("welcome");
    welcome.hidden = true;
  
    // Mostrar el título y el email del usuario
    const title = document.getElementById("title");
    title.hidden = false;
    const nombre = (<HTMLInputElement>document.getElementById("email")).value;
    const hello = document.getElementById("hello");
    hello.innerHTML = `Usuario: ${nombre}`;
    hello.hidden = false;
  
    // Mostrar el botón para agregar un dispositivo
    const devbtnadd = document.getElementById("divAdd");
    devbtnadd.hidden = false;
  
    // Mostrar el botón logout
    const logbtn = document.getElementById("logout-button");
    logbtn.hidden = false;
  
   // Filtrar los dispositivos del usuario "1", para el ejemplo es admin@admin.com. Queda pendiente implementacion para que traiga las vistas de dispositivos dependiendo del usuario que se loguea
   const currentUserDevices = devList.filter(dev => dev.user_id === 1);

    for (const dev of currentUserDevices) {
        let deviceType = "";
        let deviceImage = "";
        let extraFields = "";
      
        // Comprobar el tipo de dispositivo y construir la grid correspondiente
        if (dev.type === 1) {
          deviceType = "lightbulb";
          deviceImage = "static/images/lightbulb.png";
          extraFields = `
            <div class="switch">
              <label>
                Off
                <input id="val_${dev.id}" type="checkbox" ${dev.state ? 'checked' : ''}>
                <span class="lever"></span>
                On
              </label>
            </div>`;
        } else if (dev.type === 2) {
          deviceType = "window";
          deviceImage = "static/images/window.png";
          extraFields = `
            <form action="#">
              <p class="range-field">
                <input type="range" id="val_${dev.id}" min="0" max="100" step="10" value="${dev.state}">
                <label for="val_${dev.id}">${dev.state} %</label>
              </p>
            </form>`;
        } else if (dev.type === 3) {
          deviceType = "air";
          deviceImage = "static/images/air.png";
          extraFields = `
            <form action="#">
              <label>
                <span class="switch">
                  <p>
                    <label>
                      Off
                      <input type="checkbox" id="mode_${dev.id}" ${dev.state ? 'checked' : ''}>
                      <span class="lever"></span>
                      On
                    </label>
                  </p>
                </span>
              </label>
              <p>
                <label>
                  <span class="switch">
                    <label>
                      Frio 🧊
                      <input type="checkbox" id="frio_${dev.id}" ${dev.frio ? 'checked' : ''}>
                      <span class="lever" id="lever_frio_${dev.id}"></span>
                      Calor 🌞
                    </label>
                  </span>
                </label>
              </p>
              <p class="range-field">
                <input type="range" id="val_${dev.id}" min="14" max="30" step="1" value="${dev.state}">
                <label for="val_${dev.id}">${dev.state} °C</label>
              </p>
            </form>`;
        }
      
        grid += `
          <li class="collection-item avatar">
            <img src="${deviceImage}" alt=" " class="circle">
            <span class="title negrita" id="${dev.name}">${dev.name}</span>
            <p>${dev.description}</p>
            <a class="secondary-content">
              ${extraFields}
            </a>
            <br>
            <button class="btn waves-effect waves-light button-view" id="mod-button${dev.id}" name="hello_button">
              <i id="mod-button${dev.id}" class="material-icons left">edit</i>Modificar
            </button>
            <button class="btn waves-effect waves-light button-view" id="del-button${dev.id}" name="hello_button">
              <i id="del-button${dev.id}" class="material-icons left">delete</i>Eliminar
            </button>
          </li>`;
      }

      grid += `</ul>`;
      devbox.innerHTML = grid;

        // Asignar eventos a los elementos creados dinámicamente
        for (let dev of currentUserDevices) {
            document.getElementById("val_" + dev.id).addEventListener("click", this);
            document.getElementById("mod-button" + dev.id).addEventListener("click", this);
            document.getElementById("del-button" + dev.id).addEventListener("click", this);
        }
            
  } 
    loadDevice(device: Device, action: string) {
      // Comprobar la acción y asignar los valores correspondientes a los elementos del formulario de edición o eliminación
      if (action == "edit") {
          (<HTMLInputElement>document.getElementById("edit-device-id")).value = device.id.toString();
          (<HTMLInputElement>document.getElementById("edit-name")).value = device.name;
          (<HTMLInputElement>document.getElementById("edit-description")).value = device.description;

          let select = document.getElementById("select-edit-type");
          var instanceSelect = M.FormSelect.getInstance(select);
          (<HTMLInputElement>select).value = device.type.toString();
          instanceSelect.destroy();
          M.FormSelect.init(select, "");
      } else if (action == "delete") {
          document.getElementById("delete-id").innerHTML = device.id.toString();
          document.getElementById("delete-name").innerHTML = device.name;
          document.getElementById("delete-description").innerHTML = device.description;
          (<HTMLInputElement>document.getElementById("input-delete-id")).value = device.id.toString();
      }
    }

    openModal(mode: string) {
      // Abrir el modal correspondiente según el modo especificado
      let modal = document.getElementById(mode)
      var instanceModal = M.Modal.getInstance(modal);
      instanceModal.open();
    }

    closeModal(mode: string) {
      // Cerrar el modal correspondiente según el modo especificado
      let modal = document.getElementById(mode)
      var instanceModal = M.Modal.getInstance(modal);
      instanceModal.close();
    }

    handleEvent(object: Event): void {
      let objEvent: HTMLInputElement;
      objEvent = <HTMLInputElement>object.target;
      console.log(objEvent);
      let devstate: number;
      // Manejar eventos según el elemento que haya sido activado
      if (objEvent.id == "enter-button") {
          const email = (<HTMLInputElement>document.getElementById("email")).value;
          if (email.length === 0) {
              M.toast({ html: '📧 Ingrese email', classes: 'toast-centered' });
          } else {
            const password = (<HTMLInputElement>document.getElementById("password")).value;
            if (password.length === 0) {
                M.toast({ html: '🔑 Ingrese contraseña', classes: 'toast-centered' });
            } else {
              this.loginUser(email, password).then((loginOK) => {
                if (loginOK) {
                  M.toast({ html: "Ingresando..." });
                  this.initialQuery();  
                } else {
                  M.toast({ html: "Error de usuario y/o contraseña", classes: 'toast-centered' });
                }
              })
              .catch((error) => {
                M.toast({ html: "Error desconocido", classes: 'toast-centered'  });
              });
          } 
      }
   
      } else if (objEvent.type == "checkbox") {
          // Cambiar el estado del dispositivo según el estado del checkbox
          if (objEvent.checked == true) {
              devstate = 1;
          } else {
              devstate = 0;
          }
          let devid = parseInt(objEvent.id.replace('val_', ''));
          this.changeState(devid, devstate);
      } else if (objEvent.type == "range") {
          // Cambiar el estado del dispositivo según el valor del rango
          devstate = parseInt(objEvent.value);
          let devid = parseInt(objEvent.id.replace('val_', ''));
          this.changeState(devid, devstate);
      } else if (objEvent.id.startsWith("mod-button")) {
          // Obtener el ID del dispositivo para editar y abrir el modal de edición
          let devid: number = parseInt(objEvent.id.replace('mod-button', ''));
          this.queryDevice(devid, "edit");
          this.openModal("edit-modal");
      } else if (objEvent.id.startsWith("del-button")) {
          // Obtener el ID del dispositivo para eliminar y abrir el modal de eliminación
          let devid: number = parseInt(objEvent.id.replace('del-button', ''));
          this.queryDevice(devid, "delete");
          this.openModal("delete-modal");
      } else if (objEvent.id == "add-button") {
          // Obtener el ID del dispositivo para agregar y abrir el modal de agregar
          let devid: number = parseInt(objEvent.id);
          this.queryDevice(devid, "add");
          this.openModal("add-modal");
      } else if (objEvent.id == "cancel-edit") {
          // Cerrar el modal de edición
          this.closeModal("edit-modal");
      } else if (objEvent.id == "confirm-edit") {
          // Obtener los valores editados del formulario y aplicar los cambios al dispositivo
          let devid: number = +(<HTMLInputElement>document.getElementById("edit-device-id")).value;
          let name = (<HTMLInputElement>document.getElementById("edit-name")).value;
          let description = (<HTMLInputElement>document.getElementById("edit-description")).value;
          let type = parseInt((<HTMLInputElement>document.getElementById("select-edit-type")).value);
          if (devid && name && description && type) {
              this.changeDevice(devid, name, description, type);
              M.toast({ html: '👍 Dispositivo modificado', classes: 'toast-centered' });
              this.refreshSPA("edit-modal");
          } else {
              M.toast({ html: '👁️‍🗨️ Completar todos los atributos!', classes: 'toast-centered' });
          }
      } else if (objEvent.id == "cancel-delete") {
          // Cerrar el modal de eliminación
          this.closeModal("delete-modal");
      } else if (objEvent.id == "confirm-delete") {
          // Obtener el ID del dispositivo a eliminar y eliminarlo
          let devid: number = +(<HTMLInputElement>document.getElementById("input-delete-id")).value;
          this.deleteDevice(devid);
          M.toast({ html: '❌ Dispositivo eliminado', classes: 'toast-centered' });
          this.refreshSPA("delete-modal");
      } else if (objEvent.id == "cancel-add") {
          // Cerrar el modal de agregar
          this.closeModal("add-modal");
      } else if (objEvent.id == "confirm-add") {
          // Obtener los valores del formulario y agregar un nuevo dispositivo
          let name = (<HTMLInputElement>document.getElementById("txt-name")).value;
          let description = (<HTMLInputElement>document.getElementById("txt-description")).value;
          let type = (<HTMLInputElement>document.getElementById("select-type")).value;
          if (name && description && type) {
              const user_id = '1'; // Agrega dispositivos del usuario "1", para el ejemplo es admin@admin.com. Queda pendiente implementacion para cargue los dispositivos dependiendo del usuario que se loguea
              this.addDevice(name, description, type, user_id);
              M.toast({ html: '👍 Dispositivo agregado', classes: 'toast-centered' });
              this.refreshSPA("add-modal");
          } else {
              M.toast({ html: '👁️‍🗨️ Completar todos los atributos!', classes: 'toast-centered' });
          }
      }
    }

}    
window.addEventListener("load", () => {
  let main: Main = new Main();
  // Seleccionar todos los elementos 'select' y aplicar la inicialización de Materialize Select
  var elements = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elements, "");
  // Seleccionar todos los elementos con la clase 'modal' y aplicar la inicialización de Materialize Modal
  var elementsM = document.querySelectorAll('.modal');
  M.Modal.init(elementsM, "");
  // Asignar event listeners a los botones principales
  document.getElementById("add-button").addEventListener("click", main);
  document.getElementById("enter-button").addEventListener("click", main);
  // Asignar event listeners a los botones de los modales
  document.getElementById("cancel-add").addEventListener("click", main);
  document.getElementById("confirm-edit").addEventListener("click", main);
  document.getElementById("cancel-edit").addEventListener("click", main);
  document.getElementById("confirm-delete").addEventListener("click", main);
  document.getElementById("cancel-delete").addEventListener("click", main);
  document.getElementById("confirm-add").addEventListener("click", main);
});