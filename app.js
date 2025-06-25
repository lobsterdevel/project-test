// Application Data
const appData = {
  businessTypes: [
    "Technology Startup",
    "E-commerce",
    "Consulting Services", 
    "Restaurant/Food Service",
    "Retail Store",
    "Software/SaaS",
    "Manufacturing",
    "Healthcare Services",
    "Professional Services",
    "Other"
  ],
  industries: [
    "Technology",
    "Healthcare", 
    "Finance",
    "Retail",
    "Manufacturing",
    "Professional Services",
    "Food & Beverage",
    "Education",
    "Real Estate",
    "Other"
  ],
  marketingChannels: [
    "Digital Advertising",
    "Social Media Marketing",
    "Content Marketing",
    "Email Marketing",
    "SEO/SEM",
    "Trade Shows",
    "Partnerships",
    "Referrals",
    "Traditional Advertising"
  ],
  revenueModels: [
    "Subscription",
    "One-time Sales",
    "Commission-based",
    "Freemium",
    "Licensing",
    "Service Fees",
    "Advertising Revenue",
    "Marketplace Model"
  ],
  sections: [
    { id: "overview", title: "Business Overview", completed: false },
    { id: "market", title: "Market Analysis", completed: false },
    { id: "products", title: "Products & Services", completed: false },
    { id: "marketing", title: "Marketing Strategy", completed: false },
    { id: "operations", title: "Operations Plan", completed: false },
    { id: "financials", title: "Financial Projections", completed: false },
    { id: "risks", title: "Risk Analysis", completed: false },
    { id: "timeline", title: "Implementation Timeline", completed: false }
  ]
};

// AI Suggestions Database
const aiSuggestions = {
  technology: {
    mission: "To revolutionize the industry through innovative technology solutions that enhance efficiency and user experience.",
    valueProposition: "Our cutting-edge platform provides unique benefits by leveraging advanced algorithms and user-centric design.",
    competitors: ["Established tech giants", "Emerging startups", "Traditional industry players adapting to digital"],
    risks: ["Technology obsolescence", "Cybersecurity threats", "Rapid market changes", "Talent acquisition challenges"]
  },
  ecommerce: {
    mission: "To provide customers with exceptional online shopping experiences through quality products and outstanding service.",
    valueProposition: "Convenient, affordable, and reliable online shopping with fast delivery and excellent customer support.",
    competitors: ["Amazon", "Industry-specific online retailers", "Local brick-and-mortar stores with online presence"],
    risks: ["Inventory management", "Shipping logistics", "Customer acquisition costs", "Market saturation"]
  },
  default: {
    mission: "To deliver exceptional value to customers while building a sustainable and profitable business.",
    valueProposition: "Our unique approach combines quality, innovation, and customer service to stand out in the marketplace.",
    competitors: ["Industry leaders", "Local competitors", "New market entrants"],
    risks: ["Market competition", "Economic downturns", "Regulatory changes", "Operational challenges"]
  }
};

// Sample data for better user experience
const sampleData = {
  companyName: "InnovateTech Solutions",
  businessDescription: "A technology company focused on developing innovative software solutions for small and medium businesses.",
  mission: "To empower businesses with cutting-edge technology solutions that drive growth and efficiency.",
  vision: "To become the leading provider of business technology solutions globally.",
  targetMarket: "Small to medium-sized businesses looking to digitize their operations and improve efficiency.",
  marketSize: "$50 billion TAM, $5 billion SAM",
  competitors: "Microsoft, Salesforce, HubSpot, various industry-specific software providers",
  productDescription: "Cloud-based business management platform with CRM, project management, and analytics capabilities.",
  valueProposition: "All-in-one business solution that reduces operational complexity and increases productivity by 40%.",
  customerAcquisition: "Digital marketing, partnerships with business consultants, and referral programs.",
  teamStructure: "Founding team of 3 with expertise in technology, business development, and operations. Plan to hire 10 additional team members in year 1.",
  keyOperations: "Software development, customer support, sales and marketing, and strategic partnerships.",
  year1Revenue: "500000",
  monthlyExpenses: "25000",
  startupCosts: "150000",
  fundingRequired: "750000",
  marketRisks: "Economic downturns affecting business spending, increased competition, technology disruption",
  operationalRisks: "Key personnel departure, technical failures, scaling challenges",
  mitigationStrategies: "Diversified revenue streams, robust backup systems, strong team culture and retention programs",
  sixMonthMilestones: "Complete MVP development, acquire first 50 customers, establish key partnerships",
  oneYearGoals: "Reach $500K ARR, expand team to 15 people, launch advanced features",
  successMetrics: "Monthly recurring revenue, customer acquisition cost, customer lifetime value, user engagement metrics"
};

