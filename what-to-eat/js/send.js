const sendInput = document.getElementById('send-textarea');
const chatContainer = document.querySelector('.chat-container');
const sendBtn = document.getElementById('send-btn');

function autoScroll() {
  if (chatContainer.clientHeight < chatContainer.scrollHeight) {
    chatContainer.scrollTop =
      chatContainer.scrollHeight + chatContainer.clientHeight;
  }
}

// 스위치 역할
let choiceCategory = null;
let categorychecked = null;
let reset = null;
let menucheck = null;
let resultcheck = null;
let selectC = null;

//마지막 입력 메세지
let answer = null;

// 카운트 역할
let ricechatInfoCount = 0;
let breadchatInfoCount = 0;
let noodlechatInfoCount = 0;
let meatchatInfoCount = 0;

// 음식을 담을 변수
let resultMenu = null;

const chatInfo = {
  ricechatInfo: [
    '밥을 골랐구나!',
    '밥은 언제 먹어도 질리지 않지!',
    '밥 메뉴 추천 해줄까? 응, 아니로 대답해봐.',
  ],

  breadchatInfo: [
    '빵을 골랐구나!',
    '킁킁...',
    '어디선가 빵냄새가 나면 어쩐지 되게 배고파지더라!',
    '빵 메뉴 추천 해줄까? 응, 아니로 대답해봐.',
  ],

  noodlechatInfo: [
    '면을 골랐구나!',
    '쫄깃한 면발...',
    '꼬륵... 상상만 해도 군침 돈다!',
    '면 메뉴 추천 해줄까? 응, 아니로 대답해봐.',
  ],

  meatchatInfo: [
    '고기를 골랐구나!',
    '혹시 소주라도 땡긴 거야?ㅋㅋㅋ',
    '고기 메뉴 추천 해줄까? 응, 아니로 대답해봐.',
  ],

  errorchatInfo: ['아직 모르는 말이야!'],

  greetInfo: [
    '오늘 뭐 먹을지 고민 돼?',
    '내가 도와줄게!',
    '밥, 빵, 면, 고기 중에 끌리는 거 있어?',
    '채팅으로 입력해봐!',
  ],

  riceFood: ['볶음밥', '국밥', '비빔밥', '덮밥', '죽', '알밥', '치즈밥'],
  breadFood: ['프레첼', '베이글', '바게트', '고로케', '도넛', '크로와상'],
  noodleFood: ['짜장면', '짬뽕', '냉면', '국수', '라면', '우동', '메밀국수'],
  meatFood: ['치킨', '삼겹살', '족발', '닭갈비', '소고기', '돈가스'],
};

// 엔터키핸들러
function enterHandler(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    sendMyMessageHandler();
  }
}

// 랜덤 음식 호출 함수
function randomItem(a) {
  return a[Math.floor(Math.random() * a.length)];
}

