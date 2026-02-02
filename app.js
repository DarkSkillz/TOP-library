const library = []
const bookcase = document.getElementById("bookcase")
const addBook = document.getElementById("add-book")

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

function addBookToCase() {
    const book = document.createElement("div")
    const bookCover = document.createElement("div")
    const bookAuthor = document.createElement("p")
    const bookTitle = document.createElement("p")
    book.className = "book"
    bookCover.className = "book-cover"
    bookAuthor.className = "book-author"
    bookTitle.className = "book-title"
    bookAuthor.append("Someone somebody")
    bookTitle.append("A very cool book indeed")
    book.append(bookCover, bookAuthor, bookTitle)
    bookcase.prepend(book)
}

addBook.addEventListener("click", addBookToCase)