// Trigger modal to open when the page loads
document.addEventListener("DOMContentLoaded", function () {
  let myModal = new bootstrap.Modal(document.getElementById('myModal'));
  myModal.show();
});



// Transitions 
const sections = document.querySelectorAll('section');

const options = {
  threshold: 0.2
};


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});




// Reviews
async function loadReviews() {
  try {
    const response = await fetch("assets/reviews.json"); // Assuming reviews.json contains your JSON data
    const data = await response.json();
    return data.reviews; // Assuming the JSON structure has a key 'reviews' containing an array of review objects
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
}
const template = (review) => {
  const filledStars = '&#9733;'.repeat(review.rating);
  const emptyStars = '&#9734;'.repeat(5 - review.rating);

  return `
  <div class="my-2 shadow border p-4 rounded-4">
    <div class="row">
      <div class="col-auto align-self-center text-center">
        <i class="display-1 bi bi-person-circle"></i>
        <div><i class="bi bi-instagram text-danger"></i> <i class="bi bi-facebook text-primary"></i></div>

     </div>
      <div class="col">
        <span class="fs-5 card-title">${review.author}</span> <span class="text-warning">${filledStars}</span><span class="text-warning">${emptyStars}</span>
        <div>
          <span class="fw-light"><i>${review.text}</i></span>
        </div>
      </div>
    </div>
  </div>
  `;
};

// Populate the card template
async function renderReviews() {
  const reviewsContainer = document.getElementById("taxi-review");
  const reviews = await loadReviews();
  if (reviews) {
    reviewsContainer.innerHTML = ""; // Clear existing content
    reviews.forEach((review) => {
      reviewsContainer.innerHTML += template(review); // Populate and append each review
    });
  }
}

document.addEventListener("DOMContentLoaded", renderReviews);




// Onclick function to scroll and close modal
function booking() {
  const element = document.getElementById("booking");
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    document.querySelector('[data-bs-dismiss="offcanvas"]').click();
  }
}




// Fake taxi counter
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to update the taxi count displayed on the page
function updateTaxiCount() {
  const countElement = document.getElementById("count");
  const randomCount = getRandomNumber(1, 13);
  const randomSeconds = getRandomNumber(0, 59);

  countElement.textContent = randomCount;

  setTimeout(updateTaxiCount, (40 + randomSeconds) * 1000);
}

updateTaxiCount();




// Google Translate Deprecated button:
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'es',
    includedLanguages: 'en,pt,de',
    layout: google.translate.TranslateElement.InlineLayout.VERTICAL,
    autoDisplay: false
  }, 'google_translate_element');
}




document.addEventListener("DOMContentLoaded", function () {
  // Fetch phone IDs from JSON file
  fetch('assets/random_phone.json')
    .then(response => response.json())
    .then(data => {
      const phoneIds = data.phoneIds;

      function generateRandomWhatsAppLink() {
        // Generate random index to select a phone ID from the array
        const randomIndex = Math.floor(Math.random() * phoneIds.length);
        const randomPhoneId = phoneIds[randomIndex];
        return `https://wa.me/${randomPhoneId}`;
      }

      var whatsappButtons = document.querySelectorAll(".whatsapp-button");

      whatsappButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var whatsappLink = generateRandomWhatsAppLink();
          window.open(whatsappLink, "_blank");
        });
      });

      var initialWhatsAppLink = generateRandomWhatsAppLink();
    })
    .catch(error => console.error('Error fetching phone IDs:', error));
});



document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file containing text content
  fetch('assets/some_content.json')
    .then(response => response.json())
    .then(data => {
      // Extract data from JSON
      const title = data.title;
      const paragraphs = data.paragraphs;
      const linkText = data.link.text;
      const linkUrl = data.link.url;

      // Create the HTML content
      var htmlContent = `
      <div>
        <h2 class="text-center mb-5 mt-4 display-2">${title}</h2>
        ${paragraphs.map(paragraph => `<p class="lead">${paragraph}</p>`).join('')}
        <p class="fw-semibold">Para estar al tanto, revisa el calendario de actividades en <a class="text-warning click text-decoration-none" href="${linkUrl}" target="_blank">${linkText}</a>.</p>
      </div>
    `;

      // Get the div element with id "buenos_aires_info"
      var buenosAiresInfoDiv = document.getElementById("some_content_01");

      // Check if the div element exists
      if (buenosAiresInfoDiv) {
        // Insert the HTML content inside the div element
        buenosAiresInfoDiv.innerHTML = htmlContent;
      } else {
        console.error("Element with id 'buenos_aires_info' not found.");
      }
    })
    .catch(error => console.error('Error fetching JSON:', error));
});



