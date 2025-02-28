document.getElementById("cvForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah submit default

  if (this.checkValidity()) {
    generatePDF(); // Hanya jalankan jika valid
  } else {
    this.reportValidity(); // Tampilkan pesan validasi
  }
});
// Fungsi untuk menambahkan pengalaman kerja baru
function addWorkExperience() {
  const container = document.getElementById("work-experience-container");
  const entry = document.createElement("div");
  entry.className = "entry work-experience-entry";
  entry.innerHTML = `
  <div class="border bg-body-secondary bg-opacity-10 p-3 mt-3 rounded">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="mb-3">
              <label class="form-label">Nama Perusahaan:</label>
              <input class="form-control" type="text" name="company" placeholder="Nama Perusahaan" />
            </div>
            <div class="mb-3">
              <label class="form-label">Jabatan:</label>
              <input class="form-control" type="text" name="jobTitle" placeholder="Jabatan" />
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="mb-3">
              <label class="form-label">Bulan & Tahun Mulai:</label>
              <input class="form-control" type="month" name="startDate" />
            </div>

            <div class="mb-3">
              <label class="form-label">Bulan & Tahun Selesai:</label>
              <input class="form-control end-date" type="month" name="endDate" />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Deskripsi Kerjaan:</label><br />
          <textarea class="form-control" name="jobDescription" rows="3" placeholder="Deskripsi Kerjaan"></textarea>
        </div>

        <div class="mb-3 form-check form-switch">
          <input class="form-check-input still-working-checkbox" type="checkbox" name="stillWorkingHere" />
          <label class="form-check-label">Masih bekerja di sini</label>
        </div>

        <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">Hapus Work Experience</button>
      </div>
  `;

  container.appendChild(entry);

  // Tambahkan event listener ke checkbox baru
  const checkBox = entry.querySelector(".still-working-checkbox");
  const endDateInput = entry.querySelector(".end-date");

  checkBox.addEventListener("change", function () {
    if (this.checked) {
      endDateInput.value = "Sekarang";
      endDateInput.disabled = true;
    } else {
      endDateInput.value = "";
      endDateInput.disabled = false;
    }
  });
}

// Fungsi untuk menghapus pengalaman kerja tertentu
function removeWorkExperience(button) {
  button.closest(".work-experience-entry").remove();
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("change", function (event) {
    if (event.target.classList.contains("still-working-checkbox")) {
      let endDateInput = event.target
        .closest(".work-experience-entry")
        .querySelector(".end-date");

      if (event.target.checked) {
        endDateInput.value = ""; // Kosongkan nilai, bukan "Sekarang"
        endDateInput.disabled = true; // Nonaktifkan input
      } else {
        endDateInput.disabled = false; // Aktifkan kembali input
      }
    }
  });
});

// Fungsi menambahkan Education entry
function addEducation() {
  const container = document.getElementById("education-container");
  const entry = document.createElement("div");
  entry.className = "entry education-entry";
  entry.innerHTML = `
    <div class="border bg-body-secondary bg-opacity-10 p-3 mt-3 rounded">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <div class="mb-3">
            <label class="form-label">Nama Instansi Pendidikan:</label>
            <input class="form-control" type="text" name="institution" placeholder="Nama Instansi" />
          </div>
          <div class="mb-3">
            <label class="form-label">Jurusan:</label>
            <input class="form-control" type="text" name="major" placeholder="Jurusan" />
          </div>
          <div class="mb-3">
            <label class="form-label">Degree:</label>
            <input class="form-control" type="text" name="degree" placeholder="Degree" />
          </div>
        </div>
        <div class="col-sm-12 col-md-6">
          <div class="mb-3">
            <label class="form-label">GPA Score:</label>
            <input class="form-control" type="number" name="gpa" placeholder="GPA" step="0.01" min="0" max="4" />
          </div>
          <div class="mb-3">
            <label class="form-label">Bulan & Tahun Mulai:</label>
            <input class="form-control" type="month" name="startDate" />
          </div>
          <div class="mb-3">
            <label class="form-label">Bulan & Tahun Selesai:</label>
            <input class="form-control end-date" type="month" name="endDate" />
          </div>
        </div>
      </div>
      <div class="mb-3 form-check form-switch">
        <input class="form-check-input still-studying-checkbox" type="checkbox" name="stillStudying" role="switch" />
        <label class="form-check-label">Masih Bersekolah</label>
      </div>
      <button class="btn btn-danger" type="button" onclick="this.parentElement.remove()">Hapus Education</button>
    </div>
  `;
  container.appendChild(entry);
}

