import View from "./View.js";

const tag = "[FormView]";

const FormView = Object.create(View);

FormView.setup = function (el) {
  this.init(el);
  this.inputEl = el.querySelector("[type=text]");
  this.resetEl = el.querySelector("[type=reset]");
  this.showResetBtn(false);
  this.bindEvents();

  return this;
};

FormView.showResetBtn = function (show = true) {
  this.resetEl.style.display = show ? "block" : "none";
};

FormView.bindEvents = function () {
  this.on("submit", (e) => {
    e.preventDefault();
    // form에서 인풋이 하나일때 enter눌리면 submit됨
    // form의 기본 submit액션을 prevent
  });

  this.inputEl.addEventListener("keyup", (e) => {
    this.onKeyup(e);
  });

  this.resetEl.addEventListener("click", (e) => {
    this.onClickReset();
  });
};

FormView.onKeyup = function (e) {
  const enter = 13;
  this.showResetBtn(this.inputEl.value.length);

  if (this.inputEl.value.length === 0) {
    this.emit("@reset");
  }

  if (e.keyCode !== enter) return;
  // 검색 결과를 직접 보여주지는 않는데 controller에 알려줘야 함
  this.emit("@submit", { input: this.inputEl.value });
};

FormView.onClickReset = function () {
  this.showResetBtn(false);
  this.emit("@reset");
};

export default FormView;
