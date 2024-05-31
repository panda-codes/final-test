//BACKEND API URL AND API KEY
const apiUrl = "https://api.jsonbin.io/v3/b/6655e754acd3cb34a84efd4d";
const apiKey = "$2a$10$2pEAqotsyyNzDAOz9A4veOLiZiNXjicXVtOGYZGEaP/V5niNDFj16"; // Replace with your actual API key
//POST CONTAINER
const postsContainer = document.getElementById("posts-container");



document.addEventListener("deviceready", onDeviceReady, false);



function onDeviceReady() {
  function onDeviceReady() {
    // FIREBASE CONFIG
    var firebaseConfig = {
      apiKey: "AIzaSyApR2mlGQjiBC8P1iPD90JZJDQW0IOVR3U",
      authDomain: "authentication-612a2.firebaseapp.com",
      projectId: "authentication-612a2",
      storageBucket: "authentication-612a2.appspot.com",
      messagingSenderId: "858333147899",
      appId: "1:858333147899:android:9e9275592f536921b1365e",
    };

    // FIREBASE INITIALIZATION
    firebase.initializeApp(firebaseConfig);
  }

  // FETCH & DISPLAY POST FUNCTION
  fetchAndDisplayPosts();
  // USING THE DOM TO RETRIEVE AND MANIPULATE FORM DATA
  document
    .getElementById("post-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      const title = formData.get("title");
      const content = formData.get("content");
      const category = formData.get("category");

      // GEOLOCATION METHOD
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          //FETCHING LATEST POST
          fetch(`${apiUrl}/latest`, {
            headers: {
              "X-Master-Key": apiKey,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              // RETRIEVING NEWPOST RESPONSE
              const newPost = {
                id: (data.record.record.length + 1).toString(),
                title: title,
                content: content,
                category: category,
                latitude: latitude,
                longitude: longitude,
              };
              // ARRANING MOST RECENT POST FIRST
              data.record.record.unshift(newPost);

              return fetch(apiUrl, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "X-Master-Key": apiKey,
                },
                body: JSON.stringify({ record: data.record.record }),
              });
            })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to add post");
              }
              return response.json();
            })
            .then(() => {
              fetchAndDisplayPosts();
              document.getElementById("title").value = "";
              document.getElementById("content").value = "";
            })
            .catch((error) => {
              console.error("Error adding post:", error);
            });
        },
        function (error) {
          alert("Error getting location: " + error.message);
        }
      );
    });
  // HANDLING THE FILTER BUTTON EVENT
  document.getElementById("search-button").addEventListener("click", () => {
    const category = document.getElementById("search-category").value;
    fetchAndDisplayPosts(category);
  });
}

function fetchAndDisplayPosts(category = "") {
  fetch(`${apiUrl}/latest`, {
    headers: {
      "X-Master-Key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data); // Add logging to debug
      postsContainer.innerHTML = ""; // Clear previous posts

      // Check if the nested record field exists
      if (
        data.record &&
        data.record.record &&
        Array.isArray(data.record.record)
      ) {
        const posts = data.record.record.filter(
          (post) => category === "" || post.category === category
        );

        posts.forEach((post) => {
          displayPost(post);
        });
      } else {
        console.error("Invalid data structure:", JSON.stringify(data, null, 2));
      }
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}
// FUCTION FOR CREATING NEW POST
function displayPost(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");
  postElement.innerHTML = `
        <div class="post-h">
            <h2>${post.title}</h2>
        </div>
        <div class="post-bottom">
            <p>Category:${post.category}</p>
            <p>Message: ${post.content}</p>
            <p>Latitude: ${post.latitude}</p>
            <p>Longitude: ${post.longitude}</p>
            <button onclick="deletePost('${post.id}')">Delete</button>
        </div>
    `;
  postsContainer.appendChild(postElement);
}

function alertGeolocation() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      "Latitude: " +
        position.coords.latitude +
        "\n" +
        "Longitude: " +
        position.coords.longitude +
        "\n";
    },
    function (error) {
      alert("Error getting location: " + error.message);
    }
  );
}
// FUCTION TO DELETE POST
function deletePost(postId) {
  fetch(`${apiUrl}/latest`, {
    headers: {
      "X-Master-Key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const updatedPosts = data.record.record.filter(
        (post) => post.id !== postId
      );
      return fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
        body: JSON.stringify({ record: updatedPosts }),
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      return response.json();
    })
    .then(() => {
      fetchAndDisplayPosts();
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
}

onDeviceReady();
