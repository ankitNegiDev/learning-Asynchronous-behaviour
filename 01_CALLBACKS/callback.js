// DOMContentLoaded...
document.addEventListener("DOMContentLoaded", function callback() {
    // accessing the fetch-btn.
    const fetchButton = document.getElementById("fetch-btn");
    // accessing the output-container
    const outputContainer = document.getElementById("output-container");

    // creating a function that will similuate a delay of 5sec using setTimeout()
    function simulateDelay(delayCallback) {
        setTimeout(function timerCallback() {
            const message = "Callback executed after 5 seconds";
            delayCallback(message);
        }, 5000);
    }

    // creating a function that will fetch data from the api..

    function fetchData(fetchCallback) {
        fetch("https://dummyjson.com/posts")
            .then(function onFulfillment(responseObject) {
                if (!responseObject.ok) {
                    throw new Error(
                        `HTTP error! status: ${responseObject.status}`
                    );
                }
                // here parsing the response of fetch only if response is ok or no https error
                return responseObject.json();
            })
            .then(function onFulfillment(data) {
                fetchCallback(data.posts);
            })
            .catch((error) => {
                outputContainer.textContent = "Error fetching data: " + error;
            });
    }

    // now adding a event listener on the add button
    fetchButton.addEventListener("click", function callback(event) {
        outputContainer.style.display = "block";
        outputContainer.textContent = "Fetching data with a 5-second delay...";
        outputContainer.style.fontSize = "1.3rem";
        outputContainer.style.textAlign = "center";
        outputContainer.style.padding = "2rem";
        // now calling the simulateDelay()
        simulateDelay(function simulateCallback() {
            // calling the fetchdata. only after 5 sec delay..
            fetchData(function fetchDataCallback(posts) {
                // clearing the output-container div
                outputContainer.innerHTML = "";
                outputContainer.style.padding = "0";
                outputContainer.style.fontSize = "0";

                // now displaying post in output container..

                // Using an unordered list to display titles
                const list = document.createElement("ul");
                posts.forEach((post) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = post.title;
                    list.appendChild(listItem);
                });

                outputContainer.appendChild(list);
            });
        });
    });

    // code snippet..
    const codeSnippet = `
function fetchData(callback) {
    console.log("Fetching data...");
    setTimeout(() => {
        const data = { name: "Ankit", location: "Uttarakhand" };
        console.log("Data fetched!");
        callback(data); // Calling callback with fetched data
    }, 2000); // Simulating a delay
}

function displayData(data) {
    console.log("Displaying Data:", data);
}

// Using the fetchData function with a callback
fetchData(displayData);
        `;

    // Display the code snippet
    document.getElementById("code-block").textContent = codeSnippet;

    document
        .getElementById("theme-toggle-btn")
        .addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
});
