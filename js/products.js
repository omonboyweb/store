import { getData } from "./api.js"
import { toggleWish, wishListF, wishArr } from "./wishList.js";
import { renderStart } from "./render.js";

const productItems = document.querySelector(".itemsPro1");
const productItems2 = document.querySelector(".itemsPro");
const main = document.querySelector(".main")
const wishListId = new Set((wishArr).map(x => x.id));

function setData(container, data) {

  container.innerHTML = data.products.map((item) => {
    const wishAds = wishListId.has(item.id)
    return `


<a class="card-link" href="#">
  <div class="products__card card">
    <div class="card__top">
      <div class="card__stars">
        ${renderStart(item.rating)}
        <span class="card__rates">${item.stock}</span>
      </div>
      <div class="card__like">
        <button class="wishBtn">

          <svg class="wishAc  ${wishAds ? " active" : ""}" data-id="${item.id}" data-path="products" width="24"
            height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <path
              d="M7.5 4C4.4625 4 2 6.4625 2 9.5C2 15 8.5 20 12 21.163C15.5 20 22 15 22 9.5C22 6.4625 19.5375 4 16.5 4C14.64 4 12.995 4.9235 12 6.337C11.4928 5.6146 10.8191 5.02505 10.0358 4.61824C9.25245 4.21144 8.38265 3.99938 7.5 4Z"
              stroke="red" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <span>
          <img src="./imgs/icons/filter-icon.svg" alt="You can add or remove product" loading="lazy" />
        </span>
      </div>
    </div>
    <div class="card__data">
      <picture class="img-wrap">
        <img class="imgSize" src="${item.thumbnail}" alt="${item.description}" loading="lazy" />
      </picture>
      <span class="card__name">${item.title}</span>
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
        <span class="now__cost-btn">${item.discountPercentage} ₽</span>
        <span class="basket-status">
          <img src="./imgs/icons/add-icon.svg" alt="Product status added or ad" />
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

main.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("wishAc")) return;
  const id = e.target.dataset.id;
  const path = e.target.dataset.path;
  if (id) {
    const productId = await getData(path, id);
    toggleWish(productId, e.target)
  }
  wishListF()
});
