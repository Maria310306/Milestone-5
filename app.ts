// Declare the global variable for html2pdf to avoid TypeScript errors
declare var html2pdf: any;

function generateResume() {
  // Get form values
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLTextAreaElement).value;
  const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
  const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

  // Create resume preview
  const resumePreview = `
    <h1>${name}</h1>
    <p><strong>Email:</strong> ${email}</p>
    <h2>Education</h2>
    <p>${education}</p>
    <h2>Work Experience</h2>
    <p>${experience}</p>
    <h2>Skills</h2>
    <p>${skills}</p>
  `;

  // Display resume preview and hide form
  document.getElementById('resume-preview')!.innerHTML = resumePreview;
  document.getElementById('resume-form')!.style.display = 'none';
  document.getElementById('resume-container')!.style.display = 'block';

  // Generate a unique URL using the user's name
  const uniqueUrl = generateUniqueUrl(name);
  document.getElementById('unique-url')!.innerText = uniqueUrl;
}

function editResume() {
  // Show form and hide resume preview
  document.getElementById('resume-form')!.style.display = 'block';
  document.getElementById('resume-container')!.style.display = 'none';
}

function generateUniqueUrl(userName: string): string {
  const baseUrl = window.location.href.split('?')[0];
  const slug = userName.trim().toLowerCase().replace(/\s+/g, '-');
  const uniqueUrl = `${baseUrl}?user=${encodeURIComponent(slug)}`;
  return uniqueUrl;
}

// Function to download resume as a PDF
function downloadResume() {
  const element = document.getElementById('resume-preview');
  if (element) {
    const options = {
      margin: 0.5,
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  }
}

function shareResume() {
    const uniqueUrl = window.location.href; // Assuming unique URL is the current page URL
  
    // Check if the browser supports the Web Share API
    if (navigator.share) {
      navigator.share({
        title: 'My Resume',
        text: 'Check out my resume!',
        url: uniqueUrl
      })
      .then(() => {
        console.log("Resume shared successfully");
      })
      .catch((error) => {
        console.log("Error sharing resume:", error);
        alert('Sharing failed or not supported. URL copied to clipboard.');
        copyToClipboard(uniqueUrl); // Fallback: copy URL to clipboard
      });
    } else {
      // Fallback: Copy the URL to the clipboard if share is not supported
      copyToClipboard(uniqueUrl);
      alert('Sharing not supported on this device. URL copied to clipboard.');
    }
  }
  
  function copyToClipboard(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  