document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file containing rendering data
  fetch('assets/render_data.json')
    .then(response => response.json())
    .then(data => {
      // Populate elements with data from JSON
      document.querySelector('.h1-title-rendering').innerText = data.h1Title.toUpperCase(); // Convert to uppercase
      document.querySelector('.h2-text-rendering-01').innerText = data.h2Text;

      // Iterate over each element with class 'taxi-brand-rendering' and update its text content
      document.querySelectorAll('.taxi-brand-rendering').forEach(element => {
        // Check if the element's parent contains a <small> tag
        if (element.parentElement.tagName.toLowerCase() === 'small') {
          element.innerText = data.taxiBrand.toLowerCase(); // Convert to lowercase
        } else {
          element.innerText = data.taxiBrand.toUpperCase(); // Convert to uppercase
        }
      });

      // Update text content of button spans
      document.querySelectorAll('.button-text-action').forEach(span => span.innerText = data.buttonActionText);
      document.querySelectorAll('.button-text-schedule').forEach(span => span.innerText = data.buttonScheduleText);

      // Update email link content and href attribute
      const emailLink = document.querySelector('.render-taxi-email');
      emailLink.innerText = data.renderTaxiEmail;
      emailLink.setAttribute('href', `mailto:${data.renderTaxiEmail}`);

      // Update href attribute of links
      document.querySelector('.facebook-link-rendering').setAttribute('href', data.facebookLink);
      document.querySelector('.instagram-link-rendering').setAttribute('href', data.instagramLink);
      document.querySelector('.twitter-link-rendering').setAttribute('href', data.twitterLink);
      document.querySelector('.tiktok-link-rendering').setAttribute('href', data.tiktokLink);

      // Update href attribute of phone number links with tel: protocol
      document.querySelectorAll('.taxi-phone-rendering-01').forEach(span => {
        const phone01 = data.taxiPhone01;
        span.innerText = phone01;
        span.setAttribute('href', `tel:${phone01}`);
      });

      document.querySelectorAll('.taxi-phone-rendering-02').forEach(span => {
        const phone02 = data.taxiPhone02;
        span.innerText = phone02;
        span.setAttribute('href', `tel:${phone02}`);
      });

      document.querySelectorAll('span[id^="additionalContent"]').forEach(span => {
        const spanId = span.getAttribute('id');
        if (data[spanId]) {
          span.innerText = data[spanId];
        }
      });

      // Set the title dynamically
      document.title = data.title;

      // Dynamically set metadata
      for (const key in data.metadata) {
        if (data.metadata.hasOwnProperty(key)) {
          const metaTag = document.createElement("meta");
          metaTag.setAttribute("name", key);
          metaTag.setAttribute("content", data.metadata[key]);
          document.head.appendChild(metaTag);
        }
      }

      // Dynamically set canonical link
      const canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute("href", data.canonicalUrl);
      document.head.appendChild(canonicalLink);
    })
    .catch(error => console.error('Error fetching JSON:', error));
});


// External email composer

function composeEmail() {
  const name = document.getElementById('inputName').value;
  const subject = document.getElementById('inputSubject').value;
  const message = document.getElementById('inputMessage').value;
  const email = 'info@bestaxidriver.com.ar'; // Replace with your email address

  if (name.trim() === '' || subject.trim() === '' || message.trim() === '') {
    // Display an error message or perform any necessary validation logic
    alert('Please fill in all fields.');
    return;
  }

  const mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent('Nombre: ' + name + '\n\nMensaje: ' + message);

  window.location.href = mailtoLink;
}


// Site Map Generator 

const generateSitemapUrl = () => {
  const baseUrl = window.location.origin;
  const xmlDoc = new DOMParser().parseFromString('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', 'application/xml');
  const urlElement = xmlDoc.createElement("url");
  const locElement = xmlDoc.createElement("loc");
  locElement.textContent = baseUrl;
  const changefreqElement = xmlDoc.createElement("changefreq");
  changefreqElement.textContent = "weekly";
  const priorityElement = xmlDoc.createElement("priority");
  priorityElement.textContent = "1.0";
  urlElement.appendChild(locElement);
  urlElement.appendChild(changefreqElement);
  urlElement.appendChild(priorityElement);
  xmlDoc.documentElement.appendChild(urlElement);
  const xmlString = new XMLSerializer().serializeToString(xmlDoc);
  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener('click', () => {
      const blob = new Blob([xmlString], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      link.click();
      URL.revokeObjectURL(url);
  });
};

window.onload = generateSitemapUrl;



//Automatic schema generation 
const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

        const generateSchema = async () => {
            await wait(1000); 

             const response = await fetch('assets/render_data.json');
            const data = await response.json();

             const { title, description, keywords, author, robots, 'og:title': ogTitle, 'og:description': ogDescription, 'og:url': ogUrl, 'og:type': ogType, canonicalUrl, h1Title, h2Text, taxiBrand } = data;

             const reserveUrlTemplate = `${canonicalUrl}/reserve`;

             const schema = {
                "@context": "http://schema.org",
                "@type": "WebPage",
                "name": title,
                "url": canonicalUrl,
                "description": description,
                "keywords": keywords,
                "author": author,
                "robots": robots,
                "headline": h1Title,
                "text": h2Text,
                "brand": {
                    "@type": "Brand",
                    "name": taxiBrand
                },
                "potentialAction": {
                    "@type": "ReserveAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": reserveUrlTemplate
                    },
                    "result": {
                        "@type": "Reservation",
                        "name": "Taxi reservation"
                    }
                },
                "sameAs": ogUrl 
            };

             const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schema);
            document.head.appendChild(script);

            console.log('Schema generated:', schema);
        };

        window.onload = generateSchema;