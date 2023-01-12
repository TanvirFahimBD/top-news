// get dom Element
const categoriesContainer = document.getElementById("categories");
const categories = document.getElementsByClassName("single-category");

// load all categories
const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  showCategories(data.data.news_category);
};
loadCategory();

// show categories
function showCategories(allNews) {
  allNews.forEach((news) => {
    const p = document.createElement("p");
    p.classList.add("m-4");
    p.classList.add("single-category");
    p.innerText = news.category_name;
    categoriesContainer.appendChild(p);
  });
}

// single category click load data
// categories.addEventListener("click", function (e) {
//   console.log(e);
// });

// https://openapi.programming-hero.com/api/news/category/{category_id}
