$(function () {

  /* GNB를 최상위 body 레이어로 이동 */
  const sideGnb = document.querySelector(".side_gnb");

  if (sideGnb && sideGnb.parentElement !== document.body) {
    document.body.appendChild(sideGnb);
  }

  gsap.registerPlugin(
    ScrollTrigger,
    TextPlugin,
    ScrollToPlugin
  );

let wheelLocked = true;
let currentStep = 0;

function showScrollHint() {
  const scrollHint =
    document.querySelector(".scroll-hint");

  if (!scrollHint) return;

  /* 마지막 Tool/Skill 화면에서는 표시 X */
  if (currentStep === 4) return;

  scrollHint.classList.add("show");
}


function hideScrollHint() {
  const scrollHint =
    document.querySelector(".scroll-hint");

  if (!scrollHint) return;

  scrollHint.classList.remove("show");
}


  /* =====================================================
     초기 상태
  ===================================================== */

  gsap.set(".dot.left", {
    x: 0,
    y: 0
  });

  gsap.set(".dot.right", {
    x: 0
  });

  gsap.set(".line_center", {
    scaleX: 0,
    opacity: 0
  });

  gsap.set(".text-up", {
    opacity: 0,
    y: 70
  });

  gsap.set(".text-down", {
    opacity: 0,
    y: -70
  });

  gsap.set(".circle-mask", {
    opacity: 0,
    maskImage:
      "conic-gradient(white 0deg, transparent 0deg)",
    webkitMaskImage:
      "conic-gradient(white 0deg, transparent 0deg)"
  });

  gsap.set(".circle-svg circle", {
    strokeDashoffset: 565
  });

  gsap.set(".dot-container", {
    rotation: 0,
    transformOrigin: "50% 50%"
  });

  gsap.set(".dot-rotate-wrapper", {
    opacity: 0
  });

  gsap.set(".history", {
    opacity: 0
  });

  gsap.set(".history svg", {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    scale: 0.9,
    transformOrigin: "50% 50%"
  });

  gsap.set([
    ".new-svg",
    ".ex"
  ], {
    opacity: 0
  });

  gsap.set([
    ".new-svg-2",
    ".ex2"
  ], {
    opacity: 0
  });


  /* =====================================================
     1. 첫 번째 화면
     Line, Experience
  ===================================================== */

  function playFirstMotion() {

    gsap.set(".dot.left", {
      x: 0,
      y: 0,
      opacity: 1
    });

    gsap.set(".dot.right", {
      x: 0,
      opacity: 1
    });

    gsap.set(".line_center", {
      scaleX: 0,
      opacity: 0
    });

    gsap.set(".text-up", {
      opacity: 0,
      y: 70,
      display: "block"
    });

    gsap.set(".text-down", {
      opacity: 0,
      y: -70,
      display: "block"
    });

    gsap.set(".circle-mask", {
      opacity: 0,
      maskImage:
        "conic-gradient(white 0deg, transparent 0deg)",
      webkitMaskImage:
        "conic-gradient(white 0deg, transparent 0deg)"
    });

    gsap.set(".dot-container", {
      rotation: 0
    });


    const tl = gsap.timeline({

      onComplete: () => {

        wheelLocked = false;
        

        ScrollTrigger.refresh();

      }

    });


    tl.to(
      ".dot.left",
      {
        x: -350,
        duration: 0.7
      },
      0
    );


    tl.to(
      ".dot.right",
      {
        x: 350,
        duration: 0.7
      },
      0
    );


    tl.to(
      ".line_center",
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.7
      },
      0.01
    );


    tl.to(
      ".text-up",
      {
        opacity: 1,
        y: -30,
        duration: 1
      },
      0.7
    );


    tl.to(
      ".text-down",
      {
        opacity: 1,
        y: 20,
        duration: 1
      },
      0.9
    );


    tl.to(
      ".circle-mask",
      {
        opacity: 1,
        duration: 0.1
      },
      1.4
    );


    tl.to(
      ".dot-container",
      {

        rotation: 360,

        duration: 1,

        ease: "power2.inOut",

        onUpdate: () => {

          const rotation =
            gsap.getProperty(
              ".dot-container",
              "rotation"
            );


          const mask =
            `conic-gradient(
              white ${rotation}deg,
              transparent ${rotation}deg
            )`;


          const circleMask =
            document.querySelector(
              ".circle-mask"
            );


          if (circleMask) {

            circleMask.style.maskImage =
              mask;

            circleMask.style.webkitMaskImage =
              mask;

          }

        }

      },
      1.5
    );


    tl.to(
      ".circle-svg circle",
      {
        strokeDashoffset: 0,
        duration: 1.5
      },
      1.5
    );


    tl.to(
      ".dot.left",
      {
        x: 0,
        duration: 0.8
      },
      2.6
    );


    tl.to(
      ".dot.right",
      {
        x: 0,
        duration: 0.8
      },
      2.6
    );


    tl.to(
      ".line_center",
      {
        scaleX: 0,
        opacity: 0,
        duration: 0.8
      },
      2.6
    );


    tl.set(
      [
        ".text-up",
        ".text-down"
      ],
      {
        opacity: 0,
        display: "none"
      }
    );


    tl.set(
      ".dot-container",
      {
        rotation: 0
      }
    );


    tl.set(
      ".circle-mask",
      {
        maskImage:
          "conic-gradient(white 0deg, transparent 0deg)",

        webkitMaskImage:
          "conic-gradient(white 0deg, transparent 0deg)"
      }
    );

  }

  gsap.killTweensOf([
  ".dot.left",
  ".dot.right",
  ".line_center",
  ".text-up",
  ".text-down",
  ".dot-container",
  ".circle-svg circle"
]);


/* 첫 번째 원 stroke도 완전 초기화 */

const firstCircle =
  document.querySelector(
    ".circle-svg circle"
  );

if (firstCircle) {

  const firstLength =
    firstCircle.getTotalLength();

  gsap.set(firstCircle, {
    strokeDasharray:
      `${firstLength} ${firstLength}`,

    strokeDashoffset:
      firstLength
  });

}

  playFirstMotion();


  /* =====================================================
     2. 두 번째 화면
  ===================================================== */


function runSecondMotion() {

  wheelLocked = true;


  /* =============================
     진행 중 애니메이션 정리
  ============================= */

  gsap.killTweensOf([
    ".dot-rotate-wrapper",
    ".spin-dot",
    ".circle-fill-image",
    ".history",
    ".history svg",
    ".new-svg",
    ".ex",
    ".new-svg-2",
    ".ex2"
  ]);


  /* =============================
     다른 화면 숨기기
  ============================= */

  gsap.set([
    ".history",
    ".new-svg",
    ".ex",
    ".new-svg-2",
    ".ex2"
  ], {
    opacity: 0
  });


  gsap.set([
    ".dot.right",
    ".line_center",
    ".dot.left",
    ".text-up",
    ".text-down"
  ], {
    opacity: 0
  });


  /* =============================
     원 wrapper 초기화
  ============================= */

  gsap.set(".dot-rotate-wrapper", {
    opacity: 1,
    x: 0,
    y: 0,
    rotation: 0
  });


  /* =============================
     이미지 초기화
  ============================= */

  gsap.set(".circle-fill-image", {
    opacity: 0
  });
  /* 네트워크 + 텍스트 처음에는 숨김 */
gsap.set(".network-svg", {
  opacity: 0,
  y: 20
});

gsap.set(".text", {
  opacity: 0,
  y: 20
});


  /* =============================
     기타 요소 초기화
  ============================= */

/* =============================
   두 번째 화면 곡선 SVG 초기화
============================= */

const secondLinePath =
  document.querySelector(".second-line-path");

if (secondLinePath) {

  const secondLineLength =
    secondLinePath.getTotalLength();

  gsap.set(secondLinePath, {
    strokeDasharray:
      `${secondLineLength} ${secondLineLength}`,

    strokeDashoffset:
      secondLineLength,

    opacity: 1
  });

  /* =========================================
   점 → 선 → 면 NETWORK MOTION
========================================= */

const networkDots =
    gsap.utils.toArray("#network-dots circle");

const networkLines =
    gsap.utils.toArray("#network-lines line");

const allNetworkFaces =
    gsap.utils.toArray("#network-faces polygon");

/* 등장시킬 면만 */
const networkFaces = [
    allNetworkFaces[0],   // 위
    allNetworkFaces[2],

    allNetworkFaces[5],   // 왼쪽
    allNetworkFaces[7],

    allNetworkFaces[9],   // 중앙
    allNetworkFaces[11],

    allNetworkFaces[13],  // 오른쪽
    allNetworkFaces[15],

    allNetworkFaces[17],  // 아래
    allNetworkFaces[19]
].filter(Boolean);

/* 처음에는 8개 전부 숨긴다 */
gsap.set(allNetworkFaces, {
    opacity: 0,
    scale: 0.92
});

    


if (
    networkDots.length &&
    networkLines.length &&
    networkFaces.length
) {

    /* 이전 반복 모션 있으면 제거 */
    if (window.networkMotionTl) {
        window.networkMotionTl.kill();
    }


    /* =====================================
       초기화
    ===================================== */

    gsap.set(networkDots, {
        opacity: 1,
        scale: 1
    });


    networkLines.forEach((line) => {

        const length = line.getTotalLength();

        gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0
        });

    });


    gsap.set(networkFaces, {
        opacity: 0,
        scale: 0.92
    });


    /* =====================================
       반복 Timeline
    ===================================== */

  const networkTl = gsap.timeline({
    repeat: -1,
    paused: true
});

    window.networkMotionTl = networkTl;


    /* -------------------------------------
       1. 점만 있는 상태
    ------------------------------------- */

    networkTl.set(networkDots, {
        opacity: 1,
        scale: 1
    });

    networkTl.to({}, {
        duration: 0.3
    });


    /* -------------------------------------
       2. 선이 점과 점 사이를 연결
    ------------------------------------- */

    networkTl.to(
        networkLines,
        {
            strokeDashoffset: 0,
            opacity: 1,

            duration: 0.7,

            stagger: {
                each: 0.025,
                from: "random"
            },

            ease: "power2.inOut"
        }
    );


    /* 선 완성 상태 */
    networkTl.to({}, {
        duration: 0.5
    });


    /* -------------------------------------
       3. 면 몇 개 채워짐
    ------------------------------------- */

networkTl.to(networkFaces, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power2.out"
});


    /* 완성 상태 */
    networkTl.to({}, {
        duration: 0.5
    });


    /* -------------------------------------
       4. 면 사라짐
    ------------------------------------- */

    networkTl.to(
        networkFaces,
        {
            opacity: 0,
            scale: 0.92,

            duration: 0.5,

            stagger: {
                each: 0.05,
                from: "random"
            }
        }
    );


    /* -------------------------------------
       5. 선 사라짐
    ------------------------------------- */

    networkTl.to(
        networkLines,
        {
            strokeDashoffset:
                (i, line) => line.getTotalLength(),

            opacity: 0,

            duration: 0.5,

            stagger: {
                each: 0.018,
                from: "random"
            },

            ease: "power2.inOut"
        }
    );


    /* -------------------------------------
       6. 다시 점만
    ------------------------------------- */

    networkTl.to({}, {
        duration: 0.5
    });

}

}




