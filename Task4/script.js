document.addEventListener('DOMContentLoaded', () => {
    // To-Do List / Note-Taking App Logic
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            if (todo.completed) {
                li.classList.add('completed');
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            };

            li.addEventListener('click', () => {
                todo.completed = !todo.completed;
                saveTodos();
                renderTodos();
            });

            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', () => {
            const text = todoInput.value.trim();
            if (text) {
                todos.push({ text, completed: false });
                todoInput.value = '';
                saveTodos();
                renderTodos();
            }
        });
    }

    renderTodos();

    // Product Listing Page Logic
    const products = [
        { id: 1, name: 'Laptop Pro', category: 'electronics', price: 1200, rating: 4.5, image: 'images/laptop.jpg' },
        { id: 2, name: 'Mystery Novel', category: 'books', price: 15, rating: 4.0, image: 'images/novel.jpg' },
        { id: 3, name: 'T-Shirt Classic', category: 'clothing', price: 25, rating: 4.2, image: 'images/tshirt.jpg' },
        { id: 4, name: 'Smartphone X', category: 'electronics', price: 800, rating: 4.7, image: 'images/phone.jpg' },
        { id: 5, name: 'Cookbook', category: 'books', price: 30, rating: 4.3, image: 'images/cookbook.jpg' },
        { id: 6, name: 'Gaming Console', category: 'electronics', price: 400, rating: 4.9, image: 'images/gaming_console.jpg' },
        { id: 7, name: 'Desk Lamp', category: 'home', price: 45, rating: 3.8, image: 'images/lamp.jpg' },
        { id: 8, name: 'Winter Jacket', category: 'clothing', price: 120, rating: 4.6, image: 'images/jacket.jpg' },
    ];

    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');

    function displayProducts(filteredProducts) {
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p class="price">₹${product.price.toFixed(2)}</p>
                <p>Rating: ${product.rating}</p>
            `;
            productList.appendChild(productItem);
        });
    }

    function filterAndSortProducts() {
        let filtered = [...products];

        // Filter by category
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Sort products
        const sortOption = sortBy.value;
        switch (sortOption) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'default':
            default:
                // No specific sort, maintain original order or add a default sort logic if desired
                break;
        }

        displayProducts(filtered);
    }

    if (categoryFilter) categoryFilter.addEventListener('change', filterAndSortProducts);
    if (sortBy) sortBy.addEventListener('change', filterAndSortProducts);

    // Initial display of products
    filterAndSortProducts();
}); 