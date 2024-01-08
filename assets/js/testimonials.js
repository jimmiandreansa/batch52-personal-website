const testimonials = [
  {
    image: "/assets/images/my-testimoni/testimonial1.jpg",
    content: "Projectnya bagus-bagus, semoga bisa berkembang kedepannya",
    rating: 2,
    author: "Jimmi Andreansa"
  },
  {
    image: "/assets/images/my-testimoni/testimonial2.png",
    content: "Semoga websitenya tambah maju dan sukses, bisa dibuat bermacam-macam paltform!",
    rating: 5,
    author: "Bionic"
  },
  {
    image: "/assets/images/my-testimoni/testimonial3.jpg",
    content: "Mantap websitenya pak.",
    rating: 4,
    author: "Lambda"
  },
  {
    image: "/assets/images/my-testimoni/testimonial4.jpg",
    content: "Keren banget, pengerjaannya cepat dan tuntas, puas!",
    rating: 3,
    author: "Izan Guevara"
  },
  {
    image: "/assets/images/my-testimoni/testimonial5.jpg",
    content: "Keren banget, pengerjaannya cepat dan tuntas, puas!",
    rating: 1,
    author: "Christiano Messi"
  },
  {
    image: "/assets/images/my-testimoni/testimonial6.JPG",
    content: "Keren banget, pengerjaannya cepat dan tuntas, puas!",
    rating: 5,
    author: "Rapper Inggris"
  },
  {
    image: "/assets/images/my-testimoni/testimonial7.JPG",
    content: "Keren banget, pengerjaannya cepat dan tuntas, puas!",
    rating: 5,
    author: "Kemal Syafrial Mun"
  },
  {
    image: "/assets/images/my-testimoni/testimonial8.jpg",
    content: "Keren banget, pengerjaannya cepat dan tuntas, puas!",
    rating: 3,
    author: "John Kick"
  },
  {
    image: "/assets/images/my-testimoni/testimonial9.jpg",
    content: "Keren banget, pengerjaannya cepat dan tuntas, puas!",
    rating: 4,
    author: "Moeza"
  },
  {
    image: "/assets/images/my-testimoni/testimonial10.jpg",
    content: "Keren banget, pengerjaannya cepat dan tuntas, puas!",
    rating: 5,
    author: "Lucky Milo"
  },
  {
    image: "/assets/images/my-testimoni/testimonial11.jpg",
    content: "Keren banget, pengerjaannya cepat dan tuntas, puas!",
    rating: 4,
    author: "Anna Bernath"
  },
]

function starButton() {
  // function star() {
  //   for(let i = 0; i < 5; i++) {
  //     if(i < rating) {
  //       // return `<i class="fa-solid fa-star"></i>`
  //       console.log(`Bintang ${i}`)
  //     } else {
  //       // return `<i class="fa-regular fa-star"></i>`
  //       console.log(`Bintang dada ${i}`)
  //     }
  //   }
  // }

  const testimonialHTML = testimonials.map((value) => {
    return `
    <div class="card-testimoni">
      <img
        class="img-testimoni"
        src="${value.image}"
        alt="My-Testimoni"
      />
      <p class="content-testimoni">"${value.content}"</p>
      <p class="author-testimoni">~ ${value.author}</p>
      <div class="testimonial-star">
      ${value.rating} <i class="fa-solid fa-star"></i>
        </div>
    </div>`
  })

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ")
}

function filterTestimonial(rating) {
  console.log(rating)
  const testimonialFiltered = testimonials.filter((value) => value.rating === rating)

  const testimonialFilteredHTML = testimonialFiltered.map((value) => {
    return `
    <div class="card-testimoni">
      <img
        class="img-testimoni"
        src="${value.image}"
        alt="My-Testimoni"
      />
      <p class="content-testimoni">"${value.content}"</p>
      <p class="author-testimoni">~ ${value.author} Company</p>
      <div class="testimonial-star">
      ${value.rating} <i class="fa-solid fa-star"></i>
        </div>
    </div>
    `
  })

  document.getElementById("testimonials").innerHTML = testimonialFilteredHTML.join(" ")
}

starButton()