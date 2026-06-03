'use strict';

const STORAGE_KEY = 'cart-products';
const ANIMATION_STEPS = 25;
const ANIMATION_INTERVAL = 15;

const cart = document.querySelector('.cart');
const cartProducts = document.querySelector('.cart__products');

function updateCartVisibility() {
  if (cartProducts.children.length > 0) {
    cart.style.display = '';
  } else {
    cart.style.display = 'none';
  }
}

function saveCart() {
  const items = [];

  for (const product of cartProducts.querySelectorAll('.cart__product')) {
    items.push({
      id: product.dataset.id,
      src: product.querySelector('.cart__product-image').src,
      count: product.querySelector('.cart__product-count').textContent,
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createCartProduct(id, src, count) {
  const product = document.createElement('div');
  product.classList.add('cart__product');
  product.dataset.id = id;

  const image = document.createElement('img');
  image.classList.add('cart__product-image');
  image.src = src;

  const countElement = document.createElement('div');
  countElement.classList.add('cart__product-count');
  countElement.textContent = count;

  product.append(image, countElement);

  product.addEventListener('click', function () {
    const value = Number(countElement.textContent);

    if (value > 1) {
      countElement.textContent = value - 1;
    } else {
      product.remove();
    }

    updateCartVisibility();
    saveCart();
  });

  return product;
}

function addToCart(id, src, count) {
  const existing = cartProducts.querySelector('.cart__product[data-id="' + id + '"]');

  if (existing) {
    const countElement = existing.querySelector('.cart__product-count');
    countElement.textContent = Number(countElement.textContent) + count;
  } else {
    const product = createCartProduct(id, src, count);
    cartProducts.append(product);
  }

  updateCartVisibility();
  saveCart();
}

function flyToCart(image) {
  const start = image.getBoundingClientRect();
  const finish = cart.getBoundingClientRect();

  const clone = image.cloneNode();
  clone.classList.remove('product__image');
  clone.classList.add('product-shadow');
  clone.style.position = 'fixed';
  clone.style.left = start.left + 'px';
  clone.style.top = start.top + 'px';
  clone.style.width = start.width + 'px';
  clone.style.height = start.height + 'px';
  document.body.append(clone);

  const stepX = (finish.left - start.left) / ANIMATION_STEPS;
  const stepY = (finish.top - start.top) / ANIMATION_STEPS;

  let step = 0;
  const timer = setInterval(function () {
    step = step + 1;
    clone.style.left = start.left + stepX * step + 'px';
    clone.style.top = start.top + stepY * step + 'px';

    if (step >= ANIMATION_STEPS) {
      clearInterval(timer);
      clone.remove();
    }
  }, ANIMATION_INTERVAL);
}

function loadCart() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return;
  }

  const items = JSON.parse(saved);
  for (const item of items) {
    const product = createCartProduct(item.id, item.src, item.count);
    cartProducts.append(product);
  }
}

const products = document.querySelectorAll('.product');

for (const product of products) {
  const value = product.querySelector('.product__quantity-value');
  const decButton = product.querySelector('.product__quantity-control_dec');
  const incButton = product.querySelector('.product__quantity-control_inc');
  const addButton = product.querySelector('.product__add');
  const image = product.querySelector('.product__image');

  decButton.addEventListener('click', function () {
    const count = Number(value.textContent);
    if (count > 1) {
      value.textContent = count - 1;
    }
  });

  incButton.addEventListener('click', function () {
    value.textContent = Number(value.textContent) + 1;
  });

  addButton.addEventListener('click', function () {
    const count = Number(value.textContent);
    addToCart(product.dataset.id, image.src, count);
    flyToCart(image);
  });
}

loadCart();
updateCartVisibility();
