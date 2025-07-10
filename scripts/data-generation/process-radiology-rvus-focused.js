import fs from 'fs';
import Papa from 'papaparse';

class FixedRadiologyProcessor {
  constructor() {
    this.rawDataPath = './data/raw/PPRRVU25_JAN.csv';
    this.outputPath = './data/processed/procedures.json';  // ✅ UPDATED: Changed from radiology-procedures.json
    this.summaryPath = './data/processed/radiology-procedures-summary.json';
    
    // Your specific radiology CPT codes from the PDF
    this.targetCPTCodes = [
      // CT Procedures
      '74150', '74160', '74170', '74176', '74177', '74174', '74175', '70496', '73706', '70498',
      '74178', '71275', '72191', '72192', '72193', '72194', '74261', '74262', '74263', '75571',
      '75572', '75573', '75574', '70486', '70487', '70488', '70490', '70491', '70492', '71250',
      '71260', '71270', '72125', '72126', '72127', '72128', '72129', '72130', '72131', '72132',
      '72133', '73200', '73201', '73202', '73206', '73700', '73701', '73702', '74018', '74019',
      '74021', '74022', '70450', '70460', '70470', '71245', '72128', '74176', '75635',
      
      // MRI Procedures  
      '74185', '70551', '72141', '72142', '72156', '72157', '72158', '73718', '73719', '73720',
      '73721', '73722', '73723', '70552', '70553', '70554', '70555', '70557', '70558', '70559',
      '71550', '71551', '71552', '71555', '72148', '72149', '72158', '72159', '73218', '73219',
      '73220', '73221', '73222', '73223', '73225', '76498', '77058', '77059', '72195', '72196',
      '72197', '74181', '74182', '74183', '72143', '72144', '72145', '72146', '72147', '72148',
      '72149', '72156', '72157', '72158', '73218', '73219', '73220', '73221', '73222', '73223',
      '74181', '74182', '74183', '77046', '77047', '77048', '77049', '76390', '76391', '76392',
      
      // X-Ray Procedures
      '74018', '73560', '71045', '71046', '71047', '71048', '72020', '72040', '72050', '72052',
      '72070', '72072', '72074', '72080', '72081', '72082', '72083', '72084', '72100', '72110',
      '72114', '72120', '73000', '73010', '73020', '73030', '73040', '73050', '73060', '73070',
      '73080', '73085', '73090', '73092', '73100', '73110', '73115', '73120', '73130', '73140',
      '73500', '73510', '73520', '73525', '73530', '73540', '73550', '73560', '73564', '73565',
      '73580', '73590', '73592', '73600', '73610', '73615', '73620', '73630', '73650', '73660',
      '74000', '74010', '74018', '74019', '74020', '74021', '74022', '74210', '74220', '74230',
      '74240', '74241', '74245', '74246', '74247', '74249', '74250', '74251', '74270', '74280',
      '74283', '74290', '74291', '74300', '74301', '74305', '74320', '74327', '74328', '74329',
      '74330', '74340', '74355', '74360', '74363', '76010', '76020', '76040', '76041', '76042',
      
      // Ultrasound Procedures
      '76700', '76705', '93306', '93307', '93308', '93312', '93313', '93314', '93315', '93316',
      '93317', '93318', '93320', '93321', '93325', '76506', '76510', '76511', '76512', '76513',
      '76514', '76516', '76519', '76529', '76536', '76604', '76700', '76705', '76770', '76775',
      '76801', '76802', '76805', '76810', '76811', '76812', '76813', '76814', '76815', '76816',
      '76817', '76818', '76819', '76820', '76821', '76825', '76826', '76827', '76828', '76830',
      
      // Nuclear Medicine/PET
      '78452', '78815', '78814', '78816', '78608', '78811', '78812', '78813', '78430', '78431',
      '78432', '78433', '78434', '78459', '78491', '78492', '78494', '78496', '78499', '78579',
      '78580', '78582', '78583', '78584', '78585', '78586', '78587', '78588', '78591', '78592',
      '78593', '78594', '78596', '78599', '78600', '78601', '78605', '78606', '78607', '78608',
      '78609', '78610', '78630', '78635', '78645', '78647', '78650', '78660', '78700', '78701',
      '78707', '78708', '78709', '78710', '78725', '78730', '78740', '78761', '78799', '78803',
      
      // Mammography
      '77063', '77067', '77065', '77066', '77061', '77062', '77051', '77052',
      
      // Fluoroscopy/Special Procedures
      '74270', '74280', '74283', '76000', '76001', '76010', '76080', '76120', '76125'
    ];
    
    this.modalityMapping = {
      // CT codes
      '74150': 'CT', '74160': 'CT', '74170': 'CT', '74176': 'CT', '74177': 'CT', '74174': 'CT', '74175': 'CT',
      '70496': 'CT', '73706': 'CT', '70498': 'CT', '74178': 'CT', '71275': 'CT', '72191': 'CT', '72192': 'CT',
      '72193': 'CT', '72194': 'CT', '74261': 'CT', '74262': 'CT', '74263': 'CT', '75571': 'CT', '75572': 'CT',
      '75573': 'CT', '75574': 'CT', '70486': 'CT', '70487': 'CT', '70488': 'CT', '70490': 'CT', '70491': 'CT',
      '70492': 'CT', '71250': 'CT', '71260': 'CT', '71270': 'CT', '72125': 'CT', '72126': 'CT', '72127': 'CT',
      '72128': 'CT', '72129': 'CT', '72130': 'CT', '72131': 'CT', '72132': 'CT', '72133': 'CT', '73200': 'CT',
      '73201': 'CT', '73202': 'CT', '73206': 'CT', '73700': 'CT', '73701': 'CT', '73702': 'CT', '74018': 'CT',
      '74019': 'CT', '74021': 'CT', '74022': 'CT', '70450': 'CT', '70460': 'CT', '70470': 'CT', '71245': 'CT',
      '75635': 'CT',
      
      // MRI codes
      '74185': 'MRI', '70551': 'MRI', '72141': 'MRI', '72142': 'MRI', '72156': 'MRI', '72157': 'MRI', '72158': 'MRI',
      '73718': 'MRI', '73719': 'MRI', '73720': 'MRI', '73721': 'MRI', '73722': 'MRI', '73723': 'MRI', '70552': 'MRI',
      '70553': 'MRI', '70554': 'MRI', '70555': 'MRI', '70557': 'MRI', '70558': 'MRI', '70559': 'MRI', '71550': 'MRI',
      '71551': 'MRI', '71552': 'MRI', '71555': 'MRI', '72148': 'MRI', '72149': 'MRI', '72159': 'MRI', '73218': 'MRI',
      '73219': 'MRI', '73220': 'MRI', '73221': 'MRI', '73222': 'MRI', '73223': 'MRI', '73225': 'MRI', '76498': 'MRI',
      '77058': 'MRI', '77059': 'MRI', '72195': 'MRI', '72196': 'MRI', '72197': 'MRI', '74181': 'MRI', '74182': 'MRI',
      '74183': 'MRI', '72143': 'MRI', '72144': 'MRI', '72145': 'MRI', '72146': 'MRI', '72147': 'MRI', '77046': 'MRI',
      '77047': 'MRI', '77048': 'MRI', '77049': 'MRI', '76390': 'MRI', '76391': 'MRI', '76392': 'MRI',
      
      // Ultrasound codes
      '76700': 'Ultrasound', '76705': 'Ultrasound', '93306': 'Ultrasound', '93307': 'Ultrasound', '93308': 'Ultrasound',
      '93312': 'Ultrasound', '93313': 'Ultrasound', '93314': 'Ultrasound', '93315': 'Ultrasound', '93316': 'Ultrasound',
      '93317': 'Ultrasound', '93318': 'Ultrasound', '93320': 'Ultrasound', '93321': 'Ultrasound', '93325': 'Ultrasound',
      '76506': 'Ultrasound', '76510': 'Ultrasound', '76511': 'Ultrasound', '76512': 'Ultrasound', '76513': 'Ultrasound',
      '76514': 'Ultrasound', '76516': 'Ultrasound', '76519': 'Ultrasound', '76529': 'Ultrasound', '76536': 'Ultrasound',
      '76604': 'Ultrasound', '76770': 'Ultrasound', '76775': 'Ultrasound', '76801': 'Ultrasound', '76802': 'Ultrasound',
      '76805': 'Ultrasound', '76810': 'Ultrasound', '76811': 'Ultrasound', '76812': 'Ultrasound', '76813': 'Ultrasound',
      '76814': 'Ultrasound', '76815': 'Ultrasound', '76816': 'Ultrasound', '76817': 'Ultrasound', '76818': 'Ultrasound',
      '76819': 'Ultrasound', '76820': 'Ultrasound', '76821': 'Ultrasound', '76825': 'Ultrasound', '76826': 'Ultrasound',
      '76827': 'Ultrasound', '76828': 'Ultrasound', '76830': 'Ultrasound',
      
      // Nuclear Medicine/PET codes
      '78452': 'Nuclear Medicine', '78815': 'PET/CT', '78814': 'PET/CT', '78816': 'PET/CT', '78608': 'PET/CT',
      '78811': 'Nuclear Medicine', '78812': 'Nuclear Medicine', '78813': 'Nuclear Medicine', '78430': 'Nuclear Medicine',
      '78431': 'Nuclear Medicine', '78432': 'Nuclear Medicine', '78433': 'Nuclear Medicine', '78434': 'Nuclear Medicine',
      '78459': 'Nuclear Medicine', '78491': 'Nuclear Medicine', '78492': 'Nuclear Medicine', '78494': 'Nuclear Medicine',
      '78496': 'Nuclear Medicine', '78499': 'Nuclear Medicine', '78579': 'Nuclear Medicine', '78580': 'Nuclear Medicine',
      
      // Mammography codes
      '77063': 'Mammography', '77067': 'Mammography', '77065': 'Mammography', '77066': 'Mammography',
      '77061': 'Mammography', '77062': 'Mammography', '77051': 'Mammography', '77052': 'Mammography',
      
      // X-Ray codes (sampling - there are many)
      '71045': 'X-Ray', '71046': 'X-Ray', '71047': 'X-Ray', '71048': 'X-Ray', '72020': 'X-Ray', '72040': 'X-Ray',
      '72050': 'X-Ray', '72052': 'X-Ray', '72070': 'X-Ray', '72072': 'X-Ray', '72074': 'X-Ray', '72080': 'X-Ray',
      '73000': 'X-Ray', '73010': 'X-Ray', '73020': 'X-Ray', '73030': 'X-Ray', '73040': 'X-Ray', '73050': 'X-Ray',
      '74000': 'X-Ray', '74010': 'X-Ray', '74020': 'X-Ray', '76010': 'X-Ray', '76020': 'X-Ray', '76040': 'X-Ray',
      
      // Fluoroscopy
      '74270': 'Fluoroscopy', '74280': 'Fluoroscopy', '74283': 'Fluoroscopy', '76000': 'Fluoroscopy',
      '76001': 'Fluoroscopy', '76080': 'Fluoroscopy', '76120': 'Fluoroscopy', '76125': 'Fluoroscopy'
    };
  }

