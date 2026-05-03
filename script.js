const CONTACT = {
  phoneDisplay: "+1 (202) 465-9573",
  phoneHref: "+12024659573",
  email: "chibuzo.joseph@outlook.com",
  whatsapp: "12024659573",
};

const cars = [
  {
    id: "camry-xle-2020",
    brand: "Toyota",
    model: "Camry XLE",
    year: 2020,
    price: 16500,
    mileage: 45000,
    transmission: "Automatic",
    fuel: "Petrol",
    drivetrain: "FWD",
    condition: "Clean title",
    location: "Maryland, USA",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Toyota%20Camry%20LE%202020.jpg?width=900",
    summary: "Comfortable sedan with a quiet cabin, strong fuel economy, leather-trimmed interior, and Toyota reliability.",
  },
  {
    id: "rav4-le-2019",
    brand: "Toyota",
    model: "RAV4 LE",
    year: 2019,
    price: 18900,
    mileage: 60000,
    transmission: "Automatic",
    fuel: "Petrol",
    drivetrain: "AWD",
    condition: "Inspected",
    location: "Virginia, USA",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2019%20Toyota%20RAV4%20LE%20front%203.27.19.jpg?width=900",
    summary: "Practical SUV with flexible cargo space, confident road manners, and efficient everyday performance.",
  },
  {
    id: "corolla-se-2021",
    brand: "Toyota",
    model: "Corolla SE",
    year: 2021,
    price: 15200,
    mileage: 30000,
    transmission: "Automatic",
    fuel: "Petrol",
    drivetrain: "FWD",
    condition: "Clean title",
    location: "Delaware, USA",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2019%20Toyota%20Corolla%20Icon%20Tech%20VVT-i%20Hybrid%201.8.jpg?width=900",
    summary: "Low-mileage compact sedan with sporty styling, modern safety features, and excellent ownership costs.",
  },
  {
    id: "lexus-rx350-2023",
    brand: "Lexus",
    model: "RX 350",
    year: 2023,
    price: 29800,
    mileage: 22000,
    transmission: "Automatic",
    fuel: "Petrol",
    drivetrain: "AWD",
    condition: "Like new",
    location: "New Jersey, USA",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2023%20Lexus%20RX%20350%20%28front%29.jpg?width=900",
    summary: "Premium Lexus SUV with a refined ride, upscale interior, driver assistance, and excellent resale strength.",
  },
  {
    id: "lexus-is300-2021",
    brand: "Lexus",
    model: "IS 300",
    year: 2021,
    price: 27400,
    mileage: 38000,
    transmission: "Automatic",
    fuel: "Petrol",
    drivetrain: "RWD",
    condition: "Clean title",
    location: "Pennsylvania, USA",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lexus%20IS%20300%20%283BA-ASE30-BEZLZ%29%20front.jpg?width=900",
    summary: "Sport sedan with sharp handling, premium finishes, and a confident Lexus driving feel.",
  },
  {
    id: "lexus-es350-2020",
    brand: "Lexus",
    model: "ES 350",
    year: 2020,
    price: 24800,
    mileage: 41000,
    transmission: "Automatic",
    fuel: "Petrol",
    drivetrain: "FWD",
    condition: "Inspected",
    location: "Maryland, USA",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2019%20Lexus%20ES%20350%2C%20front%2011.9.19.jpg?width=900",
    summary: "Executive sedan with a smooth powertrain, quiet cabin, and the comfort buyers expect from Lexus.",
  },
];

let activeBrand = "all";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const inventoryGrid = document.querySelector("#inventoryGrid");
const searchInput = document.querySelector("#search");
const maxPrice = document.querySelector("#maxPrice");
const maxMileage = document.querySelector("#maxMileage");
const brandButtons = document.querySelectorAll("[data-brand-filter]");
const modal = document.querySelector("#carModal");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function formatMileage(value) {
  return `${new Intl.NumberFormat("en-US").format(value)} mi`;
}

function messageFor(car) {
  return encodeURIComponent(`Hello, I am interested in the ${car.year} ${car.brand} ${car.model}. Is it still available?`);
}

function contactLinks(car) {
  const message = messageFor(car);
  return {
    whatsapp: `https://wa.me/${CONTACT.whatsapp}?text=${message}`,
    phone: `tel:${CONTACT.phoneHref}`,
    email: `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${car.year} ${car.brand} ${car.model} inquiry`)}`,
  };
}

function renderCars() {
  const query = searchInput.value.trim().toLowerCase();
  const priceLimit = Number(maxPrice.value);
  const mileageLimit = Number(maxMileage.value);

  const filtered = cars.filter((car) => {
    const searchable = `${car.brand} ${car.model} ${car.year} ${car.summary} ${car.condition}`.toLowerCase();
    return (
      (activeBrand === "all" || car.brand === activeBrand) &&
      car.price <= priceLimit &&
      car.mileage <= mileageLimit &&
      searchable.includes(query)
    );
  });

  inventoryGrid.innerHTML = filtered.length
    ? filtered.map(renderCard).join("")
    : `<p class="empty-state">No cars match those filters. Try a wider search or contact us directly.</p>`;
}

function renderCard(car) {
  const links = contactLinks(car);
  return `
    <article class="car-card">
      <figure>
        <img src="${car.image}" alt="${car.year} ${car.brand} ${car.model}" loading="lazy">
      </figure>
      <div class="car-card-body">
        <div class="card-meta">
          <span>${car.brand}</span>
          <span>${car.location}</span>
        </div>
        <h3>${car.year} ${car.brand} ${car.model}</h3>
        <p class="price">${formatter.format(car.price)}</p>
        <div class="specs" aria-label="Vehicle specifications">
          <span>${formatMileage(car.mileage)}</span>
          <span>${car.transmission}</span>
          <span>${car.fuel}</span>
          <span>${car.drivetrain}</span>
        </div>
        <div class="card-actions">
          <button class="details-button" type="button" data-car-id="${car.id}">Details</button>
          <a class="button whatsapp" href="${links.whatsapp}" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </article>
  `;
}

function openModal(car) {
  const links = contactLinks(car);
  document.querySelector("#modalImage").src = car.image.replace("width=900", "width=1200");
  document.querySelector("#modalImage").alt = `${car.year} ${car.brand} ${car.model}`;
  document.querySelector("#modalBrand").textContent = car.brand;
  document.querySelector("#modalTitle").textContent = `${car.year} ${car.brand} ${car.model}`;
  document.querySelector("#modalPrice").textContent = formatter.format(car.price);
  document.querySelector("#modalSummary").textContent = car.summary;
  document.querySelector("#modalDetails").innerHTML = [
    ["Mileage", formatMileage(car.mileage)],
    ["Transmission", car.transmission],
    ["Fuel", car.fuel],
    ["Drivetrain", car.drivetrain],
    ["Condition", car.condition],
    ["Location", car.location],
  ].map(([term, description]) => `<div><dt>${term}</dt><dd>${description}</dd></div>`).join("");
  document.querySelector("#modalWhatsapp").href = links.whatsapp;
  document.querySelector("#modalPhone").href = links.phone;
  document.querySelector("#modalEmail").href = links.email;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

brandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeBrand = button.dataset.brandFilter;
    brandButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderCars();
    document.querySelector("#inventory").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

[searchInput, maxPrice, maxMileage].forEach((control) => {
  control.addEventListener("input", renderCars);
});

inventoryGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-car-id]");
  if (!button) return;
  const car = cars.find((item) => item.id === button.dataset.carId);
  if (car) openModal(car);
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderCars();
