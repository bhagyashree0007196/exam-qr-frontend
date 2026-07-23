async function searchStudent() {

    const rollNo = document.getElementById("rollNo").value.trim();

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const studentResult = document.getElementById("studentResult");

    error.classList.add("hidden");
    studentResult.classList.add("hidden");

    if (!rollNo) {
        error.textContent = "Please enter your Roll Number.";
        error.classList.remove("hidden");
        return;
    }

    loading.classList.remove("hidden");

    try {

        const response = await fetch("./students.json");

        if (!response.ok) {
            throw new Error("Unable to load student data.");
        }

        const students = await response.json();

        const student = students.find(
            (item) =>
                String(item.rollNo).trim() ===
                String(rollNo).trim()
        );

        if (!student) {
            throw new Error(
                "Student not found. Please check your Roll Number."
            );
        }

        document.getElementById("studentName").textContent =
            student.name;

        document.getElementById("studentRollNo").textContent =
            student.rollNo;

        document.getElementById("roomNo").textContent =
            student.roomNo;

        document.getElementById("floor").textContent =
            student.floor;

        document.getElementById("wing").textContent =
            student.wing;

        document.getElementById("timetable").innerHTML =
            "<p>Timetable will be available soon.</p>";

        studentResult.classList.remove("hidden");

    } catch (errorMessage) {

        error.textContent =
            errorMessage.message;

        error.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");

    }

}
