/**
 * Schema Markup Validation Script
 * Validates that our schema markup follows Schema.org standards
 */

import { AUTHOR_INFO, ORGANIZATION_INFO } from '../src/config/author.js';
import { createBlogPostSchema, createWebsiteSchema, createPersonSchema } from '../src/utils/schemaUtils.js';

function validateAuthorSchema(author: any): boolean {
  const required = ['@type', 'name', 'url', 'sameAs'];
  const missing = required.filter(field => !author[field]);

  if (missing.length > 0) {
    console.error('❌ Author schema missing required fields:', missing);
    return false;
  }

  if (author['@type'] !== 'Person') {
    console.error('❌ Author @type should be "Person"');
    return false;
  }

  if (!Array.isArray(author.sameAs) || author.sameAs.length === 0) {
    console.error('❌ Author sameAs should be a non-empty array');
    return false;
  }

  console.log('✅ Author schema validation passed');
  return true;
}

function validateWebsiteSchema(website: any): boolean {
  const required = ['@type', 'name', 'url'];
  const missing = required.filter(field => !website[field]);

  if (missing.length > 0) {
    console.error('❌ Website schema missing required fields:', missing);
    return false;
  }

  if (website['@type'] !== 'WebSite') {
    console.error('❌ Website @type should be "WebSite"');
    return false;
  }

  console.log('✅ Website schema validation passed');
  return true;
}

function validateBlogPostSchema(blogPost: any): boolean {
  const required = ['@type', 'headline', 'datePublished', 'author', 'publisher'];
  const missing = required.filter(field => !blogPost[field]);

  if (missing.length > 0) {
    console.error('❌ BlogPost schema missing required fields:', missing);
    return false;
  }

  if (blogPost['@type'] !== 'BlogPosting') {
    console.error('❌ BlogPost @type should be "BlogPosting"');
    return false;
  }

  console.log('✅ BlogPost schema validation passed');
  return true;
}

function main() {
  console.log('🔍 Validating Schema Markup...\n');

  // Test configurations
  const personSchema = createPersonSchema();
  const websiteSchema = createWebsiteSchema();
  const blogPostSchema = createBlogPostSchema({
    title: "Test Blog Post",
    description: "A test blog post for schema validation",
    date: new Date(),
    url: "https://nibzard.com/test-post",
    tags: ["test", "schema"]
  });

  let allValid = true;

  // Validate schemas
  allValid = validateAuthorSchema(personSchema) && allValid;
  allValid = validateWebsiteSchema(websiteSchema) && allValid;
  allValid = validateBlogPostSchema(blogPostSchema) && allValid;

  if (allValid) {
    console.log('\n🎉 All schema validations passed!');
    console.log('\n📋 Schema Summary:');
    console.log(`- Author: ${personSchema.name}`);
    console.log(`- Website: ${websiteSchema.name}`);
    console.log(`- Social profiles: ${personSchema.sameAs.length}`);
    console.log(`- Knowledge areas: ${personSchema.knowsAbout?.length || 0}`);
  } else {
    console.log('\n❌ Some schema validations failed');
    process.exit(1);
  }
}

main();