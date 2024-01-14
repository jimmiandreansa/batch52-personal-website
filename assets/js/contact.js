function formSubmit(e) {
  // Mencegah reload browser
  e.preventDefault();

  // Mendapatkan nilai dari inputan user
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Membuat requirement
  if (name == "") {
    return alert("Nama kolom nama harus diisi");
  } else if (email == "") {
    return alert("Kolom email tidak boleh kosong");
  } else if (phone == "") {
    return alert("Kolom No. Hp tidak boleh kosong");
  } else if (message == "") {
    return alert("Kolom message tidak boleh kosong");
  }

  // Programatically Link
  let a = document.createElement("a");

  a.href = `
  mailto:${email}?subject=${subject}&body=
  ${message}
  <br>
  <br>
  Nama: <b>${name}</b> <br>
  No. HP: <b>${phone}</b> <br>
  `;

  a.click();

  // Mengosongkan form setelah mengirim form submit
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
}
