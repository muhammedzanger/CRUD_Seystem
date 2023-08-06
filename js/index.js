let title = document.getElementById("title");
let price = document.getElementById("the-price");
let texsas = document.getElementById("texsas");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let mood = 'Create';
let tmp;

// get total
function allTotal() {
    if (+price.value != " ") {
        let result = (+price.value + +texsas.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040";
    }else{
        total.style.backgroundColor = "rgba(255, 0, 0, 0.692)";
        total.innerHTML = " ";
    };
};


// creat product
let productArr;
if(window.localStorage.product != null){
    productArr = JSON.parse(localStorage.product)
}else{
    productArr=[];
};

submit.onclick = function () {
let objProduct = {
    title:title.value.toLowerCase(),
    price:price.value,
    texsas:texsas.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
};
if (title.value != '' && price.value != '' && objProduct.count < 1000){
if (mood === 'Create') {
    if (objProduct.count > 1) {
        for (let i = 0 ; i < objProduct.count; i++){
            productArr.push(objProduct);
        }
    }else {
        productArr.push(objProduct);
    };
}else{
    productArr[tmp] = objProduct;
    mood = "Create";
    submit.innerHTML = "Create";
};
clearData();
};
// save in localstorage
window.localStorage.setItem("product",JSON.stringify(productArr));
clearData();
showData();
};

// clear inputs

function clearData () {
    title.value = '';
    price.value = '';
    texsas.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};

// show data
function showData() {
    allTotal();
    let table = '';
    for (let i = 0; i < productArr.length; i++){
        table += `
        <tr>
        <td>${[i+1]}</td>
        <td>${productArr[i].title}</td>
        <td>${productArr[i].price}</td>
        <td>${productArr[i].texsas}</td>
        <td>${productArr[i].ads}</td>
        <td>${productArr[i].discount}</td>
        <td>${productArr[i].total}</td>
        <td>${productArr[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteDate(${i})" id="delete">Delete</button></td>
        </tr>`;
    };
    let btnDelete = document.getElementById("deleteAll");
        if (productArr.length > 0) {
            btnDelete.innerHTML = `<button onclick="deleteData()"> Delete All (${productArr.length})</button>`;
            btnDelete.style.display="block";
        }else{
            btnDelete.innerHTML = "";
            btnDelete.style.display="none";
        };
        tbody.innerHTML = table;
};
showData();

// buttonDelete

function deleteDate(i){
    productArr.splice(i,1);
    window.localStorage.product = JSON.stringify(productArr);
    showData();
};

// button deleteAll

function deleteData() {
    window.localStorage.clear();
    productArr.splice(0);
    showData();
};

// update data

function updateData(i) {
    title.value = productArr[i].title;
    price.value = productArr[i].price;
    texsas.value = productArr[i].texsas;
    ads.value = productArr[i].ads;
    discount.value = productArr[i].discount;
    category.value = productArr[i].category;
    count.value = productArr[i].count;
    allTotal();
    submit.innerHTML= 'Update';
    mood = 'Update';
    tmp = i;
    scroll({
        behavior:"smooth",
        top:0,
    });
};


// search

let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById("search");
    if(id == 'search-title') {
        searchMood = 'title';
    }else{
        searchMood = 'category';
    };
    search.Placeholder = 'Search By' + searchMood;
    search.focus();
    search.value = '';
    showData();
};

function searchData(value) {
    let table = '';
    for (let i = 0 ; i < productArr.length; i++) {
        if (searchMood == 'title'){
            if(productArr[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${[i+1]}</td>
        <td>${productArr[i].title}</td>
        <td>${productArr[i].price}</td>
        <td>${productArr[i].texsas}</td>
        <td>${productArr[i].ads}</td>
        <td>${productArr[i].discount}</td>
        <td>${productArr[i].total}</td>
        <td>${productArr[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteDate(${i})" id="delete">Delete</button></td>
        </tr>`;
            };
        }else{
            if(productArr[i].category.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${[i+1]}</td>
        <td>${productArr[i].title}</td>
        <td>${productArr[i].price}</td>
        <td>${productArr[i].texsas}</td>
        <td>${productArr[i].ads}</td>
        <td>${productArr[i].discount}</td>
        <td>${productArr[i].total}</td>
        <td>${productArr[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteDate(${i})" id="delete">Delete</button></td>
        </tr>`;
            };
        };
    };
    tbody.innerHTML = table;
};