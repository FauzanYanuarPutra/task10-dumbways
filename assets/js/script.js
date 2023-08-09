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
  idForm.classList.toggle("hidden");
  bg.classList.toggle("hidden");
}
