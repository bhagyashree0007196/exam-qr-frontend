async function searchStudent() {

    const rollNo =
        document.getElementById("rollNo").value.trim();

    const loading =
        document.getElementById("loading");

    const error =
        document.getElementById("error");

    const studentResult =
        document.getElementById("studentResult");


    // Clear previous results

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

        // Load student data

        const response =
            await fetch("./students.json");


        if (!response.ok) {

            throw new Error(
                "Unable to load student data."
            );
        }


        const students =
            await response.json();


        // Find student by Roll Number

        const student =
            students.find(
                (item) =>
                    String(item.rollNo).trim() ===
                    String(rollNo).trim()
            );


        // Student not found

        if (!student) {

            throw new Error(
                "Student not found. Please check your Roll Number."
            );
        }


        // Show Student Details

        document.getElementById(
            "studentName"
        ).textContent =
            student.name;


        document.getElementById(
            "studentRollNo"
        ).textContent =
            student.rollNo;


        document.getElementById(
            "roomNo"
        ).textContent =
            student.roomNo;


        document.getElementById(
            "floor"
        ).textContent =
            student.floor;


        document.getElementById(
            "wing"
        ).textContent =
            student.wing;


        // Load Timetable

        const timetableResponse =
            await fetch("./timetable.json");


        if (!timetableResponse.ok) {

            throw new Error(
                "Unable to load timetable."
            );
        }


        const timetable =
            await timetableResponse.json();


        // Display Timetable

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


    // Clear old timetable

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


    // Create timetable day by day

    days.forEach(
        (day) => {


            const dayEntries =
                timetable.filter(
                    (item) =>
                        item.day === day
                );


            // Skip if no data

            if (
                dayEntries.length === 0
            ) {

                return;

            }


            // Create day section

            const daySection =
                document.createElement(
                    "div"
                );


            daySection.className =
                "day-section";


            // Create day heading

            const dayTitle =
                document.createElement(
                    "h3"
                );


            dayTitle.textContent =
                day;


            daySection.appendChild(
                dayTitle
            );


            // Add subjects

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


            // Add day section

            timetableContainer.appendChild(
                daySection
            );

        }
    );

}