const myLibrary = [
	{title:'The Picture of Dorian Gray', author: 'Oscar Wilde', pages: '304 pages'},
	{title:'The Old Man and the Sea', author:'Ernest Hemingway', pages: '46 pages'},
	{title:'Blue Ocean Strategy', author:'W. Chan Kim and Renée Mauborgne', pages: '320 pages'},
];

function Book() {
	// the constructor...
}

function addBookToLibrary(book) {
// const title = book.title;
// 	const author = book.author;
// const pages = book.pages;
	const {title, author, pages} = book; //Destructurisation of the book, take the value in one single code.
	const createdBook = {
		title: title,
		author: author,
		pages:pages
	};
	myLibrary.push(createdBook);
}


const newBookBtn = document.createElement('button');
newBookBtn.textContent = 'New Book';
newBookBtn.setAttribute('style', 'width:80px; height:40px; margin-bottom: 20px;');
document.body.appendChild(newBookBtn);

//newBookBtn.onClick = () =>

	function displayBooks(books) {
		const bookList = document.createElement('div');
		bookList.setAttribute('id', 'book-list');
		bookList.setAttribute('style', 'display: flex; flex-direction: row; gap:20px;')



		books.forEach( book => {
			const bookItem = document.createElement('div') ;
			bookItem.classList.add('book-item');
			bookItem.setAttribute('style', ' border-radius: 25px; padding: 10px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; margin-bottom: 10px;');

			// bookItem.innerHTML = `<h2>${book.title}</h2> <p> Author: ${book.author}</p> <p>Pages: ${book.pages}</p>`;
			const titleElm = document.createElement('h2');
			titleElm.textContent = book.title;
			const authorElm = document.createElement('p');
			authorElm.textContent = book.author;
			const pagesElm = document.createElement('p');
			pagesElm.textContent = book.pages;

			bookItem.appendChild(titleElm);
			bookItem.appendChild(authorElm);
			bookItem.appendChild(pagesElm);

			bookList.appendChild(bookItem);
		});

		document.body.appendChild(bookList);
	}

displayBooks(myLibrary);


const newBookDialog = document.getElementById('newBookDialog');

newBookBtn.onclick = () => {
	newBookDialog.showModal();
}

document.getElementById('cancelBtn').addEventListener('click', () => {
	document.getElementById('newBookDialog').close();
});



