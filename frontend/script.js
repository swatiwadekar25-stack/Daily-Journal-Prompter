const mood = document.getElementById("mood");
const button = document.getElementById("btn");
const result = document.getElementById("result");

button.addEventListener("click", async () => {

    const selectedMood = mood.value;

    if (!selectedMood) {
        result.innerText = "Please select your mood.";
        return;
    }

    result.innerText = "Generating prompt...";

    try {

        const response = await fetch("http://localhost:5000/journal-prompt", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                mood: selectedMood
            })
        });

        const data = await response.json();

        result.innerText = data.prompt;

    } catch (error) {

        console.log(error);

        result.innerText = "Something went wrong.";
    }
});