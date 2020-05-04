var gameParams = {
    questions: [
        // Question 1

        {
            question: "What type of tree was the big Totoro found in?",
            option1: "Oak",
            option2: "Camphor",
            option3: "Cedar",
            answer: "Camphor",
            imgsrc: "./assests/images/camphor.png",
            answertext: "Just a really big one"
        },
        // Question 2
        {
            question: "What was the totoro Mei was first chasing?",
            option1: "Chibi Totoro",
            option2: "King Totoro",
            option3: "Chuu Totoro",
            answer: "Chibi Totoro",
            imgsrc: "./assests/images/chibi.jpg",
            answertext: "Chibi means small. This totoro was smaller than the others."
        },
        // Question 3
        {
            question: "What is the name of Mei's older sister?",
            option1: "Lei",
            option2: "Satsuki",
            option3: "Misaki",
            answer: "Satsuki",
            imgsrc: "./assests/images/satsuki.jpg",
            answertext: "Satsuki is the traditional name for the month of May. (Mei??)"
        },
        // Question 4
        {
            question: "How does the family get rid of the Dust Bunnies?",
            option1: "Cleaning",
            option2: "Laughing",
            option3: "Planting Trees",
            answer: "Laughing",
            imgsrc: "./assests/images/dustbunnies.gif",
            answertext: "They laugh their fear away and play. As they do this, the Dust Bunnies escape from the house."
        },
        // Question 5
        {
            question: "Where is the mother of the sisters?",
            option1: "Hospital",
            option2: "At her mother's house",
            option3: "At school",
            answer: "Hospital",
            imgsrc: "./assests/images/mother.jpg",
            answertext: "While her disease in not named in the movie, it was believed to be tuberculosis. Afterwards, a cold delayed her coming home."
        },
        // Question 6
        {
            question: "What does Granny call the black fuzzy things?",
            option1: "Dust Bunnies",
            option2: "Totoro",
            option3: "Soot Sprites",
            answer: "Soot Sprites",
            imgsrc: "./assests/images/soot-sprite.jpg",
            answertext: "In the original, they are called susuwatari, or travelling soot."
        },
        // Question 7
        {
            question: "At the bus stop, what does Satsuki give to Totoro?",
            option1: "Leaf",
            option2: "Umbrella",
            option3: "Sweet Bun",
            answer: "Umbrella",
            imgsrc: "./assests/images/umbrella.jpg",
            answertext: "It was pouring, and Totoro only had a leaf over his head. When he is given the umbrella, he plays with it."
        },
        // Question 8
        {
            question: "How does Totoro thank Satsuki for it?",
            option1: "He gives them the instruments that make the sound of the owls",
            option2: "He lets them board the magical bus",
            option3: "He gives her a packet of magical seeds",
            answer: "He gives her a packet of magical seeds",
            imgsrc: "./assests/images/totorowander.jpg",
            answertext: "Totoro and the girls make the seeds grow into a giant tree with magic at night"
        },

        // Question 9
        {
            question: "What does Granny find at the lake?",
            option1: "A hat",
            option2: "A piece of Mei's dress",
            option3: "A sandal",
            answer: "A sandal",
            imgsrc: "./assests/images/sandal.png",
            answertext: "She thinks it is Mei's"
        },
        // Question 10
        {
            question: "What creature leads Satsuki to Mei?",
            option1: "Nekobus",
            option2: "FlyingTotoro",
            option3: "Cedar",
            answer: "Nekobus",
            imgsrc: "./assests/images/catbus.jpg",
            answertext: "It's a cat and a bus all in one!"
        }
    ],
    currentQuestion: 0,
    numberCorrect: 0,
    numberIncorrect: 0,
    numberNoAnswer: 0,
    timerSeconds: 3,
    timeLeft: 3,
    timerHandle: ''


}

function startGame() {
    // restarting game results
    gameParams.currentQuestion = 0;
    gameParams.numberCorrect = 0;
    gameParams.numberIncorrect = 0;
    gameParams.numberNoAnswer = 0;
    gameParams.timeLeft = gameParams.timerSeconds;



    // ask first question
    nextQuestion();
}

function nextQuestion() {
    if (gameParams.currentQuestion >= 10) {
        displayResults(false);
        return
    }

    //  empty last results
    $('#results').html('');

    // remove start button
    $('#startgame').hide();

    //set timer function
    gameParams.timerHandle = setInterval(runTimer, 1000)
        // set timer to 20 seconds each question

    $('.quiztimer').html(
        $("<p id='remaining-time' >Remaining Time: <span id='secondsLeft'>" + gameParams.timeLeft + "</span></p>"));


    //display the next question

    //console.log(gameParams.currentQuestion + "is the question set")

    var questionset = gameParams.questions[gameParams.currentQuestion];

    //console.log(JSON.stringify(questionset))
    // gets all the questions then indexes the current questions
    $('.quizquestion').html('')
    $('#quizoptions').html('')
    $('.quizquestion').show()
    $('#quizoptions').show()

    $('.quizquestion').text(questionset.question);

    $('#quizoptions').html($('<p id= "opt1" class="answeroption" onclick="checkAnswer(1)">' + questionset.option1 + '</p>'));
    $('#quizoptions').append($('<p id= "opt2" class="answeroption" onclick="checkAnswer(2)">' + questionset.option2 + '</p>'));
    $('#quizoptions').append($('<p id= "opt3" class="answeroption" onclick="checkAnswer(3)">' + questionset.option3 + '</p>'));

    $
}

