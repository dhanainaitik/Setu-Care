require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// CORS — allow all origins in development.
// A wildcard string '*' breaks credentials, so we use a function that
// echoes back the request's own origin instead.
const corsOrigin = process.env.FRONTEND_URL === '*'
  ? (origin, cb) => cb(null, origin || '*')   // reflect any origin (local dev)
  : process.env.FRONTEND_URL || 'http://localhost:8080';

app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/patients',      require('./routes/patients'));
app.use('/api/doctors',       require('./routes/doctors'));
app.use('/api/records',       require('./routes/records'));
app.use('/api/prescriptions', require('./routes/prescriptions'));
app.use('/api/consultations', require('./routes/consultations'));
app.use('/api/qr',            require('./routes/qr'));
app.use('/api/hospitals',     require('./routes/hospitals'));
app.use('/api/discounts',     require('./routes/discounts'));
app.use('/api/family',        require('./routes/family'));
app.use('/api/admin',         require('./routes/admin'));
app.use('/api/user',          require('./routes/user'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SetuCare API is running', timestamp: new Date() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

// ── Server startup ─────────────────────────────────────────────────────────────
const PORT      = process.env.PORT || 5000;
const USE_HTTPS = process.env.HTTPS === 'true';

if (USE_HTTPS) {
  const https   = require('https');
  const certDir = path.join(__dirname, 'certs');
  const keyFile  = path.join(certDir, 'server.key');
  const certFile = path.join(certDir, 'server.crt');

  if (!fs.existsSync(keyFile) || !fs.existsSync(certFile)) {
    console.error('HTTPS mode: cert files not found in backend/certs/');
    process.exit(1);
  }

  const httpsOptions = {
    key:  fs.readFileSync(keyFile),
    cert: fs.readFileSync(certFile),
  };

  https.createServer(httpsOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`\n SetuCare Server running on port ${PORT} (HTTPS)`);
    console.log(` API: https://192.168.1.11:${PORT}/api`);
    console.log(` API: https://localhost:${PORT}/api`);
    console.log(` Run npm run seed to populate demo data\n`);
  });
} else {
  app.listen(PORT, '0.0.0.0', () => {
    const os = require('os');
    let lanIP = 'localhost';
    if (process.env.LOCAL_LAN_HOST) {
      lanIP = process.env.LOCAL_LAN_HOST;
    } else {
      const nets = os.networkInterfaces();
      for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
          if (net.family === 'IPv4' && !net.internal && net.address !== '127.0.0.1') {
            lanIP = net.address;
            break;
          }
        }
      }
    }

    console.log(`\n🏥  SetuCare Backend`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`LAN:   http://${lanIP}:${PORT}`);
    console.log(`API:   http://${lanIP}:${PORT}/api`);
    console.log(`🌱  Run 'npm run seed' to populate demo data\n`);
  });
}

module.exports = app;