/*
  텍스트도 다시 초기화
*/

const textTarget =
  document.querySelector(".text p");

if (textTarget) {

  textTarget.innerHTML = "";

  gsap.set(textTarget, {
    opacity: 0,
    y: 20
  });

}


  /* =============================
     SVG 원 / DOT
  ============================= */

  const circle =
    document.querySelector(
      ".dot-rotate-wrapper circle"
    );

  const dot =
    document.querySelector(
      ".spin-dot"
    );


  if (!circle || !dot) {

    wheelLocked = false;
    return;

  }


  const length =
    circle.getTotalLength();


  /* =============================
     원 stroke 초기화
  ============================= */

  gsap.set(circle, {

    strokeDasharray:
      `${length} ${length}`,

    strokeDashoffset:
      length,

    opacity: 1

  });


  /* =============================
     dot 시작 위치
     실제 SVG path 첫 점
  ============================= */

  const startPoint =
    circle.getPointAtLength(0);


  gsap.set(dot, {

    left: startPoint.x,

    top: startPoint.y,

    xPercent: -50,

    yPercent: -50,

    opacity: 1,

    scale: 1

  });


  /* =============================
     하나의 progress로
     dot + line + 이동 동기화
  ============================= */

  const motion = {
    distance: 0
  };


  gsap.to(motion, {

    distance: length,

    duration: 1.1,

    ease: "none",


    onUpdate: () => {

      const distance =
        motion.distance;


      const progress =
        distance /
        length;


      /* =========================
         실제 경로 위 dot 위치
      ========================= */

      const point =
        circle.getPointAtLength(
          distance
        );


      gsap.set(dot, {

        left: point.x,

        top: point.y

      });


      /* =========================
         dot이 지나간 만큼 line 표시
      ========================= */

      gsap.set(circle, {

        strokeDashoffset:
          length -
          distance

      });


      /* =========================
         원 전체 왼쪽 이동
      ========================= */

      gsap.set(
        ".dot-rotate-wrapper",
        {

          x:
            -380 *
            progress

        }
      );

    },


    onComplete: () => {



      /* =========================
         dot 사라짐
      ========================= */

      gsap.to(dot, {

        opacity: 0,

        scale: 0,

        duration: 0.18,

        ease: "power2.out"

      });


      /* =========================
         이미지 등장
      ========================= */

      gsap.to(
        ".circle-fill-image",
        {

          opacity: 1,

          duration: 0.55,

          delay: 0.08,

          ease: "power2.out",


          onComplete:
            () => {

// 이미지가 나온 뒤 원 라인 사라짐
gsap.to(circle, {
  opacity: 0,
  duration: 0.5,
  ease: "power2.out"
});

/* 완성된 텍스트 넣기 */
const textTarget =
  document.querySelector(".text p");

if (textTarget) {
  textTarget.innerHTML = `
    <span class="keyword">점</span>에서 시작해
    <span class="keyword">선</span>을 그리고,
    <span class="keyword">면</span>을 더해<br>
    <strong>입체적 창조</strong>로 나아가는 디자이너입니다.
  `;
}

gsap.to(
  [".network-svg", ".text", ".text p"],
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",

    onComplete: () => {

      if (window.networkMotionTl) {
        window.networkMotionTl.restart();
      }

      wheelLocked = false;
    }
  }
);


const secondLinePath =
  document.querySelector(
    ".second-line-path"
  );

if (secondLinePath) {

  const secondLineLength =
    secondLinePath.getTotalLength();

  gsap.fromTo(
    secondLinePath,

    {
      strokeDashoffset:
        secondLineLength
    },

    {
      strokeDashoffset: 0,

      duration: 2,

      ease: "power2.inOut"
    }
  );


}

            }

        }
      );

    }

  });

}


  /* =====================================================
     두 번째 화면 타이핑
  ===================================================== */

  function showStyledText() {

    const target =
      document.querySelector(
        ".text p"
      );


    if (!target) {

      wheelLocked = false;

      return;

    }


    const plainText =
      `점에서 시작해
선을 그리고, 면을 더해
입체적 창조로
나아가는 디자이너입니다.`;


    const totalLength =
      plainText.length;


    target.textContent =
      "";

    target.style.opacity =
      1;


    let i = 0;

    let horizontalLineDrawn =
      false;


    const typingInterval =
      setInterval(
        () => {

          const currentText =
            plainText.slice(
              0,
              i
            );


          target.innerHTML =
            currentText.replace(
              /\n/g,
              "<br>"
            );


          i++;


          if (
            i >=
              Math.floor(
                totalLength *
                0.85
              ) &&
            !horizontalLineDrawn
          ) {

            horizontalLineDrawn =
              true;


            gsap.to(
              ".horizontal-line",
              {

                width: 87,

                opacity: 1,

                duration: 0.8,

                ease:
                  "power2.out"

              }
            );

          }


          if (
            i >
            totalLength
          ) {

            clearInterval(
              typingInterval
            );


            target.innerHTML = `
              <span>점</span>에서 시작해<br>
              <span>선</span>을 그리고,
              <span>면</span>을 더해<br>
              <strong>입체적 창조</strong>로<br>
              나아가는 디자이너입니다.
            `;


            gsap.to(
              ".horizontal_line_right",
              {

                width: 607,

                opacity: 1,

                duration: 0.8,

                ease:
                  "power2.out",


                onComplete:
                  () => {


const flowTl = gsap.timeline({
    onComplete: () => {
        wheelLocked = false;
    }
});


// 전체 영역 등장
flowTl.to(".design-flow", {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out"
});


// DOT
flowTl.fromTo(
    ".flow-dot",
    {
        scale: 0,
        opacity: 0
    },
    {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: "back.out(1.8)"
    }
);


// 첫 번째 화살표
flowTl.fromTo(
    ".flow-arrow:nth-of-type(2)",
    {
        opacity: 0,
        x: -8
    },
    {
        opacity: 1,
        x: 0,
        duration: 0.3
    }
);


// LINE
flowTl.fromTo(
    ".flow-line",
    {
        scaleX: 0,
        opacity: 0
    },
    {
        scaleX: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }
);


// 두 번째 화살표
flowTl.fromTo(
    ".flow-arrow:nth-of-type(4)",
    {
        opacity: 0,
        x: -8
    },
    {
        opacity: 1,
        x: 0,
        duration: 0.3
    }
);


// SPACE
flowTl.fromTo(
    ".flow-plane",
    {
        scale: 0.3,
        rotation: -20,
        opacity: 0
    },
    {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
    }
);


// 세 번째 화살표
flowTl.fromTo(
    ".flow-arrow:nth-of-type(6)",
    {
        opacity: 0,
        x: -8
    },
    {
        opacity: 1,
        x: 0,
        duration: 0.3
    }
);


// 3D
flowTl.fromTo(
    ".flow-3d",
    {
        scale: 0,
        rotation: -45,
        opacity: 0
    },
    {
        scale: 1,
        rotation: 360,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.5)"
    }
);

                  }

              }
            );

          }

        },
        50
      );

  }


  /* =====================================================
     두 번째 화면 복귀
  ===================================================== */




  /* =====================================================
     3. Education 화면
  ===================================================== */

  function showHistoryScene() {

    wheelLocked =
      true;


    /* =========================================
       현재 진행 중 애니메이션 정리
    ========================================= */

    gsap.killTweensOf([
      ".history",
      ".history svg",
      ".history svg > path",
      ".history svg > g",
      ".history svg > rect",
      ".new-svg",
      ".new-svg path",
      ".new-svg-2",
      ".new-svg-2 > svg > path",
      ".ex",
      ".ex2"
    ]);


    /*
      ★ 가장 중요 ★

      Experience 화면에서 Education이

      x: -18vw
      y: 14vh
      scale: 1.14

      상태로 남아 있을 수 있으므로
      Education을 보여주기 전에
      반드시 원래 상태로 되돌린다.
    */

    gsap.set(
      ".history svg",
      {

        x: 0,

        y: 0,

        xPercent: 0,

        yPercent: 0,

        scale: 0.9,

        rotation: 0,

        filter:
          "blur(0px)",

        transformOrigin:
          "50% 50%"

      }
    );


    /*
      history wrapper 역시
      Experience에서 blur / opacity가
      남지 않도록 원복.
    */

    gsap.set(
      ".history",
      {

        opacity: 1,

        filter:
          "blur(0px)"

      }
    );


    /* =========================================
       Experience 화면 잔여물 제거
    ========================================= */

    gsap.set(
      ".ex2",
      {

        opacity: 0,

        x: 0,

        y: 0,

        xPercent: -50,

        yPercent: -50,

        scale: 0.9,

        filter:
          "blur(0px)"

      }
    );


    gsap.set(
      ".new-svg",
      {
        opacity: 0
      }
    );


    gsap.set(
      ".new-svg-2",
      {
        opacity: 0
      }
    );


    gsap.set(
      ".ex",
      {
        opacity: 0
      }
    );


    /* =========================================
       두 번째 라인도 초기화
    ========================================= */

    const resetSecondLine =
      document.querySelector(
        ".new-svg-2 > svg > path"
      );


    if (
      resetSecondLine
    ) {

      const length =
        resetSecondLine
          .getTotalLength();


      gsap.set(
        resetSecondLine,
        {

          strokeDasharray:
            length,

          strokeDashoffset:
            length,

          opacity: 1

        }
      );

    }


    /* =========================================
       이전 Capabilities 화면 숨기기
    ========================================= */

    gsap.to(
      [
        ".circle-fill-image",
        ".text",
        ".horizontal-line",
        ".horizontal_line_right",
        ".floating-icons",
        ".vertical-line",
        ".dot-rotate-wrapper"
      ],
      {

        opacity: 0,

        duration: 0.45

      }
    );


    const historySvg =
      document.querySelector(
        ".history svg"
      );


    if (!historySvg) {

      wheelLocked =
        false;

      return;

    }


    /* =========================================
       SVG 직접 자식
    ========================================= */

    const directChildren =
      [
        ...historySvg.children
      ];


    /* =========================================
       가운데 메인 곡선
    ========================================= */

    const historyLine =
      directChildren.find(
        el => {

          return (
            el.tagName
              .toLowerCase() ===
              "path" &&

            el.hasAttribute(
              "stroke"
            )
          );

        }
      );


    /* =========================================
       원 filter 그룹
    ========================================= */

    const filterGroups =
      directChildren.filter(
        el => {

          return (
            el.tagName
              .toLowerCase() ===
              "g" &&

            el.hasAttribute(
              "filter"
            )
          );

        }
      );


    /* =========================================
       원 2개씩 묶기
    ========================================= */

    const bubbles = [];


    for (
      let i = 0;
      i < filterGroups.length;
      i += 2
    ) {

      const glow =
        filterGroups[i];

      const outline =
        filterGroups[i + 1];


      if (
        !glow ||
        !outline
      ) {

        continue;

      }


      /*
        원 안 흰색 텍스트
      */

      const next =
        outline.nextElementSibling;


      const innerText =
        next &&
        next.tagName
          .toLowerCase() ===
          "path" &&
        (
          next.getAttribute(
            "fill"
          ) === "white" ||

          next.getAttribute(
            "fill"
          ) === "#fff" ||

          next.getAttribute(
            "fill"
          ) === "#FFFFFF"
        )
          ? next
          : null;


      bubbles.push({

        circle: [
          glow,
          outline
        ],

        text:
          innerText,

        date:
          null,

        marker:
          null

      });

    }


    /* =========================================
       날짜 후보 찾기
    ========================================= */

    const dateCandidates =
      directChildren.filter(
        el => {

          if (
            el.tagName
              .toLowerCase() !==
            "path"
          ) {

            return false;

          }


          if (
            el ===
            historyLine
          ) {

            return false;

          }


          /*
            원 안 흰색 글자 제외
          */

          const fill =
            el.getAttribute(
              "fill"
            );


          if (
            fill === "white" ||
            fill === "#fff" ||
            fill === "#FFFFFF"
          ) {

            return false;

          }


          try {

            const box =
              el.getBBox();


            return (
              box.width > 25 &&
              box.width < 110 &&
              box.height > 8 &&
              box.height < 26
            );

          } catch (e) {

            return false;

          }

        }
      );


    /* =========================================
       각 원에 가장 가까운 날짜 연결
    ========================================= */

    const usedDates =
      new Set();


    bubbles.forEach(
      item => {

        const target =
          item.circle[1] ||
          item.circle[0];


        let bubbleRect;


        try {

          bubbleRect =
            target
              .getBoundingClientRect();

        } catch (e) {

          return;

        }


        const bubbleCenterX =
          bubbleRect.left +
          bubbleRect.width / 2;


        const bubbleCenterY =
          bubbleRect.top +
          bubbleRect.height / 2;


        let closestDate =
          null;


        let closestDistance =
          Infinity;


        dateCandidates.forEach(
          date => {

            if (
              usedDates.has(
                date
              )
            ) {

              return;

            }


            const dateRect =
              date
                .getBoundingClientRect();


            const dateCenterX =
              dateRect.left +
              dateRect.width / 2;


            const dateCenterY =
              dateRect.top +
              dateRect.height / 2;


            const dx =
              bubbleCenterX -
              dateCenterX;


            const dy =
              bubbleCenterY -
              dateCenterY;


            const distance =
              Math.sqrt(
                dx * dx +
                dy * dy
              );


            if (
              distance <
                closestDistance &&
              distance <
                260
            ) {

              closestDistance =
                distance;


              closestDate =
                date;

            }

          }
        );


        if (
          closestDate
        ) {

          item.date =
            closestDate;


          usedDates.add(
            closestDate
          );

        }

      }
    );


    /* =========================================
       다이아몬드 전부 찾기
    ========================================= */

    const markerCandidates =
      directChildren.filter(
        el => {

          if (
            el.tagName
              .toLowerCase() !==
            "rect"
          ) {

            return false;

          }


          const transform =
            el.getAttribute(
              "transform"
            ) || "";


          return (
            transform.includes(
              "rotate(45"
            )
          );

        }
      );


    /*
      다이아몬드는 매칭 여부와 관계없이
      전부 처음에 숨김.
    */

    gsap.set(
      markerCandidates,
      {

        opacity: 0,

        scale: 0,

        transformOrigin:
          "50% 50%"

      }
    );


    /* =========================================
       날짜 ↔ 다이아몬드 연결
    ========================================= */

    const usedMarkers =
      new Set();


    bubbles.forEach(
      item => {

        if (
          !item.date
        ) {

          return;

        }


        const dateRect =
          item.date
            .getBoundingClientRect();


        const dateCenterX =
          dateRect.left +
          dateRect.width / 2;


        const dateCenterY =
          dateRect.top +
          dateRect.height / 2;


        let closestMarker =
          null;


        let closestDistance =
          Infinity;


        markerCandidates.forEach(
          marker => {

            if (
              usedMarkers.has(
                marker
              )
            ) {

              return;

            }


            const markerRect =
              marker
                .getBoundingClientRect();


            const markerCenterX =
              markerRect.left +
              markerRect.width / 2;


            const markerCenterY =
              markerRect.top +
              markerRect.height / 2;


            const dx =
              dateCenterX -
              markerCenterX;


            const dy =
              dateCenterY -
              markerCenterY;


            const distance =
              Math.sqrt(
                dx * dx +
                dy * dy
              );


            if (
              distance <
              closestDistance
            ) {

              closestDistance =
                distance;


              closestMarker =
                marker;

            }

          }
        );


        if (
          closestMarker
        ) {

          item.marker =
            closestMarker;


          usedMarkers.add(
            closestMarker
          );

        }

      }
    );


    /* =========================================
       원 안 텍스트 / 날짜 수집
    ========================================= */

    const bubbleTexts =
      bubbles
        .map(
          item =>
            item.text
        )
        .filter(
          Boolean
        );


    const bubbleDates =
      bubbles
        .map(
          item =>
            item.date
        )
        .filter(
          Boolean
        );


    /* =========================================
       나머지 요소
    ========================================= */

    const otherElements =
      directChildren.filter(
        el => {

          const tag =
            el.tagName
              .toLowerCase();


          if (
            tag === "defs"
          ) {

            return false;

          }


          if (
            el ===
            historyLine
          ) {

            return false;

          }


          if (
            filterGroups.includes(
              el
            )
          ) {

            return false;

          }


          if (
            bubbleTexts.includes(
              el
            )
          ) {

            return false;

          }


          if (
            bubbleDates.includes(
              el
            )
          ) {

            return false;

          }


          if (
            markerCandidates.includes(
              el
            )
          ) {

            return false;

          }


          return true;

        }
      );


    /* =========================================
       가운데 곡선 초기화
    ========================================= */

    if (
      historyLine
    ) {

      const lineLength =
        historyLine
          .getTotalLength();


      gsap.set(
        historyLine,
        {

          strokeDasharray:
            lineLength,

          strokeDashoffset:
            lineLength,

          opacity: 1

        }
      );

    }


    /* =========================================
       원 / 텍스트 / 날짜 초기화
    ========================================= */

    bubbles.forEach(
      item => {


        gsap.set(
          item.circle,
          {

            opacity: 0,

            scale: 0.35,

            transformOrigin:
              "50% 50%"

          }
        );


        if (
          item.text
        ) {

          gsap.set(
            item.text,
            {

              opacity: 0,

              y: 8

            }
          );

        }


        if (
          item.date
        ) {

          gsap.set(
            item.date,
            {

              opacity: 0,

              y: 6

            }
          );

        }

      }
    );


    /*
      다이아몬드 한 번 더 확실하게 숨김
    */

    gsap.set(
      markerCandidates,
      {

        opacity: 0,

        scale: 0,

        transformOrigin:
          "50% 50%"

      }
    );


    /* =========================================
       나머지 텍스트 초기화
    ========================================= */

    gsap.set(
      otherElements,
      {
        opacity: 0
      }
    );


    /* =========================================
       Education Timeline
    ========================================= */

    const tl =
      gsap.timeline({

        onComplete:
          () => {

            wheelLocked =
              false;
            

          }

      });


    /* Education / SPACE / PUBLIC / UXUI */

    tl.to(
      otherElements,
      {

        opacity: 1,

        duration: 0.7,

        ease:
          "power2.out"

      },
      0
    );


    /* 가운데 곡선 */

    if (
      historyLine
    ) {

      tl.to(
        historyLine,
        {

          strokeDashoffset: 0,

          duration: 3.5,

          ease:
            "power2.inOut"

        },
        0.1
      );

    }


    /* 각 원 세트 */

    bubbles.forEach(
      (
        item,
        index
      ) => {

        const startTime =
          0.4 +
          index *
          0.43;


        /* 원 */

        tl.to(
          item.circle,
          {

            opacity: 1,

            scale: 1,

            duration: 0.65,

            ease:
              "back.out(1.7)"

          },
          startTime
        );


        /* 원 안 텍스트 */

        if (
          item.text
        ) {

          tl.to(
            item.text,
            {

              opacity: 1,

              y: 0,

              duration: 0.4,

              ease:
                "power2.out"

            },
            startTime +
              0.06
          );

        }


        /* 날짜 */

        if (
          item.date
        ) {

          tl.to(
            item.date,
            {

              opacity: 1,

              y: 0,

              duration: 0.4,

              ease:
                "power2.out"

            },
            startTime +
              0.1
          );

        }


        /* 다이아몬드 */

        if (
          item.marker
        ) {

          tl.to(
            item.marker,
            {

              opacity: 1,

              scale: 1,

              duration: 0.4,

              ease:
                "back.out(1.6)"

            },
            startTime +
              0.1
          );

        }

      }
    );

  }


  /* =====================================================
     4. Education → Experience
  ===================================================== */

  function showFourthScene() {

    wheelLocked =
      true;


    gsap.killTweensOf([
      ".history",
      ".history svg",
      ".new-svg",
      ".new-svg path",
      ".new-svg-2",
      ".new-svg-2 > svg > path",
      ".ex",
      ".ex2"
    ]);


    /* =========================================
       사용할 요소
    ========================================= */

    const secondLineSvg =
      document.querySelector(
        ".new-svg-2"
      );


    const secondLinePath =
      document.querySelector(
        ".new-svg-2 > svg > path"
      );


    const ex2 =
      document.querySelector(
        ".ex2"
      );


    /* =========================================
       공통 전환값
    ========================================= */

    const transitionDuration =
      2.6;


    const transitionEase =
      "power2.inOut";


    /*
      Experience로 내려갈 때도
      Education이 혹시 이전 이동값을
      가지고 있지 않도록 시작 위치 보장.
    */

    gsap.set(
      ".history",
      {

        opacity: 1,

        filter:
          "blur(0px)"

      }
    );


    gsap.set(
      ".history svg",
      {

        x: 0,

        y: 0,

        xPercent: 0,

        yPercent: 0,

        scale: 0.9,

        rotation: 0,

        filter:
          "blur(0px)",

        transformOrigin:
          "50% 50%"

      }
    );


    /* =========================================
       기존 첫 번째 Experience 선 제거
    ========================================= */

    gsap.set(
      ".new-svg",
      {
        opacity: 0
      }
    );


    /* 가운데 Experience 텍스트 제거 */

    gsap.set(
      ".ex",
      {

        display: "none",

        opacity: 0

      }
    );


    /* =========================================
       두 번째 라인 초기화
    ========================================= */

    if (
      secondLineSvg
    ) {

      gsap.set(
        secondLineSvg,
        {
          opacity: 1
        }
      );

    }


    if (
      secondLinePath
    ) {

      const length =
        secondLinePath
          .getTotalLength();


      gsap.set(
        secondLinePath,
        {

          strokeDasharray:
            length,

          strokeDashoffset:
            length,

          opacity: 1

        }
      );

    }


    /* =========================================
       Experience 덩어리 초기 상태

       오른쪽 위 → 중앙
    ========================================= */

    if (
      ex2
    ) {

      gsap.set(
        ex2,
        {

          opacity: 0,


          /*
            중앙 정렬은 고정
          */
          xPercent: -50,

          yPercent: -50,


          /*
            실제 이동값
            오른쪽 위에서 시작
          */
          x: "18vw",

          y: "-14vh",


          scale: 0.65,


          filter:
            "blur(10px)",


          transformOrigin:
            "50% 50%"

        }
      );

    }


    /* =========================================
       하나의 전환 Timeline
    ========================================= */

    const tl =
      gsap.timeline({

        onComplete:
          () => {

            wheelLocked =
              false;
              

          }

      });


    /* =========================================
       Education

       중앙 → 왼쪽 아래
    ========================================= */

    tl.to(
      ".history svg",
      {

        x: "-18vw",

        y: "14vh",

        scale: 1.14,

        duration:
          transitionDuration,

        ease:
          transitionEase

      },
      0
    );


    /*
      Education
      blur + fade
    */

    tl.to(
      ".history",
      {

        opacity: 0,

        filter:
          "blur(10px)",

        duration:
          transitionDuration,

        ease:
          transitionEase

      },
      0
    );


    /* =========================================
       Experience

       오른쪽 위 → 중앙

       Education과 같은 속도 / 방향
    ========================================= */

    if (
      ex2
    ) {

      tl.to(
        ex2,
        {

          x: 0,

          y: 0,

          scale: 0.9,

          opacity: 1,

          filter:
            "blur(0px)",

          duration:
            transitionDuration,

          ease:
            transitionEase

        },
        0
      );

    }


    /* =========================================
       두 번째 라인 Drawing
    ========================================= */

    if (
      secondLinePath
    ) {

      tl.to(
        secondLinePath,
        {

          strokeDashoffset: 0,

          duration: 3.2,

          ease:
            "power2.inOut"

        },
        0
      );

    }


    /* 최종 라인 유지 */

    if (
      secondLineSvg
    ) {

      tl.set(
        secondLineSvg,
        {
          opacity: 1
        }
      );

    }

  }


  /* =====================================================
     스크롤 단계
  ===================================================== */

