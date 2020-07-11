import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import TabView from "../views/TabView.js";
import KeywordView from "../views/KeywordView.js";
import HistoryView from "../views/HistoryView.js";

import SearchModel from "../models/SearchModel.js";
import KeywordModel from "../models/KeywordModel.js";
import HistoryModel from "../models/HistoryModel.js";

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

    KeywordView.setup(document.querySelector("#search-keyword")).on(
      "@click",
      (e) => {
        this.onClickKeyword(e.detail.keyword);
      }
    );

    HistoryView.setup(document.querySelector("#search-history"))
      .on("@click", (e) => this.onClickHistory(e.detail.keyword))
      .on("@remove", (e) => this.onRemoveHistory(e.detail.keyword));

    this.selectedTab = "추천 검색어";
    this.renderView();
  },

  renderView() {
    TabView.setActiveTab(this.selectedTab);
    TabView.show();
    ResultView.hide();
    KeywordView.hide();
    HistoryView.hide();

    if (this.selectedTab === "추천 검색어") {
      this.fetchSearchKeyword();
    } else {
      this.fetchSearchHistory();
    }
  },

  fetchSearchKeyword() {
    KeywordModel.list().then((data) => {
      KeywordView.render(data);
    });
  },

  fetchSearchHistory() {
    HistoryModel.list().then((data) => {
      HistoryView.render(data).bindRemoveBtn();
    });
  },

  onSubmit(input) {
    this.search(input);
  },

  search(query) {
    FormView.setValue(query);
    HistoryModel.add(query);
    SearchModel.list(query).then((data) => {
      this.onSearchResult(data);
    });
  },

  onResetForm() {
    // console.log(tag, "onResetForm()"); tag를 이용한 디버깅
    this.renderView();
  },

  onSearchResult(data) {
    TabView.hide();
    KeywordView.hide();
    HistoryView.hide();
    ResultView.show();
    ResultView.render(data);
  },

  onChangeTab(tabName) {
    this.selectedTab = tabName;
    this.renderView();
  },

  onClickKeyword(keyword) {
    this.search(keyword);
  },

  onClickHistory(history) {
    this.search(history);
  },

  onRemoveHistory(keyword) {
    HistoryModel.remove(keyword);
    this.renderView();
  },
};