//timer function

function runTimer() {
    // console.log("timer : " + gameParams.timeLeft);
    //conditions to check:
    //if time is left 
    //  check if < 5 seconds 
    // make it red 
    //else if time has run out
    //  check if this is the last question
    // if it is the last question display the final results
    // if not the last question then display the answer for 10 seconds 
    // and display the next questions
    if (gameParams.timeLeft >= 1) {
        gameParams.timeLeft = gameParams.timeLeft - 1
            //make it red
        $('#secondsLeft').text(gameParams.timeLeft);
        if (gameParams.timeLeft <= 5) {
            $('#timeLeft').css('color', 'red');
        }

    } else {

        clearInterval(gameParams.timerHandle);
        resultId = setTimeout(displayResults(true), 2000);
        gameParams.numberNoAnswer++;
        if (gameParams.currentQuestion <= 10) {
            //console.log("Show next question");
            gameParams.currentQuestion++;
            gameParams.timeLeft = gameParams.timerSeconds;
        }
    }
}

function displayResults(onlyanswers) {
    //display the answer if argument is true
    //else display the final result
    //need to show start button here
    if (onlyanswers) {
        console.log("show answer")

        displayElements("Out of time")
            //     // hide questions and options section
            // $('.quizquestion').hide();

        // $('#quizoptions').hide();
        // $('#results').html('<h3>Out of time! The answer was ' +
        //     gameParams.questions[gameParams.currentQuestion].answer + '</h3>');
        // $('#results').append('<img src="' + gameParams.questions[gameParams.currentQuestion].imgsrc +
        //     '" height="250px " width="375px ">')
        // $('#results').append('<h3>' +
        //     gameParams.questions[gameParams.currentQuestion].answertext + '</h3>');
        //$('#results').append('<button id="nextbutton" onclick="nextQuestion()" class="btn btn-info btn-lg ">Next</button>')
        var resultId = setTimeout(nextQuestion, 3000);

    } else {
        console.log("show result")
            // adds results of game (correct, incorrect, unanswered) to the page

        $('#results').show()
        $('#results')
            .html('<h3>Thank you for playing!</h3>' +
                '<p>Correct: ' + gameParams.numberCorrect + '</p>' +
                '<p>Incorrect: ' + gameParams.numberIncorrect + '</p>' +
                '<p>Unaswered: ' + gameParams.numberNoAnswer + '</p>' +
                '<p>Please play again!</p>');

        // hide questions and options section

        $('.quiztimer').hide();

        $('.quizquestion').hide();

        $('.quizoptions').hide();

        // show start button to begin a new game
        $('#startgame').show();
    }
}

//check selected answer
function checkAnswer(optionnumber) {

    //take care of quiz variables to proceed to next question
    clearInterval(gameParams.timerHandle);

    //check the answer selected
    var optionid = "#opt" + optionnumber
    var currentKey = gameParams.currentQuestion
    var correctAnswer = gameParams.questions[currentKey].answer
    var resultsText = ""

    // console.log("correct answer " + correctAnswer)
    // console.log("selected answer" + $(optionid).text())

    if ($(optionid).text() === correctAnswer) {
        gameParams.numberCorrect++;
        resultsText = 'Yay!! You are right!!!'
    } else {
        gameParams.numberIncorrect++;
        resultsText = 'Better luck next time!'
    }
    displayElements(resultsText)

    // hide questions and options section
    // $('.quizquestion').hide();

    // $('#quizoptions').hide();

    // $('#results').html(resultsText + '<br><p> The answer was ' +
    //     gameParams.questions[gameParams.currentQuestion].answer + '</h3>');
    // $('#results').append('<img src="' + gameParams.questions[gameParams.currentQuestion].imgsrc +
    //     '" height="250px " width="375px ">')
    // $('#results').append('<h3>' +
    //     gameParams.questions[gameParams.currentQuestion].answertext + '</h3>');
    //$('#results').append('<button id="nextbutton" onclick="nextQuestion()" class="btn btn-info btn-lg ">Next</button>')
    var resultId = setTimeout(nextQuestion, 3000);


    if (gameParams.currentQuestion <= 10) {
        //console.log("Show next question");
        gameParams.currentQuestion++;
        gameParams.timeLeft = gameParams.timerSeconds;
    }

}

function displayElements(displayMessage) {
    // hide questions and options section

    $('.quiztimer').hide();

    $('.quizquestion').hide();

    $('#quizoptions').hide();
    $('#results').html('<h3>' + displayMessage + ' <br><p>The answer was ' +
        gameParams.questions[gameParams.currentQuestion].answer + '</h3>');
    $('#results').append('<img src="' + gameParams.questions[gameParams.currentQuestion].imgsrc +
        '" height="250px " width="375px ">')
    $('#results').append('<h3>' +
        gameParams.questions[gameParams.currentQuestion].answertext + '</h3>');

}

$(document).ready(function() {


    $("#startgame").on('click', startGame);
    $(".answeroption").on('click', checkAnswer);

})