// 获取左右按钮和图片列表
let oLeft = document.querySelector(".left");
let oRight = document.querySelector(".right");
let oImgList = document.querySelector(".img-list");

// 克隆第一张图片
let clonefirstImg = oImgList.firstElementChild.cloneNode();
// 将第一张图片添加至图片列表的末尾
oImgList.appendChild(clonefirstImg);

// 图片索引 代表当前是第几张图片  index:0代表第一张图片
let index = 0;

// 设置函数节流锁
let lock = true;
function handleRightBtn() {
  if (!lock) return;
  index++;
  oImgList.style.left = index * -900 + "px";
  // 为什么要加过渡? 因为切换到了最后一张假图时会将过渡去掉
  oImgList.style.transition = "0.5s ease";

  if (index === 7) {
    index = 0;
    setTimeout(() => {
      oImgList.style.left = 0;
      // 取消过渡 500毫秒之后切换第一张
      oImgList.style.transition = "none";
    }, 500);
  }

  // 设置小圆点的高亮
  setCircles();
  // 关锁
  lock = false;
  setTimeout(() => {
    lock = true;
  }, 500);
}

// 右按钮的实现
oRight.addEventListener("click", handleRightBtn);

// 左按钮的实现  瞬间切换到假图然后拉到真实最后一张图片
oLeft.addEventListener("click", () => {
  if (!lock) return;
  index--;
  if (index === -1) {
    oImgList.style.left = 7 * -900 + "px";
    oImgList.style.transition = "none";
    index = 6;
    setTimeout(() => {
      oImgList.style.left = index * -900 + "px";
      oImgList.style.transition = "0.5s ease";
    }, 0);
  } else {
    oImgList.style.left = index * -900 + "px";
  }

  // 设置小圆点的高亮
  setCircles();

  lock = false;
  setTimeout(() => {
    lock = true;
  }, 500);
});

// 获取五个小圆点
const circles = document.querySelectorAll(".circle");

// 小圆点高亮的显示
function setCircles() {
  for (let i = 0; i < circles.length; i++) {
    if (i === index) {
      circles[i].classList.add("active");
    } else {
      circles[i].classList.remove("active");
    }
  }
}

// 小圆点点击切换图片 使用事件代理
const oCircle = document.querySelector(".circle-list");
oCircle.addEventListener("click", (e) => {
  // 当我点击小圆点的时候
  if (e.target.nodeName.toLowerCase() === "li") {
    // 当前元素的data-n对应得值 和index一一对应
    const n = Number(e.target.getAttribute("data-n"));
    index = n;
    setCircles();
    oImgList.style.transition = "0.5s ease";
    oImgList.style.left = index * -900 + "px";
  }
});

// 自动轮播
let autoplay = setInterval(handleRightBtn, 2000);
const oWrap = document.getElementById("wrap");
// 移入停止轮播
oWrap.addEventListener("mouseenter", () => {
  clearInterval(autoplay);
});
// 移出继续轮播
oWrap.addEventListener("mouseleave", () => {
  // 设表先关
  clearInterval(autoplay);
  autoplay = setInterval(handleRightBtn, 2000);
});