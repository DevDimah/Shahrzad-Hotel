document.addEventListener('DOMContentLoaded', function() {
//companion
var companionInput = document.getElementById('companion');
var companionInfoSection = document.querySelector('.companions');

companionInfoSection.style.display = 'none';

companionInput.addEventListener('input', function() {
var numberOfCompanions = parseInt(companionInput.value);

if (numberOfCompanions > 0) {
    companionInfoSection.style.display = 'block';
    repeatCompanionInfo(numberOfCompanions);
} else {
    companionInfoSection.style.display = 'none';
}
});

function repeatCompanionInfo(count) {
var companionContainer = document.querySelector('.companions .companion-info');
companionContainer.innerHTML = '';

for (var i = 1; i <= count; i++) {
    var newCompanionInfo = document.createElement('div');
    newCompanionInfo.classList.add('row');
    newCompanionInfo.innerHTML = `
        <h4 class="mt-3">المرافق (${i})</h4>
        <div class="col-md-4">
            <label for="companion-name" class="form-label">الاسم </label>
            <input type="text" class="form-control" id="companion-name">
        </div>
        <div class="col-md-4">
            <label for="companion-id-number" class="form-label">الهوية  الوطنية او رقم الاقامة او التأشيرة الإلكترونية </label>
            <input type="text" class="form-control" id="companion-id-number">
        </div>
        <div class="col-md-4">
            <label for="companion-phone-number" class="form-label">رقم الجوال </label>
            <input type="text" class="form-control" id="companion-phone-number">
        </div>
    `;
    companionContainer.appendChild(newCompanionInfo);
}
}

});

// الحجز اي نموذج
document.addEventListener('DOMContentLoaded', function () {
    const reservationSelf = document.getElementById("reservationSelf");
    const reservationOther = document.getElementById("reservationOther");
    const selfBookingForm = document.getElementById("selfBookingForm");
    const otherBookingForm = document.getElementById("otherBookingForm");

    reservationSelf.addEventListener("change", function () {
        if (reservationSelf.checked) {
            selfBookingForm.style.display = 'flex';
            otherBookingForm.style.display = 'none'; 
        }
    });

    reservationOther.addEventListener("change", function () {
        if (reservationOther.checked) {
            selfBookingForm.style.display = 'none'; 
            otherBookingForm.style.display = 'flex'; 
        }
    });
});


// nationality :
document.addEventListener('DOMContentLoaded', function() {
    //  لإظهار الحقول بناءً على الجنسية المحددة
    function setupNationalityField(nationalitySelectId, nationalIDFieldId, residencyIDFieldId, visaFieldId) {
        const nationalitySelect = document.getElementById(nationalitySelectId);
        const nationalIDField = document.getElementById(nationalIDFieldId);
        const residencyIDField = document.getElementById(residencyIDFieldId);
        const visaField = document.getElementById(visaFieldId); 

        nationalitySelect.addEventListener('change', function() {
            nationalIDField.style.display = 'none';
            residencyIDField.style.display = 'none';
            visaField.style.display = 'none'; 

            if (nationalitySelect.value === 'saudi') {
                nationalIDField.style.display = 'block'; // إظهار حقل الهوية الوطنية
            } else if (nationalitySelect.value === 'resident') {
                residencyIDField.style.display = 'block'; // إظهار حقل رقم الإقامة
            } else if (nationalitySelect.value === 'visitor') {
                visaField.style.display = 'block'; // إظهار حقل رقم التأشيرة الإلكترونية
            }
        });
    }

    // إعداد نموذج صاحب الحساب
    setupNationalityField('nationality', 'nationalIDField', 'residencyIDField', 'visaField');

    // إعداد نموذج الشخص الآخر
    setupNationalityField('otherNationality', 'otherNationalIDField', 'otherResidencyIDField', 'otherVisaField');
});






// validations:

