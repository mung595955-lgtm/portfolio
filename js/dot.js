$(function () {

    /* =========================================
       전역 상태
    ========================================= */

    let motionPlayed = false;
    let isAnimating = false;
    let currentDotTimeline = null;



    /* =========================================
       INTRO 완료
    ========================================= */

    document.addEventListener("introComplete", function () {

        const tl = gsap.timeline();


        /* 1. Intro fade out */

        tl.to(".intro", {
            opacity: 0,
            duration: 0.3,

            onStart: () => {
                $(".intro *").off();
            },

            onComplete: () => {

                const introText =
                    document.querySelector(".intro_text");

                const progressBar =
                    document.querySelector(".progress-bar");


                if (introText) {
                    introText.style.display = "none";
                }

                if (progressBar) {
                    progressBar.style.display = "none";
                }


                $(".intro").remove();


                /* Background 확장 */

                const dotBg =
                    document.querySelector(".dot_bg");

                if (dotBg) {
                    dotBg.classList.add("expand");
                }
            }
        });


        /* =========================================
           2. Background
        ========================================= */

        tl.to(".dot_bg", {
            opacity: 1,

            duration: 1,

            ease: "power2.out"
        }, "<");


        /* =========================================
           3. 8개 점 회전
        ========================================= */

        tl.to(".dots_container", {

            opacity: 1,

            rotate: 360,

            duration: 2,

            ease: "power2.inOut"

        }, "<");


        /* =========================================
           4. 중앙 텍스트
        ========================================= */

        tl.to(".center_text", {

            opacity: 1,

            duration: 1,

            ease: "power1.out"

        }, "-=1.6");


        /* =========================================
           5. SIDE GNB
        ========================================= */

        tl.fromTo(".side_gnb",

            {
                y: 80,
                opacity: 0
            },

            {
                y: 0,
                opacity: 1,

                duration: 1,

                ease: "power2.out"
            },

            "-=1"
        );


    

        /* wheel 이벤트 등록 */

        setupScrollTrigger();

    });



    /* =========================================
       DOT SCROLL MOTION
    ========================================= */

    function setupScrollTrigger() {

        const dots =
            document.querySelectorAll(".dot_item");


        /* ==============================
           각 점 → 중앙까지 거리 계산
        ============================== */

        function calculateDotPosition() {

            dots.forEach(dot => {

                /*
                   reset 상태에서 좌표를 계산해야
                   이전 GSAP transform의 영향을 안 받음
                */

                const rect =
                    dot.getBoundingClientRect();

                const cx =
                    window.innerWidth / 2;

                const cy =
                    window.innerHeight / 2;


                const offsetX =
                    cx -
                    (rect.left + rect.width / 2);


                const offsetY =
                    cy -
                    (rect.top + rect.height / 2)
                    - 50;


                dot.dataset.x = offsetX;

                dot.dataset.y = offsetY;

            });

        }


        calculateDotPosition();


        /* 화면 크기 변경 대응 */

        $(window).on("resize.dot", function () {

            if (!motionPlayed && !isAnimating) {
                calculateDotPosition();
            }

        });



        /* =========================================
           첫 wheel
        ========================================= */

$(window)
    .off("wheel.first")
    .on("wheel.first", function (e) {

        const deltaY = e.originalEvent.deltaY;

        /* =============================
           위로 스크롤
           마지막 화면 → 첫 화면
        ============================= */

    if (deltaY < 0) {

    /* 마지막 모션까지 끝난 상태에서만 돌아가기 */
    if (!motionPlayed || isAnimating) {
        return;
    }

    isAnimating = true;

    /* 역재생 X
       바로 첫 화면 상태로 복구 */
    resetDotSection();

    return;
}



        /* =============================
           아래로 스크롤
           첫 화면 → 마지막 화면
        ============================= */

        if (deltaY <= 0) {
            return;
        }

        if (motionPlayed || isAnimating) {
            return;
        }

        isAnimating = true;



currentDotTimeline = gsap.timeline({

    onComplete: () => {

        motionPlayed = true;
        isAnimating = false;

        /* 스크롤 힌트 숨김 */
        document
            .querySelector(".scroll_hint")
            ?.classList.add("hide");


        /* 2번째 GNB 클릭 유도 시작 */
        document
            .querySelector(".side_gnb")
            ?.classList.add("motion-end");
    }

});

currentDotTimeline.timeScale(1.1);

        const tl2 = currentDotTimeline;



                /* =================================
                   중앙 텍스트 사라짐
                ================================= */

                tl2.to(".center_text", {

                    opacity: 0,

                    duration: 0.3,

                    ease: "power1.inOut"

                });



                /* =================================
                   8개 점 중앙으로
                ================================= */

                dots.forEach(dot => {

                    const x =
                        parseFloat(dot.dataset.x);

                    const y =
                        parseFloat(dot.dataset.y);


                    tl2.to(dot, {

                        x: x,
                        y: y,

                        duration: 1.2,

                        ease: "power2.inOut"

                    }, "<");

                });



                /* =================================
                   두 번째 텍스트
                ================================= */

                tl2.to(".next_text", {

                    opacity: 1,

                    duration: 1,

                    ease: "power1.out"

                }, "-=0.4");



                /* =================================
                   BIG DOT
                ================================= */

                tl2.fromTo(".big_dot",

                    {
                        y: 0,
                        scale: 0,
                        opacity: 0
                    },

                    {
                        y: -150,
                        scale: 1.8,
                        opacity: 1,

                        duration: 0.8,

                        ease: "back.out(1.7)"
                    },

                    "-=0.2"
                );



                /* =================================
                   SMALL DOT
                ================================= */

                tl2.fromTo(".small_dot",

                    {
                        y: 0,
                        scale: 0,
                        opacity: 0
                    },

                    {
                        y: -220,
                        scale: 1,
                        opacity: 1,

                        duration: 0.8,

                        ease: "back.out(1.7)"
                    },

                    "<"
                );


tl2.to({}, { duration: 0.6 });

/* =================================
   BIG DOT
   왼쪽 위로 퍼지며 흐려짐
================================= */

tl2.to(".big_dot", {
    x: "-=240",
    y: "-=75vh",
    opacity: 0,
    filter: "blur(30px)",
    scale: 1,
    duration: 1.1,
    ease: "power2.inOut"
}, "exit");


/* =================================
   SMALL DOT
   오른쪽 위로 퍼지며 흐려짐
================================= */

tl2.to(".small_dot", {
    x: "+=240",
    y: "-=80vh",
    opacity: 0,
    filter: "blur(30px)",
    scale: 0.9,
    duration: 1.05,
    ease: "power2.inOut"
}, "exit");


/* =================================
   TEXT + 가운데 점
   살짝 늦게 위로 흐르며 사라짐
================================= */

tl2.to(
    [
        ".next_text",
        ".dot_item:nth-child(5)"
    ],
    {
        y: "-=78vh",
        opacity: 0,
        filter: "blur(30px)",
        duration: 1,
        ease: "power2.inOut"
    },
    "exit+=0.08"
);


/* =================================
   나머지 점 숨김
================================= */

tl2.to(
    ".dot_item:not(:nth-child(5))",
    {
        opacity: 0,
        duration: 0,

        onComplete: () => {
            document
                .querySelectorAll(".dot_item")
                .forEach((el, i) => {

                    if (i !== 4) {
                        el.style.display = "none";
                    }

                });
        }
    },
    "exit"
);


/* =================================
   ABOUT ME
   처음부터 최종 왼쪽 위치
================================= */

tl2.set(".third_text", {
    top: 300,
    x: -500,
    y: 0
});

tl2.to(".third_text", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
});


/* =================================
   카드 점프용 점 준비
================================= */

tl2.set(".dot_item:nth-child(5)", {
    x: -500,
    y: -550,
    opacity: 1
});


                /* =================================
                   Jump Dot 생성
                ================================= */

                tl2.add(() => {

                    const originDot =
                        document.querySelector(
                            ".dot_item:nth-child(5)"
                        );


                    const jumpDot =
                        document.getElementById(
                            "dot_jump"
                        );


                    const rect =
                        originDot.getBoundingClientRect();


                    gsap.set(jumpDot, {

                        x:
                            rect.left +
                            rect.width / 2,

                        y:
                            rect.top +
                            rect.height / 2,

                        opacity: 1,

                        position: "fixed"

                    });


                    originDot.style.opacity = 0;

                });



                /* =================================
                   JUMP 1
                ================================= */

                tl2.to("#dot_jump", {

                    y: "-=120",

                    duration: 0.2,

                    ease: "power1.out"

                }, "jump1");


                tl2.to("#dot_jump", {

                    x: "+=300",

                    duration: 0.4,

                    ease: "power1.inOut"

                }, "jump1");


                tl2.to("#dot_jump", {

                    y: "+=120",

                    duration: 0.2,

                    ease: "power1.in"

                }, "jump1+=0.2");


                tl2.to(".group1", {

                    opacity: 1,

                    y: 0,

                    duration: 0.5,

                    ease: "power2.out"

                }, "jump1+=0.4");



                /* =================================
                   JUMP 2
                ================================= */

                tl2.to("#dot_jump", {

                    y: "-=120",

                    duration: 0.2,

                    ease: "power1.out"

                }, "jump2");


                tl2.to("#dot_jump", {

                    x: "+=450",

                    duration: 0.4,

                    ease: "power1.inOut"

                }, "jump2");


                tl2.to("#dot_jump", {

                    y: "+=120",

                    duration: 0.2,

                    ease: "power1.in"

                }, "jump2+=0.2");


                tl2.to(".group2", {

                    opacity: 1,

                    y: 0,

                    duration: 0.5,

                    ease: "power2.out"

                }, "jump2+=0.4");



                /* =================================
                   JUMP 3
                ================================= */

                tl2.to("#dot_jump", {

                    y: "-=120",

                    duration: 0.2,

                    ease: "power1.out"

                }, "jump3");


                tl2.to("#dot_jump", {

                    x: "+=370",

                    duration: 0.4,

                    ease: "power1.inOut"

                }, "jump3");


                tl2.to("#dot_jump", {

                    y: "+=120",

                    duration: 0.2,

                    ease: "power1.in"

                }, "jump3+=0.2");


                tl2.to(".group3", {

                    opacity: 1,

                    y: 0,

                    duration: 0.5,

                    ease: "power2.out"

                }, "jump3+=0.4");



                /* =================================
                   JUMP 4
                ================================= */

                tl2.to("#dot_jump", {

                    y: "-=120",

                    duration: 0.2,

                    ease: "power1.out"

                }, "jump4");


                tl2.to("#dot_jump", {

                    x: "+=500",

                    duration: 0.4,

                    ease: "power1.inOut"

                }, "jump4");


                tl2.to("#dot_jump", {

                    y: "+=120",

                    duration: 0.2,

                    ease: "power1.in"

                }, "jump4+=0.2");


                tl2.to("#dot_jump", {

                    x: "+=200",

                    y: "-=300",

                    opacity: 0,

                    duration: 0.4,

                    ease: "power2.in"

                }, "jump4+=0.5");

            });

    }



    function resetDotSection() {

    /* =========================================
       1. 진행 중 Timeline 완전히 제거
    ========================================= */

    if (currentDotTimeline) {
        currentDotTimeline.kill();
        currentDotTimeline = null;
    }

    motionPlayed = false;
    isAnimating = false;

    document.body.style.overflow = "auto";


    /* =========================================
       2. 스크롤 힌트 다시 표시
    ========================================= */

    document
        .querySelector(".scroll_hint")
        ?.classList.remove("hide");


    /* =========================================
       3. GNB 클릭 유도 종료
    ========================================= */

    document
        .querySelector(".side_gnb")
        ?.classList.remove("motion-end");


    /* =========================================
       4. 모든 기존 GSAP 애니메이션 제거
    ========================================= */

    gsap.killTweensOf([
        ".center_text",
        ".dots_container",
        ".dot_item",
        ".next_text",
        ".big_dot",
        ".small_dot",
        ".third_text",
        "#dot_jump",
        ".info_group"
    ]);


    /* =========================================
       5. 8개 기본 점 완전 초기화
    ========================================= */

    document
        .querySelectorAll(".dot_item")
        .forEach(dot => {

            /* JS에서 직접 넣은 스타일 제거 */
            dot.style.removeProperty("opacity");
            dot.style.removeProperty("filter");
            dot.style.display = "block";

            gsap.set(dot, {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)"
            });

        });


    /* =========================================
       6. 점 컨테이너 초기화
    ========================================= */

    gsap.set(".dots_container", {
        opacity: 1,
        scale: 1
    });


    /* =========================================
       7. 첫 화면 중앙 텍스트 초기화
    ========================================= */

    gsap.set(".center_text", {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)"
    });


    /* =========================================
       8. 두 번째 텍스트 완전 초기화
    ========================================= */

    gsap.set(".next_text", {
        clearProps: "transform"
    });

    gsap.set(".next_text", {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 0,
        filter: "blur(0px)"
    });


    /* =========================================
       9. BIG DOT 완전 초기화
    ========================================= */

    gsap.set(".big_dot", {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        filter: "blur(0px)"
    });


    /* =========================================
       10. SMALL DOT 완전 초기화
    ========================================= */

    gsap.set(".small_dot", {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        filter: "blur(0px)"
    });


    /* =========================================
       11. ABOUT ME 초기화
    ========================================= */

    gsap.set(".third_text", {
        x: 0,
        y: 0,
        top: 1000,
        opacity: 0,
        filter: "blur(0px)"
    });


    /* =========================================
       12. Jump Dot 초기화
    ========================================= */

    const jumpDot =
        document.getElementById("dot_jump");

    if (jumpDot) {

        jumpDot.style.removeProperty("opacity");
        jumpDot.style.removeProperty("filter");

        gsap.set(jumpDot, {
            x: 0,
            y: 0,
            opacity: 0,
            filter: "blur(0px)"
        });
    }


    /* =========================================
       13. 카드 초기화
    ========================================= */

    gsap.set(".info_group", {
        opacity: 0,
        y: 40,
        filter: "blur(0px)"
    });


    /* =========================================
       14. Background 유지
    ========================================= */

    const bg =
        document.querySelector(".dot_bg");

    if (bg) {
        bg.classList.add("expand");
    }


    /* =========================================
       15. 점 위치 다시 계산
       현재 깨끗한 초기 상태 기준
    ========================================= */

