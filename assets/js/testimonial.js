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
            <span class="stars" style="font-size: 17px">${filledStars}${emptyStars}</span>
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

const testimonialData = [
  {
    author: "Kim Jong Un",
    quote: "영업의 뛰어난 전문성, 결과에 놀라움!",
    image:
      "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/jawapos/2020/02/Kim-Jong-Un-The-Straits-Times.jpg",
    rating: 4,
  },
  {
    author: "Adolf Hilter",
    quote: "Modernes Design, Einfache Navigation, Herausragend!",
    image:
      "https://1.bp.blogspot.com/-CvZM24G23yA/XZeEbi_QoxI/AAAAAAABKFk/Ke1WsrNRZjwJl8ar9p93VPOiFYRSdOK2QCLcBGAsYHQ/s1600/Kumis%2BHitler%2Byoutube.jpg",
    rating: 3,
  },
  {
    author: "Soeharto",
    quote: "Impian Website Terwujud, Terima Kasih kepada Tim!",
    image:
      "https://mmc.tirto.id/image/otf/500x0/2017/11/07/soeharto--life_ratio-16x9.JPG",
    rating: 5,
  },
  {
    author: "Joseph Stalin",
    quote: "Беспредельное творчество, Удивительный результат!",
    image:
      "https://nationaltoday.com/wp-content/uploads/2022/10/67-joseph-stalin-1200x834.jpg",
    rating: 5,
  },
  {
    author: "Pol Pot",
    quote: "ការផ្តោតប៉ុណ្ណោះ, រចនាសម្ព័ន្ធសម្រាប់បច្ចុប្បន្ន, ពេញចិត្ត!",
    image:
      "https://www.matamatanews.com/sites/default/files/styles/image_740x431/public/field/image/polpot1.jpg?itok=eeTYft9x",
    rating: 2,
  },
  {
    author: "Idi Amin",
    quote:
      "Lulimi lw'Uganda: Ebitundu ebyo ebibye byebyomwe, Webusabe bw'okukola.",
    image: "https://koranntb.com/wp-content/uploads/2022/03/images-78.jpeg",
    rating: 4,
  },
  {
    author: "Nelson Mandela",
    quote: "Inspirational and life-changing experience with this team!",
    image: "https://source.unsplash.com/900x900/?face",
    rating: 2,
  },
  {
    author: "Malala Yousafzai",
    quote: "A platform that truly empowers and educates!",
    image: "https://source.unsplash.com/500x500/?face",
    rating: 5,
  },
  {
    author: "Mahatma Gandhi",
    quote: "Simple and effective platform for positive change!",
    image: "https://source.unsplash.com/375x375/?face",
    rating: 4,
  },
  {
    author: "Albert Einstein",
    quote: "Intuitive and groundbreaking technology for everyone!",
    image: "https://source.unsplash.com/400x400/?face",
    rating: 4,
  },
  {
    author: "Marie Curie",
    quote: "Innovative and exceptional in its approach!",
    image: "https://source.unsplash.com/300x350/?face",
    rating: 3,
  },
  {
    author: "Leonardo da Vinci",
    quote: "A masterpiece of modern digital solutions!",
    image: "https://source.unsplash.com/250x250/?face",
    rating: 5,
  },
  {
    author: "William Shakespeare",
    quote: "Elegant and transformative in its design!",
    image: "https://source.unsplash.com/300x450/?face",
    rating: 5,
  },
  {
    author: "Amelia Earhart",
    quote: "Navigating new horizons with ease and precision!",
    image: "https://source.unsplash.com/500x500/?face",
    rating: 3,
  },
  {
    author: "Martin Luther King Jr.",
    quote: "Inspiring change and justice through technology!",
    image: "https://source.unsplash.com/250x300/?face",
    rating: 5,
  },
  {
    author: "Rosa Parks",
    quote: "Taking a seat on the cutting edge of progress!",
    image: "https://source.unsplash.com/300x300/?face",
    rating: 4,
  },
  {
    author: "Malcolm X",
    quote: "Empowering the voiceless with digital empowerment!",
    image: "https://source.unsplash.com/200x200/?face",
    rating: 4,
  },
];

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
