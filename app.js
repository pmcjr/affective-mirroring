/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var AssistantV1 = require('watson-developer-cloud/assistant/v1'); // watson sdk
var emotion_analyzer = require('./classifier/emotion_analyzer.js');
var credentials = require('./credentials.json');
var app = express();

console.log(emotion_analyzer);

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

// Create the service wrapper

var assistant = new AssistantV1({
  version: '2018-07-10',
  username: credentials.service_username,
  password: credentials.service_password
});

emotion_analyzer.load_csv();
// Endpoint to be call from the client side

app.get('/api/load_csv', function (req, res) {

  try {
    emotion_analyzer.load_csv();

  } catch (e) {
    console.log(e);
  } finally {
    return res.json({'dicionario_lexico': emotion_analyzer.dicionario_lexico});
  }

});

app.post('/api/tokenize', function (req, res) {
  try {
    var sentence = emotion_analyzer.tokenize(req.body.text);

  } catch (e) {
    console.log(e);
  } finally {
    return res.json({'sentence': sentence});
  }
});

app.post('/api/score_sentimento', function (req, res) {
  try {
    var emotion = emotion_analyzer.score_sentimento(req.body.text);
  } catch (e) {
    console.log(e);
  } finally {
    return res.json(emotion);
  }
});

app.post('/api/message', function (req, res) {

  if (req.body.input) {
    var emotion = emotion_analyzer.score_sentimento(req.body.input.text);
    console.log(emotion);
    req.body.context.emotion = emotion;
  }

  var workspace = credentials.workspace_id;

  var payload = {
    workspace_id: workspace,
    context: req.body.context || {},
    input: req.body.input || {}
  };

  // Send the input to the assistant service
  assistant.message(payload, function (err, data) {
    if (err) {
      console.log(err)
      return res.status(err.code || 500).json(err);
    }
    console.log(data)

    return res.json(updateMessage(payload, data));
  });
});

function updateMessage(input, response) {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  return response;
}

module.exports = app;
