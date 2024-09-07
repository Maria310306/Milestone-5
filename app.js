function generateResume() {
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Create resume preview
    var resumePreview = "\n    <h1>".concat(name, "</h1>\n    <p><strong>Email:</strong> ").concat(email, "</p>\n    <h2>Education</h2>\n    <p>").concat(education, "</p>\n    <h2>Work Experience</h2>\n    <p>").concat(experience, "</p>\n    <h2>Skills</h2>\n    <p>").concat(skills, "</p>\n  ");
    // Display resume preview and hide form
    document.getElementById('resume-preview').innerHTML = resumePreview;
    document.getElementById('resume-form').style.display = 'none';
    document.getElementById('resume-container').style.display = 'block';
    // Generate a unique URL using the user's name
    var uniqueUrl = generateUniqueUrl(name);
    document.getElementById('unique-url').innerText = uniqueUrl;
}
function editResume() {
    // Show form and hide resume preview
    document.getElementById('resume-form').style.display = 'block';
    document.getElementById('resume-container').style.display = 'none';
}
function generateUniqueUrl(userName) {
    var baseUrl = window.location.href.split('?')[0];
    var slug = userName.trim().toLowerCase().replace(/\s+/g, '-');
    var uniqueUrl = "".concat(baseUrl, "?user=").concat(encodeURIComponent(slug));
    return uniqueUrl;
}
// Function to download resume as a PDF
function downloadResume() {
    var element = document.getElementById('resume-preview');
    if (element) {
        var options = {
            margin: 0.5,
            filename: 'Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    }
}
