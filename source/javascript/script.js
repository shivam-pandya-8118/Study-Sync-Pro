// ========================================
// MOTIVATIONAL QUOTES DATABASE
// ========================================
const motivationalQuotes = [
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
  },
  {
    text: "Education is not preparation for life; education is life itself.",
    author: "John Dewey",
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown",
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Unknown",
  },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  {
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown",
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
  },
  { text: "Dream bigger. Do bigger.", author: "Unknown" },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown",
  },
  {
    text: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown",
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Sean Patrick Flanery",
  },
  { text: "Little things make big days.", author: "Unknown" },
  {
    text: "It's going to be hard, but hard does not mean impossible.",
    author: "Unknown",
  },
  { text: "Don't wait for opportunity. Create it.", author: "Unknown" },
  {
    text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    author: "Unknown",
  },
  {
    text: "The key to success is to focus on goals, not obstacles.",
    author: "Unknown",
  },
];

// ========================================
// DATA MANAGEMENT
// ========================================

class DataManager {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    // Initialize default subjects
    if (!localStorage.getItem("subjects")) {
      const defaultSubjects = [
        { id: this.generateId(), name: "Data Structures", code: "CS201" },
        { id: this.generateId(), name: "Algorithms", code: "CS202" },
        {
          id: this.generateId(),
          name: "Database Management",
          code: "CS301",
        },
        {
          id: this.generateId(),
          name: "Operating Systems",
          code: "CS302",
        },
        {
          id: this.generateId(),
          name: "Computer Networks",
          code: "CS401",
        },
      ];
      localStorage.setItem("subjects", JSON.stringify(defaultSubjects));
    }

    // Initialize default work types
    if (!localStorage.getItem("workTypes")) {
      const defaultWorkTypes = [
        { id: this.generateId(), name: "Assignment" },
        { id: this.generateId(), name: "Lab Manual" },
        { id: this.generateId(), name: "Project" },
        { id: this.generateId(), name: "Notes" },
        { id: this.generateId(), name: "Presentation" },
        { id: this.generateId(), name: "Quiz" },
        { id: this.generateId(), name: "Exam Preparation" },
      ];
      localStorage.setItem("workTypes", JSON.stringify(defaultWorkTypes));
    }

    // Initialize work items
    if (!localStorage.getItem("workItems")) {
      localStorage.setItem("workItems", JSON.stringify([]));
    }

    // Initialize quote tracking
    if (!localStorage.getItem("usedQuotes")) {
      localStorage.setItem("usedQuotes", JSON.stringify([]));
    }
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Subject CRUD
  getSubjects() {
    return JSON.parse(localStorage.getItem("subjects") || "[]");
  }

  addSubject(subject) {
    const subjects = this.getSubjects();
    subject.id = this.generateId();
    subjects.push(subject);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    return subject;
  }

  updateSubject(id, updates) {
    const subjects = this.getSubjects();
    const index = subjects.findIndex((s) => s.id === id);
    if (index !== -1) {
      subjects[index] = { ...subjects[index], ...updates };
      localStorage.setItem("subjects", JSON.stringify(subjects));

      // Update work items with this subject
      const workItems = this.getWorkItems();
      workItems.forEach((item) => {
        if (item.subjectId === id) {
          item.subject = updates.name || subjects[index].name;
          item.subjectCode = updates.code || subjects[index].code;
        }
      });
      localStorage.setItem("workItems", JSON.stringify(workItems));
    }
  }

  deleteSubject(id) {
    const workItems = this.getWorkItems();
    const isUsed = workItems.some((item) => item.subjectId === id);

    if (isUsed) {
      return {
        success: false,
        message: "Cannot delete subject that is in use by work items",
      };
    }

    const subjects = this.getSubjects().filter((s) => s.id !== id);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    return { success: true };
  }

  // Work Type CRUD
  getWorkTypes() {
    return JSON.parse(localStorage.getItem("workTypes") || "[]");
  }

  addWorkType(workType) {
    const workTypes = this.getWorkTypes();
    workType.id = this.generateId();
    workTypes.push(workType);
    localStorage.setItem("workTypes", JSON.stringify(workTypes));
    return workType;
  }

  updateWorkType(id, updates) {
    const workTypes = this.getWorkTypes();
    const index = workTypes.findIndex((wt) => wt.id === id);
    if (index !== -1) {
      workTypes[index] = { ...workTypes[index], ...updates };
      localStorage.setItem("workTypes", JSON.stringify(workTypes));

      // Update work items with this type
      const workItems = this.getWorkItems();
      workItems.forEach((item) => {
        if (item.workTypeId === id) {
          item.type = updates.name || workTypes[index].name;
        }
      });
      localStorage.setItem("workItems", JSON.stringify(workItems));
    }
  }

  deleteWorkType(id) {
    const workItems = this.getWorkItems();
    const isUsed = workItems.some((item) => item.workTypeId === id);

    if (isUsed) {
      return {
        success: false,
        message: "Cannot delete work type that is in use by work items",
      };
    }

    const workTypes = this.getWorkTypes().filter((wt) => wt.id !== id);
    localStorage.setItem("workTypes", JSON.stringify(workTypes));
    return { success: true };
  }

