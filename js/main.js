/* CSC 106 Term Project — main.js
   Student: Chimtokarisiri Praise Chukwunonye
   Matric No: 2025/C/CYB/1163

   JavaScript requirements demonstrated:
   - Event handling
   - DOM manipulation
   - Form validation
   - Dynamic content updates
   - Arrays and functions
   - Interactive task management system
*/

(function () {
    "use strict";

    // ------------------------------------------------------------------
    // Mobile navigation toggle (event handling)
    // ------------------------------------------------------------------
    var mobileToggle = document.getElementById("mobile-toggle");
    var navLinks = document.getElementById("nav-links");

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", function () {
            var isActive = navLinks.classList.contains("active");
            if (isActive) {
                navLinks.classList.remove("active");
            } else {
                navLinks.classList.add("active");
            }
        });
    }

    // ------------------------------------------------------------------
    // Academic Planner — interactive task management (DOM manipulation,
    // arrays, functions, dynamic updates)
    // ------------------------------------------------------------------
    var taskForm = document.getElementById("task-form");
    var taskInput = document.getElementById("task-input");
    var taskList = document.getElementById("task-list");
    var emptyTasks = document.getElementById("empty-tasks");

    // Array holding the current tasks (requirement: arrays)
    var tasks = [];

    // Render the task list to the page (dynamic content update)
    function renderTasks() {
        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.appendChild(emptyTasks);
            return;
        }

        // hide the "no tasks" message when there are tasks
        emptyTasks.style.display = "none";

        tasks.forEach(function (task, index) {
            var item = document.createElement("li");
            item.className = "task-item" + (task.completed ? " completed" : "");

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", function () {
                toggleTask(index);
            });

            var span = document.createElement("span");
            span.className = "task-text";
            span.textContent = task.text;

            var actions = document.createElement("div");
            actions.className = "task-actions";

            var doneBtn = document.createElement("button");
            doneBtn.className = "btn-done";
            doneBtn.textContent = task.completed ? "Undo" : "Done";
            doneBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                toggleTask(index);
            });

            var deleteBtn = document.createElement("button");
            deleteBtn.className = "btn-delete";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                deleteTask(index);
            });

            actions.appendChild(doneBtn);
            actions.appendChild(deleteBtn);

            item.appendChild(checkbox);
            item.appendChild(span);
            item.appendChild(actions);

            taskList.appendChild(item);
        });
    }

    // Add a new task (event handling + array push + dynamic update)
    function addTask(text) {
        if (!text || text.trim() === "") {
            return;
        }
        tasks.push({
            id: Date.now(),
            text: text.trim(),
            completed: false
        });
        taskInput.value = "";
        renderTasks();
    }

    // Toggle completion status of a task
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Delete a task (array splice + dynamic update)
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    if (taskForm && taskInput) {
        taskForm.addEventListener("submit", function (e) {
            e.preventDefault();
            addTask(taskInput.value);
        });
    }

    // initial render
    renderTasks();

    // ------------------------------------------------------------------
    // Contact form validation (form validation + event handling)
    // ------------------------------------------------------------------
    var contactForm = document.getElementById("contact-form");
    var formMessage = document.getElementById("form-message");

    // Validate an email address format
    function isValidEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validate that a phone number contains digits only (allowing optional +)
    function isValidPhone(phone) {
        var re = /^\+?[\d\s\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, "").length >= 7;
    }

    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var name = contactForm.elements["name"].value.trim();
            var email = contactForm.elements["email"].value.trim();
            var phone = contactForm.elements["phone"].value.trim();
            var message = contactForm.elements["message"].value.trim();

            formMessage.style.color = "#e74c3c";

            // Validation: no field is empty
            if (name === "" || email === "" || phone === "" || message === "") {
                formMessage.textContent = "Please fill in all fields.";
                return;
            }

            // Validation: email format is valid
            if (!isValidEmail(email)) {
                formMessage.textContent = "Please enter a valid email address.";
                return;
            }

            // Validation: phone number contains only digits
            if (!isValidPhone(phone)) {
                formMessage.textContent = "Please enter a valid phone number (digits only).";
                return;
            }

            // All validations passed
            formMessage.style.color = "#2ecc71";
            formMessage.textContent =
                "Thank you, " + name + "! Your message has been sent successfully.";
            contactForm.reset();
        });
    }

})();
