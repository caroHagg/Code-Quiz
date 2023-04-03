// create object with answers and questions 
//source https://slidelizard.com for questions
//get html element to variables 

var questions = 
    [
        { 
            qa: " What is the longest river in the world?",
            ans:["Amazon","Volga","Mississippi","Nile"],
            correct:"Nile",
        },
         {  
            qa: "What is the most spoken language in the world?",
            ans:["Mandarin Chinese","Spanish","English","Russian"],
            correct:"Mandarin Chinese",
        },
         {
            qa:"Which of these cities is not capital of a country?",
            ans:["Vienna","Delhi","Rio de Janeiro","Canberra"],
            correct:"Rio de Janeiro",

         } ,
        {
            qa:"Which U.S. state has the second longest coastline (following Alaska)?",
            ans:["Hawaii","Florida","California","Texas"],
            correct:"Florida",
        } ,
        {
            qa:"Which ocean is the Bermuda Triangle located?",
            ans:["Atlantic Ocean","Indian Ocean","Arctic Ocean","Pacific Ocean"],
            correct:"Atlantic Ocean",
        } ,
        {
            qa:"What's the smallest country in the world?",
            ans:["Monaco","Vatican City","San Marino","Malta"],
            correct:"Vatican City",
        } ,
        {
            qa:"Area 51 is located in which U S state?",
            ans:["Utah","Idaho","New Mexico","Nevada"],
            correct:"Nevada",
        } ,
        {
            qa:"What country has the most natural lakes?",
            ans:["USA","Canada","Brazil","Australia"],
            correct:"Canada",
        } ,
        {
            qa:"What's the city with the most diversity in terms of language?",
            ans:["Buenos Aires","Los Angeles","New York","Chicago"],
            correct:"New York",
        } ,
];

var btnEl1 = document.getElementById("btn1");
var btnEl2 = document.getElementById("btn2");
var btnEl3 = document.getElementById("btn3");
var btnEl4 = document.getElementById("btn4");
var btnEl5 = document.getElementById("btn5");
var buttons = [btnEl1,btnEl2,btnEl3,btnEl4];

var answersScreenEl = document.getElementById("answers-screen")
var questionEl = document.getElementById("question-h4");
var counterEl =document.getElementById("counter");
var startBtnEl = document.getElementById("start-btn");
var mainEl = document.getElementById("quiz-wrapper");
var rightWrongEl = document.getElementById("right-wrong-span");
var highScoresEl = document.getElementById("high-score-screen");
var highScoreLinkEl = document.getElementById("high-score-link");
var scoreEl =document.getElementById("score-span");
var initialsEl = document.querySelector("#initials-input");
var saveBtnFormEl = document.getElementById("save-form-btn");
var inputSectionEl =document.getElementById("input-section");
var lastPlayEl = document.getElementById("last-play-span");
var userInit = document.getElementById("user-initials-show");

var changedQuestion = 0;
var scoreItem = 0;
var isWrong = false;
var lastItem = false;




//function to display first section after start click button
function startQuiz(){

    countdown();

    startBtnEl.setAttribute("style", "visibility: hidden;");
    highScoresEl.setAttribute("style", "visibility: hidden;");
    mainEl.setAttribute("style","visibility: visible;");

    //show last score played if available 
    if (localStorage.getItem("userInitials") === null){
        lastPlayEl.textContent = ""
    }else{
        lastPlayEl.textContent = localStorage.getItem("userInitials") + ": " + localStorage.getItem("scoreTotal");  
        
    }
    //set first question and answers

    var firstQuestion = questions[0].qa;
    questionEl.textContent = firstQuestion;

    for (i=0;i<questions[0].ans.length;i++){
        buttons[i].textContent = questions[0].ans[i];
        
    }
}

//function to display each section after answers button clicked
//display correct/wrong answer after clicking

function answerClicked(event){
    if (buttons.includes(event.target)){ 

         //changedQuestion to catch first item in the questions array
         
        if(event.target.textContent === questions[changedQuestion].correct){ 
            changedQuestion++
            scoreItem ++ 
            rightWrongEl.setAttribute("style", "color:green;")
            rightWrongEl.textContent = "Right!"
            isWrong = false;
        }else{
            isWrong=true;
            changedQuestion++
            rightWrongEl.setAttribute("style", "color:red;")
            rightWrongEl.textContent = "Wrong!"
            
            
        } 
        if (changedQuestion === questions.length){
            lastItem = true;
            changedQuestion=0;      
        }else{
            
            questionEl.textContent = questions[changedQuestion].qa
            for (i=0;i< buttons.length;i++){
                buttons[i].textContent = questions[changedQuestion].ans[i];

            }   
        }    
          
    }
    
}

//create a timer
//wrong answer subtract time from timer

function countdown() {
    var timeLeft = 45;
    var timeInterval = setInterval(function () {
      if (timeLeft > 0) {
        rightWrongEl.textContent = " "
        if(!isWrong){
            timeLeft--;
        }else{
            timeLeft -=7;
            isWrong=false;
        } 
        if (lastItem) {  
            lastItem = false;
            clearInterval(timeInterval);
            displayFinalScore();
            counterEl.textContent = 0
        }
        counterEl.textContent = timeLeft;

      }else {
        counterEl.textContent = 0;
        clearInterval(timeInterval);
        displayFinalScore();
      }
    }, 980);
  }

  function displayFinalScore(){
    //display total score screen with total score and input
    mainEl.setAttribute("style","visibility: hidden;");
    highScoresEl.setAttribute("style","visibility: visible;");
    inputSectionEl.setAttribute("style","visibility: visible;");

    scoreEl.textContent = scoreItem;
    userInit.textContent = "";

    saveBtnFormEl.addEventListener("click", displayTotalScores);
  }

//show initials and score 
  function displayTotalScores(event){

    event.preventDefault();

    var userInitials = initialsEl.value;

    localStorage.setItem("userInitials",userInitials);
    localStorage.setItem("scoreTotal",scoreItem)

    userInit.textContent = "You initials: " + localStorage.getItem("userInitials");

    inputSectionEl.setAttribute("style","visibility:hidden;");

    lastPlayEl.textContent = localStorage.getItem("userInitials") + ": " + localStorage.getItem("scoreTotal");
    
    //reset the game
    var resetBtn = document.getElementById("reset-btn");
    resetBtn.setAttribute("style","visibility:visible;");
    resetBtn.addEventListener("click", function(){
        startBtnEl.setAttribute("style","visibility:visible;");
    })
    
  }


  startBtnEl.addEventListener("click",startQuiz);
  answersScreenEl.addEventListener("click",answerClicked);