  // Work Item CRUD
  getWorkItems() {
    return JSON.parse(localStorage.getItem("workItems") || "[]");
  }

  addWorkItem(workItem) {
    const workItems = this.getWorkItems();
    workItem.id = this.generateId();
    workItem.status = "not-started";
    workItem.createdAt = new Date().toISOString();
    workItems.push(workItem);
    localStorage.setItem("workItems", JSON.stringify(workItems));
    return workItem;
  }

  updateWorkItem(id, updates) {
    const workItems = this.getWorkItems();
    const index = workItems.findIndex((wi) => wi.id === id);
    if (index !== -1) {
      workItems[index] = { ...workItems[index], ...updates };
      localStorage.setItem("workItems", JSON.stringify(workItems));
    }
  }

  deleteWorkItem(id) {
    const workItems = this.getWorkItems().filter((wi) => wi.id !== id);
    localStorage.setItem("workItems", JSON.stringify(workItems));
  }

  // Student Name
  getStudentName() {
    return localStorage.getItem("studentName") || null;
  }

  setStudentName(name) {
    localStorage.setItem("studentName", name);
  }

  // Quote Management
  getUsedQuotes() {
    return JSON.parse(localStorage.getItem("usedQuotes") || "[]");
  }

  setUsedQuotes(quotes) {
    localStorage.setItem("usedQuotes", JSON.stringify(quotes));
  }

  getLastQuoteTime() {
    return localStorage.getItem("lastQuoteTime");
  }

  setLastQuoteTime(time) {
    localStorage.setItem("lastQuoteTime", time);
  }

  getCurrentQuote() {
    return JSON.parse(localStorage.getItem("currentQuote") || "null");
  }

  setCurrentQuote(quote) {
    localStorage.setItem("currentQuote", JSON.stringify(quote));
  }
}

// ========================================
// FORCEFUL DELETE FUNCTIONS
// ========================================

function deleteAllWorkItems() {
  if (
    confirm(
      "⚠️ WARNING: This will permanently delete ALL work items. This action cannot be undone!\n\nAre you absolutely sure?"
    )
  ) {
    localStorage.setItem("workItems", JSON.stringify([]));
    ui.updateDashboard();
    ui.updateAnalytics();
    ui.showToast("All work items have been permanently deleted", "success");
    console.log("All work items deleted forcefully");
  }
}

function clearSubjects() {
  if (
    confirm(
      "⚠️ WARNING: This will permanently delete ALL subjects and their associated work items. This action cannot be undone!\n\nAre you absolutely sure?"
    )
  ) {
    // Clear subjects
    localStorage.setItem("subjects", JSON.stringify([]));

    // Also clear all work items since they depend on subjects
    localStorage.setItem("workItems", JSON.stringify([]));

    ui.updateSubjectsList();
    ui.updateDashboard();
    ui.updateAnalytics();
    ui.showToast(
      "All subjects and related work items have been permanently deleted",
      "success"
    );
    console.log("All subjects cleared forcefully");
  }
}

function clearWorkTypes() {
  if (
    confirm(
      "⚠️ WARNING: This will permanently delete ALL work types and their associated work items. This action cannot be undone!\n\nAre you absolutely sure?"
    )
  ) {
    // Clear work types
    localStorage.setItem("workTypes", JSON.stringify([]));

    // Also clear all work items since they depend on work types
    localStorage.setItem("workItems", JSON.stringify([]));

    ui.updateWorkTypesList();
    ui.updateDashboard();
    ui.updateAnalytics();
    ui.showToast(
      "All work types and related work items have been permanently deleted",
      "success"
    );
    console.log("All work types cleared forcefully");
  }
}

// ========================================
// UI MANAGER
// ========================================

class UIManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.currentFilter = "all";
    this.currentSort = { column: null, direction: "asc" };
    this.charts = {};
  }

  // Toast Notifications
  showToast(message, type = "info", title = "") {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icons = {
      success: "fa-check-circle",
      error: "fa-times-circle",
      warning: "fa-exclamation-triangle",
      info: "fa-info-circle",
    };

    const titles = {
      success: title || "Success",
      error: title || "Error",
      warning: title || "Warning",
      info: title || "Info",
    };

    toast.innerHTML = `
                    <div class="toast-icon"><i class="fas ${icons[type]}"></i></div>
                    <div class="toast-content">
                        <div class="toast-title">${titles[type]}</div>
                        <div class="toast-message">${message}</div>
                    </div>
                `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideInRight 0.3s ease-out reverse";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Modal Management
  openModal(modalId) {
    document.getElementById(modalId).classList.add("active");
  }

  closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
  }

  showConfirmModal(message, onConfirm) {
    document.getElementById("confirmMessage").textContent = message;
    this.openModal("confirmModal");

    const confirmBtn = document.getElementById("confirmButton");
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.addEventListener("click", () => {
      onConfirm();
      this.closeModal("confirmModal");
    });
  }

  // Dashboard
  updateDashboard() {
    this.updateStats();
    this.updateWorkItemsTable();
  }

  updateStats() {
    const workItems = this.dataManager.getWorkItems();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const total = workItems.length;
    const pending = workItems.filter((w) => w.status === "pending").length;
    const notStarted = workItems.filter(
      (w) => w.status === "not-started"
    ).length;
    const completed = workItems.filter((w) => w.status === "completed").length;

    const overdue = workItems.filter((w) => {
      if (!w.deadline) return false;
      const deadline = new Date(w.deadline);
      deadline.setHours(0, 0, 0, 0);
      return deadline < now && w.status !== "completed";
    }).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending + notStarted;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("overdueTasks").textContent = overdue;
  }

  updateWorkItemsTable() {
    const workItems = this.dataManager.getWorkItems();
    const tbody = document.getElementById("workItemsBody");
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();

    let filteredItems = workItems;

    // Apply filter
    if (this.currentFilter !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.status === this.currentFilter
      );
    }

    // Apply search
    if (searchTerm) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.subject.toLowerCase().includes(searchTerm) ||
          item.type.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.faculty.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sort
    if (this.currentSort.column) {
      filteredItems.sort((a, b) => {
        let aVal = a[this.currentSort.column];
        let bVal = b[this.currentSort.column];

        if (this.currentSort.column === "daysLeft") {
          aVal = this.calculateDaysLeft(a.deadline);
          bVal = this.calculateDaysLeft(b.deadline);
        }

        if (aVal < bVal) return this.currentSort.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return this.currentSort.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    if (filteredItems.length === 0) {
      tbody.innerHTML = `
                        <tr>
                            <td colspan="9" class="text-center">
                                <div class="empty-state">
                                    <div class="empty-state-icon"><i class="fas fa-inbox"></i></div>
                                    <div class="empty-state-text">No work items found</div>
                                </div>
                            </td>
                        </tr>
                    `;
      return;
    }

    tbody.innerHTML = filteredItems
      .map((item) => {
        const daysLeftInfo = this.getDaysLeftDisplay(item.deadline);
        const statusBadge = this.getStatusBadge(item.status);

        return `
                        <tr>
                            <td><strong>${
                              item.subject
                            }</strong><br><small class="text-muted">${
          item.subjectCode
        }</small></td>
                            <td>${item.type}</td>
                            <td>${item.description}</td>
                            <td>${this.formatDate(item.issued)}</td>
                            <td>${
                              item.deadline
                                ? this.formatDate(item.deadline)
                                : '<span class="no-deadline">No Deadline</span>'
                            }</td>
                            <td>${daysLeftInfo}</td>
                            <td>${item.faculty}</td>
                            <td>${statusBadge}</td>
                            <td>
                                <div class="action-buttons">
                                    ${
                                      item.status !== "completed"
                                        ? `
                                        <button class="btn btn-sm btn-success" onclick="ui.toggleStatus('${
                                          item.id
                                        }')" title="Mark as ${
                                            item.status === "not-started"
                                              ? "Pending"
                                              : "Completed"
                                          }">
                                            <i class="fas ${
                                              item.status === "not-started"
                                                ? "fa-play"
                                                : "fa-check"
                                            }"></i>
                                        </button>
                                    `
                                        : ""
                                    }
                                    <button class="btn btn-sm btn-primary" onclick="ui.openEditWorkModal('${
                                      item.id
                                    }')" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="ui.deleteWorkItem('${
                                      item.id
                                    }')" title="Delete">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;
      })
      .join("");
  }

  calculateDaysLeft(deadline) {
    if (!deadline) return Infinity;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getDaysLeftDisplay(deadline) {
    if (!deadline) return '<span class="no-deadline">No Deadline</span>';

    const daysLeft = this.calculateDaysLeft(deadline);

    if (daysLeft < 0) {
      return `<span class="days-left overdue"><i class="fas fa-exclamation-circle"></i> ${Math.abs(
        daysLeft
      )} days overdue</span>`;
    } else if (daysLeft === 0) {
      return '<span class="days-left today"><i class="fas fa-clock"></i> Due Today</span>';
    } else if (daysLeft === 1) {
      return '<span class="days-left today"><i class="fas fa-calendar-day"></i> Tomorrow</span>';
    } else if (daysLeft <= 7) {
      return `<span class="days-left upcoming"><i class="fas fa-calendar-week"></i> ${daysLeft} days left</span>`;
    } else {
      return `<span class="days-left future"><i class="fas fa-calendar-alt"></i> ${daysLeft} days left</span>`;
    }
  }

  getStatusBadge(status) {
    const badges = {
      "not-started":
        '<span class="badge badge-not-started"><i class="fas fa-circle"></i> Not Started</span>',
      pending:
        '<span class="badge badge-pending"><i class="fas fa-spinner"></i> Pending</span>',
      completed:
        '<span class="badge badge-completed"><i class="fas fa-check-circle"></i> Completed</span>',
    };
    return badges[status] || status;
  }

  formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  toggleStatus(id) {
    const workItem = this.dataManager.getWorkItems().find((w) => w.id === id);
    if (!workItem) return;

    const statusFlow = {
      "not-started": "pending",
      pending: "completed",
      completed: "completed",
    };

    const newStatus = statusFlow[workItem.status];
    this.dataManager.updateWorkItem(id, { status: newStatus });
    this.updateDashboard();
    this.updateAnalytics();
    this.showToast(
      `Work item marked as ${newStatus.replace("-", " ")}`,
      "success"
    );
  }

  deleteWorkItem(id) {
    this.showConfirmModal(
      "Are you sure you want to delete this work item?",
      () => {
        this.dataManager.deleteWorkItem(id);
        this.updateDashboard();
        this.updateAnalytics();
        this.showToast("Work item deleted successfully", "success");
      }
    );
  }

  openEditWorkModal(id) {
    const workItem = this.dataManager.getWorkItems().find((w) => w.id === id);
    if (!workItem) return;

    document.getElementById("editWorkId").value = workItem.id;
    document.getElementById("editSubject").value = workItem.subjectId;
    document.getElementById("editWorkType").value = workItem.workTypeId;
    document.getElementById("editDateIssued").value = workItem.issued;
    document.getElementById("editDateDeadline").value = workItem.deadline || "";
    document.getElementById("editNoDeadline").checked = !workItem.deadline;
    document.getElementById("editFaculty").value = workItem.faculty;
    document.getElementById("editWorkDescription").value = workItem.description;
    document.getElementById("editStatus").value = workItem.status;

    this.populateDropdown("editSubject", this.dataManager.getSubjects());
    this.populateDropdown("editWorkType", this.dataManager.getWorkTypes());

    this.openModal("editWorkModal");
  }

  // Subjects
  updateSubjectsList() {
    const subjects = this.dataManager.getSubjects();
    const container = document.getElementById("subjectsList");

    if (subjects.length === 0) {
      container.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-state-icon"><i class="fas fa-book"></i></div>
                            <div class="empty-state-text">No subjects added yet</div>
                        </div>
                    `;
      return;
    }

    container.innerHTML = subjects
      .map(
        (subject) => `
                    <div class="list-item">
                        <div class="list-item-content">
                            <div class="list-item-title"><i class="fas fa-book"></i> ${subject.name}</div>
                            <div class="list-item-subtitle">Code: ${subject.code}</div>
                        </div>
                        <div class="list-item-actions">
                            <button class="btn btn-sm btn-primary" onclick="ui.openEditSubjectModal('${subject.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="ui.deleteSubject('${subject.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                `
      )
      .join("");

    this.populateDropdown("subject", subjects);
    this.populateDropdown("editSubject", subjects);
  }

  openEditSubjectModal(id) {
    const subject = this.dataManager.getSubjects().find((s) => s.id === id);
    if (!subject) return;

    document.getElementById("editSubjectId").value = subject.id;
    document.getElementById("editSubjectName").value = subject.name;
    document.getElementById("editSubjectCode").value = subject.code;

    this.openModal("editSubjectModal");
  }

  deleteSubject(id) {
    this.showConfirmModal(
      "Are you sure you want to delete this subject?",
      () => {
        const result = this.dataManager.deleteSubject(id);
        if (result.success) {
          this.updateSubjectsList();
          this.showToast("Subject deleted successfully", "success");
        } else {
          this.showToast(result.message, "error");
        }
      }
    );
  }

  // Work Types
  updateWorkTypesList() {
    const workTypes = this.dataManager.getWorkTypes();
    const container = document.getElementById("workTypesList");

    if (workTypes.length === 0) {
      container.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-state-icon"><i class="fas fa-tag"></i></div>
                            <div class="empty-state-text">No work types added yet</div>
                        </div>
                    `;
      return;
    }

    container.innerHTML = workTypes
      .map(
        (workType) => `
                    <div class="list-item">
                        <div class="list-item-content">
                            <div class="list-item-title"><i class="fas fa-tag"></i> ${workType.name}</div>
                        </div>
                        <div class="list-item-actions">
                            <button class="btn btn-sm btn-primary" onclick="ui.openEditWorkTypeModal('${workType.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="ui.deleteWorkType('${workType.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                `
      )
      .join("");

    this.populateDropdown("workType", workTypes);
    this.populateDropdown("editWorkType", workTypes);
  }

  openEditWorkTypeModal(id) {
    const workType = this.dataManager.getWorkTypes().find((wt) => wt.id === id);
    if (!workType) return;

    document.getElementById("editWorkTypeId").value = workType.id;
    document.getElementById("editWorkTypeName").value = workType.name;

    this.openModal("editWorkTypeModal");
  }

  deleteWorkType(id) {
    this.showConfirmModal(
      "Are you sure you want to delete this work type?",
      () => {
        const result = this.dataManager.deleteWorkType(id);
        if (result.success) {
          this.updateWorkTypesList();
          this.showToast("Work type deleted successfully", "success");
        } else {
          this.showToast(result.message, "error");
        }
      }
    );
  }

  // Utility
  populateDropdown(selectId, items) {
    const select = document.getElementById(selectId);
    const currentValue = select.value;

    // Keep the first option (placeholder)
    const firstOption = select.options[0];
    select.innerHTML = "";
    select.appendChild(firstOption);

    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name + (item.code ? ` (${item.code})` : "");
      select.appendChild(option);
    });

    // Restore previous value if it still exists
    if (
      currentValue &&
      Array.from(select.options).some((opt) => opt.value === currentValue)
    ) {
      select.value = currentValue;
    }
  }

  // Analytics
  updateAnalytics() {
    this.updateCharts();
    this.updateInsights();
    this.updateQuote();
  }

  updateCharts() {
    const workItems = this.dataManager.getWorkItems();

    // Status Chart
    this.updateStatusChart(workItems);

    // Subject Chart
    this.updateSubjectChart(workItems);

    // Type Chart
    this.updateTypeChart(workItems);

    // Trend Chart
    this.updateTrendChart(workItems);
  }

  updateStatusChart(workItems) {
    const ctx = document.getElementById("statusChart");
    if (!ctx) return;

    const statusCounts = {
      "not-started": 0,
      pending: 0,
      completed: 0,
    };

    workItems.forEach((item) => {
      statusCounts[item.status]++;
    });

    if (this.charts.status) {
      this.charts.status.destroy();
    }

    this.charts.status = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Not Started", "Pending", "Completed"],
        datasets: [
          {
            data: [
              statusCounts["not-started"],
              statusCounts["pending"],
              statusCounts["completed"],
            ],
            backgroundColor: ["#ef4444", "#f59e0b", "#10b981"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  updateSubjectChart(workItems) {
    const ctx = document.getElementById("subjectChart");
    if (!ctx) return;

    const subjectCounts = {};
    workItems.forEach((item) => {
      subjectCounts[item.subject] = (subjectCounts[item.subject] || 0) + 1;
    });

    const labels = Object.keys(subjectCounts);
    const data = Object.values(subjectCounts);

    if (this.charts.subject) {
      this.charts.subject.destroy();
    }

    this.charts.subject = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tasks per Subject",
            data: data,
            backgroundColor: "#6366f1",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }

  updateTypeChart(workItems) {
    const ctx = document.getElementById("typeChart");
    if (!ctx) return;

    const typeCounts = {};
    workItems.forEach((item) => {
      typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
    });

    const labels = Object.keys(typeCounts);
    const data = Object.values(typeCounts);

    if (this.charts.type) {
      this.charts.type.destroy();
    }

    this.charts.type = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#6366f1",
              "#8b5cf6",
              "#ec4899",
              "#f59e0b",
              "#10b981",
              "#3b82f6",
              "#ef4444",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  updateTrendChart(workItems) {
    const ctx = document.getElementById("trendChart");
    if (!ctx) return;

    // Get last 7 days
    const days = [];
    const completedCounts = [];
    const addedCounts = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dateStr = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
      days.push(dateStr);

      const completed = workItems.filter((item) => {
        if (item.status !== "completed") return false;
        const itemDate = new Date(item.createdAt);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === date.getTime();
      }).length;

      const added = workItems.filter((item) => {
        const itemDate = new Date(item.createdAt);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === date.getTime();
      }).length;

      completedCounts.push(completed);
      addedCounts.push(added);
    }

    if (this.charts.trend) {
      this.charts.trend.destroy();
    }

    this.charts.trend = new Chart(ctx, {
      type: "line",
      data: {
        labels: days,
        datasets: [
          {
            label: "Tasks Added",
            data: addedCounts,
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Tasks Completed",
            data: completedCounts,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }

  updateInsights() {
    const workItems = this.dataManager.getWorkItems();

    // Focus Subject
    const subjectCounts = {};
    const subjectOverdue = {};

    workItems.forEach((item) => {
      if (item.status !== "completed") {
        subjectCounts[item.subject] = (subjectCounts[item.subject] || 0) + 1;

        if (item.deadline && this.calculateDaysLeft(item.deadline) < 0) {
          subjectOverdue[item.subject] =
            (subjectOverdue[item.subject] || 0) + 1;
        }
      }
    });

    const focusSubject =
      Object.keys(subjectOverdue).length > 0
        ? Object.entries(subjectOverdue).sort((a, b) => b[1] - a[1])[0][0]
        : Object.entries(subjectCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
          "None";

    document.getElementById("focusSubject").textContent =
      focusSubject === "None"
        ? "Great job! No pending tasks."
        : `${focusSubject} needs your attention with ${
            subjectOverdue[focusSubject] || subjectCounts[focusSubject]
          } pending task(s).`;

    // Productivity Score
    const totalTasks = workItems.length;
    const completedTasks = workItems.filter(
      (w) => w.status === "completed"
    ).length;
    const productivityScore =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    let scoreText = `${productivityScore}% completion rate`;
    if (productivityScore >= 80) scoreText += " - Excellent! 🌟";
    else if (productivityScore >= 60) scoreText += " - Good progress! 👍";
    else if (productivityScore >= 40) scoreText += " - Keep going! 💪";
    else scoreText += " - You can do it! 🚀";

    document.getElementById("productivityScore").textContent = scoreText;

    // Upcoming Deadlines
    const upcomingTasks = workItems
      .filter((item) => {
        if (!item.deadline || item.status === "completed") return false;
        const daysLeft = this.calculateDaysLeft(item.deadline);
        return daysLeft >= 0 && daysLeft <= 7;
      })
      .sort(
        (a, b) =>
          this.calculateDaysLeft(a.deadline) -
          this.calculateDaysLeft(b.deadline)
      );

    const upcomingText =
      upcomingTasks.length === 0
        ? "No upcoming deadlines this week! 🎉"
        : `${upcomingTasks.length} task(s) due this week. Next: ${
            upcomingTasks[0].subject
          } in ${this.calculateDaysLeft(upcomingTasks[0].deadline)} day(s).`;

    document.getElementById("upcomingDeadlines").textContent = upcomingText;

    // Suggestion
    const overdueTasks = workItems.filter((item) => {
      if (!item.deadline || item.status === "completed") return false;
      return this.calculateDaysLeft(item.deadline) < 0;
    }).length;

    let suggestion = "";
    if (overdueTasks > 0) {
      suggestion = `You have ${overdueTasks} overdue task(s). Consider prioritizing them first!`;
    } else if (upcomingTasks.length > 3) {
      suggestion =
        "Busy week ahead! Plan your time wisely and tackle tasks one by one.";
    } else if (completedTasks === totalTasks && totalTasks > 0) {
      suggestion =
        "Amazing! All tasks completed. Time to add new challenges! 🎯";
    } else {
      suggestion =
        "Stay focused and keep up the great work! Remember to take breaks. 😊";
    }

    document.getElementById("suggestion").textContent = suggestion;
  }

  // Motivational Quote System
  updateQuote() {
    const now = new Date().getTime();
    const lastQuoteTime = this.dataManager.getLastQuoteTime();
    const twelveHours = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

    // Check if we need a new quote (12 hours passed or first time)
    if (!lastQuoteTime || now - parseInt(lastQuoteTime) >= twelveHours) {
      this.setNewQuote();
    } else {
      // Display current quote
      const currentQuote = this.dataManager.getCurrentQuote();
      if (currentQuote) {
        this.displayQuote(currentQuote);
      } else {
        this.setNewQuote();
      }
    }
  }

  setNewQuote() {
    let usedQuotes = this.dataManager.getUsedQuotes();

    // Reset if all quotes have been used
    if (usedQuotes.length >= motivationalQuotes.length) {
      usedQuotes = [];
      this.dataManager.setUsedQuotes([]);
    }

    // Get available quotes
    const availableQuotes = motivationalQuotes.filter(
      (q, index) => !usedQuotes.includes(index)
    );

    // Select random quote from available ones
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];

    // Find original index and mark as used
    const originalIndex = motivationalQuotes.indexOf(selectedQuote);
    usedQuotes.push(originalIndex);

    // Save to localStorage
    this.dataManager.setUsedQuotes(usedQuotes);
    this.dataManager.setCurrentQuote(selectedQuote);
    this.dataManager.setLastQuoteTime(new Date().getTime().toString());

    // Display the quote
    this.displayQuote(selectedQuote);
  }

  displayQuote(quote) {
    document.getElementById("quoteText").textContent = `"${quote.text}"`;
    document.getElementById("quoteAuthor").textContent = quote.author;
  }
}

// ========================================
// EXCEL EXPORT WITH FILTERS
// ========================================

class ExcelExporter {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  export() {
    const workItems = this.dataManager.getWorkItems();

    if (workItems.length === 0) {
      ui.showToast("No work items to export", "warning");
      return;
    }

    // Prepare data
    const data = workItems.map((item) => ({
      Subject: item.subject,
      "Subject Code": item.subjectCode,
      "Work Type": item.type,
      Description: item.description,
      "Date Issued": this.formatDate(item.issued),
      Deadline: item.deadline ? this.formatDate(item.deadline) : "No Deadline",
      "Days Left": item.deadline
        ? this.calculateDaysLeft(item.deadline)
        : "N/A",
      Faculty: item.faculty,
      Status: item.status.replace("-", " ").toUpperCase(),
      Student: this.dataManager.getStudentName(),
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Set column widths
    ws["!cols"] = [
      { wch: 20 }, // Subject
      { wch: 12 }, // Subject Code
      { wch: 15 }, // Work Type
      { wch: 40 }, // Description
      { wch: 12 }, // Date Issued
      { wch: 12 }, // Deadline
      { wch: 12 }, // Days Left
      { wch: 20 }, // Faculty
      { wch: 12 }, // Status
      { wch: 20 }, // Student
    ];

    // Add autofilter to header row
    const range = XLSX.utils.decode_range(ws["!ref"]);
    ws["!autofilter"] = { ref: XLSX.utils.encode_range(range) };

    // Style header row (make it bold)
    const headerRange = XLSX.utils.decode_range("A1:J1");
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellAddress]) continue;

      ws[cellAddress].s = {
        font: { bold: true, sz: 12 },
        fill: { fgColor: { rgb: "6366f1" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Work Items");

    // Generate filename
    const now = new Date();
    const filename = `${now.getDate().toString().padStart(2, "0")}-${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${now.getFullYear()}_${now
      .getHours()
      .toString()
      .padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}-${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}_StudySync.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);

    ui.showToast("Excel file exported successfully with filters", "success");
  }

  formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  }

  calculateDaysLeft(deadline) {
    if (!deadline) return "N/A";
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  }
}

// ========================================
// STUDENT NAME MANAGEMENT
// ========================================

function saveStudentName() {
  const name = document.getElementById("welcomeStudentName").value.trim();

  if (!name) {
    ui.showToast("Please enter your name", "error");
    return;
  }

  dataManager.setStudentName(name);
  updateStudentNameDisplay();
  ui.closeModal("welcomeModal");
  ui.showToast(`Welcome, ${name}!`, "success");
}

function openEditNameModal() {
  const currentName = dataManager.getStudentName();
  document.getElementById("editStudentName").value = currentName;
  ui.openModal("editNameModal");
}

function updateStudentName() {
  const name = document.getElementById("editStudentName").value.trim();

  if (!name) {
    ui.showToast("Please enter your name", "error");
    return;
  }

  dataManager.setStudentName(name);
  updateStudentNameDisplay();
  ui.closeModal("editNameModal");
  ui.showToast("Name updated successfully", "success");
}

function updateStudentNameDisplay() {
  const name = dataManager.getStudentName();
  document.getElementById("studentNameDisplay").textContent = name;
  document.getElementById("studentName").value = name;
}

// ========================================
// INITIALIZATION
// ========================================

const dataManager = new DataManager();
const ui = new UIManager(dataManager);
const exporter = new ExcelExporter(dataManager);

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  // Check if student name exists
  const studentName = dataManager.getStudentName();

  if (!studentName) {
    // Show welcome modal
    ui.openModal("welcomeModal");

    // Handle Enter key in welcome form
    document.getElementById("welcomeForm").addEventListener("submit", (e) => {
      e.preventDefault();
      saveStudentName();
    });
  } else {
    // Update displays
    updateStudentNameDisplay();
  }

  // Set default date
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dateIssued").value = today;

  // Initialize all views
  ui.updateDashboard();
  ui.updateSubjectsList();
  ui.updateWorkTypesList();
  ui.updateAnalytics();

  // Setup event listeners
  setupEventListeners();

  // Show welcome message if name exists
  if (studentName) {
    ui.showToast(`Welcome back, ${studentName}!`, "success", "Study Sync");
  }
});

function setupEventListeners() {
  // Theme Toggle
  document.getElementById("themeToggle").addEventListener("click", () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);

    const themeIcon = document.querySelector("#themeToggle i");
    themeIcon.className = newTheme === "light" ? "fas fa-moon" : "fas fa-sun";
  });

  // Tab Navigation
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabName = btn.getAttribute("data-tab");
      if (tabName) {
        switchTab(tabName);
      }
    });
  });

  // Export Button
  document.getElementById("exportBtn").addEventListener("click", (e) => {
    e.preventDefault();
    exporter.export();
  });

  // Search
  document.getElementById("searchInput").addEventListener("input", () => {
    ui.updateWorkItemsTable();
  });

  // Filters
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      ui.currentFilter = btn.getAttribute("data-filter");
      ui.updateWorkItemsTable();
    });
  });

  // Table Sorting
  document.querySelectorAll("th.sortable").forEach((th) => {
    th.addEventListener("click", () => {
      const column = th.getAttribute("data-sort");

      if (ui.currentSort.column === column) {
        ui.currentSort.direction =
          ui.currentSort.direction === "asc" ? "desc" : "asc";
      } else {
        ui.currentSort.column = column;
        ui.currentSort.direction = "asc";
      }

      // Update UI
      document.querySelectorAll("th.sortable").forEach((t) => {
        t.classList.remove("sort-asc", "sort-desc");
      });
      th.classList.add(
        ui.currentSort.direction === "asc" ? "sort-asc" : "sort-desc"
      );

      ui.updateWorkItemsTable();
    });
  });

  // Add Work Form
  document.getElementById("addWorkForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const subjectId = document.getElementById("subject").value;
    const workTypeId = document.getElementById("workType").value;
    const issued = document.getElementById("dateIssued").value;
    const deadline = document.getElementById("noDeadline").checked
      ? null
      : document.getElementById("dateDeadline").value;
    const faculty = document.getElementById("faculty").value;
    const description = document.getElementById("workDescription").value;

    // Validate
    if (!subjectId || !workTypeId || !issued || !faculty || !description) {
      ui.showToast("Please fill all required fields", "error");
      return;
    }

    if (!document.getElementById("noDeadline").checked && !deadline) {
      ui.showToast('Please set a deadline or check "No Deadline"', "error");
      return;
    }

    // Get subject and work type names
    const subject = dataManager.getSubjects().find((s) => s.id === subjectId);
    const workType = dataManager
      .getWorkTypes()
      .find((wt) => wt.id === workTypeId);

    // Create work item
    const workItem = {
      subjectId: subjectId,
      subject: subject.name,
      subjectCode: subject.code,
      workTypeId: workTypeId,
      type: workType.name,
      issued: issued,
      deadline: deadline,
      faculty: faculty,
      description: description,
    };

    dataManager.addWorkItem(workItem);

    ui.showToast("Work item added successfully", "success");
    document.getElementById("addWorkForm").reset();
    document.getElementById("dateIssued").value = new Date()
      .toISOString()
      .split("T")[0];
    document.getElementById("studentName").value = dataManager.getStudentName();

    ui.updateDashboard();
    ui.updateAnalytics();
    switchTab("dashboard");
  });

  // No Deadline Checkbox
  document.getElementById("noDeadline").addEventListener("change", (e) => {
    document.getElementById("dateDeadline").disabled = e.target.checked;
    if (e.target.checked) {
      document.getElementById("dateDeadline").value = "";
    }
  });

  document.getElementById("editNoDeadline").addEventListener("change", (e) => {
    document.getElementById("editDateDeadline").disabled = e.target.checked;
    if (e.target.checked) {
      document.getElementById("editDateDeadline").value = "";
    }
  });

  // Add Subject Form
  document.getElementById("addSubjectForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("subjectName").value;
    const code = document.getElementById("subjectCode").value;

    dataManager.addSubject({ name, code });
    ui.showToast("Subject added successfully", "success");
    document.getElementById("addSubjectForm").reset();
    ui.updateSubjectsList();
  });

  // Add Work Type Form
  document.getElementById("addWorkTypeForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("workTypeName").value;

    dataManager.addWorkType({ name });
    ui.showToast("Work type added successfully", "success");
    document.getElementById("addWorkTypeForm").reset();
    ui.updateWorkTypesList();
  });

  // Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.shiftKey) {
      switch (e.key) {
        case "A":
          e.preventDefault();
          switchTab("dashboard");
          break;
        case "B":
          e.preventDefault();
          switchTab("analytics");
          break;
        case "C":
          e.preventDefault();
          switchTab("add-work");
          break;
        case "D":
          e.preventDefault();
          switchTab("subjects");
          break;
        case "E":
          e.preventDefault();
          switchTab("work-types");
          break;
      }
    }
  });

  // Close modal on background click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal && !modal.classList.contains("welcome-modal")) {
        modal.classList.remove("active");
      }
    });
  });
}

// Tab Switching
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-tab") === tabName) {
      btn.classList.add("active");
    }
  });

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });
  document.getElementById(tabName).classList.add("active");

  // Update analytics if switching to analytics tab
  if (tabName === "analytics") {
    ui.updateAnalytics();
  }
}

// Modal Functions
function closeModal(modalId) {
  ui.closeModal(modalId);
}

function saveEditWork() {
  const id = document.getElementById("editWorkId").value;
  const subjectId = document.getElementById("editSubject").value;
  const workTypeId = document.getElementById("editWorkType").value;
  const issued = document.getElementById("editDateIssued").value;
  const deadline = document.getElementById("editNoDeadline").checked
    ? null
    : document.getElementById("editDateDeadline").value;
  const faculty = document.getElementById("editFaculty").value;
  const description = document.getElementById("editWorkDescription").value;
  const status = document.getElementById("editStatus").value;

  const subject = dataManager.getSubjects().find((s) => s.id === subjectId);
  const workType = dataManager
    .getWorkTypes()
    .find((wt) => wt.id === workTypeId);

  dataManager.updateWorkItem(id, {
    subjectId,
    subject: subject.name,
    subjectCode: subject.code,
    workTypeId,
    type: workType.name,
    issued,
    deadline,
    faculty,
    description,
    status,
  });

  ui.closeModal("editWorkModal");
  ui.updateDashboard();
  ui.updateAnalytics();
  ui.showToast("Work item updated successfully", "success");
}

function saveEditSubject() {
  const id = document.getElementById("editSubjectId").value;
  const name = document.getElementById("editSubjectName").value;
  const code = document.getElementById("editSubjectCode").value;

  dataManager.updateSubject(id, { name, code });

  ui.closeModal("editSubjectModal");
  ui.updateSubjectsList();
  ui.updateDashboard();
  ui.showToast("Subject updated successfully", "success");
}

function saveEditWorkType() {
  const id = document.getElementById("editWorkTypeId").value;
  const name = document.getElementById("editWorkTypeName").value;

  dataManager.updateWorkType(id, { name });

  ui.closeModal("editWorkTypeModal");
  ui.updateWorkTypesList();
  ui.updateDashboard();
  ui.showToast("Work type updated successfully", "success");
}

// Console Helper
console.log(
  "%c📚 Study Sync Loaded Successfully!",
  "color: #6366f1; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cAvailable functions:",
  "color: #8b5cf6; font-size: 14px; font-weight: bold;"
);
console.log(
  "%c- deleteAllWorkItems() - Delete all work items",
  "color: #3b82f6;"
);
console.log(
  "%c- clearSubjects() - Delete all subjects and work items",
  "color: #3b82f6;"
);
console.log(
  "%c- clearWorkTypes() - Delete all work types and work items",
  "color: #3b82f6;"
);
