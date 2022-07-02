
class Articulo {
    constructor(nombre, precio, id, img, alt) {
      this.nombre = nombre;
      this.precio = precio;
      this.id = id;
      this.img = img;
      this.alt = alt;
    }
}

let articuloId;

const canoAgFu = new Articulo("Caño agua fusión", 1200, 1, "./img/img_gale/agua02.png", "Imagen: Caño agua fusión");
const canoAgMulFu = new Articulo("Caño agua Multicapa fusión", 1500, 2, "./img/img_gale/agua03.png", "Imagen: Caño agua Multicapa fusión");
const canoAgMulRefFu = new Articulo("Caño agua Multicapa Reforzado fusión", 2000, 3, "./img/img_gale/agua04.png", "Imagen: Caño agua Multicapa Reforzado fusión");
const codoAg45FuHH = new Articulo("Codo agua 45° fusión HH", 80, 4, "./img/img_gale/agua05.png", "Imagen: Codo agua 45° fusión HH");
const codoAg90FuHH = new Articulo("Codo agua 90° fusión HH", 90, 5, "./img/img_gale/agua08.png", "Imagen: Codo agua 90° fusión HH");
const codoAg90FuMH = new Articulo("Codo agua 90° fusión MH", 90, 6, "./img/img_gale/agua10.png", "Imagen: Codo agua 90° fusión MH");
const codoAgEsqFusiónHHH = new Articulo("Codo agua esquinero fusión HHH", 150, 7, "./img/img_gale/agua11.png", "Imagen: Codo agua esquinero fusión HHH");
const cuplaAgFuHRoMetH = new Articulo("Cupla agua fusión H rosca metálica H", 300, 8, "./img/img_gale/agua13.png", "Imagen: Cupla agua fusión H rosca metálica H");
const cuplaAgFuHH = new Articulo("Cupla agua fusión HH", 90, 9, "./img/img_gale/agua15.png", "Imagen: Cupla agua fusión HH");
const curvaAg90FuHH = new Articulo("Curva agua 90° fusión HH", 200, 10, "./img/img_gale/agua17.png", "Imagen: Curva agua 90° fusión HH");
const tapaAgFuH = new Articulo("Tapa agua fusión H", 150, 11, "./img/img_gale/agua20.png", "Imagen: Tapa agua fusión H");
const teAgFuHHH = new Articulo("Te agua fusión HHH", 200, 12, "./img/img_gale/agua23.png", "Imagen: Te agua fusión HHH");
const articulos = [canoAgFu, canoAgMulFu, canoAgMulRefFu, codoAg45FuHH, codoAg90FuHH, codoAg90FuMH, codoAgEsqFusiónHHH, cuplaAgFuHRoMetH, cuplaAgFuHH, curvaAg90FuHH, tapaAgFuH, teAgFuHHH];

const caja = document.getElementById("caja");
const divCarrito = document.getElementById("carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function crearCards() {
    articulos.forEach((element) => {
        caja.innerHTML += `<div class="cajita" style="text-align=center;">        
        <div class="card" style="width: 18rem;">
            <img src="${element.img}" class="card-img-top imgPresupuesto" alt="${element.alt}">
            <div class="card-body">
                <h5 class="card-title">${element.id}. ${element.nombre}</h5>
                <p class="card-text">Precio: $ ${element.precio}</p>
                <a href="#" id="btn${element.id}" class="btn btn-primary">Agregar</a>
            </div>
        </div>
        </div>`;
    });
    articulos.forEach((articuloComprado) => {
        document.querySelector(`#btn${articuloComprado.id}`).addEventListener("click", () => {
            enviarAlCarrito(articuloComprado);
        });
    });
}

function enviarAlCarrito(articuloComprado) {
    let existe = carrito.some((element) => element.id === articuloComprado.id);
    if (!existe) {
      carrito.push(articuloComprado);
      articuloComprado.cantidad = 1;
    } else {
      let articuloCompradoFind = carrito.find((e) => e.id === articuloComprado.id);
      articuloCompradoFind.cantidad++; // Acá uso Sugar Syntax
    }
    pintarCarrito();
}

