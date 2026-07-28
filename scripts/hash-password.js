const crypto = require('crypto');

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error('Usage: npm run admin:hash -- "at-least-12-character-password"');
  process.exit(1);
}

const salt = crypto.randomBytes(24).toString('hex');
const hash = crypto.pbkdf2Sync(password, salt, 210000, 64, 'sha512').toString('hex');
console.log(`${salt}:${hash}`);
