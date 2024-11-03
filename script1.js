const content = document.querySelector(".content");
const pagination = document.querySelector(".pagination-container");
// const first = document.querySelector("#first");
// const last = document.querySelector("#last");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let totalPages = 0;
let curr = 1;
const pageSize = 4;
let totalItems = 0;
let recipes = [];

function fetchData(){
    fetch('https://dummyjson.com/recipes?limit=1000')
    .then((res) => (res.json()))
    .then((data) => {
        console.log(data);
        recipes = data.recipes;
        totalItems = data.recipes.length;
        totalPages = Math.ceil(totalItems / pageSize);
        modify();
        addPagination();
    });
}

function modify(){
    const newRecipeData = recipes.slice((curr-1)*pageSize, curr*pageSize);
    showCards(newRecipeData);
    setActive();
    performTruncation();
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
    pagination.innerHTML = "";
    for(let i = 0; i < totalPages; i++){
        const page = document.createElement("button");
        page.textContent = i;
        page.classList.add("btn");
        pagination.append(page);
        pages.push(page); // or use spread --> pages = [...pages, page];
    }

    addEventListenersToPages();
    setActive();
    performTruncation();
}

function addEventListenersToPages(){
    for(let page of pages){
        page.addEventListener("click", () => {
            curr = Number(page.innerText);
            modify();
        });
    }

    prev.addEventListener("click", () => {
        if(curr > 1) curr--;
        modify();
    });
    next.addEventListener("click", () => {
        if(curr < totalPages) curr++;
        modify();
    });

}

function setActive(){
    prev.style.backgroundColor = curr === 1 ? "rgb(48, 111, 212)" : "white";
    next.style.backgroundColor = curr === totalPages ? "rgb(48, 111, 212)" : "white";
    prev.style.pointerEvents = curr === 1 ? "none" : "all";
    next.style.pointerEvents = curr === totalPages ? "none" : "all";

    // if(curr === 1){
    //     prev.style.visibility = "hidden";
    // }
    // else{
    //     prev.style.visibility = "visible";
    // }

    // if(curr === totalPages){
    //     next.style.visibility = "hidden";
    // }
    // else{
    //     next.style.visibility = "visible";
    // }
    pages.forEach((page) => {
        page.classList.remove("active")
    });
    pages[curr-1]?.classList?.add("active");
}


function performTruncation(){
    pages.forEach((page) => {
        let num = Number(page.innerText);
        let truncate = (num > 2) && (num < curr - 1 || num > curr + 1) && (num < totalPages - 1); 
        let notTruncate = (num <= 5 && curr < 5) || (num >= totalPages-4 && curr > totalPages-4); 
        let changetoDots = (num === 2 && curr > 3) || (num === totalPages - 1 && curr < totalPages - 3); 
        
        if(truncate && !notTruncate){
            page.style.display = "none";
        }
        else{
            page.style.display = "block";
        }
        if (changetoDots){
            page.classList.add("truncated");
        }
        else{
            page.classList.remove("truncated");
        }
      });
    
}

fetchData();

