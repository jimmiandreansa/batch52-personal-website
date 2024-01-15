const express = require("express");
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

const data = [
  {
    id: 1,
    name: "Binic Company - 2024",
    description:
      "Ketiganya sebenarnya tidak memiliki arti kata secara khusus; namun article mempunyai fungsi khusus dalam melengkapi suatu frasa atau klausa, yang secara spesifik berhubungan dengan noun atau kata benda di dalamnya.",
  },
  {
    id: 2,
    name: "Bionic Play - 2023",
    description:
      "Ketiganya sebenarnya tidak memiliki arti kata secara khusus; namun article mempunyai fungsi khusus dalam melengkapi suatu frasa atau klausa, yang secara spesifik berhubungan dengan noun atau kata benda di dalamnya.",
  },
  {
    id: 3,
    name: "Bionic Music - 2024",
    description:
      "Ketiganya sebenarnya tidak memiliki arti kata secara khusus; namun article mempunyai fungsi khusus dalam melengkapi suatu frasa atau klausa, yang secara spesifik berhubungan dengan noun atau kata benda di dalamnya.",
  },
];

function home(req, res) {
  res.render("index");
}

function contact(req, res) {
  res.render("contact");
}

function myProject(req, res) {
  res.render("my-project", { data });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function projectDetail(req, res) {
  const idSaja = req.params;
  const { id } = req.params;

  console.log(idSaja);
  console.log(id);

  res.render("project-detail");
}

function handlePostProject(req, res) {
  console.log("Berhasil menggunakan Method POST")

  res.redirect("/project")
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});