// Application State
let currentStep = 0;
let businessPlanData = {};
let charts = {};

// DOM Elements
const pages = {
  homepage: document.getElementById('homepage'),
  wizard: document.getElementById('wizard'),
  preview: document.getElementById('preview')
};

const buttons = {
  startNewPlan: document.getElementById('startNewPlan'),
  loadSavedPlan: document.getElementById('loadSavedPlan'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  saveBtn: document.getElementById('saveBtn'),
  finishBtn: document.getElementById('finishBtn'),
  editPlanBtn: document.getElementById('editPlanBtn'),
  downloadPdfBtn: document.getElementById('downloadPdfBtn'),
  createPitchDeckBtn: document.getElementById('createPitchDeckBtn')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  populateDropdowns();
  setupEventListeners();
  updateBreadcrumbs();
  loadSavedData();
  updateProgress();
}

function populateDropdowns() {
  // Populate business types
  const businessTypeSelect = document.getElementById('businessType');
  appData.businessTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type.toLowerCase().replace(/\s+/g, '-');
    option.textContent = type;
    businessTypeSelect.appendChild(option);
  });

  // Populate industries
  const industrySelect = document.getElementById('industry');
  appData.industries.forEach(industry => {
    const option = document.createElement('option');
    option.value = industry.toLowerCase().replace(/\s+/g, '-');
    option.textContent = industry;
    industrySelect.appendChild(option);
  });

  // Populate business models
  const businessModelSelect = document.getElementById('businessModel');
  appData.revenueModels.forEach(model => {
    const option = document.createElement('option');
    option.value = model.toLowerCase().replace(/\s+/g, '-');
    option.textContent = model;
    businessModelSelect.appendChild(option);
  });

  // Populate marketing channels
  const marketingChannelsDiv = document.getElementById('marketingChannels');
  appData.marketingChannels.forEach(channel => {
    const checkboxItem = document.createElement('div');
    checkboxItem.className = 'checkbox-item';
    checkboxItem.innerHTML = `
      <input type="checkbox" id="channel-${channel.toLowerCase().replace(/\s+/g, '-')}" value="${channel}">
      <label for="channel-${channel.toLowerCase().replace(/\s+/g, '-')}">${channel}</label>
    `;
    
    checkboxItem.addEventListener('click', function(e) {
      if (e.target.type !== 'checkbox') {
        const checkbox = this.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
      }
      this.classList.toggle('selected', this.querySelector('input[type="checkbox"]').checked);
    });
    
    marketingChannelsDiv.appendChild(checkboxItem);
  });
}

function setupEventListeners() {
  // Navigation buttons
  buttons.startNewPlan.addEventListener('click', () => showPage('wizard'));
  buttons.loadSavedPlan.addEventListener('click', loadSavedPlan);
  buttons.prevBtn.addEventListener('click', previousStep);
  buttons.nextBtn.addEventListener('click', nextStep);
  buttons.saveBtn.addEventListener('click', saveDraft);
  buttons.finishBtn.addEventListener('click', finishPlan);
  buttons.editPlanBtn.addEventListener('click', () => showPage('wizard'));
  buttons.downloadPdfBtn.addEventListener('click', downloadPDF);
  buttons.createPitchDeckBtn.addEventListener('click', createPitchDeck);

  // Form inputs for auto-save
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', debounce(autoSave, 1000));
    input.addEventListener('blur', generateAISuggestion);
  });

  // AI Assistant
  document.getElementById('aiAssistant').addEventListener('click', toggleAIAssistant);
}

function showPage(pageId) {
  Object.values(pages).forEach(page => page.classList.remove('active'));
  pages[pageId].classList.add('active');
  
  if (pageId === 'wizard') {
    showStep(currentStep);
  } else if (pageId === 'preview') {
    generateBusinessPlanPreview();
  }
}

