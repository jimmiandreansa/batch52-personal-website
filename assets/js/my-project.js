function createCard(e) {
  // Mencegah reload
  e.preventDefault();

  let isiProject = JSON.parse(localStorage.getItem("projects")) || [];

  if (localStorage.getItem("projects")) {
    isiProject = JSON.parse(localStorage.getItem("projects"));
  }

  // Mengambil nilai inputan name & description
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  // Mengambil nilai inputan image
  let image = document.getElementById("image").files;
  image = URL.createObjectURL(image[0]);

  // Mengambil nilai inputan startDate & endDate
  const firstDate = document.getElementById("start-date").value;
  const lastDate = document.getElementById("end-date").value;
  let startDate = new Date(firstDate);
  let endDate = new Date(lastDate);
  const time = Math.abs(endDate - startDate);
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
  const year = startDate.getFullYear();

  const nodeJs = document.getElementById("node-js").checked;
  const nextJs = document.getElementById("next-js").checked;
  const reactJs = document.getElementById("react-js").checked;
  const vueJs = document.getElementById("vue-js").checked;

  const project = {
    name,
    days,
    months,
    description,
    nodeJs,
    nextJs,
    reactJs,
    vueJs,
    year,
    image,
  };

  isiProject.unshift(project);

  console.log(isiProject);
  saveProject();
  renderProject();

  // Fungsi untuk menyimpan project ke LocalStorage
  function saveProject() {
    localStorage.setItem("projects", JSON.stringify(isiProject));
  }

  // Fungsi untuk merender card project
  function renderProject() {
    let html = "";

    for (let index = 0; index < isiProject.length; index++) {
      let techIcons = "";

      if (isiProject[index].nodeJs === true) {
        techIcons += `<i class="fa-brands fa-node-js"></i>`;
      }

      if (isiProject[index].nextJs === true) {
        techIcons += `<i class="fa-brands fa-js"></i>`;
      }

      if (isiProject[index].reactJs === true) {
        techIcons += `<i class="fa-brands fa-react"></i>`;
      }

      if (isiProject[index].vueJs === true) {
        techIcons += `<i class="fa-brands fa-vuejs"></i>`;
      }

      html += `
        <div class="card">
              <div class="card-img">
                <a class="img-link" href="/project-x.html">
                  <img
                  src="${isiProject[index].image}"
                  alt="My-Project"
                />
                </a>
              </div>
              <div class="card-information">
                <div class="card-info-top">
                  <h3 class="card-info-title">
                    <a href="/project-x.html">
                      ${isiProject[index].name} - ${isiProject[index].year}
                    </a>
                  </h3>
                  <p class="card-info-time">Durasi: ${
                    isiProject[index].days < 30
                      ? isiProject[index].days
                      : isiProject[index].months
                  } ${isiProject[index].days < 30 ? "Hari" : "Bulan"}</p>
                  </p>
                </div>
                <p class="card-info-middle">
                  ${isiProject[index].description}
                </p>
                <div class="card-info-bottom">
                  ${techIcons}
                </div>
                <div class="card-info-btn">
                  <button class="card-btn">Edit</button>
                  <button class="card-btn">Delete</button>
                </div>
              </div>
            </div>`;
    }
    document.getElementById("input-project").innerHTML = html;
  }

  renderProject();
}
