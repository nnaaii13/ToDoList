var todos = [];

// Cargar la lista de tareas desde LocalStorage al iniciar
function cargarToDos() {
    const todosGuardados = localStorage.getItem('todos');
    if (todosGuardados) {
        todos = JSON.parse(todosGuardados);
    }
    listarToDosFn();
}

function guardarToDos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function crearToDoFn() {
    var input_crear = document.querySelector("#input_crear");
    if(input_crear.value == ""){
        alert("Por favor ingrese la actividad que quiere realizar.");
    } else {
        var nuevo_todo = {
            titulo: input_crear.value,
            hecho: false,
            eliminado: false,
            fechaCreacion: new Date().toLocaleString(), // Fecha de creación
            fechaCompletado: null, // Fecha de completado
            fechaEliminacion: null // Fecha de eliminación
        };
    
        todos.push(nuevo_todo);
        input_crear.value = '';
        listarToDosFn();
        guardarToDos(); // Guardar en LocalStorage
    }
}

function listarToDosFn() {
    var tareas_no_realizadas = document.querySelector("#tareas_no_realizadas");
    var tareas_realizadas = document.querySelector("#tareas_realizadas");
    var tareas_eliminadas = document.querySelector("#tareas_eliminadas");

    tareas_no_realizadas.innerHTML = "";
    tareas_realizadas.innerHTML = "";
    tareas_eliminadas.innerHTML = "";

    for(var i = 0; i < todos.length; i++) {
        var contenedor_todo = document.createElement("div");
        contenedor_todo.className = "todo";
        
        var checkbox_hecho = document.createElement("input");
        checkbox_hecho.type = "checkbox";
        checkbox_hecho.checked = todos[i].hecho;
        checkbox_hecho.setAttribute("onChange", "marcar_hechoToDoFn(" + i + ")");
        
        var spam_titulo = document.createElement("span");
        spam_titulo.textContent = todos[i].titulo;
        spam_titulo.className = "spam";
        
        var fechaCreacion = document.createElement("span");
        fechaCreacion.textContent = "Creado: " + todos[i].fechaCreacion;
        fechaCreacion.className = "fecha";

        var buttom_eliminar = document.createElement("button");
        buttom_eliminar.textContent = "Eliminar";
        buttom_eliminar.setAttribute("onClick", "eliminar_todo(" + i + ")");
        buttom_eliminar.className = "boton_eliminar";

        contenedor_todo.appendChild(checkbox_hecho);
        contenedor_todo.appendChild(spam_titulo);
        contenedor_todo.appendChild(fechaCreacion);
        contenedor_todo.appendChild(buttom_eliminar);

        if (todos[i].eliminado) {
            var fechaEliminacion = document.createElement("span");
            fechaEliminacion.textContent = "Eliminado: " + todos[i].fechaEliminacion;
            fechaEliminacion.className = "fecha";
            contenedor_todo.appendChild(fechaEliminacion);
            tareas_eliminadas.appendChild(contenedor_todo);
        } else if (todos[i].hecho) {
            var fechaCompletado = document.createElement("span");
            fechaCompletado.textContent = "Completado: " + todos[i].fechaCompletado;
            fechaCompletado.className = "fecha";
            contenedor_todo.appendChild(fechaCompletado);
            tareas_realizadas.appendChild(contenedor_todo);
        } else {
            tareas_no_realizadas.appendChild(contenedor_todo);
        }
    }
}

function eliminar_todo(i) {
    todos[i].eliminado = true; // Marcar como eliminado
    todos[i].fechaEliminacion = new Date().toLocaleString(); // Guardar fecha de eliminación
    listarToDosFn();
    guardarToDos(); // Guardar en LocalStorage
}

function marcar_hechoToDoFn(i) {
    todos[i].hecho = !todos[i].hecho;
    if (todos[i].hecho) {
        todos[i].fechaCompletado = new Date().toLocaleString(); // Guardar fecha de completado
    } else {
        todos[i].fechaCompletado = null; // Limpiar fecha si se desmarca
    }
    listarToDosFn();
    guardarToDos(); // Guardar en LocalStorage
}

// Establecer fondo inicial en morado
document.body.classList.add("tema-morado");

// Crear contenedor para los botones de tema
const contenedorBotones = document.createElement("div");
contenedorBotones.className = "contenedor-botones";

// Función para cambiar el tema
function cambiarTema(tema) {
    document.body.className = tema;
}

// Crear botón morado
const botonMorado = document.createElement("button");
botonMorado.className = "botonTema botonMorado";
botonMorado.addEventListener("click", () => cambiarTema("tema-morado"));

// Crear botón azul
const botonAzul = document.createElement("button");
botonAzul.className = "botonTema botonAzul";
botonAzul.addEventListener("click", () => cambiarTema("tema-azul"));

// Crear botón rosa
const botonRosa = document.createElement("button");
botonRosa.className = "botonTema botonRosa";
botonRosa.addEventListener("click", () => cambiarTema("tema-rosa"));

// Agregar botones al contenedor y al body
contenedorBotones.appendChild(botonMorado);
contenedorBotones.appendChild(botonAzul);
contenedorBotones.appendChild(botonRosa);
document.body.appendChild(contenedorBotones);

function eliminarTodasLasTareas() {
    if (confirm("¿Estás seguro de que deseas eliminar todas las tareas definitivamente?")) {
        localStorage.removeItem('todos'); // Elimina las tareas del LocalStorage
        todos = []; // Limpia el array de tareas
        listarToDosFn(); // Actualiza la interfaz
    }
}

// Cargar la lista al iniciar
cargarToDos();