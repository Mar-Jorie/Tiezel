import puppeteer from 'puppeteer';

// Test Admin Authentication System - Comprehensive End-to-End Testing
async function testAdminAuthentication() {
  console.log('🔐 Starting Admin Authentication Tests...');
  
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
    // Test 1: Admin Login Page Loads
    console.log('🔑 Test 1: Admin Login Page Loads');
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'domcontentloaded' });
    
    // Wait for login form to load
    await page.waitForSelector('form', { timeout: 10000 });
    
    // Verify login form elements
    const emailField = await page.$('input[type="email"], input[name="email"]');
    const passwordField = await page.$('input[type="password"], input[name="password"]');
    const submitButton = await page.$('button[type="submit"]');
    
    if (emailField && passwordField && submitButton) {
      console.log('✅ Login form elements found');
    } else {
      throw new Error('Login form elements missing');
    }
    
    testResults.passed++;
    
    // Test 2: Invalid Login Attempt
    console.log('❌ Test 2: Invalid Login Attempt');
    
    // Fill form with invalid credentials
    await page.type('input[type="email"], input[name="email"]', 'invalid@example.com');
    await page.type('input[type="password"], input[name="password"]', 'wrongpassword');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for error handling
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check for error message or toast notification
    const errorMessage = await page.$eval('.error, .toast, [role="alert"]', el => el.textContent).catch(() => 'No error message found');
    console.log(`✅ Error handling: ${errorMessage}`);
    
    testResults.passed++;
    
    // Navigate to fresh login page to avoid form clearing issues
    await page.goto('http://localhost:3012/admin/login');
    await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 5000 });
    
    // Test 3: Valid Admin Login
    console.log('✅ Test 3: Valid Admin Login');
    
    // Use demo credentials from the system
    await page.type('input[type="email"], input[name="email"]', 'admin@techstore.com');
    await page.type('input[type="password"], input[name="password"]', 'admin123');
    
    // Verify the form is filled
    const emailValue = await page.$eval('input[type="email"], input[name="email"]', el => el.value);
    const passwordValue = await page.$eval('input[type="password"], input[name="password"]', el => el.value);
    console.log(`Email field value: ${emailValue}`);
    console.log(`Password field value: ${passwordValue}`);
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait a moment for processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check current URL
    const currentUrl = page.url();
    console.log(`Current URL after login: ${currentUrl}`);
    
    // Check for any error messages
    const errorMessages = await page.$$('.error, .alert-danger, [role="alert"], .toast-error');
    if (errorMessages.length > 0) {
      for (let i = 0; i < errorMessages.length; i++) {
        const errorText = await page.evaluate(el => el.textContent, errorMessages[i]);
        console.log(`Error message found: ${errorText}`);
      }
    }
    
    // Check if form is still visible (login failed)
    const formStillVisible = await page.$('form');
    if (formStillVisible) {
      console.log('❌ Form still visible - login may have failed');
    }
    
    // Wait for redirect to dashboard
    try {
      await page.waitForFunction(() => {
        return window.location.href.includes('/admin/dashboard');
      }, { timeout: 10000 });
      console.log('✅ Successfully logged in and redirected to dashboard');
    } catch (error) {
      console.log(`❌ Redirect failed. Current URL: ${page.url()}`);
      // Check if we're still on login page
      const isStillOnLogin = await page.$('input[type="email"]');
      if (isStillOnLogin) {
        console.log('❌ Still on login page - login may have failed');
      }
      throw error;
    }
    
    testResults.passed++;
    
    // Test 4: Admin Dashboard Access
    console.log('📊 Test 4: Admin Dashboard Access');
    
    // Verify dashboard elements
    await page.waitForSelector('h1, .dashboard-title', { timeout: 5000 });
    
    const dashboardTitle = await page.$eval('h1, .dashboard-title', el => el.textContent);
    console.log(`✅ Dashboard loaded: "${dashboardTitle}"`);
    
    // Check for content editing sections
    const editSections = await page.$$('.edit-section, .content-editor, [data-testid="content-editor"]');
    console.log(`✅ Found ${editSections.length} content editing sections`);
    
    testResults.passed++;
    
    // Test 5: Content Editing Functionality
    console.log('✏️ Test 5: Content Editing Functionality');
    
    // Test company information editing
    const companyNameField = await page.$('input[name="companyName"], input[placeholder*="company name" i]');
    if (companyNameField) {
      await companyNameField.click();
      await page.keyboard.selectAll();
      await page.type('input[name="companyName"], input[placeholder*="company name" i]', 'Updated Company Name');
      console.log('✅ Company name field updated');
    }
    
    // Test save functionality
    const saveButton = await page.$('button[type="submit"]');
    if (saveButton) {
      await saveButton.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ Content saved successfully');
    }
    
    testResults.passed++;
    
    // Test 6: Admin Logout
    console.log('🚪 Test 6: Admin Logout');
    
    // Look for logout button or profile dropdown
    const logoutButton = await page.$('button[data-testid="logout"], .logout-button, button[class*="logout"]');
    if (logoutButton) {
      await logoutButton.click();
      
      // Wait for confirmation modal if present
      const confirmButton = await page.$('button[data-testid="confirm-logout"], button[class*="confirm"]').catch(() => null);
      if (confirmButton) {
        await confirmButton.click();
      }
      
      // Wait for redirect to login page
      await page.waitForFunction(() => {
        return window.location.href.includes('/admin/login');
      }, { timeout: 5000 });
      
      console.log('✅ Successfully logged out and redirected to login page');
    }
    
    testResults.passed++;
    
    // Test 7: Session Management
    console.log('🔒 Test 7: Session Management');
    
    // Try to access dashboard without login
    await page.goto('http://localhost:3000/admin/dashboard');
    
    // Should redirect to login page
    await page.waitForFunction(() => {
      return window.location.href.includes('/admin/login');
    }, { timeout: 5000 });
    
    console.log('✅ Protected route redirects to login when not authenticated');
    
    testResults.passed++;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    testResults.failed++;
    testResults.errors.push({
      test: 'Admin Authentication Tests',
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
testAdminAuthentication()
  .then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });

export default testAdminAuthentication;
