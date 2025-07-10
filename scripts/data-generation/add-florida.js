import fs from 'fs';

class FloridaDatasetGenerator {
  constructor() {
    this.countiesPath = './data/processed/florida-counties.json';
    this.proceduresPath = './data/processed/procedures.json';
    this.gpciPath = './data/processed/florida-gpci-factors.json';
    this.outputPath = './public/data/processed/florida-medicare-pricing-complete.json';
    this.summaryPath = './data/processed/florida-pricing-summary.json';
    this.conversionFactor = 32.3465; // 2025 Medicare conversion factor
  }

  async generate() {
    console.log('🏗️  Generating comprehensive Florida Medicare pricing dataset...');
    console.log('📊 Combining counties, procedures, and GPCI factors...');

    try {
      // Load all processed data
      const counties = JSON.parse(fs.readFileSync(this.countiesPath, 'utf8'));
      const procedures = JSON.parse(fs.readFileSync(this.proceduresPath, 'utf8'));
      const gpciFactors = JSON.parse(fs.readFileSync(this.gpciPath, 'utf8'));

      // Handle counties data structure (object with county names as keys)
      const countiesArray = Object.entries(counties);
      console.log(`📍 Loaded ${countiesArray.length} Florida counties`);
      console.log(`🏥 Loaded ${procedures.length} radiology procedures`);
      console.log(`🌎 Loaded ${gpciFactors.length} GPCI factor sets`);

      // Create GPCI lookup map
      const gpciMap = {};
      gpciFactors.forEach(gpci => {
        gpciMap[gpci.locality_code] = gpci;
      });

      console.log('💰 Calculating Medicare pricing for all combinations...');

      // Generate comprehensive pricing data
      const pricingData = [];
      let calculationCount = 0;

      // For each procedure
      procedures.forEach(procedure => {
        // For each GPCI locality
        gpciFactors.forEach(gpci => {
          const medicareRate = this.calculateMedicareRate(procedure, gpci);
          const usradPricing = this.calculateUSRadPricing(medicareRate);

          pricingData.push({
            // Procedure information
            cpt_code: procedure.cpt_code,
            description: procedure.description,
            modality: procedure.modality,
            
            // Location information
            locality_code: gpci.locality_code,
            locality_name: gpci.locality_name,
            locality_description: gpci.locality_description,
            
            // RVU components
            work_rvu: procedure.work_rvu,
            pe_rvu_facility: procedure.pe_rvu_facility,
            mp_rvu: procedure.mp_rvu,
            
            // GPCI adjustments
            work_gpci: gpci.work_gpci,
            pe_gpci: gpci.practice_expense_gpci,
            mp_gpci: gpci.malpractice_gpci,
            
            // Adjusted RVUs
            adjusted_work_rvu: procedure.work_rvu * gpci.work_gpci,
            adjusted_pe_rvu: procedure.pe_rvu_facility * gpci.practice_expense_gpci,
            adjusted_mp_rvu: procedure.mp_rvu * gpci.malpractice_gpci,
            
            // Final pricing
            total_rvu: medicareRate.total_rvu,
            medicare_rate: medicareRate.medicare_rate,
            usrad_markup: usradPricing.markup,
            usrad_price: usradPricing.usrad_price,
            hospital_estimate: usradPricing.hospital_estimate,
            patient_savings: usradPricing.patient_savings,
            savings_percentage: usradPricing.savings_percentage
          });

          calculationCount++;
        });
      });

      console.log(`🔢 Calculated ${calculationCount} pricing combinations`);

      // Add county mapping information
      console.log('🗺️  Adding county-to-locality mapping...');
      
      // Convert counties object to array format
      const countyMapping = Object.entries(counties).map(([countyName, countyData]) => ({
        county_name: countyName,
        locality_code: `09102_${countyData.locality_code.toString().padStart(2, '0')}`,
        locality_name: countyData.locality_name,
        admin_contractor: countyData.admin_contractor,
        state: 'FL'
      }));

      console.log(`🗺️  Processed ${countyMapping.length} county mappings`);

      // Create final comprehensive dataset
      const comprehensiveDataset = {
        metadata: {
          generated_date: new Date().toISOString(),
          total_procedures: procedures.length,
          total_localities: gpciFactors.length,
          total_counties: Object.keys(counties).length,
          total_pricing_combinations: calculationCount,
          conversion_factor: this.conversionFactor,
          markup_strategy: 'Fixed $75 markup',
          data_sources: [
            'PPRRVU25_JAN.csv - Medicare RVU data',
            'GPCI2025.csv - Geographic adjustments',
            '25LOCCO.csv - County locality mapping'
          ]
        },
        pricing_data: pricingData,
        county_mapping: countyMapping,
        locality_gpci_factors: gpciFactors
      };

      console.log('💾 Saving comprehensive dataset...');

      // Ensure output directory exists
      if (!fs.existsSync('./data/processed')) {
        fs.mkdirSync('./data/processed', { recursive: true });
      }

      // Save the comprehensive dataset
      fs.writeFileSync(this.outputPath, JSON.stringify(comprehensiveDataset, null, 2));
      console.log(`📄 Complete dataset saved to: ${this.outputPath}`);

      // Generate summary statistics
      const summary = this.generateSummary(comprehensiveDataset);
      fs.writeFileSync(this.summaryPath, JSON.stringify(summary, null, 2));
      console.log(`📊 Summary saved to: ${this.summaryPath}`);

      this.displaySummary(summary);

      console.log('✅ Florida Medicare pricing dataset generation complete!');
      return comprehensiveDataset;

    } catch (error) {
      console.error('❌ Error generating comprehensive dataset:', error.message);
      throw error;
    }
  }