/* =========================================
   첫 화면 완전 복구
========================================= */

/* 컨테이너에 남아있는 transform 자체 제거 */
gsap.set(".dots_container", {
    clearProps: "transform"
});

gsap.set(".dots_container", {
    opacity: 1,
    scale: 1,
    rotation: 0,
    transformOrigin: "50% 50%"
});


/* 각 점도 transform 완전히 제거 */
document
    .querySelectorAll(".dot_item")
    .forEach(dot => {

        gsap.set(dot, {
            clearProps: "transform"
        });

        gsap.set(dot, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)"
        });

    });


/* 초기 위치가 복구된 다음 좌표 다시 계산 */
requestAnimationFrame(() => {

    calculateDotPosition();

    /* 처음 진입했을 때와 동일하게 한 바퀴 */
    gsap.fromTo(
        ".dots_container",
        {
            rotation: 0
        },
        {
            rotation: 360,
            duration: 2,
            ease: "power2.inOut",
            overwrite: true
        }
    );

});


/* Dot, My beginning */
gsap.fromTo(
    ".center_text",
    {
        opacity: 0,
        y: 15
    },
    {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "power2.out",
        overwrite: true
    }
);
}



    /* =========================================
       BACKGROUND GNB CLICK
    ========================================= */

    $(".section_dot_btn").on(
        "click",
        function (e) {

            e.preventDefault();

            resetDotSection();

        }
    );


    /* =====================================================
   GOOEY CURSOR
===================================================== */

