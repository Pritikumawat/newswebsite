const url = "https://newsapi.org/v2/everything?q=";
const API_KEY = "2a956d3c39d6406bb8f52ff281c7a20c";
window.addEventListener("load", () => fetchNews("India"));
function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url} ${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
function bindData(articles) {
    const cardsContainer = document.getElementById("card-container");
    const newsCardtemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardtemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillData(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-content');
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "asia/jakarta" });
    newsSource.innerHTML = `${article.source.name} ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

function onNavItemClick(id) {
    fetchNews(id);
}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
}
)