// Función para agregar imagen al div
function addImageToDiv(source, link, container) {
    if (!source) return; // Si no hay fuente de imagen, no hacer nada
  
    // Crear un contenedor para la imagen
    const imgContainer = document.createElement("div");
    imgContainer.style.position = "relative";
    imgContainer.style.display = "inline-block"; // Para que se ajuste al contenido
  
    // Crear un elemento <img>
    const img = document.createElement("img");
  
    // Configurar los atributos de la imagen
    img.src = source; // URL de la imagen
    img.alt = "Imagen del producto"; // Texto alternativo
    img.style.width = "75%"; // Ajustar al tamaño del contenedor
    img.style.cursor = "pointer";
    // Crear un contenedor para el fondo negro y el texto
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "75%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Fondo negro semitransparente
    overlay.style.color = "white";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.3s ease"; // Transición suave
    overlay.style.cursor = "pointer";
    // Crear el texto "Ver más"
    const text = document.createElement("span");
    text.textContent = "Ver más";
    overlay.appendChild(text);
  
    // Mostrar el overlay cuando el cursor esté sobre la imagen
    imgContainer.addEventListener("mouseover", () => {
      overlay.style.opacity = "1"; // Mostrar el fondo y texto
    });
  
    imgContainer.addEventListener("mouseout", () => {
      overlay.style.opacity = "0"; // Ocultar el fondo y texto
    });
  
    // Agregar la imagen y el overlay al contenedor
    imgContainer.appendChild(img);
    imgContainer.appendChild(overlay);
    imgContainer.addEventListener("click", () => {
        window.open(link, "_blank"); // Abrir la URL en una nueva pestaña
      });
    // Agregar el contenedor al div
    container.appendChild(imgContainer);
  }