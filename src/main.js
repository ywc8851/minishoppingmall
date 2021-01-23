// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json") // data.json에서 데이터 받아오기
    .then((response) => response.json())
    .then((json) => json.items); // 성공하면 json안의 items를 return
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  // 받아온 items를 html로 변환 : map을 이용
  container.innerHTML = items.map((item) => createHTMLString(item)).join(""); // join을 이용해서 하나의 문자열로
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
