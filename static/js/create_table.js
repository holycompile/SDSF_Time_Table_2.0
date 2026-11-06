// =======================================================
// 1. WEEKLY SCHEDULE CONFIGURATION & STATE
// =======================================================

const daySequence = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

const timeSlotSequence = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 01:00",
    "01:00 - 02:00",
    "02:00 - 03:00",
    "03:00 - 04:00",
    "04:00 - 05:00",
    "05:00 - 06:00"
];

// Initial Columns for Weekly Timetable
let columns = [
    "Days",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 01:00"
];

// Initial Rows for Weekly Timetable
let rows = [
    ["Monday", "", "", "", ""],
    ["Tuesday", "", "", "", ""],
    ["Wednesday", "", "", "", ""],
    ["Thursday", "", "", "", ""],
    ["Friday", "", "", "", ""]
];


// =======================================================
// 2. EXCEL-STYLE COURSE & FACULTY TABLE CONFIGURATION
// =======================================================

let excelData = {
    semester: "",
    courseType: "",
    classTeacher: {
        name: "",
        contact: ""
    },
    representatives: [
        { name: "", contact: "" },
        { name: "", contact: "" }
    ],
    courses: [
        { code: "", title: "", credits: "", faculty: "", contact: "", email: "" },
        { code: "", title: "", credits: "", faculty: "", contact: "", email: "" },
        { code: "", title: "", credits: "", faculty: "", contact: "", email: "" },
        { code: "", title: "", credits: "", faculty: "", contact: "", email: "" },
        { code: "", title: "", credits: "", faculty: "", contact: "", email: "" }
    ]
};


// =======================================================
// 3. DOM ELEMENTS
// =======================================================

const tableHeader = document.getElementById("tableHeader");
const tableBody = document.getElementById("tableBody");
const excelTableBody = document.getElementById("excelTableBody");

const addColumnBtn = document.getElementById("addColumn");
const addRowBtn = document.getElementById("addRow");
const addCourseRowBtn = document.getElementById("addCourseRow");
const saveBtn = document.getElementById("saveTable");


// =======================================================
// 4. RENDER WEEKLY TIMETABLE (Excel Format)
// =======================================================

