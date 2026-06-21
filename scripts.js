const productData = [
  { id: 'wors-pap', name: 'Wors + Pap + Chakalaka', category: 'Main Plates', price: 70, description: 'Classic plate with sausage, soft pap, and spicy chakalaka.' },
  { id: 'steak-pap', name: 'Steak + Pap + Chakalaka', category: 'Main Plates', price: 85, description: 'Tender steak served with pap and our house chakalaka.' },
  { id: 'chicken-pap', name: '1/3 Chicken + Pap', category: 'Main Plates', price: 65, description: 'Grilled chicken with pap and a fresh side of chakalaka.' },
  { id: 'beef-stew', name: 'Beef Stew + Pap', category: 'Main Plates', price: 70, description: 'Rich beef stew paired with creamy pap.' },
  { id: 'chicken-chips', name: 'Chicken Dust + Chips', category: 'Street Favourites', price: 50, description: 'Crispy chicken dust served with hot chips.' },
  { id: 'kota', name: 'Kota Combo', category: 'Street Favourites', price: 50, description: 'Loaded kota stuffed with chips, Russian, sauce and cheese.' },
  { id: 'chips-cheese', name: 'Chips + Cheese/Russian', category: 'Sides & Extras', price: 30, description: 'A generous portion of chips with melted cheese or Russian sausage.' },
  { id: 'pap', name: 'Pap', category: 'Sides & Extras', price: 15, description: 'A warm bowl of soft, traditional white pap.' },
  { id: 'chakalaka', name: 'Chakalaka', category: 'Sides & Extras', price: 15, description: 'Spicy vegetable relish made the Kasi way.' },
  { id: 'magwinya', name: '5 Ama Gwinya (Vetkoek)', category: 'Sides & Extras', price: 10, description: 'Freshly fried vetkoek made daily.' },
  { id: 'samp-beans', name: 'Samp & Beans + Beef', category: "Granny's Taste", price: 55, description: 'Hearty samp and beans with savory beef.' },
  { id: 'mogodu', name: 'Mogodu + Pap', category: "Granny's Taste", price: 65, description: 'Traditional tripe stew with soft pap.' },
  { id: 'soft-drink', name: 'Soft Drink 330ml', category: 'Drinks', price: 15, description: 'Cold soft drink to refresh your meal.' },
  { id: 'mageu', name: 'Mageu', category: 'Drinks', price: 15, description: 'Traditional fermented maize drink, sweet and smooth.' },
  { id: 'malva', name: 'Malva Pudding', category: 'Desserts', price: 30, description: 'Warm, sticky pudding served with a caramel sauce.' },
  { id: 'koeksisters', name: 'Koeksisters', category: 'Desserts', price: 15, description: 'Sweet, braided pastry dipped in syrup.' },
  { id: 'kota-drink', name: 'Kota + Drink', category: 'Combo Deals', price: 50, description: 'Street-style kota paired with a refreshing drink.' },
  { id: 'vetkoek-mince', name: 'Vetkoek + Mince + Coffee', category: 'Combo Deals', price: 55, description: 'Classic combo with savory mince and hot coffee.' }
];

function createElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

const EMAILJS_SERVICE_ID = 'service_n7q97i4';
const EMAILJS_PUBLIC_KEY = '3DSjkzL_H2FGsEfqk';
const EMAILJS_CONTACT_TEMPLATE_ID = 'template_fgu4ly9';
const EMAILJS_ENQUIRY_TEMPLATE_ID = 'template_jaaf44d';

function initEmailJS() {
  if (typeof emailjs === 'undefined') return;
  if (EMAILJS_PUBLIC_KEY && !EMAILJS_PUBLIC_KEY.startsWith('YOUR_')) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}

function getEmailJSParams(form) {
  if (form.id === 'contact-form') {
    return {
      form_type: 'contact',
      contact_name: form.querySelector('#contact-name').value.trim(),
      contact_email: form.querySelector('#contact-email').value.trim(),
      contact_phone: form.querySelector('#contact-phone').value.trim(),
      contact_subject: form.querySelector('#contact-subject').value.trim(),
      contact_message: form.querySelector('#contact-message-text').value.trim()
    };
  }

  if (form.id === 'feedback-form') {
    return {
      form_type: 'enquiry',
      enquiry_name: form.querySelector('#name').value.trim(),
      enquiry_phone: form.querySelector('#phone').value.trim(),
      enquiry_id_number: form.querySelector('#id-number').value.trim(),
      enquiry_email: form.querySelector('#email').value.trim(),
      enquiry_type: form.querySelector('#enquiry-type').value,
      enquiry_message: form.querySelector('#message').value.trim()
    };
  }

  return {};
}

