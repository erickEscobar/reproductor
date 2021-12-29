let listaCanciones = document.querySelectorAll(".canciones");
console.log(listaCanciones);
let titulo = document.querySelector("#tituloCancion");
let musica = document.getElementById("musica");
let pausar = document.getElementById("pause");
let color = document.querySelector("li[coloreado='true']");
let cssGirar = document.getElementById("cssGirar");
let posicion = 0;

//Funcion para dar color a la cacion que esta reproduciendose
function colors(){
    color.style.setProperty("background-color", "rgba(151, 61, 235, 0.61)"); 
}

//Funcion quitar color a las demas canciones
function sinColors(){
    listaCanciones.forEach(element => {
        element.setAttribute("coloreado", false);
        element.style.setProperty("background-color", ""); 
    });
}

document.addEventListener("DOMContentLoaded", e => {
    listaCanciones.forEach(element => {
        if(element.firstChild.href === musica.src){
            titulo.innerHTML = element.firstChild.innerHTML;
        }
    });

    //Agregandole un id a las li de las canciones para saber la posicion
    for(let i=0; i<listaCanciones.length; i++){
        listaCanciones[i].setAttribute("id", `${i}`);
    }

    colors();//agregandole color a la cancion puesta
});


document.addEventListener("click", e=>{
    // titulo.firstChild
    if(e.target.matches(".canciones")){
        posicion = e.target.getAttribute("id");//guardando la posicion
        titulo.innerHTML = e.target.textContent;//cambiando el nombre a la concion puesta
        let href = e.target.firstChild.getAttribute("href");
        musica.setAttribute("src", href)
        musica.setAttribute("autoplay", true)

        //todas las lista de canciones sin background-color
        sinColors();

        //pintar con background-color de morado las cancion puesta 
        e.target.setAttribute("coloreado", true);
        color = document.querySelector("li[coloreado='true']");
        colors();

        //cambiar el icono
        pausar.innerHTML = `<ion-icon name="pause-outline" role="img" class="md hydrated" aria-label="play outline"></ion-icon>`

        // girar imagen
        cssGirar.setAttribute("href", "css/rotarImg.css")
    }
    if(e.target.matches("#pause") || e.target.matches("#pause ion-icon")){
        if(pausar.innerHTML === `<ion-icon name="play-outline" role="img" class="md hydrated" aria-label="play outline"></ion-icon>`){
            musica.play();
            pausar.innerHTML = `<ion-icon name="pause-outline" role="img" class="md hydrated" aria-label="play outline"></ion-icon>`
            // girar imagen
            cssGirar.setAttribute("href", "css/rotarImg.css")
        }else{
            musica.pause();
            pausar.innerHTML = `<ion-icon name="play-outline" role="img" class="md hydrated" aria-label="play outline"></ion-icon>`
            // plantar imagen
            cssGirar.setAttribute("href", "")
        }

        
    }
    if(e.target.matches("#posterior") || e.target.matches("#posterior ion-icon")){
        // console.log(posicion)
        if(posicion>=0 && posicion<listaCanciones.length){
            posicion++
            if(posicion>listaCanciones.length-1){
                posicion=0;
            }

            let href = listaCanciones[posicion].firstChild.getAttribute("href");
            musica.setAttribute("src", href)
            musica.setAttribute("autoplay", true)
            
            sinColors();
            listaCanciones[posicion].setAttribute("coloreado", true);
            color = document.querySelector("li[coloreado='true']");
            colors();

            //cambiar el icono
            pausar.innerHTML = `<ion-icon name="pause-outline" role="img" class="md hydrated" aria-label="play outline"></ion-icon>`
            // girar imagen
            cssGirar.setAttribute("href", "css/rotarImg.css")
            //cambiando el nombre a la concion puesta
            titulo.innerHTML =  listaCanciones[posicion].firstChild.textContent;
        }
    }
    if(e.target.matches("#anterior") || e.target.matches("#anterior ion-icon")){
        // console.log(posicion)
        if(posicion>=0 && posicion<listaCanciones.length){
            posicion--
            if(posicion<0){
                posicion=listaCanciones.length-1;
            }

            let href = listaCanciones[posicion].firstChild.getAttribute("href");
            musica.setAttribute("src", href)
            musica.setAttribute("autoplay", true)
            
            sinColors();
            listaCanciones[posicion].setAttribute("coloreado", true);
            color = document.querySelector("li[coloreado='true']");
            colors();

            //cambiar el icono
            pausar.innerHTML = `<ion-icon name="pause-outline" role="img" class="md hydrated" aria-label="play outline"></ion-icon>`
            // girar imagen
            cssGirar.setAttribute("href", "css/rotarImg.css");
            //cambiando el nombre a la concion puesta
            titulo.innerHTML =  listaCanciones[posicion].firstChild.textContent;
        }
    }
});

musica.addEventListener("ended", e=>{
    if(posicion>=0 && posicion<listaCanciones.length){
        posicion++
        if(posicion>listaCanciones.length-1){
            posicion=0;
        }

        let href = listaCanciones[posicion].firstChild.getAttribute("href");
        musica.setAttribute("src", href);
        musica.setAttribute("autoplay", true);
        
        sinColors();
        listaCanciones[posicion].setAttribute("coloreado", true);
        color = document.querySelector("li[coloreado='true']");
        colors();

        //cambiar el icono
        pausar.innerHTML = `<ion-icon name="pause-outline" role="img" class="md hydrated" aria-label="play outline"></ion-icon>`
        // girar imagen
        cssGirar.setAttribute("href", "css/rotarImg.css");
        //cambiando el nombre a la concion puesta
        titulo.innerHTML =  listaCanciones[posicion].firstChild.textContent;
    }
})