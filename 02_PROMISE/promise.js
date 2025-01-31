document.addEventListener("DOMContentLoaded", function () {
    // accessing the fetch-btn
    const fetchButton = document.getElementById("fetch-btn");
    // accessing the output-container
    const outputContainer = document.getElementById("output-container");

    // creating a function that will simulate a delay of 5 seconds using a Promise
    function simulateDelay() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Promise resolved after 5 seconds");
            }, 5000);
        });
    }

    // creating a function that will fetch data from the API using fetch and promises
    function fetchData() {
        return fetch("https://dummyjson.com/posts")
            .then((responseObject) => {
                if (!responseObject.ok) {
                    throw new Error(
                        `HTTP error! status: ${responseObject.status}`
                    );
                }
                return responseObject.json();
            })
            .then((data) => data.posts)
            .catch((error) => {
                outputContainer.textContent = "Error fetching data: " + error;
                throw error; // Re-throw the error to ensure proper handling
            });
    }

    // adding an event listener to the fetch button
    fetchButton.addEventListener("click", function () {
        outputContainer.style.display = "block";
        outputContainer.textContent = "Fetching data with a 5-second delay...";
        outputContainer.style.fontSize = "1.3rem";
        outputContainer.style.textAlign = "center";
        outputContainer.style.padding = "2rem";

        // simulate a delay and fetch data sequentially using promises
        simulateDelay()
            .then(() => fetchData())
            .then((posts) => {
                // clearing the output-container div
                outputContainer.innerHTML = "";
                outputContainer.style.padding = "0";
                outputContainer.style.fontSize = "0";

                // now displaying posts in the output container
                const list = document.createElement("ul");
                posts.forEach((post) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = post.title;
                    list.appendChild(listItem);
                });

                outputContainer.appendChild(list);
            })
            .catch((error) => {
                console.error("Error occurred:", error);
            });
    });

    // code snippet
    const codeSnippet = `
function fetchData() {
    return new Promise((resolve) => {
        console.log("Fetching data...");
        setTimeout(() => {
            const data = { name: "Ankit", location: "Uttarakhand" };
            console.log("Data fetched!");
            resolve(data); // promise resolved
        }, 2000); // Simulating delay
    });
}

function displayData(data) {
    console.log("Displaying Data:", data);
}

// Using the fetchData function with a Promise
fetchData().then(displayData);
        `;

    // Display the code snippet
    document.getElementById("code-block").textContent = codeSnippet;

    document
        .getElementById("theme-toggle-btn")
        .addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
});
