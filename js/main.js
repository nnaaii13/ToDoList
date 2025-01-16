var todos = []

function crearToDoFn() {

    var input_crear = document.querySelector("#input_crear");
    if(input_crear.value == ""){
        alert("Por favor ingrese la actividad que quiere realizar.")
    }else{
        var nuevo_todo ={
            titulo: input_crear.value,
            hecho: false
        }
    
        todos.push(nuevo_todo);
        input_crear.value = '';
        listarToDosFn();

    }

    
}

function listarToDosFn(){
    var listar_todos = document.querySelector("#listar_todos");
    listar_todos.innerHTML ="";
    for(var i = 0; i < todos.length; i++){
        var contenedor_todo = document.createElement("div");
        contenedor_todo.className ="todo";
        var checkbox_hecho = document.createElement("input");
        checkbox_hecho.type = "checkbox";
        checkbox_hecho.checked = todos[i].hecho;
        checkbox_hecho.setAttribute("onChange", "marcar_hechoToDoFn("+i+")");
        var spam_titulo = document.createElement("spam");
        spam_titulo.textContent = todos[i].titulo
        spam_titulo.className ="spam";
        if(todos[i].hecho === true){
            spam_titulo.className = "hecho"
        }
        
        var buttom_eliminar = document.createElement("button");
        buttom_eliminar.textContent = "Eliminar";
        buttom_eliminar.setAttribute("onClick","eliminar_todo("+i+")")
        buttom_eliminar.className="boton_eliminar";

        contenedor_todo.appendChild(checkbox_hecho);
        contenedor_todo.appendChild(spam_titulo);
        contenedor_todo.appendChild(buttom_eliminar);

        listar_todos.appendChild(contenedor_todo);
    }


}

function eliminar_todo(i){
    
todos.splice(i, 1);
listarToDosFn();

}

function marcar_hechoToDoFn(i){
    todos[i].hecho = !todos[i].hecho;
    listarToDosFn();

}