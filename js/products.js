import { getData } from "./api.js";
const productItems = document.querySelector(".itemsPro1");
const productItems2 = document.querySelector(".itemsPro");
const main = document.querySelector(".main")
const wishAc = document.querySelector(".wishAc")
let wishList = getStorage("wishlist") || [];
function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getStorage(key) {
  const getStorD = JSON.parse(localStorage.getItem(key))
  return getStorD
}












function setData(container, data) {
  container.innerHTML = data.products.map((item) => {
    return `
                <a class="card-link" href="#">
                  <div class="products__card card">
                    <div class="card__top">
                      <div class="card__stars">
                       ${renderStart(item.rating)}
                        <span class="card__rates">${item.stock}</span>
                      </div>
                      <div class="card__like wishBtn">
                        <span class="wishAc">
                          <svg  data-id="${item.id}" data-path="products"   width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.5 4C4.4625 4 2 6.4625 2 9.5C2 15 8.5 20 12 21.163C15.5 20 22 15 22 9.5C22 6.4625 19.5375 4 16.5 4C14.64 4 12.995 4.9235 12 6.337C11.4928 5.6146 10.8191 5.02505 10.0358 4.61824C9.25245 4.21144 8.38265 3.99938 7.5 4Z" stroke="inherit" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
</svg>
                        </span>
                        <span>
                          <img
                            src="./imgs/icons/filter-icon.svg"
                            alt="You can add or remove product"
                            loading="lazy"
                          />
                        </span>
                      </div>
                    </div>
                    <div class="card__data">
                      <picture class="img-wrap">
                        <img class="imgSize"
                          src="${item.thumbnail}"
                          alt="${item.description}"
                          loading="lazy"
                        />
                      </picture>
                      <span class="card__name"
                        >${item.title}</span
                      >
                    </div>
                    <div class="card__status">
                      <span class="status">
                        <span class="status-color"> </span> Есть в наличии
                      </span>
                      <span class="card__period">${item.warrantyInformation}</span>
                    </div>
                    <div class="card__cost">
                      <span class="old-cost">${item.price} ₽</span>
                      <span class="now-cost">${item.discountPercentage} ₽</span>
                      <span class="add-basket primary">
                        <span class="now__cost-btn">137 900 ₽</span>
                        <span class="basket-status">
                          <img
                            src="./imgs/icons/add-icon.svg"
                            alt="Product status added or ad"
                          />
                        </span>
                        <span class="btn-text">в корзине</span>
                      </span>
                    </div>
                    <div class="card__bottom">
                      <span class="cheeper">Хочу дешевле</span>
                      <span class="one-click">Купить в 1 клик</span>
                    </div>
                  </div>
                </a>
        
        `;

  }).join("");

};

export const getPro = async (way) => {
  try {
    const get = await getData(way);
    setData(productItems, get);
    setData(productItems2, get);
    return get;
  } catch (error) {
    console.log(error);
  }
};
getPro("products");


function renderStart(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      html += ` <img src="./imgs/icons/star-icon.svg" alt="Star" loading="lazy" />`
    } else if (i - rating <= 0.5) {
      html += `
            <img src="./imgs/icons/half-start.svg" alt="Half Star" loading="lazy" />
          `;
    } else {
      html += `
            <img src="./imgs/icons/notCheked-star-icon.svg.svg" alt="Empty Star" loading="lazy" />
          `;
    }
  }
  return html
};

main.addEventListener("click", async (e) => {
  if (!e.target.classList == "wishBtn") return;
  const id = e.target.dataset.id;
  const path = e.target.dataset.path;
  if (id) {
    const productId = await getData(path, id);
    const similar = wishList.some(someId => someId.id === productId.id)
    if (similar) {
      wishList = wishList.filter(item => item.id !== productId.id)
      document.querySelector(".wishAc")?.classList.remove("heartAc");
    } else {
      wishList.push(productId)
      document.querySelector(".wishAc")?.classList.add("heartAc");
    }
  }
  setStorage("wishList", wishList)
});
