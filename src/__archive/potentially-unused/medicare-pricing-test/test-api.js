import express from 'express';
import fs from 'fs';

const app = express();
const port = 3001;

let pricingData, providers;

try {
  pricingData = JSON.parse(fs.readFileSync('./data/pricing.json', 'utf8'));
  providers = JSON.parse(fs.readFileSync('./data/providers/all-providers.json', 'utf8'));
  console.log('✅ Test data loaded successfully');
} catch (error) {
  console.error('❌ Data not found. Run setup first: node scripts/setup-test-sample.js');
  process.exit(1);
}

app.get('/api/test/pricing', (req, res) => {
  const { zip, cpt } = req.query;
  
  if (!zip || !cpt) {
    return res.status(400).json({ error: 'Missing zip or cpt parameter' });
  }
  
  const pricing = pricingData[zip]?.[cpt];
  
  if (!pricing) {
    return res.status(404).json({ error: 'No pricing data found' });
  }
  
  res.json({
    zip_code: zip,
    cpt_code: cpt,
    ...pricing,
    test_mode: true
  });
});

app.get('/api/test/providers', (req, res) => {
  const providerList = Object.values(providers).map(p => ({
    provider_id: p.provider_id,
    name: p.provider_info.name,
    zip_codes: p.provider_info.zip_codes,
    default_rate: p.pricing_structure.default_percentage
  }));
  
  res.json({
    providers: providerList,
    total: providerList.length
  });
});

app.listen(port, () => {
  console.log(`🧪 Test API running at http://localhost:${port}`);
  console.log('📋 Try these endpoints:');
  console.log(`   http://localhost:${port}/api/test/pricing?zip=10001&cpt=70551`);
  console.log(`   http://localhost:${port}/api/test/providers`);
});