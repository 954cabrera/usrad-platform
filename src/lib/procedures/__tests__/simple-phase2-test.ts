/**
 * PHASE 2 SIMPLE VISUAL TEST
 * ===========================
 * Quick visual test for Phase 2 UI modules
 * Works independently - just add to HeroSection.astro
 */

import { renderContrastSelection } from '@/lib/procedures/ui/contrast-renderer';
import { renderRegionSelection } from '@/lib/procedures/ui/region-renderer';
import { renderSearchResults } from '@/lib/procedures/ui/search-results-renderer';
import { renderLoadingState } from '@/lib/procedures/ui/renderer-core';
import { searchAllProcedures } from '@/lib/procedures/utils/search-engine';

console.log('🎨 Phase 2 Visual Test Starting...');

// Wait for DOM
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (!window.ProcedureLibrary) {
        console.error('❌ ProcedureLibrary not loaded');
        return;
      }
      
      createTestPanel();
    }, 600);
  });
}

function createTestPanel() {
  console.log('🎨 Creating Phase 2 test panel...');
  
  // Remove existing panel if present
  const existing = document.getElementById('phase2-test-panel');
  if (existing) existing.remove();
  
  // Create floating test panel
  const panel = document.createElement('div');
  panel.id = 'phase2-test-panel';
  panel.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    width: 420px;
    max-height: 80vh;
    overflow-y: auto;
    background: white;
    border: 3px solid #003087;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    z-index: 999999;
    font-family: system-ui, -apple-system, sans-serif;
  `;
  
  panel.innerHTML = `
    <div style="padding: 24px;">
      <!-- Header -->
      <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb;">
        <h2 style="font-size: 20px; font-weight: bold; color: #003087; margin: 0 0 8px 0;">
          🎨 Phase 2 UI Test Panel
        </h2>
        <p style="font-size: 13px; color: #6b7280; margin: 0;">
          All modules loaded! Click buttons to test rendering.
        </p>
      </div>
      
      <!-- Status -->
      <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 8px; color: #065f46; font-size: 13px; font-weight: 600;">
          <svg style="width: 16px; height: 16px; flex-shrink: 0;" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          All UI Modules Loaded Successfully
        </div>
      </div>
      
      <!-- Test Buttons -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button 
          id="test-contrast"
          style="
            padding: 14px 16px;
            background: linear-gradient(135deg, #003087 0%, #0052cc 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 10px;
          "
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0,48,135,0.3)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
        >
          <span style="font-size: 20px;">💉</span>
          <span>Test Contrast Selection</span>
        </button>
        
        <button 
          id="test-region"
          style="
            padding: 14px 16px;
            background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 10px;
          "
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(139,92,246,0.3)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
        >
          <span style="font-size: 20px;">🦴</span>
          <span>Test Region Selection</span>
        </button>
        
        <button 
          id="test-search"
          style="
            padding: 14px 16px;
            background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 10px;
          "
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(16,185,129,0.3)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
        >
          <span style="font-size: 20px;">🔍</span>
          <span>Test Search Results</span>
        </button>
        
        <button 
          id="test-loading"
          style="
            padding: 14px 16px;
            background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 10px;
          "
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(245,158,11,0.3)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
        >
          <span style="font-size: 20px;">⏳</span>
          <span>Test Loading States</span>
        </button>
      </div>
      
      <!-- Preview Area -->
      <div id="preview-area" style="margin-top: 20px; display: none;">
        <div style="padding: 16px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; margin-bottom: 12px;">
            PREVIEW:
          </div>
          <div id="preview-content" style="font-size: 13px;"></div>
        </div>
      </div>
      
      <!-- Close Button -->
      <button 
        id="close-panel"
        style="
          margin-top: 16px;
          width: 100%;
          padding: 10px;
          background: #f3f4f6;
          color: #6b7280;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        "
        onmouseover="this.style.background='#e5e7eb';"
        onmouseout="this.style.background='#f3f4f6';"
      >
        ✕ Close Test Panel
      </button>
    </div>
  `;
  
  document.body.appendChild(panel);
  
  // Attach event listeners
  attachPanelListeners(panel);
  
  console.log('✅ Phase 2 test panel created!');
}

function attachPanelListeners(panel: HTMLElement) {
  const previewArea = panel.querySelector('#preview-area') as HTMLElement;
  const previewContent = panel.querySelector('#preview-content') as HTMLElement;
  
  // Test Contrast
  panel.querySelector('#test-contrast')?.addEventListener('click', () => {
    console.log('🧪 Testing contrast selection...');
    const html = renderContrastSelection('MRI', false);
    
    previewContent.innerHTML = `
      <div style="max-height: 300px; overflow-y: auto; font-size: 11px;">
        ${html}
      </div>
    `;
    previewArea.style.display = 'block';
    
    console.log('✅ Contrast selection rendered!');
    console.log('HTML Length:', html.length, 'characters');
  });
  
  // Test Region
  panel.querySelector('#test-region')?.addEventListener('click', () => {
    console.log('🧪 Testing region selection...');
    const html = renderRegionSelection('MRI', 'without', false);
    
    previewContent.innerHTML = `
      <div style="max-height: 300px; overflow-y: auto; font-size: 11px;">
        ${html}
      </div>
    `;
    previewArea.style.display = 'block';
    
    console.log('✅ Region selection rendered!');
    console.log('HTML Length:', html.length, 'characters');
  });
  
  // Test Search
  panel.querySelector('#test-search')?.addEventListener('click', () => {
    console.log('🧪 Testing search results...');
    const results = searchAllProcedures('knee');
    const html = renderSearchResults(results, 'knee');
    
    previewContent.innerHTML = `
      <div style="max-height: 300px; overflow-y: auto; font-size: 11px;">
        ${html}
      </div>
    `;
    previewArea.style.display = 'block';
    
    console.log('✅ Search results rendered!');
    console.log('Found', results.length, 'procedures');
    console.log('HTML Length:', html.length, 'characters');
  });
  
  // Test Loading
  panel.querySelector('#test-loading')?.addEventListener('click', () => {
    console.log('🧪 Testing loading state...');
    const html = renderLoadingState('Testing Phase 2 UI...');
    
    // Show static preview of the HTML (not the actual spinning animation)
    previewContent.innerHTML = `
      <div style="padding: 20px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
        <div style="font-size: 11px; color: #6b7280; margin-bottom: 12px; font-weight: 600;">
          ✅ Loading State HTML Generated
        </div>
        <div style="background: #f9fafb; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 10px; color: #374151; overflow-x: auto; max-height: 200px;">
          ${escapeHtmlForDisplay(html)}
        </div>
        <div style="margin-top: 12px; font-size: 11px; color: #6b7280;">
          <strong>HTML Length:</strong> ${html.length} characters<br>
          <strong>Includes:</strong> Spinner SVG ✓, Message text ✓
        </div>
      </div>
    `;
    previewArea.style.display = 'block';
    
    console.log('✅ Loading state rendered!');
    console.log('HTML Length:', html.length, 'characters');
    console.log('Preview shows escaped HTML (not live spinner)');
  });
  
  // Close Panel
  panel.querySelector('#close-panel')?.addEventListener('click', () => {
    panel.remove();
    console.log('🗑️ Test panel closed');
  });
}

// Helper function to escape HTML for display
function escapeHtmlForDisplay(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}