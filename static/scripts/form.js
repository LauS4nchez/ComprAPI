async function fetchItem(event) {
  const div = document.getElementById("result");
  let currentSlide = 0;

  // Limpiar el contenedor antes de mostrar resultados
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  event.preventDefault(); // Evita el envío normal del formulario

  const itemName = document.getElementById("itemName").value; // Obtiene el valor del input
  const resultParagraph = document.getElementById("result"); // Elemento para mostrar el resultado

  if (!itemName) {
    resultParagraph.textContent = "Por favor, ingresa un ID válido.";
    return;
  }

  // Crear el spinner y mensaje "Buscando..."
  const spinnerContainer = document.createElement("div");
  spinnerContainer.style.textAlign = "center";
  spinnerContainer.style.margin = "20px";

  const spinner = document.createElement("div");
  spinner.className = "spinner"; // Usaremos una clase CSS para el spinner

  const message = document.createElement("p");
  message.innerText = "Buscando...";

  spinnerContainer.appendChild(spinner);
  spinnerContainer.appendChild(message);
  resultParagraph.appendChild(spinnerContainer); // Agregar el spinner al contenedor de resultados

  try {
    // Realiza la solicitud a /item/{id}
    const response = await fetch(`/json-data/${itemName}`); // Usar itemId para la solicitud
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Asegúrate de que el objeto data contiene la información de productos y fotos
    const productos = data.data.products || []; // Asegúrate de que 'products' existe en la respuesta
    console.log(productos);
    if (productos.length === 0) {
      resultParagraph.textContent = "No se encontraron productos.";
      return;
    }

    // Si los productos tienen fotos, agrega las imágenes
    let promises = productos.map((producto) => MostrarProducto(producto)); // Usar producto.photos para obtener la URL de la imagen
    await Promise.allSettled(promises);
  } catch (error) {
    // Manejo de errores
    resultParagraph.textContent = `Error al obtener el ítem: ${error.message}`;
  }

  function MostrarProducto(producto) {
    const carousel = document.getElementById("carousel");
    const slide = document.createElement("div");

    const img = document.createElement("img");
    img.src = producto?.product_photos[0] || "img/placeholder.png";
    img.alt = producto?.product_title || "Sin título";
    slide.appendChild(img);

    const title = document.createElement("h1");
    title.innerText = producto?.product_title || "Sin título";
    slide.appendChild(title);

    const ratingDiv = document.createElement("div");
    displayStars(producto?.product_rating, ratingDiv);
    slide.appendChild(ratingDiv);

    const link = document.createElement("a");
    link.href = producto?.product_page_url;
    link.target = "_blank";
    link.textContent = "Ver Producto";
    link.style.display = "block";
    link.style.marginTop = "10px";
    slide.appendChild(link);

    carousel.appendChild(slide);
}

function moveCarousel(direction) {
  const carousel = document.getElementById("carousel");
  const slides = document.querySelectorAll(".carousel div");
  const totalSlides = slides.length;

  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

  carousel.style.transform = `translateX(-${currentSlide * slides[0].offsetWidth}px)`;
}

  // Quitar el spinner después de mostrar los resultados
  spinnerContainer.remove();
}
