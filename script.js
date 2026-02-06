// Todo List 應用程式邏輯

document.addEventListener('DOMContentLoaded', () => {
    // 取得 DOM 元素
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // 狀態管理
    // 從 LocalStorage 讀取資料，若無則為空陣列
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all'; // 預設篩選狀態

    /**
     * 將待辦事項儲存至 LocalStorage
     */
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    /**
     * 渲染待辦事項列表
     */
    function renderTodos() {
        todoList.innerHTML = ''; // 清空列表

        // 根據目前的篩選條件過濾資料
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'active') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true; // 'all'
        });

        // 產生列表項目
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            // 使用 Template Literal 建立 HTML
            li.innerHTML = `
                <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''} aria-label="標記完成狀態">
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <button class="delete-btn" aria-label="刪除事項">×</button>
            `;

            // 綁定事件監聽器 (比全域委派更直觀)

            // 點擊 Checkbox 切換狀態
            const checkbox = li.querySelector('.checkbox');
            checkbox.addEventListener('change', () => toggleTodo(todo.id));

            // 點擊文字也可以切換狀態
            const todoText = li.querySelector('.todo-text');
            todoText.addEventListener('click', () => toggleTodo(todo.id));

            // 點擊刪除按鈕
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 避免觸發 li 的其他點擊事件 (如果有的話)
                deleteTodo(todo.id);
            });

            todoList.appendChild(li);
        });
    }

    /**
     * 新增待辦事項
     */
    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            const newTodo = {
                id: Date.now(), // 使用時間戳作為簡易 ID
                text: text,
                completed: false
            };
            todos.push(newTodo); // 加入陣列
            saveTodos(); // 存檔
            renderTodos(); // 重繪
            todoInput.value = ''; // 清空輸入框
            todoInput.focus();
        }
    }

    /**
     * 切換待辦事項完成狀態
     * @param {number} id - 待辦事項 ID
     */
    function toggleTodo(id) {
        todos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos();
        renderTodos();
    }

    /**
     * 刪除待辦事項
     * @param {number} id - 待辦事項 ID
     */
    function deleteTodo(id) {
        if (confirm('確定要刪除此事項嗎？')) {
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            renderTodos();
        }
    }

    /**
     * 設定篩選條件
     * @param {string} filter - 篩選類別 (all, active, completed)
     */
    function setFilter(filter) {
        currentFilter = filter;

        // 更新按鈕樣式
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        renderTodos();
    }

    /**
     * 簡易 HTML 跳脫 (防止 XSS)
     * @param {string} text 
     * @returns {string} escaped text
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // === 事件監聽綁定 ===

    // 新增按鈕點擊
    addBtn.addEventListener('click', addTodo);

    // 輸入框按 Enter
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    // 篩選按鈕點擊
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
        });
    });

    // 初始化應用程式
    renderTodos();
    console.log('Todo App Ready');
});
