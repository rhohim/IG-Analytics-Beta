var jwt = localStorage.getItem("jwt");
if (jwt == null) {
    window.location.href = './login.html'
}

// function loadUser() {
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "https://www.mecallapi.com/api/auth/user");
//     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4) {
//             const objects = JSON.parse(this.responseText);
//             if (objects["status"] == "ok") {
//                 const user = objects["user"]
//                 document.getElementById("fname").innerHTML = user["fname"];
//                 document.getElementById("avatar").src = user["avatar"];
//                 document.getElementById("username").innerHTML = user["username"];
//             }
//         }
//     };
// }
 
// function loadUser() {
//     const xhttp = new XMLHttpRequest();
//     document.getElementById('loader').style.display = "block"
//     xhttp.open("GET", "https://cbn360-api.herokuapp.com/api/users/me/");
//     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4) {
//             const objects = JSON.parse(this.responseText);
//             if (objects["jwt"] !== null) {
//                 const user = objects
//                     // document.getElementById("fname").innerHTML = user["fname"];
//                     // document.getElementById("avatar").src = user["profilePict"].url;
//                 document.getElementById("username").innerHTML = user["username"];
//                 // document.getElementById("email").innerHTML = user["email"]
//                 // console.log(user["profilePict"].url)
//                 // console.log(objects)
//             }
//         }
//     };
// }

// loadUser();

// Auto Run And Load Data List API ForEach


// const thisForm = document.getElementById('myForm');
// thisForm.addEventListener('submit', async function(e) {
//     const xhttp = new XMLHttpRequest();
//     xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
//     // xhttp.send();
//     e.preventDefault();
//     const formData = new FormData(thisForm).entries()
//     const response = await fetch('http://50.50.50.229:1337/api/announcements/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(Object.fromEntries(formData))
//     });

//     const result = await response.json();
//     console.log(result)
// });

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
  

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = './login.html'
}

const labels = [
    'Post 1',
    'Post 2',
    'Post 3',
    'Post 4',
    'Post 5',
    'Post 6',
    'Post 7',
    'Post 8',
    'Post 9',
    'Post 10',
    'Post 11',
    'Post 12',
  ];

  // var dataLikes = {
  //   label: "Likes",
  //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   lineTension: 0,
  //   fill: false,
  //   borderColor: 'red'
  // }

  // var dataComments = {
  //   label: "Comment",
  //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   lineTension: 0,
  //   fill: false,
  //   borderColor: 'blue'
  // }

  const data = {
    labels: labels,
    datasets: [{
      label: 'Likes',
      lineTension: 0.5,
      pointRadius: 3,
      pointHoverRadius: 3,
      fill: true,
      backgroundColor: 'rgba(61, 204, 145, 0.20)',
      borderColor: 'rgba(61, 205, 144, 1)',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    // {
    //   label: 'Comment',
    //   lineTension: 0.5,
    //   backgroundColor: 'blue',
    //   borderColor: 'blue',
    //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // }]
  ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );


  function updateChart(){
    async function fetchData(){
      const url = '../static/assets/data.json';
      const response = await fetch(url)
      const datapoints = await response.json();
      // console.log(datapoints)
      return datapoints;
    }

    fetchData().then(datapoints => {
      const post = datapoints.map(
        function(index){
          return "Post " + index.id;
        })

      const likes = datapoints.map(
        function(index){
          return index.like;
        })

      const comments = datapoints.map(
        function(index){
          return index.comment;
        })

        // console.log(post)
        myChart.config.data.labels = post;
        myChart.config.data.datasets[0].data = likes
        // myChart.config.data.datasets[1].data = comments
        myChart.update();
    })
}

var longText = $('#biography');
longText.text(longText.text().substr(0, 300) + "...");

function submitform() {
  document.getElementById('loading').style.display = "block"
  // return false;
  var test = document.getElementById("usernameIg").value;
  document.getElementById("showValue").innerHTML = test;
  console.log(test)
}

// $(document).ready(function($) {
//   $(".table-row").click(function() {
//       alert("success")
//   });
// });

$(document).ready(function() {
  
  function saveScreenshot(canvas) {
    var downloadLink = document.createElement('a');
    downloadLink.download = 'instagram-profile.jpg';
    canvas.toBlob(function(blob) {
      downloadLink.href = URL.createObjectURL(blob)
      downloadLink.click();
    });
  }


  $(".download-btn").on("click", function(e) {
    e.preventDefault();
    html2canvas(document.querySelector(".download-container"), {
        scrollX: 0,
        scrollY: 0
      }).then(function(canvas) {
        var image = canvas.toDataURL('image/jpeg');
        document.getElementById("created-element").src = image;
        $(this).attr('href', image);
        saveScreenshot(canvas);
      });
  });
});
