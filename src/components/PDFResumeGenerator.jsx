import { useState } from 'react';
import { ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from './Button';

const PDFResumeGenerator = ({ portfolioData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Get the primary color from branding, fallback to default
  const primaryColor = portfolioData?.branding?.primaryColor || '#6589a4';

  const generatePDF = async () => {
    console.log('PDF Generation started...');
    console.log('Tiezel Data:', portfolioData);
    setIsGenerating(true);
    
    try {
      // Create a temporary div to render the resume content
      const resumeDiv = document.createElement('div');
      resumeDiv.style.position = 'absolute';
      resumeDiv.style.left = '-9999px';
      resumeDiv.style.top = '0';
      resumeDiv.style.width = '210mm'; // A4 width
      resumeDiv.style.backgroundColor = 'white';
      resumeDiv.style.padding = '20mm';
      resumeDiv.style.fontFamily = 'Arial, sans-serif';
      resumeDiv.style.fontSize = '12px';
      resumeDiv.style.lineHeight = '1.4';
      resumeDiv.style.color = '#333';
      
      // Generate HTML content for the resume
      resumeDiv.innerHTML = generateResumeHTML(portfolioData, primaryColor);
      
      // Add to document
      document.body.appendChild(resumeDiv);
      
      // Convert to canvas
      const canvas = await html2canvas(resumeDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      // Remove temporary div
      document.body.removeChild(resumeDiv);
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Save the PDF
      const fileName = `${portfolioData.personal_info?.name?.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
      console.log('Saving PDF with filename:', fileName);
      
      // Try to save the PDF
      try {
        pdf.save(fileName);
        console.log('PDF saved successfully!');
      } catch (saveError) {
        console.error('Error saving PDF:', saveError);
        // Fallback: try to open in new window
        const pdfBlob = pdf.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
        console.log('PDF saved via fallback method!');
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateResumeHTML = (data, primaryColor) => {
    // Ensure we have data to work with
    if (!data) {
      console.warn('No portfolio data provided, using default data');
      data = {
        personal_info: { name: 'Your Name', title: 'Professional Title' },
        projects: [],
        experience: [],
        skills: [],
        testimonials: []
      };
    }
    
    const personalInfo = data.personal_info || {};
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skills = data.skills || [];
    const testimonials = data.testimonials || [];
    
    // Get profile image URL
    const profileImage = personalInfo.profile_image || personalInfo.avatar || personalInfo.image;
    
    return `
      <div style="max-width: 100%; margin: 0 auto; font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.5; color: #000000; background: #ffffff; display: flex; min-height: 100vh;">
        
        <!-- Left Sidebar - Light Gray Background -->
        <div style="width: 35%; background: #f5f5f5; padding: 40px 30px; position: relative;">
          
          <!-- Profile Image -->
          <div style="text-align: center; margin-bottom: 40px;">
            ${profileImage ? `
              <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; margin: 0 auto; border: 3px solid #333; background: #333;">
                <img src="${profileImage}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            ` : `
              <div style="width: 150px; height: 150px; border-radius: 50%; margin: 0 auto; border: 3px solid #333; background: #333; display: flex; align-items: center; justify-content: center; color: white; font-size: 60px; font-weight: bold;">
                ${(personalInfo.name || 'Y').charAt(0).toUpperCase()}
              </div>
            `}
          </div>

          <!-- Contact Information -->
          <div style="margin-bottom: 40px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Contact</h3>
            <div style="color: #333; font-size: 14px; line-height: 1.8;">
              ${personalInfo.phone ? `
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="width: 20px; height: 20px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">📞</span>
                  <span>${personalInfo.phone}</span>
                </div>
              ` : ''}
              ${personalInfo.email ? `
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="width: 20px; height: 20px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">✉️</span>
                  <span>${personalInfo.email}</span>
                </div>
              ` : ''}
              ${personalInfo.website ? `
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="width: 20px; height: 20px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">🌐</span>
                  <span>${personalInfo.website}</span>
                </div>
              ` : ''}
              ${personalInfo.location ? `
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="width: 20px; height: 20px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">📍</span>
                  <span>${personalInfo.location}</span>
                </div>
              ` : ''}
              ${personalInfo.linkedin ? `
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="width: 20px; height: 20px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">🔗</span>
                  <span>${personalInfo.linkedin}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Education -->
          ${personalInfo.education ? `
            <div style="margin-bottom: 40px;">
              <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Education</h3>
              <div style="color: #333; font-size: 14px; line-height: 1.6;">
                <p style="margin: 0; font-weight: 600;">${personalInfo.education}</p>
                ${personalInfo.experience ? `<p style="margin: 8px 0 0 0; color: #666; font-size: 13px;">${personalInfo.experience} of experience</p>` : ''}
              </div>
            </div>
          ` : ''}

          <!-- Skills -->
          ${skills.length > 0 ? `
            <div style="margin-bottom: 40px;">
              <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Expertise</h3>
              <div style="color: #333; font-size: 14px; line-height: 1.8;">
                ${skills.map(skill => {
                  if (typeof skill === 'string') {
                    return `<div style="margin-bottom: 8px;">• ${skill}</div>`;
                  } else if (skill.skills && Array.isArray(skill.skills)) {
                    return skill.skills.map(s => `<div style="margin-bottom: 8px;">• ${s}</div>`).join('');
                  } else {
                    return `<div style="margin-bottom: 8px;">• ${skill.name || skill.title || skill}</div>`;
                  }
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Languages (if available) -->
          ${personalInfo.languages ? `
            <div style="margin-bottom: 40px;">
              <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Languages</h3>
              <div style="color: #333; font-size: 14px; line-height: 1.8;">
                ${personalInfo.languages.split(',').map(lang => `<div style="margin-bottom: 8px;">• ${lang.trim()}</div>`).join('')}
              </div>
            </div>
          ` : ''}

        </div>

        <!-- Right Main Content - White Background -->
        <div style="width: 65%; background: #ffffff; padding: 40px 30px;">
          
          <!-- Name and Title Header -->
          <div style="margin-bottom: 40px;">
            <h1 style="font-size: 32px; font-weight: bold; color: #000; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 2px;">${personalInfo.name || 'Your Name'}</h1>
            <h2 style="font-size: 18px; font-weight: normal; color: #333; margin: 0; font-style: italic;">${personalInfo.title || 'Professional Title'}</h2>
          </div>

          <!-- Profile Section -->
          ${personalInfo.bio ? `
            <div style="margin-bottom: 40px;">
              <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center;">
                <span style="width: 20px; height: 20px; margin-right: 10px; display: flex; align-items: center; justify-content: center;">👤</span>
                Profile
              </h3>
              <p style="color: #333; font-size: 14px; line-height: 1.6; margin: 0;">${personalInfo.bio}</p>
            </div>
          ` : ''}

          <!-- Work Experience -->
          ${experience.length > 0 ? `
            <div style="margin-bottom: 40px;">
              <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center;">
                <span style="width: 20px; height: 20px; margin-right: 10px; display: flex; align-items: center; justify-content: center;">💼</span>
                Work Experience
              </h3>
              ${experience.map((exp, index) => `
                <div style="margin-bottom: 25px; ${index < experience.length - 1 ? 'border-bottom: 1px solid #eee; padding-bottom: 20px;' : ''}">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div>
                      <h4 style="font-size: 15px; font-weight: bold; color: #000; margin: 0 0 4px 0;">${exp.title || exp.position || 'Position'}</h4>
                      <p style="font-size: 14px; color: ${primaryColor}; margin: 0; font-weight: 600;">${exp.company || exp.organization || 'Company'}</p>
                    </div>
                    <span style="font-size: 12px; color: #666; font-weight: 500;">${exp.duration || exp.date || ''}</span>
                  </div>
                  ${exp.description ? `<p style="color: #333; font-size: 13px; line-height: 1.5; margin: 8px 0;">${exp.description}</p>` : ''}
                  ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                    <ul style="margin: 8px 0 0 0; padding-left: 0; list-style: none;">
                      ${exp.responsibilities.map(resp => `
                        <li style="color: #333; font-size: 13px; line-height: 1.5; margin-bottom: 4px; padding-left: 15px; position: relative;">
                          <span style="position: absolute; left: 0; top: 6px; width: 4px; height: 4px; background: #000; border-radius: 50%;"></span>
                          ${resp}
                        </li>
                      `).join('')}
                    </ul>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Projects -->
          ${projects.length > 0 ? `
            <div style="margin-bottom: 40px;">
              <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center;">
                <span style="width: 20px; height: 20px; margin-right: 10px; display: flex; align-items: center; justify-content: center;">🚀</span>
                Featured Projects
              </h3>
              ${projects.map(project => `
                <div style="margin-bottom: 20px; ${project !== projects[projects.length - 1] ? 'border-bottom: 1px solid #eee; padding-bottom: 15px;' : ''}">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                    <h4 style="font-size: 14px; font-weight: bold; color: #000; margin: 0;">${project.name || 'Project Name'}</h4>
                    ${project.status ? `<span style="font-size: 10px; background: #e8f5e8; color: #2d5a2d; padding: 2px 6px; border-radius: 3px; font-weight: 600; text-transform: uppercase;">${project.status}</span>` : ''}
                  </div>
                  ${project.category ? `<p style="font-size: 12px; color: #666; margin: 0 0 6px 0; font-weight: 500;">${project.category}</p>` : ''}
                  ${project.description ? `<p style="color: #333; font-size: 13px; line-height: 1.5; margin: 0 0 8px 0;">${project.description}</p>` : ''}
                  ${project.technologies ? `
                    <div style="margin: 8px 0;">
                      <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; color: #666; text-transform: uppercase;">Technologies:</p>
                      <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                        ${project.technologies.split(',').map(tech => 
                          `<span style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 10px; color: #555; font-weight: 500;">${tech.trim()}</span>`
                        ).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- References -->
          ${testimonials.length > 0 ? `
            <div style="margin-bottom: 40px;">
              <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center;">
                <span style="width: 20px; height: 20px; margin-right: 10px; display: flex; align-items: center; justify-content: center;">⭐</span>
                References
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${testimonials.slice(0, 2).map(testimonial => `
                  <div style="border: 1px solid #eee; padding: 15px; border-radius: 4px;">
                    <p style="color: #333; font-size: 12px; line-height: 1.5; margin: 0 0 10px 0; font-style: italic;">"${testimonial.content || testimonial.testimonial || ''}"</p>
                    <div style="border-top: 1px solid #eee; padding-top: 8px;">
                      <p style="margin: 0; font-size: 12px; font-weight: bold; color: #000;">${testimonial.name || 'Client'}</p>
                      ${testimonial.role ? `<p style="margin: 2px 0 0 0; font-size: 11px; color: #666;">${testimonial.role}</p>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

        </div>
      </div>
    `;
  };

  return (
    <Button
      onClick={() => {
        console.log('Button clicked!');
        console.log('Tiezel data available:', !!portfolioData);
        if (!portfolioData) {
          alert('No portfolio data available. Please check your content management settings.');
          return;
        }
        generatePDF();
      }}
      variant="primary"
      size="lg"
      disabled={isGenerating}
      className="!w-auto min-w-[200px] h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {isGenerating ? (
        <>
          <DocumentTextIcon className="h-4 w-4 mr-2 animate-pulse" />
          Generating PDF...
        </>
      ) : (
        <>
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Download Resume
        </>
      )}
    </Button>
  );
};

export default PDFResumeGenerator;
