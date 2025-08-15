// facilityUploadHandler.js - Handles bulk facility uploads

export class FacilityUploadHandler {
  constructor() {
    this.requiredHeaders = [
      'Facility Name',
      'Address',
      'City',
      'State',
      'ZIP Code'
    ];
  }

  async parseExcelFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const fileType = file.name.split('.').pop().toLowerCase();

      reader.onload = async (e) => {
        try {
          let data;
          
          if (fileType === 'csv') {
            data = this.parseCSV(e.target.result);
          } else {
            data = await this.parseExcel(e.target.result);
          }
          
          const validated = this.validateAndTransform(data);
          resolve(validated);
        } catch (error) {
          reject(error);
        }
      };

      if (fileType === 'csv') {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  }

  parseCSV(text) {
    // Simple CSV parser - in production, use Papa Parse
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }
    
    return data;
  }

  parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    values.push(current.trim());
    return values;
  }

  async parseExcel(arrayBuffer) {
    // This would use SheetJS (xlsx) library
    // For now, throw error indicating Excel support needs library
    throw new Error('Excel file support requires SheetJS library. Please use CSV format or include the xlsx library.');
  }

  validateAndTransform(data) {
    const errors = [];
    const validFacilities = [];
    
    // Check headers
    const headers = Object.keys(data[0] || {});
    const missingHeaders = this.requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
    }
    
    // Validate each row
    data.forEach((row, index) => {
      const rowErrors = this.validateRow(row, index + 2); // +2 for header and 0-index
      
      if (rowErrors.length === 0) {
        validFacilities.push(this.transformRow(row));
      } else {
        errors.push(...rowErrors);
      }
    });
    
    if (errors.length > 0) {
      const errorSummary = errors.slice(0, 5).join('\n');
      const moreErrors = errors.length > 5 ? `\n... and ${errors.length - 5} more errors` : '';
      throw new Error(`Validation errors:\n${errorSummary}${moreErrors}`);
    }
    
    return validFacilities;
  }

  validateRow(row, rowNumber) {
    const errors = [];
    
    // Required fields
    this.requiredHeaders.forEach(field => {
      if (!row[field] || row[field].toString().trim() === '') {
        errors.push(`Row ${rowNumber}: ${field} is required`);
      }
    });
    
    // State validation
    if (row['State'] && !/^[A-Z]{2}$/i.test(row['State'].toString().trim())) {
      errors.push(`Row ${rowNumber}: State must be 2-letter code (e.g., FL)`);
    }
    
    // ZIP validation
    if (row['ZIP Code'] && !/^\d{5}(-\d{4})?$/.test(row['ZIP Code'].toString())) {
      errors.push(`Row ${rowNumber}: Invalid ZIP code format`);
    }
    
    return errors;
  }

  transformRow(row) {
    // Transform to match your data structure
    return {
      id: `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: row['Facility Name'].trim(),
      address: row['Address'].trim(),
      city: row['City'].trim(),
      state: row['State'].toUpperCase().trim(),
      zipCode: row['ZIP Code'].toString().trim(), // Note: using zipCode not zip_code
      phone: row['Phone'] || '',
      acrId: row['ACR Facility ID'] || '',
      equipment: row['Equipment/Modalities'] ? row['Equipment/Modalities'].split(';').map(e => e.trim()) : [],
      equipmentBrands: row['Equipment Brands'] || '',
      isPrimary: (row['Is Primary (Y/N)'] || '').toUpperCase() === 'Y',
      isAcrVerified: (row['Is ACR Verified (Y/N)'] || '').toUpperCase() === 'Y',
      administrator: {
        name: 'TBD',
        email: 'admin@example.com'
      },
      created_at: new Date().toISOString()
    };
  }

  generateTemplate() {
    const headers = [
      'Facility Name',
      'Address',
      'City',
      'State',
      'ZIP Code',
      'Phone',
      'ACR Facility ID',
      'Equipment/Modalities',
      'Equipment Brands',
      'Is Primary (Y/N)',
      'Is ACR Verified (Y/N)'
    ];
    
    const sampleData = [
      [
        'Advanced Imaging Center - Main',
        '123 Medical Plaza',
        'Miami',
        'FL',
        '33101',
        '(305) 555-0100',
        'ACR123456',
        'MRI;CT;X-Ray',
        'GE;Siemens',
        'Y',
        'Y'
      ],
      [
        'Advanced Imaging Center - North',
        '456 Healthcare Blvd',
        'Fort Lauderdale',
        'FL',
        '33301',
        '(954) 555-0200',
        'ACR123457',
        'MRI;CT',
        'Philips',
        'N',
        'Y'
      ]
    ];
    
    // Generate CSV
    const csv = [headers, ...sampleData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    return {
      csv,
      filename: 'usrad_facility_template.csv'
    };
  }
}

// Make individual functions available globally
window.parseExcelFile = async function(file) {
  const handler = new FacilityUploadHandler();
  return handler.parseExcelFile(file);
};

window.downloadFacilityTemplate = function() {
  const handler = new FacilityUploadHandler();
  const template = handler.generateTemplate();
  
  const blob = new Blob([template.csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = template.filename;
  a.click();
  URL.revokeObjectURL(url);
};

window.displayUploadResults = function(facilities) {
  const resultsDiv = document.getElementById('upload-results');
  if (!resultsDiv) return;
  
  resultsDiv.innerHTML = `
    <div class="upload-success" style="background: #f0fdf4; border: 1px solid #86efac; padding: 1.5rem; border-radius: 0.5rem;">
      <div class="success-header" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <div class="success-icon-container" style="width: 2.5rem; height: 2.5rem; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg style="width: 1.25rem; height: 1.25rem; color: white;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #065f46;">Successfully parsed ${facilities.length} facilities!</h4>
      </div>
      
      <div style="background: white; padding: 1rem; border-radius: 0.375rem; margin-bottom: 1rem; border: 1px solid #d1d5db;">
        <h5 style="font-weight: 600; margin: 0 0 0.5rem 0; color: #374151; font-size: 0.875rem;">Preview:</h5>
        <div style="display: flex; flex-direction: column; gap: 0.375rem;">
          ${facilities.slice(0, 3).map(f => `
            <div style="display: flex; align-items: center; gap: 0.5rem; color: #4b5563; font-size: 0.875rem;">
              <svg style="width: 1rem; height: 1rem; color: #9ca3af; flex-shrink: 0;" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>${f.name} - ${f.city}, ${f.state}</span>
            </div>
          `).join('')}
          ${facilities.length > 3 ? `
            <div style="color: #6b7280; font-style: italic; font-size: 0.875rem; margin-left: 1.5rem;">
              ... and ${facilities.length - 3} more
            </div>
          ` : ''}
        </div>
      </div>
      
      <div style="display: flex; gap: 0.75rem;">
        <button onclick="confirmBulkUpload()" style="padding: 0.5rem 1.25rem; background: #3b82f6; color: white; border: none; border-radius: 0.375rem; font-weight: 500; cursor: pointer;">
          Import All ${facilities.length} Facilities
        </button>
        <button onclick="cancelBulkUpload()" style="padding: 0.5rem 1.25rem; background: white; color: #374151; border: 1px solid #d1d5db; border-radius: 0.375rem; font-weight: 500; cursor: pointer;">
          Cancel
        </button>
      </div>
    </div>
  `;
  
  // Store parsed facilities temporarily
  window.tempBulkFacilities = facilities;
};

window.displayUploadError = function(error) {
  const resultsDiv = document.getElementById('upload-results');
  if (!resultsDiv) return;
  
  resultsDiv.innerHTML = `
    <div class="upload-error">
      <div class="error-icon">
        <svg class="icon-lg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 101.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </div>
      <h4 class="error-title">Upload Error</h4>
      <p class="error-message">${error.message}</p>
      <button onclick="resetUpload()" class="btn btn-secondary">
        Try Again
      </button>
    </div>
  `;
};

// Update the quick stats after facilities are added
window.updateQuickStats = function() {
  const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
  
  // Debug: Log facilities to see their structure
  console.log('Facilities data:', facilities);
  
  // Calculate centers count
  const centersCount = facilities.length;
  
  // Calculate states count - be more flexible with state data
  const statesSet = new Set();
  facilities.forEach(f => {
    // Try different possible state properties
    const state = f.state || f.State || f.STATE;
    if (state && state.trim() && state.trim().length > 0) {
      statesSet.add(state.trim().toUpperCase());
    }
  });
  const statesCount = statesSet.size;
  
  // Debug: Log state information
  console.log('States found:', Array.from(statesSet));
  console.log(`Stats - Centers: ${centersCount}, States: ${statesCount}`);
  
  // Update centers count - try multiple possible selectors
  const centersSelectors = [
    '.centers-added-count',
    '[data-stat="centers"]',
    '.stat-number:first-of-type',
    '.quick-stats .stat:first-child .stat-number'
  ];
  
  centersSelectors.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.textContent = centersCount;
  });
  
  // Update states count - try multiple possible selectors
  const statesSelectors = [
    '.states-covered-count',
    '[data-stat="states"]',
    '.stat-number:nth-of-type(2)',
    '.quick-stats .stat:nth-child(2) .stat-number'
  ];
  
  statesSelectors.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.textContent = statesCount;
  });
  
  // Alternative approach - find by parent text content
  const allStats = document.querySelectorAll('.stat');
  allStats.forEach(stat => {
    const label = stat.querySelector('.stat-label');
    const number = stat.querySelector('.stat-number');
    
    if (label && number) {
      if (label.textContent.includes('Centers')) {
        number.textContent = centersCount;
      } else if (label.textContent.includes('States')) {
        number.textContent = statesCount;
      }
    }
  });
  
  // Try one more approach - look for the specific stat cards
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length >= 2) {
    statNumbers[0].textContent = centersCount;
    statNumbers[1].textContent = statesCount;
  }
};

window.confirmBulkUpload = function() {
  if (window.tempBulkFacilities) {
    // Add to localStorage
    const existingFacilities = JSON.parse(localStorage.getItem('facilities') || '[]');
    const allFacilities = [...existingFacilities, ...window.tempBulkFacilities];
    localStorage.setItem('facilities', JSON.stringify(allFacilities));
    
    // Mark the upload time
    localStorage.setItem('lastBulkUploadTime', Date.now().toString());
    
    // Update the stats immediately
    window.updateQuickStats();
    
    // Show success message
    const resultsDiv = document.getElementById('upload-results');
    if (resultsDiv) {
      resultsDiv.innerHTML = `
        <div style="background: #f0fdf4; border: 1px solid #86efac; padding: 1.5rem; border-radius: 0.5rem; text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 3rem; height: 3rem; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg style="width: 1.5rem; height: 1.5rem; color: white;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 style="font-size: 1.25rem; font-weight: 600; margin: 0; color: #065f46;">
              ${window.tempBulkFacilities.length} facilities successfully imported!
            </h4>
          </div>
          <p style="color: #047857; margin-bottom: 1rem;">Reloading page...</p>
        </div>
      `;
    }
    
    // Clear temp data
    window.tempBulkFacilities = null;
    
    // Reload to show success state
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

window.cancelBulkUpload = function() {
  window.tempBulkFacilities = null;
  resetUpload();
};

window.resetUpload = function() {
  const resultsDiv = document.getElementById('upload-results');
  const fileInput = document.getElementById('facility-file-input');
  
  if (resultsDiv) resultsDiv.style.display = 'none';
  if (fileInput) fileInput.value = '';
};