  async process() {
    console.log('🏥 Processing Focused Radiology RVUs from PPRRVU25_JAN.csv...');
    console.log(`🎯 Looking for ${this.targetCPTCodes.length} specific radiology procedures`);

    try {
      // Read the CSV content
      const csvContent = fs.readFileSync(this.rawDataPath, 'utf8');
      
      // The Medicare file has header rows that need to be skipped
      // Find the line that starts with "HCPCS" - that's our header row
      const lines = csvContent.split('\n');
      let headerLineIndex = -1;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('HCPCS')) {
          headerLineIndex = i;
          break;
        }
      }
      
      if (headerLineIndex === -1) {
        throw new Error('Could not find HCPCS header row in Medicare file');
      }
      
      console.log(`📍 Found header row at line ${headerLineIndex + 1}`);
      
      // Extract the data from the header line onwards
      const dataContent = lines.slice(headerLineIndex).join('\n');
      
      // Parse the CSV with proper headers
      const parsed = Papa.parse(dataContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false
      });

      console.log(`📊 Loaded ${parsed.data.length} total procedures from Medicare RVU file`);
      
      // Check column names
      const columns = Object.keys(parsed.data[0] || {});
      console.log('📋 Available columns:', columns.slice(0, 10)); // Show first 10 columns
      
      console.log('🔍 Filtering for your specific radiology procedures...');
      
      // Filter for our target CPT codes
      const radiologyProcedures = parsed.data.filter(row => {
        const cptCode = row.HCPCS?.toString().trim();
        return this.targetCPTCodes.includes(cptCode);
      });

      console.log(`✅ Found ${radiologyProcedures.length} of ${this.targetCPTCodes.length} target procedures`);
      
      // Show which procedures we found and which are missing
      const foundCodes = radiologyProcedures.map(p => p.HCPCS);
      const missingCodes = this.targetCPTCodes.filter(code => !foundCodes.includes(code));
      
      if (missingCodes.length > 0) {
        console.log(`⚠️  Could not find ${missingCodes.length} procedures in Medicare file:`);
        console.log(`   Missing codes: ${missingCodes.slice(0, 10).join(', ')}${missingCodes.length > 10 ? '...' : ''}`);
      }

      // ✅ NEW: Filter out contractor-priced procedures (status 'C') - they have no standard RVUs
      console.log('🚫 Filtering out contractor-priced procedures (Status C)...');
      const validProcedures = radiologyProcedures.filter(procedure => {
        const statusCode = procedure.CODE?.toString().trim() || '';
        
        // Only include procedures with standard Medicare RVUs
        // Status 'A' = Active with RVUs
        // Status 'I' = Invalid for Medicare but has RVUs for reference  
        // Status 'C' = Contractor priced (no standard RVUs) - EXCLUDE these
        return statusCode === 'A' || statusCode === 'I';
      });

      const excludedCount = radiologyProcedures.length - validProcedures.length;
      console.log(`📊 Filtered procedures:`);
      console.log(`   Total found: ${radiologyProcedures.length}`);
      console.log(`   Valid (A/I): ${validProcedures.length}`);
      console.log(`   Excluded (C): ${excludedCount}`);

      // Show sample excluded procedures
      const excludedProcedures = radiologyProcedures.filter(procedure => {
        const statusCode = procedure.CODE?.toString().trim() || '';
        return statusCode === 'C';
      });

      if (excludedProcedures.length > 0) {
        console.log('\n📋 Sample excluded procedures (Status C - Contractor Priced):');
        excludedProcedures.slice(0, 5).forEach(proc => {
          console.log(`   ${proc.HCPCS}: ${proc.DESCRIPTION}`);
        });
        if (excludedProcedures.length > 5) {
          console.log(`   ... and ${excludedProcedures.length - 5} more`);
        }
      }

      console.log('\n🔧 Enhancing procedures with modality and categorization...');
      
      // Enhance the valid procedures with additional metadata
      const enhancedProcedures = validProcedures.map(procedure => {
        const cptCode = procedure.HCPCS?.toString().trim();
        const modality = this.modalityMapping[cptCode] || 'Other';
        
        return {
          cpt_code: cptCode,
          description: procedure.DESCRIPTION?.toString().trim() || '',
          modality: modality,
          work_rvu: parseFloat(procedure.RVU) || 0,  // ✅ CORRECT
          pe_rvu_facility: parseFloat(procedure['PE RVU_1']) || 0,  // ✅ CORRECT  
          pe_rvu_non_facility: parseFloat(procedure['PE RVU']) || 0,  // ✅ CORRECT
          mp_rvu: parseFloat(procedure.RVU_1) || 0,  // ✅ CORRECT (malpractice)
          total_facility: parseFloat(procedure.TOTAL_1) || 0,  // ✅ CORRECT
          total_non_facility: parseFloat(procedure.TOTAL) || 0,  // ✅ CORRECT
          status_code: procedure.CODE?.toString().trim() || '',  // ✅ CORRECT
          global_days: procedure.DAYS?.toString().trim() || '',  // ✅ CORRECT
          conversion_factor: parseFloat(procedure.FACTOR) || 32.3465,  // ✅ NEW: Conversion factor
          original_data: procedure
        };
      });

      console.log('💾 Saving processed radiology procedures...');
      
      // Ensure output directory exists
      if (!fs.existsSync('./data/processed')) {
        fs.mkdirSync('./data/processed', { recursive: true });
      }

      // ✅ UPDATED: Save to procedures.json (matching Georgia script expectations)
      fs.writeFileSync(this.outputPath, JSON.stringify(enhancedProcedures, null, 2));
      console.log(`📄 Clean procedures saved to: ${this.outputPath}`);

      // Generate summary statistics
      const summary = this.generateSummary(enhancedProcedures, excludedCount);
      fs.writeFileSync(this.summaryPath, JSON.stringify(summary, null, 2));
      console.log(`📊 Summary saved to: ${this.summaryPath}`);

      this.displaySummary(summary);
      
      console.log('✅ Focused radiology RVU processing complete!');
      console.log(`🎯 Result: ${enhancedProcedures.length} valid procedures ready for state pricing generation`);
      return enhancedProcedures;

    } catch (error) {
      console.error('❌ Error processing radiology procedures:', error.message);
      throw error;
    }
  }

  generateSummary(procedures, excludedCount) {
    const totalProcedures = procedures.length;
    
    // Group by modality
    const byModality = procedures.reduce((acc, proc) => {
      acc[proc.modality] = (acc[proc.modality] || 0) + 1;
      return acc;
    }, {});

    // Group by status code
    const byStatus = procedures.reduce((acc, proc) => {
      acc[proc.status_code] = (acc[proc.status_code] || 0) + 1;
      return acc;
    }, {});

    // Calculate averages
    const avgWorkRVU = procedures.reduce((sum, p) => sum + p.work_rvu, 0) / totalProcedures;
    const avgPERVU = procedures.reduce((sum, p) => sum + p.pe_rvu_facility, 0) / totalProcedures;

    // Common high-value procedures
    const highValueProcs = procedures
      .filter(p => p.total_facility > 5)
      .sort((a, b) => b.total_facility - a.total_facility)
      .slice(0, 10);

    return {
      total_procedures: totalProcedures,
      excluded_procedures: excludedCount,
      procedures_by_modality: byModality,
      procedures_by_status: byStatus,
      average_work_rvu: Math.round(avgWorkRVU * 100) / 100,
      average_pe_rvu: Math.round(avgPERVU * 100) / 100,
      high_value_procedures: highValueProcs.map(p => ({
        cpt: p.cpt_code,
        description: p.description.substring(0, 50) + '...',
        modality: p.modality,
        total_rvu: p.total_facility
      })),
      missing_procedures_count: this.targetCPTCodes.length - totalProcedures - excludedCount,
      processing_date: new Date().toISOString()
    };
  }

  displaySummary(summary) {
    console.log('\n📈 CLEANED RADIOLOGY PROCEDURES SUMMARY:');
    console.log('==========================================');
    console.log(`✅ Valid procedures: ${summary.total_procedures}`);
    console.log(`❌ Excluded (Status C): ${summary.excluded_procedures}`);
    console.log(`⚠️  Missing from Medicare: ${summary.missing_procedures_count}`);
    console.log(`📊 Average Work RVU: ${summary.average_work_rvu}`);
    console.log(`📊 Average PE RVU: ${summary.average_pe_rvu}`);
    
    console.log('\n🏥 Procedures by Modality:');
    Object.entries(summary.procedures_by_modality).forEach(([modality, count]) => {
      console.log(`  ${modality}: ${count} procedures`);
    });

    console.log('\n📋 Procedures by Status Code:');
    Object.entries(summary.procedures_by_status).forEach(([status, count]) => {
      console.log(`  Status '${status}': ${count} procedures`);
    });

    if (summary.high_value_procedures.length > 0) {
      console.log('\n💰 Top High-Value Procedures:');
      summary.high_value_procedures.slice(0, 5).forEach(proc => {
        console.log(`  ${proc.cpt} (${proc.modality}): ${proc.total_rvu} RVU - ${proc.description}`);
      });
    }
  }
}

// Execute the processor
const processor = new FixedRadiologyProcessor();
processor.process()
  .then(() => {
    console.log('🎉 Clean radiology RVU processing completed successfully!');
    console.log('🚀 Ready to generate state pricing with valid procedures only!');
  })
  .catch(error => {
    console.error('💥 Processing failed:', error);
    process.exit(1);
  });