var game = {
    // this is my game object
    correct: 0,
    wrong: 0,
    count: 0,

    counting: false,
    activeCounter: null,
    currPageIndex: 0,
    currAnswer: '',

    answersOn: true,

    previousPages: [], // for use with randomly selection questions
    
    // Question & Answer Bank
    pages: { 
        set1: { 
            question: "What is the stellar classification of our Sun?",
            answer1: "gold subdwarf",
            answer2: "white dwarf",
            answer3: "red giant",
            corrAnswer: "yellow dwarf"
        },

        set2: {
            question: "Which is the most prominent element in the Sun?",
            answer1: "Helium",
            answer2: "Iron",
            answer3: "Sulphur",
            corrAnswer: "Hydrogen"
        },

        set3: {
            question: "Which is the closest active galaxy to the Milky Way?",
            answer1: "Sagittarius A",
            answer2: "Cygnus 11",
            answer3: "Orionis A",
            corrAnswer: "Centarus A"
        },

        set4: {
            question: "Hydrogen is the simplest element in the universe, and, not coincidentally, it's also the oldest. In its most common form, what does a hydrogen atom consist of?",
            answer1: "a proton, electron and neutron",
            answer2: "a single proton",
            answer3: "two electrons and a neutron",
            corrAnswer: "a proton and an electron"
        },

        set5: {
            question: "The Gemini North telescope is located at high altitude in which 50th U.S. state?",
            answer1: "New Jersey",
            answer2: "Minnesota",
            answer3: "New York",
            corrAnswer: "Hawaii"
        },

        set6: {
            question: "Which of these planets could, theoretically, float if submerged in water due to its density?",
            answer1: "Mercury",
            answer2: "Venus",
            answer3: "Jupiter",
            corrAnswer: "Saturn"
        },

        set7: {
            question: "What nickname is given to the planet Venus?",
            answer1: "morning star",
            answer2: "evening star",
            answer3: "neither morning nor evening star",
            corrAnswer: "both morning and evening star"
        },

        set8: {
            question: "As this is a quiz about cosmological timescales, let's first make sure we know the difference between units of time and those used to measure other things. Which of the following can be used as a measure of time?",
            answer1: "angstrom",
            answer2: "light-year",
            answer3: "erg",
            corrAnswer: "megaannum"
        },

        set9: {
            question: "A common problem with refracting telescopes is a fringe of false color around the image, caused by the inability of a large lens to refract all colors of the spectrum to a common focus. This is known as ______.",
            answer1: "astigmatism",
            answer2: "achromism",
            answer3: "annulation",
            corrAnswer: "aberration"
        },

        set10: {
            question: "In the constellation of Serpens, this Messier object consists of noticeable features such as the Spire and the Pillars of Creation. What is it called?",
            answer1: "the fox nebula",
            answer2: "the tango nebula",
            answer3: "the treant nebula",
            corrAnswer: "the eagle nebula"

        }
    }, // end question bank

    shuffle: function(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            // i = 7 - 1, 6; 6 > 0; 6--
            j = Math.floor(Math.random() * (i + 1));
            // console.log("j is: " + j);
            x = a[i];
            // console.log("x is: " + x);
            a[i] = a[j];
            // console.log("a[i] is: " + a[j]);
            a[j] = x;
            // console.log("a[j] is: " + x);
            }
        return a;
        },

    countDown: function() {
        var num = game.count;
        console.log(num);

        if (num > 0) {
            num--;
            game.count = num;

            $(".time").text(game.count);
        }
        else {
            num = 0;
            game.counting = false;
            // clearInterval(game.activeCounter);

            // game.currPageIndex = this.Object.keys(this.pages);

            // if zero force next page
            // game.currPageIndex++;
            // console.log(game.currPageIndex);

            // console.log(Object.keys(game.pages)[game.currPageIndex]);

            game.count = num;

            $(".time").text(game.count);

            game.nextPage();
            return;
        }
        
    },

    loadPage: function(thePage) {
        game.previousPages.push(thePage);

        // correct answer is this page's corrAnswer
        game.currAnswer = thePage.corrAnswer;

        // Timing :     
        game.counting = true;

        console.log("this pages question is: " + thePage.question);

        if (game.counting) {
            game.count = 10;
            game.activeCounter = setInterval(this.countDown, 1000);
        }

        // enable answers
        game.answersOn = true;


        // Page display : 
            // ensure time is 10
            $(".time").text("10");
            // ensure .result is blank
            $(".result").text('');

            // display question
            $(".question").text(thePage.question);

            // push all answers into array
            var answerArr = [];
            answerArr.push(thePage.answer1);
            answerArr.push(thePage.answer2);
            answerArr.push(thePage.answer3);
            answerArr.push(thePage.corrAnswer);

            // shuffle the deck
            this.shuffle(answerArr);

            // display shuffled answers
            $(".answer1").text(answerArr[0]);
            $(".answer2").text(answerArr[1]);
            $(".answer3").text(answerArr[2]);
            $(".answer4").text(answerArr[3]);
    },
    
    nextPage: function () {
        clearInterval(game.activeCounter);

        game.currPageIndex++;
        console.log("my page index: " + game.currPageIndex);
        
        // if index is less than length of game.pages
        if (game.currPageIndex < Object.keys(game.pages).length) {
            // load the valid index page
            game.loadPage(game.pages[Object.keys(game.pages)[game.currPageIndex]]);
            console.log(game.pages[Object.keys(game.pages)[game.currPageIndex]]);
        }

        // if index is the last index
        if (game.currPageIndex === Object.keys(game.pages).length) {
            // when they reach the end: 
                // display you've completed the trivia game
                alert("You've completed this game!");
                
                $(".question").hide();
                $(".answer1").hide();
                $(".answer2").hide();
                $(".answer3").hide();
                $(".answer4").hide();

                $(".result").text("You've answered all questions! Reload the page to play again!");
        }
    },

    checkAnswer: function (playerGuess) {
        if (playerGuess === game.currAnswer) {
            // alert("You're correct!");
            game.correct++;
            console.log("current score: " + game.correct);
            $(".result").text("Correct! The answer was: " + game.currAnswer);
            $(".wins").text("Correct Answers: " + game.correct);

            // force timer to 3
            game.count = 3;
        }
        else {
            game.wrong++;
            console.log("incorrect: " + game.wrong);

            $(".result").text("Wrong! The answer was: " + game.currAnswer);
            $(".losses").text("Times Wrong: " + game.wrong);
            
            // force timer to 3
            game.count = 3;
        }
    }

}; // end game object

