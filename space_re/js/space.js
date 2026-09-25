$(function () {

  /* =====================================================
     GSAP 등록
  ===================================================== */

  gsap.registerPlugin(
    ScrollToPlugin,
    ScrollTrigger
  );


  /* =====================================================
     1. INTRO
  ===================================================== */

  gsap.set(".dots-wrapper", {
    scale: 0
  });


  gsap.to(".white-fill", {
    scale: 300,
    duration: 25,
    ease: "power3.out"
  });


  gsap.to(".dots-wrapper", {
    rotation: 1440,
    scale: 3.5,
    duration: 2,
    ease: "power3.out"
  });


  gsap.to(".text-wrapper", {
    opacity: 1,
    delay: 1,
    duration: 1,
    ease: "power2.out"
  });


  gsap.to(
    [".dot1", ".dot2"],
    {
      left: "50%",
      x: "-50%",
      delay: 2,
      duration: 1,
      ease: "power2.inOut"
    }
  );


  gsap.to(
    [
      ".mask-wrapper.left",
      ".mask-wrapper.right"
    ],
    {
      opacity: 1,
      delay: 2,
      duration: 1,
      ease: "power2.inOut"
    }
  );


  gsap.to(".text-wrapper", {
    clipPath: "inset(0% 50% 0% 50%)",
    delay: 2,
    duration: 1,
    ease: "power2.inOut"
  });


  gsap.to(".dot1, .dot2", {
    scale: 0,
    opacity: 0,
    delay: 3,
    duration: 1.5,
    ease: "power2.out"
  });


  gsap.to(".new-fill", {
    scale: 300,
    duration: 100,
    ease: "power2.out",
    delay: 3.5
  });


  gsap.to(".next-wrapper", {
    opacity: 1,
    delay: 3.7,
    duration: 1,
    ease: "power2.out"
  });


  gsap.to(".background2", {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
    delay: 4.8,

    onComplete: () => {
      showShapeFillSequence();
    }
  });


  gsap.to(".next-wrapper", {
    opacity: 0,
    delay: 5,
    duration: 0.5,
    ease: "power2.out"
  });



  /* =====================================================
     2. 도형 요소
  ===================================================== */

  const paths =
    document.querySelectorAll(
      ".wave-fill .draw-path"
    );


  const fillRects =
    document.querySelectorAll(
      ".wave-fill .fill-rect"
    );



  /* =====================================================
     3. 흰 면 초기값
  ===================================================== */

  fillRects.forEach((rect) => {

    rect.dataset.startY =
      rect.getAttribute("y");


    gsap.set(rect, {

      opacity: 0,

      attr: {
        y: rect.dataset.startY
      }

    });

  });



  /* =====================================================
     4. DRAW TIMELINE
  ===================================================== */

  const drawTimeline =
    gsap.timeline({
      paused: true
    });

    const introSkip = document.querySelector(".intro-skip");

introSkip?.addEventListener("click", () => {

// 진행 중인 인트로 모션 정지
gsap.killTweensOf([
".white-fill",
".dots-wrapper",
".dot1",
".dot2",
".text-wrapper",
".mask-wrapper",
".new-fill",
".next-wrapper",
".background2",
".wave-fill-wrapper",
".wave-fill",
".draw-path",
".draw_dot",
".fill-rect"
]);

drawTimeline.pause();

// 앞쪽 화면 숨기기
gsap.set([
".background",
".background2",
".white-fill",
".dots-wrapper",
".text-wrapper",
".mask-wrapper",
".new-fill",
".next-wrapper"
], {
opacity: 0,
pointerEvents: "none"
});

const wrapper = document.querySelector(".wave-fill-wrapper");

if (wrapper) {
wrapper.style.display = "none";
}

// Project 바로 표시
const project = document.querySelector(".project");

if (project) {
gsap.killTweensOf(project);

gsap.set(project, {
opacity: 1,
y: 0
});

project.style.height = "100vh";
project.style.overflow = "hidden";
project.style.pointerEvents = "auto";
}

// Project 상태로 GNB 변경
document
.querySelector(".side_gnb")
?.classList.add("project-active");

// SKIP 버튼 숨김
introSkip.classList.add("is-hidden");

});



  /* =====================================================
     5. 도형별 시작 위치 / 방향 설정
  ===================================================== */

  /*
    startOffset
    0    = path 시작점
    0.25 = 전체 길이의 25% 지점
    0.5  = 전체 길이의 50% 지점
    0.75 = 전체 길이의 75% 지점

    direction
    1  = 정방향
    -1 = 역방향
  */

  const drawSettings = [

    // 삼각형
    {
      startOffset: 0,
      direction: 1
    },

    // 사각형
    {
      startOffset: 0.25,
      direction: -1
    },

    // 오각형
    {
      startOffset: 0.4,
      direction: 1
    },

    // 육각형
    {
      startOffset: 0.65,
      direction: -1
    }

  ];



  /* =====================================================
     6. 점 + 선 그리기
  ===================================================== */

  paths.forEach((pathEl, index) => {

    const pathLength =
      pathEl.getTotalLength();


    /*
      도형별 진행 방향
  
      1  = 정방향
      -1 = 역방향
    */

    const directions = [
      1,   // 삼각형
      -1,  // 사각형
      1,   // 오각형
      -1   // 육각형
    ];


    const direction =
      directions[index];



    /* =================================================
       선 초기화
    ================================================= */

    gsap.set(pathEl, {

      strokeDasharray:
        `${pathLength} ${pathLength}`,

      /*
        정방향 / 역방향에 따라
        시작 dash 위치만 반대로
      */

      strokeDashoffset:
        direction === 1
          ? pathLength
          : -pathLength,

      opacity: 1

    });



    /* =================================================
       점 생성
    ================================================= */

    const dot =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );


    dot.setAttribute("r", "5");
    dot.setAttribute("fill", "white");
    dot.setAttribute(
      "class",
      "draw_dot"
    );


    pathEl
      .closest("svg")
      .appendChild(dot);



    /* =================================================
       점 시작 위치
    ================================================= */

    /*
      정방향이면 path 시작점
      역방향이면 path 끝점
    */

    const startPoint =
      direction === 1
        ? pathEl.getPointAtLength(0)
        : pathEl.getPointAtLength(pathLength);


    gsap.set(dot, {

      attr: {
        cx: startPoint.x,
        cy: startPoint.y
      },

      opacity: 0

    });



    const motion = {

      /*
        정방향이면 0부터
        역방향이면 pathLength부터
      */

      distance:
        direction === 1
          ? 0
          : pathLength

    };



    /* =================================================
       점 등장
    ================================================= */

    drawTimeline.to(
      dot,
      {

        opacity: 1,

        duration: 0.12

      },
      0
    );



    /* =================================================
       선 그리기
    ================================================= */

    drawTimeline.to(
      pathEl,
      {

        strokeDashoffset: 0,

        duration: 2,

        ease: "none"

      },
      0
    );



    /* =================================================
       점 이동
    ================================================= */

    drawTimeline.to(
      motion,
      {

        /*
          정방향이면 끝까지
          역방향이면 0까지
        */

        distance:
          direction === 1
            ? pathLength
            : 0,

        duration: 2,

        ease: "none",

        onUpdate: () => {

          const point =
            pathEl.getPointAtLength(
              motion.distance
            );


          gsap.set(
            dot,
            {

              attr: {
                cx: point.x,
                cy: point.y
              }

            }
          );

        }

      },
      0
    );



    /* =================================================
       선 완성 후 점 사라짐
    ================================================= */

    drawTimeline.to(
      dot,
      {

        opacity: 0,

        duration: 0.18,

        ease: "power1.out"

      },
      2
    );

  });



  /* =====================================================
     7. 외곽선 완성 상태 유지
  ===================================================== */

  drawTimeline.to(
    {},
    {
      duration: 0.3
    }
  );



  /* =====================================================
     8. 면 아래 → 위로 채우기
  ===================================================== */

  /* =====================================================
     8. 면 채우기
     1, 3 = 아래 → 위
     2, 4 = 위 → 아래
  ===================================================== */

  drawTimeline.set(
    fillRects,
    {
      opacity: 1
    }
  );


  /* 각 도형 동시에 채우기 */
  fillRects.forEach((rect, index) => {

    const startY =
      parseFloat(rect.dataset.startY);


    /* 1번, 3번 : 아래 → 위 */
    if (index === 0 || index === 2) {

      gsap.set(rect, {
        attr: {
          y: startY
        }
      });

      drawTimeline.to(
        rect,
        {
          attr: {
            y: 0
          },

          duration: 1.15,
          ease: "power2.inOut"
        },
        "<"
      );

    }


    /* 2번, 4번 : 위 → 아래 */
    else {

      /*
        rect를 위에 붙여놓고
        높이를 0에서 원래 높이까지 늘림
      */

      const originalHeight =
        parseFloat(
          rect.getAttribute("height")
        );


      gsap.set(rect, {
        attr: {
          y: 0,
          height: 0
        }
      });


      drawTimeline.to(
        rect,
        {
          attr: {
            height: originalHeight
          },

          duration: 1.15,
          ease: "power2.inOut"
        },
        "<"
      );

    }

  });



  /* =====================================================
     10. PROJECT 화면 등장 +
         왼쪽 하단 아이콘으로 이동
  ===================================================== */

  drawTimeline.add(() => {

    const project =
      document.querySelector(
        ".project"
      );


    const projectCon =
      document.querySelector(
        ".project_con"
      );


    const shapes =
      document.querySelectorAll(
        ".wave-fill"
      );


    const projectBg =
      document.querySelector(
        ".project .bg > svg"
      );


    if (
      !project ||
      !projectBg ||
      shapes.length < 4
    ) {
      return;
    }



    /* =================================================
       프로젝트 화면 준비
    ================================================= */

    project.style.height =
      "100vh";

    project.style.overflow =
      "hidden";

    project.style.pointerEvents =
      "none";
introSkip?.classList.add("is-hidden");




    /* =================================================
       프로젝트 화면 등장
    ================================================= */

    gsap.to(
      project,
      {

        opacity: 1,

        y: 0,

        duration: 1,

        ease: "power2.inOut"

      }
    );


    gsap.to(
      [
        ".background",
        ".background2",
        ".white-fill"
      ],
      {

        opacity: 0,

        duration: 0.9,

        ease: "power2.inOut"

      }
    );



    /* =================================================
       왼쪽 하단 아이콘 목표 위치
       SVG 1920 × 1080 기준
    ================================================= */

    const targetPoints = [

      // ALL
      {
        x: 338,
        y: 735,
        size: 58
      },

      // PERSONAL
      {
        x: 456,
        y: 735,
        size: 58
      },

      // TEAM
      {
        x: 570,
        y: 735,
        size: 62
      },

      // PREVIOUS
      {
        x: 688,
        y: 735,
        size: 62
      }

    ];



    const bgRect =
      projectBg.getBoundingClientRect();


    const scaleX =
      bgRect.width / 1920;


    const scaleY =
      bgRect.height / 1080;



    /* =================================================
       각각 이동 + 축소
    ================================================= */

    shapes.forEach(
      (shape, index) => {

        const shapeRect =
          shape.getBoundingClientRect();


        const target =
          targetPoints[index];


        const currentX =
          shapeRect.left +
          shapeRect.width / 2;


        const currentY =
          shapeRect.top +
          shapeRect.height / 2;


        const targetX =
          bgRect.left +
          target.x * scaleX;


        const targetY =
          bgRect.top +
          target.y * scaleY;


        const moveX =
          targetX -
          currentX;


        const moveY =
          targetY -
          currentY;


        const targetSize =
          target.size *
          Math.min(
            scaleX,
            scaleY
          );


        const targetScale =
          targetSize /
          Math.max(
            shapeRect.width,
            shapeRect.height
          );


        gsap.to(
          shape,
          {

            x: moveX,

            y: moveY,

            scale: targetScale,

            transformOrigin:
              "50% 50%",

            duration: 1.5,

            ease: "power3.inOut"

          }
        );


        gsap.to(
          shape,
          {

            opacity: 0,

            duration: 0.18,

            delay: 1.32,

            ease: "power1.out"

          }
        );

      }
    );



    /* =================================================
       이동 완료 후 wrapper 숨김
    ================================================= */

    gsap.delayedCall(1.55, () => {
      const wrapper =
        document.querySelector(".wave-fill-wrapper");

      if (wrapper) {
        wrapper.style.display = "none";
      }

      project.style.pointerEvents = "auto";

      // Project 화면 도착 후 4번째 GNB 클릭 유도 시작
      document
        .querySelector(".side_gnb")
        ?.classList.add("project-active");
    });

  });



  /* =====================================================
     11. 이동 시간 확보
  ===================================================== */

  drawTimeline.to(
    {},
    {
      duration: 1.6
    }
  );



  /* =====================================================
     12. PROJECT 최종 상태
  ===================================================== */

  drawTimeline.add(() => {

    const project =
      document.querySelector(
        ".project"
      );


    const projectCon =
      document.querySelector(
        ".project_con"
      );


    if (!project) {
      return;
    }


    project.style.pointerEvents =
      "auto";

    project.style.height =
      "100vh";

    project.style.overflow =
      "hidden";




  });



  /* =====================================================
     13. 도형 애니메이션 시작
  ===================================================== */

  function showShapeFillSequence() {

    const wrapper =
      document.querySelector(
        ".wave-fill-wrapper"
      );


    if (!wrapper) {
      return;
    }


    wrapper.style.display =
      "flex";


    gsap.set(
      wrapper,
      {

        opacity: 0,

        zIndex: 9999

      }
    );


    gsap.to(
      wrapper,
      {

        opacity: 1,

        duration: 0.45,

        ease: "power1.out",

        onComplete: () => {

          drawTimeline.play(0);

        }

      }
    );

  }

  /* =====================================================
    PROJECT SWIPER
 ===================================================== */

  const projectSwiper = new Swiper(".project_con", {
    slidesPerView: 1,
    spaceBetween: 80,
    speed: 600,

    loop: true,
    rewind: false,

    autoplay: {
      delay: 1300,
      disableOnInteraction: false
    },

    pagination: {
      el: ".project-pagination",
      clickable: true
    }
  });

  /* 여기 추가 */
const projectCards =
  document.querySelectorAll(".project_con .swiper-slide");

projectCards.forEach((card) => {

  card.addEventListener("mouseenter", () => {
    projectSwiper.autoplay.stop();
  });

  card.addEventListener("mouseleave", () => {
    projectSwiper.autoplay.start();
  });

  document.querySelector(".project-arrow-prev")?.addEventListener("click", () => {
projectSwiper.slidePrev();
});

document.querySelector(".project-arrow-next")?.addEventListener("click", () => {
projectSwiper.slideNext();
});

});

  /* =====================================================
     PROJECT FILTER
  ===================================================== */

  const filterButtons =
    document.querySelectorAll(
      ".project_filter button"
    );

  const projectItems =
    document.querySelectorAll(
      ".project_con > ul > li"
    );

  const projectBgSvg =
    document.querySelector(
      ".project .bg > svg"
    );


  /* =====================================================
     FILTER 버튼 위치
     SVG 1920 × 1080 기준
  ===================================================== */

  const filterPoints = [
    { x: 338, y: 735 }, // ALL
    { x: 456, y: 735 }, // PERSONAL
    { x: 570, y: 735 }, // TEAM
    { x: 688, y: 735 }  // PREVIOUS
  ];


  function setFilterButtonPositions() {

    if (!projectBgSvg) {
      return;
    }


    const bgRect =
      projectBgSvg.getBoundingClientRect();


    const scaleX =
      bgRect.width / 1920;

    const scaleY =
      bgRect.height / 1080;


    filterButtons.forEach(
      (button, index) => {

        const point =
          filterPoints[index];


        const x =
          bgRect.left +
          point.x * scaleX;

        const y =
          bgRect.top +
          point.y * scaleY;


        button.style.left =
          `${x}px`;

        button.style.top =
          `${y}px`;

      }
    );

  }


  /* 처음 위치 설정 */
  setFilterButtonPositions();


  /* 화면 크기 바뀌면 다시 계산 */
  window.addEventListener(
    "resize",
    setFilterButtonPositions
  );


  /* =====================================================
     프로젝트 필터링
  ===================================================== */

  filterButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const filter =
          button.dataset.filter;

        const currentFilter =
          document.querySelector(
            ".project-current-filter"
          );

        const progressBar =
          document.querySelector(
            ".filter-progress-active"
          );

        const progressNumber =
          document.querySelector(
            ".filter-progress-number"
          );

        const progressIndex = {
          all: 0,
          personal: 1,
          team: 2,
          work: 3
        };

        const index =
          progressIndex[filter];

        if (progressBar) {
          progressBar.setAttribute(
            "x",
            294 + 65.75 * index
          );
        }

        if (progressNumber) {
          progressNumber.textContent =
            `${index + 1}/4`;
        }

        if (currentFilter) {
          currentFilter.textContent =
            filter.toUpperCase();
        }

        /* =========================
   FILTER ON / OFF
========================= */

        /* 기존 active 전부 제거 */
        document
          .querySelectorAll(
            ".filter-icon, .filter-text"
          )
          .forEach((el) => {
            el.classList.remove("active");
          });


        /* 클릭한 메뉴 active */
        const activeIcon =
          document.querySelector(
            `.filter-${filter}`
          );

        const activeText =
          document.querySelector(
            `.filter-${filter}-text`
          );


        if (activeIcon) {
          activeIcon.classList.add("active");
        }

        if (activeText) {
          activeText.classList.add("active");
        }





/* =========================
   SWIPER FILTER
========================= */

projectSwiper.autoplay.stop();

/* loop 해제 */
projectSwiper.loopDestroy();

/* 필터에 맞는 카드만 표시 */
projectItems.forEach((item) => {

  const category = item.dataset.category;

  const isVisible =
    filter === "all" ||
    category === filter;

  item.classList.toggle("filter-hidden", !isVisible);

});

/* Swiper 다시 계산 */
projectSwiper.updateSlides();
projectSwiper.updateSize();
projectSwiper.updateProgress();
projectSwiper.updateSlidesClasses();

/* 현재 보이는 프로젝트 개수 */
const visibleSlides = Array.from(projectItems).filter(
  item => !item.classList.contains("filter-hidden")
);

const visibleCount = visibleSlides.length;


/* =========================
   PAGINATION
========================= */

const pagination =
  document.querySelector(".project-pagination");

function makeProjectPagination() {

  if (!pagination) return;

  pagination.innerHTML = "";

  visibleSlides.forEach((slide, index) => {

    const bullet =
      document.createElement("span");

    bullet.className =
      "swiper-pagination-bullet";

    if (index === 0) {
      bullet.classList.add(
        "swiper-pagination-bullet-active"
      );
    }

    /* 동그라미 클릭 */
    bullet.addEventListener("click", () => {
      projectSwiper.slideToLoop(index);
    });

    pagination.appendChild(bullet);
  });
}


/* active 동그라미 변경 */
function updateProjectPagination() {

  if (!pagination) return;

  const bullets =
    pagination.querySelectorAll(
      ".swiper-pagination-bullet"
    );

  let currentIndex = 0;

  const activeSlide =
    projectSwiper.slides[
      projectSwiper.activeIndex
    ];

  if (activeSlide) {

    const visibleIndex =
      visibleSlides.indexOf(activeSlide);

    if (visibleIndex >= 0) {
      currentIndex = visibleIndex;
    }
  }

  bullets.forEach((bullet, index) => {

    bullet.classList.toggle(
      "swiper-pagination-bullet-active",
      index === currentIndex
    );

  });
}


projectSwiper.on("slideChange", () => {
  updateProjectPagination();
});

/* 프로젝트가 있는 경우 */
if (visibleCount > 0) {

  projectSwiper.loopCreate();
  projectSwiper.update();

  projectSwiper.slideToLoop(0, 0);

  makeProjectPagination();
  updateProjectPagination();

  projectSwiper.autoplay.start();

} else {

  if (pagination) {
    pagination.innerHTML = "";
  }

}

      }
    );

  });



  /* =====================================================
     PLANE CURSOR
     Organic Point + Line Trail
  ===================================================== */

  const planeCanvas =
    document.querySelector("#plane-cursor");

  const planeCursorPoint =
    document.querySelector(".plane-cursor-point");


  if (planeCanvas && planeCursorPoint) {

    const ctx =
      planeCanvas.getContext("2d");


    /* =================================================
       SETTINGS
    ================================================= */

    const MAX_PARTICLES = 16;

    // 점이 생성되는 간격
    const SPAWN_DISTANCE = 28;

    // 선이 연결될 수 있는 거리
    const CONNECTION_DISTANCE = 165;

    // 한 점이 연결할 수 있는 최대 선 개수
    const MAX_CONNECTIONS = 2;


    /* =================================================
       MOUSE
    ================================================= */

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    let lastSpawnX = pointer.x;
    let lastSpawnY = pointer.y;

    let hasMoved = false;


    /* =================================================
       PARTICLES
    ================================================= */

    const particles = [];


    /* =================================================
       CANVAS SETUP
    ================================================= */

    function setupPlaneCanvas() {

      const dpr =
        window.devicePixelRatio || 1;


      planeCanvas.width =
        window.innerWidth * dpr;

      planeCanvas.height =
        window.innerHeight * dpr;


      planeCanvas.style.width =
        window.innerWidth + "px";

      planeCanvas.style.height =
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


    setupPlaneCanvas();


    window.addEventListener(
      "resize",
      setupPlaneCanvas
    );


    /* =================================================
       PARTICLE 생성
    ================================================= */

    function createParticle(x, y) {

      /*
        마우스 위치에 정확히 찍히는 게 아니라
        주변에 넓고 자연스럽게 생성
      */

      const angle =
        Math.random() *
        Math.PI *
        2;


      const spread =
        22 +
        Math.random() * 60;


      const particle = {

        x:
          x +
          Math.cos(angle) *
          spread,

        y:
          y +
          Math.sin(angle) *
          spread,


        /* 점 크기 */

        size:
          2 +
          Math.random() * 2,


        /* 현재 투명도 */

        opacity: 0,


        /* 수명 */

        life: 1,


        /* 등장 속도 */

        fadeIn:
          0.07 +
          Math.random() * 0.025,


        /* 소멸 속도 */

        decay:
          0.005 +
          Math.random() * 0.002,


        /* 아주 미세한 이동 */

        vx:
          (Math.random() - 0.5) *
          0.1,

        vy:
          (Math.random() - 0.5) *
          0.1
      };


      particles.push(particle);


      /*
        점이 너무 많아지지 않게
      */

      if (
        particles.length >
        MAX_PARTICLES
      ) {

        particles.shift();
      }
    }


    /* =================================================
       MOUSE MOVE
    ================================================= */

    window.addEventListener(
      "mousemove",
      e => {

        /* -------------------------
           실제 커서 위치
        ------------------------- */

        pointer.x =
          e.clientX;

        pointer.y =
          e.clientY;


        /*
          링은 애니메이션 없이
          실제 마우스에 바로 붙음
        */

        planeCursorPoint.style.left =
          pointer.x + "px";

        planeCursorPoint.style.top =
          pointer.y + "px";


        /* -------------------------
           첫 움직임
        ------------------------- */

        if (!hasMoved) {

          lastSpawnX =
            pointer.x;

          lastSpawnY =
            pointer.y;

          hasMoved = true;

          return;
        }


        /* -------------------------
           이동 거리
        ------------------------- */

        const dx =
          pointer.x -
          lastSpawnX;

        const dy =
          pointer.y -
          lastSpawnY;


        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        /*
          일정 거리 이상 움직였을 때만
          점 하나 생성
        */

        if (
          distance >
          SPAWN_DISTANCE
        ) {

          createParticle(
            pointer.x,
            pointer.y
          );


          lastSpawnX =
            pointer.x;

          lastSpawnY =
            pointer.y;
        }
      }
    );


    /* =================================================
       ANIMATION
    ================================================= */

    function animatePlaneCursor() {

      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );


      /* =================================================
         PARTICLE UPDATE
      ================================================= */

      particles.forEach(
        particle => {

          /*
            처음에는 스르륵 나타남
          */

          if (
            particle.life > 0.5
          ) {

            particle.opacity +=
              (1 - particle.opacity) *
              particle.fadeIn;

          } else {

            /*
              후반에는 스르륵 사라짐
            */

            particle.opacity +=
              (0 - particle.opacity) *
              0.055;
          }


          /*
            아주 미세하게 움직임
          */

          particle.x +=
            particle.vx;

          particle.y +=
            particle.vy;


          /*
            수명 감소
          */

          particle.life -=
            particle.decay;
        }
      );


      /* =================================================
         LINE
      ================================================= */

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {

        const current =
          particles[i];


        /*
          현재 점에서 가까운 점 찾기
        */

        const nearby = [];


        for (
          let j = 0;
          j < particles.length;
          j++
        ) {

          if (i === j) {
            continue;
          }


          const other =
            particles[j];


          const dx =
            current.x -
            other.x;

          const dy =
            current.y -
            other.y;


          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );


          if (
            distance <
            CONNECTION_DISTANCE
          ) {

            nearby.push({
              particle: other,
              distance: distance,
              index: j
            });
          }
        }


        /*
          가까운 순서대로 정렬
        */

        nearby.sort(
          (a, b) =>
            a.distance -
            b.distance
        );


        /*
          한 점당 최대 2개만 연결

          → 복잡한 거미줄 방지
          → 큰 삼각형 위주
        */

        const connections =
          nearby.slice(
            0,
            MAX_CONNECTIONS
          );


        connections.forEach(
          connection => {

            /*
              같은 선을 두 번 그리지 않게
            */

            if (
              connection.index <= i
            ) {
              return;
            }


            const other =
              connection.particle;


            const distanceOpacity =
              1 -
              connection.distance /
              CONNECTION_DISTANCE;


            const opacity =
              distanceOpacity *
              Math.min(
                current.opacity,
                other.opacity
              ) *
              Math.min(
                current.life,
                other.life
              );


            ctx.beginPath();


            ctx.moveTo(
              current.x,
              current.y
            );


            ctx.lineTo(
              other.x,
              other.y
            );


            ctx.strokeStyle =
              `rgba(
                            121,
                            115,
                            243,
                            ${opacity * 0.55}
                        )`;


            ctx.lineWidth =
              0.8;


            ctx.stroke();
          }
        );
      }


      /* =================================================
         DOT
      ================================================= */

      particles.forEach(
        particle => {

          const opacity =
            Math.max(
              0,
              Math.min(
                1,
                particle.opacity
              )
            );


          ctx.beginPath();


          ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );


          ctx.fillStyle =
            `rgba(
                        121,
                        115,
                        243,
                        ${opacity * 0.85}
                    )`;


          ctx.fill();
        }
      );


      /* =================================================
         DEAD PARTICLE 삭제
      ================================================= */

      for (
        let i =
          particles.length - 1;

        i >= 0;

        i--
      ) {

        if (
          particles[i].life <= 0 ||
          (
            particles[i].life < 0.5 &&
            particles[i].opacity < 0.01
          )
        ) {

          particles.splice(
            i,
            1
          );
        }
      }


      requestAnimationFrame(
        animatePlaneCursor
      );
    }


    animatePlaneCursor();
  }

});