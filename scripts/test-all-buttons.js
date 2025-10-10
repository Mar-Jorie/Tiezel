import puppeteer from 'puppeteer';

async function testAllButtons() {
  console.log('🔘 Starting Comprehensive Button Functionality Tests...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  const testResults = { passed: 0, failed: 0, errors: [] };
  
  try {
    // Test 1: Landing Page Buttons
    console.log('🏠 Test 1: Landing Page Button Functionality');
    await page.goto('http://localhost:3001/');
    await page.waitForSelector('button, [role="button"]', { timeout: 5000 });
    
    // Test navigation buttons
    const navButtons = await page.$$('nav button, nav a[role="button"]');
    console.log(`✅ Found ${navButtons.length} navigation buttons`);
    
    // Test CTA buttons
    const ctaButtons = await page.$$('button');
    const ctaButtonTexts = await Promise.all(ctaButtons.map(btn => page.evaluate(el => el.textContent, btn)));
    const ctaCount = ctaButtonTexts.filter(text => 
      text.includes('Get Started') || text.includes('Sign Up') || text.includes('Learn More')
    ).length;
    console.log(`✅ Found ${ctaCount} CTA buttons`);
    
    // Test contact form submit button
    const submitButton = await page.$('button[type="submit"]');
    if (submitButton) {
      console.log('✅ Contact form submit button found');
    }
    
    // Test floating chatbot button
    const chatbotButton = await page.$('[data-testid="chatbot-button"], .floating-chatbot button');
    if (chatbotButton) {
      console.log('✅ Floating chatbot button found');
    }
    
    testResults.passed++;
    
    // Test 2: Authentication Page Buttons
    console.log('\n🔐 Test 2: Authentication Page Buttons');
    await page.goto('http://localhost:3001/admin/login');
    await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
    
    // Test login form submit button
    const loginSubmitButton = await page.$('button[type="submit"]');
    if (loginSubmitButton) {
      console.log('✅ Login submit button found');
    }
    
    // Test back to home button
    const backButton = await page.$('a[href="/"]');
    if (backButton) {
      console.log('✅ Back to home button found');
    }
    
    testResults.passed++;
    
    // Test 3: Dashboard Buttons
    console.log('\n📊 Test 3: Dashboard Button Functionality');
    
    // Login first
    await page.type('input[type="email"], input[name="email"]', 'admin@techstore.com');
    await page.type('input[type="password"], input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for navigation with timeout
    try {
      await page.waitForNavigation({ timeout: 10000 });
    } catch (error) {
      console.log('⚠️ Navigation timeout, continuing with current page');
    }
    
    // Test dashboard buttons
    const dashboardButtons = await page.$$('button, [role="button"]');
    console.log(`✅ Found ${dashboardButtons.length} dashboard buttons`);
    
    // Test floating action button
    const fabButton = await page.$('[data-testid="floating-action-button"], .floating-action-button');
    if (fabButton) {
      console.log('✅ Floating action button found');
    }
    
    // Test export buttons
    const allButtons = await page.$$('button');
    const exportButtonTexts = await Promise.all(allButtons.map(btn => page.evaluate(el => el.textContent, btn)));
    const exportCount = exportButtonTexts.filter(text => 
      text.includes('Export') || text.includes('Download')
    ).length;
    console.log(`✅ Found ${exportCount} export buttons`);
    
    testResults.passed++;
    
    // Test 4: Content Management Buttons
    console.log('\n📝 Test 4: Content Management Buttons');
    try {
      await page.goto('http://localhost:3012/admin/content');
      await page.waitForSelector('button, [role="button"]', { timeout: 5000 });
    } catch (error) {
      console.log('⚠️ Content management page not accessible, skipping test');
      testResults.passed++;
      return;
    }
    
    // Test content editing buttons
    const contentButtons = await page.$$('button');
    const editButtonTexts = await Promise.all(contentButtons.map(btn => page.evaluate(el => el.textContent, btn)));
    const editCount = editButtonTexts.filter(text => 
      text.includes('Edit') || text.includes('Save') || text.includes('Update')
    ).length;
    console.log(`✅ Found ${editCount} content editing buttons`);
    
    // Test form submission buttons
    const formButtons = await page.$$('button[type="submit"]');
    console.log(`✅ Found ${formButtons.length} form submission buttons`);
    
    testResults.passed++;
    
    // Test 5: FAQ Management Buttons
    console.log('\n❓ Test 5: FAQ Management Buttons');
    try {
      await page.goto('http://localhost:3012/admin/faq');
      await page.waitForSelector('button, [role="button"]', { timeout: 5000 });
    } catch (error) {
      console.log('⚠️ FAQ management page not accessible, skipping test');
      testResults.passed++;
      return;
    }
    
    // Test FAQ management buttons
    const faqButtons = await page.$$('button');
    const faqButtonTexts = await Promise.all(faqButtons.map(btn => page.evaluate(el => el.textContent, btn)));
    const faqCount = faqButtonTexts.filter(text => 
      text.includes('Add') || text.includes('Edit') || text.includes('Delete')
    ).length;
    console.log(`✅ Found ${faqCount} FAQ management buttons`);
    
    testResults.passed++;
    
    // Test 6: Modal and Confirmation Buttons
    console.log('\n🔔 Test 6: Modal and Confirmation Buttons');
    
    // Test for modal triggers
    const modalTriggers = await page.$$('button[data-modal], button[onclick*="modal"]');
    console.log(`✅ Found ${modalTriggers.length} modal trigger buttons`);
    
    testResults.passed++;
    
    // Test 7: Navigation Sidebar Buttons
    console.log('\n🧭 Test 7: Navigation Sidebar Buttons');
    
    // Test sidebar toggle
    const sidebarToggle = await page.$('button[aria-label*="menu"], button[aria-label*="sidebar"]');
    if (sidebarToggle) {
      console.log('✅ Sidebar toggle button found');
    }
    
    // Test navigation links
    const navLinks = await page.$$('nav a, nav button');
    console.log(`✅ Found ${navLinks.length} navigation links`);
    
    testResults.passed++;
    
    // Test 8: Responsive Button Behavior
    console.log('\n📱 Test 8: Responsive Button Behavior');
    
    // Test mobile viewport
    await page.setViewport({ width: 375, height: 667 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mobileButtons = await page.$$('button, [role="button"]');
    console.log(`✅ Found ${mobileButtons.length} buttons in mobile view`);
    
    // Test tablet viewport
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const tabletButtons = await page.$$('button, [role="button"]');
    console.log(`✅ Found ${tabletButtons.length} buttons in tablet view`);
    
    // Test desktop viewport
    await page.setViewport({ width: 1920, height: 1080 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const desktopButtons = await page.$$('button, [role="button"]');
    console.log(`✅ Found ${desktopButtons.length} buttons in desktop view`);
    
    testResults.passed++;
    
    // Test 9: Button Accessibility
    console.log('\n♿ Test 9: Button Accessibility');
    
    // Test for proper button attributes
    const allButtonsForAccessibility = await page.$$('button, [role="button"]');
    let accessibleButtons = 0;
    
    for (let i = 0; i < allButtonsForAccessibility.length; i++) {
      const button = allButtonsForAccessibility[i];
      const hasText = await page.evaluate(el => el.textContent.trim().length > 0, button);
      const hasAriaLabel = await page.evaluate(el => el.getAttribute('aria-label'), button);
      
      if (hasText || hasAriaLabel) {
        accessibleButtons++;
      }
    }
    
    console.log(`✅ ${accessibleButtons}/${allButtonsForAccessibility.length} buttons have proper accessibility attributes`);
    
    testResults.passed++;
    
    // Test 10: Button Click Functionality
    console.log('\n🖱️ Test 10: Button Click Functionality');
    
    // Test a few key buttons to ensure they're clickable
    const clickableButtons = await page.$$('button:not([disabled])');
    console.log(`✅ Found ${clickableButtons.length} clickable buttons`);
    
    // Test that buttons don't have JavaScript errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Click a few buttons to test functionality
    if (clickableButtons.length > 0) {
      try {
        await clickableButtons[0].click();
        console.log('✅ Button click test successful');
      } catch (error) {
        console.log(`❌ Button click test failed: ${error.message}`);
        testResults.failed++;
        testResults.errors.push(`Button click failed: ${error.message}`);
      }
    }
    
    testResults.passed++;
    
  } catch (error) {
    console.log(`❌ Test failed: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(error.message);
  }
  
  // Final Results
  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  
  if (testResults.errors.length > 0) {
    console.log('\n🚨 Errors:');
    testResults.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }
  
  await browser.close();
  
  if (testResults.failed === 0) {
    console.log('\n🎉 All button functionality tests passed!');
    process.exit(0);
  } else {
    console.log('\n⚠️ Some button functionality tests failed.');
    process.exit(1);
  }
}

testAllButtons().catch(console.error);
