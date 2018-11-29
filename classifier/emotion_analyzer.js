var iconvlite = require('iconv-lite');
var fs = require('fs');
emotion_analyzer = {};


function readFileSync_encoding(filename, encoding) {
    var content = fs.readFileSync(filename);
    return iconvlite.decode(content, encoding);
}

emotion_analyzer.dicionario_lexico = [];

emotion_analyzer.load_csv = function () {
  var fileContents = readFileSync_encoding('training/NRC-Portugues.csv', 'latin-1');
  var lines = fileContents.toString().replace(/\r/g, '').split('\n');

  for (var i = 0; i < lines.length; i++) {
	   emotion_analyzer.dicionario_lexico.push(lines[i].toString().split(';'));
  }

  console.log(emotion_analyzer.dicionario_lexico);
};

emotion_analyzer.tokenize = function (text) {
  var sentence = text.toLowerCase();
  sentence = sentence.split(' ').filter(function (el) {
    return el != '';
  });
  return sentence;
};


emotion_analyzer.score_sentimento = function (text) {

  var tokens = emotion_analyzer.tokenize(text);
  console.log(tokens);
  var lista = emotion_analyzer.dicionario_lexico;
  var score = [];

  for (var i=1; i<lista.length; i++){
    for (var j=0; j<tokens.length; j++){
      if (tokens[j] == lista[i][0]){
        console.log('achou');
        console.log(lista[i]);
        score.push(lista[i]);
      }
    }
  }

  var l_sentimento_positive = [];
  var l_sentimento_negative = [];
  var l_sentimento_anger = [];
  var l_sentimento_anticipation = [];
  var l_sentimento_disgust = [];
  var l_sentimento_fear = [];
  var l_sentimento_joy = [];
  var l_sentimento_sadness = [];
  var l_sentimento_surprise = [];
  var l_sentimento_trust = [];

  for (var i = 0; i < score.length; i++) {
    l_sentimento_positive.push(parseInt(score[i][1]));
    l_sentimento_negative.push(parseInt(score[i][2]));
    l_sentimento_anger.push(parseInt(score[i][3]));
    l_sentimento_anticipation.push(parseInt(score[i][4]));
    l_sentimento_disgust.push(parseInt(score[i][5]));
    l_sentimento_fear.push(parseInt(score[i][6]));
    l_sentimento_joy.push(parseInt(score[i][7]));
    l_sentimento_sadness.push(parseInt(score[i][8]));
    l_sentimento_surprise.push(parseInt(score[i][9]));
    l_sentimento_trust.push(parseInt(score[i][10]));
  }

  console.log(l_sentimento_positive);
  console.log(l_sentimento_negative);
  console.log(l_sentimento_anger);
  console.log(l_sentimento_anticipation);
  console.log(l_sentimento_disgust);
  console.log(l_sentimento_fear);
  console.log(l_sentimento_joy);
  console.log(l_sentimento_sadness);
  console.log(l_sentimento_surprise);
  console.log(l_sentimento_trust);


  var score_positive = l_sentimento_positive.reduce((a, b) => a + b, 0);
  var score_negative = l_sentimento_negative.reduce((a, b) => a + b, 0);
  var score_anger = l_sentimento_anger.reduce((a, b) => a + b, 0);
  var score_anticipation = l_sentimento_anticipation.reduce((a, b) => a + b, 0);
  var score_disgust = l_sentimento_disgust.reduce((a, b) => a + b, 0);
  var score_fear = l_sentimento_fear.reduce((a, b) => a + b, 0);
  var score_joy = l_sentimento_joy.reduce((a, b) => a + b, 0);
  var score_sadness = l_sentimento_sadness.reduce((a, b) => a + b, 0);
  var score_surprise = l_sentimento_surprise.reduce((a, b) => a + b, 0);
  var score_trust = l_sentimento_trust.reduce((a, b) => a + b, 0);

  console.log(score_positive);
  console.log(score_negative);
  console.log(score_anger);
  console.log(score_anticipation);
  console.log(score_disgust);
  console.log(score_fear);
  console.log(score_joy);
  console.log(score_sadness);
  console.log(score_surprise);
  console.log(score_trust);

  //verifica qual o sentimento
  response = {};

  //anger
  if (score_anger > score_anticipation && score_anger > score_disgust && score_anger > score_fear && score_anger > score_joy && score_anger > score_sadness && score_anger > score_surprise && score_anger > score_trust) {
    response.emotion = 'Anger';
    response.emotion_score = score_anger;
  }//anticipation
  else if (score_anticipation > score_anger && score_anticipation > score_disgust && score_anticipation > score_fear && score_anticipation > score_joy && score_anticipation > score_sadness && score_anticipation > score_surprise && score_anticipation > score_trust) {
    response.emotion = 'Anticipation';
    response.emotion_score = score_anticipation;
  }//disgust
  else if (score_disgust > score_anger && score_disgust > score_anticipation && score_disgust > score_fear && score_disgust > score_joy && score_disgust > score_sadness && score_disgust > score_surprise && score_disgust > score_trust) {
    response.emotion = 'Disgust';
    response.emotion_score = score_disgust;
  }//fear
  else if (score_fear > score_anger && score_fear > score_anticipation && score_fear > score_disgust && score_fear > score_joy && score_fear > score_sadness && score_fear > score_surprise && score_fear > score_trust) {
    response.emotion = 'Fear';
    response.emotion_score = score_fear;
  }//joy
  else if (score_joy > score_anger && score_joy > score_anticipation && score_joy > score_fear && score_joy > score_disgust && score_joy > score_sadness && score_joy > score_surprise && score_joy > score_trust) {
    response.emotion = 'Joy';
    response.emotion_score = score_joy;
  }//sadness
  else if (score_sadness > score_anger && score_sadness > score_anticipation && score_sadness > score_fear && score_sadness > score_joy && score_sadness > score_disgust && score_sadness > score_surprise && score_sadness > score_trust) {
    response.emotion = 'Sadness';
    response.emotion_score = score_sadness;
  }//surprise
  else if (score_surprise > score_anger && score_surprise > score_anticipation && score_surprise > score_fear && score_surprise > score_joy && score_surprise > score_sadness && score_surprise > score_disgust && score_surprise > score_trust) {
    response.emotion = 'Surprise';
    response.emotion_score = score_surprise;
  }//trust
  else if (score_trust > score_anger && score_trust > score_anticipation && score_trust > score_fear && score_trust > score_joy && score_trust > score_sadness && score_trust > score_surprise && score_trust > score_disgust) {
    response.emotion = 'Trust';
    response.emotion_score = score_trust;
  }//neutro
  else {
    response.emotion = 'Neutral';
    response.emotion_score = 0;
  }
  return response;
};


module.exports = emotion_analyzer;
