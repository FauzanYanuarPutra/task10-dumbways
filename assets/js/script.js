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
    return alert("Nama harus diisi!");
  } else if (phone == "") {
    return alert("Nama harus diisi!");
  } else if (subject == "") {
    return alert("Nama harus diisi!");
  } else if (message == "") {
    return alert("Nama harus diisi!");
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
            <div>
              <img src="${project.image}" alt="" style="width: 100%;">
            </div>
            <div>
              <p class="judul">${project.name}</p>
              <p>durasi : ${project.durasi} bulan</p>
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
  const errorCheckbox = document.querySelector(".checkbox-error-validate");
  const errorDeskripsi = document.querySelector(".deskripsi-error-validate");

  if (technologies.length === 0) {
    errorCheckbox.classList.remove("hidden");
    return;
  } else {
    errorCheckbox.classList.add("hidden");
  }

  if (description.length <= 150) {
    errorDeskripsi.classList.remove("hidden");
    return;
  } else {
    errorDeskripsi.classList.add("hidden");
  }

  const newProject = {
    name: projectName,
    startDate: startDate,
    endDate: endDate,
    description: description,
    technologies: technologies,
    image: imageUrl,
    durasi: durasi,
  };

  console.log("New Project:", newProject);
  DataProject.push(newProject);
  console.log(DataProject);
  renderProjects();
}

function calculateMonthDifference(startDate, endDate) {
  var start = new Date(startDate);
  var end = new Date(endDate);

  var yearDiff = end.getFullYear() - start.getFullYear();
  var monthDiff = end.getMonth() - start.getMonth();

  return yearDiff * 12 + monthDiff || 0;
}

// function previewImage(props) {
//   const previewElement = document.querySelector("#preview-image");
//   console.log(props);
//   previewElement.textContent = `<img src="${props}">`;
// }

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
