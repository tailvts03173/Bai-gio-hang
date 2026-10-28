import { cart } from './data.js';

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' đ';
}

function deleteProductById(id) {
    const index = cart.findIndex(function(item) {
        return item.id === id;
    });
    if (index !== -1) {
        cart.splice(index, 1);
    }
}

function clearAllProducts() {
    cart.length = 0;
}

function renderCart() {
    const cartBody = document.getElementById('cart-body');
    const totalPriceEl = document.getElementById('total-price');
    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach(function(item, index) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${item.image}" alt="" class="product-img"></td>
            <td>${item.name}</td>
            <td>${formatPrice(item.price)}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="qty-input" data-id="${item.id}"></td>
            <td>${formatPrice(itemTotal)}</td>
            <td><button class="btn-delete" data-id="${item.id}">Xoá</button></td>
        `;
        cartBody.appendChild(tr);
    });

    totalPriceEl.textContent = formatPrice(total);
}

function setupEventListeners() {
    const cartBody = document.getElementById('cart-body');
    const btnClearAll = document.getElementById('btn-clear-all');

    cartBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-delete')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            deleteProductById(id);
            renderCart();
        }
    });

    cartBody.addEventListener('change', function(e) {
        if (e.target.classList.contains('qty-input')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            const newQty = parseInt(e.target.value);
            const product = cart.find(function(item) {
                return item.id === id;
            });
            if (product && newQty > 0) {
                product.quantity = newQty;
                renderCart();
            }
        }
    });

    btnClearAll.addEventListener('click', function() {
        clearAllProducts();
        renderCart();
    });
}

export function initCart() {
    setupEventListeners();
    renderCart();
}