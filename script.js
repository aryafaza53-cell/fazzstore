document.addEventListener('DOMContentLoaded', () => {
    // --- DATA PRODUK & PENGGUNA (SIMULASI) ---
    const products = [
        { id: 1, name: 'iPhone 15', price: 15000000, image: 'images/iphone-15.png' },
        { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 15000000, image: 'https://images.samsung.com/is/image/samsung/p6pim/hk_en/2401/gallery/hk-en-galaxy-s24-s928-489657-sm-s9280zogtgy-539359253?$330_330_JPG$' },
        { id: 3, name: 'Google Pixel 8', price: 11000000, image: 'https://api.bstore.co.id/storage/products/1736237543_google-pixel-8-pro-12-128gb-software-support_1.png' },
        { id: 4, name: 'Xiaomi 14', price: 9000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwWdiNK_VXclNDq0FWJWRLc6lbk0g_BjMvaQ&s' },
        { id: 5, name: 'iPhone 16', price: 17000000, image: 'https://assets.telkomsel.com/public/2025-01/iphone-16.png?VersionId=sXgco6Ke9KuZZjEpCoeJEq.9iISk2k5x' },
        { id: 6, name: 'Samsung Galaxy S25 Ultra', price: 20000000, image: 'https://images.samsung.com/id/smartphones/galaxy-s25-ultra/buy/product_color_silverBlue_PC.png' },
        { id: 7, name: 'Google Pixel 10', price: 19000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqoe2WqGesNGUnDki23vknB0Df-s4KIIY8ig&s' },
        { id: 8, name: 'Xiaomi 15', price: 15000000, image: 'https://wondamobile.com/cdn/shop/files/Xiaomi15All.png?v=1732677531' },
        { id: 9, name: 'Infinix Gt 30 Pro', price: 30000000, image: 'https://global.pro.infinixmobility.com/media/wysiwyg/X6873_GT30Pro_Base_4_1.webp'},
        { id: 10, name: 'Iphone 17', price: 18000000, image: 'https://portalnews.stekom.ac.id/media/27493/iphone-17-resmi-dirilis-dengan-desain-tipis-dan-fitur-revolusioner.jpg'},
        { id: 11, name: 'Iphone 13 Pro Max', price: 7000000, image: 'https://static.pasarwarga.com/imagescrop/product/550/product_temp_ebcc45f30b99e552e58bdd1deb86ab8e.jpeg'},
        { id: 12, name: 'Oppo Find X8 Pro', price: 20000000, image: 'https://www.oppo.com/content/dam/oppo_store/my/navigation/smartphones/find-x8-pro.webp'}
    ];

    // INI TIDAK AMAN! Hanya untuk simulasi.
    const FAKE_USER = {
        username: 'Arya Faza',
        password: '12345'
    };

    // --- ELEMEN DOM ---
    const loginContainer = document.getElementById('login-container');
    const shopContainer = document.getElementById('shop-container');
    const loginForm = document.getElementById('login-form');
    const userStatus = document.getElementById('user-status');
    
    const productList = document.getElementById('product-list');
    const searchBar = document.getElementById('search-bar');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const cartModal = document.getElementById('cart-modal');
    const checkoutPage = document.getElementById('checkout-page');

    let cart = [];

    // --- FUNGSI LOGIN & UI ---

    function handleLogin(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        if (username === FAKE_USER.username && password === FAKE_USER.password) {
            // Simpan status login di sessionStorage
            sessionStorage.setItem('loggedInUser', username);
            showShop(username);
        } else {
            alert('Username atau password salah!');
        }
    }

    function handleLogout() {
        // Hapus status login dari sessionStorage
        sessionStorage.removeItem('loggedInUser');
        showLogin();
    }

    function showLogin() {
        loginContainer.style.display = 'flex';
        shopContainer.style.display = 'none';
        userStatus.innerHTML = '';
    }

    function showShop(username) {
        loginContainer.style.display = 'none';
        shopContainer.style.display = 'block';
        userStatus.innerHTML = `
            Selamat datang, ${username}! 
            <button id="logout-btn">Logout</button>
        `;
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
        renderProducts(); // Tampilkan produk setelah berhasil login
    }

    function checkLoginStatus() {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            showShop(loggedInUser);
        } else {
            showLogin();
        }
    }

    // --- FUNGSI TOKO ---

    function renderProducts(filteredProducts) {
        productList.innerHTML = '';
        const productsToRender = filteredProducts || products;
        productsToRender.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>Rp${product.price.toLocaleString()}</p>
                    <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
                </div>
            `;
            productList.appendChild(productDiv);
        });
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();
    };

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.name} - Rp${item.price.toLocaleString()}</span>
                <button onclick="removeFromCart(${index})">Hapus</button>
            `;
            cartItems.appendChild(cartItemDiv);
            total += item.price;
        });
        totalPrice.textContent = total.toLocaleString();
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCart();
    };

    window.toggleCart = function() {
        cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    };

    window.checkout = function() {
        cartModal.style.display = 'none';
        document.querySelector('main').style.display = 'none';
        checkoutPage.style.display = 'block';
    }

    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih atas pesanan Anda!');
        cart = [];
        updateCart();
        checkoutPage.style.display = 'none';
        document.querySelector('main').style.display = 'block';
    });
    
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    // --- INITIALIZATION ---
    loginForm.addEventListener('submit', handleLogin);
    checkLoginStatus(); // Cek status login saat halaman dimuat
});