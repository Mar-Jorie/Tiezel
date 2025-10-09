import { useState } from 'react';
import { ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from './Button';

const PDFResumeGenerator = ({ portfolioData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
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
      resumeDiv.innerHTML = generateResumeHTML(portfolioData);
      
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
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateResumeHTML = (data) => {
    const personalInfo = data.personal_info || {};
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skills = data.skills || [];
    const testimonials = data.testimonials || [];
    
    return `
      <div style="max-width: 100%; margin: 0 auto;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #6589a4; padding-bottom: 20px;">
          <h1 style="font-size: 28px; font-weight: bold; color: #6589a4; margin: 0 0 10px 0;">${personalInfo.name || 'Your Name'}</h1>
          <h2 style="font-size: 18px; color: #666; margin: 0 0 15px 0;">${personalInfo.title || 'Professional Title'}</h2>
          <div style="display: flex; justify-content: center; gap: 20px; font-size: 12px; color: #666;">
            ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
            ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
          </div>
          <div style="display: flex; justify-content: center; gap: 20px; font-size: 12px; color: #666; margin-top: 10px;">
            ${personalInfo.linkedin ? `<span>🔗 LinkedIn: ${personalInfo.linkedin}</span>` : ''}
            ${personalInfo.github ? `<span>💻 GitHub: ${personalInfo.github}</span>` : ''}
            ${personalInfo.website ? `<span>🌐 Website: ${personalInfo.website}</span>` : ''}
          </div>
        </div>

        <!-- Professional Summary -->
        ${personalInfo.bio ? `
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #6589a4; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">PROFESSIONAL SUMMARY</h3>
            <p style="margin: 0; line-height: 1.5;">${personalInfo.bio}</p>
          </div>
        ` : ''}

        <!-- Education -->
        ${personalInfo.education ? `
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #6589a4; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">EDUCATION</h3>
            <p style="margin: 0; font-weight: bold;">${personalInfo.education}</p>
            ${personalInfo.experience ? `<p style="margin: 5px 0 0 0; color: #666;">${personalInfo.experience} of experience</p>` : ''}
          </div>
        ` : ''}

        <!-- Skills -->
        ${skills.length > 0 ? `
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #6589a4; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">SKILLS</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${skills.map(skill => `
                <span style="background-color: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 11px;">${skill.name || skill}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Experience -->
        ${experience.length > 0 ? `
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #6589a4; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">EXPERIENCE</h3>
            ${experience.map(exp => `
              <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                  <h4 style="font-size: 14px; font-weight: bold; margin: 0;">${exp.title || exp.position || 'Position'}</h4>
                  <span style="font-size: 12px; color: #666;">${exp.duration || exp.date || ''}</span>
                </div>
                <p style="font-size: 13px; font-weight: bold; color: #6589a4; margin: 0 0 5px 0;">${exp.company || exp.organization || 'Company'}</p>
                ${exp.description ? `<p style="margin: 0; font-size: 12px; line-height: 1.4;">${exp.description}</p>` : ''}
                ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                  <ul style="margin: 5px 0 0 0; padding-left: 15px;">
                    ${exp.responsibilities.map(resp => `<li style="font-size: 12px; margin-bottom: 2px;">${resp}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Projects -->
        ${projects.length > 0 ? `
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #6589a4; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">PROJECTS</h3>
            ${projects.map(project => `
              <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                  <h4 style="font-size: 14px; font-weight: bold; margin: 0;">${project.name || 'Project Name'}</h4>
                  ${project.status ? `<span style="font-size: 11px; background-color: #e8f5e8; color: #2d5a2d; padding: 2px 6px; border-radius: 3px;">${project.status}</span>` : ''}
                </div>
                ${project.category ? `<p style="font-size: 12px; color: #666; margin: 0 0 5px 0;">${project.category}</p>` : ''}
                ${project.description ? `<p style="margin: 0 0 5px 0; font-size: 12px; line-height: 1.4;">${project.description}</p>` : ''}
                ${project.technologies ? `<p style="margin: 0; font-size: 11px; color: #666;"><strong>Technologies:</strong> ${project.technologies}</p>` : ''}
                ${project.details && project.details.length > 0 ? `
                  <ul style="margin: 5px 0 0 0; padding-left: 15px;">
                    ${project.details.slice(0, 3).map(detail => `<li style="font-size: 11px; margin-bottom: 2px;">${detail}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Testimonials -->
        ${testimonials.length > 0 ? `
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #6589a4; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">TESTIMONIALS</h3>
            ${testimonials.slice(0, 2).map(testimonial => `
              <div style="margin-bottom: 10px; padding: 10px; background-color: #f9f9f9; border-left: 3px solid #6589a4;">
                <p style="margin: 0 0 5px 0; font-size: 12px; font-style: italic;">"${testimonial.content || testimonial.testimonial || ''}"</p>
                <p style="margin: 0; font-size: 11px; font-weight: bold;">- ${testimonial.name || 'Client'}</p>
                ${testimonial.role ? `<p style="margin: 0; font-size: 10px; color: #666;">${testimonial.role}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 10px; color: #666;">
          <p style="margin: 0;">Generated from Portfolio - ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;
  };

  return (
    <Button
      onClick={generatePDF}
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
          Download Resume PDF
        </>
      )}
    </Button>
  );
};

export default PDFResumeGenerator;
