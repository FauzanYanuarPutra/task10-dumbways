// console.log("Hello World!");

// let nama = `Muhammad Fauzan`;
// let umur = 12;
// let isTua = false;

// console.log(
//   `nama saya ${nama}, umur saya ${umur + umur} tahun ${
//     isTua ? "Sudah tua" : ""
//   }`
// );

function submitForm() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  let subject = document.getElementById("input-subject").value;
  let message = document.getElementById("input-message").value;

  if (name == "") {
    return alert("Nama harus diisi!");
  } else if (email == "") {
    return alert("Email harus diisi!");
  } else if (phone == "") {
    return alert("Phone harus diisi!");
  } else if (subject == "") {
    return alert("Subject harus diisi!");
  } else if (message == "") {
    return alert("Message harus diisi!");
  }

  // console.log(name);
  // console.log(email);
  // console.log(phone);
  // console.log(subject);
  // console.log(message);

  const kiriman = {
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
  };

  console.log(kiriman);
  sendEmail(kiriman);
}

function sendEmail(props) {
  let emailReceiver = "fauzanyanuarp@gmail.com";

  let a = document.createElement("a");
  a.href = `mailto:${emailReceiver}?subject=${props.subject}&body=Hello my name ${props.name}, ${props.subject}, ${props.message}`;
  a.click();
}

function showAdd() {
  const idForm = document.getElementById("form-project");
  const bg = document.querySelector(".background-close");
  const body = document.body;

  idForm.classList.toggle("hidden");
  bg.classList.toggle("hidden");
  body.classList.toggle("no-scroll");
}

// POST BLOG / PROJECT

const DataProject = [];

function iconCard(technologies) {
  console.log(technologies);

  return technologies
    .map(
      (tech) =>
        `<img src="./..//assets/svg/${tech}.svg" alt="${tech}" style="width: 20px; height: 20px;">`
    )
    .join("");
}

function renderProjects() {
  const contentContainer = document.getElementById("content-card-project");
  contentContainer.innerHTML = "";

  DataProject.forEach((project) => {
    const projectHTML = `
          <a href="projectDetail.html" class="card-project">
            <div style="width:100%">
              <img src="${project.image}" alt="" style="width: 100%;">
            </div>
            <div>
              // ${getFullTime(project.postAt)}
              <p class="judul">${project.name}</p>
              <p>durasi :  ${getDistanceTime(project.durasi)}</p>
              
              <p class="about">${project.description}</p>
              <div class="icon-project">
                ${iconCard(project.technologies)}
              </div>
              <div class="button-project">
                <div>Edit</div>
                <div>Delete</div>
              </div>
            </div>
          </a>
        `;

    contentContainer.innerHTML += projectHTML;
  });
}
function addBlog(event) {
  event.preventDefault();
  console.log("Hallo");

  const projectName = document.getElementById("project-name").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const description = document.getElementById("description").value;

  const technologies = Array.from(
    document.querySelectorAll(".tech-check input[type='checkbox']:checked")
  ).map((checkbox) => checkbox.getAttribute("data-tech"));
  console.log(technologies);

  const imageInput = document.querySelector("#image");
  const selectedImage = imageInput.files[0];
  const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : null;

  const durasi = calculateMonthDifference(startDate, endDate);

  const Checkbox = document.querySelector(".checkox-judul");
  const errorCheckbox = document.querySelector(".checkbox-error-validate");

  const Deskripsi = document.querySelector(".deskription");
  const errorDeskripsi = document.querySelector(".deskripsi-error-validate");

  const date = document.querySelector(".date-project");
  const dateValidate = document.querySelector(".date-validate");

  if (endDate < startDate) {
    dateValidate.classList.remove("hidden");
    date.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  } else {
    dateValidate.classList.add("hidden");
  }

  if (description.length <= 150) {
    errorDeskripsi.classList.remove("hidden");
    Deskripsi.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  } else {
    errorDeskripsi.classList.add("hidden");
  }

  if (technologies.length === 0) {
    errorCheckbox.classList.remove("hidden");
    Checkbox.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  } else {
    errorCheckbox.classList.add("hidden");
  }

  const newProject = {
    name: projectName,
    startDate: startDate,
    endDate: endDate,
    description: description,
    technologies: technologies,
    image: imageUrl,
    durasi: durasi,
    postAt: new Date(),
  };

  // console.log(durasi);

  // console.log("New Project:", newProject);
  DataProject.push(newProject);
  // console.log(DataProject);
  renderProjects();
}

function calculateMonthDifference(startDate, endDate) {
  var start = new Date(startDate);
  var end = new Date(endDate);

  var yearDiff = end.getFullYear() - start.getFullYear();
  var monthDiff = end.getMonth() - start.getMonth();

  return yearDiff * 12 + monthDiff || 0;
}

const imageInput = document.querySelector("#image");
const imagePreview = document.querySelector("#image-preview");

imageInput.addEventListener("change", function (event) {
  const selectedImage = event.target.files[0];
  const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : "";

  imagePreview.src = imageUrl;

  if (imageUrl) {
    imagePreview.classList.remove("hidden");
  } else {
    imagePreview.classList.add("hidden");
  }
});

function getFullTime(time) {
  let monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let date = time.getDate();

  let monthIndex = time.getMonth();

  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours <= 9) {
    hours = "0" + hours;
  } else if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return `${date} ${monthName[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}

function getDistanceTime(time) {
  const timeNow = new Date();
  const distance = timeNow - time;

  const intervals = [
    { label: "days", duration: 24 * 60 * 60 * 1000 },
    { label: "hours", duration: 60 * 60 * 1000 },
    { label: "minutes", duration: 60 * 1000 },
    { label: "seconds", duration: 1000 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(distance / interval.duration);
    if (count > 0) {
      return `${count} ${interval.label} ago`;
    }
  }
  return "Just now";
}

setInterval(renderProjects, 3000);
