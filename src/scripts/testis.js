import '../styles/main.css';
import '../styles/Calendar.css';
import { fetchData } from "./fetch.js";
import { showToast } from "./toast.js";
import { calendarConfig, addIconEventToCalendar, openEditModal } from "./calendarConfig.js";

document.addEventListener("DOMContentLoaded", async function () {
    const calendarEl = document.getElementById("calendarView");
    const calendar = new FullCalendar.Calendar(calendarEl, calendarConfig);
    calendar.render();

    try {
        const shifts = await fetchShifts();
        addShiftsToCalendar(shifts, calendar);

        const [exercises, sicknesses, others] = await Promise.all([
            fetchData("http://localhost:3000/api/exercise/user/" + localStorage.getItem("user_id")),
            fetchData("http://localhost:3000/api/sickness/user/" + localStorage.getItem("user_id")),
            fetchData("http://localhost:3000/api/others/user/" + localStorage.getItem("user_id"))
        ]);

        exercises.forEach(entry => {
            addIconEventToCalendar(calendar, 'exercise', {
                date: entry.exercise_date,
                start_time: entry.start_time,
                end_time: entry.end_time
            }, entry.id);
        });

        sicknesses.forEach(entry => {
            addIconEventToCalendar(calendar, 'sickness', {
                date: entry.sickness_date
            }, entry.id);
        });

        others.forEach(entry => {
            addIconEventToCalendar(calendar, 'others', {
                date: entry.others_date,
                start_time: entry.start_time
            }, entry.id);
        });
    } catch (err) {
        console.error("Tapahtumien haku epäonnistui:", err);
        showToast("Tapahtumien haku epäonnistui");
    }

    const shiftModal = document.getElementById("shiftModal");
    const formTable = document.querySelector(".form-shift-table");

    function generateDaysOfMonth() {
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        formTable.innerHTML = '<div class="form-shift-header"><span>alkaa:</span><span>päättyy:</span></div>';

        for (let i = 1; i <= daysInMonth; i++) {
            const row = document.createElement("div");
            row.className = "form-row";
            row.innerHTML = `
                <label>${i}.${now.getMonth() + 1}.</label>
                <input type="time" name="start_${i}">
                <span>-</span>
                <input type="time" name="end_${i}">
            `;
            formTable.appendChild(row);
        }
    }

    document.getElementById("openShiftModal").addEventListener("click", () => {
        generateDaysOfMonth();
        shiftModal.style.display = "block";
    });
    document.getElementById("openExerciseModal").addEventListener("click", () => {
        document.getElementById("exerciseModal").style.display = "block";
    });
    document.getElementById("openSicknessModal").addEventListener("click", () => {
        document.getElementById("sicknessModal").style.display = "block";
    });
    document.getElementById("openOthersModal").addEventListener("click", () => {
        document.getElementById("othersModal").style.display = "block";
    });

    document.getElementById("shiftForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const userId = localStorage.getItem("user_id");

        let savedCount = 0;

        for (let i = 1; i <= daysInMonth; i++) {
            const startInput = document.querySelector(`[name="start_${i}"]`);
            const endInput = document.querySelector(`[name="end_${i}"]`);

            if (startInput.value && endInput.value) {
                const startTime = startInput.value;
                const endTime = endInput.value;

                const startDate = new Date(year, month, i, ...startTime.split(":"));
                let endDate = new Date(year, month, i, ...endTime.split(":"));

                if (endDate <= startDate) {
                    endDate.setDate(endDate.getDate() + 1);
                }

                const shift = {
                    user_id: parseInt(userId),
                    start_date: startDate.toISOString().split("T")[0],
                    start_time: startTime + ":00",
                    end_date: endDate.toISOString().split("T")[0],
                    end_time: endTime + ":00",
                };

                try {
                    const result = await saveShift(shift);
                    savedCount++;

                    calendar.addEvent({
                        title: "Työvuoro",
                        start: `${shift.start_date}T${shift.start_time}`,
                        end: `${shift.end_date}T${shift.end_time}`,
                        backgroundColor: "#0044cc",
                        textColor: "white",
                        extendedProps: { _id: result.id || result._id },
                    });
                } catch (err) {
                    console.error("Tallennusvirhe:", err.message);
                    showToast(`Päivä ${i}.${month + 1}. ei tallentunut`);
                }
            }
        }

        if (savedCount > 0) {
            showToast(`Tallennettu ${savedCount} työvuoro(a)`);
        } else {
            showToast("Ei tallennettuja työvuoroja");
        }

        closeModal("shiftModal");
    });

    ["exerciseForm", "sicknessForm", "othersForm"].forEach((formId) => {
        document.getElementById(formId).addEventListener("submit", function (e) {
            e.preventDefault();
            showToast("Tieto tallennettu!");
            closeModal(this.closest(".calendar-modal").id);
        });
    });

    document.getElementById("editShiftForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const startTime = document.getElementById("editStartTime").value;
        const endTime = document.getElementById("editEndTime").value;
        const date = document.getElementById("editDate").value;
        const id = document.getElementById("eventId").value;
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/shifts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                start_time: startTime + ":00",
                end_time: endTime + ":00",
            }),
        });

        if (res.ok) {
            showToast("Työvuoro päivitetty");
            closeModal("editShiftModal");
            location.reload();
        } else {
            showToast("Päivitys epäonnistui");
        }
    });

    document.getElementById("deleteShiftBtn").addEventListener("click", async function () {
        const id = document.getElementById("eventId").value;
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/shifts/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
            showToast("Työvuoro poistettu");
            closeModal("editShiftModal");
            location.reload();
        } else {
            showToast("Poisto epäonnistui");
        }
    });

    document.getElementById("editExerciseForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const userId = parseInt(localStorage.getItem("user_id"));
        const form = e.target;

        const data = {
            user_id: userId,
            exercise_date: form.exercise_date.value,
            exercise_type: form.exercise_type.value,
            start_time: form.start_time.value,
            end_time: form.end_time.value,
            level: form.level.value,
            notes: form.notes.value
        };

        const id = form.eventId.value;

        const res = await fetch(`http://localhost:3000/api/exercise/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            showToast("Liikunta päivitetty!");
            closeModal("editExerciseModal");
            location.reload();
        } else {
            showToast("Päivitys epäonnistui.");
        }
    });

    document.querySelector("#editExerciseForm .deleteEventBtn").addEventListener("click", async function () {
        const form = document.getElementById("editExerciseForm");
        const id = form.eventId.value;
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/exercise/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            showToast("Liikunta poistettu.");
            closeModal("editExerciseModal");
            location.reload();
        } else {
            showToast("Poisto epäonnistui.");
        }
    });

    document.getElementById("editSicknessForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const userId = parseInt(localStorage.getItem("user_id"));
        const form = e.target;

        const data = {
            user_id: userId,
            sickness_date: form.sickness_date.value,
            description: form.description.value,
            impact: form.impact.value,
            notes: form.notes.value
        };

        const id = form.eventId.value;

        const res = await fetch(`http://localhost:3000/api/sickness/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            showToast("Sairaus päivitetty!");
            closeModal("editSicknessModal");
            location.reload();
        } else {
            showToast("Päivitys epäonnistui.");
        }
    });

    document.querySelector("#editSicknessForm .deleteEventBtn").addEventListener("click", async function () {
        const form = document.getElementById("editSicknessForm");
        const id = form.eventId.value;
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/sickness/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            showToast("Sairaus poistettu.");
            closeModal("editSicknessModal");
            location.reload();
        } else {
            showToast("Poisto epäonnistui.");
        }
    });

    document.getElementById("editOthersForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const userId = parseInt(localStorage.getItem("user_id"));
        const form = e.target;

        const data = {
            user_id: userId,
            others_date: form.others_date.value,
            description: form.description.value,
            intensity: form.intensity.value,
            notes: form.notes.value
        };

        const id = form.eventId.value;

        const res = await fetch(`http://localhost:3000/api/others/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            showToast("Tapahtuma päivitetty!");
            closeModal("editOthersModal");
            location.reload();
        } else {
            showToast("Päivitys epäonnistui.");
        }
    });

    document.querySelector("#editOthersForm .deleteEventBtn").addEventListener("click", async function () {
        const form = document.getElementById("editOthersForm");
        const id = form.eventId.value;
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/others/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            showToast("Tapahtuma poistettu.");
            closeModal("editOthersModal");
            location.reload();
        } else {
            showToast("Poisto epäonnistui.");
        }
    });

    window.closeModal = function (modalId) {
        document.getElementById(modalId).style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target.classList.contains("calendar-modal")) {
            closeModal(event.target.id);
        }
    };
});

async function saveShift(shiftData) {
    const token = localStorage.getItem("token");
    const url = `http://localhost:3000/api/shifts`;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shiftData),
    };

    const result = await fetchData(url, options);
    if (result.error) {
        throw new Error(result.error);
    }
    return result;
}

async function fetchShifts() {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const url = `http://localhost:3000/api/shifts/user/${userId}`;
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const result = await fetchData(url, options);
    if (result.error) {
        throw new Error(result.error);
    }
    return result;
}

function addShiftsToCalendar(shifts, calendar) {
    shifts.forEach((shift) => {
        calendar.addEvent({
            title: "Työvuoro",
            start: `${shift.start_date}T${shift.start_time}`,
            end: `${shift.end_date}T${shift.end_time}`,
            backgroundColor: "#0044cc",
            textColor: "white",
            extendedProps: { _id: shift.id || shift._id },
        });
    });
}
