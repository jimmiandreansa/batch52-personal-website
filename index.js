// Import
import express from "express";

const app = express();
const port = 3000;

// Use handlebars for template engine
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));
// Body Parser
app.use(express.urlencoded({ extended: false }));

app.get("/", home);
app.get("/contact", contact);
app.get("/project", myProject);
app.get("/project-detail/:id", projectDetail);
app.get("/testimonials", testimonial);
app.post("/project", handlePostProject);
app.get("/delete/:id", handleDeleteProject)
app.get("/edit-project/:id", editProject);
app.post("/edit-project", handleEditProject)

// Ini adalah penampungan data dari inputan user
const data = [];

function home(req, res) {
  res.render("index", {title: "Personal Website"});
}

function contact(req, res) {
  res.render("contact", {title: "Contact Me"});
}

function myProject(req, res) {
  res.render("my-project", { data });
}

function testimonial(req, res) {
  res.render("testimonial", {title: "My Testimonials"});
}

function projectDetail(req, res) {
  const {id} = req.params
  const dataDetail = data[id]

  res.render("project-detail", {data: dataDetail})
}

// Fungsi untuk meng-handle post project dengan method POST
function handlePostProject(req, res) {
  // Mendapatkan data-data dari inputan user
  const { 
    name, 
    startdate, 
    enddate, 
    description, 
    angular, 
    laravel, 
    react, 
    vue 
  } = req.body;
  // Perhitungan untuk menentukan durasi project
  const startDate = new Date(startdate)
  const endDate = new Date(enddate)
  const time = Math.abs(endDate - startDate);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));
  // Nilai tahun untuk ditampilkan ke judul project
  const year = startDate.getFullYear()
  // Fungsi pengkondisian untuk durasi (Hari, Bulan, dan Tahun)
  function duration() {
    if(days < 30) {
      return days + " Hari"
    } else if (months < 12) {
      return months + " Bulan"
    } else {
      return years + " Tahun"
    }
  }
  // Memasukkan data yang user input kedalam penampungan data
  data.unshift({
    name,
    startdate, 
    enddate, 
    duration: duration(),
    year,
    description, 
    angular, 
    laravel, 
    react, 
    vue
  })
  // Melempar user ke halaman project
  res.redirect("/project#my-project");
}

function handleDeleteProject(req, res) {
  const {id} = req.params
  data.splice(id, 1)
  res.redirect("/project")
}

function editProject(req, res) {
  const {id} = req.params
  const dataEdit = data[id]
  res.render("edit-project", {data: dataEdit})
}

function handleEditProject(req, res) {
  const {id} = req.params
  let { 
    name, 
    startdate, 
    enddate, 
    description, 
    angular, 
    laravel, 
    react, 
    vue 
  } = req.body;

  let startDate = new Date(startdate)
  let endDate = new Date(enddate)
  let time = Math.abs(endDate - startDate);

  let days = Math.floor(time / (1000 * 60 * 60 * 24));
  let months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
  let years = Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));
  const year = startDate.getFullYear()

  // Fungsi pengkondisian untuk durasi (Hari, Bulan, dan Tahun)
  function duration() {
    if(days < 30) {
      return days + " Hari"
    } else if (months < 12) {
      return months + " Bulan"
    } else {
      return years + " Tahun"
    }
  }

  data[id] = {
    name,
    startdate, 
    enddate, 
    duration: duration(),
    year,
    description, 
    angular, 
    laravel, 
    react, 
    vue
  }

  const datas = data[id]
  data.splice(id, 1, datas)
  res.redirect("/project#my-project");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
