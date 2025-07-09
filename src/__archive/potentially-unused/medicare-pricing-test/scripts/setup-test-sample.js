import fs from 'fs';

class TestSampleSetup {
  constructor() {
    this.testDir = './test-data';
    this.dataDir = './data';
    this.outputDir = './test-output';
  }

  async setupTestEnvironment() {
    console.log('🧪 Setting up Medicare pricing test sample...\n');
    
    // Create directories first
    this.createDirectories();
    
    await this.convertSampleData();
    await this.generatePricingData();
    await this.runSampleTests();
    console.log('\n✅ Test sample setup complete!');
  }

  createDirectories() {
    const dirs = [this.testDir, this.dataDir, this.outputDir, './data/providers'];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    });
  }

  async convertSampleData() {
    console.log('🔄 Converting CSV to JSON...');
    this.convertZipCodes();
    this.convertProcedures();
    this.convertLocalities();
    this.convertProviders();
  }

  convertZipCodes() {
    const csvContent = fs.readFileSync(`${this.testDir}/sample-zip-localities.csv`, 'utf8');
    const lines = csvContent.split('\n').slice(1);
    
    const zipData = lines.filter(line => line.trim()).map(line => {
      const [zip_code, locality_code, state_code, county_name, locality_name] = line.split(',');
      return {
        zip_code: zip_code.trim(),
        locality_code: locality_code.trim(),
        state_code: state_code.trim(),
        county_name: county_name.trim(),
        locality_name: locality_name.trim()
      };
    });

    fs.writeFileSync(`${this.dataDir}/zip-localities.json`, JSON.stringify(zipData, null, 2));
    console.log(`  📍 Converted ${zipData.length} ZIP codes`);
  }

  convertProcedures() {
    const csvContent = fs.readFileSync(`${this.testDir}/sample-procedures.csv`, 'utf8');
    const lines = csvContent.split('\n').slice(1);
    
    const procedures = lines.filter(line => line.trim()).map(line => {
      const [cpt_code, description, work_rvu, pe_rvu_facility, pe_rvu_non_facility, mp_rvu, year] = line.split(',');
      return {
        cpt_code: cpt_code.trim(),
        description: description.trim(),
        modality: this.determineModality(description.trim()),
        rvus: {
          work: parseFloat(work_rvu),
          practice_expense_facility: parseFloat(pe_rvu_facility),
          malpractice: parseFloat(mp_rvu)
        }
      };
    });

    fs.writeFileSync(`${this.dataDir}/procedures.json`, JSON.stringify(procedures, null, 2));
    console.log(`  💊 Converted ${procedures.length} procedures`);
  }

  convertLocalities() {
    const csvContent = fs.readFileSync(`${this.testDir}/sample-localities.csv`, 'utf8');
    const lines = csvContent.split('\n').slice(1);
    
    const localities = lines.filter(line => line.trim()).map(line => {
      const [locality_code, locality_name, state, work_gpci, pe_gpci, mp_gpci, year] = line.split(',');
      return {
        locality_code: locality_code.trim(),
        locality_name: locality_name.trim(),
        state_code: state.trim(),
        gpci_factors: {
          work: parseFloat(work_gpci),
          practice_expense: parseFloat(pe_gpci),
          malpractice: parseFloat(mp_gpci)
        }
      };
    });

    fs.writeFileSync(`${this.dataDir}/localities.json`, JSON.stringify(localities, null, 2));
    console.log(`  🏥 Converted ${localities.length} localities`);
  }

  convertProviders() {
    const csvContent = fs.readFileSync(`${this.testDir}/sample-providers.csv`, 'utf8');
    const lines = csvContent.split('\n').slice(1);
    
    const providers = {};
    
    lines.filter(line => line.trim()).forEach(line => {
      const [provider_name, npi, type, zip_codes, default_rate, mri_rate, ct_rate, xray_rate] = line.split(',');
      
      const providerId = `${provider_name.replace(/\s+/g, '').substring(0, 6).toUpperCase()}_${npi.slice(-4)}`;
      const zipCodesArray = zip_codes.replace(/"/g, '').split(',').map(z => z.trim());
      
      providers[providerId] = {
        provider_id: providerId,
        provider_info: {
          name: provider_name.trim(),
          npi: npi.trim(),
          zip_codes: zipCodesArray
        },
        pricing_structure: {
          default_percentage: parseFloat(default_rate),
          modality_rates: {
            MRI: parseFloat(mri_rate || default_rate),
            CT: parseFloat(ct_rate || default_rate),
            'X-Ray': parseFloat(xray_rate || default_rate)
          }
        }
      };
    });

    fs.writeFileSync(`${this.dataDir}/providers/all-providers.json`, JSON.stringify(providers, null, 2));
    console.log(`  🏢 Converted ${Object.keys(providers).length} providers`);
  }

  async generatePricingData() {
    console.log('💰 Generating pricing combinations...');
    
    const zipData = JSON.parse(fs.readFileSync(`${this.dataDir}/zip-localities.json`, 'utf8'));
    const procedures = JSON.parse(fs.readFileSync(`${this.dataDir}/procedures.json`, 'utf8'));
    const localities = JSON.parse(fs.readFileSync(`${this.dataDir}/localities.json`, 'utf8'));

    const conversionFactor = 33.06;
    const usradMarkup = 75.00;
    const hospitalMultiplier = 3.8;

    const masterPricing = {};

    for (const zipInfo of zipData) {
      const locality = localities.find(l => l.locality_code === zipInfo.locality_code);
      if (!locality) continue;

      masterPricing[zipInfo.zip_code] = {};

      for (const procedure of procedures) {
        const workComponent = procedure.rvus.work * locality.gpci_factors.work;
        const peComponent = procedure.rvus.practice_expense_facility * locality.gpci_factors.practice_expense;
        const mpComponent = procedure.rvus.malpractice * locality.gpci_factors.malpractice;
        
        const totalRvu = workComponent + peComponent + mpComponent;
        const medicareRate = totalRvu * conversionFactor;
        const usradPrice = medicareRate + usradMarkup;
        const hospitalEstimate = medicareRate * hospitalMultiplier;
        const patientSavings = hospitalEstimate - usradPrice;
        const savingsPercentage = (patientSavings / hospitalEstimate) * 100;

        masterPricing[zipInfo.zip_code][procedure.cpt_code] = {
          medicare_rate: Math.round(medicareRate * 100) / 100,
          usrad_price: Math.round(usradPrice * 100) / 100,
          hospital_estimate: Math.round(hospitalEstimate * 100) / 100,
          patient_savings: Math.round(patientSavings * 100) / 100,
          savings_percentage: Math.round(savingsPercentage * 10) / 10,
          procedure_info: {
            description: procedure.description,
            modality: procedure.modality
          },
          locality_info: {
            name: `${locality.locality_name}, ${locality.state_code}`
          }
        };
      }
    }

    fs.writeFileSync(`${this.dataDir}/pricing.json`, JSON.stringify(masterPricing, null, 2));
    console.log(`✅ Generated pricing for ${Object.keys(masterPricing).length} ZIP codes`);
  }

  async runSampleTests() {
    console.log('🧪 Running sample tests...');

    const pricingData = JSON.parse(fs.readFileSync(`${this.dataDir}/pricing.json`, 'utf8'));

    const tests = [
      { zip: '10001', cpt: '70551', desc: 'MRI Brain in Manhattan' },
      { zip: '90210', cpt: '71046', desc: 'CT Chest in Beverly Hills' },
      { zip: '75201', cpt: '72148', desc: 'MRI Lumbar in Dallas' }
    ];

    const testResults = [];

    for (const test of tests) {
      const pricing = pricingData[test.zip]?.[test.cpt];
      if (pricing) {
        testResults.push({
          test: test.desc,
          zip_code: test.zip,
          cpt_code: test.cpt,
          medicare_rate: pricing.medicare_rate,
          usrad_price: pricing.usrad_price,
          patient_savings: pricing.patient_savings,
          success: true
        });
      }
    }

    fs.writeFileSync(`${this.outputDir}/test-results.json`, JSON.stringify(testResults, null, 2));
    console.log(`✅ ${testResults.length} tests completed successfully`);
  }

  determineModality(description) {
    const desc = description.toLowerCase();
    if (desc.includes('mri')) return 'MRI';
    if (desc.includes('ct')) return 'CT';
    if (desc.includes('ultrasound')) return 'Ultrasound';
    if (desc.includes('mammography')) return 'Mammography';
    if (desc.includes('x-ray')) return 'X-Ray';
    return 'Other';
  }
}

// Run setup
const setup = new TestSampleSetup();
setup.setupTestEnvironment();