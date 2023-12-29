document.querySelectorAll(`[data-change-tab]`).forEach((e) => {
  e.addEventListener("click", changeTab);
});

function changeTab(event) {
  const tabs = document.querySelectorAll(`[data-tab]`);
  let target = event.target;

  target
    .closest("ul")
    .querySelectorAll("button")
    .forEach((e) => {
      e.classList.remove("selected");
    });

  target.classList.add("selected");

  tabs.forEach((e) => {
    e.classList.remove(`active`);
    if (e.dataset.tab == target.dataset.changeTab) {
      e.classList.add(`active`);
      const event = new CustomEvent("tabChanged", {
        detail: { newTab: target.dataset.changeTab },
      });
      document.body.dispatchEvent(event);
    }
  });
}
