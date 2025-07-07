import { getStorage, setStorage } from "./storage.js";
let wishList = getStorage("wishlist") || [];
export const wishArr = wishList
export function toggleWish(item, target) {
    const exists = wishList.some(el => el.id === item.id)
    if (exists) {
        wishList = wishList.filter(els => els.id !== item.id)
        target.classList.remove("active")
    } else {
        wishList.push(item);
        target.classList.add("active")
    }
    setStorage("wishlist", wishList)
    return !exists
}

export function wishListF() {
    return wishList
}
