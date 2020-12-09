import requests

msg = {
    'method': 'both',
    'path': './where_you_are.mp3',
    'user': 'sheep',
    'file': 'where_you_are.mp3'
}

response = requests.post(
    url='http://127.0.0.1:8000/api',
    json=msg
)
print(response)
print(response.text)
