# Study Sync Pro ⇒ [View Live](https://shivam-pandya-8118.github.io/Study-Sync-Pro)
> By Shivam Pandya

<div align="center">

A Modern, Feature-Rich Study Management and Academic Task Manager Web Application

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Font Awesome](https://img.shields.io/badge/Font%20Awesome-%23339AF0.svg?style=for-the-badge&logo=fontawesome&logoColor=white) ![Chart.js](https://img.shields.io/badge/Chart.js-%23FF6384.svg?style=for-the-badge&logo=chartdotjs&logoColor=white) ![SheetJS](https://img.shields.io/badge/SheetJS-%2300B050.svg?style=for-the-badge&logo=sheetjs&logoColor=white) ![Local Storage](https://img.shields.io/badge/Local%20Storage-%23000000.svg?style=for-the-badge&logo=googlechrome&logoColor=white)
</div>

---

## 📖 About

Study Sync Pro is a comprehensive, single-page web application designed to help students manage their academic work items efficiently. With a clean, modern interface and powerful features like analytics, Excel export, and motivational quotes, it's the perfect tool for staying organized throughout your academic journey.

## ✨ Highlights

- 📊 Advanced Analytics Dashboard with interactive charts
- 📥 Excel Export with filters and formatted headers
- 🌓 Dark/Light Mode for comfortable viewing
- 💾 Persistent Storage using localStorage
- 📱 Fully Responsive design for all devices
- ⌨️ Keyboard Shortcuts for power users
- 💬 Motivational Quotes that refresh every 12 hours
- 🎨 Professional Icons using Font Awesome
- 🔔 Smart Notifications with toast messages
- 📈 Performance Tracking and insights

## 🚀 Features

### 📋 Dashboard

- Work Items Table — View all your tasks in a sortable, searchable table
- Status Badges — Visual indicators (Not Started, Pending, Completed)
- Smart Filters — Filter by status (All, Not Started, Pending, Completed)
- Real-time Search — Search by subject, type, description, or faculty
- Days Left Calculator — Automatic calculation showing:
  - ⚠️ Overdue tasks
  - 🕐 Due today
  - 📅 Tomorrow
  - ✅ Days remaining
- Quick Actions — Edit, Delete, and Status toggle buttons
- Summary Cards — Total, Pending, Completed, and Overdue counts

### 📊 Analytics

- Status Distribution — Doughnut chart showing task breakdown
- Subject Distribution — Bar chart of tasks per subject
- Work Type Distribution — Pie chart of work types
- Completion Trend — Line chart showing 7-day progress

Smart Insights:

- 🎯 Focus Subject recommendations
- ⚡ Productivity Score calculation
- 📅 Upcoming Deadlines tracker
- 💡 AI-like Suggestions
- Motivational Quotes — 30+ quotes rotating every 12 hours

### ➕ Add Work

- Intuitive Form with validation
- Smart Dropdowns — Auto-populated from subjects and work types
- Date Pickers — Issue date and deadline selection
- No Deadline Option — Checkbox for ongoing tasks
- Auto-fill Student Name — Pulled from profile
- Mandatory Field Indicators — Red asterisks (\*) for required fields

### 📚 Manage Subjects

- CRUD Operations — Create, Read, Update, Delete
- Subject Details — Name and Code
- Usage Protection — Cannot delete subjects in use
- Bulk Clear — `clearSubjects()` function for complete reset
- Live Updates — Changes reflect immediately in dropdowns

### 🏷️ Manage Work Types

- Custom Work Types — Assignment, Lab Manual, Project, etc.
- Easy Management — Add, Edit, Delete
- Dependency Check — Protection against deleting in-use types
- Bulk Clear — `clearWorkTypes()` function available

### 📥 Excel Export

- Formatted Export — Professional spreadsheet generation
- Auto Filters — Click-to-filter headers in Excel
- Bold Headers — Styled for readability
- Custom Filename — `DD-MM-YYYY_HH-MM-SS_StudySync.xlsx`
- Complete Data — All work items with full details

## 🎨 UI/UX Features

- Dark/Light Theme Toggle — Smooth transitions
- Responsive Design — Mobile, Tablet, Desktop optimized
- Smooth Animations — fadeIn, slideUp effects
- Modal Dialogs — For editing and confirmations
- Toast Notifications — Non-intrusive feedback
- Font Awesome Icons — Professional iconography
- Card-based Layout — Modern, clean design
- Sticky Headers — Easy navigation

## ⌨️ Keyboard Shortcuts

- Alt + 1 — Dashboard
- Alt + 2 — Analytics
- Alt + 3 — Add Work
- Alt + 4 — Subjects
- Alt + 5 — Work Types

### 🎥 Live Demo

[Try Study Sync Pro](https://shivam-pandya-8118.github.io/Study-Sync-Pro)

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No server required - runs completely offline!

## 📖 Usage

### 🎬 First Time Setup

- Enter Your Name
  - On first visit, you'll see a welcome modal
  - Enter your full name
  - Click "Save & Continue"

### Add Subjects (Optional)

- Navigate to "Subjects" tab
- Add your courses with name and code
- Default subjects are pre-loaded

### Add Work Types (Optional)

- Navigate to "Work Types" tab
- Customize work categories
- Defaults include: Assignment, Lab Manual, Project, etc.

### 📝 Adding Work Items

- Click "Add Work" tab or button
- Fill in the form:
  - Subject — Select from dropdown
  - Work Type — Assignment, Lab, etc.
  - Date Issued — When it was assigned
  - Deadline — Due date (or check "No Deadline")
  - Faculty Name — Professor/Teacher name
  - Description — Details about the work
- Click "Save Work Item"

### ✏️ Managing Work Items

- Edit Work Item
  - Click the pencil icon (✏️) on any work item
  - Modify details in the modal
  - Click "Save Changes"
- Update Status
  - Click play icon (▶️) to mark as Pending
  - Click check icon (✓) to mark as Completed
- Delete Work Item
  - Click trash icon (🗑️)
  - Confirm deletion

## 📊 Viewing Analytics

- Navigate to "Analytics" tab
- View interactive charts
- Read personalized insights
- Get motivated by daily quotes

## 📥 Exporting Data

- Click "Export" tab/button
- Excel file downloads automatically
- Opens with filters enabled
- Filename: `DD-MM-YYYY_HH-MM-SS_StudySync.xlsx`

## 👤 Editing Your Name

- Click the pencil icon (✏️) next to your name in header
- Enter new name
- Click "Save Changes"

## 🛠️ API Functions

Built-in Console Functions — Open browser console (F12) and use these powerful functions:

### 🗑️ Delete All Work Items

```javascript
deleteAllWorkItems();
```

Permanently deletes ALL work items
Confirmation required
Cannot be undone

### 🧹 Clear All Subjects

```javascript
clearSubjects();
```

Deletes ALL subjects
Also deletes ALL related work items
Confirmation required
Force delete regardless of usage

### 🏷️ Clear All Work Types

```javascript
clearWorkTypes();
```

Deletes ALL work types
Also deletes ALL related work items
Confirmation required
Force delete regardless of usage

### Usage Example

```javascript
// Open console (F12 in most browsers)

// To clear everything and start fresh:
deleteAllWorkItems(); // Clear tasks
clearSubjects(); // Clear subjects
clearWorkTypes(); // Clear work types

// Confirm each action when prompted
```

## 🔧 Technologies Used

### Frontend

- HTML5 — Semantic markup
- CSS3 — Modern styling with CSS Variables
- Vanilla JavaScript (ES6+) — No frameworks needed

### Libraries

- Font Awesome 6.5.1 — Professional icons
- Chart.js 4.4.0 — Interactive charts
- SheetJS (xlsx 0.20.0) — Excel export

### Storage

- localStorage — Persistent data storage

```javascript
const motivationalQuotes = [
  {
    text: "Your custom quote here",
    author: "Author Name",
  },
  // Add more...
];
```

### Adding Default Subjects

Modify in `DataManager.initializeData()`:

```javascript
const defaultSubjects = [
  { id: this.generateId(), name: "Your Subject", code: "CODE" },
  // Add more...
];
```

## 🔮 Future Enhancements

- Cloud sync with Firebase
- Mobile app (PWA)
- Notification reminders
- Data import from CSV
- Print functionality
- Study timer/pomodoro
- Grade tracking
- Attachment support
- Driver JS Guiding
- Pre Loader
- Linking of Faculty To Subject

## 🤝 Contributing

Contributions are welcome!

## 📄 License

This project is licensed under the MIT License - see below for details:

### MIT License

Copyright (c) 2025 Shivam Pandya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 👨‍💻 Author

**__Shivam Pandya__**

Email: smpandya2008@gmail.com
GitHub: @shivam-pandya-8118
Project: Study Sync Pro
Live Demo: https://shivam-pandya-8118.github.io/Study-Sync-Pro

## 🙏 Acknowledgments

- Font Awesome — For amazing icons
- Chart.js — For beautiful charts
- SheetJS — For Excel export functionality
- Google Fonts — For typography
- MDN Web Docs — For comprehensive documentation
- All the students who inspired this project

## 📞 Support

Having issues? Want to request a feature?

- Email: smpandya2008@gmail.com

## 🎯 Quick Links

- 🌐 Live Demo: https://shivam-pandya-8118.github.io/Study-Sync-Pro
- 📂 GitHub Repository: https://github.com/shivam-pandya-8118/Study-Sync-Pro
- 🐛 Report Bug: https://github.com/shivam-pandya-8118/Study-Sync-Pro/issues
- 💡 Request Feature: https://github.com/shivam-pandya-8118/Study-Sync-Pro/issues

<div align="center">
Made with ❤️ for Students by Shivam Pandya

Study Sync Pro - Stay Organized, Stay Ahead
</div>

## 📝 Changelog

### Version 2.0 (Current)

- ✨ Added Font Awesome icons
- 👤 Welcome modal for first-time users
- ✏️ Edit name functionality
- 🔴 Red asterisks for required fields
- 📊 Excel export with filters
- 💬 Motivational quotes system
- 🗑️ Forceful delete functions
- 💾 Enhanced localStorage persistence

### Version 2.0 (Current)

- Faces some error while fetching data.

<div align="center">

# Happy Studying! 📚✨

</div>
