from flask import Flask, jsonify
from flask_cors import CORS
import torch 
import torch.nn as nn
import torch.nn.functional as F
from model_classes import BigramLanguageModel
from model_tokenizer import encode, decode

app = Flask(__name__)
cors = CORS(app, origins='*')

model = BigramLanguageModel()
model.load_state_dict(torch.load('Chess_Transformer_Model'))

@app.route('/generate', methods=['GET'])
def generate():
    #use cpu for now, haven't decided on deployment...
    generated_game = decode(model.generate(idx = torch.zeros((1,1), dtype = torch.long, device='cpu'), max_new_tokens=200)[0].tolist())
    return jsonify({'result': generated_game})

if __name__ == "__main__":
    app.run(debug=True, port=8000)