//내 메세지 화면에 보내기 함수
function sendMyMessageHandler() {
  const myNewBubble = document.createElement('span');
  if (sendInput.value) {
    myNewBubble.innerText = sendInput.value;
    myNewBubble.classList.add('bubble', 'my-bubble');
    chatContainer.appendChild(myNewBubble);
    sendTransition(myNewBubble);
    answer = sendInput.value;
    sendInput.value = '';
    autoScroll();
  }

  if (categorychecked === true) {
    categorycheckHandelr();
  }

  function categorycheckHandelr() {
    if (answer === '밥') {
      botchatIntervalHandler(chatInfo.ricechatInfo, ricechatInfoCount);
      choiceCategory = 'rice';
    } else if (answer === '빵') {
      botchatIntervalHandler(chatInfo.breadchatInfo, breadchatInfoCount);
      choiceCategory = 'bread';
    } else if (answer === '면') {
      botchatIntervalHandler(chatInfo.noodlechatInfo, noodlechatInfoCount);
      choiceCategory = 'noodle';
    } else if (answer === '고기') {
      botchatIntervalHandler(chatInfo.meatchatInfo, meatchatInfoCount);
      choiceCategory = 'meat';
    } else if (categorychecked === true) {
      categorychecked = 'error';
      botchatIntervalHandler(chatInfo.errorchatInfo, 0);
    }
  }

  // 입력한 카테고리 음식을 물어보는 함수
  function resultchatHandler(selectCategory) {
    selectC = selectCategory;
    let resultInfoCount = 0;
    resultMenu = randomItem(selectCategory);
    const resultInfo = ['어디보자...음...', `${resultMenu}! 좋아? 싫어?`];
    botchatIntervalHandler(resultInfo, resultInfoCount);
    menucheck = 'result';
    // if (answer === '좋아') {
    // } else if (answer === '싫어') {
    //   resultMenu = null;
    //   restart();
    // }
  }

  if (menucheck === 'result') {
    goodByeInfoCount = 0;
    const goodByeInfo = [
      `그래! 오늘 메뉴는 ${resultMenu}로 결정! 땅땅!`,
      `나도 갑자기 ${resultMenu}가 먹고 싶어지네...꿀꺽`,
      '아무리 바쁘구 피곤해도 끼니 거르지 말구 잘 챙겨 먹어',
      '😇',
      `만약 메뉴추천을 다시 받고 싶다면 '다시' 라고 입력해봐!`,
    ];

    if (answer === '좋아') {
      botchatIntervalHandler(goodByeInfo, goodByeInfoCount);
      menucheck = 'reset';
    } else if (answer === '싫어') {
      goodByeInfoCount = goodByeInfoCount + 1;
      resultchatHandler(selectC);
    }
  }

  if (menucheck == 'reset') {
    if (answer === '다시') {
      restart();
    }
  }

  if (categorychecked === 'checked' && answer === '응') {
    if (choiceCategory === 'rice') {
      resultchatHandler(chatInfo.riceFood);
    } else if (choiceCategory === 'bread') {
      resultchatHandler(chatInfo.breadFood);
    } else if (choiceCategory === 'noodle') {
      resultchatHandler(chatInfo.noodleFood);
    } else if (choiceCategory === 'meat') {
      resultchatHandler(chatInfo.meatFood);
    }
    menucheck = 'result';
  } else if (categorychecked === 'checked' && answer === '아니') {
    restart();
  }
}

// 다시 시작하는 함수
function restart() {
  selectC = null;
  menucheck = null;
  reset = true;
  let resetInfoCount = 0;
  greetchatCount = 0;
  const resetInfo = ['그럼...다시 처음으로 돌아가서!'];
  botchatIntervalHandler(resetInfo, resetInfoCount);
}

// bubble에 트랜지션 넣어주는 함수
function sendTransition(target) {
  setTimeout(() => {
    target.classList.add('send-bubble');
  }, 1);
}

// 챗
let greetchatCount = 0;
let choice;

//봇메세지전송
function sendBotMessage(inner, count) {
  const botNewBubble = document.createElement('span');

  if (count < inner.length) {
    botNewBubble.innerText = inner[count];
    botNewBubble.classList.add('bubble', 'bot-bubble');
    chatContainer.appendChild(botNewBubble);
    sendTransition(botNewBubble);
  } else if (!count) {
    botNewBubble.innerText = inner;
    botNewBubble.classList.add('bubble', 'bot-bubble');
    chatContainer.appendChild(botNewBubble);
    sendTransition(botNewBubble);
  }

  autoScroll();
}

//setinterval 인사함수
function greetchat() {
  const botchatInterval = setInterval(() => {
    if (greetchatCount > chatInfo.greetInfo.length - 1) {
      clearInterval(botchatInterval);
      categorychecked = true;
      return;
    }
    sendBotMessage(chatInfo.greetInfo, greetchatCount);
    greetchatCount = greetchatCount + 1;
  }, 1000);
}
greetchat();

//setinterval 채팅함수
function botchatIntervalHandler(Info, infoCount) {
  const botchatInterval = setInterval(() => {
    if (infoCount > Info.length - 1) {
      clearInterval(botchatInterval);

      if (categorychecked != 'checked' && categorychecked != 'error') {
        categorychecked = 'checked';
      } else if (categorychecked === 'error') {
        categorychecked = true;
      }

      if (reset === true) {
        greetchat();
        reset = null;
      }
    }
    sendBotMessage(Info, infoCount);
    infoCount = infoCount + 1;
  }, 1000);
}

//엔터키 누를 시 이벤트
document.addEventListener('keypress', enterHandler);
//전송버튼 누를 시 이벤트
sendBtn.addEventListener('click', sendMyMessageHandler);
