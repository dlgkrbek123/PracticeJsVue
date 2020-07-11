import View from "./View.js";

const tag = "[ResultView]";
const ResultView = Object.create(View);

ResultView.setup = function (el) {
  this.init(el);

  return this;
};

ResultView.render = function (data = []) {
  // 서버에서 받은 데이터를 이용해서 dom을 그려준다.
  this.el.innerHTML = data.length
    ? this.getSearchResultsHtml(data)
    : "검색 결과가 없습니다.";
};

ResultView.getSearchResultsHtml = function (data) {
  // debugger; 디버거 키워드로 브레이크 포인트를 걸 수 있다 !!

  return (
    data.reduce((html, item) => {
      html += this.getSearchItemHtml(item);
      return html;
    }, "<ul>") + "</ul>"
  );
};

ResultView.getSearchItemHtml = function (item) {
  return `<li><img src=${item.image} /><p>${item.name}</p></li>`;
};

export default ResultView;
