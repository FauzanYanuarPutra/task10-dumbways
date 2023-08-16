class Testimonial {
  #quote = "";
  #image = "";

  constructor(quote, image) {
    this.#quote = quote;
    this.#image = image;
  }

  get quote() {
    return this.#quote;
  }

  get image() {
    return this.#image;
  }

  get author() {
    throw new Error("getAuthor() method must be implemented.");
  }

  get testimonialHTML() {
    return `
      <div class="testimonial">
        <img src="${this.image}" alt="Testimonial Image">
        <div class="content-testi">
          <blockquote>"${this.quote}"</blockquote>
          <p>- ${this.author}</p>
        </div>
      </div>
    `;
  }
}

class AuthorTestimonial extends Testimonial {
  #author = "";

  constructor(author, quote, image) {
    super(quote, image);
    this.#author = author;
  }

  get author() {
    return this.#author;
  }
}

class CompanyTestimonial extends Testimonial {
  #company = "";

  constructor(company, quote, image) {
    super(quote, image);
    this.#company = company;
  }

  get author() {
    return this.#company + " Company";
  }
}

const testimonial1 = new AuthorTestimonial(
  "Kim Jong Un",
  "영업의 뛰어난 전문성, 결과에 놀라움!",
  "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/jawapos/2020/02/Kim-Jong-Un-The-Straits-Times.jpg"
);

const testimonial2 = new AuthorTestimonial(
  "Adolf Hilter",
  "Modernes Design, Einfache Navigation, Herausragend!",
  "https://1.bp.blogspot.com/-CvZM24G23yA/XZeEbi_QoxI/AAAAAAABKFk/Ke1WsrNRZjwJl8ar9p93VPOiFYRSdOK2QCLcBGAsYHQ/s1600/Kumis%2BHitler%2Byoutube.jpg"
);

const testimonial3 = new AuthorTestimonial(
  "Soeharto",
  "Impian Website Terwujud, Terima Kasih kepada Tim!",
  "https://mmc.tirto.id/image/otf/500x0/2017/11/07/soeharto--life_ratio-16x9.JPG"
);

const testimonial4 = new AuthorTestimonial(
  "Joseph Stalin",
  "Беспредельное творчество, Удивительный результат!",
  "https://nationaltoday.com/wp-content/uploads/2022/10/67-joseph-stalin-1200x834.jpg"
);

const testimonial5 = new AuthorTestimonial(
  "Pol Pot",
  "ការផ្តោតប៉ុណ្ណោះ, រចនាសម្ព័ន្ធសម្រាប់បច្ចុប្បន្ន, ពេញចិត្ត!",
  "https://www.matamatanews.com/sites/default/files/styles/image_740x431/public/field/image/polpot1.jpg?itok=eeTYft9x"
);

const testimonial6 = new AuthorTestimonial(
  "Idi Amin",
  "Lulimi lw'Uganda: Ebitundu ebyo ebibye byebyomwe, Webusabe bw'okukola.",
  "https://koranntb.com/wp-content/uploads/2022/03/images-78.jpeg"
);

const testimonialData = [
  testimonial1,
  testimonial2,
  testimonial3,
  testimonial4,
  testimonial5,
  testimonial6,
];
const testimonialsContainer = document.getElementById("testimonials");

for (let i = 0; i < testimonialData.length; i++) {
  testimonialsContainer.innerHTML += testimonialData[i].testimonialHTML;
}
