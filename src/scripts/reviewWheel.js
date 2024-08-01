// Simulated array of reviews (you would replace this with your actual data)
let reviews = [
    { id: 1, text: "Great product!" },
    { id: 2, text: "Fast delivery." },
    { id: 3, text: "Excellent service." },
    // Add more reviews as needed
  ];
  
  // Function to display reviews
  function displayReviews(reviewsToDisplay) {
    let reviewsContainer = document.getElementById('reviews-container');
    reviewsToDisplay.forEach(review => {
      let reviewElement = document.createElement('div');
      reviewElement.classList.add('review');
      reviewElement.textContent = review.text;
      reviewsContainer.appendChild(reviewElement);
    });
  }
  
  // Function to load more reviews
  function loadMoreReviews() {
    // Simulate loading more reviews (you would fetch data from server here)
    setTimeout(() => {
      let newReviews = [
        { id: 4, text: "Impressed with the quality." },
        { id: 5, text: "Could improve on packaging." },
        // Add more reviews as needed
      ];
      reviews = reviews.concat(newReviews);
      displayReviews(newReviews);
    }, 1000); // Simulating delay to fetch data
  }
  
  // Function to check if user has scrolled to the bottom of the page
  function checkScroll() {
    let scrollY = window.scrollY;
    let visibleHeight = document.documentElement.clientHeight;
    let pageHeight = document.documentElement.scrollHeight;
  
    if (scrollY + visibleHeight >= pageHeight) {
      loadMoreReviews();
    }
  }
  
  // Event listener for scrolling
  window.addEventListener('scroll', checkScroll);
  
  // Initial display of reviews
  displayReviews(reviews);
  