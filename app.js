const library = []
const bookcase = document.getElementById("bookcase")
const addBook = document.getElementById("add-book")
const bookForm = document.getElementById("book-form")
const submitBtn = document.getElementById("submit")
const form = document.getElementById("form")
const errorMessageInfo = document.getElementById("missing-info")
const errorMessageType = document.getElementById("invalid-type")

// Book object constructor
function Book(title, author, pages, genres, read, rating, cover) {
     if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
    this.title = title
    this.author = author
    this.pages = pages
    this.genres = genres
    this.read = read
    this.rating = rating
    this.cover = cover
    this.id = crypto.randomUUID()
}

// Add book to library array
function addBookToLibrary(title, author, pages, genres, read, rating, cover) {
    const newBook = new Book(title, author, pages, genres, read, rating, cover)
    library.push(newBook)
}

// Add book to display
function addBookToCase(element) {
    // Creating elements
    const book = document.createElement("div")
    const bookCover = document.createElement("div")
    const bookImage = document.createElement("img")
    const bookAuthor = document.createElement("p")
    const bookTitle = document.createElement("p")
    const genreList = document.createElement("ul")
    const readStatus = document.createElement("span")
    const read = document.createElement("svg")
    const notRead = document.createElement("svg")
    const rating = document.createElement("span")
    const pageCount = document.createElement("span")
    // Classes
    book.className = "book removable"
    bookCover.className = "book-cover"
    bookImage.className = "hasCover"
    genreList.className = "genre-list"
    readStatus.className = "read-status"
    rating.className = "rating"
    pageCount.className = "page-count"
    bookAuthor.className = "book-author"
    bookTitle.className = "book-title"
    // IDs
    read.id = "read"
    notRead.id = "not-read"
    // Other 
    read.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Read</title><path d="M23.5,17L18.5,22L15,18.5L16.5,17L18.5,19L22,15.5L23.5,17M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,17C12.5,17 12.97,16.93 13.42,16.79C13.15,17.5 13,18.22 13,19V19.45L12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5C17,4.5 21.27,7.61 23,12C22.75,12.64 22.44,13.26 22.08,13.85C21.18,13.31 20.12,13 19,13C18.22,13 17.5,13.15 16.79,13.42C16.93,12.97 17,12.5 17,12A5,5 0 0,0 12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17Z" /></svg>'
    notRead.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Not read</title><path d="M22.54 16.88L20.41 19L22.54 21.12L21.12 22.54L19 20.41L16.88 22.54L15.47 21.12L17.59 19L15.47 16.88L16.88 15.47L19 17.59L21.12 15.47L22.54 16.88M12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9M12 17C9.24 17 7 14.76 7 12S9.24 7 12 7 17 9.24 17 12C17 12.5 16.9 13 16.77 13.43C17.46 13.16 18.21 13 19 13C20.12 13 21.17 13.32 22.07 13.85C22.43 13.27 22.74 12.65 23 12C21.27 7.61 17 4.5 12 4.5S2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C12.35 19.5 12.69 19.5 13.03 19.45C13 19.3 13 19.15 13 19C13 18.21 13.16 17.46 13.43 16.77C13 16.9 12.5 17 12 17Z" /></svg>'
    bookImage.src = element.cover
    // Appending bookCover elements
    element.genres.forEach((e)=>{
        const genreItem = document.createElement("li")
        genreItem.className = "genre"
        genreItem.append(String(e).toUpperCase())
        genreList.append(genreItem)
    })
    if (element.read == "Read") {
        readStatus.append(read)
    }
    else {
        readStatus.append(notRead)
    }
    if (element.rating !== "None") {
        rating.append(element.rating) 
    }
    pageCount.append(element.pages) 
    // Appending book elements
    bookCover.append(bookImage,genreList, readStatus, rating, pageCount)
    bookAuthor.append(element.author)
    bookTitle.append(element.title)
    book.append(bookCover, bookAuthor, bookTitle)
    bookcase.prepend(book)
}

// Add book screen button
addBook.addEventListener("click", () => {
    bookForm.style.display = "flex"
})

// Cancel button
document.getElementById("cancel").addEventListener("click", () => {
    bookForm.style.display = "none"
    errorMessageInfo.style.display = "none"
    errorMessageType.style.display = "none"
    form.reset()
})

// Add book to display button
submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const objectData = Object.fromEntries(formData)
    if (objectData.title == "" || objectData.author == "") {
        errorMessageInfo.style.display = "inline"
        return
    }
    else if (objectData.cover.type.slice(0,5) !== "image") {
        errorMessageType.style.display = "inline"
        return
    }
    else {
        document.querySelectorAll(".removable").forEach((btn)=>{
        bookcase.removeChild(btn)
    })
        errorMessageInfo.style.display = "none"
        errorMessageType.style.display = "none"
        bookForm.style.display = "none"
        const genreString = objectData.genres.split(",")
        // Book cover handling
        const file = objectData.cover
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener("load", ()=>{
            const imageURL = reader.result
            addBookToLibrary(objectData.title, objectData.author, objectData.pages, genreString, objectData.readS, objectData.rating, imageURL)
            library.forEach(addBookToCase)
        })
        form.reset()
    }
})
