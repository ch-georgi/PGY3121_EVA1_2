$(document).ready(function() {
  const $contenedor = $('#contenido_container');

  // Carga un producto a la tienda.
  function cargarProducto(producto, tienda){
    var $tienda = $('#product-container')

    const sale = `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem" > Oferta </div>`

    card = producto.multiple?"/cards/productcardmult.html":"/cards/productcard.html"

    
    $.get(card, function(data) {
      d = data.replace("!NAME", producto.name)
      d = d.replace("!PRICE", producto.price)
      d = d.replace("!IMG", "." + producto.img)
      if (producto.sale){
        d = d.replace("!OLDPRICE", producto.oldprice);
        d = d.replace("!SALE", sale);
      }
      else{
        d = d.replace("!OLDPRICE", "");
        d = d.replace("!SALE", "");
      }
      if (producto.multiple){
        d = d.replace("!ID", producto.id)
      }
      tienda.append(d);
    });
  }

  // Carga todos los productos en la tienda.
  function cargarTienda(tipo){
    var $tienda = $('#product-container');
    products.forEach(function(value, index, array){
      if(value.type === tipo){
        cargarProducto(value, $tienda);
      }
    });
  }

  function cargarPagina(pagina) {
    let url;
    if (pagina === "index.html") {
      url = "/pages/landing.html";
    } else {
      url = `/pages/${pagina}`;
    }

    $.ajax({
      url: url,
      method: 'GET',
      success: function(data) {
        $contenedor.html(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(`Error al obtener y analizar ${pagina}:`, textStatus, errorThrown);
      },
      async: false
    });

    if (pagina==="tiendaaccesorios.html"){
      cargarTienda("other");
    } else if (pagina==="tiendaalimentos.html") {
      cargarTienda("food");
    } else if (pagina==="tiendaropas.html") {
      cargarTienda("clothes");
    }
  }

  function obtenerPaginaDesdeRuta(ruta) {
    if (ruta === '/' || ruta === '/index.html') {
      return 'index.html';
    } else {
      const nombrePagina = ruta.split('/').pop();
      return `${nombrePagina}`;
    }
  }

  // Carga inicial de la página basada en la URL actual
  const paginaInicial = obtenerPaginaDesdeRuta(window.location.pathname);
  cargarPagina(paginaInicial);

  // Manejar clics en los enlaces del navbar
  $('nav a').on('click', function(e) {
    const href = $(this).attr('href');
    const isDropdownLink = $(this).hasClass('dropdown-toggle');

    if (href && href !== '#' && !isDropdownLink) {
      e.preventDefault();
      const pagina = href.split('/').pop();
      cargarPagina(pagina);
      window.history.pushState({}, '', href);
    }
  });

  // Manejar navegación del navegador (atrás/adelante)
  window.onpopstate = function() {
    const pagina = obtenerPaginaDesdeRuta(window.location.pathname);
    cargarPagina(pagina);
  };
});
