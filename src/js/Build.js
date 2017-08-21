let $ = document.querySelector.bind(document);

const build = (data) => {

    $('#visited').innerHTML += `<ul class="product__list"> ${buildProduct(data.item)} </ul>`
    $('#recommended').innerHTML += `<ul class="product__list"> ${data.recommendation.map((data) => 
        buildProduct(data, $('#recommended'))).join('')} </ul>`

    buy();
    slider();

}

const buildProduct = (product) => {
    return `<li class="product__item">
            <img class="product__image" src='http:${product.imageName}'>
            <p class="product__name">${product.name}</p>
            <p class="product__price">Por: <span>${product.price}</span></p>
            <p class="product__conditions">${product.productInfo.paymentConditions}</p>
            <button class="product__button" type="button">adicionar ao carrinho <i class="material-icons">add_shopping_cart</i></button> 
            </li>`
}

request();