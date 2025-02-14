var todos = JSON.parse(localStorage.getItem('todos')) || [];

function crearToDoFn() {
    var input_crear = document.querySelector("#input_crear");
    if (input_crear.value == "") {
        alert("Por favor ingrese la actividad que quiere realizar.");
    } else {
        var nuevo_todo = {
            titulo: input_crear.value,
            estado: "no realizada" // Estado inicial
        };

        todos.push(nuevo_todo);
        input_crear.value = '';
        guardarEnLocalStorage();
        listarToDosFn();  // Llamamos a listarToDosFn para que se actualice inmediatamente
    }
}

function listarToDosFn() {
    var listar_todos = document.querySelector("#listar_todos");
    var listar_realizadas = document.querySelector("#listar_realizadas");
    var listar_eliminadas = document.querySelector("#listar_eliminadas");
    listar_todos.innerHTML = "";
    listar_realizadas.innerHTML = "";
    listar_eliminadas.innerHTML = "";

    if (todos.length === 0) {
        listar_todos.innerHTML = "<h4>No hay To Do's creados</h4>";
    } else {
        for (var i = 0; i < todos.length; i++) {
            var contenedor_todo = document.createElement("div");
            contenedor_todo.className = "todo";

            var span_titulo = document.createElement("span");
            span_titulo.textContent = todos[i].titulo;
            span_titulo.className = todos[i].estado;

            var buttom_no_realizada = document.createElement("button");
            buttom_no_realizada.textContent = "No Realizada";
            buttom_no_realizada.setAttribute("onClick", "cambiarEstadoToDo(" + i + ", 'no realizada')");
            buttom_no_realizada.className = "boton_no_realizada";

            var buttom_realizada = document.createElement("button");
            buttom_realizada.innerHTML = "&#10003;"; // Cuadrado con tick
            buttom_realizada.setAttribute("onClick", "cambiarEstadoToDo(" + i + ", 'realizada')");
            buttom_realizada.className = "boton_realizada";

            var buttom_eliminada = document.createElement("button");
            buttom_eliminada.innerHTML = "&#10060;"; // Cuadrado con x roja
            buttom_eliminada.setAttribute("onClick", "cambiarEstadoToDo(" + i + ", 'eliminada')");
            buttom_eliminada.className = "boton_eliminada";

            contenedor_todo.appendChild(span_titulo);
            contenedor_todo.appendChild(buttom_no_realizada);
            contenedor_todo.appendChild(buttom_realizada);
            contenedor_todo.appendChild(buttom_eliminada);

            // Mostrar los elementos en la sección correspondiente
            if (todos[i].estado === "no realizada") {
                listar_todos.appendChild(contenedor_todo);
            } else if (todos[i].estado === "realizada") {
                listar_realizadas.appendChild(contenedor_todo);
            } else if (todos[i].estado === "eliminada") {
                listar_eliminadas.appendChild(contenedor_todo);
            }
        }
    }
}

function cambiarEstadoToDo(i, estado) {
    todos[i].estado = estado;
    guardarEnLocalStorage();
    listarToDosFn();
}

function guardarEnLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
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
listarToDosFn();

