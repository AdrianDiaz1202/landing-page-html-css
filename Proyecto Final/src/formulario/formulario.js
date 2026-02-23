const formularioPersonajes = document.getElementById('formularioPersonajes')
const imagen = document.getElementById('imagen')
const listaPersonajes =document.getElementById('listaPersonajes')
let personajes = JSON.parse(localStorage.getItem('personajesSimpson')) || [];

// local Storage es una base local  //Documento JSON es el medio para 
// manejar base de datos no relacionales por ahora...

// leer ImageBitmapRenderingContext.file y devolver en BaseAudioContext.64
    function leerImagenBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = e => reject(e);
            reader.readAsDataURL(file);
        });
    }

    // agregar o actializar
    formularioPersonajes.addEventListener('submit', async(e)=>{
    e.preventDefault()
    console.log ("De click en el formulario")
    const nombre = document.getElementById ('nombre').value.trim() 
    // .train es para eliminar los espacios del principio y del final
    const descripcion = document.getElementById ('descripcion').value.trim()
    // const imagen = document.getElementById('imagen')
    

    if (!nombre || !descripcion){
        alert('por favor completa el nombre y la descripcion.')
        return
    }
    // alert('este es el nombre del personaje' + nombre)
    alert(`este es el nombre del personaje ${nombre} \n y esta es su descripcion ${descripcion}`)

    
    if (imagen.files.length>0){
        try{
            imagenBase64 = await leerImagenBase64(imagen.files[0]);
        }
        catch{
            alert ("error al leer imagen")
            return;
        }
    }
    alert (`${imagenBase64}`)
    // [lista],{objeto}
    personajes.push({nombre, descripcion, imagenBase64});
    guardarPersonajes()
    mostrarPersonajes()
})

// guardar personajes en el local Storage
function guardarPersonajes(){
    localStorage.setItem ('personajesSimpson',JSON.stringify(personajes))
}
function mostrarPersonajes(){
  listaPersonajes.innerHTML = '';
        personajes.forEach((personaje, index) => {
            const div = document.createElement('div');
            div.className = 'personaje';
            div.innerHTML = `
                <img src="${personaje.imagenBase64}" alt="${personaje.nombre}" />
                <h3>${personaje.nombre}</h3>
                <p>${personaje.descripcion}</p>
                <div class="btns">
                    <button onclick="editarPersonaje(${index})">Editar</button>
                    <button class="delete" onclick="eliminarPersonaje(${index})">Eliminar</button>
                </div>
            `;
            listaPersonajes.appendChild(div);
        });
}
 mostrarPersonajes()