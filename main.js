function show(url){
    //Select Elemnts 
    let countSpan = document.querySelector('.quiz-info .count span');
    let bullets  = document.querySelector(".bullets .spans");
    let quiz_area = document.querySelector('.quiz-area');
    let answer = document.querySelector('.answers-area');
    let button = document.querySelector('.submit-button')
    let bul = document.querySelector(".bullets");
    let results = document.querySelector('.results');
    let countdown  = document.querySelector('.countdown');
    let re = document.querySelector('.re');

    let currentIndex = 0;
    let rightAnswers = 0;
    let countDownInterval;

    function getQuestions(){
        const XML = new XMLHttpRequest();
    
        XML.open("GET" , url , true);
    
        XML.onload = function () {
            if(this.readyState === 4 && this.status === 200){
                let jsData = JSON.parse(this.responseText);
                let counter1 = jsData.length;
    
                let randomIndices = [];
                while (randomIndices.length < 10) {
                    let randomIndex = Math.floor(Math.random() * counter1);
    
                    if (!randomIndices.includes(randomIndex)) {
                        randomIndices.push(randomIndex);
                    }
                }
                let randomQuestions = randomIndices.map(index => jsData[index]);
                let counter = randomQuestions.length;
                
                createBullets(counter)
    
                addQuestionData(randomQuestions[currentIndex] , counter);
    
                countDown(130 , counter)
    
                button.addEventListener('click' , function () {
                    let right = randomQuestions[currentIndex].right_answer;
    
                    currentIndex++;
    
                    checkAnswer(right , counter);
    
                    quiz_area.innerHTML = '';
                    answer.innerHTML = '';
    
                    addQuestionData(randomQuestions[currentIndex] , counter);
    
                    handelBullets();
                    clearInterval(countDownInterval)
                    countDown(130 , counter)
    
                    showResults(counter)
                })
                re.addEventListener('click' , function () {
                    location.reload();
                })
            }
        }
        XML.send()
    }    

    function createBullets(num){
        countSpan.innerHTML = num;
        for(let i = 0 ; i < num ; i++){
            let span = document.createElement('span');
            if(i === 0){
                span.className = 'on';
            }
            bullets.appendChild(span)
        }

    }

    function addQuestionData(obj , count){
        if(currentIndex < count){
            let h2 =  document.createElement('h2');
            h2.textContent = obj.title;

            quiz_area.appendChild(h2);

            for(let i = 1 ; i <= 4 ; i++){
                let mainDiv = document.createElement('div');

                mainDiv.className = 'answer';

                let radio = document.createElement('input');

                radio.name = 'questions'
                radio.type = 'radio'
                radio.id = `answer_${i}`;
                radio.dataset.answer = obj[`answer_${i}`];

                if(i === 1){
                    radio.checked = true;
                }

                let theLabel = document.createElement('label');

                theLabel.htmlFor = `answer_${i}`;
                theLabel.textContent = obj[`answer_${i}`];

                mainDiv.appendChild(radio)
                mainDiv.appendChild(theLabel)
                answer.appendChild(mainDiv)
            }
        }
    }

    function checkAnswer(right , count){
        let answers = document.getElementsByName('questions');
        let theChoosen ;
        for(let i = 0 ; i < answers.length ; i++){
            if(answers[i].checked){
                theChoosen = answers[i].dataset.answer;
            }
        }

        if(right === theChoosen){
            rightAnswers++;
        }
    }

    function handelBullets(){
        let spans = document.querySelectorAll('.bullets .spans span');
        let arrary = Array.from(spans)
        arrary.forEach((span , index) => {

            if(currentIndex === index){
                span.className = 'on'
            }
        })
    }

    function showResults(count){
        let theResult;
        if(currentIndex === count){
            quiz_area.remove();
            button.remove();
            answer.remove();
            bul.remove();

            if(rightAnswers > count / 2 && rightAnswers < count){
                theResult = `<span class="good">Good</span>, ${rightAnswers} From ${count} IS Good 😉👍👍`;
            }else if(rightAnswers === count){
                theResult = `<span class="good">Perfect</span>, All Answers IS Good ❤️😘🤗🤗`;
            }else{
                theResult = `<span class="good">bad</span>, ${rightAnswers} From ${count} IS bad 😡🤡😡`;
            }
            results.innerHTML = theResult;
            re.innerHTML = `<button class="return">Return</button>`
        }
    }

    function countDown(duration , count){
        if(currentIndex < count){
            let miutes , seconds;
            countDownInterval = setInterval(function () {
                miutes = parseInt(duration / 60)
                seconds= parseInt(duration % 60)

                miutes = miutes < 10 ? `0${miutes}` : miutes;
                seconds = seconds < 10 ? `0${seconds}` : seconds;

                countdown.innerHTML = `${miutes}:${seconds}`;

                if(--duration < 0){
                    clearInterval(countDownInterval);
                    button.click();
                }
            }, 1000)
        }
    }
    getQuestions()
}

let click1 = document.getElementById('click1');
click1.addEventListener('click' , function (){
    document.body.innerHTML = `
            <div class="quiz-app">
                <div class="quiz-info">
                    <div class="category">Category: <span>HTML</span></div>
                    <div class="count">Questions Count: <span></span></div>
                </div>
                <div class="quiz-area"></div>
                <div class="answers-area"></div>
                <button class="submit-button">submit Answer</button>
                <div class="bullets">
                    <div class="spans"></div>
                    <div class="countdown">
                </div>
                </div>
                <div class="result">
                    <div class="results"></div>
                    <div class='re'></div>
                </div>
            </div>
            `;
    show("question1.json");
})

let click2 = document.getElementById('click2');
click2.addEventListener('click' , function (){
    document.body.innerHTML = `
        <div class="quiz-app">
            <div class="quiz-info">
                <div class="category">Category: <span>Css</span></div>
                <div class="count">Questions Count: <span></span></div>
            </div>
            <div class="quiz-area"></div>
            <div class="answers-area"></div>
            <button class="submit-button">submit Answer</button>
            <div class="bullets">
                <div class="spans"></div>
                <div class="countdown">
            </div>
            </div>
            <div class="result">
                <div class="results"></div>
                <div class='re'></div>
            </div>
        </div>
            `;
    show("question2.json");
})

let click3 = document.getElementById('click3');
click3.addEventListener('click' , function (){
    document.body.innerHTML = `
        <div class="quiz-app">
            <div class="quiz-info">
                <div class="category">Category: <span>JS</span></div>
                <div class="count">Questions Count: <span></span></div>
            </div>
            <div class="quiz-area"></div>
            <div class="answers-area"></div>
            <button class="submit-button">submit Answer</button>
            <div class="bullets">
                <div class="spans"></div>
                <div class="countdown">
            </div>
            </div>
            <div class="result">
                <div class="results"></div>
                <div class='re'></div>
            </div>
        </div>
            `;
    show("question3.json");
})