function renderTable() {
    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    // A. Columns Header Row
    const headerRow = document.createElement("tr");
    headerRow.className = "bg-slate-100 border-b border-slate-300 font-bold text-slate-700 text-center";

    columns.forEach((column, columnIndex) => {
        const th = document.createElement("th");

        if (columnIndex === 0) {
            // 🔒 Locked & Intact: Fixed "Days" header (no input, no delete button)
            th.className = "p-2 w-28 md:w-32 bg-slate-100 border-r border-slate-300 font-bold text-slate-800 text-center select-none";
            th.textContent = "Days";
            headerRow.appendChild(th);
            return;
        }

        th.className = "p-2 bg-slate-100 border-r border-slate-300 font-bold text-slate-700 text-center";
        const wrapper = document.createElement("div");
        wrapper.className = "flex items-center justify-between gap-1";

        const input = document.createElement("input");
        input.type = "text";
        input.value = column;
        input.placeholder = "Time slot...";
        input.className =
            "w-full bg-transparent border-b border-transparent hover:border-slate-300 " +
            "outline-none text-slate-800 font-bold text-center py-0.5 text-xs focus:border-indigo-600 focus:bg-blue-50 transition";

        input.addEventListener("input", function () {
            columns[columnIndex] = input.value;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&times;";
        deleteBtn.title = "Delete Column";
        deleteBtn.className =
            "text-slate-400 hover:text-red-600 text-base font-bold px-0.5 transition leading-none";

        deleteBtn.addEventListener("click", function () {
            if (columns.length <= 2) {
                alert("At least one time slot column is required.");
                return;
            }
            columns.splice(columnIndex, 1);
            rows.forEach(row => { row.splice(columnIndex, 1); });
            renderTable();
        });

        wrapper.appendChild(input);
        wrapper.appendChild(deleteBtn);
        th.appendChild(wrapper);
        headerRow.appendChild(th);
    });

    const actionTh = document.createElement("th");
    actionTh.className = "p-2 w-12 text-center text-xs font-bold text-slate-500 bg-slate-100 border-b border-slate-300";
    actionTh.textContent = "Action";
    headerRow.appendChild(actionTh);
    tableHeader.appendChild(headerRow);

    // B. Rows (Excel Grid Style)
    rows.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-slate-200 hover:bg-slate-50 transition";

        row.forEach((cell, columnIndex) => {
            const td = document.createElement("td");

            if (columnIndex === 0) {
                // 🔒 Immutable Day Cell: Plain bold text (Monday, Tuesday, etc.)
                td.className = "p-2 w-28 md:w-32 bg-slate-100 border-r border-slate-300 text-center font-bold text-slate-800 select-none";
                td.textContent = cell;
                tr.appendChild(td);
                return;
            }

            // Time Slot Subject Cells: Clean Spreadsheet Input Cell
            td.className = "p-1 border-r border-slate-200 bg-white hover:bg-slate-50 transition text-center";
            const input = document.createElement("input");
            input.type = "text";
            input.value = cell;
            input.placeholder = "Class / Subject...";
            input.className =
                "w-full px-2 py-1 bg-transparent text-slate-800 text-center " +
                "outline-none text-xs focus:bg-blue-50 focus:ring-1 focus:ring-indigo-400 transition";

            input.addEventListener("input", function () {
                rows[rowIndex][columnIndex] = input.value;
            });

            td.appendChild(input);
            tr.appendChild(td);
        });

        // Delete Row Action Cell
        const deleteTd = document.createElement("td");
        deleteTd.className = "p-1 text-center border-r border-slate-200 w-12";
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.title = "Delete Row";
        deleteBtn.className =
            "text-red-500 hover:text-red-700 font-bold text-base px-1 leading-none transition";

        deleteBtn.addEventListener("click", function () {
            if (rows.length === 1) {
                alert("At least one row is required.");
                return;
            }
            rows.splice(rowIndex, 1);
            renderTable();
        });

        deleteTd.appendChild(deleteBtn);
        tr.appendChild(deleteTd);
        tableBody.appendChild(tr);
    });
}


// =======================================================
// 5. RENDER DYNAMIC EXCEL COURSE & FACULTY TABLE
// =======================================================

