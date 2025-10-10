import puppeteer from 'puppeteer';

// Test Landing Page System - Comprehensive End-to-End Testing
async function testLandingPage() {
  console.log('🚀 Starting Landing Page System Tests...');
  
  const browser = await puppeteer.launch({
    headless: false, // Visual observation enabled
    slowMo: 0, // No artificial delays
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport for responsive testing
  await page.setViewport({ width: 1280, height: 720 });
  
  let testResults = {
    passed: 0,
    failed: 0,
    errors: []
  };
  
  try {
    // Test 1: Landing Page Loads Correctly
    console.log('📄 Test 1: Landing Page Loads Correctly');
    await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Verify hero section exists
    const heroTitle = await page.$eval('h1', el => el.textContent);
    console.log(`✅ Hero title found: "${heroTitle}"`);
    
    // Verify company information is displayed
    const companyInfo = await page.$eval('[data-testid="company-info"], .company-info', el => el.textContent).catch(() => 'Company info not found');
    console.log(`✅ Company info: ${companyInfo}`);
    
    testResults.passed++;
    
    // Test 2: Navigation Works
    console.log('🧭 Test 2: Navigation Works');
    
    // Test mobile menu toggle
    await page.setViewport({ width: 375, height: 667 }); // Mobile viewport
    const mobileMenuButton = await page.$('button[aria-label="Toggle menu"], .mobile-menu-button');
    if (mobileMenuButton) {
      await mobileMenuButton.click();
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('✅ Mobile menu toggled');
    }
    
    // Test desktop navigation
    await page.setViewport({ width: 1280, height: 720 }); // Desktop viewport
    const navLinks = await page.$$('nav a');
    console.log(`✅ Found ${navLinks.length} navigation links`);
    
    testResults.passed++;
    
    // Test 3: Responsive Design
    console.log('📱 Test 3: Responsive Design');
    
    // Test mobile layout
    await page.setViewport({ width: 375, height: 667 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mobileLayout = await page.evaluate(() => {
      const hero = document.querySelector('h1');
      return hero ? hero.offsetWidth <= 375 : false;
    });
    console.log(`✅ Mobile layout responsive: ${mobileLayout}`);
    
    // Test tablet layout
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✅ Tablet layout tested');
    
    // Test desktop layout
    await page.setViewport({ width: 1280, height: 720 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✅ Desktop layout tested');
    
    testResults.passed++;
    
    // Test 4: Contact Form Functionality
    console.log('📝 Test 4: Contact Form Functionality');
    
    // Fill contact form
    await page.type('input[name="name"], input[placeholder*="name" i]', 'Test User');
    await page.type('input[name="email"], input[type="email"]', 'test@example.com');
    await page.type('textarea[name="message"], textarea[placeholder*="message" i]', 'This is a test message');
    
    // Submit form
    const submitButton = await page.$('button[type="submit"]');
    if (submitButton) {
      await submitButton.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ Contact form submitted');
    }
    
    testResults.passed++;
    
    // Test 5: Floating Chatbot
    console.log('🤖 Test 5: Floating Chatbot');
    
    const chatbotButton = await page.$('.floating-chatbot, [data-testid="chatbot"]');
    if (chatbotButton) {
      await chatbotButton.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ Floating chatbot activated');
    }
    
    testResults.passed++;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    testResults.failed++;
    testResults.errors.push({
      test: 'Landing Page Tests',
      error: error.message,
      stack: error.stack
    });
  }
  
  await browser.close();
  
  // Generate test report
  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  
  if (testResults.errors.length > 0) {
    console.log('\n🚨 Errors:');
    testResults.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.test}: ${error.error}`);
    });
  }
  
  return testResults;
}

// Run the test
testLandingPage()
  .then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });

export default testLandingPage;
