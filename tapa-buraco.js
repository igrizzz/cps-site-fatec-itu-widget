```javascript
/*
 * TAPA-BURACO — IMAGENS DOS DESTAQUES
 *
 * Este script tem a seguinte função:
 * Ele procura elementos na div de destaques que estão sem foto
 * e substitui por uma foto padrão.
 *
 * Além de imagens sem "src", o script também trata imagens cujo
 * arquivo não pôde ser carregado.
 *
 * IMPORTANTE:
 * A imagem utilizada como placeholder deve estar disponível
 * publicamente para que o fallback funcione corretamente.
 */

window.addEventListener('DOMContentLoaded', function () {

    // URL da imagem padrão utilizada quando o destaque não possui foto.
    var placeholder =
        'https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/39/2023/06/PlaceholderDestaques.png';

    // Buscar o elemento pelo seletor de classe.
    var container = document.querySelector('.cps-destaques__container');

    // Verificar se o elemento foi encontrado.
    if (!container) {
        return;
    }

    // Obter todos os elementos com a classe 'cps-destaques__items'.
    var items = container.querySelectorAll('.cps-destaques__items');

    // Percorrer todos os elementos encontrados.
    items.forEach(function (item) {

        // Obter o elemento de imagem dentro de cada item.
        var image = item.querySelector('img');

        // Se o item não possuir uma imagem, não há nada a fazer.
        if (!image) {
            return;
        }

        /*
         * Função responsável por substituir a imagem pela imagem padrão.
         *
         * O atributo "data-placeholder-applied" impede que o script
         * tente substituir a imagem novamente caso o placeholder
         * também apresente algum problema de carregamento.
         */
        function setPlaceholder() {

            // Evitar executar o fallback mais de uma vez.
            if (image.dataset.placeholderApplied === 'true') {
                return;
            }

            image.dataset.placeholderApplied = 'true';

            // Substituir a imagem pela imagem padrão.
            image.src = placeholder;
        }

        /*
         * Verificar se o atributo "src" está ausente ou vazio.
         */
        if (!image.getAttribute('src')) {
            setPlaceholder();
        }

        /*
         * Se a imagem possuir um "src", mas o arquivo não puder
         * ser carregado, o evento "error" será acionado.
         */
        image.addEventListener('error', function () {
            setPlaceholder();
        });

    });
});
```
