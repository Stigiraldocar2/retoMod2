// Variable global para almacenar las tareas
let tareas = [];

// Clase Task
class Task {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

//Obtenemos elmentos del dom

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");   

let taskId = 1; //generar id

//funcion agregar nueva tarea
function agregarTarea(taskName) {
  if (taskName.trim() === "") return;  //elimina espacios

  const nuevaTarea = new Task(taskId++, taskName);    
  tareas.push(nuevaTarea); // agrega la tarea al array
  mostrarTarea();
  taskInput.value = ""; //limpiar input
}


//event listenner para el boton agregar
addTaskBtn.addEventListener("click",()=>{
    agregarTarea(taskInput.value);
});


//FUNCION MOSTRAR TAREA1
function mostrarTarea(tareasAMostrar = tareas) {
    //limpiar lista
    taskList.innerHTML = "";

    //recorrer tareas para mostrarlas
    tareasAMostrar.forEach(tarea =>{
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (tarea.completed) li.classList.add("completed");

        //Elemento de nombre y checkbox
        const span = document.createElement("span");
        span.textContent = tarea.name;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completed;
        checkbox.addEventListener("change", () => {
            tarea.toggleCompleted();
            mostrarTarea();  //vista actualizada
        });

        //Boton eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () =>{
            eliminarTarea(tarea.id);
        });

        //contenedor para checkbox y nombre
        const controlDiv = document.createElement("div");
        controlDiv.classList.add("task-control");
        controlDiv.appendChild(checkbox); //agrega el checkbox
        controlDiv.appendChild(deleteBtn); //agrega el boton
        
        //agregar al LI
        li.appendChild(span); //agrega span
        li.appendChild(controlDiv); //agrega los botones

        //agregar a la lista
        taskList.appendChild(li);
    });
    
}

//Eliminar tarea
function eliminarTarea(taskId) {
    tareas = tareas.filter(tarea => tarea.id !== taskId);
    mostrarTarea();
}


//tareas completadas filtrar
function filtrarTareas(completadas) {
    return tareas.filter(tarea => tarea.completed === completadas);
}

//event listener para los botones
const showAllBtn = document.getElementById("showAllBtn");
const showCompletedBtn = document.getElementById("showCompletedBtn");
const showPendingBtn = document.getElementById("showPendingBtn");

showAllBtn.addEventListener("click", function() {
    mostrarTarea();  //muestra todas
    actualizarFiltroActivo(this); //activo
});

showCompletedBtn.addEventListener("click", function() {
    const completadas = filtrarTareas(true);
    mostrarTarea(completadas);  //muestra completadas
    actualizarFiltroActivo(this);
});

showPendingBtn.addEventListener("click", function()  {
    const pendientes = filtrarTareas(false);
    mostrarTarea(pendientes);  //muestra pendientes
    actualizarFiltroActivo(this);
});

//Boton activo
function actualizarFiltroActivo(botonActivo) {
    const botones = document.querySelectorAll('.filters button');
    botones.forEach(boton => boton.classList.remove('active-filter'));
    botonActivo.classList.add('active-filter');
  }