// Event listener untuk checkbox "Masih Bersekolah"
document.addEventListener("change", function (event) {
  if (event.target.classList.contains("still-studying-checkbox")) {
    let endDateInput = event.target
      .closest(".education-entry")
      .querySelector(".end-date");

    if (event.target.checked) {
      endDateInput.value = ""; // Kosongkan nilai, bukan "Sekarang"
      endDateInput.disabled = true; // Nonaktifkan input
    } else {
      endDateInput.disabled = false; // Aktifkan kembali input
    }
  }
});

// Fungsi untuk mendapatkan data Education
function getEducationData() {
  let educationList = [];
  let educationEntries = document.querySelectorAll(".education-entry");

  educationEntries.forEach((entry) => {
    let institution =
      entry.querySelector("input[name='institution']")?.value || "";
    let major = entry.querySelector("input[name='major']")?.value || "";
    let degree = entry.querySelector("input[name='degree']")?.value || "";
    let gpa = entry.querySelector("input[name='gpa']")?.value || "";
    let startDate = entry.querySelector("input[name='startDate']")?.value || "";
    let endDateInput = entry.querySelector("input[name='endDate']");
    let stillStudying = entry.querySelector(
      "input[name='stillStudying']"
    ).checked;

    let endDate = stillStudying ? "Sekarang" : endDateInput?.value || ""; // Atur ke "Sekarang" jika dicentang

    if (institution || major || degree || gpa || startDate || endDate) {
      educationList.push({
        institution,
        major,
        degree,
        gpa,
        educationDate: `${startDate} - ${endDate}`,
      });
    }
  });

  return educationList;
}

// Fungsi menambahkan Achievement entry
function addAchievement() {
  const container = document.getElementById("achievement-container");
  const entry = document.createElement("div");
  entry.className = "entry achievement-entry";
  entry.innerHTML = `
    <div class="border bg-body-secondary bg-opacity-10 p-3 mt-3 rounded">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="mb-3">
              <label class="form-label">Nama Achievement:</label>
              <input class="form-control" type="text" name="achievementName" placeholder="Nama Achievement">
              </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div class="mb-3">
              <label class="form-label">Tahun Perolehan:</label>
              <input class="form-control" type="number" name="achievementYear" placeholder="Tahun" min="1900" max="2100">
              </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div class="mb-3">
              <label class="form-label">Penyelenggara:</label>
              <input class="form-control" type="text" name="achievementOrganizer" placeholder="Nama Penyelenggara">
              </div>
          </div>
        </div>
        <button class="btn btn-danger" type="button" onclick="this.parentElement.remove()">Hapus Achievement</button>
      </div>
  `;
  container.appendChild(entry);
}

// Fungsi menambahkan Certificate entry
function addCertificate() {
  const container = document.getElementById("certificate-container");
  const entry = document.createElement("div");
  entry.className = "entry certificate-entry";
  entry.innerHTML = `
    <div class="border bg-body-secondary bg-opacity-10 p-3 mt-3 rounded">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="mb-3">
              <label class="form-label">Nama Sertifikat:</label>
              <input
                class="form-control"
                type="text"
                name="certificateName"
                placeholder="Nama Sertifikat"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Tahun Perolehan:</label>
              <input
                class="form-control"
                type="number"
                name="certificateYear"
                placeholder="Tahun"
                min="1900"
                max="2100"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="mb-3">
              <label class="form-label">Nomor Sertifikat:</label>
              <input
                class="form-control"
                type="text"
                name="certificateNumber"
                placeholder="Nomor Sertifikat"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Instansi:</label>
              <input
                class="form-control"
                type="text"
                name="certificateIssuer"
                placeholder="Instansi Penerbit"
              />
            </div>
          </div>
        </div>

        <button class="btn btn-danger" type="button" onclick="this.parentElement.remove()">
          Hapus Certificate
        </button>
      </div>
  `;
  container.appendChild(entry);
}

