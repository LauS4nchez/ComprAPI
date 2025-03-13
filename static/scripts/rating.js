function displayStars(rating, container) {
        
    // Limpiar el contenido del contenedor
    container.innerHTML = '';
    
    // Asegurar que rating esté en el rango de 0 a 5
    rating = Math.max(0, Math.min(5, rating));
  
    // Número entero de estrellas llenas
    const fullStars = Math.floor(rating);
    // Número decimal de estrellas (para la fracción)
    const isHalfStar = rating % 1 >= 0.5;
    // Número de estrellas vacías
    const emptyStars = 5 - fullStars - (isHalfStar ? 1 : 0);
  
    // Agregar estrellas llenas
    for (let i = 0; i < fullStars; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.textContent = '★';  // Estrella llena
      container.appendChild(star);
    }
  
    // Agregar estrella parcialmente llena si es necesario
    if (isHalfStar) {
      const star = document.createElement('span');
      star.classList.add('star', 'half');
      star.textContent = '★';
      container.appendChild(star);
    }
  
    // Agregar estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
      const star = document.createElement('span');
      star.classList.add('star', 'empty');
      star.textContent = '★';  // Estrella vacía
      container.appendChild(star);
    }
  }
  
  