const scrollSteps = [

  0,

  document.querySelector(
    ".second-scroll-trigger"
  ),

  document.querySelector(
    ".third-scroll-trigger"
  ),

  document.querySelector(
    ".fourth-scroll-trigger"
  ),

  document.querySelector(
    ".Six-scroll-trigger"
  )

];


  function getStepY(
    step
  ) {

    if (
      step === 0
    ) {

      return 0;

    }


    const target =
      scrollSteps[
        step
      ];


    if (
      !target
    ) {

      return 0;

    }


return window.scrollY + target.getBoundingClientRect().top;
  }


  /* =====================================================
     한 화면씩 이동
  ===================================================== */

function moveToStep(nextStep) {



  if (
    nextStep < 0 ||
    nextStep >= scrollSteps.length
  ) {
    return;
  }

  gsap.killTweensOf(window);

gsap.killTweensOf([
".dot.left",
".dot.right",
".line_center",
".text-up",
".text-down",
".circle-mask",
".circle-svg circle",
".dot-container",
".dot-rotate-wrapper",
".spin-dot",
".circle-fill-image",
".network-svg",
".text",
".horizontal-line",
".horizontal_line_right",
".design-flow",
".history",
".history svg",
".history svg > path",
".history svg > g",
".history svg > rect",
".new-svg",
".new-svg path",
".new-svg-2",
".new-svg-2 > svg > path",
".ex",
".ex2",
".tool-svg",
".tool-svg path",
".tool-text"
]);

if (window.networkMotionTl) {
window.networkMotionTl.kill();
window.networkMotionTl = null;
}

  wheelLocked = true;
  currentStep = nextStep;

  

  const scrollHint =
  document.querySelector(".scroll-hint");

if (scrollHint) {
  scrollHint.classList.toggle(
    "hide",
    nextStep === 4
  );
}



if (sideGnb && nextStep !== 4) {
  sideGnb.classList.remove("last-step");
}


  gsap.to(window, {

    scrollTo: {
      y: getStepY(nextStep),
      autoKill: false
    },

    duration: 0.7,
    ease: "power2.inOut",
    overwrite: true,

    onComplete: () => {

      if (nextStep === 0) {

        gsap.killTweensOf([
          ".dot-rotate-wrapper",
          ".spin-dot",
          ".circle-fill-image",
          ".history",
          ".history svg",
          ".new-svg",
          ".ex",
          ".new-svg-2",
          ".ex2",
          ".dot.left",
          ".dot.right",
          ".line_center",
          ".text-up",
          ".text-down",
          ".dot-container",
          ".circle-svg circle",
          ".tool-svg",
          ".tool-text"
        ]);

        gsap.set(".history svg", {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          scale: 0.9,
          rotation: 0,
          filter: "blur(0px)"
        });

        gsap.set([
          ".dot-rotate-wrapper",
          ".circle-fill-image",
          ".history",
          ".new-svg",
          ".ex",
          ".new-svg-2",
          ".ex2",
          ".text",
          ".floating-icons",
          ".tool-svg",
          ".tool-text"
        ], {
          opacity: 0
        });

        playFirstMotion();
      }


      if (nextStep === 1) {

        gsap.killTweensOf([
          ".dot.left",
          ".dot.right",
          ".line_center",
          ".text-up",
          ".text-down",
          ".dot-container",
          ".circle-svg circle",
          ".dot-rotate-wrapper",
          ".spin-dot",
          ".circle-fill-image",
          ".tool-svg",
          ".tool-text"
        ]);

        gsap.set([
          ".dot.left",
          ".dot.right",
          ".line_center",
          ".text-up",
          ".text-down",
          ".tool-svg",
          ".tool-text"
        ], {
          opacity: 0
        });

        runSecondMotion();
      }


      if (nextStep === 2) {

        gsap.set([
          ".tool-svg",
          ".tool-text"
        ], {
          opacity: 0
        });

        showHistoryScene();
      }


      if (nextStep === 3) {

        gsap.set([
          ".tool-svg",
          ".tool-text"
        ], {
          opacity: 0
        });

        showFourthScene();
      }


      if (nextStep === 4) {
        showToolScene();
      }

    }

  });

}


  /* =====================================================
     Wheel
  ===================================================== */

  let lastWheelTime =
    0;


  window.addEventListener(
    "wheel",

    function (e) {

      e.preventDefault();





      const now =
        Date.now();


      /*
        트랙패드 / 빠른 휠
        중복 발생 방지
      */

      if (
        now -
          lastWheelTime <
        700
      ) {

        return;

      }


      /*
        너무 작은 움직임 무시
      */

      if (
        Math.abs(
          e.deltaY
        ) < 20
      ) {

        return;

      }


      lastWheelTime =
        now;


      /*
        아래
      */

      if (
        e.deltaY > 0
      ) {

        moveToStep(
          currentStep +
          1
        );

      }


      /*
        위
      */

      else {

        moveToStep(
          currentStep -
          1
        );

      }

    },

    {
      passive: false
    }
  );


  /* =====================================================
     새로고침
  ===================================================== */

  if (
    "scrollRestoration"
    in history
  ) {

    history.scrollRestoration =
      "manual";

  }


  window.scrollTo(
    0,
    0
  );


  $(window).on(
    "load",

    function () {

      window.scrollTo(
        0,
        0
      );


      currentStep =
        0;


      /*
        새로고침 때도
        Education 위치 완전 초기화
      */

      gsap.set(
        ".history svg",
        {

          x: 0,

          y: 0,

          xPercent: 0,

          yPercent: 0,

          scale: 0.9,

          rotation: 0,

          filter:
            "blur(0px)",

          transformOrigin:
            "50% 50%"

        }
      );


      ScrollTrigger.refresh();

    }
  );

  /* =====================================================
   6. Tool / Skill
===================================================== */

