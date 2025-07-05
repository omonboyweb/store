const BASE_URL = 'https://dummyjson.com';

export const getData = async (way, id) => {
    try {
        const res = await fetch(`${BASE_URL}/${way}${id ? `/${id}` : ""}`)
        const data = await res.json();
        return data
    } catch (error) {
        console.log("error");

    }
}