  calculateMedicareRate(procedure, gpci) {
    // Calculate geographic adjustments
    const adjustedWorkRVU = procedure.work_rvu * gpci.work_gpci;
    const adjustedPERVU = procedure.pe_rvu_facility * gpci.practice_expense_gpci;
    const adjustedMPRVU = procedure.mp_rvu * gpci.malpractice_gpci;
    
    // Total adjusted RVU
    const totalRVU = adjustedWorkRVU + adjustedPERVU + adjustedMPRVU;
    
    // Convert to dollars using conversion factor
    const medicareRate = totalRVU * this.conversionFactor;

    return {
      total_rvu: Math.round(totalRVU * 100) / 100,
      medicare_rate: Math.round(medicareRate * 100) / 100
    };
  }

  calculateUSRadPricing(medicareRate) {
    const markup = 75; // Fixed $75 markup
    const usradPrice = medicareRate.medicare_rate + markup;
    
    // Estimate typical hospital pricing (3-4x Medicare)
    const hospitalEstimate = parseFloat((Math.max(medicareRate.medicare_rate * 5.0, usradPrice + 50)).toFixed(2));
    const patientSavings = hospitalEstimate - usradPrice;
    const savingsPercentage = Math.round((patientSavings / hospitalEstimate) * 100);

    return {
      markup: markup,
      usrad_price: Math.round(usradPrice * 100) / 100,
      hospital_estimate: Math.round(hospitalEstimate * 100) / 100,
      patient_savings: Math.round(patientSavings * 100) / 100,
      savings_percentage: savingsPercentage
    };
  }

