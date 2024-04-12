const quoteList = document.getElementById('quote-list');
const newQuoteForm = document.getElementById('new-quote-form');

// Fetch quotes from the API and display them on the page
async function fetchQuotes() {
  try {
    const response = await fetch('http://localhost:3000/quotes');
    const quotes = await response.json();
    displayQuotes(quotes);
  } catch (error) {
    console.error(error);
  }
}

// Display the quotes on the page
function displayQuotes(quotes) {
  quoteList.innerHTML = '';
  quotes.forEach(quote => {
    const quoteItem = document.createElement('li');
    quoteItem.innerHTML = `<blockquote class="blockquote">
                            <p class="mb-0">${quote.text}</p>
                            <footer class="blockquote-footer">${quote.author}</footer>
                          </blockquote>
                          <button class="btn btn-danger delete-quote" data-quote-id="${quote.id}">Delete</button>`;
    quoteList.appendChild(quoteItem);
  });
}

// Handle the submission of the new quote form
newQuoteForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const quoteText = document.getElementById('new-quote').value;
  const quoteAuthor = document.getElementById('author').value;
  try {
    const response = await fetch('http://localhost:3000/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: quoteText, author: quoteAuthor })
    });
    const newQuote = await response.json();
    displayQuotes([newQuote]);
    newQuoteForm.reset();
  } catch (error) {
    console.error(error);
  }
});

// Delete a quote from the API and remove it from the page
quoteList.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete-quote')) {
    const quoteId = event.target.getAttribute('data-quote-id');
    try {
      await fetch(`http://localhost:3000/quotes/${quoteId}`, { method: 'DELETE' });
      const quoteItem = event.target.closest('li');
      quoteItem.remove();
    } catch (error) {
      console.error(error);
    }
  }
});

// Fetch the quotes from the API when the page loads
fetchQuotes();