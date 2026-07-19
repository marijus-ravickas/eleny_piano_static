document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('google-reviews');
  if (!el) return;

  var placeId = el.dataset.placeId;
  var apiKey = el.dataset.apiKey;
  if (!placeId || !apiKey) return;

  var url = 'https://places.googleapis.com/v1/places/' + placeId
    + '?fields=reviews,rating,userRatingCount';

  fetch(url, {
    headers: { 'X-Goog-Api-Key': apiKey }
  })
    .then(function (res) {
      if (!res.ok) throw new Error('Places API request failed: ' + res.status);
      return res.json();
    })
    .then(function (data) {
      var reviews = (data.reviews || []).slice(0, 5);
      if (!reviews.length) return;

      reviews.forEach(function (review) {
        var item = document.createElement('div');
        item.className = 'review-item';

        var stars = document.createElement('div');
        stars.className = 'review-stars';
        stars.textContent = '★'.repeat(review.rating || 0);
        item.appendChild(stars);

        var text = document.createElement('p');
        text.className = 'review-text';
        text.textContent = (review.text && review.text.text) || '';
        item.appendChild(text);

        var author = document.createElement('div');
        author.className = 'review-author';
        var name = (review.authorAttribution && review.authorAttribution.displayName) || '';
        var when = review.relativePublishTimeDescription || '';
        author.textContent = when ? (name + ' — ' + when) : name;
        item.appendChild(author);

        el.appendChild(item);
      });
    })
    .catch(function () {
      // Fail quiet — no reviews shown is better than a visible error on a public page.
    });
});
