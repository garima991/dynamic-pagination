const content = document.querySelector(".content");
const pagination = document.querySelector(".pagination-container");
// const first = document.querySelector("#first");
// const last = document.querySelector("#last");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let totalPages = 0;
let curr = 1;
const pageSize = 8;
let totalItems = 0;
let recipes = [];

function fetchData(){
    fetch('https://dummyjson.com/recipes?limit=1000')
    .then((res) => (res.json()))
    .then((data) => {
        console.log(data);
        recipes = data.recipes;
        totalItems = data.total;
        totalPages = Math.ceil(totalItems / pageSize);
        modify();
        addPagination();
    });
}

function modify(data){
    const newRecipeData = recipes.slice((curr-1)*pageSize, curr*pageSize);
    showCards(newRecipeData);
    setActive();
}

function showCards(recipes) {
    content.innerHTML = ""; 
    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
        img.src = recipe.image;
        card.innerHTML = recipe.name; 
        card.append(img);
        content.append(card);
    });
}

let pages = [];

function addPagination(){
    for(let i = 1; i <= totalPages; i++){
        const page = document.createElement("button");
        page.textContent = i;
        page.classList.add("btn");
        pagination.append(page);
        pages.push(page); // or use spread --> pages = [...pages, page];
    }

    addEventListenersToPages();
    // setActive();
}

function addEventListenersToPages(){
    for(let page of pages){
        page.addEventListener("click", () => {
            curr = page.innerText;
            modify();
        });
    }

    prev.addEventListener("click", (event) => {
        if(curr > 1) curr--;
        modify();
    });
    next.addEventListener("click", (event) => {
        if(curr < totalPages) curr++;
        modify();
    });

}

function setActive(){
    pages.forEach((page) => {
        if(curr === Number(page.innerText))
            page.classList.add("active");
        else
            page.classList.remove("active");
    });
}

fetchData();

