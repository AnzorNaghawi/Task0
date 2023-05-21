const bookList = [];
var itemId = 0;
var titleval = false;
var imgval = false;
var ratingval = false;
var displayedbooks = [];
var displayedbooksnum = 0;
const title= document.getElementById("title");
const imgurl= document.getElementById('image-url');
const rating= document.getElementById('rating');
const format =  /[!@#$%^&*()_+\-=\[\]{};'"\|,<>\/?]/g;
title.addEventListener("change",function(){
    if(format.test(title.value)){
        document.getElementById('title-validate').hidden=false;
        console.log('in true');
        titleval = false;
        return;
    }
    else
    {
        titleval = true;
        document.getElementById('title-validate').hidden=true;
    }
})
imgurl.addEventListener("change",function(){
    if(format.test(imgurl   .value)){
        document.getElementById('image-validate').hidden=false;
        console.log('in true');
        imgval = false;
        return;
    }
    else
    {
        imgval = true;
        document.getElementById('image-validate').hidden=true;
    }
})
rating.addEventListener("change",function(){
    if(!(rating.value <= 5 && rating.value >= 1)){
        document.getElementById('rating-validate').hidden=false;
        console.log('in true');
        ratingval = false;
        return;
    }
    else
    {
        ratingval=true;
        document.getElementById('rating-validate').hidden=true;
    }
})

function AddBook(){
    console.log("OPENING DIALOG");
    document.getElementById("backdrop").style.display ="flex";
    document.getElementById('add-modal').style.display ="flex"; // get by id DONE

}

function AddBook_end(Action){
    // TODO: Clear input on close DONE
    // READ ABOUT VAT vs LET (Hoisting, Scopes, etc..) 
    // Validate and sanitize inputs Done
    if(Action === 'Ok'){
        if(!(ratingval && imgval && titleval)){
            return;
        }
        console.log("ADDED");
        console.log(title, imgurl, rating);
        generateBookObject(title.value, imgurl.value, rating.value)
        document.getElementById('entry-text').style.display = "none";
        ratingval = imgval = titleval = false;

    }
    title.value='';
    imgurl.value='';
    rating.value='';
    console.log("CLOSING DIALOG");
    document.getElementById("backdrop").style.display ="none";
    document.getElementById('add-modal').style.display ="none";
}

function generateBookObject(titleValue, urlValue, ratingValue){
    const newItem = { id: itemId++, title: titleValue, url: urlValue, rating: ratingValue }
    bookList.push(newItem)
    displayBook()
}

function displayBook(){
    bookList.forEach((book) => {

        if(!(displayedbooks.includes(book.id))){
            console.log(book.id + "ADDED")
            displayedbooks.push(book.id)
            const ul = document.getElementById('book-list');
            const li = document.createElement('li');
            ul.appendChild(li);
            li.classList.add('book-element')
            li.setAttribute("onclick","deleteprompt(this)")
            li.setAttribute("id", itemId)
            console.log(bookList)
            li.innerHTML = ("<div class=\"book-element__image\">" +
                            "<img src=\"" + book.url + "\">" +
                            "</div>" +
                            "<div class=\"book-element__info\">" +
                            "<h2>" + book.title + "</h2>" + 
                            "<p>" + book.rating + "/5 </p>" +
                            "</div>")
        }
        else{
            console.log(book.id + "ALREADY EXISTS")
        }
    });
    paginate();
}

function paginate(){
    const ul = document.getElementById('book-list');
    const pagelist = document.getElementById('pagelist');
    var pagecount =  Math.ceil(ul.children.length / 3);
    for (var i = 1; i <= pagecount; i++) {
        if(pagelist.children.length >= i)
            continue;
        var li = document.createElement("li");
        li.innerHTML = i;
        li.setAttribute("onclick","showpage(parseInt(this.innerHTML))")
        pagelist.appendChild(li);
    }
    showpage(1);
}

function showpage(num){
    var start = (num-1)*3;
    var end = start + 3;
    ul = document.getElementById('book-list');
    for(var i = 0; i < ul.children.length; i ++){
        ul.children[i].style.display = 'none';
    }
    for(var i = start; i < end && i < ul.children.length; i++){
        ul.children[i].style.display = 'block';
    }
    pagelist = document.getElementById('pagelist');
    for(var i = 0; i < pagelist.children.length; i++){
        pagelist.children[i].classList = 'inactive';
    }
    pagelist.children[num-1].classlist = 'active';
}

function reDisplayBooks(){
    var ul = document.getElementById("book-list");
    displayedbooks = []
    console.log("DISPLAYED BOOKS" + displayedbooks);
    ul.innerHTML = ""
    displayBook()
}

function deleteprompt(book){
    if (document.getElementById('delete-modal').style.display=="none" || document.getElementById('delete-modal').hidden == true){
        document.getElementById('delete-modal').style.display="block";
        document.getElementById('delete-modal').hidden = false
        document.getElementById('promptdeleteyes').id = book.id*-1
    } 
    else{
        document.getElementById('delete-modal').style.display="none";    
        document.getElementById('delete-modal').hidden = true
    }
}

function deletebook(book){
    document.getElementById('delete-modal').style.display="none";  
    console.log(book.id, book.title, book.rating)
    document.getElementById(book.id*-1).style.display="none";
    bookList.splice(bookList.indexOf(book.id*-1)-1, 1)
    console.log(bookList)
    if ( bookList.length === 0){
        document.getElementById('entry-text').style.display = "flex";
    }
    document.getElementById(book.id).id = 'promptdeleteyes';  

}

function ShowDropDown(){
    document.getElementById("DropDown"). hidden = document.getElementById("DropDown"). hidden == false ? true:false;
}
function ShowDropDown1(){
    document.getElementById("DropDown1"). hidden = document.getElementById("DropDown"). hidden == false ? true:false;
}
function ShowDropDownR(){
    document.getElementById("DropDownR"). hidden = document.getElementById("DropDown"). hidden == false ? true:false;
}
function sort(param){
    switch(param){
        case "title":{
            bookList.sort((a, b) => a.title.localeCompare(b.title));
            console.log(bookList);
            reDisplayBooks();
            break;
        }
        case "rating": {
            bookList.sort((a, b) => a.rating.localeCompare(b.rating)); 
            console.log(bookList);
            reDisplayBooks();
            break;
        }
        default: {
            bookList.sort((a, b) => a.id.localeCompare(b.id)); 
            console.log(bookList);
            reDisplayBooks();
            break;
        }
    }
}

function filterR(num){
    ul = document.getElementById('book-list');
    for(var i = 0; i < ul.children.length; i ++){
        console.log(ul.children[i].id)
        if(bookList[ul.children[i].id-1].rating != num){
            ul.children[i].style.display = 'none';
        }
        else{
            ul.children[i].style.display = 'block';
        }
    }
}
function filter(){
    ul = document.getElementById('book-list');
    var title=document.getElementById('searchtitleInput').value;
    for(var i = 0; i < ul.children.length; i ++){
        console.log(ul.children[i].id)
        if(bookList[ul.children[i].id-1].title != title){
            ul.children[i].style.display = 'none';
        }
        else{
            ul.children[i].style.display = 'block';
        }
    }
}