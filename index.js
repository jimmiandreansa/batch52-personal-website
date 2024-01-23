// Import
const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const dbPool = require("./src/connection/index");

const app = express();
const port = 3000;

// Sequelize
const { development } = require("./src/config/config.json");
const { Sequelize, QueryTypes, DATEONLY, DATE } = require("sequelize");
const SequelizePool = new Sequelize(development);

// Use handlebars for template engine
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));
// Body Parser
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 2 * 60 * 60 * 1000,
    },
    resave: false,
    store: session.MemoryStore(),
    secret: "session_storage",
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", home);
app.get("/contact", contact);
app.get("/project", myProject);
app.get("/project-detail/:id", projectDetail);
app.get("/testimonials", testimonial);
app.post("/project", handlePostProject);
app.get("/delete/:id", handleDeleteProject);
app.get("/edit-project/:id", editProject);
app.post("/edit-project", handleEditProject);
app.get("/login", loginView);
app.get("/register", registerView);
app.post("/login", handleLogin);
app.post("/register", handleRegister);
app.get("/logout", handleLogout)

// Fungsi untuk menampilkan halaman Home
function home(req, res) {
  let name = req.session.user;
  let userName = function () {
    return name.replace(/ .*/, "");
  };
  const title = "Jimmi Andreansa";
  const dataUser = {
    isLogin: req.session.isLogin,
    user: userName,
  };
  res.render("index", { dataUser, title });
}

// Fungsi untuk merender halaman Contact
function contact(req, res) {
  let name = req.session.user;
  let userName = function () {
    return name.replace(/ .*/, "");
  };
  const dataUser = {
    isLogin: req.session.isLogin,
    user: userName,
  };
  const title = "Contact Me";
  res.render("contact", { dataUser, title });
}

// Fungsi untuk merender halaman My-Project
async function myProject(req, res) {
  let name = req.session.user;
  let userName = function () {
    return name.replace(/ .*/, "");
  };
  const title = "Add a Project";
  const query = "SELECT * FROM projects";
  const project = await SequelizePool.query(query, { type: QueryTypes.SELECT });
  const data = project.map((res) => ({
    ...res,
    isLogin: req.session.isLogin,
    project,
  }));
  const dataUser = {
    isLogin: req.session.isLogin,
    user: userName,
  };
  res.render("my-project", { data, title, dataUser });
}

// Fungsi untuk merender halaman Testimonial
function testimonial(req, res) {
  let name = req.session.user;
  let userName = function () {
    return name.replace(/ .*/, "");
  };
  const dataUser = {
    isLogin: req.session.isLogin,
    user: userName,
  };
  const title = "Testimonials";
  res.render("testimonial", { dataUser, title });
}

// Fungsi untuk merender halaman Detail Project
async function projectDetail(req, res) {
  let name = req.session.user;
  let userName = function () {
    return name.replace(/ .*/, "");
  };
  const dataUser = {
    isLogin: req.session.isLogin,
    user: userName,
  };
  const { id } = req.params;
  // Perintah Query
  const query = `SELECT * FROM projects WHERE id = ${id}`;
  const dataDetail = await SequelizePool.query(query, {
    type: QueryTypes.SELECT,
  });
  // Merender halaman project-detail dengan membawa data-data yang telah diambil dari database
  res.render("project-detail", { data: dataDetail[0], dataUser });
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
    let name = req.session.user;
    let userName = function () {
      return name.replace(/ .*/, "");
    };
    const dataUser = {
      isLogin: req.session.isLogin,
      user: userName,
    };
    const { id } = req.params;
    const title = "Edit Project";
    const query = `SELECT * FROM projects WHERE id = ${id}`;
    const editView = await SequelizePool.query(query, {
      type: QueryTypes.SELECT,
    });
    // editView dikasih [0], karena merupakan tipe data Array
    res.render("edit-project", { data: editView[0], title, dataUser });
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

function loginView(req, res) {
  const title = "Login";
  res.render("login", { title });
}

function registerView(req, res) {
  const data = "Register";
  res.render("register", { title: data });
}

async function handleRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    const salt = 10;
    bcrypt.hash(password, salt, async (err, hashPassword) => {
      const query = `
      INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())
      `;
      await SequelizePool.query(query, { type: QueryTypes.INSERT });
    });
    req.flash("regisSuccess", "Successfully Registered");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const queryEmail = `SELECT * FROM users WHERE email = '${email}'`;
    const checkEmail = await SequelizePool.query(queryEmail, {
      type: QueryTypes.SELECT,
    });
    if (!checkEmail.length) {
      req.flash("wrongEmail", "Email has not registered");
      return res.redirect("/login");
    }
    // Fungsi untuk mencocokan password dari user dan dari database
    bcrypt.compare(password, checkEmail[0].password, function (err, result) {
      if (!result) {
        req.flash("wrongPassword", "Password does not match");
        return res.redirect("/login");
      } else {
        req.session.isLogin = true;
        req.session.user = checkEmail[0].name;
        return res.redirect("/");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function handleLogout(req, res) {
  req.session.destroy();
  res.redirect("/login")
}

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
