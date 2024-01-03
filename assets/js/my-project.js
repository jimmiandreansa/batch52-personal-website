const projects = [];

function createCard(e) {
  e.preventDefault();

  const firstDate = document.getElementById("start-date").value;
  const lastDate = document.getElementById("end-date").value;

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const technologies = [
    
  ];
  let image = document.getElementById("image").files;
  image = URL.createObjectURL(image[0]);

  let startDate = new Date(firstDate);
  let endDate = new Date(lastDate);
  const time = Math.abs(endDate - startDate);

  console.log(time);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));

  // const years = Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 365));

  // if(days < 30) {
  //   return days + " Hari"
  // } else if (days < 365) {
  //   return months + " Bulan"
  // } else if (days >= 365) {
  //   return years + " Tahun"
  // }

  const project = {
    name,
    days,
    months,
    description,
    technologies,
    image,
  };

  projects.unshift(project);
  renderProject();
}

function renderProject() {
  let html = "";

  for (let index = 0; index < projects.length; index++) {
    html += `
  <div class="card">
            <div class="card-img">
              <a class="img-link" href="/project-x.html">
                <img
                src="${projects[index].image}"
                alt="My-Project"
              />
              </a>
            </div>
            <div class="card-information">
              <div class="card-info-top">
                <h3 class="card-info-title">
                  <a href="/project-x.html">
                    ${projects[index].name} - 2024
                  </a>
                </h3>
                <p class="card-info-time">Durasi: ${projects[index].days < 30 ? projects[index].days : projects[index].months} ${
      projects[index].days < 30 ? "Hari" : "Bulan"
    }</p>
              </div>
              <p class="card-info-middle">
                ${projects[index].description}
              </p>
              <div class="card-info-bottom">
                <ion-icon
                  class="card-icon"
                  name="logo-google-playstore"
                ></ion-icon>
                <i class="fa-brands fa-js"></i>
                <ion-icon class="card-icon" name="logo-android"></ion-icon>
                <ion-icon class="card-icon" name="logo-javascript"></ion-icon>
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