function sendEmailJS(form, templateId) {
  if (typeof emailjs === 'undefined' || !EMAILJS_SERVICE_ID || !templateId || EMAILJS_SERVICE_ID.startsWith('YOUR_') || templateId.startsWith('YOUR_')) {
    return Promise.reject(new Error('EmailJS not configured'));
  }

  const templateParams = getEmailJSParams(form);
  return emailjs.send(EMAILJS_SERVICE_ID, templateId, templateParams);
}

function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  if (!tabButtons.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.panel;
      tabButtons.forEach(btn => btn.classList.toggle('active', btn === button));
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === target);
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeButton = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImage) return;

  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const image = card.querySelector('img');
      lightboxImage.src = image.dataset.full || image.src;
      lightboxImage.alt = image.alt || 'Gallery photo';
      lightboxCaption.textContent = card.dataset.caption || image.alt;
      lightbox.classList.add('visible');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  const closeModal = () => {
    lightbox.classList.remove('visible');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
  };

  closeButton.addEventListener('click', closeModal);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.classList.contains('visible')) {
      closeModal();
    }
  });
}

function renderDynamicMenu(items) {
  const list = document.getElementById('dynamic-menu-list');
  if (!list) return;
  list.innerHTML = items.map(item => {
    return `
      <article class="product-card" data-category="${item.category.toLowerCase()}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="product-meta">
          <strong>R${item.price}</strong>
          <span>${item.category}</span>
        </div>
      </article>
    `;
  }).join('');
}

function filterMenu() {
  const searchField = document.getElementById('menu-search');
  const sortField = document.getElementById('menu-sort');
  const categoryField = document.getElementById('meal-category');
  if (!searchField || !sortField || !categoryField) return;
  const query = searchField.value.trim().toLowerCase();
  const sort = sortField.value;
  const selectedCategory = categoryField.value;
  let items = [...productData];

  if (selectedCategory && selectedCategory !== 'all') {
    items = items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
  }

  if (query) {
    items = items.filter(item => item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query) || item.description.toLowerCase().includes(query));
  }

  if (sort === 'price-asc') {
    items.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    items.sort((a, b) => b.price - a.price);
  } else if (sort === 'category') {
    items.sort((a, b) => a.category.localeCompare(b.category));
  }

  renderDynamicMenu(items);
}

function initDynamicMenu() {
  const menuSection = document.getElementById('dynamic-menu-list');
  if (!menuSection) return;
  renderDynamicMenu(productData);
  const searchField = document.getElementById('menu-search');
  const sortField = document.getElementById('menu-sort');
  const categoryField = document.getElementById('meal-category');
  if (searchField) searchField.addEventListener('input', filterMenu);
  if (sortField) sortField.addEventListener('change', filterMenu);
  if (categoryField) categoryField.addEventListener('change', filterMenu);
}

function getSelectedMealsFromMenuForm() {
  const form = document.getElementById('menu-order-form');
  if (!form) return [];
  return [...form.querySelectorAll('input[name="meal"]:checked')].map(input => {
    const label = form.querySelector(`label[for="${input.id}"]`);
    const displayText = label ? label.textContent.trim() : input.value;
    const priceMatch = displayText.match(/-\s*R(\d+)/);
    const price = priceMatch ? Number(priceMatch[1]) : 0;
    return {
      id: input.id,
      name: input.value,
      price,
      label: displayText
    };
  });
}

function initMenuOrderFlow() {
  const form = document.getElementById('menu-order-form');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const selectedItems = getSelectedMealsFromMenuForm();
    if (!selectedItems.length) {
      alert('Please select at least one meal before going to payment.');
      return;
    }
    const order = {
      items: selectedItems,
      total: selectedItems.reduce((sum, item) => sum + item.price, 0),
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('kasiOrder', JSON.stringify(order));
    window.location.href = 'payment.html';
  });
}

