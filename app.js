document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Black Pique Polo Shirt", price: 450, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\1.jpg" },
        { id: 2, name: "Black Hooded Puffer Jacket", price: 1500, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\2.jpg", featured: true },
        { id: 3, name: "Relaxed Fit Denim Jeans", price: 650, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\3.jpg" },
        { id: 4, name: "Black Levi's Logo Hoodie", price: 900, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\4.jpg", featured: true },
        { id: 5, name: "Black Knit Sneakers", price: 700, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\5.jpg" },
        { id: 6, name: "'Play Ball' Snapback Cap", price: 350, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\6.webp", featured: true },
        { id: 7, name: "Grey Knit Polo Shirt", price: 500, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\7.jpg" },
        { id: 8, name: "Navy Blue Puffer Jacket", price: 1400, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\8.jpg" },
        { id: 9, name: "Oversized Black Sweatshirt", price: 600, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\9.jpg" },
        { id: 10, name: "Light Grey Windbreaker Jacket", price: 800, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\10.jpg" },
        { id: 11, name: "Assorted New Arrivals", price: 550, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\11.jpg" },
        { id: 12, name: "Yellow Mountain Parka", price: 1800, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\12.jpg", featured: true },
        { id: 13, name: "Cropped Puffer Jacket", price: 1300, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\13.jpg" },
        { id: 14, name: "Winter Expedition Parka", price: 2200, image: "C:\\Users\\ahmed23\\OneDrive\\Desktop\\VogueVault\\images\\14.jpg" }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }

    function addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
        }
        saveCart();
        alert(`${product.name} added to cart!`);
    }

    function displayProducts(containerId, productList) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        productList.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <a href="product-detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <p class="price">EGP ${product.price.toFixed(2)}</p>
                    <button class="btn add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            `;
            container.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                addToCart(id, 1);
            });
        });
    }

    function displayProductDetails() {
        const container = document.getElementById('product-detail-container');
        if (!container) return;

        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId);

        if (!product) {
            container.innerHTML = '<p>Product not found.</p>';
            return;
        }

        container.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <p class="price">EGP ${product.price.toFixed(2)}</p>
                <p>Sample product description. This item is made from the finest materials, suitable for all occasions. A unique design that combines elegance and comfort.</p>
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" value="1" min="1">
                <button class="btn" id="add-to-cart-detail">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;

        document.getElementById('add-to-cart-detail').addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            addToCart(product.id, quantity);
        });
    }

    function displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="5" style="text-align:center;">Your cart is empty.</td></tr>';
            cartSummary.style.display = 'none';
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            const cartRow = document.createElement('tr');
            cartRow.innerHTML = `
                <td>
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <h4>${item.name}</h4>
                            <small class="price">EGP ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                </td>
                <td>EGP ${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </td>
            `;
            cartItemsContainer.appendChild(cartRow);
        });

        cartSummary.style.display = 'block';
        document.getElementById('subtotal').textContent = `EGP ${subtotal.toFixed(2)}`;
        const tax = subtotal * 0.14;
        document.getElementById('tax').textContent = `EGP ${tax.toFixed(2)}`;
        const total = subtotal + tax;
        document.getElementById('total-price').textContent = `EGP ${total.toFixed(2)}`;

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                cart = cart.filter(item => item.id !== id);
                saveCart();
                displayCart();
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = parseInt(e.target.dataset.id);
                const newQuantity = parseInt(e.target.value);
                const item = cart.find(item => item.id === id);
                if (item && newQuantity > 0) {
                    item.quantity = newQuantity;
                    saveCart();
                    displayCart();
                } else {
                    e.target.value = item.quantity;
                }
            });
        });
    }

    function setupAuthForms() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const toggleToRegister = document.getElementById('toggle-register');
        const toggleToLogin = document.getElementById('toggle-login');

        if (toggleToRegister) {
            toggleToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            });
        }

        if (toggleToLogin) {
            toggleToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            });
        }

        if (registerForm) {
        
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const isAdmin = document.getElementById('reg-admin') ? document.getElementById('reg-admin').checked : false;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = users.find(u => u.username === username || u.email === email);

            if (existingUser) {
                alert('Username or email is already registered.');
            } else {
                users.push({ username, email, password, isAdmin });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful! You can now log in.');
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            }
        });
    }


        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('login-username').value;
                const password = document.getElementById('login-password').value;
                
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(u => u.username === username && u.password === password);

                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    alert('Login successful!');
                    window.location.href = 'profile.html';
                } else {
                    alert('Invalid username or password.');
                }
            });
        }
    }

     {
        
        function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navAccount = document.getElementById('nav-account');
    const navProfile = document.getElementById('nav-profile');
    const navCart = document.getElementById('nav-cart');
    const navAdmin = document.getElementById('nav-admin');

    if (currentUser) {
        if (navAccount) navAccount.style.display = 'none';
        if (navProfile) navProfile.style.display = 'block';
        
    
        if (navAdmin) {
            navAdmin.style.display = currentUser.isAdmin ? 'block' : 'none';
        }
    } else {
        if (navAccount) navAccount.style.display = 'block';
        if (navProfile) navProfile.style.display = 'none';
        if (navAdmin) navAdmin.style.display = 'none';
    }
    
    const path = window.location.pathname.split('/').pop();
    if (path === 'profile.html' && !currentUser) {
        window.location.href = 'Account.html';
    }
}
    
    function displayProfile() {
        const profileContainer = document.getElementById('profile-info');
        if (!profileContainer) return;
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            profileContainer.innerHTML = `
                <p><strong>Username:</strong> ${currentUser.username}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
            `;
        }
        
        const logoutButton = document.getElementById('logout-btn');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                alert('Logged out successfully.');
                window.location.href = 'index.html';
            });
        }
    }
    
    function setupCheckout() {
        const proceedBtn = document.getElementById('proceed-checkout');
        const checkoutForm = document.getElementById('checkout-form');
        const paymentForm = document.getElementById('payment-form');

        if (proceedBtn) {
            proceedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!currentUser) {
                    alert('You must be logged in to complete your purchase.');
                    window.location.href = 'Account.html';
                } else {
                    checkoutForm.style.display = 'block';
                    proceedBtn.style.display = 'none';
                }
            });
        }
        
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Your order has been placed successfully! Thank you for shopping with us.');
                cart = [];
                saveCart();
                window.location.href = 'index.html';
            });
        }
    }
    
    function setActiveNav() {
        const path = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('header nav ul li a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            }
        });
    }

    checkAuth();
    updateCartCount();
    setActiveNav();
    
    const featuredProducts = products.filter(p => p.featured);
    displayProducts('featured-products-grid', featuredProducts);
    displayProducts('all-products-grid', products);
    
    displayProductDetails();
    displayCart();
    setupAuthForms();
    displayProfile();
    setupCheckout();
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}
});