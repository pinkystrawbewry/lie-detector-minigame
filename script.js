let evidence = [];
let currentStep = 0;

const steps = [
  {
    text: "Kamu menemukan catatan perpustakaan dengan nama Reza sebagai peminjam terakhir sebelum buku rusak.",
    options: [{ label: "Catatan perpustakaan (Reza)", suspect: "Reza" }]
  },
  {
    text: "Ada jejak sepatu ukuran besar di sekitar rak buku rusak, cocok dengan sepatu Nino.",
    options: [{ label: "Jejak sepatu besar (Nino)", suspect: "Nino" }]
  },
  {
    text: "Di lab Alya, ditemukan potongan buku dan lem perekat.",
    options: [{ label: "Potongan buku & lem (Alya)", suspect: "Alya" }]
  },
  {
    text: "Kamu mewawancarai satpam: dia melihat Nino keluar dari perpustakaan dengan tergesa-gesa.",
    options: [{ label: "Kesaksian satpam (Nino)", suspect: "Nino" }]
  },
  {
    text: "Kamu cek CCTV: Alya masuk lab sebelum kejadian dan tidak keluar hingga 2 jam setelahnya.",
    options: [{ label: "Alibi kuat Alya", suspect: "Alya" }]
  },
  {
    text: "Kamu temukan sidik jari Reza di sampul buku yang rusak.",
    options: [{ label: "Sidik jari Reza", suspect: "Reza" }]
  },
  {
    text: "Saatnya menentukan siapa pelakunya berdasarkan bukti yang kamu kumpulkan.",
    options: []
  }
];

function renderStep() {
  const step = steps[currentStep];
  document.getElementById("gameText").textContent = step.text;
  const container = document.getElementById("choicesContainer");
  container.innerHTML = '';

  step.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.onclick = () => {
      evidence.push(opt);
      updateEvidence();
      nextStep();
    };
    container.appendChild(btn);
  });

  if (currentStep === steps.length - 1) {
    document.getElementById("gameBox").style.display = "none";
    document.getElementById("accuseBox").style.display = "block";
  }
}

function updateEvidence() {
  const list = evidence.map(e => e.label).join(", ");
  document.getElementById("evidenceList").textContent = "Bukti terkumpul: " + list;
}

function nextStep() {
  currentStep++;
  if (currentStep < steps.length) {
    renderStep();
  }
}

function accuse(name) {
  const title = document.getElementById("resultTitle");
  const message = document.getElementById("resultMessage");
  const resultBox = document.getElementById("resultBox");

  const count = evidence.filter(e => e.suspect === name).length;

  document.getElementById("accuseBox").style.display = "none";
  resultBox.style.display = "block";

  if (name === "Reza" && count >= 2) {
    title.textContent = "Tepat Sasaran!";
    message.textContent = "Reza adalah pelaku! Kamu berhasil mengumpulkan cukup bukti: catatan perpustakaan dan sidik jari.";
  } else if (count >= 2) {
    title.textContent = "Hmm... hampir saja!";
    message.textContent = `${name} mencurigakan, tapi bukti utama mengarah ke orang lain.`;
  } else {
    title.textContent = "Tuduhan Gagal.";
    message.textContent = `Tuduhanmu pada ${name} terlalu lemah. Bukti tidak cukup.`;
  }
}

function restartGame() {
  currentStep = 0;
  evidence = [];
  updateEvidence();
  document.getElementById("gameBox").style.display = "block";
  document.getElementById("accuseBox").style.display = "none";
  document.getElementById("resultBox").style.display = "none";
  renderStep();
}

renderStep();
