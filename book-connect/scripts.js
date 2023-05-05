// imported modules from data file
import { BOOKS_PER_PAGE, authors, genres, books, html } from './data.js'

/**
 * The subset of the books object that matches current filtering settings, given as an
 * array. The default value of matches is set to the entire list of books contained in the
 * books array.
 */
let matches = books 

/** 
 * The current page number of results being displayed in the main list area of the app.
 * Each page contains a set number of results, as per {@link BOOKS_PER_PAGE}. The initial
 * value is set to page 1
 */
let page = 1 

/** 
 * An array that gives the starting and ending indices of the {@link matches} array slice
 * that will be added to the main list area, calculated according the the current
 * {@link page} number and {@link BOOKS_PER_PAGE} settings.
 */
let range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]


// Checks validity of source books object and the set range.
if (!books || !Array.isArray(books)) {throw new Error('Source required')}
if (!range || range.length < 2) {
    throw new Error('Range must be an array with two numbers')
}
    

/**
 * An object literal containing color settings that update CSS styling depending on
 * whether day or night mode is selected. The outer properties (day and night) refer to
 * the two available themes. The nested inner properties (dark and light) contain the RGB
 * values (as strings) of the dark and light colour variables that will be applied by CSS
 * when the theme is selected.
 */
const CSS = {
    day: {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
    night: {
        dark: '255, 255, 255',
        light: '10, 10, 20',
    }
}

/**
 * Checks for dark mode preference. If found, changes theme settings accordingly using the
 * {@link CSS} object.
 */
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.style.setProperty('--color-dark', CSS.night.dark)
    document.documentElement.style.setProperty('--color-light', CSS.night.light)
}
else {
    document.documentElement.style.setProperty('--color-light', CSS.day.dark)
    document.documentElement.style.setProperty('--color-light', CSS.day.light)
}


/**
 * Function that is used to populate the dropdown list options in the search menu
 * according to the content of a specified source object, in this case either
 * {@link genres} or {@link authors}. Although originally written for the authors and
 * genres dropdowns, could also be used for other search menu options introduced in
 * future.
 * @param {object} source - object from which options are generated
 * @param {string} label - name of dropdown menu, eg. "Genres"
 * @param {variable} node - reference to DOM node at which dropdown HTML will be appended
 */
const populateDropdown = (source, label, node) => {
    // creates empty document fragment to be populated with dropdown elements
    let dropdownList = document.createDocumentFragment()

    // creates first option element to be added to the dropdown list with default value &
    // content
    let dropdownElement = document.createElement('option')
    dropdownElement.value = 'any'
    dropdownElement.textContent = `All ${label}`
    dropdownList.appendChild(dropdownElement)

    // loops through the source object and extracts keys and values into an array
    for (let item of Object.entries(source)) {

        // creates a new option element for each item
        let dropdownElement = document.createElement('option')

        // extracts the id and name properties from each item in the array and applies
        // them to the option element
        let [ id, name ] = item
        dropdownElement.value = id
        dropdownElement.textContent = name

        // adds the new option element to the dropdown list
        dropdownList.appendChild(dropdownElement)
    }
    // adds the newly created dropdown list to the DOM
    node.appendChild(dropdownList)
}

populateDropdown(genres, "Genres", html.search.genres)
populateDropdown(authors, "Authors", html.search.authors)


/** 
 * Function that generates an HTML document fragment containing an list of book previews
 * and adds them to the main list area of the app. The previews give an image of the book
 * cover, as well as the book title and author name. List items are created as button
 * elements so that they are clickable. Appropriate CSS classes and data attributes are
 * simultaneously applied.
 * @param {array} currentMatches - contains data of books to be added to the list as per
 * current state of {@link matches}
 * @param {array} currentRange - range of {@link matches} slice that will be added as per
 * current state of {@link range}
 * @returns {DocumentFragment} HTML document fragment containing all list preview elements
 * created
 */
const createPreviewsFragment = (currentMatches, currentRange) => {
    // extracted is the subset of the matches array for which previews will be generated
    const extracted = currentMatches.slice(currentRange[0], currentRange[1])
    
    // fragment is an empty document fragment to which new list previews will be appended
    let fragment = document.createDocumentFragment()

    // loops through all indices in extracted array and assigns the author, image, title,
    // and id properties from the nested objects within that contain each book's
    // information
    for (let index in extracted) { 
        const { author, image, title, id } = extracted[index]
        
        // creates the HTML button element that will function as a single list preview
        // element applies the relevant css class for styling and data attribute for
        // reference
        let listElement = document.createElement('button')
        listElement.classList = 'preview'
        listElement.setAttribute('data-list-preview', id)

        listElement.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
    // adds list element to the document fragment on each iteration of the loop
    fragment.appendChild(listElement)
    }

    return fragment
}


