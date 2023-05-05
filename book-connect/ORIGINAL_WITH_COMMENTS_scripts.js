// Missing import statements

// Setting up starting variables:

matches = books // Missing let for declaration.
page = 1; // Missing let for declaration.

// Books not defined - missing imported modules from data file. 
// Range not defined anywhere in the code.
// Should use OR opertators between first and second conditions.
if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

// Missing a description of what these objects are for - 
// day and night color themes should be nested together inside 
// one object to allow easy reference missing const for declarations.
day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}



// Creation of List Previews:

// Should be consolidated inside a function - code will be used
// several times to generate new previews e.g. when running a search.

fragment = document.createDocumentFragment() // Missing const for declaration
const extracted = books.slice(0, 36) 
// Because this variable is not within a function, it is block-scoped
// and will need to be reassigned later, leading to errors.

for ({ author, image, title, id }; extracted; i++) { 
    // For loop not structured correctly: 
    // need to initialize i, and set number of times loop will run.
    // Extracted is an array, not a length and therefore will not 
    // set the number of iterations.
    // Need to move destructuring assignment of variables into loop body.

    const preview = createPreview({ 
        // createPreview() function does not exist.
        author,
        id,
        image,
        title
    })
    // Just listing the variables won't create the HTML required.
    // Need to either create elements individually or use a template
    // literal to create them all at once.

    fragment.appendChild(preview)
}
// This syntax will not be able to access the list items DOM node.
// Need to use document.querySelector.
data-list-items.appendChild(fragment)




// Populating the genres dropdown menu:

// Would be more efficient to place this in a function, as it can then
// be reused for the authors dropdown.
genres = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element = 'All Genres'
genres.appendChild(element)

for ([id, name]; Object.entries(genres); i++) {
    // For loop not structured correctly: 
    // destructuring assignment of variables needs to go into the loop body, 
    // i is not initialized,
    // number of iterations not set.
    document.createElement('option')
    element.value = value
    element.innerText = text
    genres.appendChild(element)
}

// Need to use document.querySelector to access DOM node.
data-search-genres.appendChild(genres)

// Repeated code from genres above, uses same variable names which
// could cause conflicts.
authors = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for ([id, name];Object.entries(authors); id++) {
    // For loop not structured correctly: 
    // destructuring assignment of variables needs to go into the loop body, 
    // i is not initialized,
    // number of iterations not set.
    document.createElement('option')
    element.value = value
    element = text
    authors.appendChild(element)
}
// Need to use document.querySelector to access DOM node.
data-search-authors.appendChild(authors)


// Automatic selection of dark mode based on system preference:

// Would be better to group this with the color theme object.
// Use of ternary statement here leads to long code that is hard to read.
// Would be better structured as an if/else statement.
// Should use an assignment operator instead of equality.
// Need to use document.querySelector to access DOM node for settings menu.

data-settings-theme.value === window.matchMedia && 
window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

v = window.matchMedia && 
window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day' 
// Need to use colon instead of single pipe for ternary statement.

// css does not exist - should refer to an object where the day and
// night themes are stored.
documentElement.style.setProperty('--color-dark', css[v].dark);
documentElement.style.setProperty('--color-light', css[v].light);


// Show More button:

// Need to use document.querySelector to access DOM node. 
// cannot simply set the button to a string value - would need to use textContent.
// To have the value update dynamically, would need to use a template literal and 
// interpolate the variables.
data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// Should be an if statement or ternary statement, not an assignment:
// if no matches left, then set button to disabled. 
// To disable a button, need to set the disabled property to true.
// Would not be able to access disabled property using this syntax - need
// document.querySelector.
data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// Needs document.querySelector need to use backticks for a template
// literal.
data-list-button.innerHTML = /* html */ [
    '<span>Show more</span>',
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
]
// Should combine the update and check for disable actions into a
// single function - will be reused several times throughout app
// operations.


// Event listeners/ handlers

// Method to trigger an event listener is onclick() not .click().
// Need to use correct syntax for the event handler - either
// declare function or use arrow function syntax. 
// Would be better to seperate the event listeners & handlers as 
// some handlers will need to perform complex functions. 
// Need document.querySelector to correctly apply the
// listeners to html elements. 
// Setting open === false/true will not toggle display of the elements. 
// Need to change display property of the style object.

