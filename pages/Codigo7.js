const buscarPalabra = (texto, clave) => {
    if (!clave || !texto) return
    let posiciones = []
    for (let i = 0; i < texto.length - clave.length + 1; i++) {
        try {
            for (let x = 0; x < clave.length; x++) {
                if (!(texto[i + x] === clave[x])) {
                    throw new Error('Esto fue planeado');
                }
            }
            posiciones.push(i + 1)
        } catch {
        }
    }
    if (posiciones.length) {
        document.getElementsByTagName('p')[0].innerText = `Se encontró un total de ${posiciones.length} clave/s, en la/s posicion/es: ${posiciones}`
    } else {
        document.getElementsByTagName('p')[0].innerText = "No se encontró la palabra clave buscada"
    }
}
