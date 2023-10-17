const checkbox = document.getElementById('mostraPagina');
    const button = document.getElementById('mostraButton');
    const content = document.getElementById('content');

    button.addEventListener('click', function () {
      if (checkbox.checked) {
        
        content.style.display = 'block';
        
        button.style.display = 'none';
      }
    });