// Ambil data Work Experience
function getWorkExperiences() {
  let workExpList = [];
  let workExpEntries = document.querySelectorAll(".work-experience-entry");

  workExpEntries.forEach((entry) => {
    let company = entry.querySelector("input[name='company']")?.value || "";
    let jobTitle = entry.querySelector("input[name='jobTitle']")?.value || "";
    let startDate = entry.querySelector("input[name='startDate']")?.value || "";
    let endDateInput = entry.querySelector("input[name='endDate']");
    let stillWorkingHere = entry.querySelector(
      "input[name='stillWorkingHere']"
    ).checked;

    let endDate = stillWorkingHere ? "Sekarang" : endDateInput?.value || ""; // Atur ke "Sekarang" jika dicentang

    let jobDescription =
      entry.querySelector("textarea[name='jobDescription']")?.value || "";

    if (company || jobTitle || startDate || endDate || jobDescription) {
      workExpList.push({
        company,
        jobTitle,
        jobDate: `${startDate} - ${endDate}`,
        jobDescription,
      });
    }
  });

  return workExpList;
}

// Fungsi untuk mengenerate PDF dari data form
function generatePDF() {
  console.log("Fungsi generatePDF() dipanggil.");
  var { jsPDF } = window.jspdf;
  let doc = new jsPDF();
  let y = 20;

  // Fungsi untuk menambahkan section ke PDF
  function addSection(title, content, isList = false) {
    if (content.trim() !== "") {
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      if (isList) {
        let items = content.split("\n");
        items.forEach((item) => {
          doc.text("• " + item, 12, y);
          y += 6;
        });
      } else {
        let lines = doc.splitTextToSize(content, 180);
        doc.text(lines, 10, y);
        y += lines.length * 6;
      }
      doc.line(10, y, 200, y);
      y += 10;
    }
  }

  // Ambil data personal
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var linkedin = document.getElementById("linkedin").value || "-";
  var location = document.getElementById("location").value || "-";
  var summary = document.getElementById("summary").value;
  var hardSkills = document.getElementById("hardSkills").value;
  var softSkills = document.getElementById("softSkills").value;
  var languages = document.getElementById("languages").value;

  // Ambil data Work Experience
  let workExpList = getWorkExperiences();

  // Ambil data Education
  let educationList = getEducationData();

  // Ambil data Achievement
  let achievementText = "";
  let achievementList = [];
  let achievementEntries = document.querySelectorAll(".achievement-entry");

  achievementEntries.forEach((entry, index) => {
    let achievementName =
      entry.querySelector("input[name='achievementName']")?.value || "";
    let achievementYear =
      entry.querySelector("input[name='achievementYear']")?.value || "";
    let achievementOrganizer =
      entry.querySelector("input[name='achievementOrganizer']")?.value || "";
    if (achievementName || achievementYear) {
      achievementList.push({
        achievement: `${achievementName}, ${achievementOrganizer}, ${achievementYear}`,
      });
    }
  });

  // Ambil data Certificate
  let certificateText = "";
  let certificateList = [];
  let certificateEntries = document.querySelectorAll(".certificate-entry");

  certificateEntries.forEach((entry, index) => {
    let certificateName =
      entry.querySelector("input[name='certificateName']")?.value || "";
    let certificateYear =
      entry.querySelector("input[name='certificateYear']")?.value || "";
    let certificateNumber =
      entry.querySelector("input[name='certificateNumber']")?.value || "";
    let certificateIssuer =
      entry.querySelector("input[name='certificateIssuer']")?.value || "";

    if (
      certificateName ||
      certificateYear ||
      certificateNumber ||
      certificateIssuer
    ) {
      certificateList.push({
        certificate: `${certificateName}, ${certificateIssuer}, ${certificateYear}, ${certificateNumber}`,
      });
    }
  });

  // Header - Nama & Kontak (ditengah)
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(name, doc.internal.pageSize.width / 2, y, { align: "center" });
  y += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  let contactInfo = `${email} | ${phone} | ${linkedin} | ${location}`;
  let contactLines = doc.splitTextToSize(contactInfo, 180);
  doc.text(contactLines, doc.internal.pageSize.width / 2, y, {
    align: "center",
  });
  y += contactLines.length * 6;
  doc.line(10, y, 200, y);
  y += 10;

  // Tampilkan bagian "Summary"
  doc.setFont("helvetica", "normal");

  let marginX = 10; // Margin kiri
  let maxWidth = 180; // Lebar teks agar tidak keluar dari halaman (A4 = 210mm, dengan margin)
  let wrappedText = doc.splitTextToSize(summary, maxWidth);

  doc.text(wrappedText, marginX, y, { align: "justify", maxWidth: "190" });
  y += wrappedText.length * 5; // Sesuaikan tinggi Y berdasarkan jumlah baris
  // Tampilkan bagian "Work Experience"
  doc.setFont("helvetica", "bold");
  doc.text("PENGALAMAN KERJA", 10, y);
  y += 3;
  doc.line(10, y, 200, y);
  y += 5;
  workExpList.forEach((item, index) => {
    // Tampilkan Nama Perusahaan (Tebal) di kiri
    doc.setFont("helvetica", "bold");
    doc.text(item.company, 10, y);
    y += 5;
    //Tampilkan Jabatan (Normal) di kiri
    doc.setFont("helvetica", "italic");
    doc.text(item.jobTitle, 10, y);

    // Tampilkan Periode (Miring) di kanan
    doc.setFont("helvetica", "normal");
    let textWidth = doc.getTextWidth(item.jobDate);
    const pageWidth = doc.internal.pageSize.width;
    doc.text(item.jobDate, pageWidth - textWidth - 10, y);

    // Tampilkan Deskripsi (Normal) di bawahnya
    y += 6;
    doc.setFont("helvetica", "normal");
    let splitDesc = doc.splitTextToSize(`${item.jobDescription}`, 180);
    doc.text(splitDesc, 10, y);

    // Tambahkan jarak antar entri
    y += splitDesc.length * 6;
  });

  // Tampilkan bagian "Education"
  doc.setFont("helvetica", "bold");
  doc.text("RIAWAYAT PENDIDIKAN", 10, y);
  y += 3;
  doc.line(10, y, 200, y);
  y += 5;
  educationList.forEach((item, index) => {
    doc.setFont("helvetica", "bold");
    doc.text(item.institution, 10, y);

    // Tampilkan Periode (Miring) di kanan
    doc.setFont("helvetica", "italic");
    let textWidth = doc.getTextWidth(item.educationDate);
    const pageWidth = doc.internal.pageSize.width;
    doc.text(item.educationDate, pageWidth - textWidth - 10, y);

    // Tampilkan Deskripsi (Normal) di bawahnya
    y += 5;
    doc.setFont("helvetica", "normal");
    let majorDegree = `${item.degree}, ${item.major}`;
    doc.text(majorDegree, 10, y);
    y += 4;
    doc.text(item.gpa, 10, y);

    // Tambahkan jarak antar entri
    y += 10;
  });
  addSection("Hard Skills", hardSkills);
  addSection("Soft Skills", softSkills);
  addSection("Languages", languages);
  addSection("Achievement", achievementText, true);
  //Tampilkan Achievement
  if (achievementList.length != 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Achievement", 10, y);
    y += 3;
    doc.line(10, y, 200, y);
    y += 5;
  }
  achievementList.forEach((item, index) => {
    doc.setFont("helvetica", "normal");
    doc.text("• " + item.achievement, 10, y);
    y += 5;
  });

  // Tampilkan bagian "Certificate"
  if (certificateList.length != 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Certificate", 10, y);
    y += 3;
    doc.line(10, y, 200, y);
    y += 5;
  }
  certificateList.forEach((item, index) => {
    doc.setFont("helvetica", "normal");
    doc.text("• " + item.certificate, 10, y);
    y += 5;
  });

  // Log data URI PDF di console
  let pdfDataUri = doc.output("datauristring");
  console.log("Hasil PDF dalam data URI:", pdfDataUri);

  // Simpan PDF
  // doc.save("Hasil_Generate.pdf");
  // console.log("PDF berhasil dibuat dan diunduh.");
}
