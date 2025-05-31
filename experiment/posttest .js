/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


  const myQuestions = [
    {
      question: "What does Tellegen's Theorem state about the power in a circuit?",  ///// Write the question inside double quotes
      answers: {
        a: " The sum of power across all branches is zero",                  ///// Write the option 1 inside double quotes
        b: "The sum of voltages across all branches is zero",                  ///// Write the option 2 inside double quotes
        c: "The sum of currents across all branches is zero",                  ///// Write the option 3 inside double quotes
        d: "The sum of resistances in the circuit is zero"                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "a"                ///// Write the correct option inside double quotes
    },

    {
      question: " Which law(s) must a circuit obey for Tellegen's Theorem to apply?",  ///// Write the question inside double quotes
      answers: {
        a: "Ohm's Law only",                  ///// Write the option 1 inside double quotes
        b: "Faraday's Law only",                  ///// Write the option 2 inside double quotes
        c: "Kirchhoff's Current and Voltage Laws",                  ///// Write the option 3 inside double quotes
        d: "Newton's Laws"                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },                                  ///// To add more questions, copy the section below 
    									                  ///// this line

    
    {
      question: "Does Tellegen's Theorem apply to nonlinear circuits??",
      answers: {
        a: "No, it only applies to linear circuits",
        b: "Yes, it applies to both linear and nonlinear circuits",
        c: "Only if the circuit is time-invariant",
        d: "Only if the circuit has no sources"
      },
      correctAnswer: "b"
    },

    {
    question: "For a circuit with voltages [10, -4, -6] V and currents [2, 2, 2] A, does Tellegen's Theorem hold?",
    answers: {
      "a": "Yes, the power sum is zero",
      "b": "No, the power sum is not zero",
      "c": "Only if the circuit is linear",
      "d": "Cannot be determined"
    },
    correctAnswer: "a"
  },
  {
    question: "What is a practical application of Tellegen's Theorem?",
    answers: {
      "a": "Calculating the resistance of a single resistor",
      "b": "Determining the frequency of an AC circuit",
      "c": "Measuring the temperature of circuit components",
      "d": "Verifying the consistency of circuit solutions"
    },
    correctAnswer: "d"
  }
    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////