function loadPaymentPage() {
  const summary = document.getElementById('order-summary');
  const alertBox = document.getElementById('order-alert');
  const form = document.getElementById('payment-form');
  if (!summary || !form) return;

  const order = JSON.parse(localStorage.getItem('kasiOrder') || 'null');
  if (!order || !order.items?.length) {
    if (alertBox) {
      alertBox.textContent = 'No order was found. Please select your meals on the Menu page first.';
      alertBox.className = 'form-feedback error';
    }
    summary.innerHTML = '<p>Your cart is empty. Go back to the <a href="menu.html">Menu</a> page to choose your meals.</p>';
    return;
  }

  const itemsHtml = order.items.map(item => `<li>${item.name} — R${item.price}</li>`).join('');
  summary.innerHTML = `
    <div class="payment-summary">
      <h2>Your order</h2>
      <ul>${itemsHtml}</ul>
      <p class="order-total">Total: R${order.total}</p>
    </div>
  `;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const method = form.querySelector('#payment-method');
    const fullname = form.querySelector('#payment-name');
    const phone = form.querySelector('#payment-phone');
    const feedback = document.getElementById('payment-feedback');

    if (!method.value) {
      showFieldError(method, 'Please choose a payment method.');
      return;
    }
    if (!fullname.value.trim()) {
      showFieldError(fullname, 'Please enter your name.');
      return;
    }
    if (!validatePhone(phone.value)) {
      showFieldError(phone, 'Please enter a valid phone number.');
      return;
    }

    feedback.textContent = 'Confirming payment details...';
    feedback.className = 'form-feedback success';

    setTimeout(() => {
      feedback.textContent = `Payment confirmed via ${method.value}. Your order total is R${order.total}. Thank you for ordering with Kasi Flavour!`;
      feedback.className = 'form-feedback success';
      localStorage.removeItem('kasiOrder');
      form.reset();
    }, 800);
  });
}

function toggleFaqItem(header) {
  const answer = header.nextElementSibling;
  const expanded = header.classList.toggle('open');
  if (answer) {
    answer.style.maxHeight = expanded ? `${answer.scrollHeight}px` : '0';
  }
}

function initFaqAccordions() {
  document.querySelectorAll('.faq-section h3').forEach(header => {
    header.classList.add('faq-question');
    header.addEventListener('click', () => toggleFaqItem(header));
    const answer = header.nextElementSibling;
    if (answer) {
      answer.style.maxHeight = '0';
      answer.style.overflow = 'hidden';
      answer.style.transition = 'max-height 0.32s ease';
    }
  });
}

function showFieldError(field, message) {
  let error = field.parentElement.querySelector('.field-error');
  if (!error) {
    error = document.createElement('div');
    error.className = 'field-error';
    field.parentElement.appendChild(error);
  }
  error.textContent = message;
  field.classList.add('invalid');
}

function clearFieldError(field) {
  const error = field.parentElement.querySelector('.field-error');
  if (error) error.remove();
  field.classList.remove('invalid');
}

function clearFormErrors(form) {
  form.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
  form.querySelectorAll('.field-error').forEach(error => error.remove());
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value) {
  return /^(?:\+?\d{10,13})$/.test(value.replace(/\s|[-()]/g, ''));
}

function validateIdNumber(value) {
  return /^\d{7,13}$/.test(value.trim());
}

function validateEnquiryForm(form) {
  const values = {
    name: form.querySelector('#name'),
    phone: form.querySelector('#phone'),
    idNumber: form.querySelector('#id-number'),
    email: form.querySelector('#email'),
    message: form.querySelector('#message'),
    privacy: form.querySelector('#privacy'),
    captcha: form.querySelector('#captcha')
  };

  clearFormErrors(form);
  let valid = true;

  if (!values.name.value.trim()) {
    showFieldError(values.name, 'Please enter your full name.');
    valid = false;
  }
  if (!validatePhone(values.phone.value)) {
    showFieldError(values.phone, 'Enter a valid phone number (10–13 digits).');
    valid = false;
  }
  if (!validateIdNumber(values.idNumber.value)) {
    showFieldError(values.idNumber, 'Enter a valid South African ID number or 7–13 digits.');
    valid = false;
  }
  if (!validateEmail(values.email.value)) {
    showFieldError(values.email, 'Enter a valid email address.');
    valid = false;
  }
  if (!values.message.value.trim() || values.message.value.trim().length < 15) {
    showFieldError(values.message, 'Tell us more about your enquiry with at least 15 characters.');
    valid = false;
  }
  if (!values.privacy.checked) {
    showFieldError(values.privacy, 'You must agree to the privacy policy.');
    valid = false;
  }
  if (values.captcha.value.trim() !== '4') {
    showFieldError(values.captcha, 'Please answer the security question correctly.');
    valid = false;
  }

  return valid;
}

