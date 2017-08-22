const slider = () => {
    $('#recommended .product__list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
    })
}