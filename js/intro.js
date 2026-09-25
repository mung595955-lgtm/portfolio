$(function () {

    gsap.registerPlugin(MotionPathPlugin);


    /* =========================================
       다른 페이지 GNB에서 Background로 들어온 경우
    ========================================= */

    const isBackgroundEntry =
        window.location.hash === "#background";


    if (isBackgroundEntry) {

        // 인트로 바로 숨기기
        $(".intro").hide();

        // 스크롤 맨 위
        $("html, body").scrollTop(0);

        // dot.js가 이벤트를 등록한 뒤 실행
        setTimeout(() => {

            document.dispatchEvent(
                new Event("introComplete")
            );

        }, 50);

        return;
    }



    /* =========================================
       SCROLL RESET
    ========================================= */

    $(window).on("load", function () {
        $("html, body").scrollTop(0);
    });


    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }



    /* =========================================
       ELEMENT
    ========================================= */

    const bar =
        document.getElementById("bar");

    const ball =
        document.getElementById("intro_dot");

    const texts =
        document.querySelectorAll(
            ".intro_text span"
        );



    /* =========================================
       PROGRESS BAR 생성
    ========================================= */

    const colors = [
        "#7973F3",
        "#7973F3",
        "#7973F3",
        "#7973F3",
        "#7973F3",
        "#7973F3",

        "var(--main-color)",
        "var(--main-color)",
        "var(--main-color)",
        "var(--main-color)",

        "#99D0EF",
        "#99D0EF",
        "#99D0EF",
        "#99D0EF",

        "#C2E4F6",
        "#C2E4F6",
        "#C2E4F6"
    ];


    for (let i = 0; i < 17; i++) {

        const span =
            document.createElement("span");

        bar.appendChild(span);

    }


    const spans =
        document.querySelectorAll(
            ".progress-bar span"
        );



    /* =========================================
       INTRO 설정
    ========================================= */

    // 점 한 번 점프하는 시간
    const BOUNCE_TIME = 1000;

    // 점이 최고점까지 올라가는 시간
    const HALF_TIME = BOUNCE_TIME / 2;

    /*
       총 진행 시간

       1번째 점프 = 1초
       2번째 점프 = 1초
       마지막 점프 최고점 = 0.5초

       총 약 2.5초
    */
const TOTAL_TIME =
    BOUNCE_TIME * 3;

    // 17칸이 전체 시간 동안 채워짐
    const BAR_TIME =
        TOTAL_TIME / spans.length;


    let currentText = 0;
    let barIndex = 0;



    /* =========================================
       TEXT 변경
    ========================================= */

    function changeText(index) {

        texts.forEach((text) => {
            text.classList.remove("active");
        });


        if (texts[index]) {

            texts[index]
                .classList.add("active");

        }

    }



    /* =========================================
       PROGRESS BAR
    ========================================= */

    const barInterval =
        setInterval(() => {

            if (spans[barIndex]) {

                spans[barIndex].style.background =
                    colors[barIndex];

                barIndex++;

            } else {

                clearInterval(barInterval);

            }

        }, BAR_TIME);



    /* =========================================
       INTRO 종료
    ========================================= */

    function finishIntro() {

        clearInterval(barInterval);


        // 남은 바가 있다면 전부 채우기
        spans.forEach((span, index) => {

            span.style.background =
                colors[index];

        });


        document
            .querySelector(".progress-bar")
            .style.display = "none";


        document
            .querySelector(".intro_text")
            .style.display = "none";


        // dot.js 시작
        document.dispatchEvent(
            new Event("introComplete")
        );

    }



    /* =========================================
       DOT BOUNCE
    ========================================= */

    function bounce(index) {

        ball.classList.remove(
            "bounce-default",
            "bounce-final"
        );


        // animation 재실행
        void ball.offsetWidth;



        /* -------------------------------------
           마지막 점프
        ------------------------------------- */

if (index === 2) {

    ball.classList.add(
        "bounce-final"
    );

    /* 점이 가운데로 완전히 돌아온 뒤 */
    setTimeout(() => {

        /* HEE JUNG 스르륵 사라짐 */
        gsap.to(".intro_text", {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",

            onComplete: () => {

                /* 텍스트가 사라진 상태로 잠깐 멈춤 */
                setTimeout(() => {

                    finishIntro();

                }, 450);

            }
        });

    }, BOUNCE_TIME);

    return;
}



        /* -------------------------------------
           일반 점프
        ------------------------------------- */

        ball.classList.add(
            "bounce-default"
        );


        /*
           점이 올라갔다가
           완전히 내려오면 텍스트 변경
        */

        setTimeout(() => {

            currentText++;

            changeText(currentText);


            // 다음 점프
            bounce(index + 1);

        }, BOUNCE_TIME);

    }



    /* =========================================
       INTRO START
    ========================================= */

    // 처음은 HELLO
    changeText(0);

    // 첫 점프 시작
    bounce(0);

});