function validateContactForm(form) {
  const values = {
    name: form.querySelector('#contact-name'),
    email: form.querySelector('#contact-email'),
    phone: form.querySelector('#contact-phone'),
    subject: form.querySelector('#contact-subject'),
    message: form.querySelector('#contact-message-text')
  };

  clearFormErrors(form);
  let valid = true;

  if (!values.name.value.trim()) {
    showFieldError(values.name, 'Please enter your name.');
    valid = false;
  }
  if (!validateEmail(values.email.value)) {
    showFieldError(values.email, 'Enter a valid email address.');
    valid = false;
  }
  if (!validatePhone(values.phone.value)) {
    showFieldError(values.phone, 'Enter a valid phone number (10–13 digits).');
    valid = false;
  }
  if (!values.subject.value.trim()) {
    showFieldError(values.subject, 'Add a subject so we can respond faster.');
    valid = false;
  }
  if (!values.message.value.trim() || values.message.value.trim().length < 10) {
    showFieldError(values.message, 'Please include your message with at least 10 characters.');
    valid = false;
  }

  return valid;
}

function submitFormResponse(formId, messageId, successMessage, errorMessage, callback) {
  const form = document.getElementById(formId);
  const output = document.getElementById(messageId);
  if (!form || !output) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (formId === 'feedback-form' && !validateEnquiryForm(form)) {
      output.textContent = 'Please correct the highlighted fields and try again.';
      output.className = 'form-feedback error';
      return;
    }
    if (formId === 'contact-form' && !validateContactForm(form)) {
      output.textContent = 'Please correct the highlighted fields and try again.';
      output.className = 'form-feedback error';
      return;
    }

    output.textContent = 'Sending your information...';
    output.className = 'form-feedback success';

    const templateId = formId === 'contact-form'
      ? EMAILJS_CONTACT_TEMPLATE_ID
      : formId === 'feedback-form'
        ? EMAILJS_ENQUIRY_TEMPLATE_ID
        : '';

    sendEmailJS(form, templateId)
      .then(() => {
        output.textContent = successMessage;
        output.className = 'form-feedback success';
        form.reset();
        if (callback) callback(form);
      })
      .catch(error => {
        if (error.message === 'EmailJS not configured') {
          setTimeout(() => {
            output.textContent = successMessage;
            output.className = 'form-feedback success';
            form.reset();
            if (callback) callback(form);
          }, 700);
          return;
        }

        console.error('EmailJS error:', error);
        output.textContent = errorMessage;
        output.className = 'form-feedback error';
      });
  });
}

function initForms() {
  submitFormResponse('feedback-form', 'feedback-feedback', 'Your feedback was received successfully. Thank you for reaching out! We will reply soon.', 'There was an issue with your feedback. Please check the form.', form => {
    const emailField = form.querySelector('#email');
    if (emailField) {
      emailField.focus();
    }
  });

  submitFormResponse('contact-form', 'contact-feedback', 'Your message has been sent successfully. Check your inbox for a confirmation email.', 'There was an issue sending your contact message. Please check the form.', form => {
    const emailField = form.querySelector('#contact-email');
    if (emailField) {
      emailField.focus();
    }
  });
}

function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer || typeof L === 'undefined') return;

  const map = L.map(mapContainer).setView([-33.9641, 25.6366], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  const locations = [
    {
      coords: [-33.9641, 25.6366],
      title: 'Kasi Flavour Greenacres',
      description: 'Main restaurant at Greenacres Shopping Centre.'
    },
    {
      coords: [-33.9605, 25.6345],
      title: 'Pickup Point',
      description: 'Easy order pickup near the mall entrance.'
    },
    {
      coords: [-33.9667, 25.6422],
      title: 'Catering Station',
      description: 'Local catering and event support area.'
    }
  ];

  locations.forEach(location => {
    L.marker(location.coords)
      .addTo(map)
      .bindPopup(`<strong>${location.title}</strong><br>${location.description}`);
  });
}

function initAnimations() {
  document.body.classList.add('js-enabled');
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initLightbox();
  initDynamicMenu();
  initFaqAccordions();
  initEmailJS();
  initForms();
  initMap();
  initAnimations();
});
