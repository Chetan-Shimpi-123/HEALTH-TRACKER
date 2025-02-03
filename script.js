let workouts = [];
const ctx = document.getElementById("workoutChart").getContext("2d");
let workoutChart;

// Function to add a workout
function addWorkout() {
    const userName = document.getElementById("userName").value;
    const workoutType = document.getElementById("workoutType").value;
    const workoutMinutes = parseInt(document.getElementById("workoutMinutes").value, 10);

    if (userName && workoutType && workoutMinutes) {
        workouts.push({ userName, workoutType, workoutMinutes });
        document.getElementById("userName").value = "";
        document.getElementById("workoutType").value = "";
        document.getElementById("workoutMinutes").value = "";
        updateWorkoutList();
        updateChart();
    }
   var userData=[
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        },
    ] 
}

// Function to update the workout table
function updateWorkoutList() {
    const tbody = document.getElementById("workoutList");
    tbody.innerHTML = "";

    workouts.forEach((workout) => {
        const row = `<tr>
                        <td>${workout.userName}</td>
                        <td>${workout.workoutType}</td>
                        <td>${workout.workoutMinutes}</td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}

// Function to filter workouts
function filterWorkouts() {
    const searchName = document.getElementById("searchName").value.toLowerCase();
    const filterType = document.getElementById("filterType").value;
    
    const tbody = document.getElementById("workoutList");
    tbody.innerHTML = "";

    workouts
        .filter(w => w.userName.toLowerCase().includes(searchName))
        .filter(w => (filterType ? w.workoutType === filterType : true))
        .forEach((workout) => {
            const row = `<tr>
                            <td>${workout.userName}</td>
                            <td>${workout.workoutType}</td>
                            <td>${workout.workoutMinutes}</td>
                         </tr>`;
            tbody.innerHTML += row;
        });
}

// Function to update the workout chart
function updateChart() {
    const workoutTypes = ["Running", "Cycling", "Yoga", "Swimming"];
    const data = workoutTypes.map(type => 
        workouts.filter(w => w.workoutType === type).reduce((acc, w) => acc + w.workoutMinutes, 0)
    );

    if (workoutChart) {
        workoutChart.destroy();
    }

    workoutChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: workoutTypes,
            datasets: [{
                label: "Workout Minutes",
                data: data,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"]
            }]
        }
    });
}
