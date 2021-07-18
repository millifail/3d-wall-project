(function () {

    const houseElem = document.querySelector('.house');
    const stageElem = document.querySelector('.stage');
    const barElem = document.querySelector('.progress-bar');
    const selectCharacterElem = document.querySelector('.select-character');
    let currentScroll = window.pageYOffset;

    const mousepos = {
        x: 0,
        y: 0,
    };
    let maxScrollValue;

    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }



    window.addEventListener('scroll', function (e) {


        // console.log(window.pageYOffset);
        // console.log(window.pageYOffset/maxScrollValue);
        let scrollPer = window.pageYOffset / maxScrollValue
        console.log(scrollPer);
        let zMove = scrollPer * 1000;
        houseElem.style.transform = 'translateZ(' + (zMove - 490) + 'vw)';

        //progress bar
        barElem.style.width = 100 * scrollPer + '%';


    })

    window.addEventListener('resize', resizeHandler);

    window.addEventListener('mousemove', function (e) {
        //mouse 포인터에 따라 비율로 나타낸 것 중앙이 원점  양옆으로 -1, 1    -> 이것도 많이 쓰는 테크닉
        mousepos.x = (e.clientX / window.innerWidth * 2) - 1;
        mousepos.y = (-e.clientY / window.innerHeight * 2) + 1;

        stageElem.style.transform = 'rotateX(' + (mousepos.y * 5) + 'deg) rotateY(' + (mousepos.x * 5) + 'deg)';
    })

    stageElem.addEventListener('click', function (e) {
        new Character({
            xpos: e.clientX / window.innerWidth * 100,
            speed: Math.random(),
        })
    });

    selectCharacterElem.addEventListener('click', function (e) {
        const charValue = e.target.getAttribute('data-char');
        document.body.setAttribute('data-char', charValue);
    });

    resizeHandler();




})();