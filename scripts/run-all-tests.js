import testLandingPage from './test-landing-page.js';
import testAdminAuthentication from './test-admin-authentication.js';
import testNavigation from './test-navigation.js';

// Run All Tests - Comprehensive Test Suite
async function runAllTests() {
  console.log('🚀 Starting Comprehensive Test Suite for Landing Page System...\n');
  
  const startTime = Date.now();
  const allResults = {
    totalPassed: 0,
    totalFailed: 0,
    totalErrors: [],
    testSuites: []
  };
  
  try {
    // Test Suite 1: Landing Page Tests
    console.log('='.repeat(60));
    console.log('📄 RUNNING LANDING PAGE TESTS');
    console.log('='.repeat(60));
    
    const landingPageResults = await testLandingPage();
    allResults.totalPassed += landingPageResults.passed;
    allResults.totalFailed += landingPageResults.failed;
    allResults.totalErrors.push(...landingPageResults.errors);
    allResults.testSuites.push({
      name: 'Landing Page Tests',
      passed: landingPageResults.passed,
      failed: landingPageResults.failed,
      errors: landingPageResults.errors
    });
    
    console.log('\n');
    
    // Test Suite 2: Admin Authentication Tests
    console.log('='.repeat(60));
    console.log('🔐 RUNNING ADMIN AUTHENTICATION TESTS');
    console.log('='.repeat(60));
    
    const authResults = await testAdminAuthentication();
    allResults.totalPassed += authResults.passed;
    allResults.totalFailed += authResults.failed;
    allResults.totalErrors.push(...authResults.errors);
    allResults.testSuites.push({
      name: 'Admin Authentication Tests',
      passed: authResults.passed,
      failed: authResults.failed,
      errors: authResults.errors
    });
    
    console.log('\n');
    
    // Test Suite 3: Navigation Tests
    console.log('='.repeat(60));
    console.log('🧭 RUNNING NAVIGATION TESTS');
    console.log('='.repeat(60));
    
    const navigationResults = await testNavigation();
    allResults.totalPassed += navigationResults.passed;
    allResults.totalFailed += navigationResults.failed;
    allResults.totalErrors.push(...navigationResults.errors);
    allResults.testSuites.push({
      name: 'Navigation Tests',
      passed: navigationResults.passed,
      failed: navigationResults.failed,
      errors: navigationResults.errors
    });
    
  } catch (error) {
    console.error('❌ Test suite execution failed:', error);
    allResults.totalFailed++;
    allResults.totalErrors.push({
      test: 'Test Suite Execution',
      error: error.message,
      stack: error.stack
    });
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  // Generate comprehensive test report
  console.log('\n' + '='.repeat(80));
  console.log('📊 COMPREHENSIVE TEST RESULTS SUMMARY');
  console.log('='.repeat(80));
  
  console.log(`⏱️  Total Duration: ${duration} seconds`);
  console.log(`✅ Total Passed: ${allResults.totalPassed}`);
  console.log(`❌ Total Failed: ${allResults.totalFailed}`);
  console.log(`📈 Success Rate: ${((allResults.totalPassed / (allResults.totalPassed + allResults.totalFailed)) * 100).toFixed(1)}%`);
  
  console.log('\n📋 Test Suite Breakdown:');
  allResults.testSuites.forEach((suite, index) => {
    const successRate = ((suite.passed / (suite.passed + suite.failed)) * 100).toFixed(1);
    console.log(`${index + 1}. ${suite.name}: ${suite.passed} passed, ${suite.failed} failed (${successRate}%)`);
  });
  
  if (allResults.totalErrors.length > 0) {
    console.log('\n🚨 Detailed Error Report:');
    allResults.totalErrors.forEach((error, index) => {
      console.log(`\n${index + 1}. ${error.test}:`);
      console.log(`   Error: ${error.error}`);
      if (error.stack) {
        console.log(`   Stack: ${error.stack.split('\n')[0]}`);
      }
    });
  }
  
  // Compliance Check Results
  console.log('\n🔍 Compliance Check Results:');
  const complianceChecks = [
    { name: 'Landing Page Structure', status: allResults.testSuites[0]?.failed === 0 ? '✅ PASS' : '❌ FAIL' },
    { name: 'Admin Authentication', status: allResults.testSuites[1]?.failed === 0 ? '✅ PASS' : '❌ FAIL' },
    { name: 'Navigation Flow', status: allResults.testSuites[2]?.failed === 0 ? '✅ PASS' : '❌ FAIL' },
    { name: 'Responsive Design', status: allResults.totalFailed === 0 ? '✅ PASS' : '❌ FAIL' },
    { name: 'User Experience', status: allResults.totalFailed === 0 ? '✅ PASS' : '❌ FAIL' }
  ];
  
  complianceChecks.forEach(check => {
    console.log(`   ${check.name}: ${check.status}`);
  });
  
  // Final Status
  console.log('\n' + '='.repeat(80));
  if (allResults.totalFailed === 0) {
    console.log('🎉 ALL TESTS PASSED! Landing Page System is ready for production.');
    console.log('✅ Compliance: FULLY COMPLIANT');
    console.log('✅ Quality: PRODUCTION READY');
  } else {
    console.log('⚠️  SOME TESTS FAILED! Please review and fix issues before deployment.');
    console.log('❌ Compliance: NEEDS ATTENTION');
    console.log('❌ Quality: REQUIRES FIXES');
  }
  console.log('='.repeat(80));
  
  return allResults;
}

// Run all tests
runAllTests()
  .then(results => {
    process.exit(results.totalFailed > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });

export default runAllTests;
