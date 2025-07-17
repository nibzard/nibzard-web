import { chromium } from 'playwright';

async function testOGImage() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Testing OG image for: https://www.nibzard.com/anti-playbook-ai-dev-tools-growth-strategy');
  
  try {
    // Navigate to the blog post
    await page.goto('https://www.nibzard.com/anti-playbook-ai-dev-tools-growth-strategy');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Extract OG image meta tag
    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
    console.log('OG Image URL:', ogImage);
    
    // Extract other OG meta tags for verification
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    const ogType = await page.getAttribute('meta[property="og:type"]', 'content');
    
    console.log('OG Title:', ogTitle);
    console.log('OG Description:', ogDescription);
    console.log('OG Type:', ogType);
    
    // Test if the OG image URL is accessible
    if (ogImage) {
      console.log('\nTesting OG image accessibility...');
      const response = await page.request.get(ogImage);
      console.log('OG Image Response Status:', response.status());
      console.log('OG Image Content-Type:', response.headers()['content-type']);
      
      if (response.status() === 200) {
        console.log('✅ OG image is accessible and loading correctly!');
      } else {
        console.log('❌ OG image failed to load');
      }
    } else {
      console.log('❌ No OG image meta tag found');
    }
    
    // Check for Twitter Card meta tags
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
    const twitterImage = await page.getAttribute('meta[name="twitter:image"]', 'content');
    
    console.log('\nTwitter Card Info:');
    console.log('Twitter Card:', twitterCard);
    console.log('Twitter Image:', twitterImage);
    
  } catch (error) {
    console.error('Error testing OG image:', error.message);
  } finally {
    await browser.close();
  }
}

testOGImage();