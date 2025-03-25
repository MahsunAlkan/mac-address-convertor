document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("convertBtn").addEventListener("click", convertMac);
    document.getElementById("clearBtn").addEventListener("click", clearFields);

    let macInput = document.getElementById("macInput");

    // Kullanıcı her karakter girdiğinde kontrol et
    macInput.addEventListener("input", function() {
        const pure = macInput.value.replace(/[^0-9A-Fa-f]/g, "").toUpperCase();
        if (pure.length === 12) {
            convertMac(); // 12 karakter tamamlanınca dönüşüm yap
        }
    });

    // Enter tuşuna basıldığında da dönüşüm yap
    macInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            convertMac();
        }
    });

    document.getElementById("output").addEventListener("click", function(event) {
        if (event.target.classList.contains("copy-btn")) {
            copyToClipboard(event.target.getAttribute("data-mac"));
        }
    });
});



function showToast(message) {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toastContainer.removeChild(toast);
    }, 3000);
}
function convertMac() {
    const input = document.getElementById("macInput").value.trim();
    
    // Maksimum 25 karakter kontrolü
    if (input.length > 25) {
        showToast("⚠️ MAC adresi en fazla 25 karakter olmalıdır!");
        return;
    }

	// MAC adresi sadece hex karakterleri, ayırıcılar (:, -, .) ve boşluk içerebilir
	const validChars = /^[0-9A-Fa-f:\-.\s]+$/;
	if (!validChars.test(input)) {
		showToast("⚠️ Geçerli bir MAC adresi girin!");
		return;
	}


    const pure = input.replace(/[^0-9A-Fa-f]/g, "").toUpperCase();
    if (pure.length !== 12) {
        showToast("⚠️ Geçerli bir MAC adresi girin!");
        return;
    }

    const macFormatted = pure.match(/.{1,2}/g).join("-");
    const macPlain = pure.toLowerCase();
    const macHuawei = macPlain.match(/.{1,4}/g).join("-");
    const macStandard = pure.match(/.{1,2}/g).join(":");

    // Panoya ilk formatı kopyala
    navigator.clipboard.writeText(macFormatted).then(() => {
        showToast("Panoya kopyalandı");
    }).catch(err => console.error("Kopyalama hatası", err));

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `
        <p></br>
            <span>${macFormatted}</span>
            <button class="copy-btn" data-mac="${macFormatted}">Kopyala</button>
        </p>
        <p></br>
            <span>${macPlain}</span>
            <button class="copy-btn" data-mac="${macPlain}">Kopyala</button>
        </p>
        <p></br>
            <span>${macHuawei}</span>
            <button class="copy-btn" data-mac="${macHuawei}">Kopyala</button>
        </p>
        <p></br>
            <span>${macStandard}</span>
            <button class="copy-btn" data-mac="${macStandard}">Kopyala</button>
        </p>
    `;
}


function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Panoya kopyalandı");
    }).catch(err => console.error("Kopyalama hatası", err));
}

function clearFields() {
    document.getElementById("macInput").value = "";
    document.getElementById("output").innerHTML = "";
	location.reload();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("macInput").focus();
});

