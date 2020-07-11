import View from "./View.js";

const tag = "[HistoryView]";
const HistoryView = Object.create(View);

HistoryView.setup = function (el) {
  this.init(el);
  return this;
};

HistoryView.render = function (data = []) {
  this.el.innerHTML = data.length
    ? this.getKeywordHtml(data)
    : "검색 이력이 없습니다.";
  this.bindClickEvent();
  this.show();

  return this;
};

HistoryView.getKeywordHtml = function (data) {
  return (
    data.reduce((html, item) => {
      html += `<li data-keyword="${item.keyword}">${item.keyword}<span class="date">${item.date}</span><button class="btn-remove"></button></li>`;
      return html;
    }, `<ul class="list">`) + "</ul>"
  );
};

HistoryView.bindClickEvent = function () {
  Array.from(this.el.querySelectorAll("li")).forEach((li) => {
    li.addEventListener("click", (e) => {
      this.onClickHistory(e);
    });
  });
};

HistoryView.onClickHistory = function (e) {
  const { keyword } = e.currentTarget.dataset;

  this.emit("@click", { keyword });
};

HistoryView.bindRemoveBtn = function () {
  Array.from(this.el.querySelectorAll("button.btn-remove")).forEach(
    (button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onRemove(button.parentElement.dataset.keyword);
      });
    }
  );
};

HistoryView.onRemove = function (keyword) {
  this.emit("@remove", { keyword });
};

export default HistoryView;
