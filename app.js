const library = []
const bookcase = document.getElementById("bookcase")
const addBook = document.getElementById("add-book")
const bookForm = document.getElementById("book-form")
const submitBtn = document.getElementById("submit")
const form = document.getElementById("form")

function Book(title, author, pages, genres, read) {
     if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
    this.title = title
    this.author = author
    this.pages = pages
    this.genres = genres
    this.read = read
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, genres, read) {
    const newBook = new Book(title, author, pages, genres, read)
    library.push(newBook)
}

function addBookToCase(element) {
    const book = document.createElement("div")
    const bookCover = document.createElement("div")
    const bookAuthor = document.createElement("p")
    const bookTitle = document.createElement("p")
    book.className = "book removable"
    bookCover.className = "book-cover"
    bookAuthor.className = "book-author"
    bookTitle.className = "book-title"
    bookAuthor.append(String(element.author))
    bookTitle.append(String(element.title))
    book.append(bookCover, bookAuthor, bookTitle)
    bookcase.prepend(book)
}

addBook.addEventListener("click", () => {
    bookForm.style.visibility = "visible"
})

document.getElementById("cancel").addEventListener("click", () => {
    bookForm.style.visibility = "hidden"
    form.reset()
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelectorAll(".removable").forEach((btn)=>{
        bookcase.removeChild(btn)
    })
    const formData = new FormData(form)
    const objectData = Object.fromEntries(formData)
    bookForm.style.visibility = "hidden" //! Change to check for validity first
    addBookToLibrary(objectData.title, objectData.author)
    library.forEach(addBookToCase)
    console.log(library);
    form.reset()
})
