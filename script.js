// Substitua 'SUA_CHAVE_API_AQUI' pela sua chave de API Bitly.
const apiKey = 'SUA_CHAVE_API_AQUI'; // Sua chave de API Bitly

document.addEventListener('DOMContentLoaded', function () {
    const encurtarBtn = document.getElementById('encurtarBtn');
    const inputUrl = document.getElementById('boxtext');
    const linkEncurtado = document.getElementById('linkEncurtado');
    const containerLink = document.getElementById('container-link');

    encurtarBtn.addEventListener('click', function () {
        const longUrl = inputUrl.value.trim(); // Obtém a URL longa do campo de entrada

        // Verifica se a URL longa é válida
        if (!isValidUrl(longUrl)) {
            alert('Por favor, insira uma URL válida.');
            return;
        }

        // URL da API da Bitly para encurtar
        const bitlyApiUrl = 'https://api-ssl.bitly.com/v4/shorten';

        // Monta o objeto de solicitação
        const requestData = {
            long_url: longUrl,
            domain: 'bit.ly',
        };

        fetch(bitlyApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(result => {
            // Exibe o link encurtado
            linkEncurtado.textContent = result.link;
            containerLink.classList.remove('hide');
        })
        .catch(error => {
            console.error('Erro ao encurtar o link:', error);
        });
    });

    // Função para verificar se uma string é uma URL válida
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
});
