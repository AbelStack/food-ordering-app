// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.menu-card button');

// Initialize an empty cart or retrieve it from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to all "Add to Cart" buttons
addToCartButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const menuCard = event.target.parentElement;
    const itemName = menuCard.querySelector('h3').textContent;
    const itemPrice = parseFloat(menuCard.querySelector('p').textContent.replace('$', ''));
    const itemImage = menuCard.querySelector('img').src;

    // Call the addToCart function
    addToCart(itemName, itemPrice, itemImage);
  });
});

// Function to add an item to the cart
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the item already exists in the cart
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    // If the item exists, increase its quantity
    cart[index].quantity += 1;
  } else {
    // If the item doesn't exist, add it to the cart
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Show a confirmation message
  showNotification(`${name} has been added to your cart.`);
}
// Hardcoded credentials for simplicity
const users = [
  { username: "admin", password: "12345" },
  { username: "user", password: "password" }
];

// Open the login modal
function openLoginModal() {
  document.getElementById("login-modal").style.display = "block";
}

// Close the login modal
function closeLoginModal() {
  document.getElementById("login-modal").style.display = "none";
}

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("login-error");

  // Check if the entered credentials match any user
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Successful login
    alert("Login successful!");
    closeLoginModal();
    // Update UI to show logged-in state
    document.querySelector(".nav-actions").innerHTML = `<strong>Welcome, ${username}</strong>`;
  } else {
    // Invalid credentials
    errorMessage.textContent = "Invalid username or password. Please try again.";
  }
});

// Search functionality
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const menuCards = document.querySelectorAll(".menu-card");

function filterMenu(searchTerm) {
  let foundResults = false;

  menuCards.forEach((card) => {
    const dishName = card.querySelector("h3").textContent.toLowerCase();
    if (dishName.includes(searchTerm)) {
      card.style.display = "block"; // Show matching items
      foundResults = true;
    } else {
      card.style.display = "none"; // Hide non-matching items
    }
  }); }
  // Function to show notification
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("show");

  // Remove the notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}