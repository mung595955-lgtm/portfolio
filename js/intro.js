$(function () {

    gsap.registerPlugin(MotionPathPlugin);


    /* =========================================
       다른 페이지 GNB에서 Background로 들어온 경우
       intro.html#background
    ========================================= */

    const isBackgroundEntry =
        window.location.hash === "#background";


    if (isBackgroundEntry) {

        // 인트로 화면 바로 숨기기
        $(".intro").hide();

        // 스크롤 맨 위
        $("html, body").scrollTop(0);

        /*
           dot.js가 introComplete 이벤트를
           먼저 등록할 시간을 준 뒤 실행
        */
        setTimeout(() => {
            document.dispatchEvent(
                new Event("introComplete")
            );
        }, 50);

        // ★ 중요
        // 아래 인트로 애니메이션은 실행하지 않음
        return;
    }



    /* =========================================
       여기부터 기존 INTRO 코드
    ========================================= */

    $(window).on("load", function () {
        $("html, body").scrollTop(0);
    });


    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }


    const bar =
        document.getElementById("bar");

    const ball =
        document.getElementById("intro_dot");

    const intro =
        document.querySelector(".intro");


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


    /* progress bar 생성 */

    for (let i = 0; i < 17; i++) {

        const span =
            document.createElement("span");

        bar.appendChild(span);

    }


    const texts =
        document.querySelectorAll(
            ".intro_text span"
        );


    const spans =
        document.querySelectorAll(
            ".progress-bar span"
        );


    let bounceCount = 0;
    let textIndex = 0;
    let barIndex = 0;



    /* =========================================
       DOT BOUNCE
    ========================================= */

    function playBounce() {

        bounceCount++;


        ball.classList.remove(
            "bounce-default",
            "bounce-final"
        );


        void ball.offsetWidth;


        if (bounceCount < 5) {

            ball.classList.add(
                "bounce-default"
            );

            setTimeout(
                playBounce,
                1300
            );

        } else {

            ball.classList.add(
                "bounce-final"
            );

        }

    }


    playBounce();



    /* =========================================
       INTRO TEXT
    ========================================= */

    const textInterval =
        setInterval(() => {

            texts.forEach(el =>
                el.classList.remove("active")
            );


            if (texts[textIndex]) {

                texts[textIndex]
                    .classList.add("active");

                textIndex++;

            } else {

                clearInterval(
                    textInterval
                );

            }

        }, 1300);



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

                clearInterval(
                    barInterval
                );

                clearInterval(
                    textInterval
                );


                /* =================================
                   INTRO 종료
                ================================= */

                setTimeout(() => {

                    document
                        .querySelector(".progress-bar")
                        .style.display = "none";


                    document
                        .querySelector(".intro_text")
                        .style.display = "none";


                    /*
                       dot.js에게
                       인트로가 끝났다고 전달
                    */

                    document.dispatchEvent(
                        new Event(
                            "introComplete"
                        )
                    );

                }, 1300);

            }

        }, 300);

});