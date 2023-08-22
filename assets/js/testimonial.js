class Testimonial {
  #quote = "";
  #image = "";
  #rating = 0;

  constructor(quote, image, rating) {
    this.#quote = quote;
    this.#image = image;
    this.#rating = rating;
  }

  get quote() {
    return this.#quote;
  }

  get image() {
    return this.#image;
  }

  get rating() {
    return this.#rating;
  }

  get author() {
    throw new Error("getAuthor() method must be implemented.");
  }

  get testimonialHTML() {
    const filledStars = "★".repeat(this.rating);
    const emptyStars = "☆".repeat(5 - this.rating);

    return `
      <div class="testimonial">
        <img src="${this.image}" alt="Testimonial Image">
        <div class="content-testi">
          <blockquote>"${this.quote}"</blockquote>
          <p>- ${this.author}</p>
          <p>
            <span class="stars" style="font-size: 17px"><span style="color: orangered; font-size: 17px">${filledStars}</span>${emptyStars}</span>
          </p>
        </div>
      </div>
    `;
  }
}

class AuthorTestimonial extends Testimonial {
  #author = "";

  constructor(author, quote, image, rating) {
    super(quote, image, rating);
    this.#author = author;
  }

  get author() {
    return this.#author;
  }
}

class CompanyTestimonial extends Testimonial {
  #company = "";

  constructor(company, quote, image, rating) {
    super(quote, image, rating);
    this.#company = company;
  }

  get author() {
    return this.#company + " Company";
  }
}

const testimonialData = [];

const api = "https://api.npoint.io/11be16bc5f763e5ba191";

fetch(api)
  .then((response) => response.json())
  .then((dataFromAPI) => {
    testimonialData.push(...dataFromAPI);
    renderTestimonials("all");
  })
  .catch((error) => {
    console.error("Error fetching testimonial data:", error);
  });

const testimonialsContainer = document.querySelector("#testimonials .data");
const testimonialsContainerError = document.querySelector(
  "#testimonials .data-error"
);

const filterButtons = document.querySelectorAll(".filter-button");

function renderTestimonials(filter) {
  const filteredTestimonials = testimonialData.filter(
    (testimonial) => filter === "all" || testimonial.rating === parseInt(filter)
  );

  if (filteredTestimonials.length > 0) {
    const testimonialsHTML = filteredTestimonials
      .map((testimonial) => {
        const testimonialInstance = new AuthorTestimonial(
          testimonial.author,
          testimonial.quote,
          testimonial.image,
          testimonial.rating
        );
        return testimonialInstance.testimonialHTML;
      })
      .join("");

    testimonialsContainer.innerHTML = testimonialsHTML;
    testimonialsContainerError.innerHTML = "";
  } else {
    testimonialsContainer.innerHTML = "";
    testimonialsContainerError.innerHTML =
      "<h4 style='display: flex; justify-content: center; font-size: 20px'>Data Not Found!</h4>";
  }
}

renderTestimonials("all");

function filterrating(rating) {
  renderTestimonials(rating);
}

function filterrating(rating) {
  filterButtons.forEach((button) => {
    button.classList.remove("active-button");
  });
  const activeButton = document.querySelector(
    `[onclick='filterrating("${rating}")']`
  );
  if (activeButton) {
    activeButton.classList.add("active-button");
  }
  renderTestimonials(rating);
}
