$(document).ready(function() {
  const $contenedor = $('#contenido_container');

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
      }
    });
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
