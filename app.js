const library = []

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
