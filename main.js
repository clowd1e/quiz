const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4')

const optionElements = document.querySelectorAll('.option')

const question = document.getElementById('question')

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions')

let indexOfQuestion,
    indexOfPage = 0

const ansewrsTracker = document.getElementById('answers-tracker')
const btnNext = document.getElementById('btn-next')

const formOfQuiz = document.querySelector('.quiz-container')

let score = 0

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2')
      btnTryAgain = document.getElementById('btn-try-again')

const questions = [
    {
        question: 'Синонімами є всі слова в рядку',
        options: [
            'говіркий, веселий, радісний',
            'карати, мучити, тримати',
            'деінде, подекуди, зблизька',
            'артист, лицедій, актор',
        ],
        rightAnswear: 3
    },
    {
        question: 'Суфікс -ок має однакове значення в усіх словах, ОКРІМ',
        options: [
            'жучок',
            'жовток',
            'лужок',
            'грибок',
        ],
        rightAnswear: 1
    },
    {
        question: 'Лексичну помилку допущено в рядку',
        options: [
            'виговор з попередженням',
            'запровадження виборності',
            'оголошення подяки',
            'посвідка на проживання',
        ],
        rightAnswear: 0
    },
    {
        question: 'Апостроф треба писати на місці пропуску в усіх словах рядка',
        options: [
            'з..явитися, надвечір..я, ін..єкція',
            'миш..як, різьб..ярство, нав..ючений',
            'В..ячеслав, Св..ятослав, Х..юстон',
            'під..юдити, грав..юра, слов..янин',
        ],
        rightAnswear: 0
    },
    {
        question: 'НЕПРАВИЛЬНО узгоджено прикметник з іменником у рядку',
        options: [
            'дорожній насип',
            'прозорий тюль',
            'запашний ваніль',
            'небезпечний кір',
        ],
        rightAnswear: 2
    },
    {
        question: 'На перший склад падає наголос у слові',
        options: [
            'текстовий',
            'зручний',
            'визвольний',
            'фаховий',
        ],
        rightAnswear: 1
    }
]

numberOfAllQuestions.innerHTML = questions.length

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question

    option1.innerHTML = questions[indexOfQuestion].options[0]
    option2.innerHTML = questions[indexOfQuestion].options[1]
    option3.innerHTML = questions[indexOfQuestion].options[2]
    option4.innerHTML = questions[indexOfQuestion].options[3]

    numberOfQuestion.innerHTML = indexOfPage + 1
    indexOfPage++
}

let completedAnswers = []

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length)
    let hitDupllicate = false
    
    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDupllicate = true
                }
            })
            if(hitDupllicate == true) {
                randomQuestion()
            } else {
                indexOfQuestion = randomNumber
                load()
            }
        } 
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber
            load()
        }
    }
    completedAnswers.push(indexOfQuestion)
}

const checkAnswear = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswear) {
        el.target.classList.add('correct')
        updateAnswerTracker('correct')
        formOfQuiz.classList.add('correct-answer')
        score++
    } else {
        el.target.classList.add('wrong')
        updateAnswerTracker('wrong')
        formOfQuiz.classList.add('wrong-answer')
    }
    disabledOptions()
}

for(option of optionElements) {
    option.addEventListener('click' , e => checkAnswear(e))
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled')
        scaleForm2()
        if(item.dataset.id == questions[indexOfQuestion].rightAnswear) {
            item.classList.add('correct')
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('wrong', 'disabled', 'correct')
    })
    formOfQuiz.classList.remove('correct-answer', 'wrong-answer')
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div')
        ansewrsTracker.appendChild(div)
    })
}

const updateAnswerTracker = status => {
    ansewrsTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа')
    } else {
        randomQuestion()
        enableOptions()
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active')
    correctAnswer.innerHTML = score
    numberOfAllQuestions2.innerHTML = questions.length
}

const tryAgain = () => {
    window.location.reload()
}
btnTryAgain.addEventListener('click', tryAgain)

btnNext.addEventListener('click', () => {
    validate()
    scaleForm()
})

const scaleForm = () => {
    formOfQuiz.classList.add('scale-event')
}
const scaleForm2 = () => {
    formOfQuiz.classList.remove('scale-event')
}

window.addEventListener('load', () => {
    randomQuestion()
    answerTracker()
    scaleForm()
})