function showStep(stepNumber) {
  // Hide all steps
  document.querySelectorAll('.wizard-step').forEach(step => {
    step.classList.remove('active');
  });
  
  // Show current step
  const currentStepElement = document.getElementById(`step-${stepNumber}`);
  if (currentStepElement) {
    currentStepElement.classList.add('active');
  }
  
  // Update progress
  updateProgress();
  updateBreadcrumbs();
  updateNavigationButtons();
  
  // Generate AI suggestions for current step
  setTimeout(() => generateStepAISuggestions(stepNumber), 500);
}

function updateProgress() {
  const progress = ((currentStep + 1) / 9) * 100;
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }
  
  const currentStepSpan = document.getElementById('currentStep');
  const totalStepsSpan = document.getElementById('totalSteps');
  if (currentStepSpan) currentStepSpan.textContent = currentStep + 1;
  if (totalStepsSpan) totalStepsSpan.textContent = '9';
}

function updateBreadcrumbs() {
  const breadcrumbs = document.getElementById('breadcrumbs');
  if (!breadcrumbs) return;
  
  breadcrumbs.innerHTML = '';
  
  const steps = ['Setup', ...appData.sections.map(s => s.title)];
  
  steps.forEach((title, index) => {
    const li = document.createElement('li');
    li.textContent = title;
    li.setAttribute('data-step', index);
    
    if (index === currentStep) {
      li.classList.add('active');
    } else if (index < currentStep) {
      li.classList.add('completed');
    }
    
    li.addEventListener('click', () => {
      if (index <= currentStep || index === currentStep + 1) {
        currentStep = index;
        showStep(currentStep);
      }
    });
    
    breadcrumbs.appendChild(li);
  });
}

function updateNavigationButtons() {
  buttons.prevBtn.disabled = currentStep === 0;
  
  if (currentStep === 8) {
    buttons.nextBtn.style.display = 'none';
    buttons.finishBtn.style.display = 'block';
  } else {
    buttons.nextBtn.style.display = 'block';
    buttons.finishBtn.style.display = 'none';
  }
}

function previousStep() {
  if (currentStep > 0) {
    saveCurrentStepData();
    currentStep--;
    showStep(currentStep);
  }
}

function nextStep() {
  if (validateCurrentStep()) {
    saveCurrentStepData();
    if (currentStep < 8) {
      currentStep++;
      showStep(currentStep);
    }
  }
}

function validateCurrentStep() {
  const currentStepElement = document.getElementById(`step-${currentStep}`);
  if (!currentStepElement) return true;
  
  const requiredFields = currentStepElement.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'var(--color-error)';
      isValid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  
  if (!isValid) {
    showNotification('Please fill in all required fields', 'error');
  }
  
  return isValid;
}

function saveCurrentStepData() {
  const currentStepElement = document.getElementById(`step-${currentStep}`);
  if (!currentStepElement) return;
  
  const inputs = currentStepElement.querySelectorAll('.form-control, input[type="checkbox"]:checked');
  
  // Reset marketing channels array
  businessPlanData.marketingChannels = [];
  
  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      if (input.checked) {
        businessPlanData.marketingChannels.push(input.value);
      }
    } else {
      businessPlanData[input.id] = input.value;
    }
  });
  
  // Mark section as completed
  if (currentStep > 0 && currentStep <= appData.sections.length) {
    appData.sections[currentStep - 1].completed = true;
  }
}

function generateStepAISuggestions(stepNumber) {
  const businessType = businessPlanData.businessType || 'default';
  let suggestions = aiSuggestions[businessType] || aiSuggestions.default;
  
  switch (stepNumber) {
    case 1: // Business Overview
      if (businessPlanData.businessType && !businessPlanData.mission) {
        showAISuggestion('missionSuggestion', suggestions.mission, 'mission');
      }
      break;
      
    case 2: // Market Analysis
      if (businessPlanData.industry && !businessPlanData.competitors) {
        showAISuggestion('competitorSuggestion', suggestions.competitors.join(', '), 'competitors');
      }
      generateMarketInsights();
      break;
      
    case 3: // Products & Services
      if (businessPlanData.productDescription && !businessPlanData.valueProposition) {
        showAISuggestion('valuePropSuggestion', suggestions.valueProposition, 'valueProposition');
      }
      break;
      
    case 6: // Financial Projections
      generateFinancialCharts();
      break;
      
    case 7: // Risk Analysis
      if (businessPlanData.businessType && !businessPlanData.marketRisks) {
        showAISuggestion('riskSuggestion', suggestions.risks.join(', '), 'marketRisks');
      }
      break;
  }
}

