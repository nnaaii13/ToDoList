var todos = []; //variable, que a su vez es un array vacío. Aquí se guardarán las tareas

//cargar la lista de tareas desde LocalStorage al iniciar
function cargarToDos() { //función para cargar las tareas desde LocalStorage
    const todosGuardados = localStorage.getItem('todos');
    if (todosGuardados) { //si hay tareas guardadas...
        todos = JSON.parse(todosGuardados); //convierte las tareas de texto a JSON y las guarda en el array que hemos creado antes (todos)
    }
    listarToDosFn(); //llama a la funcion que muestra las tareas en la interfaz
}

function guardarToDos() { //función para guardar las tareas en LocalStorage
    localStorage.setItem('todos', JSON.stringify(todos)); //convierte el array a texto y lo guarda en LocalStorage
}

function crearToDoFn() {
    var input_crear = document.querySelector("#input_crear"); //selecciona el elemento de entrada donde se escribe la tarea
    if(input_crear.value == ""){ //si el campo está vacío...
        alert("Por favor ingrese la actividad que quiere realizar."); //muestra un mensaje de alerta
    } else { //si el campo no está vacío...
        var nuevo_todo = { //crea un nuevo objeto para la tarea
            titulo: input_crear.value, //guarda el texto como titulo de la tarea
            hecho: false, //inicialmente, la tarea no está hecha
            eliminado: false, //inicialmente, la tarea no está eliminada
            fechaCreacion: new Date().toLocaleString(), //fecha en la que se ha creado la tarea
            fechaCompletado: null, //fecha en la que se ha completado la tarea
            fechaEliminacion: null //fecha en la que se ha eliminado la tarea
        };
    
        todos.push(nuevo_todo); //agrega la nueva tarea al array de tareas
        input_crear.value = ''; //limpia el campo de entrada
        listarToDosFn(); //muestra las tareas en la interfaz
        guardarToDos(); //guarda las tareas en LocalStorage
    }
}

//función para listar tareas según el filtro seleccionado
function listarToDosFn() {
    var tareas_no_realizadas = document.querySelector("#tareas_no_realizadas"); //selecciona las tareas no realizadas
    var tareas_realizadas = document.querySelector("#tareas_realizadas"); //selecciona las tareas realizadas
    var tareas_eliminadas = document.querySelector("#tareas_eliminadas");  //selecciona las tareas eliminadas

    //obtener el valor del filtro
    var filtro = document.querySelector("#filtro_tareas").value; 

    //limpiar las listas
    tareas_no_realizadas.innerHTML = "";
    tareas_realizadas.innerHTML = "";
    tareas_eliminadas.innerHTML = "";

    //ocultar o mostrar columnas según el filtro
    if (filtro === "realizadas") {
        tareas_no_realizadas.style.display = "none";
        tareas_eliminadas.style.display = "none";
        tareas_realizadas.style.display = "block";

    } else if (filtro === "no_realizadas") {
        tareas_realizadas.style.display = "none";
        tareas_eliminadas.style.display = "none";
        tareas_no_realizadas.style.display = "block";

    } else if (filtro === "eliminadas") {
        tareas_no_realizadas.style.display = "none";
        tareas_realizadas.style.display = "none";
        tareas_eliminadas.style.display = "block";

    } else {
        //si el filtro es "todas"
        tareas_no_realizadas.style.display = "block";
        tareas_realizadas.style.display = "block";
        tareas_eliminadas.style.display = "block";
    }

    for (var i = 0; i < todos.length; i++) { //recorrer todas las tareas
        //filtrar según el estado
        if (filtro === "todas" || 
            (filtro === "no_realizadas" && !todos[i].hecho && !todos[i].eliminado) ||
            (filtro === "realizadas" && todos[i].hecho && !todos[i].eliminado) ||
            (filtro === "eliminadas" && todos[i].eliminado)) {
            
            var contenedor_todo = document.createElement("div"); //crea un nuevo div para la tarea
            contenedor_todo.className = "todo"; //le asigna la clase "todo"
            
            var checkbox_hecho = document.createElement("input"); //crea un nuevo input para el checkbox
            checkbox_hecho.type = "checkbox"; //lo establece como tipo checkbox
            checkbox_hecho.checked = todos[i].hecho;  //lo marca si la tarea está hecha
            checkbox_hecho.setAttribute("onChange", "marcar_hechoToDoFn(" + i + ")"); //agrega un evento para marcar la tarea como hecha
            
            var spam_titulo = document.createElement("span"); //crea un nuevo span para el título de la tarea
            spam_titulo.textContent = todos[i].titulo; //le asigna el texto de la tarea
            spam_titulo.className = "spam"; //le asigna la clase "spam"
            
            var fechaCreacion = document.createElement("span"); //crea un nuevo span para la fecha de creación
            fechaCreacion.textContent = "Creado: " + todos[i].fechaCreacion; //le asigna la fecha de creación
            fechaCreacion.className = "fecha"; //le asigna la clase "fecha"

            var buttom_eliminar = document.createElement("button"); //crea un nuevo botón para eliminar la tarea
            buttom_eliminar.textContent = "Eliminar"; //le asigna el texto "Eliminar"
            buttom_eliminar.setAttribute("onClick", "eliminar_todo(" + i + ")"); //agrega un evento para eliminar la tarea
            buttom_eliminar.className = "boton_eliminar"; //le asigna la clase "boton_eliminar"

            contenedor_todo.appendChild(checkbox_hecho); //agrega el checkbox al div de la tarea
            contenedor_todo.appendChild(spam_titulo); //agrega el título al div de la tarea
            contenedor_todo.appendChild(fechaCreacion); //agrega la fecha de creación al div de la tarea
            contenedor_todo.appendChild(buttom_eliminar); //agrega el botón de eliminar al div de la tarea

            if (todos[i].eliminado) { //si la tarea está eliminada...
                var fechaEliminacion = document.createElement("span"); //crea un nuevo span para la fecha de eliminación
                fechaEliminacion.textContent = "Eliminado: " + todos[i].fechaEliminacion; //le asigna la fecha de eliminación
                fechaEliminacion.className = "fecha"; //le asigna la clase "fecha"
                contenedor_todo.appendChild(fechaEliminacion); //agrega la fecha de eliminación al div de la tarea
                tareas_eliminadas.appendChild(contenedor_todo); //agrega la tarea a la columna de tareas eliminadas

            } else if (todos[i].hecho) { //si la tarea está hecha...
                var fechaCompletado = document.createElement("span"); //crea un nuevo span para la fecha de completado
                fechaCompletado.textContent = "Completado: " + todos[i].fechaCompletado; //le asigna la fecha de completado
                fechaCompletado.className = "fecha"; //le asigna la clase "fecha"
                contenedor_todo.appendChild(fechaCompletado); //agrega la fecha de completado al div de la tarea
                tareas_realizadas.appendChild(contenedor_todo); //agrega la tarea a la columna de tareas realizadas

            } else { //si la tarea no está hecha...
                tareas_no_realizadas.appendChild(contenedor_todo); //agrega la tarea a la columna de tareas no realizadas
            }
        }
    }
}

