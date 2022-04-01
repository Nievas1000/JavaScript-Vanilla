"use strict";
/*Menu-Header*/ 
document.querySelector(".btn_menu").addEventListener("click", toggleMenu);
function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("new");
}
/*Cambio de Imagen de oferta automatico*/

window.addEventListener("load",nueva);
function nueva(){
    let imagenes =[]
    imagenes[0]="images/oferta1.jpg";
    imagenes[1]="images/oferta2.jpg";
    imagenes[2]="images/oferta3.jpg";
    
    let numimagenes=0;
    function cambiarimagenes(){
        if(document.querySelector(".img-oferta")){
            document.querySelector(".img-oferta").src=imagenes[numimagenes];
        }
        if(numimagenes<2){
            numimagenes++;
        }
        else{
            numimagenes=0;
        }
    }
    setInterval(cambiarimagenes, 2500);
}
/*Tabla Dinamica*/
//Traer los datos
window.addEventListener("load",traerdatos);
const url ="https://60c29ca4917002001739d437.mockapi.io/api/v1/users";
async function traerdatos(){
        let tabla = "<thead class=thead-dark><tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Correo</th><th>Modificar</th></tr></thead>";
    try{
        let respuesta = await fetch(url);
        let json = await respuesta.json();
        for (const usuarios of json) {
            let id_usuario = usuarios.id;
        let nombre = usuarios.Nombre;
        let apellido = usuarios.Apellido;
        let edad = usuarios.Edad;
        let correo=usuarios.Correo;
                tabla += `<tr><td>${nombre}</td>
                <td>${apellido}</td>
                <td>${edad}</td>
                <td>${correo}</td>
                <td><button class="btn btn-light" id="editar" data-modificar='${id_usuario}'>Editar</button>   <button class="btn btn-dark" id="borrar" data-borrar='${id_usuario}'>Borrar</button></td>`;
        }if(document.querySelector(".table")){
        document.querySelector(".table").innerHTML= tabla;
        }
        let editar=document.querySelectorAll("#editar");
        let borrar=document.querySelectorAll("#borrar");
        for (const boton of editar) {
            boton.addEventListener("click",edit)
        }
        for (const boton of borrar) {
            boton.addEventListener("click", eliminar)
        }
    }
    catch(error){
        console.log(error);
    }
}
//Enviar los datos
if(document.querySelector(".form")){
document.querySelector(".form").addEventListener("submit",enviardatos);
}
async function enviardatos(event){
    event.preventDefault();
    let tableDin = document.querySelector(".form");
    let formData = new FormData(tableDin);
    let nombre = formData.get("nombre");
    let apellido = formData.get("apellido");
    let edad = formData.get("edad");
    let correo = formData.get("correo");
    let participantesnew={
        "Nombre":nombre,
        "Apellido":apellido,
        "Edad":edad,
        "Correo":correo
    };
    try{
        let resultado = await fetch(url,{
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(participantesnew)
        });
        if(resultado.status==201){
            traerdatos();
            tableDin.reset();
        }
    }catch(error){
        console.log(error);
    }
}

