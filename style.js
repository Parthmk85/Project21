// ===== Product Data =====
const products = [
    {
        id: 1,
        name: 'Wireless Headphones Pro',
        category: 'electronics',
        price: 299.99,
        rating: 4.8,
        reviews: 1234,
        badge: 'Best Seller',
        image: 'images/headphones_pro.png',
        description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.'
    },
    {
        id: 2,
        name: 'Smart Watch Ultra',
        category: 'electronics',
        price: 399.99,
        rating: 4.9,
        reviews: 2156,
        badge: 'New',
        image: 'images/smart_watch.png',
        description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life. Stay connected and healthy with cutting-edge technology.'
    },
    {
        id: 3,
        name: 'Designer Leather Jacket',
        category: 'fashion',
        price: 249.99,
        rating: 4.7,
        reviews: 856,
        badge: 'Trending',
        image: 'images/leather_jacket.png',
        description: 'Handcrafted genuine leather jacket with premium stitching and timeless design. A wardrobe essential for any fashion enthusiast.'
    },
    {
        id: 4,
        name: 'Premium Running Shoes',
        category: 'sports',
        price: 159.99,
        rating: 4.6,
        reviews: 1543,
        badge: 'Sale',
        image: 'images/running_shoes.png',
        description: 'Lightweight running shoes with advanced cushioning and breathable mesh. Engineered for performance and comfort.'
    },
    {
        id: 5,
        name: 'Modern Table Lamp',
        category: 'home',
        price: 89.99,
        rating: 4.5,
        reviews: 432,
        badge: null,
        image: 'images/table_lamp.png',
        description: 'Elegant table lamp with adjustable brightness and minimalist design. Perfect for your home office or bedroom.'
    },
    {
        id: 6,
        name: 'Bluetooth Speaker',
        category: 'electronics',
        price: 129.99,
        rating: 4.7,
        reviews: 987,
        badge: 'Popular',
        image: 'images/bluetooth_speaker.png',
        description: 'Portable Bluetooth speaker with 360° sound, waterproof design, and 12-hour battery. Take your music anywhere.'
    },
    {
        id: 7,
        name: 'Casual Denim Jeans',
        category: 'fashion',
        price: 79.99,
        rating: 4.4,
        reviews: 654,
        badge: null,
        image: 'images/denim_jeans.png',
        description: 'Classic denim jeans with comfortable fit and durable fabric. A versatile addition to any casual wardrobe.'
    },
    {
        id: 8,
        name: 'Yoga Mat Premium',
        category: 'sports',
        price: 49.99,
        rating: 4.8,
        reviews: 1876,
        badge: 'Best Seller',
        image: 'images/yoga_mat.png',
        description: 'Non-slip yoga mat with extra cushioning and eco-friendly materials. Perfect for yoga, pilates, and fitness.'
    },
    {
        id: 9,
        name: 'Coffee Maker Deluxe',
        category: 'home',
        price: 199.99,
        rating: 4.6,
        reviews: 543,
        badge: 'New',
        image: 'images/coffee_maker.png',
        description: 'Programmable coffee maker with thermal carafe and brew strength control. Start your day with perfect coffee.'
    },
    {
        id: 10,
        name: '4K Action Camera',
        category: 'electronics',
        price: 349.99,
        rating: 4.9,
        reviews: 765,
        badge: 'Trending',
        image: 'images/action_camera.png',
        description: 'Waterproof 4K action camera with image stabilization and wide-angle lens. Capture your adventures in stunning detail.'
    },
    {
        id: 11,
        name: 'Silk Scarf Collection',
        category: 'fashion',
        price: 59.99,
        rating: 4.5,
        reviews: 321,
        badge: null,
        image: 'images/silk_scarf.png',
        description: 'Luxurious silk scarf with elegant patterns and vibrant colors. Add sophistication to any outfit.'
    },
    {
        id: 12,
        name: 'Tennis Racket Pro',
        category: 'sports',
        price: 189.99,
        rating: 4.7,
        reviews: 432,
        badge: 'Sale',
        image: 'images/tennis_racket.png',
        description: 'Professional-grade tennis racket with carbon fiber frame and perfect balance. Elevate your game.'
    }
];

// ===== State Management =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const productModal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const toast = document.getElementById('toast');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchModalOverlay = document.getElementById('searchModalOverlay');
const searchModalClose = document.getElementById('searchModalClose');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    initEventListeners();
    initScrollEffects();
});

// ===== Event Listeners =====
function initEventListeners() {
    // Navigation
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Search button
    searchBtn.addEventListener('click', handleSearch);
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });
    
    // Cart
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    checkoutBtn.addEventListener('click', handleCheckout);
    
    // Modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Search Modal
    searchModalClose.addEventListener('click', closeSearchModal);
    searchModalOverlay.addEventListener('click', closeSearchModal);
    searchForm.addEventListener('submit', handleSearchSubmit);
    
    // Filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });
    
    // Forms
    contactForm.addEventListener('submit', handleContactForm);
    newsletterForm.addEventListener('submit', handleNewsletterForm);
}

// ===== Scroll Effects =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .product-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== Mobile Menu =====
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}

// ===== Search Function =====
function handleSearch() {
    // Open search modal
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on input after a short delay
    setTimeout(() => {
        searchInput.focus();
    }, 300);
}

function closeSearchModal() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
}

function handleSearchSubmit(e) {
    e.preventDefault();
    
    const searchQuery = searchInput.value.trim();
    
    if (searchQuery) {
        // Close modal
        closeSearchModal();
        
        // Scroll to products section
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Show toast message
        showToast(`Searching for "${searchQuery}"...`);
    }
}



// ===== Products =====
function renderProducts() {
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 2L7 6"></path>
                            <path d="M17 2l2 4"></path>
                            <path d="M3 6h18v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-observe new elements
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 50);
        });
    }, 10);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '☆';
    }
    while (stars.length < 5) {
        stars += '☆';
    }
    
    return stars;
}

// ===== Product Modal =====
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h2>${product.name}</h2>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="modal-product-price">$${product.price.toFixed(2)}</div>
                <p class="modal-product-description">${product.description}</p>
                <button class="btn btn-primary btn-block" onclick="addToCart(${product.id}); closeModal();">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Cart Functions =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showToast('Item added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showToast('Item removed from cart');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function handleCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    showToast('Proceeding to checkout...');
    setTimeout(() => {
        alert('Thank you for your order! This is a demo, so no actual payment will be processed.');
        cart = [];
        saveCart();
        updateCartUI();
        closeCartSidebar();
    }, 1000);
}

// ===== Toast Notification =====
function showToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ===== Forms =====
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    showToast('Message sent successfully!');
    contactForm.reset();
    
    console.log('Contact Form:', { name, email, subject, message });
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    showToast('Successfully subscribed to newsletter!');
    newsletterForm.reset();
    
    console.log('Newsletter subscription:', email);
}

// ===== Make functions globally accessible =====
window.openProductModal = openProductModal;
window.closeModal = closeModal;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
