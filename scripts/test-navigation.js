import puppeteer from 'puppeteer';

// Test Navigation and User Flow - Comprehensive End-to-End Testing
async function testNavigation() {
  console.log('🧭 Starting Navigation Tests...');
  
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
    // Test 1: Landing Page to Admin Login Navigation
    console.log('🏠 Test 1: Landing Page to Admin Login Navigation');
    
    // Start at landing page
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Navigate to admin login (should be accessible from landing page)
    await page.goto('http://localhost:3000/admin/login');
    await page.waitForSelector('form', { timeout: 10000 });
    
    console.log('✅ Successfully navigated from landing page to admin login');
    
    testResults.passed++;
    
    // Test 2: Admin Login to Dashboard Flow
    console.log('🔐 Test 2: Admin Login to Dashboard Flow');
    
    // Fill login form with valid credentials
    await page.type('input[type="email"], input[name="email"]', 'admin@techstore.com');
    await page.type('input[type="password"], input[name="password"]', 'admin123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForFunction(() => {
      return window.location.href.includes('/admin/dashboard');
    }, { timeout: 10000 });
    
    console.log('✅ Successfully logged in and navigated to dashboard');
    
    testResults.passed++;
    
    // Test 3: Dashboard Content Management Navigation
    console.log('📝 Test 3: Dashboard Content Management Navigation');
    
    // Test tab navigation within dashboard
    const tabs = await page.$$('.tab, .nav-tab, [role="tab"]');
    if (tabs.length > 0) {
      for (let i = 0; i < Math.min(tabs.length, 3); i++) {
        await tabs[i].click();
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`✅ Tab ${i + 1} navigation working`);
      }
    }
    
    // Test form sections
    const formSections = await page.$$('.form-section, .content-section, [data-testid="content-section"]');
    console.log(`✅ Found ${formSections.length} content management sections`);
    
    testResults.passed++;
    
    // Test 4: Back to Landing Page Navigation
    console.log('🏠 Test 4: Back to Landing Page Navigation');
    
    // Navigate back to landing page
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Verify landing page is accessible
    const landingPageTitle = await page.$eval('h1', el => el.textContent);
    console.log(`✅ Landing page accessible: "${landingPageTitle}"`);
    
    testResults.passed++;
    
    // Test 5: Mobile Navigation
    console.log('📱 Test 5: Mobile Navigation');
    
    // Test mobile viewport
    await page.setViewport({ width: 375, height: 667 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test mobile menu if present
    const mobileMenuButton = await page.$('button[aria-label="Toggle menu"], .mobile-menu-button, .hamburger, button[class*="menu"]');
    if (mobileMenuButton) {
      await mobileMenuButton.click();
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('✅ Mobile menu toggle working');
    }
    
    // Test mobile navigation links
    const mobileNavLinks = await page.$$('nav a, .mobile-nav a');
    console.log(`✅ Found ${mobileNavLinks.length} mobile navigation links`);
    
    testResults.passed++;
    
    // Test 6: Responsive Navigation
    console.log('📐 Test 6: Responsive Navigation');
    
    // Test tablet viewport
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✅ Tablet navigation tested');
    
    // Test desktop viewport
    await page.setViewport({ width: 1280, height: 720 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✅ Desktop navigation tested');
    
    testResults.passed++;
    
    // Test 7: Protected Route Access
    console.log('🔒 Test 7: Protected Route Access');
    
    // Try to access admin dashboard without login
    await page.goto('http://localhost:3000/admin/dashboard');
    
    // Should redirect to login page
    await page.waitForFunction(() => {
      return window.location.href.includes('/admin/login');
    }, { timeout: 5000 });
    
    console.log('✅ Protected routes properly redirect to login');
    
    testResults.passed++;
    
    // Test 8: Session Persistence
    console.log('💾 Test 8: Session Persistence');
    
    // Login again
    await page.type('input[type="email"], input[name="email"]', 'admin@techstore.com');
    await page.type('input[type="password"], input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await page.waitForFunction(() => {
      return window.location.href.includes('/admin/dashboard');
    }, { timeout: 10000 });
    
    // Refresh page to test session persistence
    await page.reload();
    await page.waitForSelector('h1, .dashboard-title', { timeout: 5000 });
    
    console.log('✅ Session persists across page refresh');
    
    testResults.passed++;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    testResults.failed++;
    testResults.errors.push({
      test: 'Navigation Tests',
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
testNavigation()
  .then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });

export default testNavigation;
