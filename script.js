
var quizcontent;
// Get the questions from json file 
var noOfQuesstions = Object(data.quizcontent).length;
// console.log('Length of Object: ' + noOfQuesstions);

var currentQuestion = 0;
var score = 0;
var myAnswers = [];
var countArray = [];
var questionNo = document.getElementById("questionNo");
var myHeader = document.getElementById("quizHeader");
var classname = document.getElementsByClassName("choice");
var choices = document.getElementById("choices");
var message = document.getElementById("message");
var btnNext = document.getElementById("btnNext");
var btnPrev = document.getElementById("btnPrev");
var btnFinish = document.getElementById("finishQuiz");
var newImage = document.getElementById("questionImage");
progressBar.style.width = 0;
progressBar.innerHTML = 0;

checkPage();
btnNext.addEventListener("click", moveNext);
btnPrev.addEventListener("click", movePrev);
btnFinish.addEventListener("click", endQuiz);
for (var i = 0; i < classname.length; i++) {
  classname[i].addEventListener('click', myAnswer, false);
}

// loops through all answers for the particular question and displays it
function myAnswer() {
  var idAnswer = this.getAttribute("data-id");
  myAnswers[currentQuestion] = idAnswer;
  if (data.quizcontent[currentQuestion].answer == idAnswer) {
    console.log('Correct Answer');
  }
  else {
    console.log('Wrong Answer');
  }
  console.log('my Answers: ' + myAnswers);
  console.log('my Answers length: ' + myAnswers.length);

  var countArray = myAnswers.filter(value => typeof value !== 'undefined');
  console.log(countArray.length);
  selectAnswer();

  // progress bar
  var increment = Math.ceil((countArray.length) / (noOfQuesstions) * 100);
  progressBar.style.width = (increment) + '%';
  progressBar.innerHTML = (increment) + '%';
}

// Adds selected answer class when user picks an answer
function selectAnswer() {
  for (var i = 0; i < choices.children.length; i++) {
    var curNode = choices.children[i];
    if (myAnswers[currentQuestion] == (i + 1)) {
      curNode.classList.add("answerSelected");

    }
    else {
      curNode.classList.remove("answerSelected");
    }
  }
}

// Goes to the next question
function moveNext() {
  if (currentQuestion < (noOfQuesstions - 1)) {
    currentQuestion++;
    checkPage(currentQuestion);
  }
  message.innerHTML = '';
}

// End Quiz when user clicks Submit Quiz button
function endQuiz() {
  countArray = myAnswers.filter(value => typeof value !== 'undefined');
  if (countArray.length == noOfQuesstions) {
    document.getElementById("questionNo").classList.add("d-none");
    document.getElementById("choices").classList.add("d-none");
    document.getElementById("finishQuiz").classList.add("d-none");
    document.getElementById("pageNavigation").classList.add("d-none");
    document.getElementById("progress").classList.add("d-none");
    document.getElementById("questionImage").classList.add("d-none");

    message.innerHTML = '';
    var output = "<div class='output'> <br>";
    var questionResult = 'NA';

    // Count User Score
    for (var i = 0; i < myAnswers.length; i++) {
      if (data.quizcontent[i].answer == myAnswers[i]) {
        score++;
      }
    }
    // Display User Score
    output = output + '<h3> You scored ' + score + ' out of ' + noOfQuesstions + '</h3>';

    for (var i = 0; i < myAnswers.length; i++) {
      if (data.quizcontent[i].answer == myAnswers[i]) {
        questionResult = '<span class="material-symbols-outlined text-success ms-1">check_circle</span>';
        score++;
        console.log('score: ' + score);
      }
      else {
        questionResult = '<span class="material-symbols-outlined text-danger ms-1">cancel</span>';
      }
      correctAnswer = data.quizcontent[i].answer;
      console.log('correct ans: ' + correctAnswer);
      output = output + '<h5 class="text-decoration-underline">Question ' + (i + 1) + ' ' + questionResult + '</h5>' + '<h6>' + data.quizcontent[i].question + '</h6>' +
        '<strong>Correct Answer: </strong>' + data.quizcontent[i]["a" + (correctAnswer)] + '<br>';
    }
    
    output = output + 
    '<div class="d-flex">'+'<button onClick="window.location.reload();" class="btn btn-submit mx-auto mt-3">Try Again</button>'+'</div>';
    document.getElementById("quizContent").innerHTML = output;

  } else {
    message.innerHTML = 'All Questions are not answered yet!';
  }
}

function checkPage(i) {

  // Hides prev and next buttons on start and end of quiz
  if (currentQuestion == 0) {
    btnPrev.classList.add("d-none");
  } else {
    btnPrev.classList.remove("d-none");
  }

  if ((currentQuestion + 1) < (noOfQuesstions)) {
    btnNext.classList.remove("d-none");
  }
  else {
    btnNext.classList.add("d-none");
  }

  questionNo.innerHTML = 'Question ' + (currentQuestion + 1);
  myHeader.innerHTML = data.quizcontent[currentQuestion].question;
  newImage.src = data.quizcontent[currentQuestion].image;
  for (var i = 0; i < choices.children.length; i++) {
    var curNode = choices.children[i];
    curNode.childNodes[1].innerHTML = data.quizcontent[currentQuestion]["a" + (i + 1)];

    if (myAnswers[currentQuestion] == (i + 1)) {
      curNode.classList.add("answerSelected");

    }
    else {
      curNode.classList.remove("answerSelected");
    }
  }
}

// goes to the previous question
function movePrev() {
  if (currentQuestion > 0) {
    currentQuestion--;
    checkPage(currentQuestion);
  }
  message.innerHTML = '';
}
