const myLibrary = [
	// {index: "id-1", title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', pages: '304'},
	// {index: "id-2", title: 'The Old Man and the Sea', author: 'Ernest Hemingway', pages: '46'},
	// {index: "id-3", title: 'Blue Ocean Strategy', author: 'W. Chan Kim and Renée Mauborgne', pages: '320'},
	new Book('The Picture of Dorian Gray', 'Oscar Wilde', '304'),
	new Book('The Old Man and the Sea', 'Ernest Hemingway', '46'),
	new Book('Blue Ocean Strategy', 'W. Chan Kim and Renée Mauborgne', '320'),
];

//Конструктор книги
function Book(title = 'Not provided', author, pages, status = 'This book has not been read.', additionalInfo= "Not provided", index) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
	this.additionalInfo = additionalInfo;
	this.index = index;

}

//Метод для переключения статуса прочтения
Book.prototype.toggleStatus = function () {
	this.status = this.status === 'This book has been read.' ? 'This book has not been read.' : 'This book has been read.';
}


function addBookToLibrary(book) {

	//Check if the book already exists in the library
	const existBook = myLibrary.some(existingBook =>
		existingBook.title === book.title && existingBook.author === book.author);

	if (existBook) {
		alert('This book already exists!')
		return;
	}

// 	const {title, author, pages, status, additionalInfo, index} = book; //Destructurisation of the book, take the value in one single code.
// 	const createdBook = {
// 		index: index,
// 		title: title,
// 		author: author,
// 		pages: pages,
// 		status: status,
// 		additionalInfo: additionalInfo
// 	};
// 	myLibrary.push(createdBook);
// }

	const index = myLibrary.length + 1; // Генерируем индекс (можно менять по необходимости)

	const createdBook = new Book(book.title, book.author, book.pages, book.status, book.additionalInfo, book.index);
	myLibrary.push(createdBook);
}


const newBookBtn = document.createElement('button');
newBookBtn.textContent = 'New Book';
newBookBtn.setAttribute('style', 'width:80px; height:40px; margin-bottom: 20px;');
document.body.appendChild(newBookBtn);


function displayBooks(books) {
	const bookList = document.createElement('div');                                        //<div id='book-list'></div>
	bookList.setAttribute('id', 'book-list');
	bookList.setAttribute('style', 'display: flex; flex-direction: row; gap:20px;')


//!!!!!!!!!!!!!!!!!!!!!
	while (bookList.firstChild) {
		bookList.removeChild(bookList.firstChild);
	}


	books.forEach((book, index) => {
		const bookItem = document.createElement('div');                                    //<div class='book-item'></div>
		bookItem.classList.add('book-item');
		bookItem.setAttribute('style', ' border-radius: 25px; padding: 10px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; margin-bottom: 10px;');

		// bookItem.innerHTML = `<h2>${book.title}</h2> <p> Author: ${book.author}</p> <p>Pages: ${book.pages}</p>`;
		const titleElm = document.createElement('h2');                                  //<h2>book.title</h2>
		titleElm.textContent = book.title;
		const authorElm = document.createElement('p');                                //<p>book.author</p>
		authorElm.textContent = book.author;
		const pagesElm = document.createElement('p');                                 //<p>book.pages</p>
		pagesElm.textContent = `${book.pages} pages`;
		const statusElm = document.createElement('p');
		statusElm.textContent = book.status;
		const additionalInfoElm = document.createElement('div');
		additionalInfoElm.textContent = `Additional Info: ${book.additionalInfo}`;

		const removeBookBtn = document.createElement('button');
		removeBookBtn.textContent = 'Remove Book';

		//Remove button
		removeBookBtn.onclick = () => {
			myLibrary.splice(index, 1); // Удаляем книгу из массива
			displayBooks(myLibrary); // Обновляем отображение книг
		};


		const statusChangeBtn = document.createElement('button');
		statusChangeBtn.textContent = 'Change status';
		statusChangeBtn.onclick = () => {
			book.toggleStatus(); // Переключаем статус
			displayBooks(myLibrary);
		}

		bookItem.appendChild(titleElm);
		bookItem.appendChild(authorElm);
		bookItem.appendChild(pagesElm);
		bookItem.appendChild(statusElm);
		bookItem.appendChild(additionalInfoElm);
		bookItem.appendChild(removeBookBtn);
		bookItem.appendChild(statusChangeBtn);

		bookList.appendChild(bookItem);
	});

//Если списка с такими книгами нет на странице, то добавить, а если есть то мы заменяем его новым списком.
	if (!document.getElementById('book-list')) {
		document.body.appendChild(bookList);
	} else {
		document.body.replaceChild(bookList, document.getElementById('book-list'));
	}

}

displayBooks(myLibrary);


const newBookDialog = document.getElementById('newBookDialog');

newBookBtn.onclick = () => {
	newBookDialog.showModal();
}

document.getElementById('cancelBtn').addEventListener('click', () => {
	document.getElementById('newBookDialog').close();
});


//Modal window

// Prevent confirmBtn - the form from being sent
document.getElementById('confirmBtn').addEventListener('click', (event) => {
	event.preventDefault();


//// Get values from form fields
	const modalBTitle = document.getElementById('book-title').value || "Not provided";
	const modalBAuthor = document.getElementById('book-author').value || "Unknown";
	const modalBPages = document.getElementById('book-pages').value || "Unknown";
	const modalBStatus = document.querySelector('input[name="book_status"]:checked')?.value || "This book has not been read.";
	const modalBAddInfo = document.getElementById('subject').value  || "Not provided";

	const newBook = {
		title: modalBTitle,
		author: modalBAuthor,
		pages: modalBPages,
		status: modalBStatus,
		additionalInfo: modalBAddInfo
	};

	addBookToLibrary(newBook);
	displayBooks(myLibrary);

	newBookDialog.close();
});