// Multi-step form handler and submission logic
console.log('Form handler script loading...');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting form initialization');
    
    // --- Element Selections ---
    const formContainer = document.getElementById('form-container');
    const form = document.getElementById('multiStepForm');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const submitBtn = document.getElementById('submitBtn');
    const progressSteps = document.querySelectorAll('.progress-step-item');
    
    console.log('Form elements found:', {
        form: !!form,
        submitBtn: !!submitBtn,
        nextBtn: !!nextBtn,
        prevBtn: !!prevBtn,
        steps: steps.length
    });
    
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const spinner = submitBtn ? submitBtn.querySelector('.spinner') : null;

    // --- State ---
    let currentStep = 1;
    const totalSteps = steps.length;
    let applicantFirstName = '';

    // --- UI Update Function ---
    function updateUI() {
        try {
            // Update form step visibility
            steps.forEach(step => step.classList.toggle('active', parseInt(step.dataset.step) === currentStep));

            // Update progress bar
            progressSteps.forEach(item => {
                const stepNum = parseInt(item.dataset.stepNav);
                item.classList.remove('active', 'completed');
                if (stepNum === currentStep) {
                    item.classList.add('active');
                } else if (stepNum < currentStep) {
                    item.classList.add('completed');
                    // Change icon to checkmark on complete
                    const icon = item.querySelector('.icon-wrapper');
                    if (icon) {
                        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`;
                    }
                }
            });

            // Update buttons
            if (prevBtn) prevBtn.classList.toggle('invisible', currentStep === 1);
            if (nextBtn) nextBtn.classList.toggle('hidden', currentStep === totalSteps);
            if (submitBtn) submitBtn.classList.toggle('hidden', currentStep !== totalSteps);
            
            // Personalize last step
            if(currentStep === totalSteps) {
                const fullNameInput = document.getElementById('fullName');
                if (fullNameInput && fullNameInput.value) {
                    applicantFirstName = fullNameInput.value.split(' ')[0] || '';
                    const submitTitle = document.getElementById('submit-title');
                    if(applicantFirstName && submitTitle) {
                        submitTitle.textContent = `Alright, ${applicantFirstName}, one last step!`;
                    }
                }
            }
        } catch (error) {
            console.error('Error in updateUI function:', error);
        }
    }

    // --- Validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(field) {
        const errorSpan = field.parentElement.querySelector('.validation-error');
        let isValid = true;
        field.classList.remove('border-red-500');
        if (errorSpan) errorSpan.classList.add('hidden');

        if (field.required && !field.value.trim()) isValid = false;
        else if (field.type === 'email' && field.value.trim() && !emailRegex.test(field.value)) isValid = false;
        else if (field.type === 'date' && field.required && !field.value) isValid = false;

        if (!isValid) {
            field.classList.add('border-red-500');
            if (errorSpan) errorSpan.classList.remove('hidden');
        }
        return isValid;
    }
    
    function validateCurrentStep() {
        const currentStepElement = steps[currentStep - 1];
        const fieldsToValidate = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
        let isStepValid = true;
        fieldsToValidate.forEach(field => {
            if (!validateField(field)) isStepValid = false;
        });
        return isStepValid;
    }

    // --- Event Listeners ---
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateCurrentStep()) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateUI();
                }
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateUI();
            }
        });
    }

    // Real-time validation
    if (form) {
        form.querySelectorAll('input[required], select[required]').forEach(field => {
            field.addEventListener('input', () => validateField(field));
            field.addEventListener('change', () => validateField(field));
        });
    }
    
    // Custom file input handlers
    const resumeInput = document.getElementById('resume');
    const fileNameDisplay = document.getElementById('fileName');
    const resumeLabel = document.querySelector('label[for="resume"]');
    
    const flatRateInput = document.getElementById('flatRateReport');
    const flatRateFileNameDisplay = document.getElementById('flatRateFileName');
    const flatRateLabel = document.querySelector('label[for="flatRateReport"]');
    
    // Add safety checks for resume upload
    if (resumeLabel && resumeLabel.parentElement) {
        resumeLabel.parentElement.addEventListener('click', () => resumeInput.click());
    }
    
    if (resumeInput) {
        resumeInput.addEventListener('change', () => {
            if (resumeInput.files.length > 0) {
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = `File selected: ${resumeInput.files[0].name}`;
                }
            } else {
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = '';
                }
            }
        });
    }

    // Add flat rate report upload handler
    if (flatRateLabel && flatRateLabel.parentElement) {
        flatRateLabel.parentElement.addEventListener('click', () => flatRateInput.click());
    }
    
    if (flatRateInput) {
        flatRateInput.addEventListener('change', () => {
            if (flatRateInput.files.length > 0) {
                if (flatRateFileNameDisplay) {
                    flatRateFileNameDisplay.textContent = `File selected: ${flatRateInput.files[0].name}`;
                }
            } else {
                if (flatRateFileNameDisplay) {
                    flatRateFileNameDisplay.textContent = '';
                }
            }
        });
    }

    // --- Form Submission ---
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }

    // Only add form submission listener if form exists
    if (form) {
        form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!validateCurrentStep()) return;

        if (submitBtn) {
            submitBtn.disabled = true;
        }
        if (btnText) {
            btnText.textContent = 'Submitting...';
        }
        if (spinner) {
            spinner.classList.remove('hidden');
        }

        // Power Automate URL provided by user
        const powerAutomateUrl = 'https://f5b1d9c5f3cae77bbd0a47e9d05b5c.17.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/de7ecf3454634a98a76282f3f046f43a/triggers/manual/paths/invoke/?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vtKu5ftKb6i5T6feS-MgqSUdJxOsYNM0Mq8Fg79aSxs';
        
        // Collect all form data
        const formData = new FormData(form);
        const payload = {
            submissionDate: new Date().toISOString(),
            applicationId: 'APP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
        };
        
        // Process regular form fields with exact names expected by Power Automate
        for (const [key, value] of formData.entries()) {
            if (key === 'resume' || key === 'flatRateReport') continue; // Handle files separately
            
            if (payload[key]) {
                // Handle multiple values (like checkboxes)
                if (!Array.isArray(payload[key])) payload[key] = [payload[key]];
                payload[key].push(value);
            } else {
                payload[key] = value;
            }
        }

        // Convert array fields to comma-separated strings for easier processing
        if (payload.availability && Array.isArray(payload.availability)) {
            payload.availability = payload.availability.join(', ');
        }

        // Relocate field is now properly collected from the form

        // Handle file attachments with Power Automate email connector format
        const resumeFile = resumeInput ? resumeInput.files[0] : null;
        const flatRateFile = flatRateInput ? flatRateInput.files[0] : null;
        const attachments = [];
        
        // Process resume file
        if (resumeFile) {
            payload.resumeName = resumeFile.name;
            payload.resumeFileSize = resumeFile.size;
            payload.resumeFileType = resumeFile.type;
            payload.hasResume = true;
            
            try {
                const resumeBase64 = await fileToBase64(resumeFile);
                payload.resumeContent = resumeBase64;
                
                attachments.push({
                    "Name": resumeFile.name,
                    "ContentBytes": resumeBase64
                });
            } catch (error) {
                console.error('Error processing resume file:', error);
                showResult(errorMessage, 'Error processing resume file: ' + error.message);
                return;
            }
        } else {
            payload.resumeName = 'No file uploaded';
            payload.resumeFileSize = 0;
            payload.resumeFileType = null;
            payload.resumeContent = '';
            payload.hasResume = false;
        }

        // Process flat rate report file
        if (flatRateFile) {
            payload.flatRateReportName = flatRateFile.name;
            payload.flatRateFileSize = flatRateFile.size;
            payload.flatRateFileType = flatRateFile.type;
            payload.hasFlatRateReport = true;
            
            try {
                const flatRateBase64 = await fileToBase64(flatRateFile);
                payload.flatRateReportContent = flatRateBase64;
                
                attachments.push({
                    "Name": flatRateFile.name,
                    "ContentBytes": flatRateBase64
                });
            } catch (error) {
                console.error('Error processing flat rate report file:', error);
                showResult(errorMessage, 'Error processing flat rate report file: ' + error.message);
                return;
            }
        } else {
            payload.flatRateReportName = 'No file uploaded';
            payload.flatRateFileSize = 0;
            payload.flatRateFileType = null;
            payload.flatRateReportContent = '';
            payload.hasFlatRateReport = false;
        }

        // Set the attachments array for Power Automate email connector
        payload.Attachments = attachments;

        // Add metadata
        payload.userAgent = navigator.userAgent;
        payload.screenResolution = `${screen.width}x${screen.height}`;
        payload.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        console.log('Submitting payload to Power Automate:', payload);

        try {
            const response = await fetch(powerAutomateUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (response.ok) {
                const responseData = await response.text();
                console.log('Success response:', responseData);
                showResult(successMessage);
            } else {
                const responseText = await response.text();
                console.error('Error response:', responseText);
                showResult(errorMessage, `Status: ${response.status}, Response: ${responseText}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            showResult(errorMessage, 'Network error: ' + error.message);
        }
    });

    function showResult(messageElement, errorInfo = '') {
        // Reset button state with safety checks
        if (submitBtn) {
            submitBtn.disabled = false;
        }
        if (btnText) {
            btnText.textContent = 'Submit Application';
        }
        if (spinner) {
            spinner.classList.add('hidden');
        }
        
        if (messageElement && messageElement.id === 'successMessage') {
            const successText = document.getElementById('successText');
            if (successText) {
                successText.textContent = `Thank you, ${applicantFirstName || 'friend'}. We've received your application and will be in touch soon.`;
            }
            
            // Keep form hidden on success
            if (form) {
                form.style.display = 'none';
            }
        } else {
            // Show form again on error so user can retry
            // form.style.display = 'block'; // Uncomment if you want to show form on error
        }
        
        if (messageElement) {
            messageElement.classList.remove('hidden');
            messageElement.classList.add('active');
        }

        if (errorInfo) console.error('Submission Error:', errorInfo);
    }

    // Close the if statement for form existence check
    }

    // --- "Start New Application" Button Handler ---
    const returnBtn = document.getElementById('returnBtn');
    if (returnBtn) {
        console.log('Return button found, setting up event listener');
        
        // Simple approach - just reload the page
        returnBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Start New Application button clicked - reloading page');
            window.location.reload();
        });
        
        console.log('Return button event listener attached successfully');
    } else {
        console.log('Return button not found');
    }

    // --- Initial Setup ---
    updateUI();

    // Initialize AOS animations if library is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Enhanced loading experience
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.remove('active');
        }, 1500);
    }

    // Progress bar enhancement
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    
    if (progressBar && progressPercent) {
        const originalUpdateUI = updateUI;
        updateUI = function() {
            originalUpdateUI();
            // Update progress percentage and bar
            const progress = (currentStep / totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
            progressPercent.textContent = `${Math.round(progress)}%`;
        };
    }

    // --- Logo Handling ---
    const companyLogo = document.getElementById('companyLogo');
    const logoContainer = document.getElementById('logoContainer');
    
    console.log('Logo elements found:', {
        logo: !!companyLogo,
        container: !!logoContainer,
        logoSrc: companyLogo ? companyLogo.src : 'N/A'
    });
    
    if (companyLogo && logoContainer) {
        // Test if logo can load
        const testImg = new Image();
        testImg.onload = function() {
            console.log('Logo test SUCCESS - switching to image logo');
            // Hide text logo and show image logo
            const textLogo = logoContainer.querySelector('div');
            if (textLogo) textLogo.style.display = 'none';
            companyLogo.style.display = 'block';
        };
        testImg.onerror = function() {
            console.log('Logo test FAILED - keeping text logo');
            // Keep text logo visible, hide image
            companyLogo.style.display = 'none';
        };
        testImg.src = '/jess-recruiting-logo.png';
        
        // Also set up the main logo with handlers
        companyLogo.addEventListener('load', function() {
            console.log('Main logo loaded successfully');
        });
        
        companyLogo.addEventListener('error', function(e) {
            console.error('Main logo failed to load:', e);
            companyLogo.style.display = 'none';
        });
    }

    console.log('Jess Recruiting Application - Enhanced Version Loaded Successfully! 🚗✨');
});
