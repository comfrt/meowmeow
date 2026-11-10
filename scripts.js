document.addEventListener('DOMContentLoaded', () => {
  let allMusicals = [];

  function renderCards(data) {
    const container = document.getElementById('musicals');

    container.innerHTML = '';

    data.forEach((item) => {
      const showName = item.Show || item.show;
      if (!showName) return;

const notes = item['General Notes'];
      const hasNotes = notes && notes.trim() !== '' && notes !== 'NaN';

const nft = item['NFT Status'];
      const hasNFT = nft && nft.trim() !== '' && nft !== 'NaN';

      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <div class="title"> <i class="cp cp-fish-bone" style="font-size:0.8em"></i> ${showName}</div>
        <p style="text-align:right;margin-bottom:-20px;"><i>${item.Date || 'N/A'}</i></p>
        <span class="badge tooltip"> ${item.Tour || 'N/A'}<span class="tooltip-text">Tour</span></span>
        <span class="badge tooltip"> ${item.Venue || ''} (${item.City || 'Unknown'})<span class="tooltip-text">Location</span></span>
        <span class="badge tooltip"> ${item.Format || 'N/A'}<span class="tooltip-text">Format</span></span>
        <span class="badge tooltip"> ${item['File Size'] || ''}<span class="tooltip-text">File Size</span></span>
        ${hasNFT ? `<span class="badge nft tooltip"><i class="cp cp-lock"></i><span class="tooltip-text">${nft}</span></span>` : ''}        <p><strong>Master:</strong> ${item.Master || 'Unknown'}</p>
        <p><strong>Cast:</strong> ${item.Cast || 'N/A'}</p>
        ${hasNotes ? `<p class="general-notes"><strong>Notes:</strong> ${notes}</p>` : ''}
      `;

      container.appendChild(card);
    });
  }

  function setupSearch() {
    const searchInput = document.getElementById('search-input');
  

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('#musicals .card');
      

      cards.forEach(card => {
        const cardText = card.innerText.toLowerCase();
        if (cardText.includes(searchTerm)) {
          card.style.display = ''; 
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Fetch data
  const sheetId = '1ZDaDJZJku1WtBqvG6PtJeheLwXBhHueTzn-_Vm3fO5M';
  const apiUrl = `https://opensheet.elk.sh/${sheetId}/1`;

  fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderCards(data);
      setupSearch();
    })
});