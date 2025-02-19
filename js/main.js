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
            eliminado: false
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
        
        var buttom_eliminar = document.createElement("button");
        buttom_eliminar.textContent = "Eliminar";
        buttom_eliminar.setAttribute("onClick", "eliminar_todo(" + i + ")");
        buttom_eliminar.className = "boton_eliminar";

        contenedor_todo.appendChild(checkbox_hecho);
        contenedor_todo.appendChild(spam_titulo);
        contenedor_todo.appendChild(buttom_eliminar);

        if (todos[i].eliminado) {
            tareas_eliminadas.appendChild(contenedor_todo);
        } else if (todos[i].hecho) {
            tareas_realizadas.appendChild(contenedor_todo);
        } else {
            tareas_no_realizadas.appendChild(contenedor_todo);
        }
    }
}

function eliminar_todo(i) {
    todos[i].eliminado = true; // Marcar como eliminado
    listarToDosFn();
    guardarToDos(); // Guardar en LocalStorage
}

function marcar_hechoToDoFn(i) {
    todos[i].hecho = !todos[i].hecho;
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

// Cargar la lista al iniciar
cargarToDos();