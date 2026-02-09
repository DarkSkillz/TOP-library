const library = []
const currentEdit = []
const bookcase = document.getElementById("bookcase")
const addBook = document.getElementById("add-book")
const bookForm = document.getElementById("book-form")
const submitBtn = document.getElementById("submit-add")
const changeBtn = document.getElementById("submit-change")
const form = document.getElementById("form")
const errorMessageInfo = document.getElementById("missing-info")
const errorMessageType = document.getElementById("invalid-type")
const removeBookBtn = document.querySelector(".remove-book")

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
    const removeBook = document.createElement("svg")
    const editBook = document.createElement("svg")
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
    removeBook.className = "remove-book"
    editBook.className = "edit-book"
    bookCover.className = "book-cover"
    bookImage.className = "hasCover"
    genreList.className = "genre-list"
    readStatus.className = "read-status"
    rating.className = "rating"
    pageCount.className = "page-count"
    bookAuthor.className = "book-author"
    bookTitle.className = "book-title"
    // IDs
    removeBook.id = element.id
    editBook.id = element.id
    read.id = "read"
    notRead.id = "not-read"
    // Other 
    read.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Read</title><path d="M23.5,17L18.5,22L15,18.5L16.5,17L18.5,19L22,15.5L23.5,17M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,17C12.5,17 12.97,16.93 13.42,16.79C13.15,17.5 13,18.22 13,19V19.45L12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5C17,4.5 21.27,7.61 23,12C22.75,12.64 22.44,13.26 22.08,13.85C21.18,13.31 20.12,13 19,13C18.22,13 17.5,13.15 16.79,13.42C16.93,12.97 17,12.5 17,12A5,5 0 0,0 12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17Z" /></svg>'
    notRead.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Not read</title><path d="M22.54 16.88L20.41 19L22.54 21.12L21.12 22.54L19 20.41L16.88 22.54L15.47 21.12L17.59 19L15.47 16.88L16.88 15.47L19 17.59L21.12 15.47L22.54 16.88M12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9M12 17C9.24 17 7 14.76 7 12S9.24 7 12 7 17 9.24 17 12C17 12.5 16.9 13 16.77 13.43C17.46 13.16 18.21 13 19 13C20.12 13 21.17 13.32 22.07 13.85C22.43 13.27 22.74 12.65 23 12C21.27 7.61 17 4.5 12 4.5S2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C12.35 19.5 12.69 19.5 13.03 19.45C13 19.3 13 19.15 13 19C13 18.21 13.16 17.46 13.43 16.77C13 16.9 12.5 17 12 17Z" /></svg>'
    removeBook.innerHTML =  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Remove book</title><path d="M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M22.54 16.88L21.12 15.47L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88Z" /></svg>'
    editBook.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Edit book</title><path d="M19.39 10.74L11 19.13V22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V10.3C19.78 10.42 19.57 10.56 19.39 10.74M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47Z" /></svg>'
    if (element.cover == undefined) {
        bookImage.src = "default.png"
    } 
    else {
        bookImage.src = element.cover
    }
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
    book.append(removeBook, editBook, bookCover, bookAuthor, bookTitle)
    bookcase.prepend(book)
    // Remove book from library
    removeBook.addEventListener("click",(e)=>{
        const bookID = e.currentTarget.id
        const index = library.findIndex(item => item.id == bookID)
        library.splice(index, 1)
        document.querySelectorAll(".removable").forEach((e)=>{
        bookcase.removeChild(e)
    })
        library.forEach(addBookToCase)
    })
    // Edit book 
    editBook.addEventListener("click", (e)=>{
        bookForm.style.display = "flex"
        changeBtn.style.display = "inline"
        submitBtn.style.display = "none"
        errorMessageInfo.style.display = "none"
        errorMessageType.style.display = "none"
        const bookID = e.currentTarget.id
        currentEdit.splice(0,1)
        currentEdit.push(bookID)
})
}

// Add book screen button
addBook.addEventListener("click", () => {
    bookForm.style.display = "flex"
    changeBtn.style.display = "none"
    submitBtn.style.display = "inline"
    errorMessageInfo.style.display = "none"
    errorMessageType.style.display = "none"
})

// Cancel button
document.getElementById("cancel").addEventListener("click", () => {
    bookForm.style.display = "none"
    errorMessageInfo.style.display = "none"
    errorMessageType.style.display = "none"
    changeBtn.style.display = "none"
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
    else if (objectData.cover.name !== "" && objectData.cover.type.slice(0,5) !== "image") {
        errorMessageType.style.display = "inline"
        return
    }
    else {
        document.querySelectorAll(".removable").forEach((e)=>{
        bookcase.removeChild(e)
    })
        errorMessageInfo.style.display = "none"
        errorMessageType.style.display = "none"
        bookForm.style.display = "none"
        const genreString = objectData.genres.split(",")
        // Book cover handling
        if (objectData.cover.name !== "") {
            const file = objectData.cover
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.addEventListener("load", ()=>{
                const imageURL = reader.result
                addBookToLibrary(objectData.title, objectData.author, objectData.pages, genreString, objectData.readS, objectData.rating, imageURL)
                library.forEach(addBookToCase)
                form.reset()
        })
        }
        else {
            addBookToLibrary(objectData.title, objectData.author, objectData.pages, genreString, objectData.readS, objectData.rating)
            library.forEach(addBookToCase)
            form.reset()
        }
    }
})

// Save edit changes
changeBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const formDataEdit = new FormData(form)
    const objectDataEdit = Object.fromEntries(formDataEdit)
    
     if (objectDataEdit.title == "" || objectDataEdit.author == "") {
        errorMessageInfo.style.display = "inline"
        return
    }
    else if (objectDataEdit.cover.name !== "" && objectDataEdit.cover.type.slice(0,5) !== "image") {
        errorMessageType.style.display = "inline"
        return
    }
    else {
        document.querySelectorAll(".removable").forEach((e)=>{
        bookcase.removeChild(e)
    })
        errorMessageInfo.style.display = "none"
        errorMessageType.style.display = "none"
        bookForm.style.display = "none"
        const genreString = objectDataEdit.genres.split(",")
        // Book cover handling
        if (objectDataEdit.cover.name !== "") {
            const file = objectDataEdit.cover
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.addEventListener("load", ()=>{
                const imageURL = reader.result
                const bookID = currentEdit[0]
                const index = library.findIndex(item => item.id == bookID)
                library[index].title = objectDataEdit.title
                library[index].author = objectDataEdit.author
                library[index].pages = objectDataEdit.pages
                library[index].genres = genreString
                library[index].read = objectDataEdit.readS
                library[index].rating = objectDataEdit.rating
                library[index].cover = imageURL
                library.forEach(addBookToCase)
                form.reset()
        })
        }
        else {
            const bookID = currentEdit[0]
            const index = library.findIndex(item => item.id == bookID)
            library[index].title = objectDataEdit.title
            library[index].author = objectDataEdit.author
            library[index].pages = objectDataEdit.pages
            library[index].genres = genreString
            library[index].read = objectDataEdit.readS
            library[index].rating = objectDataEdit.rating
            library.forEach(addBookToCase)
            form.reset()
        }
    }

})