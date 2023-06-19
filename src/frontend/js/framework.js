var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Framework {
    // Método para realizar una solicitud de desarrollo (devRequest)
    devRequest(metodo, url, responseHandler) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    let devList = JSON.parse(xmlHttp.responseText);
                    responseHandler.loadGrid(devList);
                }
                else {
                    alert("Error en la consulta");
                }
            }
        };
        xmlHttp.open(metodo, url, true);
        xmlHttp.send();
    }
    // Método para realizar una solicitud de cambio (changeRequest)
    changeRequest(metodo, url, responseHandler, data) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    console.log(xmlHttp.responseText);
                }
                else {
                    alert("Error en la consulta");
                }
            }
        };
        xmlHttp.open(metodo, url, true);
        if (data != undefined) {
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify(data));
        }
    }
    // Método para realizar una solicitud genérica (makeRequest)
    makeRequest(metodo, url, responseHandler, action) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    let device = JSON.parse(xmlHttp.responseText);
                    responseHandler.loadDevice(device[0], action);
                }
                else {
                    alert("Error en la consulta");
                }
            }
        };
        xmlHttp.open(metodo, url, true);
        xmlHttp.send();
    }
    // Método para realizar una solicitud de eliminación (deleteRequest)
    deleteRequest(metodo, url, responseHandler) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    console.log(xmlHttp.responseText);
                }
                else {
                    alert("Error en la consulta");
                }
            }
        };
        xmlHttp.open(metodo, url, true);
        xmlHttp.send();
    }
    // Método para realizar una solicitud de adición (addRequest)
    addRequest(metodo, url, responseHandler, data) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    console.log(xmlHttp.responseText);
                }
                else {
                    alert("Error en la consulta");
                }
            }
        };
        xmlHttp.open(metodo, url, true);
        if (data != undefined) {
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify(data));
        }
    }
    // Método para realizar una solicitud de inicio de sesión (loginRequest)
    loginRequest(metodo, url, responseHandler, data) {
        return new Promise((resolve, reject) => {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
                        resolve(true);
                    }
                    else if (xmlHttp.status == 401) {
                        resolve(false);
                    }
                    else {
                        resolve(false);
                    }
                }
            };
            xmlHttp.open(metodo, url, true);
            xmlHttp.setRequestHeader('Content-Type', 'application/json');
            xmlHttp.send(JSON.stringify(data));
        });
    }
    // --- pendiente implementacion
    // Método para obtener el ID del usuario actual (currentUserIDRequest)
    currentUserIDRequest(metodo, url, responseHandler, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url, {
                    method: metodo,
                    body: JSON.stringify({ email })
                });
                if (response.ok) {
                    const { user_id } = yield response.json();
                    responseHandler.currentUserID(user_id);
                    return user_id;
                }
                else {
                    throw new Error("Error en la consulta");
                }
            }
            catch (error) {
                alert(error.message);
                throw error;
            }
        });
    }
}