function pintarCarrito() {
    divCarrito.innerHTML = "";
    carrito.forEach((element) => {
        divCarrito.innerHTML += `<div class="cajita" style="text-align=center;">        
        <div class="card" style="width: 18rem;">
            <img style="width: 80px;" src="${element.img}" class="card-img-top" alt="${element.alt}">
            <div class="card-body">
                <h6 class="card-title">${element.id}. ${element.nombre}</h6>
                <p class="card-text">Precio: $ ${element.precio}</p>
                <p class="card-text">Cantidad: ${element.cantidad}</p>
                <a href="#" id="borrar${element.id}" class="btn btn-primary">Borrar</a>
            </div>
        </div>
        </div>`;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    borrarProducto();
}
  
function borrarProducto() {
    carrito.forEach((articuloComprado) => {
        document
        .querySelector(`#borrar${articuloComprado.id}`)
        .addEventListener("click", () => {
            carrito = carrito.filter((element) => element.id !== articuloComprado.id);
            pintarCarrito();
        });
    });
}

const form = document.querySelector("form");

let inputNombre = JSON.parse(localStorage.getItem("nombre")) || "";


btnGuardar.addEventListener("click", () => {
    const inputNombre = document.querySelector("#nombre");
    localStorage.setItem("nombre", JSON.stringify(inputNombre));
    return inputNombre;
});


crearCards();
pintarCarrito();


const total = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
console.log("El total de la compra es de: " + total);
console.log(inputNombre);

// Anterior


/*
const form = document.querySelector("form");

const inputNombre = document.querySelector("#nombre"),
      inputProducto = document.querySelector("#producto"),
      inputCantidad = document.querySelector("#cantidad"),
      btnGuardar = document.querySelector("#btnGuardar"),
      contenedor = document.querySelector("#contenedor");

const productos = [];

class Producto {
    constructor(nombre, producto, cantidad) {
        this.nombre = nombre;
        this.producto = producto;
        this.cantidad = cantidad;
    };
};

function crearPresupuesto(nombre, producto, cantidad) {
    nombre =inputNombre.value;
    producto = inputProducto.value;
    cantidad = inputCantidad.value;
    return new Producto(nombre, producto, cantidad);
}
function guardarPresupuesto(producto) {
    return productos.push(producto);
}

function crearHTML1() {
    let html1 = `
    <div>
        <h2>Presupuesto</h2>
        <p>Razón social: ${producto.nombre}</p>
        <hr>
    </div>
    `;
    let html2;
    for (const producto of productos) {
        html2 = `
            <div>
                <p> ${producto.cantidad} ${producto.producto}</p>
            </div>
        `;
    }
    // Otra forma sin resultado
    // contenedor.innerHTML += html1 += html2;

    
    // No puede hacer que pinte el nombre en el html

    contenedor.innerHTML = html1;
    contenedor.innerHTML += html2;
    
};
*/





// Lo hice así y no me funcionó tampoco
/*
function crearHTML1() {
    let html1 = `
    <div>
        <h2>Presupuesto</h2>
        <p>Razón social: ${producto.nombre}</p>
        <hr>
    </div>
    `;
    contenedor.innerHTML = html1;
};
function crearHTML2() {
    let html2;
    for (const producto of productos) {
        html2 = `
            <div>
                <p> ${producto.cantidad} ${producto.producto}</p>
            </div>
        `;
    }
    contenedor.innerHTML += html2;
};
*/





// Esto si va con lo Anterior
/*
btnGuardar.addEventListener("click", () => {
    const product = crearPresupuesto(producto, cantidad);
    guardarPresupuesto(product);
    crearHTML1(productos);        
    crearHTML2(productos);
});
*/





// También trate de esta manera para recorrer el array y poder hacer aparecer el nombre del producto y no la selección,
// pero no pude
/*
btnGuardar.addEventListener("click", () => {
    const product = crearPresupuesto(producto, cantidad);
    guardarPresupuesto(product);
    for (let i = 0; i < 1; i++) {
        crearHTML1(productos);        
    };
    crearHTML2(productos);
});
*/
