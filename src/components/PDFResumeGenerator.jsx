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
    
    return `
      <div style="max-width: 100%; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2c3e50;">
        <!-- Modern Header with Gradient -->
        <div style="background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%); color: white; padding: 30px 25px; margin: -20mm -20mm 25px -20mm; border-radius: 0 0 15px 15px;">
          <div style="display: flex; align-items: center; gap: 20px;">
            <!-- Profile Avatar Placeholder -->
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; flex-shrink: 0;">
              ${(personalInfo.name || 'Y').charAt(0).toUpperCase()}
            </div>
            
            <!-- Name and Title -->
            <div style="flex: 1;">
              <h1 style="font-size: 32px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">${personalInfo.name || 'Your Name'}</h1>
              <h2 style="font-size: 18px; font-weight: 400; margin: 0 0 15px 0; opacity: 0.9;">${personalInfo.title || 'Professional Title'}</h2>
              
              <!-- Contact Info Grid -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; font-size: 13px;">
                ${personalInfo.email ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="opacity: 0.8;">📧</span> ${personalInfo.email}</div>` : ''}
                ${personalInfo.phone ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="opacity: 0.8;">📱</span> ${personalInfo.phone}</div>` : ''}
                ${personalInfo.location ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="opacity: 0.8;">📍</span> ${personalInfo.location}</div>` : ''}
                ${personalInfo.linkedin ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="opacity: 0.8;">🔗</span> ${personalInfo.linkedin}</div>` : ''}
                ${personalInfo.github ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="opacity: 0.8;">💻</span> ${personalInfo.github}</div>` : ''}
                ${personalInfo.website ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="opacity: 0.8;">🌐</span> ${personalInfo.website}</div>` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Two Column Layout -->
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 30px;">
          
          <!-- Left Column - Sidebar -->
          <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; height: fit-content;">
            
            <!-- Professional Summary -->
            ${personalInfo.bio ? `
              <div style="margin-bottom: 25px;">
                <h3 style="font-size: 16px; font-weight: 700; color: ${primaryColor}; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 6px;">About Me</h3>
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #555;">${personalInfo.bio}</p>
              </div>
            ` : ''}

            <!-- Skills -->
            ${skills.length > 0 ? `
              <div style="margin-bottom: 25px;">
                <h3 style="font-size: 16px; font-weight: 700; color: ${primaryColor}; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 6px;">Skills</h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${skills.map(skill => {
                    // Handle different skill data structures
                    if (typeof skill === 'string') {
                      return `<div style="background: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; color: #2c3e50; border-left: 3px solid ${primaryColor}; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${skill}</div>`;
                    } else if (skill.skills && Array.isArray(skill.skills)) {
                      // Handle skills grouped by category
                      return skill.skills.map(s => 
                        `<div style="background: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; color: #2c3e50; border-left: 3px solid ${primaryColor}; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${s}</div>`
                      ).join('');
                    } else {
                      return `<div style="background: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; color: #2c3e50; border-left: 3px solid ${primaryColor}; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${skill.name || skill.title || skill}</div>`;
                    }
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Education -->
            ${personalInfo.education ? `
              <div style="margin-bottom: 25px;">
                <h3 style="font-size: 16px; font-weight: 700; color: ${primaryColor}; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 6px;">Education</h3>
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <p style="margin: 0; font-weight: 600; font-size: 14px; color: #2c3e50;">${personalInfo.education}</p>
                  ${personalInfo.experience ? `<p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">${personalInfo.experience} of experience</p>` : ''}
                </div>
              </div>
            ` : ''}

            <!-- Testimonials -->
            ${testimonials.length > 0 ? `
              <div style="margin-bottom: 25px;">
                <h3 style="font-size: 16px; font-weight: 700; color: ${primaryColor}; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 6px;">Testimonials</h3>
                ${testimonials.slice(0, 2).map(testimonial => `
                  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 4px solid ${primaryColor};">
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-style: italic; color: #555; line-height: 1.5;">"${testimonial.content || testimonial.testimonial || ''}"</p>
                    <p style="margin: 0; font-size: 11px; font-weight: 600; color: #2c3e50;">- ${testimonial.name || 'Client'}</p>
                    ${testimonial.role ? `<p style="margin: 2px 0 0 0; font-size: 10px; color: #666;">${testimonial.role}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

          </div>

          <!-- Right Column - Main Content -->
          <div>
            
            <!-- Experience -->
            ${experience.length > 0 ? `
              <div style="margin-bottom: 30px;">
                <h3 style="font-size: 18px; font-weight: 700; color: ${primaryColor}; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid ${primaryColor}; padding-bottom: 8px;">Professional Experience</h3>
                ${experience.map((exp, index) => `
                  <div style="margin-bottom: 25px; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 4px solid ${primaryColor};">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                      <h4 style="font-size: 16px; font-weight: 700; margin: 0; color: #2c3e50;">${exp.title || exp.position || 'Position'}</h4>
                      <span style="font-size: 12px; color: #666; background: #f8f9fa; padding: 4px 8px; border-radius: 4px; font-weight: 500;">${exp.duration || exp.date || ''}</span>
                    </div>
                    <p style="font-size: 14px; font-weight: 600; color: ${primaryColor}; margin: 0 0 10px 0;">${exp.company || exp.organization || 'Company'}</p>
                    ${exp.description ? `<p style="margin: 0 0 10px 0; font-size: 13px; line-height: 1.6; color: #555;">${exp.description}</p>` : ''}
                    ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                      <ul style="margin: 0; padding-left: 0; list-style: none;">
                        ${exp.responsibilities.map(resp => `
                          <li style="font-size: 12px; margin-bottom: 6px; padding-left: 15px; position: relative; color: #555; line-height: 1.5;">
                            <span style="position: absolute; left: 0; top: 6px; width: 4px; height: 4px; background: ${primaryColor}; border-radius: 50%;"></span>
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
              <div style="margin-bottom: 30px;">
                <h3 style="font-size: 18px; font-weight: 700; color: ${primaryColor}; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid ${primaryColor}; padding-bottom: 8px;">Featured Projects</h3>
                ${projects.map(project => `
                  <div style="margin-bottom: 20px; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 4px solid ${primaryColor};">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                      <h4 style="font-size: 15px; font-weight: 700; margin: 0; color: #2c3e50;">${project.name || 'Project Name'}</h4>
                      ${project.status ? `<span style="font-size: 10px; background: #e8f5e8; color: #2d5a2d; padding: 3px 8px; border-radius: 12px; font-weight: 600; text-transform: uppercase;">${project.status}</span>` : ''}
                    </div>
                    ${project.category ? `<p style="font-size: 12px; color: #666; margin: 0 0 8px 0; font-weight: 500;">${project.category}</p>` : ''}
                    ${project.description ? `<p style="margin: 0 0 10px 0; font-size: 13px; line-height: 1.6; color: #555;">${project.description}</p>` : ''}
                    ${project.technologies ? `
                      <div style="margin: 10px 0;">
                        <p style="margin: 0 0 5px 0; font-size: 11px; font-weight: 600; color: #666; text-transform: uppercase;">Technologies:</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                          ${project.technologies.split(',').map(tech => 
                            `<span style="background: #f0f0f0; padding: 3px 8px; border-radius: 12px; font-size: 10px; color: #555; font-weight: 500;">${tech.trim()}</span>`
                          ).join('')}
                        </div>
                      </div>
                    ` : ''}
                    ${project.details && project.details.length > 0 ? `
                      <ul style="margin: 10px 0 0 0; padding-left: 0; list-style: none;">
                        ${project.details.slice(0, 3).map(detail => `
                          <li style="font-size: 12px; margin-bottom: 4px; padding-left: 15px; position: relative; color: #555; line-height: 1.4;">
                            <span style="position: absolute; left: 0; top: 6px; width: 4px; height: 4px; background: ${primaryColor}; border-radius: 50%;"></span>
                            ${detail}
                          </li>
                        `).join('')}
                      </ul>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

          </div>
        </div>

        <!-- Modern Footer -->
        <div style="text-align: center; margin-top: 40px; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 10px; border-top: 3px solid ${primaryColor};">
          <p style="margin: 0; font-size: 11px; color: #666; font-weight: 500;">
            Generated from Tiezel Portfolio System • ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
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
