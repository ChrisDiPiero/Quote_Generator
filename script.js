const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote For API
async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const number = Math.floor(Math.random() * data.length);
        const quoteObject = data[number];
        // test for blank author - add unknown if true
        if (!quoteObject.author) {
            authorText.innerText = '-unknown-'
        } else {
            authorText.innerText = quoteObject.author;
        }
        // Reduce font size for long quotes
        if (quoteObject.text > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');            
        }
        quoteText.innerHTML = quoteObject.text;
        //Stop Loader, show quote
        complete();
    } catch (error) {
        getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerHTML;
    const author = authorText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();