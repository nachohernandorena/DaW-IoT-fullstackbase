class Framework {
  
  // Método para realizar una solicitud de desarrollo (devRequest)
  public devRequest(metodo: string, url: string, responseHandler:httpResponse) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {
              let devList: Array<Device> = JSON.parse(xmlHttp.responseText);
              responseHandler.loadGrid(devList);
            } else {
                alert("Error en la consulta");
            }
          }
        }
    xmlHttp.open(metodo, url, true);
    xmlHttp.send();
  }

  // Método para realizar una solicitud de cambio (changeRequest)
  public changeRequest(metodo: string, url: string, responseHandler:httpResponse, data: any) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {
            console.log(xmlHttp.responseText); 
            } else {
                alert("Error en la consulta");
            }
          }
        }
    xmlHttp.open(metodo, url, true);
    if (data != undefined) {
      xmlHttp.setRequestHeader("Content-Type", "application/json");  
      xmlHttp.send(JSON.stringify(data));
    }
  }

  // Método para realizar una solicitud genérica (makeRequest)
  public makeRequest(metodo: string, url: string, responseHandler:httpResponse, action: string) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          let device: Device = JSON.parse(xmlHttp.responseText);
          responseHandler.loadDevice(device[0], action);
        } else {
          alert("Error en la consulta");
        }
      }
    }
    xmlHttp.open(metodo, url, true);
    xmlHttp.send();
  }

  // Método para realizar una solicitud de eliminación (deleteRequest)
  public deleteRequest(metodo: string, url: string, responseHandler:httpResponse) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          console.log(xmlHttp.responseText);
        } else {
          alert("Error en la consulta");
        }
      }
    }
    xmlHttp.open(metodo, url, true);
    xmlHttp.send();
  }

  // Método para realizar una solicitud de adición (addRequest)
  public addRequest(metodo: string, url: string, responseHandler:httpResponse, data: any) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          console.log(xmlHttp.responseText);
        } else {
          alert("Error en la consulta");
        }
      }
    }
    xmlHttp.open(metodo, url, true);
    if (data != undefined) {
      xmlHttp.setRequestHeader("Content-Type", "application/json");  
      xmlHttp.send(JSON.stringify(data));
    }
  }

  // Método para realizar una solicitud de inicio de sesión (loginRequest)
  public loginRequest(metodo: string, url: string, responseHandler: httpResponse, data: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4) {
          if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
            resolve(true);
          } else if (xmlHttp.status == 401) {
            resolve(false);
          } else {
            resolve(false);
          }
        }
      }
      
      xmlHttp.open(metodo, url, true);
      xmlHttp.setRequestHeader('Content-Type', 'application/json');
      xmlHttp.send(JSON.stringify(data));
    });
  }

  // --- pendiente implementacion
  // Método para obtener el ID del usuario actual (currentUserIDRequest)
  public async currentUserIDRequest(metodo: string, url: string, responseHandler: httpResponse, email: string): Promise<string> {
    try {
      const response = await fetch(url, {
        method: metodo,
        body: JSON.stringify({ email })
      });
  
      if (response.ok) {
        const { user_id } = await response.json();
        responseHandler.currentUserID(user_id);
        return user_id;
      } else {
        throw new Error("Error en la consulta");
      }
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }

}