function renderExcelTable() {
    if (!excelTableBody) return;
    excelTableBody.innerHTML = "";

    // ---------------------------------------------------
    // ROW 1: Semester Title Bar (Blue) + Class Teacher Header
    // ---------------------------------------------------
    const tr1 = document.createElement("tr");
    tr1.className = "border-b border-slate-400";

    // Semester input spanning 6 columns
    const tdSemester = document.createElement("td");
    tdSemester.colSpan = 6;
    tdSemester.className = "bg-blue-200 p-2 text-center border-r border-slate-400 font-bold text-slate-800";
    const semInput = document.createElement("input");
    semInput.type = "text";
    semInput.value = excelData.semester;
    semInput.placeholder = "Semester Name...";
    semInput.className = "w-full text-center bg-transparent font-bold text-slate-900 outline-none text-sm";
    semInput.addEventListener("input", (e) => { excelData.semester = e.target.value; });
    tdSemester.appendChild(semInput);
    tr1.appendChild(tdSemester);

    // Class Teacher Label
    const tdTeacherLabel = document.createElement("td");
    tdTeacherLabel.className = "bg-blue-200 p-1.5 font-bold text-slate-800 border-r border-slate-400 text-center w-40";
    tdTeacherLabel.textContent = "Class Teacher:";
    tr1.appendChild(tdTeacherLabel);

    // Contact No Label
    const tdTeacherContactLabel = document.createElement("td");
    tdTeacherContactLabel.className = "bg-blue-200 p-1.5 font-bold text-slate-800 border-r border-slate-400 text-center w-36";
    tdTeacherContactLabel.textContent = "Contact No.";
    tr1.appendChild(tdTeacherContactLabel);

    // Empty cell for Action alignment
    const tdEmptyAction1 = document.createElement("td");
    tdEmptyAction1.className = "bg-blue-200 p-1 w-12 text-center";
    tr1.appendChild(tdEmptyAction1);

    excelTableBody.appendChild(tr1);


    // ---------------------------------------------------
    // ROW 2: Core Courses (Yellow) + Teacher Details
    // ---------------------------------------------------
    const tr2 = document.createElement("tr");
    tr2.className = "border-b border-slate-400";

    // Core Courses input spanning 6 columns
    const tdCourseType = document.createElement("td");
    tdCourseType.colSpan = 6;
    tdCourseType.className = "bg-amber-100 p-2 text-center border-r border-slate-400 font-bold text-slate-900";
    const courseTypeInput = document.createElement("input");
    courseTypeInput.type = "text";
    courseTypeInput.value = excelData.courseType;
    courseTypeInput.placeholder = "Course Group (e.g. CORE COURSES)...";
    courseTypeInput.className = "w-full text-center bg-transparent font-bold text-slate-900 outline-none text-sm";
    courseTypeInput.addEventListener("input", (e) => { excelData.courseType = e.target.value; });
    tdCourseType.appendChild(courseTypeInput);
    tr2.appendChild(tdCourseType);

    // Teacher Name Input
    const tdTeacherName = document.createElement("td");
    tdTeacherName.className = "bg-white p-1 border-r border-slate-300 text-center";
    const teacherNameInput = document.createElement("input");
    teacherNameInput.type = "text";
    teacherNameInput.value = excelData.classTeacher.name;
    teacherNameInput.placeholder = "Teacher Name...";
    teacherNameInput.className = "w-full text-center bg-transparent font-medium text-slate-800 outline-none text-xs";
    teacherNameInput.addEventListener("input", (e) => { excelData.classTeacher.name = e.target.value; });
    tdTeacherName.appendChild(teacherNameInput);
    tr2.appendChild(tdTeacherName);

    // Teacher Contact Input
    const tdTeacherContact = document.createElement("td");
    tdTeacherContact.className = "bg-white p-1 border-r border-slate-300 text-center";
    const teacherContactInput = document.createElement("input");
    teacherContactInput.type = "text";
    teacherContactInput.value = excelData.classTeacher.contact;
    teacherContactInput.placeholder = "Phone...";
    teacherContactInput.className = "w-full text-center bg-transparent text-slate-800 outline-none text-xs";
    teacherContactInput.addEventListener("input", (e) => { excelData.classTeacher.contact = e.target.value; });
    tdTeacherContact.appendChild(teacherContactInput);
    tr2.appendChild(tdTeacherContact);

    const tdEmptyAction2 = document.createElement("td");
    tdEmptyAction2.className = "bg-amber-100 p-1 w-12 text-center";
    tr2.appendChild(tdEmptyAction2);

    excelTableBody.appendChild(tr2);


    // ---------------------------------------------------
    // ROW 3: Column Header Titles
    // ---------------------------------------------------
    const tr3 = document.createElement("tr");
    tr3.className = "bg-slate-100 border-b border-slate-300 font-bold text-slate-700 text-center";

    const headers = [
        { label: "Code", width: "w-28" },
        { label: "Title", width: "w-64" },
        { label: "Credits (L T P)", width: "w-28" },
        { label: "Faculty", width: "w-44" },
        { label: "Contact", width: "w-28" },
        { label: "Email", width: "w-44" },
        { label: "Class Representative:", width: "w-40" },
        { label: "Contact No.", width: "w-36" }
    ];

    headers.forEach((h) => {
        const th = document.createElement("th");
        th.className = `p-2 border-r border-slate-300 last:border-r-0 ${h.width}`;
        th.textContent = h.label;
        tr3.appendChild(th);
    });

    const thAction = document.createElement("th");
    thAction.className = "p-2 w-12 text-center text-slate-500 font-semibold";
    thAction.textContent = "Action";
    tr3.appendChild(thAction);

    excelTableBody.appendChild(tr3);


    // ---------------------------------------------------
    // ROWS 4+: Course Rows + Class Representative Rows
    // ---------------------------------------------------
    excelData.courses.forEach((course, index) => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-slate-200 hover:bg-slate-50 transition";

        // 1. Code
        const tdCode = document.createElement("td");
        tdCode.className = "p-1 border-r border-slate-200";
        const inputCode = document.createElement("input");
        inputCode.value = course.code;
        inputCode.placeholder = "e.g. DS6A-501";
        inputCode.className = "w-full px-1.5 py-1 bg-transparent font-medium text-slate-800 outline-none text-xs";
        inputCode.addEventListener("input", (e) => { course.code = e.target.value; });
        tdCode.appendChild(inputCode);
        tr.appendChild(tdCode);

        // 2. Title
        const tdTitle = document.createElement("td");
        tdTitle.className = "p-1 border-r border-slate-200";
        const inputTitle = document.createElement("input");
        inputTitle.value = course.title;
        inputTitle.placeholder = "Course Title...";
        inputTitle.className = "w-full px-1.5 py-1 bg-transparent text-slate-800 outline-none text-xs";
        inputTitle.addEventListener("input", (e) => { course.title = e.target.value; });
        tdTitle.appendChild(inputTitle);
        tr.appendChild(tdTitle);

        // 3. Credits
        const tdCredits = document.createElement("td");
        tdCredits.className = "p-1 border-r border-slate-200 text-center";
        const inputCredits = document.createElement("input");
        inputCredits.value = course.credits;
        inputCredits.placeholder = "Credits...";
        inputCredits.className = "w-full px-1.5 py-1 bg-transparent text-center font-semibold text-slate-800 outline-none text-xs";
        inputCredits.addEventListener("input", (e) => { course.credits = e.target.value; });
        tdCredits.appendChild(inputCredits);
        tr.appendChild(tdCredits);

        // 4. Faculty
        const tdFaculty = document.createElement("td");
        tdFaculty.className = "p-1 border-r border-slate-200";
        const inputFaculty = document.createElement("input");
        inputFaculty.value = course.faculty;
        inputFaculty.placeholder = "Faculty Name...";
        inputFaculty.className = "w-full px-1.5 py-1 bg-transparent text-slate-800 outline-none text-xs";
        inputFaculty.addEventListener("input", (e) => { course.faculty = e.target.value; });
        tdFaculty.appendChild(inputFaculty);
        tr.appendChild(tdFaculty);

        // 5. Contact
        const tdContact = document.createElement("td");
        tdContact.className = "p-1 border-r border-slate-200 text-center";
        const inputContact = document.createElement("input");
        inputContact.value = course.contact;
        inputContact.placeholder = "Contact...";
        inputContact.className = "w-full px-1.5 py-1 bg-transparent text-center text-slate-800 outline-none text-xs";
        inputContact.addEventListener("input", (e) => { course.contact = e.target.value; });
        tdContact.appendChild(inputContact);
        tr.appendChild(tdContact);

        // 6. Email
        const tdEmail = document.createElement("td");
        tdEmail.className = "p-1 border-r border-slate-200";
        const inputEmail = document.createElement("input");
        inputEmail.value = course.email;
        inputEmail.placeholder = "Email Address...";
        inputEmail.className = "w-full px-1.5 py-1 bg-transparent text-slate-800 outline-none text-xs";
        inputEmail.addEventListener("input", (e) => { course.email = e.target.value; });
        tdEmail.appendChild(inputEmail);
        tr.appendChild(tdEmail);

        // 7 & 8. Class Representative (Rows 0, 1 etc.)
        const rep = excelData.representatives[index];
        const tdRepName = document.createElement("td");
        tdRepName.className = "p-1 border-r border-slate-200 text-center";
        const inputRepName = document.createElement("input");
        inputRepName.value = rep ? rep.name : "";
        inputRepName.placeholder = index < 2 ? `Rep ${index + 1} Name...` : "";
        inputRepName.className = "w-full px-1.5 py-1 bg-transparent text-center text-slate-800 outline-none text-xs";
        inputRepName.addEventListener("input", (e) => {
            if (!excelData.representatives[index]) {
                excelData.representatives[index] = { name: "", contact: "" };
            }
            excelData.representatives[index].name = e.target.value;
        });
        tdRepName.appendChild(inputRepName);
        tr.appendChild(tdRepName);

        const tdRepContact = document.createElement("td");
        tdRepContact.className = "p-1 border-r border-slate-200 text-center";
        const inputRepContact = document.createElement("input");
        inputRepContact.value = rep ? rep.contact : "";
        inputRepContact.placeholder = index < 2 ? "Phone No..." : "";
        inputRepContact.className = "w-full px-1.5 py-1 bg-transparent text-center text-slate-800 outline-none text-xs";
        inputRepContact.addEventListener("input", (e) => {
            if (!excelData.representatives[index]) {
                excelData.representatives[index] = { name: "", contact: "" };
            }
            excelData.representatives[index].contact = e.target.value;
        });
        tdRepContact.appendChild(inputRepContact);
        tr.appendChild(tdRepContact);

        // Action Column: Delete Course Row
        const tdAction = document.createElement("td");
        tdAction.className = "p-1 text-center w-12";
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.title = "Delete Course";
        deleteBtn.className = "text-red-500 hover:text-red-700 font-bold text-base px-1 leading-none transition";
        deleteBtn.addEventListener("click", () => {
            excelData.courses.splice(index, 1);
            renderExcelTable();
        });
        tdAction.appendChild(deleteBtn);
        tr.appendChild(tdAction);

        excelTableBody.appendChild(tr);
    });
}


