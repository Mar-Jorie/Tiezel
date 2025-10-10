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
      <div style="max-width: 100%; margin: 0 auto; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a202c; background: #ffffff;">
        
        <!-- Creative Header with Profile Image -->
        <div style="position: relative; background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 50%, #667eea 100%); color: white; padding: 40px 30px; margin: -20mm -20mm 0 -20mm; overflow: hidden;">
          <!-- Background Pattern -->
          <div style="position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; transform: translate(50%, -50%);"></div>
          <div style="position: absolute; bottom: -50px; left: -50px; width: 150px; height: 150px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
          
          <div style="position: relative; z-index: 2; display: flex; align-items: center; gap: 30px;">
            
            <!-- Profile Image -->
            <div style="position: relative; flex-shrink: 0;">
              ${profileImage ? `
                <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid rgba(255,255,255,0.3); box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
                  <img src="${profileImage}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
              ` : `
                <div style="width: 120px; height: 120px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: bold; border: 4px solid rgba(255,255,255,0.3); box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
                  ${(personalInfo.name || 'Y').charAt(0).toUpperCase()}
                </div>
              `}
              <!-- Status Indicator -->
              <div style="position: absolute; bottom: 8px; right: 8px; width: 20px; height: 20px; background: #10b981; border: 3px solid white; border-radius: 50%;"></div>
            </div>
            
            <!-- Name and Title -->
            <div style="flex: 1;">
              <h1 style="font-size: 36px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -1px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">${personalInfo.name || 'Your Name'}</h1>
              <h2 style="font-size: 20px; font-weight: 400; margin: 0 0 20px 0; opacity: 0.95; font-style: italic;">${personalInfo.title || 'Professional Title'}</h2>
              
              <!-- Contact Info with Icons -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; font-size: 14px;">
                ${personalInfo.email ? `
                  <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; backdrop-filter: blur(10px);">
                    <span style="font-size: 16px;">📧</span> 
                    <span style="font-weight: 500;">${personalInfo.email}</span>
                  </div>
                ` : ''}
                ${personalInfo.phone ? `
                  <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; backdrop-filter: blur(10px);">
                    <span style="font-size: 16px;">📱</span> 
                    <span style="font-weight: 500;">${personalInfo.phone}</span>
                  </div>
                ` : ''}
                ${personalInfo.location ? `
                  <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; backdrop-filter: blur(10px);">
                    <span style="font-size: 16px;">📍</span> 
                    <span style="font-weight: 500;">${personalInfo.location}</span>
                  </div>
                ` : ''}
                ${personalInfo.linkedin ? `
                  <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; backdrop-filter: blur(10px);">
                    <span style="font-size: 16px;">🔗</span> 
                    <span style="font-weight: 500;">${personalInfo.linkedin}</span>
                  </div>
                ` : ''}
                ${personalInfo.github ? `
                  <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; backdrop-filter: blur(10px);">
                    <span style="font-size: 16px;">💻</span> 
                    <span style="font-weight: 500;">${personalInfo.github}</span>
                  </div>
                ` : ''}
                ${personalInfo.website ? `
                  <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; backdrop-filter: blur(10px);">
                    <span style="font-size: 16px;">🌐</span> 
                    <span style="font-weight: 500;">${personalInfo.website}</span>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content with Creative Layout -->
        <div style="padding: 30px 0;">
          
          <!-- Professional Summary Section -->
          ${personalInfo.bio ? `
            <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 25px; border-radius: 16px; margin-bottom: 30px; border-left: 5px solid ${primaryColor}; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h3 style="font-size: 18px; font-weight: 700; color: ${primaryColor}; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 10px;">
                <span style="width: 30px; height: 3px; background: ${primaryColor}; border-radius: 2px;"></span>
                About Me
              </h3>
              <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #4a5568; font-weight: 400;">${personalInfo.bio}</p>
            </div>
          ` : ''}

          <!-- Two Column Layout -->
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">
            
            <!-- Left Column - Skills & Info -->
            <div>
              
              <!-- Skills Section -->
              ${skills.length > 0 ? `
                <div style="background: white; padding: 25px; border-radius: 16px; margin-bottom: 25px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                  <h3 style="font-size: 16px; font-weight: 700; color: ${primaryColor}; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 10px;">
                    <span style="width: 25px; height: 3px; background: ${primaryColor}; border-radius: 2px;"></span>
                    Skills
                  </h3>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${skills.map(skill => {
                      // Handle different skill data structures
                      if (typeof skill === 'string') {
                        return `
                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 12px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #2d3748; border-left: 4px solid ${primaryColor}; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: 0; right: 0; width: 20px; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3));"></div>
                            ${skill}
                          </div>
                        `;
                      } else if (skill.skills && Array.isArray(skill.skills)) {
                        // Handle skills grouped by category
                        return skill.skills.map(s => 
                          `<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 12px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #2d3748; border-left: 4px solid ${primaryColor}; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: 0; right: 0; width: 20px; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3));"></div>
                            ${s}
                          </div>`
                        ).join('');
                      } else {
                        return `
                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 12px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #2d3748; border-left: 4px solid ${primaryColor}; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: 0; right: 0; width: 20px; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3));"></div>
                            ${skill.name || skill.title || skill}
                          </div>
                        `;
                      }
                    }).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Education Section -->
              ${personalInfo.education ? `
                <div style="background: white; padding: 25px; border-radius: 16px; margin-bottom: 25px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                  <h3 style="font-size: 16px; font-weight: 700; color: ${primaryColor}; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 10px;">
                    <span style="width: 25px; height: 3px; background: ${primaryColor}; border-radius: 2px;"></span>
                    Education
                  </h3>
                  <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 20px; border-radius: 12px; border-left: 4px solid ${primaryColor};">
                    <p style="margin: 0; font-weight: 700; font-size: 15px; color: #2d3748;">${personalInfo.education}</p>
                    ${personalInfo.experience ? `<p style="margin: 8px 0 0 0; color: #718096; font-size: 13px; font-weight: 500;">${personalInfo.experience} of experience</p>` : ''}
                  </div>
                </div>
              ` : ''}

              <!-- Testimonials Section -->
              ${testimonials.length > 0 ? `
                <div style="background: white; padding: 25px; border-radius: 16px; margin-bottom: 25px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                  <h3 style="font-size: 16px; font-weight: 700; color: ${primaryColor}; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 10px;">
                    <span style="width: 25px; height: 3px; background: ${primaryColor}; border-radius: 2px;"></span>
                    Testimonials
                  </h3>
                  ${testimonials.slice(0, 2).map(testimonial => `
                    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 20px; border-radius: 12px; margin-bottom: 15px; border-left: 4px solid ${primaryColor}; position: relative;">
                      <div style="position: absolute; top: 15px; right: 15px; font-size: 24px; color: ${primaryColor}; opacity: 0.3;">"</div>
                      <p style="margin: 0 0 12px 0; font-size: 13px; font-style: italic; color: #4a5568; line-height: 1.6; font-weight: 400;">${testimonial.content || testimonial.testimonial || ''}</p>
                      <div style="border-top: 1px solid rgba(0,0,0,0.1); padding-top: 10px;">
                        <p style="margin: 0; font-size: 12px; font-weight: 700; color: #2d3748;">- ${testimonial.name || 'Client'}</p>
                        ${testimonial.role ? `<p style="margin: 2px 0 0 0; font-size: 11px; color: #718096; font-weight: 500;">${testimonial.role}</p>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

            </div>

            <!-- Right Column - Experience & Projects -->
            <div>
              
              <!-- Experience Section -->
              ${experience.length > 0 ? `
                <div style="margin-bottom: 35px;">
                  <h3 style="font-size: 20px; font-weight: 800; color: ${primaryColor}; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 15px;">
                    <span style="width: 40px; height: 4px; background: ${primaryColor}; border-radius: 2px;"></span>
                    Professional Experience
                  </h3>
                  ${experience.map((exp, index) => `
                    <div style="margin-bottom: 30px; padding: 25px; background: white; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; position: relative; overflow: hidden;">
                      <!-- Timeline indicator -->
                      <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}cc 100%);"></div>
                      
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <h4 style="font-size: 17px; font-weight: 800; margin: 0; color: #1a202c;">${exp.title || exp.position || 'Position'}</h4>
                        <span style="font-size: 12px; color: #718096; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 6px 12px; border-radius: 20px; font-weight: 600; border: 1px solid #e2e8f0;">${exp.duration || exp.date || ''}</span>
                      </div>
                      <p style="font-size: 15px; font-weight: 700; color: ${primaryColor}; margin: 0 0 15px 0;">${exp.company || exp.organization || 'Company'}</p>
                      ${exp.description ? `<p style="margin: 0 0 15px 0; font-size: 14px; line-height: 1.7; color: #4a5568; font-weight: 400;">${exp.description}</p>` : ''}
                      ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                        <ul style="margin: 0; padding-left: 0; list-style: none;">
                          ${exp.responsibilities.map(resp => `
                            <li style="font-size: 13px; margin-bottom: 8px; padding-left: 20px; position: relative; color: #4a5568; line-height: 1.6; font-weight: 400;">
                              <span style="position: absolute; left: 0; top: 8px; width: 6px; height: 6px; background: ${primaryColor}; border-radius: 50%;"></span>
                              ${resp}
                            </li>
                          `).join('')}
                        </ul>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <!-- Projects Section -->
              ${projects.length > 0 ? `
                <div style="margin-bottom: 35px;">
                  <h3 style="font-size: 20px; font-weight: 800; color: ${primaryColor}; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 15px;">
                    <span style="width: 40px; height: 4px; background: ${primaryColor}; border-radius: 2px;"></span>
                    Featured Projects
                  </h3>
                  ${projects.map(project => `
                    <div style="margin-bottom: 25px; padding: 25px; background: white; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; position: relative; overflow: hidden;">
                      <!-- Project indicator -->
                      <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #10b981 0%, #059669 100%);"></div>
                      
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <h4 style="font-size: 16px; font-weight: 800; margin: 0; color: #1a202c;">${project.name || 'Project Name'}</h4>
                        ${project.status ? `<span style="font-size: 10px; background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); color: #065f46; padding: 4px 10px; border-radius: 12px; font-weight: 700; text-transform: uppercase; border: 1px solid #a7f3d0;">${project.status}</span>` : ''}
                      </div>
                      ${project.category ? `<p style="font-size: 13px; color: #718096; margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${project.category}</p>` : ''}
                      ${project.description ? `<p style="margin: 0 0 15px 0; font-size: 14px; line-height: 1.7; color: #4a5568; font-weight: 400;">${project.description}</p>` : ''}
                      ${project.technologies ? `
                        <div style="margin: 15px 0;">
                          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #718096; text-transform: uppercase; letter-spacing: 0.5px;">Technologies Used:</p>
                          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                            ${project.technologies.split(',').map(tech => 
                              `<span style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 4px 10px; border-radius: 12px; font-size: 11px; color: #475569; font-weight: 600; border: 1px solid #e2e8f0;">${tech.trim()}</span>`
                            ).join('')}
                          </div>
                        </div>
                      ` : ''}
                      ${project.details && project.details.length > 0 ? `
                        <ul style="margin: 15px 0 0 0; padding-left: 0; list-style: none;">
                          ${project.details.slice(0, 3).map(detail => `
                            <li style="font-size: 13px; margin-bottom: 6px; padding-left: 20px; position: relative; color: #4a5568; line-height: 1.5; font-weight: 400;">
                              <span style="position: absolute; left: 0; top: 8px; width: 6px; height: 6px; background: #10b981; border-radius: 50%;"></span>
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
        </div>

        <!-- Creative Footer -->
        <div style="text-align: center; margin-top: 50px; padding: 25px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; border-top: 4px solid ${primaryColor}; position: relative; overflow: hidden;">
          <!-- Background decoration -->
          <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: ${primaryColor}; border-radius: 50%; opacity: 0.1;"></div>
          <div style="position: absolute; bottom: -10px; right: 20px; width: 20px; height: 20px; background: ${primaryColor}; border-radius: 50%; opacity: 0.1;"></div>
          
          <p style="margin: 0; font-size: 12px; color: #718096; font-weight: 600; position: relative; z-index: 2;">
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
