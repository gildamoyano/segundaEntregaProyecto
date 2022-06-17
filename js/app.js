alert("Bienvenid@ a Calamar Swimwear")

class Bikinis{
  constructor(nombre, talle, imagen, precio){
    this.nombre = nombre;
    this.talle = talle;
    this.imagen = imagen;
    this.precio = precio;
  }
}

const cali = new Bikinis("cali", 1, "..\img\cali.jpg", 1200);
const london = new Bikinis("london", 1, "..\img\london.jpg", 1200);
const maldivas = new Bikinis("maldivas", 1, "..\img\maldivas.jpg", 1200);
const rio = new Bikinis("rio", 1, "..\img\rio.jpg", 1200);

const productos = [cali, london, maldivas, rio];


const carrito = [];


const tarjetas = document.querySelector('#tarjetas');


productos.forEach((producto)=>{
  const card = document.createElement('div');
  card.className = "card mt-6 mb-6 me-6 ms-6 hvr-grow";
  card.innerHTML = `
          <img src="${producto.imagen}" class="card-img-top" alt="cali"/></a>
          <div class="card-body">
            <p class="card-text fw-bold">${producto.nombre}</p>
            <button data-id="${producto.nombre}" class="buttonCTA btn btn-secondary"> agregar al Carrito </button>
          </div>`;
  tarjetas.appendChild(card);
})


const agregarProducto = (e) => {
  const productoElegido = e.target.getAttribute('data-id')
  const producto = productos.find((producto) => producto.nombre == productoElegido)
  carrito.push(producto)
  pintarTotal(getTotal(carrito))
  pintarCuenta(carrito)
}


const getTotal = (arr) => {
  let total = 0
  arr.forEach((producto) => {
      total += producto.precio
  })
  return total
}

const pintarTotal = (total) => {
  const divTotal = document.querySelector('#total-carrito')
  divTotal.innerHTML = total.toLocaleString()
}

const pintarCuenta = (arr) => {
  const divCuenta = document.querySelector('.cuenta-carrito')
  divCuenta.innerHTML = arr.length
}

const botonesCompra = document.querySelectorAll('.buttonCTA')
botonesCompra.forEach((botonCompra) => {
    botonCompra.addEventListener('click', agregarProducto)
})

let Carrito =[];

for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    Carrito.push(JSON.parse(localStorage.getItem(clave)))
}
Carrito[0].forEach((producto) =>{
    Carrito.push(producto)
})

Carrito.shift();
console.log(Carrito);

const cartContainer = document.querySelector('#cartContainer')

const imprimirCarrito = () => {
    cartContainer.innerHTML = ''
    carrito.forEach((producto) => {
        const cartRow = document.createElement('div')
        cartRow.setAttribute('data-id', producto.id)
        cartRow.className = 'cartRow'
        cartRow.innerHTML = `
        <div class="cartImg">
        <img src="${producto.imagen}">
        </div>
        <div class="cartTitle"><span> Pedal ${producto.nombre}</span></div>
        <div class="cartPrice"><span> $${producto.precio}</span></div>
        <div class="cartDesc"><span data-id="${producto.id}"class="remover"> X </span></div>
        `
        cartContainer.append(cartRow)
    })
} 

imprimirCarrito();

const eliminarProductoDelCarrito = (e) => {
    const productoIdSelected = e.target.closest('.remover').getAttribute('data-id')
    console.log(productoIdSelected);
    carrito = carrito.filter((producto) => producto.id != productoIdSelected)
    console.log(Carrito);
    localStorage.setItem('carrito', JSON.stringify(Carrito))
    imprimirCarrito()
}

document.addEventListener("click",e =>{
    if(e.target.classList.contains("remover")){
        eliminarProductoDelCarrito(e)
    }
});


