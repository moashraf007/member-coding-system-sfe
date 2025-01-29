function validateBirthYear(input) {
    let value = input.value.replace(/\D/g, ''); // السماح فقط بالأرقام
    if (value.length > 4) {
        value = value.slice(0, 4); // تقييد الإدخال إلى 4 أرقام فقط
    }
    input.value = value;
}

function generateMembership() {
    const name = document.getElementById("name").value.trim();
    const college = document.getElementById("college").value;
    const birthYear = document.getElementById("birthYear").value.trim();
    const regNumber = document.getElementById("regNumber").value.trim();
    const gender = document.getElementById("gender").value;

    // التحقق من أن جميع الحقول قد تم ملؤها
    if (!name || !college || !birthYear || !regNumber || !gender) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    // التحقق من أن سنة الميلاد تتكون من 4 أرقام فقط
    if (!/^\d{4}$/.test(birthYear)) {
        alert("يجب أن تتكون سنة الميلاد من 4 أرقام فقط");
        return;
    }

    // توليد كود العضوية باستخدام الترتيب الجديد (النوع، الكلية، رقم التسجيل، سنة الميلاد)
    const membershipCode = `${gender}${college}${regNumber}${birthYear}`;

    // عرض كود العضوية في الصفحة
    document.getElementById("membershipCode").textContent = `كود العضوية: ${membershipCode}`;
    document.getElementById("output").style.display = "block";

    // إزالة رمز QR السابق إذا كان موجودًا
    document.getElementById("qrCode").innerHTML = "";

    // التأكد من وجود العنصر قبل إنشاء رمز QR جديد
    const qrContainer = document.getElementById("qrCode");

    // توليد رمز QR مع كود العضوية فقط
    new QRCode(qrContainer, {
        text: membershipCode, // كود العضوية فقط
        width: 128,
        height: 128
    });
}

function copyCode() {
    const membershipCode = document.getElementById("membershipCode").textContent.split(": ")[1];
    navigator.clipboard.writeText(membershipCode).then(() => {
        alert("تم نسخ الكود");
    });
}