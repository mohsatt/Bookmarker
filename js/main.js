// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// SAVE BOOKMARK FUNCTION
function saveBookmark(e){
	// Get form value
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

if (!validateForm(siteName, siteUrl)){
	return false;
}

	
var bookmark = {
	name: siteName, 
	url: siteUrl
}
	
	/*
	// Local storage test
	localStorage.setItem('test', 'Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/


	//Test if bookamrks is null
	if (localStorage.getItem('bookmarks') === null){
		// Init Array
		var bookmarks = [];
		// Add to Array
		bookmarks.push(bookmark);
		// Set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add the bookmark to array
		bookmarks.push(bookmark);
		// Reset it to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Clear form
	document.getElementById('myForm').reset();



	// Re fecth bookmarks
	fetchBookmarks();
	// Prevent form from submitting
	e.preventDefault();
}

// DELETE BOOKMARK
function deleteBookmark(url){
	// Get bookamrks from Local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
			if (bookmarks[i].url == url) {
				// Remove from array
				bookmarks.splice(i, 1);
		
		}	
	} 
	// Reset it to local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re fecth bookmarks
	fetchBookmarks();
}

// DISPLAY SAVED BOOKMARKS

function fetchBookmarks(){
		// Get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		// Get outupt id
		var bookmarkResults = document.getElementById('bookmarkResults'); 

		// Build output
		bookmarkResults.innerHTML = '';

		// Loop bookmarks and output them one by one
		for (var i = 0; i < bookmarks.length; i++) {
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			bookmarkResults.innerHTML += '<div class="well">'+
										'<h3>' +name+
										' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
										' <a onclick="deleteBookmark(\'' +url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
										'</h3>'+
										'</div>';
		}

	}

// FORM VALIDATION
function validateForm(siteName, siteUrl){ 
	if (!siteName || !siteUrl){

	alert('Please fill in the form');
	return false;

}

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if (!siteUrl.match(regex)){
	alert('Please use a valid URL');
	return false;
	}

	return true; 

}