//función para eliminar una tarea
function eliminar_todo(i) { //recibe el índice de la tarea que va a eliminar
    todos[i].eliminado = true; //lo marca como eliminado
    todos[i].fechaEliminacion = new Date().toLocaleString(); //guarda la fecha de eliminación
    listarToDosFn(); //muestra las tareas en la interfaz
    guardarToDos(); //lo guarda en LocalStorage
}

//función para marcar una tarea como hecha
function marcar_hechoToDoFn(i) { //recibe el índice de la tarea que va a marcar como hecha
    todos[i].hecho = !todos[i].hecho; //cambia el estado de la tarea
    if (todos[i].hecho) { //si la tarea está hecha...
        todos[i].fechaCompletado = new Date().toLocaleString(); //guarda la fecha de completado

    } else {
        todos[i].fechaCompletado = null; //si la tarea no está hecha, la fecha de completado es nula
    }
    listarToDosFn(); //muestra las tareas en la interfaz
    guardarToDos(); //guarda las tareas en LocalStorage
}

//establece el fondo inicial en morado
document.body.classList.add("tema-morado");

//crear contenedor para los botones de tema
const contenedorBotones = document.createElement("div");
contenedorBotones.className = "contenedor-botones"; //le asigna la clase "contenedor-botones"

//función para cambiar el tema
function cambiarTema(tema) {
    document.body.className = tema; //cambia el tema del body
}

//crear botón morado
const botonMorado = document.createElement("button");
botonMorado.className = "botonTema botonMorado"; //le asigna la clase "botonTema" y "botonMorado"
botonMorado.addEventListener("click", () => cambiarTema("tema-morado")); //agrega un evento de click para cambiar el tema

//crear botón azul
const botonAzul = document.createElement("button");
botonAzul.className = "botonTema botonAzul"; //le asigna la clase "botonTema" y "botonAzul"
botonAzul.addEventListener("click", () => cambiarTema("tema-azul")); //agrega un evento de click para cambiar el tema

//crear botón rosa
const botonRosa = document.createElement("button");
botonRosa.className = "botonTema botonRosa"; //le asigna la clase "botonTema" y "botonRosa"
botonRosa.addEventListener("click", () => cambiarTema("tema-rosa")); //agrega un evento de click para cambiar el tema

//agrega los botones al contenedor y al body
contenedorBotones.appendChild(botonMorado);
contenedorBotones.appendChild(botonAzul);
contenedorBotones.appendChild(botonRosa);
document.body.appendChild(contenedorBotones);

function eliminarTodasLasTareas() { //función para eliminar todas las tareas
    if (confirm("¿Estás seguro de que deseas eliminar todas las tareas definitivamente?")) {
        localStorage.removeItem('todos'); //elimina las tareas del LocalStorage
        todos = []; //limpia el array de tareas
        listarToDosFn(); //actualiza la interfaz
    }
}

//agregar evento para el filtro de tareas
document.querySelector("#filtro_tareas").addEventListener("change", listarToDosFn);

//cargar la lista al iniciar
cargarToDos();