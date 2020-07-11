import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import TabView from "../views/TabView.js";
import SearchModel from "../models/SearchModel.js";

const tag = "[MainController]";

export default {
  init() {
    ResultView.setup(document.querySelector("#search-result"));

    TabView.setup(document.querySelector("#tabs")).on("@change", (e) =>
      this.onChangeTab(e.detail.tabName)
    );

    FormView.setup(document.querySelector("form"))
      .on("@submit", (e) => this.onSubmit(e.detail.input))
      .on("@reset", (e) => {
        this.onResetForm();
      });

    this.selectedTab = "추천 검색어";
    this.renderView();
  },

  renderView() {
    ResultView.hide();
    TabView.setActiveTab(this.selectedTab);
  },

  onSubmit(input) {
    console.log(tag, "onSubmit()", input);
    this.search(input);
  },

  search(query) {
    SearchModel.list(query).then((data) => {
      this.onSearchResult(data);
    });
  },

  onResetForm() {
    // console.log(tag, "onResetForm()"); tag를 이용한 디버깅
    ResultView.hide();
  },

  onSearchResult(data) {
    ResultView.show();
    ResultView.render(data);
  },

  onChangeTab(tabName) {
    console.log(tabName);
  },
};