// console.log(game.countDown());
var firstPage = game.pages[Object.keys(game.pages)[0]];
game.loadPage(firstPage);

var guess = '';

// check user input
$(".answer1").on("click", function() {
    if (game.answersOn) {
        game.answersOn = false;
        // alert("answersOn is now: " + game.answersOn);

        guess = this.innerHTML;
        console.log("user guessed: " + guess);

        game.checkAnswer(guess);
    }
});
$(".answer2").on("click", function() {
    if (game.answersOn) {
        game.answersOn = false;
        // alert("answersOn is now: " + game.answersOn);

        guess = this.innerHTML;
        console.log("user guessed: " + guess);

        game.checkAnswer(guess);
    }
});
$(".answer3").on("click", function() {
    if (game.answersOn) {
        game.answersOn = false;
        // alert("answersOn is now: " + game.answersOn);

        guess = this.innerHTML;
        console.log("user guessed: " + guess);

        game.checkAnswer(guess);
    }
});
$(".answer4").on("click", function() {
    if (game.answersOn) {
        game.answersOn = false;
        // alert("answersOn is now: " + game.answersOn);

        guess = this.innerHTML;
        console.log("user guessed: " + guess);

        game.checkAnswer(guess);
    }
});

// display wins and losses
$(".correct").text(game.correct);
$(".wrong").text(game.wrong);