document.addEventListener('DOMContentLoaded', function () {
    //  forms and radio buttons
    const reservationSelf = document.getElementById("reservationSelf");
    const reservationOther = document.getElementById("reservationOther");
    const selfBookingForm = document.getElementById("selfBookingForm");
    const otherBookingForm = document.getElementById("otherBookingForm");

    const applePayButton = document.getElementById('applePay');
    const creditCardButton = document.getElementById('creditCard');
    const creditCardForm = document.getElementById('creditCardForm');

    creditCardForm.style.display = 'none';

    // reservation type for myself or other
    reservationSelf.addEventListener("change", function () {
        if (reservationSelf.checked) {
            selfBookingForm.style.display = 'flex'; 
            otherBookingForm.style.display = 'none'; 
        }
    });

    reservationOther.addEventListener("change", function () {
        if (reservationOther.checked) {
            selfBookingForm.style.display = 'none'; 
            otherBookingForm.style.display = 'flex'; 
        }
    });

  // hide & display credit card
    creditCardButton.addEventListener('click', function () {
        creditCardForm.style.display = 'block'; 
    });

    applePayButton.addEventListener('click', function () {
        creditCardForm.style.display = 'none'; 
    });

    // nationality handling
    function setupNationalityField(nationalitySelectId, nationalIDFieldId, residencyIDFieldId, visaFieldId) {
        const nationalitySelect = document.getElementById(nationalitySelectId);
        const nationalIDField = document.getElementById(nationalIDFieldId);
        const residencyIDField = document.getElementById(residencyIDFieldId);
        const visaField = document.getElementById(visaFieldId);

        nationalitySelect.addEventListener('change', function () {
            nationalIDField.style.display = 'none';
            residencyIDField.style.display = 'none';
            visaField.style.display = 'none';

            if (nationalitySelect.value === 'saudi') {
                nationalIDField.style.display = 'block';
            } else if (nationalitySelect.value === 'resident') {
                residencyIDField.style.display = 'block'; 
            } else if (nationalitySelect.value === 'visitor') {
                visaField.style.display = 'block'; 
            }
        });
    }

    setupNationalityField('nationality', 'nationalIDField', 'residencyIDField', 'visaField');
    setupNationalityField('otherNationality', 'otherNationalIDField', 'otherResidencyIDField', 'otherVisaField');

    // validations
    const bookingData = {
        commonInfo: {
            firstName: '',
            middleName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        },
        additionalInfo: {
            nationality: '',
            nationalID: '', // للسعوديين
            residencyID: '', // لغير السعوديين المقيمين
            visaID: '' // لغير السعوديين الزوار
        }
    };

    function validateName(name) {
        const nameRegex = /^[A-Za-z\u0621-\u064A]{2,}$/; // takes arabic and english letters
        return nameRegex.test(name);
    }

    function validatePhone(phone) {
        const phoneRegex = /^\d{7,15}$/; // 7 to 15 digits
        return phoneRegex.test(phone);
    }

    function validateNumber(number, length) {
        const numberRegex = /^\d{10}$/; // Must be 10 digits
        return number.length === length && numberRegex.test(number);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format
        return emailRegex.test(email);
    }

    function validateCardNumber(cardNumber) {
        return cardNumber.match(/^\d{16}$/) !== null; // Must be 16 digits
    }

    function validateCardHolderName(cardHolderName) {
        const nameRegex = /^[A-Za-z\s]+$/; 
        return nameRegex.test(cardHolderName);
    }

    function validateExpirationDate(expirationDate) {
        return expirationDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/) !== null; 
    }

    function validateCVC(cvc) {
        return cvc.match(/^\d{3}$/) !== null; 
    }

    const companionInput = document.getElementById('companion');
    const companionInfoSection = document.querySelector('.companions');

    companionInfoSection.style.display = 'none';

    companionInput.addEventListener('input', function () {
        const numberOfCompanions = parseInt(companionInput.value);

        if (numberOfCompanions > 0) {
            companionInfoSection.style.display = 'block';
            repeatCompanionInfo(numberOfCompanions);
        } else {
            companionInfoSection.style.display = 'none';
        }
    });

    function repeatCompanionInfo(count) {
        const companionContainer = document.querySelector('.companions .companion-info');
        companionContainer.innerHTML = '';

        for (let i = 0; i < count; i++) {
            companionContainer.innerHTML += `
                <h4 class="mt-3">المرافق (${i + 1})</h4>
                <div class="col-md-4">
                    <label for="companionFirstName_${i}" class="form-label">الاسم الأول</label>
                    <input type="text" class="form-control" id="companionFirstName_${i}" placeholder="أدخل الاسم الأول">
                </div>
                <div class="col-md-4">
                    <label for="companionID_${i}" class="form-label">رقم الهوية</label>
                    <input type="text" class="form-control" id="companionID_${i}" placeholder="أدخل رقم الهوية الوطنية">
                </div>
                <div class="col-md-4">
                    <label for="companionPhone_${i}" class="form-label">رقم الجوال</label>
                    <input type="text" class="form-control" id="companionPhone_${i}" placeholder="أدخل رقم الجوال">
                </div>
            `;
        }
    }

    document.getElementById('confirmBookingBtn').addEventListener('click', function (event) {
        event.preventDefault(); 

        let isValid = true;
        const errorMessages = [];

        // Checking booking for myself form
        if (document.getElementById('reservationSelf').checked) {
            bookingData.commonInfo.firstName = document.getElementById('firstname').value.trim();
            bookingData.commonInfo.middleName = document.getElementById('middlename').value.trim();
            bookingData.commonInfo.lastName = document.getElementById('lastname').value.trim();
            bookingData.commonInfo.phoneNum = document.getElementById('main-phone-num').value.trim();
            bookingData.commonInfo.email = document.getElementById('main-email').value.trim();
            bookingData.additionalInfo.nationality = document.getElementById('nationality').value;

            // Validate fields
            if (!validateName(bookingData.commonInfo.firstName)) {
                errorMessages.push("الاسم الأول يجب أن يحتوي على حرفين على الأقل.");
                isValid = false;
            }
            if (!validateName(bookingData.commonInfo.middleName)) {
                errorMessages.push("الاسم الثاني يجب أن يحتوي على حرفين على الأقل.");
                isValid = false;
            }
            if (!validateName(bookingData.commonInfo.lastName)) {
                errorMessages.push("الاسم الأخير يجب أن يحتوي على حرفين على الأقل.");
                isValid = false;
            }
            if (!validatePhone(bookingData.commonInfo.phoneNum)) {
                errorMessages.push("رقم الجوال يجب أن يتكون من 7 إلى 15 رقمًا.");
                isValid = false;
            }
            if (!validateEmail(bookingData.commonInfo.email)) {
                errorMessages.push("البريد الإلكتروني غير صالح.");
                isValid = false;
            }

            // Nationality validation
            if (bookingData.additionalInfo.nationality === 'saudi') {
                bookingData.additionalInfo.nationalID = document.getElementById('nationalID').value.trim();
                if (!validateNumber(bookingData.additionalInfo.nationalID, 10)) {
                    errorMessages.push("رقم الهوية الوطنية يجب أن يتكون من 10 أرقام فقط.");
                    isValid = false;
                }
            } else if (bookingData.additionalInfo.nationality === 'resident') {
                bookingData.additionalInfo.residencyID = document.getElementById('residencyID').value.trim();
                if (!validateNumber(bookingData.additionalInfo.residencyID, 10)) {
                    errorMessages.push("رقم الإقامة يجب أن يتكون من 10 أرقام فقط.");
                    isValid = false;
                }
            } else if (bookingData.additionalInfo.nationality === 'visitor') {
                bookingData.additionalInfo.visaID = document.getElementById('visaNumber').value.trim();
                if (!validateNumber(bookingData.additionalInfo.visaID, 10)) {
                    errorMessages.push("رقم التأشيرة يجب أن يتكون من 10 أرقام فقط.");
                    isValid = false;
                }
            }
        }

        // Checking booking for other form
        if (document.getElementById('reservationOther').checked) {
            bookingData.commonInfo.firstName = document.getElementById('otherFirstName').value.trim();
            bookingData.commonInfo.middleName = document.getElementById('otherMiddleName').value.trim();
            bookingData.commonInfo.lastName = document.getElementById('otherLastName').value.trim();
            bookingData.commonInfo.phoneNum = document.getElementById('otherPhoneNum').value.trim();
            bookingData.commonInfo.email = document.getElementById('otherEmail').value.trim();
            bookingData.additionalInfo.nationality = document.getElementById('otherNationality').value;

            //  fields
            if (!validateName(bookingData.commonInfo.firstName)) {
                errorMessages.push("الاسم الأول يجب أن يحتوي على حرفين على الأقل.");
                isValid = false;
            }
            if (!validateName(bookingData.commonInfo.middleName)) {
                errorMessages.push("الاسم الثاني يجب أن يحتوي على حرفين على الأقل.");
                isValid = false;
            }
            if (!validateName(bookingData.commonInfo.lastName)) {
                errorMessages.push("الاسم الأخير يجب أن يحتوي على حرفين على الأقل.");
                isValid = false;
            }
            if (!validatePhone(bookingData.commonInfo.phoneNum)) {
                errorMessages.push("رقم الجوال يجب أن يتكون من 7 إلى 15 رقمًا.");
                isValid = false;
            }
            if (!validateEmail(bookingData.commonInfo.email)) {
                errorMessages.push("البريد الإلكتروني غير صالح.");
                isValid = false;
            }

            // Nationality validation
            if (bookingData.additionalInfo.nationality === 'saudi') {
                bookingData.additionalInfo.nationalID = document.getElementById('otherNationalID').value.trim();
                if (!validateNumber(bookingData.additionalInfo.nationalID, 10)) {
                    errorMessages.push("رقم الهوية الوطنية يجب أن يتكون من 10 أرقام فقط.");
                    isValid = false;
                }
            } else if (bookingData.additionalInfo.nationality === 'resident') {
                bookingData.additionalInfo.residencyID = document.getElementById('otherResidencyID').value.trim();
                if (!validateNumber(bookingData.additionalInfo.residencyID, 10)) {
                    errorMessages.push("رقم الإقامة يجب أن يتكون من 10 أرقام فقط.");
                    isValid = false;
                }
            } else if (bookingData.additionalInfo.nationality === 'visitor') {
                bookingData.additionalInfo.visaID = document.getElementById('otherVisaNumber').value.trim();
                if (!validateNumber(bookingData.additionalInfo.visaID, 10)) {
                    errorMessages.push("رقم التأشيرة يجب أن يتكون من 10 أرقام فقط.");
                    isValid = false;
                }
            }
        }

        // Booking info validation
        const chooseDate = document.getElementById('choosedate').value;
        const arrivalTime = document.getElementById('arrivalTime').value;
        const companionNum = document.getElementById('companion').value;
        
        if (chooseDate === "") {
            errorMessages.push("يجب اختيار موعد الزيارة.");
            isValid = false;
        }
        if (arrivalTime === "") {
            errorMessages.push("يجب اختيار وقت الوصول.");
            isValid = false;
        }

        // Validate companions if number is greater than 0
        if (companionNum > 0) {
            for (let i = 0; i < companionNum; i++) {
                const companionFirstName = document.getElementById(`companionFirstName_${i}`).value.trim();
                const companionNationalID = document.getElementById(`companionID_${i}`).value.trim();
                const companionPhoneNum = document.getElementById(`companionPhone_${i}`).value.trim();

                if (companionFirstName.length < 2) {
                    errorMessages.push(`الاسم الأول للمرافق ${i + 1} يجب أن يحتوي على حرفين على الأقل.`);
                    isValid = false;
                }
                if (!validateNumber(companionNationalID, 10)) {
                    errorMessages.push(`رقم الهوية الوطنية للمرافق ${i + 1} يجب أن يتكون من 10 أرقام فقط.`);
                    isValid = false;
                }
                if (!validatePhone(companionPhoneNum)) {
                    errorMessages.push(`رقم الجوال للمرافق ${i + 1} يجب أن يتكون من 7 إلى 15 رقمًا.`);
                    isValid = false;
                }
            }
        }

        if (creditCardButton.checked) {
            const cardHolderName = document.getElementById('cardHolderName').value.trim();
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const expirationDate = document.getElementById('expirationDate').value.trim();
            const cvc = document.getElementById('cvc').value.trim();

            if (!validateCardHolderName(cardHolderName)) {
                errorMessages.push("اسم حامل البطاقة يجب أن يحتوي على أحرف فقط.");
                isValid = false;
            }

            if (!validateCardNumber(cardNumber)) {
                errorMessages.push("رقم البطاقة يجب أن يتكون من 16 رقمًا.");
                isValid = false;
            }

            if (!validateExpirationDate(expirationDate)) {
                errorMessages.push("تاريخ الانتهاء يجب أن يكون بالتنسيق MM/YY.");
                isValid = false;
            }

          
            if (!validateCVC(cvc)) {
                errorMessages.push("CVC يجب أن يتكون من 3 أرقام.");
                isValid = false;
            }
        } else {
            if (!applePayButton.checked) {
                errorMessages.push("يجب اختيار طريقة الدفع.");
                isValid = false;
            }
        }

        const termsCheckbox = document.getElementById('termsCheckbox');
        if (!termsCheckbox.checked) {
            errorMessages.push("يجب قراءة الشروط والأحكام والموافقة عليها.");
            isValid = false;
        }

        // Handle errors or success
        if (!isValid) {
            const errorModalBody = document.getElementById('errorModalBody');
            errorModalBody.innerHTML = errorMessages.join('<br>');
            const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            errorModal.show(); 
        } else {
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show(); 

           
        }
    });
});






