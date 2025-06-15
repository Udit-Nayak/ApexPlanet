document.addEventListener('DOMContentLoaded', () => {
    // To-Do List/Note-Taking App Logic
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
        { id: 1, name: 'Laptop Pro', category: 'electronics', price: 1200, rating: 4.5, image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Laptop' },
        { id: 2, name: 'Mystery Novel', category: 'books', price: 15, rating: 4.0, image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Book' },
        { id: 3, name: 'T-Shirt Classic', category: 'clothing', price: 25, rating: 4.2, image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=T-Shirt' },
        { id: 4, name: 'Smartphone X', category: 'electronics', price: 800, rating: 4.7, image: 'https://via.placeholder.com/150/FFFF00/000000?text=Phone' },
        { id: 5, name: 'Fantasy Epic', category: 'books', price: 20, rating: 4.8, image: 'https://via.placeholder.com/150/00FFFF/000000?text=Fantasy' },
        { id: 6, name: 'Jeans Slim Fit', category: 'clothing', price: 50, rating: 4.1, image: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Jeans' },
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
                <img src="${product.image}" alt="${product.name}" style="width:100px; height:100px; object-fit:cover;">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
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
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
        }

        displayProducts(filtered);
    }

    if (categoryFilter) categoryFilter.addEventListener('change', filterAndSortProducts);
    if (sortBy) sortBy.addEventListener('change', filterAndSortProducts);

    // Initial display of products
    filterAndSortProducts();
}); 