function formSubmit(e) {
  e.preventDefault()

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if(name == "") {
    return alert("Nama kolom nama harus diisi")
  } else if(email == "") {
    return alert("Kolom email tidak boleh kosong")
  } else if(phone == "") {
    return alert("Kolom No. Hp tidak boleh kosong")
  } else if(message == "") {
    return alert("Kolom message tidak boleh kosong")
  }

  console.log(name)
  console.log(email)
  console.log(phone)
  console.log(subject)
  console.log(message)

  // Programatically Link
  let a = document.createElement("a")

  a.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`

  a.click()
}