//Agregar 3
if(document.querySelector(".tres")){
document.querySelector(".tres").addEventListener("click" , enviartres);
}
async function enviartres(e){
    e.preventDefault();
    let ejemplo1={
        "Nombre":"Manuel",
        "Apellido":"Martinez",
        "Edad":32,
        "Correo":"ManuelMartinez12@gmail.com"
    };
    let ejemplo2={
        "Nombre":"Axel",
        "Apellido":"Diaz",
        "Edad":24,
        "Correo":"axeldiaz@gmail.com"};
    let ejemplo3={
        "Nombre":"Fernando",
        "Apellido":"Quiroga",
        "Edad":29,
        "Correo":"ferquiroga1@gmail.com"};
        try{
            let resultado = await fetch(url,{
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(ejemplo1)
            });
            let resultado2 = await fetch(url,{
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(ejemplo2)
            });
            let resultado3 = await fetch(url,{
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(ejemplo3)
            });
            if((resultado.status==201)&&(resultado2.status==201)&&(resultado3.status==201)){
                traerdatos();
            }
        }catch(error){
            console.log(error);
        }
}
//Eliminar fila deseada
async function eliminar(){
    try{
        let id = this.dataset.borrar;
        let resultado = await fetch(`${url}/${id}`,{
            "method": "DELETE"
        });
        if(resultado.status==200){
            traerdatos();
        }
    }catch(error){
        console.log(error);
    }
}
//Editar tabla dinamica
async function edit(e){
    e.preventDefault();
    let tableDin = document.querySelector(".form");
    let formData = new FormData(tableDin);
    let nombre = formData.get("nombre");
    let apellido = formData.get("apellido");
    let edad = formData.get("edad");
    let correo = formData.get("correo");
    let datosEdit={
        "Nombre":nombre,
        "Apellido":apellido,
        "Edad":edad,
        "Correo":correo
    };
    try{
        let id=this.dataset.modificar;
        let resultado = await fetch(`${url}/${id}`,{
            "method": "PUT",
            "headers":{ "Content-type": "application/json" },
            "body":JSON.stringify(datosEdit)
        });
        if(resultado.status==200){
            traerdatos();
            tableDin.reset();
        }
    }catch(error){
        console.log(error);
    }
}
//Buscar mediante filtro
if(document.querySelector(".muestra-bus")){
    document.querySelector(".muestra-bus").addEventListener("click",function(e){
        document.querySelector(".busqueda").classList.toggle("busq-new")
    });
}
if(document.querySelector(".buscar")){
    document.querySelector(".buscar").addEventListener("click",buscar);
}
async function buscar(e){
    e.preventDefault();
    let edad1 = Number(document.querySelector(".valor-busq").value)
    let tabla = "<thead class=thead-dark><tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Correo</th><th>Modificar</th></tr></thead>";
    try{
        let respuesta = await fetch(url);
        let json = await respuesta.json();
        for (const usuarios of json) {
        if(usuarios.Edad==edad1){
        let id_usuario = usuarios.id;
        let nombre = usuarios.Nombre;
        let apellido = usuarios.Apellido;
        let edad = usuarios.Edad;
        let correo=usuarios.Correo;
                tabla += `<tr><td>${nombre}</td>
                <td>${apellido}</td>
                <td>${edad}</td>
                <td>${correo}</td>
                <td><button id="editar" data-modificar='${id_usuario}'>Editar</button>   <button id="borrar" data-borrar='${id_usuario}'>Borrar</button></td>`;
        }
        }if(document.querySelector(".table")){
        document.querySelector(".table").innerHTML= tabla;
        }
        let editar=document.querySelectorAll("#editar");
        let borrar=document.querySelectorAll("#borrar");
        for (const boton of editar) {
            boton.addEventListener("click",edit)
        }
        for (const boton of borrar) {
            boton.addEventListener("click", eliminar)
        }
    }
    catch(error){
        console.log(error);
    }
}
if(document.querySelector(".restablecer")){
    document.querySelector(".restablecer").addEventListener("click",function(e){
        traerdatos()
    })
}
/*Cambio de imagen*/
if(document.getElementById("siguiente")){
    document.getElementById("siguiente").addEventListener("click", adelante);
    document.getElementById("anterior").addEventListener("click", anterior);
}
let num=1;
function adelante(){
    num++;
    if(num>4)
        num=1;
        let foto=document.querySelector(".image_armadas");
        foto.src="images/pc"+num+".jpg"
        if(num==1){
            document.querySelector(".armadas").innerHTML="Pc Gamer Armada Amd Ryzen3 <br> Vega 2200g Ssd 8gb";
            document.querySelector(".lista").innerHTML="<ul class=lista><li>MICRO: A6-7480 3.5GHz 2 NUCLEOS</li><li>VIDEO: Radeon R5 INTEGRADA</li><li>MOTHER: MSI/ASROCK A68HM-E33 VGA USB 3.0</li><li>DISCO RIGIDO : SSD120GB SATA3 ADATA</li><li>MEMORIA RAM: 4GB 1600MHZ DDR3</li><li class=precio-armadas>Precio: $42.270,29</li></ul>";
        }
        if(num==2){
            document.querySelector(".armadas").innerHTML="Pc Armada Gamer Amd Ryzen 3 2200g Rx Vega 8 <br> Ssd 240gb 8gb Ddr4 Gabinete Kit P1";
            document.querySelector(".lista").innerHTML="<ul class=lista><li>MICRO PROCESADOR AMD A6 7480 3.8GHZ</li> <li>DISCO SOLIDO 120GB</li><li>MEMORIA RAM 4GB DDR3</li><li>MOTHERBOARD AMD A68H FM2 ASROCK</li><li>GABINETE KIT</li><li class=precio-armadas>Precio: $47.999</li></ul>";
        }
        if(num==3){
            document.querySelector(".armadas").innerHTML="Pc Cpu Nueva Computadora <br> Escritorio Completa Monitor";
            document.querySelector(".lista").innerHTML="<ul class=lista><li>PLACA MADRE GA-E6010N</li><li>4GB DE MEMORIA RAM</li><li>120GB DISCO DE ESTADO SOLIDO</li><li>CON PROCESADOR INTEGRADO: APU AMD® E1-6010</li><li>SISTEMA OPERATIVO: WIN 10 64bits TRIAL</li><li class=precio-armadas>Precio: $55.186,46</li></ul>";
        }
        if(num==4){
            document.querySelector(".armadas").innerHTML="Pc Gamer Armada Ryzen 5 <br> 3400g 8 Gb Video Vega 11 1tb Disco";
            document.querySelector(".lista").innerHTML="<ul class=lista><li>MICRO: AMD RYZEN 3 2200g CON COOLER</li><li>VIDEO: VEGA 8 2GB (ONBOARD)</li><li>OTHER: ASUS PRIME A320M--KVGA HDMI</li><li>DISCO RIGIDO: HD SSD 240GB SOLIDO</li><li>MEMORIA RAM: HP 16GB 2666MHZ DDR4 V2</li><li class=precio-armadas>Precio: $50.152</li></ul>";
        }
}
function anterior(){
    num--;
    if(num<1)
        num=4;
        let foto=document.querySelector(".image_armadas");
        foto.src="images/pc"+num+".jpg"
        if(num==1){
            document.querySelector(".armadas").innerHTML="Pc Gamer Armada Amd Ryzen3 <br> Vega 2200g Ssd 8gb"
            document.querySelector(".lista").innerHTML="<ul class=lista><li>MICRO: A6-7480 3.5GHz 2 NUCLEOS</li><li>VIDEO: Radeon R5 INTEGRADA</li><li>MOTHER: MSI/ASROCK A68HM-E33 VGA USB 3.0</li><li>DISCO RIGIDO : SSD120GB SATA3 ADATA</li><li>MEMORIA RAM: 4GB 1600MHZ DDR3</li><li class=precio-armadas>Precio: $42.270,29</p></li>"
        }
        if(num==2){
            document.querySelector(".armadas").innerHTML="Pc Armada Gamer Amd Ryzen 3 2200g Rx Vega 8 <br> Ssd 240gb 8gb Ddr4 Gabinete Kit P1"
            document.querySelector(".lista").innerHTML="<ul class=lista><li>MICRO PROCESADOR AMD A6 7480 3.8GHZ</li> <li>DISCO SOLIDO 120GB</li><li>MEMORIA RAM 4GB DDR3</li><li>MOTHERBOARD AMD A68H FM2 ASROCK</li><li>GABINETE KIT</li><li class=precio-armadas>Precio: $47.999</li></ul>"
        }
        if(num==3){
            document.querySelector(".armadas").innerHTML="Pc Cpu Nueva Computadora <br> Escritorio Completa Monitor"
            document.querySelector(".lista").innerHTML="<ul class=lista><li>PLACA MADRE GA-E6010N</li><li>4GB DE MEMORIA RAM</li><li>120GB DISCO DE ESTADO SOLIDO</li><li>CON PROCESADOR INTEGRADO: APU AMD® E1-6010</li><li>SISTEMA OPERATIVO: WIN 10 64bits TRIAL</li><li class=precio-armadas>Precio: $55.186,46</li></ul>"
        }
        if(num==4){
            document.querySelector(".armadas").innerHTML="Pc Gamer Armada Ryzen 5 <br> 3400g 8 Gb Video Vega 11 1tb Disco"
            document.querySelector(".lista").innerHTML="<ul class=lista><li>MICRO: AMD RYZEN 3 2200g CON COOLER</li><li>VIDEO: VEGA 8 2GB (ONBOARD)</li><li>OTHER: ASUS PRIME A320M--KVGA HDMI</li><li>DISCO RIGIDO: HD SSD 240GB SOLIDO</li><li>MEMORIA RAM: HP 16GB 2666MHZ DDR4 V2</li><li class=precio-armadas>Precio: $50.152</li></ul>"
        }
}

/*Formulario*/
if(document.querySelector(".generar")){
    document.querySelector(".generar").addEventListener("click" , generar);
}
const generado = Math.floor((Math.random() * 100) + 1);
function generar(e){
    e.preventDefault();
    document.getElementById("generado").innerHTML = generado;
}
if(document.getElementById("form")){
    document.getElementById("form").addEventListener("submit" , confirmar);
}
function confirmar(e){
    e.preventDefault();
    let numero = Number(document.getElementById("numero").value);
    if(generado == numero){
        document.getElementById("resultado").innerHTML = "¡Tu suscripcion ha sido confirmada!";
        let form=document.querySelector("#form");
        form.reset();
    }
    else if (generado != numero){
        document.getElementById("resultado").innerHTML = "El numero ingresado es incorrecto. Vuelve a intentar"
    }
}