function showToolScene() {

  wheelLocked = true;


  /* =============================
     이전 장면 모션 정리
  ============================= */

  gsap.killTweensOf([
    ".history",
    ".history svg",
    ".new-svg",
    ".new-svg-2",
    ".ex",
    ".ex2",
    ".tool-svg",
    ".tool-svg path",
    ".tool-text"
  ]);


  /* =============================
     이전 화면 숨기기
  ============================= */

  gsap.to([
    ".history",
    ".new-svg",
    ".new-svg-2",
    ".ex",
    ".ex2"
  ], {
    opacity: 0,
    duration: 0.5,
    overwrite: true
  });


  /* =============================
     Tool 화면 초기화
  ============================= */

  gsap.set(".tool-svg", {
    opacity: 1
  });


  gsap.set(".tool-text", {
    opacity: 0,
    y: 30,
    scale: 0.97
  });


  /* =============================
     왼쪽 SVG의 모든 path
  ============================= */

  const paths =
    document.querySelectorAll(
      ".tool-svg path"
    );


 if (!paths.length) {

  gsap.to(".tool-text", {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,

    onComplete: () => {

      wheelLocked = false;

      /* Tool 모션 종료 후 3번째 GNB 클릭 유도 */
      if (sideGnb) {
        sideGnb.classList.add("last-step");
      }

      ScrollTrigger.refresh();

    }
  });

  return;
}


  /* =============================
     path 초기화
  ============================= */

  paths.forEach(path => {

    const length =
      path.getTotalLength();

    gsap.set(path, {
      strokeDasharray:
        `${length} ${length}`,

      strokeDashoffset:
        length
    });

  });


  /* =============================
     Timeline
  ============================= */

const tl =
  gsap.timeline({

    onComplete: () => {

      wheelLocked = false;

      /* Tool / Skill 모션이 다 끝난 뒤
         3번째 GNB 클릭 유도 시작 */
      if (sideGnb) {
        sideGnb.classList.add("last-step");
      }

    }

  });


  /* =============================
     왼쪽 선 그리기
  ============================= */

  tl.to(
    paths,
    {

      strokeDashoffset: 0,

      duration: 2.8,

      ease: "power2.inOut",

      stagger: 0.08

    },
    0
  );


  /* =============================
     오른쪽 Tool/Skill 등장

     선이 절반 정도 그려질 때부터 등장
  ============================= */

  tl.to(
    ".tool-text",
    {

      opacity: 1,

      y: 0,

      scale: 1,

      duration: 1.2,

      ease: "power2.out"

    },
    1.25
  );

}

