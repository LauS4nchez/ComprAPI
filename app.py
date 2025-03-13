from flask import Flask, jsonify, redirect, request, url_for, abort
import requests
url = "https://real-time-product-search.p.rapidapi.com/search-v2"
app = Flask(__name__)


@app.route('/')
def index():
    return redirect(url_for('static', filename='api.html'))

@app.route('/json-data/<q>')  # Definir "q" como un parámetro de la ruta
def json_data(q):

    # URL del endpoint
    url = "https://real-time-product-search.p.rapidapi.com/search"

    # Parámetros de la consulta
    querystring = {
        "q": q,  # Usar el valor de "q" pasado en la URL
        "country": "us",
        "language": "es",
        "page": "1",
        "limit": "10",
        "sort_by": "BEST_MATCH",
        "product_condition": "ANY",
        "on_sale":"true"
    }

    # Encabezados
    headers = {
        "x-rapidapi-key": "b6d0b16132mshed64232c01ad333p1adbe9jsn1bf2a2cf7f4a",
        "x-rapidapi-host": "real-time-product-search.p.rapidapi.com"
    }

    try:
        # Realizar la solicitud GET
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()  # Lanza una excepción para códigos de estado HTTP >= 400

        # Devolver la respuesta JSON al cliente
        return jsonify(response.json())

    except requests.exceptions.RequestException as e:
        # Manejo de errores en la solicitud
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5500) 
else:
    application = app
