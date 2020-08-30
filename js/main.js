window.onload = function () {
  const ru = document.querySelectorAll(".ru");
  const en = document.querySelectorAll(".en");
  const enVer = document.getElementById("en-lang");
  const ruVer = document.getElementById("ru-lang");

  /* смена языка */
  function translate() {
    for (let i = 0; i < ru.length; i++) {
      ru[i].addEventListener("click", (e) => {
        e.preventDefault();
        enVer.style.display = "none";
        ruVer.style.display = "block";
        localStorage.setItem("ruVer", "true");
      });
    }

    for (let i = 0; i < en.length; i++) {
      en[i].addEventListener("click", (e) => {
        e.preventDefault();
        ruVer.style.display = "none";
        enVer.style.display = "block";
        localStorage.setItem("ruVer", "false");
      });
    }
  }
  translate();

  /* нумерация вопросов на Русской версии*/

  function questionCountRU() {
    let ruPage = document.querySelector(".ru-lang");
    let question = ruPage.querySelectorAll(".quizRU");
    for (let i = 0; i < question.length; i++) {
      let questionCurrent = question[i].querySelector(".quizNumber");
      questionCurrent.innerText = "Вопрос № " + [i + 1];
    }
  }

  questionCountRU();

  /* нумерация вопросов на Английской версии*/

  function questionCountEN() {
    let ruPage = document.querySelector(".en-lang");
    let question = ruPage.querySelectorAll(".quizEN");
    for (let i = 0; i < question.length; i++) {
      let questionCurrent = question[i].querySelector(".quizNumber");
      questionCurrent.innerText = "Question № " + [i + 1];
    }
  }

  questionCountEN();

  /* Модальное окнос с QR */
  const disLikeBtn = document.querySelectorAll(".disLikeBtn");
  const qrModal = document.querySelectorAll(".qr");
  const qrModalClose = document.querySelectorAll(".qr-close");

  function qr() {
    for (let i = 0; i < disLikeBtn.length; i++) {
      disLikeBtn[i].addEventListener("click", (e) => {
        e.preventDefault();
        for (let j = 0; j < qrModal.length; j++) {
          qrModal[j].style.opacity = "1";
          qrModal[j].style.zIndex = "2";

          for (let k = 0; k < qrModalClose.length; k++) {
            qrModalClose[k].addEventListener("click", (e) => {
              e.preventDefault();
              qrModal[j].style.opacity = "0";
              qrModal[j].style.zIndex = "-2";
            });
          }
        }
      });
    }
  }
  qr();

  /* модальное окно с отзывом */
  const likeBtn = document.querySelectorAll(".likeBtn");
  const formModal = document.querySelectorAll(".feedbackModule");
  const closeFormModal = document.querySelectorAll(".closeFormModal");

  function formModalOpen() {
    for (let i = 0; i < likeBtn.length; i++) {
      likeBtn[i].addEventListener("click", (e) => {
        e.preventDefault();
        for (let j = 0; j < formModal.length; j++) {
          formModal[j].style.opacity = "1";
          formModal[j].style.zIndex = "2";
          for (let k = 0; k < closeFormModal.length; k++) {
            closeFormModal[k].addEventListener("click", (e) => {
              e.preventDefault();
              formModal[j].style.opacity = "0";
              formModal[j].style.zIndex = "-1";
            });
          }
        }
      });
    }
  }
  formModalOpen();

  /* переворот баннера по касанию */
  let bannerModule = document.querySelectorAll(".bannerModule");

  function cardRotate() {
    for (let i = 0; i < bannerModule.length; i++) {
      bannerModule[i].addEventListener("click", (e) => {
        e.preventDefault();
        if (!bannerModule[i].classList.contains("bannerModule-active"))
          bannerModule[i].classList.toggle("bannerModule-active");
        else {
          bannerModule[i].classList.toggle("bannerModule-active");
        }
      });
    }
  }

  cardRotate();

  /* открытие вопроса квиз */
  let quizCard = document.querySelectorAll(".quizModuleCard");

  function quizClick() {
    for (let i = 0; i < quizCard.length; i++) {
      quizCard[i].addEventListener("click", (e) => {
        e.preventDefault();
        if (
          !quizCard[i].parentElement.classList.contains("quizModule-active")
        ) {
          quizCard[i].parentElement.classList.toggle("quizModule-active");
        } else quizCard[i].parentElement.classList.toggle("quizModule-active");
      });
    }
  }

  quizClick();

  /* открытие вопроса квиз с полем ввода */
  let quizModule2 = document.querySelectorAll(".quizModule2");

  function quizClick2() {
    for (let i = 0; i < quizModule2.length; i++) {
      quizModule2[i].addEventListener("click", (e) => {
        e.preventDefault();
        let quizTextInput = quizModule2[i].querySelector(".quizTextInput");
        if (!quizModule2[i].classList.contains("quizModule2-active")) {
          quizModule2[i].classList.toggle("quizModule2-active");
          quizTextInput.focus();
        } else {
          quizModule2[i].classList.toggle("quizModule2-active");
          quizTextInput.blur();
        }
      });
    }
  }

  quizClick2();
  /* выбор ответа (выделение checkbox) */

  let checkbox = document.querySelectorAll("input[type=checkbox]");

  function checkAnswer() {
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].parentElement.addEventListener("click", (e) => {
        if (
          !checkbox[i].parentElement.classList.contains(
            "answer-options_checked"
          )
        ) {
          checkbox[i].parentElement.classList.toggle("answer-options_checked");
        } else {
          checkbox[i].parentElement.classList.toggle("answer-options_checked");
        }
      });
    }
  }
  checkAnswer();

  /* Валидация квиза и отправка на телеграм-бот русский язык*/
  let formValidateRU = function () {
    let ruPage = document.querySelector(".ru-lang");
    let questionDiv = ruPage.querySelectorAll(".quizRU");
    let syteName = document.querySelector('title').innerText

    let bob = new Object();
    for (let i = 0; i < questionDiv.length; i++) {
      let questText = questionDiv[i].querySelector(".question").innerText;
      let inputText = questionDiv[i].querySelectorAll(".quizTextInput");
      let li = questionDiv[i].querySelectorAll(".answer-options_checked");
      let inputAnswer = [];
      let checkBoxAnswer = [];

      for (let j = 0; j < inputText.length; j++) {
        inputAnswer.push(inputText[j].value);
      }

      for (let j = 0; j < li.length; j++) {
        let answer = li[j].innerText;
        checkBoxAnswer.push(answer);
      }
      bob["webSyte"] = syteName;
      if (questionDiv[i].classList.contains("quizModule2")) {
        if (inputAnswer.toString() !== "") {
          bob[questText] = inputAnswer.toString();
        } else {
          alert("Проийдите опрос полностью.")
          return
        }
      } else if (questionDiv[i].classList.contains("quizModule")) {
        if (checkBoxAnswer.join(", ") !== "") {
          bob[questText] = checkBoxAnswer.join(", ");
        } else {
          alert("Проийдите опрос полностью")
          return
        }
      }

      /*         console.log(questText + " *** Ответы: " + checkBoxAnswer.join(", ")); */
    }
    /* console.log(bob); */
    fetch(
      "https://api.telegram.org/bot961070329:AAEth57wyTqQ6U2Lxi6EGRQ56qz2EeXywcA/sendMessage?chat_id=-468099402&parse_mode=html&text=" +
      JSON.stringify(bob, null, 9), {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(bob),
      }
    );
  };

  let btnSendRU = document.getElementById("validateBtnRU");
  btnSendRU.addEventListener("click", (e) => {
    e.preventDefault();
    formValidateRU();
  });

  /* Валидация квиза и отправка на телеграм-бот английский язык*/
  let formValidateEN = function () {
    let enPage = document.querySelector(".en-lang");
    let questionDiv = enPage.querySelectorAll(".quizEN");
    let syteName = document.querySelector('title').innerText

    let bob = new Object();
    for (let i = 0; i < questionDiv.length; i++) {
      let questText = questionDiv[i].querySelector(".question").innerText;
      let inputText = questionDiv[i].querySelectorAll(".quizTextInput");
      let li = questionDiv[i].querySelectorAll(".answer-options_checked");
      let inputAnswer = [];
      let checkBoxAnswer = [];

      for (let j = 0; j < inputText.length; j++) {
        inputAnswer.push(inputText[j].value);
      }

      for (let j = 0; j < li.length; j++) {
        let answer = li[j].innerText;
        checkBoxAnswer.push(answer);
      }
      bob["webSyte"] = syteName;
      if (questionDiv[i].classList.contains("quizModule2")) {
        if (inputAnswer.toString() !== "") {
          bob[questText] = inputAnswer.toString();
        } else {
          alert("Complete the survey")
          return
        }
      } else if (questionDiv[i].classList.contains("quizModule")) {
        if (checkBoxAnswer.join(", ") !== "") {
          bob[questText] = checkBoxAnswer.join(", ");
        } else {
          alert("Complete the survey")
          return
        }
      }

      /*         console.log(questText + " *** Ответы: " + checkBoxAnswer.join(", ")); */
    }
    /* console.log(bob); */
    fetch(
      "https://api.telegram.org/bot961070329:AAEth57wyTqQ6U2Lxi6EGRQ56qz2EeXywcA/sendMessage?chat_id=-468099402&parse_mode=html&text=" +
      JSON.stringify(bob, null, 9), {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(bob),
      }
    );
  };

  let btnSendEN = document.getElementById("validateBtnEN");
  btnSendEN.addEventListener("click", (e) => {
    e.preventDefault();
    formValidateEN();
  });


  /* инициализация маски*/
  var phoneMask = document.getElementsByClassName("phone-mask");
  for (let i = 0; i < phoneMask.length; i++) {
    var maskOptions = {
      mask: "+7(000)000-00-00",
      lazy: false,
    };
    var mask = new IMask(phoneMask[i], maskOptions);
  }
};