// =======================================================
// 6. EVENT LISTENERS
// =======================================================

// A. Add Column in Weekly Schedule
addColumnBtn.addEventListener("click", function () {
    const slotIndex = columns.length - 1;
    let newColumnName;
    if (slotIndex < timeSlotSequence.length) {
        newColumnName = timeSlotSequence[slotIndex];
    } else {
        newColumnName = `Slot ${columns.length}`;
    }

    columns.push(newColumnName);
    rows.forEach(row => { row.push(""); });
    renderTable();
});

// B. Add Row in Weekly Schedule
addRowBtn.addEventListener("click", function () {
    let nextDayName;
    if (rows.length < daySequence.length) {
        nextDayName = daySequence[rows.length];
    } else {
        nextDayName = `Extra Day ${rows.length + 1 - daySequence.length}`;
    }

    const newRow = [nextDayName];
    for (let i = 1; i < columns.length; i++) {
        newRow.push("");
    }

    rows.push(newRow);
    renderTable();
});

// C. Add Course Row in Excel Table
if (addCourseRowBtn) {
    addCourseRowBtn.addEventListener("click", function () {
        excelData.courses.push({
            code: "",
            title: "",
            credits: "",
            faculty: "",
            contact: "",
            email: ""
        });
        renderExcelTable();
    });
}

