class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Interface {
  static displayBooks() {
    const storedBooks = [
      {
        title: "Book-1",
        author: "Ritu",
        isbn: "1111",
      },
      {
        title: "Book-2",
        author: "Jyoti Patel",
        isbn: "2222",
      },
    ];
    const books = storedBooks;
    books.forEach((book) => Interface.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    console.log("list1", list);
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
    console.log("list", list);
  }
  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
  static showAlertMessage(message, class_Name) {
    const div = document.createElement("div");
    div.className = `alert alert-${class_Name}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      if (confirm("Are You Sure You want to delete this"))
        el.parentElement.parentElement.remove();
      this.showAlertMessage("Book deleted ", "success");
    }
  }
}

document.addEventListener("DOMContentLoaded", Interface.displayBooks());
document.querySelector("#book-form").addEventListener("submit", (p) => {
  p.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  if (title === "" || author === "" || isbn === "")
    Interface.showAlertMessage("Please Fill all the Fields", "danger");
  else {
    const book = new Book(title, author, isbn);

    Interface.addBookToList(book);
    Interface.clearFields();
    Interface.showAlertMessage("Book Added Successfully", "success");
  }
});
document.querySelector("#book-list").addEventListener("click", (e) => {
  Interface.deleteBook(e.target);
});
