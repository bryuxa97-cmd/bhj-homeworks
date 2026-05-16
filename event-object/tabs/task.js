const tabsBlocks = Array.from(document.querySelectorAll('.tabs'));

tabsBlocks.forEach((tabsBlock) => {
  const tabs = Array.from(tabsBlock.querySelectorAll('.tab__navigation .tab'));
  const contents = Array.from(tabsBlock.querySelectorAll('.tab__contents .tab__content'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = tabs.indexOf(tab);

      tabs.forEach((tabItem) => tabItem.classList.remove('tab_active'));
      contents.forEach((contentItem) => contentItem.classList.remove('tab__content_active'));

      tab.classList.add('tab_active');
      contents[index].classList.add('tab__content_active');
    });
  });
});
