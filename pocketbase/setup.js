/**
 * PocketBase Automated Provisioning & Seed Script
 * Project Week SaaS - Feedback Board
 * 
 * Usage:
 * node pocketbase/setup.js [POCKETBASE_URL] [ADMIN_EMAIL] [ADMIN_PASSWORD]
 * Default: http://127.0.0.1:8090 admin@feedbackpulse.io Password1234!
 */

import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PB_URL = process.argv[2] || process.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.argv[3] || 'admin@feedbackpulse.io';
const ADMIN_PASSWORD = process.argv[4] || 'Password1234!';

const pb = new PocketBase(PB_URL);

async function main() {
  console.log(`Connecting to PocketBase at ${PB_URL}...`);

  try {
    // Authenticate as Superuser / Admin
    try {
      await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
      console.log('✓ Admin authenticated successfully.');
    } catch {
      console.log('Creating initial admin user...');
      await pb.admins.create({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        passwordConfirm: ADMIN_PASSWORD,
      });
      await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
      console.log('✓ Admin account created and authenticated.');
    }

    // Read schema
    const schemaPath = path.join(__dirname, 'pb_schema.json');
    const collections = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

    // Import schema collections
    console.log('Importing collections with strict API security rules...');
    await pb.collections.import(collections, false);
    console.log('✓ Collections (posts, votes, comments) created successfully with API rules.');

    // Seed Demo Users
    console.log('Seeding demo accounts...');
    let adminUser;
    try {
      adminUser = await pb.collection('users').create({
        email: 'dmitri@admin.io',
        password: 'Password1234!',
        passwordConfirm: 'Password1234!',
        name: 'Dmitri Allikvee',
        role: 'admin',
        is_pro: true,
      });
      console.log('✓ Admin user created: dmitri@admin.io / Password1234!');
    } catch {
      adminUser = await pb.collection('users').getFirstListItem('email="dmitri@admin.io"');
    }

    // Seed Initial Posts
    const demoPosts = [
      {
        title: 'Automated Slack and Discord notification webhooks',
        description: 'Provide webhook triggers for channels so product teams and engineers instantly receive updates whenever new feature ideas are submitted or cross high upvote thresholds.',
        category: 'integration',
        status: 'planned',
        author: adminUser.id,
        upvotes_count: 52,
        comments_count: 2,
        is_pinned: true,
      },
      {
        title: 'Dark & Light theme toggle with custom brand accent colors',
        description: 'Allow workspace administrators to upload custom company logos, set brand hex colors, and toggle sleek dark and OLED themes for the public feedback portal.',
        category: 'ui-ux',
        status: 'in_progress',
        author: adminUser.id,
        upvotes_count: 89,
        comments_count: 3,
        is_pinned: false,
      },
      {
        title: 'CSV and JSON export with voter metadata & segmentation',
        description: 'Essential for product managers to export feedback datasets, compute correlation matrices, and import customer demands directly into Jira or Linear.',
        category: 'feature',
        status: 'completed',
        author: adminUser.id,
        upvotes_count: 36,
        comments_count: 1,
        is_pinned: false,
      },
      {
        title: 'Multi-Factor Authentication (TOTP 2FA) & SSO enforcement',
        description: 'Support Google Authenticator and enterprise SAML SSO so enterprise workspace admin panels remain strictly protected against credential stuffing.',
        category: 'feature',
        status: 'under_review',
        author: adminUser.id,
        upvotes_count: 24,
        comments_count: 0,
        is_pinned: false,
      },
    ];

    console.log('Seeding initial feature proposals...');
    for (const post of demoPosts) {
      try {
        await pb.collection('posts').create(post);
      } catch (err) {
        console.warn(`Skipped existing post: ${post.title}`);
      }
    }

    console.log('✓ PocketBase database provisioning complete!');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

main();
