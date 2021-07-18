function Character(info) {


    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = '' +
        '<div class="character-face-con character-head">' +
        '<div class="character-face character-head-face face-front"></div>' +
        '<div class="character-face character-head-face face-back"></div>' +
        '</div>' +
        '<div class="character-face-con character-torso">' +
        '<div class="character-face character-torso-face face-front"></div>' +
        '<div class="character-face character-torso-face face-back"></div>' +
        '</div>' +
        '<div class="character-face-con character-arm character-arm-right">' +
        '<div class="character-face character-arm-face face-front"></div>' +
        '<div class="character-face character-arm-face face-back"></div>' +
        '</div>' +
        '<div class="character-face-con character-arm character-arm-left">' +
        '<div class="character-face character-arm-face face-front"></div>' +
        '<div class="character-face character-arm-face face-back"></div>' +
        '</div>' +
        '<div class="character-face-con character-leg character-leg-right">' +
        '<div class="character-face character-leg-face face-front"></div>' +
        '<div class="character-face character-leg-face face-back"></div>' +
        '</div>' +
        '<div class="character-face-con character-leg character-leg-left">' +
        '<div class="character-face character-leg-face face-front"></div>' +
        '<div class="character-face character-leg-face face-back"></div>' +
        '</div>';
    this.mainElem.style.left = info.xpos + '%';


    document.querySelector('.stage').appendChild(this.mainElem);

    //프로토타입 함수를 바로 실행해줌
    this.init();
    //scroll 중인지 아닌지 check 하는 변수
    this.scrollState = false;
    //바로 이전 스크롤 바 위치
    this.currentScroll = 0;
    this.speed = info.speed;
    this.position = info.xpos;
    this.direction;
    //좌우 이동 중인지 아닌지
    this.runningState = false;
    this.rqaId;
}

//복습이 필요한 부분
Character.prototype = {
    constructor: Character,
    init: function () {
        const self = this; //self=> Character 생성자
        window.addEventListener('scroll', function () {
            //여기서 this를 사용하면 생성자 Character 을 가리키는 것이 아니라 window를 가리킴

            clearTimeout(self.scrollState); //scroll 할때동안  setTimeout이 실행하지 못하게함 -> scroll이 끝났을 때 0.5초 뒤에 setTimeout이 실행
            if (!self.scrollState) {
                self.mainElem.classList.add('running');
                // console.log('running class 붙었음');
            }

            self.scrollState = setTimeout(function () {
                self.scrollState = false;
                self.mainElem.classList.remove('running');
                // console.log('running class 없앰 ㅋ');
            }, 500);

            //이런식으로 코드를 구성하였을 때 class add와 remove가 각각 한번씩만 실행됨 


            //scroll 위치 비교
            // self.currentScroll=window.pageYOffset;   이 위치에 변수 있으면 아무 의미 없음

            if (self.currentScroll > window.pageYOffset) { 
                // console.log('올리는 중');
                self.mainElem.setAttribute('data-direction', 'forward');
            }
            else { 
                // console.log('내리는 중');
                self.mainElem.setAttribute('data-direction', 'backward');
            }

            self.currentScroll = window.pageYOffset;  //변수 위치가 매우 중요  


        });

        window.addEventListener('keydown', function (e) {
            if (self.runningState) { return; }

            // console.log(e.keyCode);
            if (e.keyCode === 37) {
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');
                self.direction = 'left';
                self.run(self);
                // if(self.position>5){
                //     self.position=self.position-self.speed;
                //     self.mainElem.style.left=(self.position)+'%';
                // }
                self.runningState = true;

            }
            if (e.keyCode === 39) {
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');
                self.direction = 'right';
                self.run(self);
                // if(self.position<95){
                //     self.position=self.position+self.speed;
                //     self.mainElem.style.left=(self.position)+'%';
                // }
                self.runningState = true;
            }
        });

        window.addEventListener('keyup', function (e) {
            self.mainElem.classList.remove('running');
            cancelAnimationFrame(self.rqaId);
            self.runningState = false;
        });
    },
    run: function (self) {
        // const self=this;

        if (self.direction == 'left') {
            if (self.position > 5) {
                self.position -= self.speed;
            }

        }
        else if (self.direction == 'right') {
            if (self.position < 95) {
                self.position += self.speed;
            }

        }
        self.mainElem.style.left = self.position + '%';

        self.rqaId = requestAnimationFrame(function () {
            self.run(self);
        });
    }

}





































