
//Este script tem a seguinte função
//Ele procura elementos na div de destaques que estão sem foto 
//e substitui por uma foto padrão
window.addEventListener('DOMContentLoaded', function() {
  // Buscar o elemento pelo seletor de classe
  var container = document.querySelector('.cps-destaques__container');
  // Verificar se o elemento foi encontrado
  if (container) {
    // Obter todos os elementos com a classe 'cps-destaques__items'
    var items = container.querySelectorAll('.cps-destaques__items');
    // Percorrer todos os elementos encontrados
    items.forEach(function(item) {
      // Obter o elemento de imagem dentro de cada item
      var image = item.querySelector('img');
      // Verificar se o atributo 'src' é nulo ou vazio
      if (image && (!image.getAttribute('src') || image.getAttribute('src') === '')) {
        // Substituir o atributo 'src' com outra imagem desejada
        image.setAttribute('src', 'https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/39/2023/06/PlaceholderDestaques.png');
      }
    });
  }
});
