/**
 * Automated PocketBase Seed Script for FeedbackPulse
 * Seeds initial demo accounts and SaaS feedback posts.
 */

import PocketBase from 'pocketbase';

const PB_URL = process.argv[2] || process.env.VITE_POCKETBASE_URL || 'http://pocketbase-yfgsu5yrrfnhs5lxpsjz0fsm.176.112.158.15.sslip.io';
const pb = new PocketBase(PB_URL);

async function seed() {
  console.log(`Connecting to PocketBase at ${PB_URL}...`);
  try {
    let user;
    try {
      user = await pb.collection('users').create({
        email: 'dmitri@admin.io',
        password: 'Password1234!',
        passwordConfirm: 'Password1234!',
        name: 'Dmitri Allikvee',
        role: 'admin',
        is_pro: true,
      });
      console.log('✓ Admin user created: dmitri@admin.io');
    } catch {
      console.log('Admin user already exists, authenticating...');
      const auth = await pb.collection('users').authWithPassword('dmitri@admin.io', 'Password1234!');
      user = auth.record;
      console.log('✓ Authenticated as:', user.name);
    }

    await pb.collection('users').authWithPassword('dmitri@admin.io', 'Password1234!');

    const posts = [
      {
        title: 'Automated Slack and Discord notification webhooks',
        description: 'Provide webhook triggers for channels so product teams and engineers instantly receive updates whenever new feature ideas are submitted or cross high upvote thresholds.',
        category: 'integration',
        status: 'planned',
        author: user.id,
        upvotes_count: 52,
        comments_count: 2,
        is_pinned: true,
      },
      {
        title: 'Dark & Light theme toggle with custom brand accent colors',
        description: 'Allow workspace administrators to upload custom company logos, set brand hex colors, and toggle sleek dark and OLED themes for the public feedback portal.',
        category: 'ui-ux',
        status: 'in_progress',
        author: user.id,
        upvotes_count: 89,
        comments_count: 3,
        is_pinned: false,
      },
      {
        title: 'CSV and JSON export with voter metadata & segmentation',
        description: 'Essential for product managers to export feedback datasets, compute correlation matrices, and import customer demands directly into Jira or Linear.',
        category: 'feature',
        status: 'completed',
        author: user.id,
        upvotes_count: 36,
        comments_count: 1,
        is_pinned: false,
      },
      {
        title: 'Multi-Factor Authentication (TOTP 2FA) & SSO enforcement',
        description: 'Support Google Authenticator and enterprise SAML SSO so enterprise workspace admin panels remain strictly protected against credential stuffing.',
        category: 'feature',
        status: 'under_review',
        author: user.id,
        upvotes_count: 24,
        comments_count: 0,
        is_pinned: false,
      },
      {
        title: 'Touch-optimized mobile gesture navigation and swipe actions',
        description: 'When browsing on mobile smartphones, provide smooth slide gestures to upvote and collapse long descriptions with progressive disclosure.',
        category: 'improvement',
        status: 'under_review',
        author: user.id,
        upvotes_count: 17,
        comments_count: 0,
        is_pinned: false,
      },
      {
        title: 'Rich link unfurling for Figma prototypes and GitHub issues',
        description: 'When contributors paste Figma frame URLs or GitHub pull request links, automatically generate an inline card preview with thumbnail and status.',
        category: 'improvement',
        status: 'planned',
        author: user.id,
        upvotes_count: 31,
        comments_count: 0,
        is_pinned: false,
      },
    ];

    const existing = await pb.collection('posts').getFullList();
    if (existing.length === 0) {
      for (const p of posts) {
        await pb.collection('posts').create(p);
        console.log(`✓ Seeded post: ${p.title}`);
      }
    } else {
      console.log(`PocketBase already contains ${existing.length} posts. Skipping duplicate seeding.`);
    }

    console.log('✓ Seeding completed successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seed();
