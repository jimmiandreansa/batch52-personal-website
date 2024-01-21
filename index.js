// Import
const express = require("express");
const dbPool = require("./src/connection/index");

const app = express();
const port = 3000;

// Sequelize
const { development } = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const SequelizePool = new Sequelize(development);

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
app.get("/delete/:id", handleDeleteProject);
app.get("/edit-project/:id", editProject);
app.post("/edit-project", handleEditProject);

// Fungsi untuk menampilkan halaman Home
function home(req, res) {
  res.render("index", { title: "Personal Website" });
}

// Fungsi untuk merender halaman Contact
function contact(req, res) {
  res.render("contact", { title: "Contact Me" });
}

// Fungsi untuk merender halaman My-Project
async function myProject(req, res) {
  const query = "SELECT * FROM projects";
  const project = await SequelizePool.query(query, { type: QueryTypes.SELECT });
  res.render("my-project", { data: project });
}

// Fungsi untuk merender halaman Testimonial
function testimonial(req, res) {
  res.render("testimonial", { title: "My Testimonials" });
}

// Fungsi untuk merender halaman Detail Project
async function projectDetail(req, res) {
  const { id } = req.params;
  // Perintah Query
  const query = `SELECT * FROM projects WHERE id = ${id}`;
  const dataDetail = await SequelizePool.query(query, {type: QueryTypes.SELECT})
  // Merender halaman project-detail dengan membawa data-data yang telah diambil dari database
  res.render("project-detail", { data: dataDetail[0] });
}

// Fungsi untuk meng-handle post project dengan method POST
async function handlePostProject(req, res) {
  try {
    // Mengambil data-data dari inputan user
    const { name, startdate, enddate, description, tech } = req.body;
    // Perhitungan untuk menentukan durasi project
    const startDate = new Date(startdate);
    const endDate = new Date(enddate);
    const time = Math.abs(endDate - startDate);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));
    // Nilai tahun untuk ditampilkan ke judul project
    const year = startDate.getFullYear();
    // Fungsi pengkondisian untuk durasi (Hari, Bulan, dan Tahun)
    function duration() {
      if (days < 30) {
        return days + " Hari";
      } else if (months < 12) {
        return months + " Bulan";
      } else {
        return years + " Tahun";
      }
    }
    const techs = Array.isArray(tech) ? tech : [tech];
    // Masukkan data-data kedalam database
    const query = `INSERT INTO projects 
    (name, year, start_date, end_date, duration, description, tech) 
    VALUES 
    ('${name}', '${year}', '${startdate}', '${enddate}', '${duration()}', '${description}', '{${techs}}')`;
    await SequelizePool.query(query, { type: QueryTypes.INSERT });
    // Melempar user ke halaman My-Project
    res.redirect("/project#my-project");
  } catch (error) {
    console.log(error);
  }
}

// Fungsi untuk menghapus data Project
async function handleDeleteProject(req, res) {
  try {
    const { id } = req.params;
    // Perintah query Delete
    const query = `DELETE FROM projects WHERE id = ${id}`;
    await SequelizePool.query(query, { type: QueryTypes.DELETE });
    res.redirect("/project#my-project");
  } catch (error) {
    // Apabila terjadi error
    throw error;
  }
}

// Fungsi untuk menampilkan halaman Edit Project
async function editProject(req, res) {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM projects WHERE id = ${id}`;
    const editView = await SequelizePool.query(query, {
      type: QueryTypes.SELECT,
    });
    // editView dikasih [0], karena merupakan tipe data Array
    res.render("edit-project", { data: editView[0] });
  } catch (error) {
    console.log(error);
  }
}

// Fungsi untuk meng-handle edit project dengan method POST
async function handleEditProject(req, res) {
  try {
    // Mengambil nilai dari inputan-inputan yang ada dihalaman My-Project
    const { id, name, startdate, enddate, description, tech } = req.body;
    // Membuat inputan Tech menjadi tipe data Array
    const techArray = Array.isArray(tech) ? tech : [tech];
    // Perhitungan untuk menentukan durasi project
    let startDate = new Date(startdate);
    let endDate = new Date(enddate);
    let time = Math.abs(endDate - startDate);
    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    let months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
    let years = Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));
    const year = startDate.getFullYear();
    // Fungsi pengkondisian untuk durasi (Hari, Bulan, dan Tahun)
    function duration() {
      if (days < 30) {
        return days + " Hari";
      } else if (months < 12) {
        return months + " Bulan";
      } else {
        return years + " Tahun";
      }
    }
    // Masukan data-data yang akan di-update kedalam database
    const query = `UPDATE projects SET 
      name='${name}', 
      year='${year}', 
      start_date='${startdate}', 
      end_date='${enddate}', 
      duration='${duration()}', 
      description='${description}', 
      tech='{${techArray}}' 
      WHERE id = ${id}`;
    await SequelizePool.query(query, { type: QueryTypes.UPDATE });
    res.redirect("/project#my-project");
  } catch (error) {
    // Apabila terjadi error
    console.log(error);
  }
}

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