const gooeyCursor =
  document.querySelector(
    ".gooey-cursor"
  );

const cursorDots =
  document.querySelectorAll(
    ".cursor-dot"
  );


if (
  gooeyCursor &&
  cursorDots.length
) {

  let mouseX =
    window.innerWidth / 2;

  let mouseY =
    window.innerHeight / 2;


  const positions =
    Array.from(
      cursorDots,
      () => ({
        x: mouseX,
        y: mouseY
      })
    );


  /* =========================
     실제 마우스 위치
  ========================= */

  window.addEventListener(
    "mousemove",
    e => {

      mouseX = e.clientX;
      mouseY = e.clientY;

    }
  );


  /* =========================
     움직임
  ========================= */

  function animateGooeyCursor() {

    /* 메인 점 */

    positions[0].x +=
      (
        mouseX -
        positions[0].x
      ) * 0.5;

    positions[0].y +=
      (
        mouseY -
        positions[0].y
      ) * 0.5;


    /* 꼬리 점 */

    for (
      let i = 1;
      i < positions.length;
      i++
    ) {

      const followSpeed =
        0.11 - i * 0.008;


      positions[i].x +=
        (
          positions[i - 1].x -
          positions[i].x
        ) * followSpeed;


      positions[i].y +=
        (
          positions[i - 1].y -
          positions[i].y
        ) * followSpeed;

    }


    /* 화면에 적용 */

    cursorDots.forEach(
      (dot, index) => {

        dot.style.left =
          positions[index].x + "px";

        dot.style.top =
          positions[index].y + "px";

      }
    );


    requestAnimationFrame(
      animateGooeyCursor
    );

  }


  animateGooeyCursor();


  /* =========================
     링크 / 버튼 Hover
  ========================= */

  document
    .querySelectorAll(
      "a, button, [role='button']"
    )
    .forEach(item => {

      item.addEventListener(
        "mouseenter",
        () => {

          gooeyCursor
            .classList
            .add(
              "cursor-hover"
            );

        }
      );


      item.addEventListener(
        "mouseleave",
        () => {

          gooeyCursor
            .classList
            .remove(
              "cursor-hover"
            );

        }
      );

    });


  /* =========================
     Click
  ========================= */

  window.addEventListener(
    "mousedown",
    () => {

      gooeyCursor
        .classList
        .add(
          "cursor-click"
        );

    }
  );


  window.addEventListener(
    "mouseup",
    () => {

      gooeyCursor
        .classList
        .remove(
          "cursor-click"
        );

    }
  );

}

});