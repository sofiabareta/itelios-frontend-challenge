(function() {
    // Requisição HTTP
    const xhr = new XMLHttpRequest()
    const url = "./js/products.json"

    xhr.open("get", url)

    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) {
            // Tratamento de erros na chamada
            if (xhr.status != 200)
                console.error('Oops, algo deu errado.')
            else {
                const parseJSON = JSON.parse(xhr.response)
                const data = parseJSON[0].data

                return build(data)
            }
        }
    };

    xhr.send()
})();