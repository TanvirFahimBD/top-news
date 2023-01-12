// get dom Element
const categoriesContainer = document.getElementById("categories");
const categories = document.getElementsByClassName("single-category");
const newsContainer = document.getElementById("news-container");

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
    p.innerHTML = `
        <p class="m-4 single-category" >${news.category_name}</p>        
    `;
    p.addEventListener("click", (e) => {
      loadSingleCategoryData(news.category_id);
    });
    categoriesContainer.appendChild(p);
  });
}

// load single category data after clicking
const loadSingleCategoryData = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();
  showSingleCategoryNews(data.data);
};

//showSingleCategoryNews
function showSingleCategoryNews(categoryAllNews) {
  newsContainer.innerHTML = "";
  //   iterate all news single category
  categoryAllNews.forEach((singleNews) => {
    // create single news div & append with news container
    const div = document.createElement("div");
    div.classList.add("w-100");
    div.classList.add("single-news");
    div.innerHTML = `    
    <div class="card mb-3 p-3" style="max-width: 100vw;">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${
              singleNews.thumbnail_url
            }" class="rounded-start" alt="..." height="300px" width="300px">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${singleNews.title}</h5>
                <p class="card-text">${singleNews.details.slice(0, 500)}</p>
                <p class="card-text">${singleNews.details.slice(
                  500,
                  700
                )}...</p>
                <div class='d-flex justify-content-between align-items-center'>
                    <div>
                        <img src="${
                          singleNews.author.img
                        }" class="rounded-pill" alt="..."  height="50px" width="50px">
                        <span class="text-muted mx-2">${
                          singleNews.author.name
                            ? singleNews.author.name
                            : "Author"
                        }</span>
                    </div>
                    <div class="text-muted">👁${
                      singleNews.total_view ? singleNews.total_view : 0
                    }
                    </div>
                    <div class="text-muted">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details👉</button>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${
                              singleNews.title
                            }</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <p>Published: ${
                          singleNews.author.published_date?.split(" ")[0]
                        }</p>
                        <p>Rating: ${singleNews.rating.number}</p>
                          <p class="card-text">${singleNews.details}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
    newsContainer.appendChild(div);
  });
}
