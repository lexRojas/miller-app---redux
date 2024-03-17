export const fijarDatos = (id,data, key) => {
  // Abrir una conexión a IndexedDB
  const request = window.indexedDB.open("miDB", 1);

  request.onsuccess = (event) => {
    const db = event.target.result;

    // Manejar eventos de éxito y error al crear un nuevo almacén de objetos
    db.onerror = (event) => {
      console.error(
        "Error al acceder al almacén de objetos:",
        event.target.error
      );
    };

    db.onversionchange = () => {
      db.close();
      alert(
        "La base de datos ha sido actualizada en otro navegador o pestaña. Por favor, recargue la página."
      );
    };

    // Agregar datos al almacén de objetos
    const transaction = db.transaction(["miObjectStore"], "readwrite");
    const objectStore = transaction.objectStore("miObjectStore");
    const payload = { id,  key, data };

    const addRequest = objectStore.put(payload);
    addRequest.onsuccess = () => {
      console.log("Datos agregados con éxito.");
    };

    addRequest.onerror = (event) => {
      console.error("Error al agregar datos:", event.target.error);
    };

    // Cerrar la conexión a la base de datos cuando hayamos terminado
    transaction.oncomplete = () => {
      db.close();
      console.log("Conexión a la base de datos cerrada.");
    };
  };
  request.onerror = (event) => {
    console.error("Error al abrir la base de datos:", event.target.error);
  };

  // Manejar eventos de éxito y error al crear o actualizar la base de datos
  
  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Crear un almacén de objetos si aún no existe
    if (!db.objectStoreNames.contains("miObjectStore")) {
      const objectStore = db.createObjectStore("miObjectStore", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  };
  
};

export const obtenerDatos = (id) => {
  // Abrir una conexión a IndexedDB
  return new Promise((resolve, reject) => {

    const request = window.indexedDB.open("miDB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Manejar eventos de éxito y error al crear un nuevo almacén de objetos
      db.onerror = (event) => {
        console.error(
          "Error al acceder al almacén de objetos:",
          event.target.error
        );
      };

      db.onversionchange = () => {
        db.close();
        alert(
          "La base de datos ha sido actualizada en otro navegador o pestaña. Por favor, recargue la página."
        );
      };

      // Obtener datos de la base de datos local
      const transaction = db.transaction(["miObjectStore"], "readonly");
      const objectStore = transaction.objectStore("miObjectStore");


      // Obtener datos
      const getRequest = objectStore.get(id);
      getRequest.onsuccess = function(event) {
        if (event.target.result){
          const {data} = event.target.result;
          resolve(data); 
        }else{
          reject(-1);    
        }

      
      };
      getRequest.onerror = () => {
        const data = -1  
        reject(data)
      };

      // Cerrar la conexión a la base de datos cuando hayamos terminado
      transaction.oncomplete = () => {
        db.close();
        console.log("Conexión a la base de datos cerrada.");
      };
    };

    request.onerror = (event) => {
      console.error("Error al abrir la base de datos:", event.target.error);
    };

    // Manejar eventos de éxito y error al crear o actualizar la base de datos
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log("Actualizando base de datos o creando una nueva.");

      // Crear un almacén de objetos si aún no existe
      if (!db.objectStoreNames.contains("miObjectStore")) {
        const objectStore = db.createObjectStore("miObjectStore", {
          keyPath: "id",
          autoIncrement: true,
        });
        console.log("Almacén de objetos creado con éxito.");
      }
    };
  })
};