data-search-cancel.click() { data-search-overlay.open === false }
data-settings-cancel.click() { querySelect(data-settings-overlay).open 
    === false }
data-settings-form.submit() { actions.settings.submit }
data-list-close.click() { data-list-active.open === false }

data-list-button.click() {
    document.querySelector([data-list-items]).appendChild(
        createPreviewsFragment(matches, page x BOOKS_PER_PAGE, 
            {page + 1} x BOOKS_PER_PAGE]))
    actions.list.updateRemaining()
    page = page + 1
}
// createPreviewsFragment() and updateRemaining() functions don't
// exist, neither does actions object

data-header-search.click() {
    data-search-overlay.open === true ;
    data-search-title.focus();
}

// filters is a variable created inside the event handler, is not
// passed as an argument.
data-search-form.click(filters) {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        // For loop syntax incorrect:
            // variables being used need to go into the loop body -
            // unless a for/of loop used instead -
            // i is not initialized,
            // number of iterations not set  

        // Uses assignemnt instead of equality operator in conditions.
        // Should be an OR operator instead of an AND.
        // Uses square bracket instead of round brackets for includes() method.
        // References not correct, needs to refer to current index of
        // original books object.
        titleMatch = filters.title.trim() = '' && 
        book.title.toLowerCase().includes[filters.title.toLowerCase()]

        // Uses assignemnt instead of equality operator in conditionals.
        // References not correct, needs to refer to current index of
        // original books object.
        authorMatch = filters.author = 'any' || book.author === filters.author

        // Incorrect use of {}
        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre 
                { genreMatch === true }}}
        }   
        // For loop not structured correctly - should use for/of loop in any case. 
        // References not correct.
        // Incorrect syntax for conditional statements - if (condition) { action }.

        if titleMatch && authorMatch && genreMatch => result.push(book)
        // Incorrect syntax for conditional statement.
    }

    // Incorrect syntax for conditional statement.
    // Need to use document.querySelector to access DOM nodes in order to add/remove 
    // the list__message_show class.
    // Could also just use style.display block/none to hide or show the list message.
    if display.length < 1 
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')
    
    data-list-items.innerHTML = ''
    
    // Very similar to creation of initial list items - should be in a
    // function so as to not repeat code unneccesarily.
    const fragment = document.createDocumentFragment()
    const extracted = source.slice(range[0], range[1]) // Redeclaration of a const.

    for ({ author, image, title, id }; extracted; i++) {
        // Incorrect for loop syntax - should rather use for/in loop.
        const { author: authorId, id, image, title } = props 
        // props is not an existing object/array that can be used for
        // destructuring assignment.

        // Missing let for variable declaration.
        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
        
        }
    // Should be fragment, not fragments.
    data-list-items.appendChild(fragments)

    // Repeated code for updating the Show More button should be in a function.
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data-list-button.disabled = initial > 0

    data-list-button.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open = false
}

data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay).open === false
    // CSS object with theme property doesn't exist.
}

data-list-items.click() {
    pathArray = Array.from(event.path || event.composedPath())
    active; // This needs to be assigned as a variable.
    // While using the path of the event listener will allow access to
    // the right node from which the id can be extracted, it is much
    // simpler to use the .closest() method on the target.

    for (node; pathArray; i++) { // Incorrect for loop syntax.
        if active break; // Incorrect conditional syntax.
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) { 
            // Need to use let rather than const, as it will be reset
            // every iteration.
            if (singleBook.id === id) active = singleBook 
            // singleBook not correct reference, needs to be
            // books[singleBook].
        } 
    }
    
    if !active return // Incorrect conditional syntax.
    data-list-active.open === true // Does not actually open the active element.
    data-list-blur + data-list-image === active.image // Cannot simultaneously assign with + operator.
    data-list-title === active.title
    
    data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data-list-description === active.description
     // Using equality operators instead of assignment.
     // active is never actually assigned as an object from which these properties can be set.
}