// D. Save / Prepare Complete Flat Table Data
saveBtn.addEventListener("click", function () {
    const title = document.getElementById("tableTitle").value.trim();

    if (!title) {
        alert("Please enter a table title.");
        return;
    }

    // Convert Course & Faculty info into a 2D matrix (rows_faclty_info)
    const rows_faclty_info = excelData.courses.map((course, index) => {
        const rep = excelData.representatives[index] || { name: "", contact: "" };
        return [
            course.code,
            course.title,
            course.credits,
            course.faculty,
            course.contact,
            course.email,
            rep.name,
            rep.contact
        ];
    });

    // Extract Class Representative
    const rep = (excelData.representatives && excelData.representatives[0]) || { name: "", contact: "" };
    const class_represntative = {
        name: rep.name || "",
        number: rep.contact || ""
    };

    // Flat, Independent Data Payload (No sub-JSONs)
    const fullTableData = {
        title: title,
        columns: columns,
        rows_weekly: rows,
        sem_name: excelData.semester,
        course_grp: excelData.courseType,
        class_teacher: excelData.classTeacher.name,
        contact_no: excelData.classTeacher.contact,
        class_represntative: class_represntative,
        rows_faclty_info: rows_faclty_info
    };

    console.log("Flat Timetable Data:", fullTableData);

    fetch('/create_table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullTableData)
    })
    .then(response => response.json())
    .then(data => alert("Table and Course details saved successfully!"))
    .catch(err => {
        console.error("Save response/error:", err);
        alert("Data compiled! Check browser console to view the JSON output.");
    });
});


// =======================================================
// 7. INITIAL RENDERING
// =======================================================

renderTable();
renderExcelTable();
