const API_URL = "http://localhost:3000";


async function searchStudent() {

    const rollNoInput = document.getElementById("rollNo");

    const rollNo = rollNoInput.value.trim();

    const loading = document.getElementById("loading");

    const error = document.getElementById("error");

    const studentResult =
        document.getElementById("studentResult");


    // Clear old results

    error.classList.add("hidden");

    studentResult.classList.add("hidden");


    // Check Roll Number

    if (!rollNo) {

        error.textContent =
            "Please enter your Roll Number.";

        error.classList.remove("hidden");

        return;
    }


    loading.classList.remove("hidden");


    try {

        // Fetch Student

        const studentResponse =
            await fetch(
                `${API_URL}/students/${rollNo}`
            );


        if (!studentResponse.ok) {

            throw new Error(
                "Student not found. Please check your Roll Number."
            );
        }


        const student =
            await studentResponse.json();


        // Show Student Details

        document.getElementById(
            "studentName"
        ).textContent = student.name;


        document.getElementById(
            "studentRollNo"
        ).textContent = student.rollNo;


        // Show Location

        document.getElementById(
            "roomNo"
        ).textContent = student.roomNo;


        document.getElementById(
            "floor"
        ).textContent = student.floor;


        document.getElementById(
            "wing"
        ).textContent = student.wing;


        // Fetch Timetable

        const timetableResponse =
            await fetch(
                `${API_URL}/timetable`
            );


        if (!timetableResponse.ok) {

            throw new Error(
                "Unable to load timetable."
            );
        }


        const timetable =
            await timetableResponse.json();


        displayTimetable(timetable);


        // Show Result

        studentResult.classList.remove(
            "hidden"
        );


    } catch (errorMessage) {

        error.textContent =
            errorMessage.message;

        error.classList.remove(
            "hidden"
        );

    } finally {

        loading.classList.add(
            "hidden"
        );

    }

}


function displayTimetable(timetable) {

    const timetableContainer =
        document.getElementById(
            "timetable"
        );


    timetableContainer.innerHTML = "";


    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];


    days.forEach((day) => {

        const dayEntries =
            timetable.filter(
                (item) =>
                    item.day === day
            );


        if (dayEntries.length === 0) {
            return;
        }


        const daySection =
            document.createElement(
                "div"
            );

        daySection.className =
            "day-section";


        const dayTitle =
            document.createElement(
                "h3"
            );

        dayTitle.textContent =
            day;


        daySection.appendChild(
            dayTitle
        );


        dayEntries.forEach(
            (item) => {

                const row =
                    document.createElement(
                        "div"
                    );

                row.className =
                    "timetable-row";


                row.innerHTML = `
                    <div class="time">
                        ${item.time}
                    </div>

                    <div class="subject">
                        ${item.subject}
                    </div>
                `;


                daySection.appendChild(
                    row
                );

            }
        );


        timetableContainer.appendChild(
            daySection
        );

    });

}
