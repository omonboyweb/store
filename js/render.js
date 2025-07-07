export function renderStart(rating) {
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



