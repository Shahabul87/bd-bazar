/**
 * This script checks if all required environment variables are set
 * Run with: node scripts/check-env.js
 */

const chalk = require('chalk') || { green: (t) => t, red: (t) => t, yellow: (t) => t, blue: (t) => t };

console.log(chalk.blue('\n===== Checking Environment Variables =====\n'));

// All required environment variables
const requiredVars = {
  // Cloudinary
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME': 'Your Cloudinary cloud name',
  'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET': 'Cloudinary upload preset (create in Cloudinary dashboard)',
  'CLOUDINARY_API_KEY': 'Your Cloudinary API key',
  'CLOUDINARY_API_SECRET': 'Your Cloudinary API secret',
};

let missingVars = [];

// Check for missing variables
for (const [key, description] of Object.entries(requiredVars)) {
  if (!process.env[key]) {
    missingVars.push({ key, description });
    console.log(chalk.red(`❌ Missing: ${key} - ${description}`));
  } else {
    console.log(chalk.green(`✅ Found: ${key}`));
  }
}

console.log('\n');

if (missingVars.length > 0) {
  console.log(chalk.yellow('Some required environment variables are missing!'));
  console.log(chalk.yellow('Please add the following to your .env.local file:\n'));
  
  missingVars.forEach(({ key, description }) => {
    console.log(`${key}="YOUR_${key}_HERE" # ${description}`);
  });
  
  console.log('\nSee CLOUDINARY_SETUP.md for more details on how to obtain these values.');
} else {
  console.log(chalk.green('All required environment variables are set! 🎉'));
}

console.log(chalk.blue('\n===========================================\n')); 