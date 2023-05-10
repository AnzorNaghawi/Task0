const bookList = [];
var itemId = 0;
var displayedbooks = [];
// -----
function AddBook(){
    console.log("OPENING DIALOG");
    document.getElementById("backdrop").style.display ="flex";
    document.getElementById('add-modal').style.display ="flex"; // get by id DONE

}

function AddBook_end(Action){
    // TODO: Clear input on close DONE
    // READ ABOUT VAT vs LET (Hoisting, Scopes, etc..)
    // Validate and sanitize inputs
    var title= document.getElementById("title");
    var imgurl= document.getElementById('image-url');
    var rating= document.getElementById('rating');
    if(Action === 'Ok'){
        console.log("ADDED");
        console.log(title, imgurl, rating);
        generateBookObject(title.value, imgurl.value, rating.value)
        document.getElementById('entry-text').style.display = "none";
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
            li.setAttribute("onclick","deletebook(this)")
            li.setAttribute("id", itemId)
            console.log(bookList)
            li.innerHTML = ("<div class=\"book-element__image\">" +
                            "<img src=\"" + book.url + "\">" +
                            "</div>" +
                            "<div class=\"book-element__info\">" +
                            "<h2>" + book.title + "</h2>" + 
                            "<p> rating" + book.rating + "/5 </p>" +
                            "</div>")
        }
        else{
            console.log(book.id + "ALREADY EXISTS")
        }
    });
}

function reDisplayBooks(){
    var ul = document.getElementById("book-list");
    displayedbooks = []
    console.log("DISPLAYED BOOKS" + displayedbooks);
    ul.innerHTML = ""
    displayBook()
}


function deletebook(book){
    book.style.display = "none";
    console.log(book.id, book.title, book.rating)
    bookList.splice(bookList.indexOf(book.id)-1, 1)
    console.log(bookList)
    if ( bookList.length === 0){
        document.getElementById('entry-text').style.display = "flex";
    }
}

function ShowDropDown(){
    document.getElementById("DropDown"). hidden = document.getElementById("DropDown"). hidden == false ? true:false;
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