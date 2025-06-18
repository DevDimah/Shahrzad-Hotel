
/*document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleForm');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const container = document.querySelector('.d-lg-flex.half');
  
  // Fields for validation
  const nationalitySelect = document.getElementById('nationality');
  const idNumberInput = document.getElementById('idNumber');
  const registerPassword = document.getElementById('register-password');
  const confirmPassword = document.getElementById('confirm-password');
  const agreeTerms = document.getElementById('agreeTerms');

  // Toggle forms functionality
  toggleButton.addEventListener('click', function () {
    container.classList.toggle('slide');

    loginForm.classList.toggle('active-form');
    loginForm.classList.toggle('inactive-form');
    registerForm.classList.toggle('active-form');
    registerForm.classList.toggle('inactive-form');

    toggleButton.textContent = toggleButton.textContent.includes('ماعنـدك حساب؟ انضم لنا') 
      ? 'عندك حساب؟ سجل دخول من هنا' 
      : 'ماعنـدك حساب؟ انضم لنا';

    if (window.innerWidth <= 768) {
      container.style.transform = 'none';
    }
  });

  // Validation on form submission
  registerForm.addEventListener('submit', function (event) {
    let valid = true;

    // Check if all fields are filled
    const fields = registerForm.querySelectorAll('input');
    fields.forEach(field => {
      if (field.value.trim() === '') {
        field.classList.add('is-invalid');
        valid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });

    // Check if passwords match
    if (registerPassword.value !== confirmPassword.value) {
      confirmPassword.classList.add('is-invalid');
      valid = false;
    } else {
      confirmPassword.classList.remove('is-invalid');
    }

    // Check if nationality is selected and ID/passport is filled
    if (nationalitySelect.value === 'saudi' && idNumberInput.value.trim() === '') {
      idNumberInput.classList.add('is-invalid');
      valid = false;
    } else if (nationalitySelect.value === 'non-saudi' && idNumberInput.value.trim() === '') {
      idNumberInput.classList.add('is-invalid');
      valid = false;
    } else {
      idNumberInput.classList.remove('is-invalid');
    }

    // Check if terms are agreed
    if (!agreeTerms.checked) {
      agreeTerms.classList.add('is-invalid');
      valid = false;
    } else {
      agreeTerms.classList.remove('is-invalid');
    }

    if (!valid) {
      event.preventDefault();
    }
  });

  nationalitySelect.addEventListener('change', function () {
    if (this.value === 'saudi') {
      idNumberInput.placeholder = 'رقم الهوية الوطنية';
      idNumberInput.disabled = false;
    } else if (this.value === 'non-saudi') {
      idNumberInput.placeholder = 'رقم جواز السفر أو الإقامة';
      idNumberInput.disabled = false;
    }
  });
});*/

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleForm');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const container = document.querySelector('.d-lg-flex.half');
  
  const errorModal = new bootstrap.Modal(document.getElementById('errorModal'), { keyboard: false });
  const modalMessage = document.getElementById('modal-message');

  const showModal = (message) => {
    modalMessage.textContent = message;
    errorModal.show();
  };

  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      container.classList.toggle('slide');
      loginForm.classList.toggle('active-form');
      loginForm.classList.toggle('inactive-form');
      registerForm.classList.toggle('active-form');
      registerForm.classList.toggle('inactive-form');

      toggleButton.textContent = toggleButton.textContent.includes('ماعنـدك حساب؟ انضم لنا')
        ? 'عندك حساب؟ سجل دخول من هنا'
        : 'ماعنـدك حساب؟ انضم لنا';
    });
  }

  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (loginEmail.value.trim() === '' || loginPassword.value.trim() === '') {
        showModal('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
        return;
      }

      fetch("http://174.138.123.152:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "first_name": "John",
          "last_name": "Doe",
          "phone_number": "1234567890",
          "accom_nat_id": "ABC123",
          "email": "user@example.com",
          "password": "password123"
        }),
      })
      .then((response) => {
        if (!response.ok) {
          console.error("Response Status:", response.status); // عرض رمز الحالة
          return response.json().then((data) => {
            console.error("Error details:", data); // عرض تفاصيل الخطأ
            throw new Error('Failed to login');
          });
        }
        return response.json();
      })
      .then((data) => console.log("Login Successful:", data))
      .catch((error) => console.error("Login Error:", error));
    });
  }

  const registerPassword = document.getElementById('register-password');
  const confirmPassword = document.getElementById('confirm-password');
  const agreeTerms = document.getElementById('agreeTerms');
  const phoneNumber = document.getElementById('phoneNumber');
  const email = document.getElementById('register-email');
  const firstName = document.getElementById('register-firstName');
  const lastName = document.getElementById('register-lastName');
  const nationality = document.getElementById("nationality");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{7,15}$/;
  const namePattern = /^[a-zA-Z\u0621-\u064A]{2,50}$/;

  // Check if password is strong
  const isStrongPassword = (password) => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password);

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let valid = true;
      let errorMessage = '';

      // Validate First and Last Names
      if (!namePattern.test(firstName.value)) {
        firstName.classList.add('is-invalid');
        valid = false;
        errorMessage = 'يرجى إدخال الاسم الأول بشكل صحيح';
      } else {
        firstName.classList.remove('is-invalid');
      }

      if (!namePattern.test(lastName.value)) {
        lastName.classList.add('is-invalid');
        valid = false;
        errorMessage = 'يرجى إدخال الاسم الأخير بشكل صحيح.';
      } else {
        lastName.classList.remove('is-invalid');
      }

      // Required fields validation
      const fields = registerForm.querySelectorAll('input[required]');
      fields.forEach(field => {
        if (field.value.trim() === '') {
          field.classList.add('is-invalid');
          valid = false;
          errorMessage = 'يرجى ملء جميع الحقول المطلوبة.';
        } else {
          field.classList.remove('is-invalid');
        }
      });

      // Validate Email and Phone Number
      if (!emailPattern.test(email.value)) {
        email.classList.add('is-invalid');
        valid = false;
        errorMessage = 'يرجى إدخال بريد إلكتروني صحيح.';
      } else {
        email.classList.remove('is-invalid');
      }

      if (!phonePattern.test(phoneNumber.value)) {
        phoneNumber.classList.add('is-invalid');
        valid = false;
        errorMessage = 'يرجى إدخال رقم هاتف صحيح يتراوح بين 7 إلى 15 رقمًا.';
      } else {
        phoneNumber.classList.remove('is-invalid');
      }

      // Password Matching and Strength
      if (registerPassword.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        valid = false;
        errorMessage = 'كلمات المرور غير متطابقة.';
      } else if (!isStrongPassword(registerPassword.value)) {
        registerPassword.classList.add('is-invalid');
        valid = false;
        errorMessage = 'يجب أن تكون كلمة المرور من ثمان خانات تتضمن حروف وأرقام';
      } else {
        confirmPassword.classList.remove('is-invalid');
        registerPassword.classList.remove('is-invalid');
      }

      // Terms and Conditions Agreement
      if (!agreeTerms.checked) {
        agreeTerms.classList.add('is-invalid');
        valid = false;
        errorMessage = 'يرجى الموافقة على الشروط والأحكام.';
      } else {
        agreeTerms.classList.remove('is-invalid');
      }

      // Display error if validation fails
      if (!valid) {
        alert(errorMessage);
        return;
      }



      /*================================== APis =============================================*/

    // Send registration data to the server
    const loginData = {
      "email": email.value,
      "password": registerPassword.value
    };

    fetch('http://174.138.123.152:8000/api/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          console.error("Error details:", data); // عرض تفاصيل الخطأ
          throw new Error('Failed to register');
        });
      }
      return response.json();
    })
    .then((data) => console.log("Login Successful:", data))
    .catch((error) => console.error("Login Error:", error));







      // Send registration data to the server
      const registerData = {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "email": email.value,
        "password": registerPassword.value,
        "phone_number": phoneNumber.value,
        "accom_nat_id": "some_value", 
        "nationality": "some_value"     
   };
      
      fetch('http://174.138.123.152:8000/api/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            console.error("Error details:", data); // عرض تفاصيل الخطأ
            throw new Error('Failed to register');
          });
        }
        return response.json();
      })
      .then((data) => console.log("Registration Successful:", data))
      .catch((error) => console.error("Registration Error:", error));
      

  














    }); 
  }
});