$(document).ready(function() {
  const $contenedor = $('#contenido_container');

  function cargarPagina(pagina) {
      $.ajax({
          url: `/pages/${pagina}`,
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
          return 'landing.html';
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
      e.preventDefault();
      const href = $(this).attr('href');
      const pagina = href.split('/').pop();
      cargarPagina(pagina);
      window.history.pushState({}, '', href);
  });

  // Manejar navegación del navegador (atrás/adelante)
  window.onpopstate = function() {
      const pagina = obtenerPaginaDesdeRuta(window.location.pathname);
      cargarPagina(pagina);
  };
});




document.addEventListener("DOMContentLoaded", function () {
  const modalVerOpciones = document.getElementById("modalVerOpciones");
  const modalTitle = modalVerOpciones.querySelector(".modal-title");
  const form = modalVerOpciones.querySelector("form");
  const radioesData = {
    "@bandanas": {
      label: "Selecciona un color",
      options: [
        { id: "radio1", label: "Rosa" },
        { id: "radio2", label: "Roja" },
        { id: "radio3", label: "Azul" },
        { id: "radio4", label: "Negra" },
      ],
    },

    "@faja": {
      label: "Selecciona un color",
      options: [
        { id: "radio1", label: "Rosa estándar" },
        { id: "radio2", label: "Verde estándar" },
        { id: "radio3", label: "Amarillo estándar" },
      ],
    },
    "@collarIsab": {
      label: "Selecciona una talla",
      options: [
        { id: "radio1", label: "XS" },
        { id: "radio2", label: "S" },
        { id: "radio3", label: "M" },
        { id: "radio4", label: "L" },
        { id: "radio5", label: "XL" },
      ],
    },
    "@corbatin": {
      label: "Selecciona un color",
      options: [
        { id: "radio1", label: "Azul estándar" },
        { id: "radio2", label: "Negro estándar" },
      ],
    },
    "@tag": {
      label: "Selecciona un diseño",
      options: [
        { id: "radio1", label: "Círculo" },
        { id: "radio2", label: "Cuadro ondulado" },
        { id: "radio3", label: "Hueso" },
        { id: "radio4", label: "Corazón" },
        { id: "radio5", label: "Estrella" },
        { id: "radio6", label: "Manzana" },
        { id: "radio7", label: "Círculo y flor" },
      ],
    },
    // Agrega más datos según sea necesario
  };

  function populateFormWithData(dataKey) {
    const { label, options } = radioesData[dataKey];
    modalTitle.textContent = label;
    form.innerHTML = ""; // Limpiar el contenido del formulario antes de agregar nuevas opciones

    options.forEach((radio) => {
      const radioElement = document.createElement("div");
      radioElement.classList.add("form-check");
      radioElement.innerHTML = `
          <input class="form-check-input" type="radio" id="${radio.id}"  name="flexRadioProducto" >
          <label class="form-check-label" for="${radio.id}">${radio.label}</label>
        `;
      form.appendChild(radioElement);
    });
  }

  modalVerOpciones.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    const dataKey = button.getAttribute("data-bs-producto");
    populateFormWithData(dataKey);
  });
});
