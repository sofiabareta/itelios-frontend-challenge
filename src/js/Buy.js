const buy = () => {
    let $ = document.querySelector.bind(document);

    $('.product__button').addEventListener('click', () => {
        alert('Produto adicionado no carrinho! :)')
    })
}