/* =====================================================
   BRUSH LINE CURSOR
===================================================== */

const cursorCanvas =
  document.querySelector("#line-cursor");

if (cursorCanvas) {

  const ctx =
    cursorCanvas.getContext("2d");


  const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };


  const params = {

    /* 꼬리 길이 */
    pointsNumber: 32,

    /* 전체 두께 */
    widthFactor: 0.38,

    /* 움직임 탄성 */
    spring: 0.42,

    /* 꼬리가 따라오는 정도 */
    friction: 0.52

  };


  const trail =
    new Array(params.pointsNumber);


  for (
    let i = 0;
    i < params.pointsNumber;
    i++
  ) {

    trail[i] = {

      x: pointer.x,
      y: pointer.y,

      dx: 0,
      dy: 0

    };

  }


  /* =========================
     Mouse
  ========================= */

  window.addEventListener(
    "mousemove",
    e => {

      pointer.x = e.clientX;
      pointer.y = e.clientY;

    }
  );


  /* =========================
     Canvas Size
  ========================= */

  function setupCursorCanvas() {

    const dpr =
      window.devicePixelRatio || 1;


    cursorCanvas.width =
      window.innerWidth * dpr;

    cursorCanvas.height =
      window.innerHeight * dpr;


    cursorCanvas.style.width =
      window.innerWidth + "px";

    cursorCanvas.style.height =
      window.innerHeight + "px";


    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

  }


  setupCursorCanvas();


  window.addEventListener(
    "resize",
    setupCursorCanvas
  );


  /* =========================
     Animation
  ========================= */

  function updateLineCursor() {

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );


    /* 꼬리 좌표 계산 */

    trail.forEach(
      (point, index) => {

        const previous =
          index === 0
            ? pointer
            : trail[index - 1];


        const spring =
          index === 0
            ? params.spring * 0.4
            : params.spring;


        point.dx +=
          (previous.x - point.x) *
          spring;


        point.dy +=
          (previous.y - point.y) *
          spring;


        point.dx *=
          params.friction;

        point.dy *=
          params.friction;


        point.x +=
          point.dx;

        point.y +=
          point.dy;

      }
    );


    /* =========================
       선 그리기
    ========================= */

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle =
      "rgba(121, 115, 243, 0.85)";


    for (
      let i = 0;
      i < trail.length - 1;
      i++
    ) {

      const current =
        trail[i];

      const next =
        trail[i + 1];


      /*
        앞쪽 = 굵게
        뒤쪽 = 얇게
      */

      const progress =
        1 - i / trail.length;


      const width =
        1 +
        progress *
        16;


      ctx.beginPath();

      ctx.moveTo(
        current.x,
        current.y
      );


      const midX =
        (current.x + next.x) / 2;

      const midY =
        (current.y + next.y) / 2;


      ctx.quadraticCurveTo(
        current.x,
        current.y,
        midX,
        midY
      );


      ctx.lineWidth =
        width;


      ctx.stroke();

    }


    requestAnimationFrame(
      updateLineCursor
    );

  }


  updateLineCursor();

}

const toolSvg = document.querySelector(".tool-icons-svg");

if (toolSvg) {

Array.from(toolSvg.children).forEach((el) => {

const tag = el.tagName.toLowerCase();

if (!["path", "rect", "g"].includes(tag)) return;

try {

const box = el.getBBox();

const centerY = box.y + box.height / 2;

if (centerY < 100) {

el.classList.add("tool-old-title");

} else if (centerY >= 150 && centerY < 310) {

el.classList.add("tool-front-row");

} else if (centerY >= 310 && centerY < 490) {

el.classList.add("tool-design-row");

} else if (centerY >= 490) {

el.classList.add("tool-3d-row");

}

} catch (e) {}

});

}
});