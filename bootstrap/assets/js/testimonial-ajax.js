function getTestimonialData() {
  return new Promise((resolve, reject) => {
    const data = new XMLHttpRequest();

    data.open("GET", "https://api.npoint.io/ecc798f78f049d7d379b", true)

    data.onload = () => {
      if(data.status === 200) {
        const response = JSON.parse(data.responseText);
        console.log(response)
        resolve(response)
      } else {
        reject("error loading data")
      }
    }

    data.onerror = () => {
      reject("Network Error")
    }

    data.send()
  })
}

async function allTestimonial() {
  document.getElementById("testimonials").innerHTML = "<img src='https://www.pngall.com/wp-content/uploads/14/Loading-PNG-HD-Image.png' class='loading'>"
  const testimonials = await getTestimonialData()

  let testimonialHTML = ""

  testimonials.forEach((value) => {
    testimonialHTML += `
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

  document.getElementById("testimonials").innerHTML = testimonialHTML
}

async function filteredTestimonial(rating) {
  document.getElementById("testimonials").innerHTML = "<img src='https://www.pngall.com/wp-content/uploads/14/Loading-PNG-HD-Image.png' class='loading'>"
  const testimonials = await getTestimonialData()

  const filteredTestimonials = testimonials.filter((value) => value.rating === rating)

  if(!filteredTestimonials.length) {
    return document.getElementById("testimonials").innerHTML = "<img src='https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png' class='no-data'>"
  }

  let filteredTestimonialHTML = ""

  filteredTestimonials.forEach((value) => {
    filteredTestimonialHTML += `
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

  document.getElementById("testimonials").innerHTML = filteredTestimonialHTML
}

allTestimonial()