let jam = 12;
let energi = 100;
let gerbang = false;

let ancaman = null;
let timer = 0;
let lingkunganDicek = false;

const BATAS_WAKTU = 5;

// ===== KONTROL =====
function tutupPintu() {
    gerbang = true;
}

function bukaPintu() {
    gerbang = false;
}

function ceking() {
    if (ancaman === "Petugas Lingkungan") {
        lingkunganDicek = true;
        document.getElementById("warning").innerText =
            "Lingkungan sudah dicek dan aman!";
    }
}

// ===== SPAWN =====
function spawn(nama) {
    ancaman = nama;
    timer = BATAS_WAKTU;
    lingkunganDicek = false;

    let pesan = "⚠️ " + nama + " terdeteksi di area sekolah!";
    if (nama === "Petugas Lingkungan") {
        pesan += " Lakukan CEKING!";
    }

    document.getElementById("warning").innerText = pesan;
}

function clearState() {
    ancaman = null;
    timer = 0;
    lingkunganDicek = false;
    document.getElementById("warning").innerText = "";
    document.getElementById("timer").innerText = "";
}

// ===== GAME LOOP =====
function gameLoop() {
    energi -= gerbang ? 2 : 1;

    // Spawn ancaman (satu saja)
    if (!ancaman) {
        let r = Math.random();
        if (r < 0.07) spawn("Siswa Nakal");
        else if (r < 0.12) spawn("Perusak Tanaman");
        else if (r < 0.17) spawn("Petugas Kebersihan");
        else if (r < 0.22) spawn("Petugas Lingkungan");
    }

    // Timer
    if (ancaman) {
        timer--;
        document.getElementById("timer").innerText =
            "Waktu tersisa: " + timer + " detik";
    }

    // GAME OVER LOGIC
    if (ancaman && timer <= 0) {
        if (ancaman === "Siswa Nakal" && !gerbang)
            alert("SISWA NAKAL MASUK SEKOLAH!");
        else if (ancaman === "Perusak Tanaman" && !gerbang)
            alert("TAMAN SEKOLAH DIRUSAK!");
        else if (ancaman === "Petugas Kebersihan" && gerbang)
            alert("PETUGAS TERKUNCI DI LUAR!");
        else if (ancaman === "Petugas Lingkungan" && !lingkunganDicek)
            alert("LINGKUNGAN TIDAK DIAWASI!");
        else {
            clearState();
            return;
        }
        location.reload();
    }

    // Ancaman pergi
    if (ancaman) {
        let pergi = false;

        if (
            (ancaman === "Siswa Nakal" || ancaman === "Perusak Tanaman")
            && gerbang
        ) pergi = Math.random() < 0.4;

        if (ancaman === "Petugas Kebersihan" && !gerbang)
            pergi = Math.random() < 0.4;

        if (ancaman === "Petugas Lingkungan" && lingkunganDicek)
            pergi = true;

        if (pergi) clearState();
    }

    if (energi <= 0) {
        alert("ENERGI PENJAGA HABIS!");
        location.reload();
    }

    document.getElementById("energi").innerText = energi;
}

// ===== WAKTU =====
function waktuJalan() {
    jam++;
    document.getElementById("jam").innerText = jam;

    if (jam === 6) {
        alert("SEKOLAH ADIWIYATA BERHASIL DIJAGA SAMPAI PAGI!");
        location.reload();
    }
}

setInterval(gameLoop, 1000);
setInterval(waktuJalan, 10000);
