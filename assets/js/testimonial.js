class Testimonial {
  #image = "";
  #content = "";
  #author = "";

  constructor(image, content, author) {
    this.#image = image;
    this.#content = content;
    this.#author = author;
  }

  set image(value) {
    this.#image = value;
  }
  
  set content(value) {
    this.#content = value;
  }
  
  set author(value) {
    this.#author = value;
  }

  get image() {
    return this.#image;
  }
  
  get content() {
    return this.#content;
  }

  get author() {
    return this.#author;
  }

  html() {
    throw new Error("You must choose one, as author or company");
  }
}

class AuthorTestimonial extends Testimonial {
  html() {
    return `
    <div class="card-testimoni">
      <img
        class="img-testimoni"
        src="${this.image}"
        alt="My-Testimoni"
      />
      <p class="content-testimoni">"${this.content}"</p>
      <p class="author-testimoni">~ ${this.author}</p>
    </div>
    `
  }
}

class CompanyTestimonial extends Testimonial {
  html() {
    return `
    <div class="card-testimoni">
      <img
        class="img-testimoni"
        src="${this.image}"
        alt="My-Testimoni"
      />
      <p class="content-testimoni">"${this.content}"</p>
      <p class="author-testimoni">~ ${this.author} Company</p>
    </div>
    `
  }
}

const testimoni1 = new AuthorTestimonial("/assets/images/my-testimoni/IMG_8495.jpg", "Projectnya bagus-bagus, semoga bisa berkembang kedepannya", "Jimmi Andreansa")
const testimoni2 = new CompanyTestimonial("/assets/images/my-testimoni/code1.png", "Semoga websitenya tambah maju dan sukses, bisa dibuat bermacam-macam paltform!", "Bionic")
const testimoni3 = new CompanyTestimonial("/assets/images/my-testimoni/IMG_2760.JPG.jpg", "Mantap websitenya pak.", "Lambda")
const testimoni4 = new AuthorTestimonial("/assets/images/my-testimoni/IMG_9731.jpg", "Keren banget, pengerjaannya cepat dan tuntas, puas!", "John Doe")

const testimonials = [testimoni1, testimoni2, testimoni3, testimoni4]
let testimonialHTML = ""

for (let i = 0; i < testimonials.length; i++) {
  testimonialHTML += testimonials[i].html()
}

document.getElementById("testimonials").innerHTML = testimonialHTML