/**
 * Function that adds event listeners to newly created preview list elements, allowing
 * them to respond to being clicked and open the active preview for the corresponding book
 * via the {@link handleOpenActivePreview} event handler
 */
const addPreviewEventListeners = () => {
    // all HTML elements with preview class (i.e. list previews generated by
    // createPreviewsFragment()) are added to previewsArray
    const previewsArray = Array.from(document.querySelectorAll('.preview'))

        // loops over all previews and applies event listener
        for (const preview of previewsArray){
            preview.addEventListener('click', handleOpenActivePreview)
        }
}

// Creates first instance of list items using all books as matches and range calculated
// for page 1
html.list.items.appendChild(createPreviewsFragment(matches, range))


/**
 * Function that calculates the remaining number of matches not shown on the current page
 * and updates the text of the Show More button accordingly.
 * @param {*} currentMatches - contains current books that match most recent search
 * filters, stored in variable {@link matches}
 * @param {*} currentPage - indicates current page number stored in variable {@link page}
 */
const updateShowMoreButton = (currentMatches, currentPage) => {
    // remaining is the number of matches left that are not shown on current page
    let remaining = currentMatches.length - (currentPage * BOOKS_PER_PAGE)

    // hasRemaining is a Boolean value that indicates whether there are any remaining
    // matches not shown (true) or not (false)
    let hasRemaining = remaining > 0
    
    // updates the text of the Show More button indicates the number of matches remaining
    // or, if none remaining, shows 0
    html.list.button.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${hasRemaining === true ? remaining : 0})</span>
    `
    // if there are no remaining matches on the next page, the Show More button is
    // disabled
    if (hasRemaining === false) {
    html.list.button.disabled = true
    }
}

// Sets starting text of Show More button
updateShowMoreButton(matches, page)


// Event listeners & handlers

/** Event handler fired by clicking Show More button. Increments the page count by 1,
 *  recalculates the {@link range} according to the new page number and then runs the
 *  {@link createPreviewsFragment} function to generate the previews for this page. Event
 *  listeners are added to these list previews using {@link addPreviewEventListeners} and
 *  the value in the Show More button is updated using the {@link updateShowMoreButton}
 *  function.
 */
const handleShowMore = () => {
    page = page + 1
    range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]

    html.list.items.appendChild(createPreviewsFragment(matches, range))
    addPreviewEventListeners()

    updateShowMoreButton(matches, page)
}
html.list.button.addEventListener('click', handleShowMore)

// Search Menu

/** 
 * Event handler that fires on click of the Search button and displays the Search Menu
 * overlay. Focus is set to the title section of the menu so that the user can immediately
 * start typing in the form.
 */
const handleSearchOpen = () => {
    html.search.overlay.style.display = 'block'
    html.search.title.focus()
}
html.headerButtons.search.addEventListener('click', handleSearchOpen) 

/**
 * Event handler that fires when the Search menu cancel button is clicked. It closes the
 * Search Menu overlay and resets the form so any user input not subitted is cleared when
 * the overlay is next opened.
 */
const handleSearchCancel = () => {
    html.search.overlay.style.display = 'none'
    html.search.form.reset()
}
html.search.cancel.addEventListener('click', handleSearchCancel)

/** 
 * Event handler that fires when data in the Search Menu form is submitted. Form data is
 * extracted and used to apply filters to the results and update the elements of the
 * {@link matches} array accordingly. New list previews are then generated and added to
 * the main list area using {@link createPreviewsFragment} and
 * {@link addPreviewEventListeners}. The value in the Show More button is also updated
 * using the {@link updateShowMoreButton} function and the search form is reset so user
 * input is cleared when the Search Menu is next opened.
*/
const handleSearchSubmit = (event) => {
    html.search.overlay.style.display = 'none'
    event.preventDefault()
    
    // formData extracts the user entered data from the event object
    const formData = new FormData(event.target)
    // filters stores this information in the form of an object that can be used to access
    // each property (title, genre, author)
    const filters = Object.fromEntries(formData)
    // result is an empty array to which the results that meet the search criteria will be
    // added
    let result = []

    // before checking against filters, checks if user has submitted a search with no
    // specific criteria. If so, simply returns all books as the result
    if (filters.title === "" && filters.genre === 'any' && filters.author === 'any') {
        result = books
    } else {  
        // loops through each index in the books object and compares title, genre and
        // author values to those of the user's filters
             
        for (let singleBook in books) {
            // titleMatch is a Boolean variable that will return true if the title search
            // term matches any groups of characters in the title of the current book if
            // no title was specified, an empty string would be stored in filters
            const titleMatch = filters.title.trim() === '' || 
            (books[singleBook].title.toLowerCase()).includes(filters.title.toLowerCase())

            // authorMatch is a Boolean variable that will return true if the author
            // search term matches the author of the current book if no authors was
            // specified, the 'any' string would be stored in filters
            const authorMatch = filters.author === 'any' || books[singleBook].author === filters.author

            // genreMatch is a Boolean variable that will return true if the genre search
            // term matches any genres within the genres array of the current book if no
            // genre was specified, the 'any' string would be stored in filters
            let genreMatch = false

                for (let singleGenre in books[singleBook].genres) {
                    if (filters.genre === 'any' || 
                        (books[singleBook].genres[singleGenre] === filters.genre)) {
                        genreMatch = true
                    }
                }
                
            // if a book matches all criteria, it will be pushed into the results array 
            if (titleMatch && authorMatch && genreMatch) {
                result.push(books[singleBook])
            }
        }
    }
    // matches is reassigned to the new result array that contains only books that meet
    // the search criteria
    matches = result

    // if no matches are found, a message is displayed to the user in the main list area
    // to inform them
    matches.length === 0 ? html.list.message.style.display = 'block' : 
    html.list.message.style.display = 'none'

    // the page and range values are reset to initial conditions, since results are
    // displayed starting on a new page
    page = 1
    range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]
    html.list.button.disabled = false

    // exisiting results are overwritten with an empty string and then the HTML containing
    // the new list of previews is inserted
    html.list.items.innerHTML = ""
    html.list.items.appendChild(createPreviewsFragment(matches, range))
    addPreviewEventListeners()

    updateShowMoreButton(matches, page)
    html.search.form.reset()
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
html.search.form.addEventListener('submit', handleSearchSubmit)

// Settings Menu

/**
 * Event handler that fires on click of the Settings button and displays the Settings
 * overlay.
 */
const handleSettingsOpen = () => {
    html.settings.overlay.style.display = 'block'
}
html.headerButtons.settings.addEventListener('click', handleSettingsOpen)

/**
 * Event handler that fires on click of the Settings cancel button and hides the Settings
 * overlay.
 */
const handleSettingsCancel = () => {
    html.settings.overlay.style.display = 'none'
}
html.settings.cancel.addEventListener('click', handleSettingsCancel)

/**
 * Event handler that fires when the Save button in the Settings overlay is clicked. The
 * theme that the user has selected is applied using the colors saved in the {@link CSS}
 * object.
*/
const handleSettingsSubmit = (event) => {
    html.settings.overlay.style.display = 'none'
    event.preventDefault()

    // formData extracts the user's submitted selection from the event object
    const formData = new FormData(event.target)
    // the theme variable is extracted from the formData object by destructuring
    // assignment
    const { theme } = Object.fromEntries(formData)

    document.documentElement.style.setProperty('--color-dark', CSS[theme].dark)
    document.documentElement.style.setProperty('--color-light', CSS[theme].light)
}
html.settings.form.addEventListener('submit', handleSettingsSubmit)


// Active Book Previews

/** 
 * Event handler that fires when one of the list preview items in the main list area is
 * clicked and opens an active preview that displays a larger version of the cover and
 * gives additional details about the selected book. Details are accessed from the
 * {@link books} though the element's id, stored in a data attribute
*/
const handleOpenActivePreview = (event) => {
    html.list.active.preview.style.display = 'block'
    
    // extracts the target of the event listener from the event object
    const { target } = event 

    // previewId is the id of the list preview element that was clicked the id of the list
    // element, as set in the original books object, is stored in the data-list-preview
    // data attribute
    const previewId = target.closest('[data-list-preview]').dataset.listPreview

    // the activeBook variable is used to store the details of the book that the user has
    // selected, initially set to null
    let activeBook = null

    // loops over all books in books object. If the id property matches the previewId, the
    // active book is set to the current book
    for (let singleBook in books) {
        if (books[singleBook].id === previewId) {
            activeBook = books[singleBook]
            break
        }
    }
    // all information needed to populate the active preview is extracted from the
    // activeBook object
    const { image, title, author, published, description } = activeBook

    // the above variables are used to update the HTML attributes and text content of the
    // active preview element as needed
    html.list.active.blur.setAttribute('src', image)
    html.list.active.image.setAttribute('src', image)
    html.list.active.title.textContent = title
    html.list.active.subtitle.textContent = `${authors[author]} (${new Date(published).getFullYear()})`
    html.list.active.description.textContent = description
}
addPreviewEventListeners()

/**
 * Event handler that fires when the close button of an open Active Preview is clicked and
 * hides the Active Preview
 */
const handleCloseActivePreview = () => {
    html.list.active.preview.style.display = 'none'
}
html.list.close.addEventListener('click', handleCloseActivePreview)