function showAISuggestion(elementId, suggestion, targetFieldId) {
  const suggestionElement = document.getElementById(elementId);
  if (suggestionElement && suggestion) {
    suggestionElement.innerHTML = `
      <div class="suggestion-header">
        <span>🤖</span>
        <span>AI Suggestion</span>
      </div>
      <div class="suggestion-content">${suggestion}</div>
      <div class="suggestion-actions">
        <button class="suggestion-btn suggestion-btn--accept" onclick="acceptSuggestion('${targetFieldId}', \`${suggestion.replace(/`/g, '\\`')}\`)">Accept</button>
        <button class="suggestion-btn suggestion-btn--dismiss" onclick="dismissSuggestion('${elementId}')">Dismiss</button>
      </div>
    `;
    suggestionElement.classList.add('show');
  }
}

function acceptSuggestion(fieldId, suggestion) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.value = suggestion;
    field.dispatchEvent(new Event('input'));
  }
  dismissSuggestion(fieldId + 'Suggestion');
}

function dismissSuggestion(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove('show');
  }
}

function generateMarketInsights() {
  const industry = businessPlanData.industry || 'Technology';
  
  const insights = [
    {
      title: 'Market Size',
      content: `The ${industry} industry is valued at approximately $${Math.floor(Math.random() * 500 + 50)}B globally, with an expected CAGR of ${Math.floor(Math.random() * 10 + 5)}%.`
    },
    {
      title: 'Key Trends',
      content: `Digital transformation, sustainability, and customer experience are driving major changes in the ${industry} sector.`
    },
    {
      title: 'Growth Opportunities',
      content: `Emerging technologies and changing consumer preferences present significant opportunities for innovation and market expansion.`
    },
    {
      title: 'Competitive Landscape',
      content: `The market is moderately competitive with both established players and new entrants vying for market share.`
    }
  ];
  
  const marketInsightsDiv = document.getElementById('marketInsights');
  if (marketInsightsDiv) {
    marketInsightsDiv.innerHTML = insights.map(insight => `
      <div class="insight-card">
        <h5>${insight.title}</h5>
        <p>${insight.content}</p>
      </div>
    `).join('');
  }
}