  generateSummary(dataset) {
    const pricingData = dataset.pricing_data;
    
    // Summary statistics
    const totalCombinations = pricingData.length;
    const avgMedicareRate = pricingData.reduce((sum, p) => sum + p.medicare_rate, 0) / totalCombinations;
    const avgUSRadPrice = pricingData.reduce((sum, p) => sum + p.usrad_price, 0) / totalCombinations;
    const avgSavings = pricingData.reduce((sum, p) => sum + p.patient_savings, 0) / totalCombinations;

    // By modality statistics
    const modalityStats = {};
    pricingData.forEach(p => {
      if (!modalityStats[p.modality]) {
        modalityStats[p.modality] = {
          count: 0,
          total_medicare: 0,
          total_usrad: 0,
          total_savings: 0
        };
      }
      modalityStats[p.modality].count++;
      modalityStats[p.modality].total_medicare += p.medicare_rate;
      modalityStats[p.modality].total_usrad += p.usrad_price;
      modalityStats[p.modality].total_savings += p.patient_savings;
    });

    Object.keys(modalityStats).forEach(modality => {
      const stats = modalityStats[modality];
      stats.avg_medicare = Math.round((stats.total_medicare / stats.count) * 100) / 100;
      stats.avg_usrad = Math.round((stats.total_usrad / stats.count) * 100) / 100;
      stats.avg_savings = Math.round((stats.total_savings / stats.count) * 100) / 100;
    });

    // High-value procedures
    const highValueProcedures = pricingData
      .filter(p => p.medicare_rate > 300)
      .sort((a, b) => b.medicare_rate - a.medicare_rate)
      .slice(0, 10)
      .map(p => ({
        cpt: p.cpt_code,
        description: p.description.substring(0, 40) + '...',
        modality: p.modality,
        locality: p.locality_description,
        medicare_rate: p.medicare_rate,
        usrad_price: p.usrad_price,
        savings: p.patient_savings
      }));

    // Geographic pricing differences
    const locationStats = {};
    dataset.locality_gpci_factors.forEach(locality => {
      const locationPricing = pricingData.filter(p => p.locality_code === locality.locality_code);
      const avgPrice = locationPricing.reduce((sum, p) => sum + p.usrad_price, 0) / locationPricing.length;
      
      locationStats[locality.locality_description] = {
        locality_code: locality.locality_code,
        avg_usrad_price: Math.round(avgPrice * 100) / 100,
        total_procedures: locationPricing.length,
        gpci_adjustment: locality.total_adjustment
      };
    });

    return {
      overview: {
        total_pricing_combinations: totalCombinations,
        unique_procedures: dataset.metadata.total_procedures,
        florida_localities: dataset.metadata.total_localities,
        florida_counties: dataset.metadata.total_counties
      },
      pricing_averages: {
        medicare_rate: Math.round(avgMedicareRate * 100) / 100,
        usrad_price: Math.round(avgUSRadPrice * 100) / 100,
        patient_savings: Math.round(avgSavings * 100) / 100,
        savings_percentage: Math.round((avgSavings / (avgUSRadPrice + avgSavings)) * 100)
      },
      modality_breakdown: modalityStats,
      geographic_differences: locationStats,
      high_value_procedures: highValueProcedures,
      business_insights: {
        highest_margin_modality: Object.keys(modalityStats).reduce((a, b) => 
          modalityStats[a].avg_savings > modalityStats[b].avg_savings ? a : b),
        most_procedures: Object.keys(modalityStats).reduce((a, b) => 
          modalityStats[a].count > modalityStats[b].count ? a : b),
        price_range: {
          min: Math.min(...pricingData.map(p => p.usrad_price)),
          max: Math.max(...pricingData.map(p => p.usrad_price))
        }
      },
      generated_date: new Date().toISOString()
    };
  }

  displaySummary(summary) {
    console.log('\n📈 FLORIDA MEDICARE PRICING DATASET SUMMARY:');
    console.log('=============================================');
    console.log(`Total pricing combinations: ${summary.overview.total_pricing_combinations.toLocaleString()}`);
    console.log(`Unique procedures: ${summary.overview.unique_procedures}`);
    console.log(`Florida localities: ${summary.overview.florida_localities}`);
    console.log(`Florida counties: ${summary.overview.florida_counties}`);

    console.log('\n💰 Average Pricing:');
    console.log(`Medicare rate: $${summary.pricing_averages.medicare_rate}`);
    console.log(`USRad price: $${summary.pricing_averages.usrad_price}`);
    console.log(`Patient savings: $${summary.pricing_averages.patient_savings} (${summary.pricing_averages.savings_percentage}%)`);

    console.log('\n🏥 By Modality:');
    Object.entries(summary.modality_breakdown).forEach(([modality, stats]) => {
      console.log(`  ${modality}: ${stats.count} procedures, avg USRad price $${stats.avg_usrad}`);
    });

    console.log('\n📍 Geographic Differences:');
    Object.entries(summary.geographic_differences).forEach(([location, stats]) => {
      console.log(`  ${location}: avg $${stats.avg_usrad_price}`);
    });

    console.log('\n🎯 Business Insights:');
    console.log(`Highest margin modality: ${summary.business_insights.highest_margin_modality}`);
    console.log(`Most procedures: ${summary.business_insights.most_procedures}`);
    console.log(`Price range: $${summary.business_insights.price_range.min} - $${summary.business_insights.price_range.max}`);

    if (summary.high_value_procedures.length > 0) {
      console.log('\n💎 Top High-Value Procedures:');
      summary.high_value_procedures.slice(0, 5).forEach(proc => {
        console.log(`  ${proc.cpt} (${proc.modality}): $${proc.medicare_rate} → $${proc.usrad_price} (save $${proc.savings})`);
      });
    }
  }
}

// Execute the generator
const generator = new FloridaDatasetGenerator();
generator.generate()
  .then(() => {
    console.log('🎉 Florida Medicare pricing dataset generation completed successfully!');
  })
  .catch(error => {
    console.error('💥 Dataset generation failed:', error);
    process.exit(1);
  });