function generateFinancialCharts() {
  setTimeout(() => {
    const year1Revenue = parseInt(businessPlanData.year1Revenue) || 500000;
    const monthlyExpenses = parseInt(businessPlanData.monthlyExpenses) || 25000;
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx && !charts.revenue) {
      // Clear any existing chart
      if (charts.revenue) {
        charts.revenue.destroy();
      }
      
      const revenueData = [];
      for (let i = 1; i <= 12; i++) {
        revenueData.push(Math.floor((year1Revenue / 12) * i * (0.7 + Math.random() * 0.6)));
      }
      
      charts.revenue = new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Monthly Revenue',
            data: revenueData,
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            borderColor: '#1FB8CD',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Revenue Projections'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              }
            }
          }
        }
      });
    }
    
    // Expense Chart
    const expenseCtx = document.getElementById('expenseChart');
    if (expenseCtx && !charts.expense) {
      // Clear any existing chart
      if (charts.expense) {
        charts.expense.destroy();
      }
      
      charts.expense = new Chart(expenseCtx, {
        type: 'doughnut',
        data: {
          labels: ['Salaries', 'Marketing', 'Operations', 'Technology', 'Other'],
          datasets: [{
            data: [40, 25, 15, 12, 8],
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#ECEBD5'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Expense Breakdown (%)'
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  }, 100);
}

function autoSave() {
  saveCurrentStepData();
  localStorage.setItem('businessPlanData', JSON.stringify(businessPlanData));
  localStorage.setItem('currentStep', currentStep.toString());
  showNotification('Progress saved automatically', 'success');
}

function saveDraft() {
  saveCurrentStepData();
  localStorage.setItem('businessPlanData', JSON.stringify(businessPlanData));
  localStorage.setItem('currentStep', currentStep.toString());
  showNotification('Draft saved successfully!', 'success');
}

function loadSavedData() {
  const savedData = localStorage.getItem('businessPlanData');
  const savedStep = localStorage.getItem('currentStep');
  
  if (savedData) {
    businessPlanData = JSON.parse(savedData);
    fillFormFields();
  }
  
  if (savedStep) {
    currentStep = parseInt(savedStep);
  }
}

function loadSavedPlan() {
  const savedData = localStorage.getItem('businessPlanData');
  if (savedData) {
    showPage('wizard');
    loadSavedData();
    showStep(currentStep);
    showNotification('Saved plan loaded successfully!', 'success');
  } else {
    // Load sample data for demonstration
    businessPlanData = { ...sampleData };
    businessPlanData.marketingChannels = ['Digital Advertising', 'Content Marketing', 'SEO/SEM'];
    showPage('wizard');
    fillFormFields();
    showStep(currentStep);
    showNotification('Sample business plan loaded for demonstration!', 'info');
  }
}

function fillFormFields() {
  Object.keys(businessPlanData).forEach(key => {
    const field = document.getElementById(key);
    if (field && key !== 'marketingChannels') {
      field.value = businessPlanData[key];
    }
  });
  
  // Handle marketing channels checkboxes
  if (businessPlanData.marketingChannels) {
    businessPlanData.marketingChannels.forEach(channel => {
      const checkbox = document.querySelector(`input[value="${channel}"]`);
      if (checkbox) {
        checkbox.checked = true;
        checkbox.closest('.checkbox-item').classList.add('selected');
      }
    });
  }
}

function finishPlan() {
  saveCurrentStepData();
  showPage('preview');
}

function generateBusinessPlanPreview() {
  const documentDiv = document.getElementById('businessPlanDocument');
  
  // Use sample data if no data provided
  const data = { ...sampleData, ...businessPlanData };
  
  const executiveSummary = generateExecutiveSummary(data);
  
  documentDiv.innerHTML = `
    <div class="plan-section">
      <h3>Executive Summary</h3>
      ${executiveSummary}
    </div>
    
    <div class="plan-section">
      <h3>Company Description</h3>
      <h4>Overview</h4>
      <p>${data.businessDescription}</p>
      <h4>Mission Statement</h4>
      <p>${data.mission}</p>
      <h4>Vision Statement</h4>
      <p>${data.vision}</p>
    </div>
    
    <div class="plan-section">
      <h3>Market Analysis</h3>
      <h4>Target Market</h4>
      <p>${data.targetMarket}</p>
      <h4>Market Size</h4>
      <p>${data.marketSize}</p>
      <h4>Competition</h4>
      <p>${data.competitors}</p>
    </div>
    
    <div class="plan-section">
      <h3>Products and Services</h3>
      <h4>Offerings</h4>
      <p>${data.productDescription}</p>
      <h4>Value Proposition</h4>
      <p>${data.valueProposition}</p>
      <h4>Pricing Strategy</h4>
      <p>${data.pricingStrategy ? `Our pricing strategy follows a ${data.pricingStrategy.replace(/-/g, ' ')} approach.` : 'Our pricing strategy is competitive and value-based.'}</p>
    </div>
    
    <div class="plan-section">
      <h3>Marketing and Sales Strategy</h3>
      <h4>Customer Acquisition</h4>
      <p>${data.customerAcquisition}</p>
      <h4>Marketing Channels</h4>
      ${data.marketingChannels ? `<ul>${data.marketingChannels.map(channel => `<li>${channel}</li>`).join('')}</ul>` : '<ul><li>Digital Advertising</li><li>Content Marketing</li><li>SEO/SEM</li></ul>'}
      <h4>Marketing Budget</h4>
      <p>${data.marketingBudget ? `Monthly marketing budget: $${parseInt(data.marketingBudget).toLocaleString()}` : 'Monthly marketing budget: $10,000'}</p>
    </div>
    
    <div class="plan-section">
      <h3>Operations Plan</h3>
      <h4>Business Model</h4>
      <p>${data.businessModel ? `Our business operates on a ${data.businessModel.replace(/-/g, ' ')} model.` : 'Our business operates on a subscription-based model.'}</p>
      <h4>Team Structure</h4>
      <p>${data.teamStructure}</p>
      <h4>Key Operations</h4>
      <p>${data.keyOperations}</p>
    </div>
    
    <div class="plan-section">
      <h3>Financial Projections</h3>
      <h4>Revenue Projections</h4>
      <p>Year 1 Revenue Target: $${parseInt(data.year1Revenue).toLocaleString()}</p>
      <h4>Operating Expenses</h4>
      <p>Monthly Operating Expenses: $${parseInt(data.monthlyExpenses).toLocaleString()}</p>
      <h4>Startup Costs</h4>
      <p>Initial Investment Required: $${parseInt(data.startupCosts).toLocaleString()}</p>
      <h4>Funding Requirements</h4>
      <p>Total Funding Needed: $${parseInt(data.fundingRequired).toLocaleString()}</p>
    </div>
    
    <div class="plan-section">
      <h3>Risk Analysis</h3>
      <h4>Market Risks</h4>
      <p>${data.marketRisks}</p>
      <h4>Operational Risks</h4>
      <p>${data.operationalRisks}</p>
      <h4>Mitigation Strategies</h4>
      <p>${data.mitigationStrategies}</p>
    </div>
    
    <div class="plan-section">
      <h3>Implementation Timeline</h3>
      <h4>6-Month Milestones</h4>
      <p>${data.sixMonthMilestones}</p>
      <h4>1-Year Goals</h4>
      <p>${data.oneYearGoals}</p>
      <h4>Success Metrics</h4>
      <p>${data.successMetrics}</p>
    </div>
  `;
}

function generateExecutiveSummary(data) {
  const companyName = data.companyName || 'Your Company';
  const businessType = data.businessType ? data.businessType.replace(/-/g, ' ') : 'technology';
  const industry = data.industry ? data.industry.replace(/-/g, ' ') : 'technology';
  const revenue = `$${parseInt(data.year1Revenue).toLocaleString()}`;
  const funding = `$${parseInt(data.fundingRequired).toLocaleString()}`;
  
  return `
    <p><strong>${companyName}</strong> is a ${businessType} company operating in the ${industry} industry. Our mission is to ${data.mission.toLowerCase()}.</p>
    
    <p><strong>Market Opportunity:</strong> ${data.targetMarket} The total addressable market is estimated at ${data.marketSize}.</p>
    
    <p><strong>Products/Services:</strong> ${data.productDescription}</p>
    
    <p><strong>Financial Projections:</strong> We project ${revenue} in first-year revenue with $${parseInt(data.monthlyExpenses).toLocaleString()} in monthly operating expenses.</p>
    
    <p><strong>Funding Requirements:</strong> We are seeking ${funding} in funding to support our growth initiatives and scale operations.</p>
    
    <p><strong>Leadership Team:</strong> ${data.teamStructure}</p>
  `;
}

function downloadPDF() {
  showNotification('Preparing PDF download...', 'info');
  
  // Simulate PDF generation
  setTimeout(() => {
    const companyName = businessPlanData.companyName || sampleData.companyName;
    const filename = `${companyName.replace(/\s+/g, '_')}_Business_Plan.pdf`;
    
    showNotification(`PDF "${filename}" download started! (Feature simulated for demo)`, 'success');
  }, 1000);
}

function createPitchDeck() {
  showNotification('Creating pitch deck...', 'info');
  
  setTimeout(() => {
    showNotification('Pitch deck created successfully! (Feature simulated for demo)', 'success');
  }, 1500);
}

function generateAISuggestion(event) {
  const field = event.target;
  
  if (field.value.length > 10) {
    showLoadingSpinner();
    
    setTimeout(() => {
      hideLoadingSpinner();
      showNotification('AI analysis complete! Check for suggestions above the field.', 'info');
    }, 800);
  }
}

function toggleAIAssistant() {
  showNotification('AI Assistant: I can help you with suggestions for each section. Fill out the forms and I\'ll provide recommendations!', 'info');
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    background: var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'});
    color: white;
    border-radius: 6px;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    max-width: 300px;
    word-wrap: break-word;
    font-size: 14px;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 4000);
}

function showLoadingSpinner() {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    spinner.classList.add('show');
  }
}

function hideLoadingSpinner() {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    spinner.classList.remove('show');
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Make functions available globally for inline onclick handlers
window.acceptSuggestion = acceptSuggestion;
window.dismissSuggestion = dismissSuggestion;
window.charts = charts;