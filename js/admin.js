// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Admin Authentication
    const adminLoginForm = document.getElementById('admin-login-form');
    const loginContainer = document.getElementById('login-container');
    const adminPanelContainer = document.getElementById('admin-panel-container');
    const adminUsernameDisplay = document.getElementById('admin-username');
    const loginError = document.getElementById('login-error');
    
    // Default admin credentials (in a real application, this would be stored securely on the server)
    const defaultAdmin = {
        username: 'admin',
        password: 'admin123'
    };
    
    // Check if admin is already logged in
    function checkAdminLogin() {
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth) {
            try {
                const auth = JSON.parse(adminAuth);
                if (auth && auth.isLoggedIn) {
                    showAdminPanel(auth.username);
                    return true;
                }
            } catch (e) {
                console.error('Error parsing admin auth:', e);
            }
        }
        return false;
    }
    
    // Handle admin login
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // In a real application, this would be a server-side authentication
            if (username === defaultAdmin.username && password === defaultAdmin.password) {
                // Store authentication in localStorage (in a real app, this would be a secure token)
                localStorage.setItem('adminAuth', JSON.stringify({
                    isLoggedIn: true,
                    username: username,
                    loginTime: new Date().toISOString()
                }));
                
                showAdminPanel(username);
            } else {
                loginError.textContent = 'Geçersiz kullanıcı adı veya şifre!';
            }
        });
    }
    
    // Show admin panel after successful login
    function showAdminPanel(username) {
        loginContainer.style.display = 'none';
        adminPanelContainer.style.display = 'flex';
        adminUsernameDisplay.textContent = username;
        
        // Load admin data
        loadAdminData();
    }
    
    // Handle admin logout
    const logoutButton = document.getElementById('admin-logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('adminAuth');
            adminPanelContainer.style.display = 'none';
            loginContainer.style.display = 'flex';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            loginError.textContent = '';
        });
    }
    
    // Tab Navigation
    const tabLinks = document.querySelectorAll('.admin-sidebar li');
    const tabContents = document.querySelectorAll('.admin-tab');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab link
            tabLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab content
            tabContents.forEach(tab => {
                if (tab.id === tabId + '-tab') {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        });
    });
    
    // Load admin data from localStorage
    function loadAdminData() {
        loadDashboardData();
        loadEvaluationsData();
        loadReportsData();
        loadSettingsData();
    }
    
    // Dashboard Data
    function loadDashboardData() {
        // Get all evaluations from localStorage
        const evaluations = getAllEvaluations();
        
        // Update statistics
        document.getElementById('total-evaluations').textContent = evaluations.length;
        
        // Calculate monthly evaluations
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        const monthlyEvals = evaluations.filter(eval => {
            const evalDate = new Date(eval.date);
            return evalDate.getMonth() === currentMonth && evalDate.getFullYear() === currentYear;
        });
        
        document.getElementById('monthly-evaluations').textContent = monthlyEvals.length;
        
        // Calculate average score
        if (evaluations.length > 0) {
            const totalScore = evaluations.reduce((sum, eval) => sum + eval.overallScore, 0);
            const averageScore = Math.round((totalScore / evaluations.length) * 10) / 10;
            document.getElementById('average-score').textContent = averageScore + '%';
        } else {
            document.getElementById('average-score').textContent = '0%';
        }
        
        // Populate recent evaluations table
        const recentEvalsTable = document.getElementById('recent-evaluations-table');
        if (recentEvalsTable) {
            recentEvalsTable.innerHTML = '';
            
            // Sort by date (newest first) and take the first 5
            const recentEvals = [...evaluations]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5);
            
            if (recentEvals.length === 0) {
                recentEvalsTable.innerHTML = '<tr><td colspan="6" class="text-center">Henüz değerlendirme bulunmamaktadır.</td></tr>';
            } else {
                recentEvals.forEach(eval => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${eval.id}</td>
                        <td>${eval.evaluatedName}</td>
                        <td>${eval.evaluatorName}</td>
                        <td>${formatDate(eval.date)}</td>
                        <td>${eval.overallScore}%</td>
                        <td class="action-buttons">
                            <button class="btn btn-small view-evaluation" data-id="${eval.id}">
                                <i class="fas fa-eye"></i> Görüntüle
                            </button>
                        </td>
                    `;
                    recentEvalsTable.appendChild(row);
                });
                
                // Add event listeners to view buttons
                addViewEvaluationListeners();
            }
        }
        
        // Create charts
        createCategoryDistributionChart(evaluations);
        createMonthlyEvaluationsChart(evaluations);
    }
    
    // Create category distribution chart
    function createCategoryDistributionChart(evaluations) {
        const ctx = document.getElementById('category-distribution-chart');
        if (!ctx || evaluations.length === 0) return;
        
        // Calculate average scores for each category
        let totalWorkethic = 0;
        let totalLoyalty = 0;
        let totalStrengths = 0;
        let totalWeaknesses = 0;
        let totalCompatibility = 0;
        
        evaluations.forEach(eval => {
            totalWorkethic += eval.scores.workethic;
            totalLoyalty += eval.scores.loyalty;
            totalStrengths += eval.scores.strengths;
            totalWeaknesses += eval.scores.weaknesses;
            totalCompatibility += eval.scores.compatibility;
        });
        
        const avgWorkethic = Math.round((totalWorkethic / evaluations.length) * 100 / 50);
        const avgLoyalty = Math.round((totalLoyalty / evaluations.length) * 100 / 50);
        const avgStrengths = Math.round((totalStrengths / evaluations.length) * 100 / 75);
        const avgWeaknesses = Math.round((totalWeaknesses / evaluations.length) * 100 / 75);
        const avgCompatibility = Math.round((totalCompatibility / evaluations.length) * 100 / 50);
        
        // Create chart
        if (window.categoryChart) {
            window.categoryChart.destroy();
        }
        
        window.categoryChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Çalışkanlık', 'Sadakat', 'Güçlü Yönler', 'Zayıf Yönler', 'Uyumluluk'],
                datasets: [{
                    label: 'Ortalama Puan (%)',
                    data: [avgWorkethic, avgLoyalty, avgStrengths, avgWeaknesses, avgCompatibility],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    
    // Create monthly evaluations chart
    function createMonthlyEvaluationsChart(evaluations) {
        const ctx = document.getElementById('monthly-evaluations-chart');
        if (!ctx) return;
        
        // Get last 6 months
        const months = [];
        const counts = [];
        
        const currentDate = new Date();
        
        for (let i = 5; i >= 0; i--) {
            const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthName = month.toLocaleString('tr-TR', { month: 'short' });
            const monthYear = month.toLocaleString('tr-TR', { year: 'numeric' });
            
            months.push(`${monthName} ${monthYear}`);
            
            // Count evaluations for this month
            const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
            const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
            
            const count = evaluations.filter(eval => {
                const evalDate = new Date(eval.date);
                return evalDate >= monthStart && evalDate <= monthEnd;
            }).length;
            
            counts.push(count);
        }
        
        // Create chart
        if (window.monthlyChart) {
            window.monthlyChart.destroy();
        }
        
        window.monthlyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Değerlendirme Sayısı',
                    data: counts,
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    // Evaluations Data
    function loadEvaluationsData() {
        const evaluationsTable = document.getElementById('evaluations-table');
        if (!evaluationsTable) return;
        
        // Get all evaluations
        const evaluations = getAllEvaluations();
        
        // Populate evaluations table
        populateEvaluationsTable(evaluations, evaluationsTable);
        
        // Add search functionality
        const searchInput = document.getElementById('evaluation-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const filteredEvals = evaluations.filter(eval => 
                    eval.evaluatedName.toLowerCase().includes(searchTerm) ||
                    eval.evaluatorName.toLowerCase().includes(searchTerm)
                );
                populateEvaluationsTable(filteredEvals, evaluationsTable);
            });
        }
        
        // Add filter functionality
        const dateFilter = document.getElementById('filter-date');
        const scoreFilter = document.getElementById('filter-score');
        
        function applyFilters() {
            let filtered = [...evaluations];
            
            // Apply date filter
            if (dateFilter && dateFilter.value !== 'all') {
                const today = new Date();
                const startDate = new Date();
                
                switch (dateFilter.value) {
                    case 'today':
                        startDate.setHours(0, 0, 0, 0);
                        break;
                    case 'week':
                        startDate.setDate(today.getDate() - 7);
                        break;
                    case 'month':
                        startDate.setMonth(today.getMonth() - 1);
                        break;
                    case 'year':
                        startDate.setFullYear(today.getFullYear() - 1);
                        break;
                }
                
                filtered = filtered.filter(eval => new Date(eval.date) >= startDate);
            }
            
            // Apply score filter
            if (scoreFilter && scoreFilter.value !== 'all') {
                switch (scoreFilter.value) {
                    case 'high':
                        filtered = filtered.filter(eval => eval.overallScore >= 70);
                        break;
                    case 'medium':
                        filtered = filtered.filter(eval => eval.overallScore >= 40 && eval.overallScore < 70);
                        break;
                    case 'low':
                        filtered = filtered.filter(eval => eval.overallScore < 40);
                        break;
                }
            }
            
            populateEvaluationsTable(filtered, evaluationsTable);
        }
        
        if (dateFilter) {
            dateFilter.addEventListener('change', applyFilters);
        }
        
        if (scoreFilter) {
            scoreFilter.addEventListener('change', applyFilters);
        }
    }
    
    // Populate evaluations table
    function populateEvaluationsTable(evaluations, table) {
        table.innerHTML = '';
        
        if (evaluations.length === 0) {
            table.innerHTML = '<tr><td colspan="11" class="text-center">Değerlendirme bulunamadı.</td></tr>';
            return;
        }
        
        // Sort by date (newest first)
        evaluations.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        evaluations.forEach(eval => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${eval.id}</td>
                <td>${eval.evaluatedName}</td>
                <td>${eval.evaluatorName}</td>
                <td>${formatDate(eval.date)}</td>
                <td>${Math.round(eval.scores.workethic * 100 / 50)}%</td>
                <td>${Math.round(eval.scores.loyalty * 100 / 50)}%</td>
                <td>${Math.round(eval.scores.strengths * 100 / 75)}%</td>
                <td>${Math.round(eval.scores.weaknesses * 100 / 75)}%</td>
                <td>${Math.round(eval.scores.compatibility * 100 / 50)}%</td>
                <td>${eval.overallScore}%</td>
                <td class="action-buttons">
                    <button class="btn btn-small view-evaluation" data-id="${eval.id}">
                        <i class="fas fa-eye"></i> Görüntüle
                    </button>
                    <button class="btn btn-small btn-danger delete-evaluation" data-id="${eval.id}">
                        <i class="fas fa-trash"></i> Sil
                    </button>
                </td>
            `;
            table.appendChild(row);
        });
        
        // Add event listeners to buttons
        addViewEvaluationListeners();
        addDeleteEvaluationListeners();
    }
    
    // Add event listeners to view evaluation buttons
    function addViewEvaluationListeners() {
        const viewButtons = document.querySelectorAll('.view-evaluation');
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const evalId = this.getAttribute('data-id');
                openEvaluationModal(evalId);
            });
        });
    }
    
    // Add event listeners to delete evaluation buttons
    function addDeleteEvaluationListeners() {
        const deleteButtons = document.querySelectorAll('.delete-evaluation');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const evalId = this.getAttribute('data-id');
                if (confirm('Bu değerlendirmeyi silmek istediğinizden emin misiniz?')) {
                    deleteEvaluation(evalId);
                }
            });
        });
    }
    
    // Delete evaluation
    function deleteEvaluation(id) {
        // Get all evaluations
        const evaluations = getAllEvaluations();
        
        // Remove the evaluation with the given id
        const updatedEvaluations = evaluations.filter(eval => eval.id !== id);
        
        // Save updated evaluations
        localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
        
        // Reload admin data
        loadAdminData();
    }
    
    // Open evaluation modal
    function openEvaluationModal(id) {
        const modal = document.getElementById('evaluation-detail-modal');
        const modalContent = document.getElementById('evaluation-detail-content');
        
        if (!modal || !modalContent) return;
        
        // Get evaluation data
        const evaluations = getAllEvaluations();
        const evaluation = evaluations.find(eval => eval.id === id);
        
        if (!evaluation) {
            alert('Değerlendirme bulunamadı!');
            return;
        }
        
        // Populate modal content
        modalContent.innerHTML = generateDetailedReport(evaluation);
        
        // Show modal
        modal.style.display = 'block';
        
        // Close modal when clicking on X or close button
        const closeModal = document.querySelector('.close-modal');
        const closeModalBtn = document.getElementById('close-modal-btn');
        
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Print evaluation
        const printBtn = document.getElementById('print-evaluation-btn');
        if (printBtn) {
            printBtn.addEventListener('click', function() {
                printEvaluation(evaluation);
            });
        }
        
        // Export evaluation
        const exportBtn = document.getElementById('export-evaluation-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                exportEvaluation(evaluation);
            });
        }
    }
    
    // Generate detailed report HTML
    function generateDetailedReport(evaluation) {
        // Calculate percentages
        const workethicPercent = Math.round(evaluation.scores.workethic * 100 / 50);
        const loyaltyPercent = Math.round(evaluation.scores.loyalty * 100 / 50);
        const strengthsPercent = Math.round(evaluation.scores.strengths * 100 / 75);
        const weaknessesPercent = Math.round(evaluation.scores.weaknesses * 100 / 75);
        const compatibilityPercent = Math.round(evaluation.scores.compatibility * 100 / 50);
        
        // Get level descriptions
        const getLevel = (percent) => {
            if (percent >= 70) return 'Yüksek';
            if (percent >= 40) return 'Orta';
            return 'Düşük';
        };
        
        // Get overall level
        const getOverallLevel = (score) => {
            if (score >= 85) return 'Mükemmel';
            if (score >= 70) return 'İyi';
            if (score >= 50) return 'Ortalama';
            if (score >= 30) return 'Ortalamanın Altı';
            return 'Zayıf';
        };
        
        // Format date
        const formattedDate = formatDate(evaluation.date);
        
        // Generate HTML
        return `
            <div class="detailed-report">
                <div class="report-header">
                    <h3>${evaluation.evaluatedName} - Kişilik Analizi Raporu</h3>
                    <p><strong>Değerlendiren:</strong> ${evaluation.evaluatorName}</p>
                    <p><strong>Tarih:</strong> ${formattedDate}</p>
                    <p><strong>Değerlendirme ID:</strong> ${evaluation.id}</p>
                </div>
                
                <div class="report-summary">
                    <h3>Genel Değerlendirme</h3>
                    <div class="overall-score">
                        <div class="score-circle large">
                            <span>${evaluation.overallScore}%</span>
                        </div>
                        <div class="score-level">
                            <h4>${getOverallLevel(evaluation.overallScore)}</h4>
                            <p>${evaluation.summary}</p>
                        </div>
                    </div>
                </div>
                
                <div class="report-categories">
                    <h3>Kategori Puanları</h3>
                    
                    <div class="category-item">
                        <div class="category-header">
                            <h4>Çalışkanlık</h4>
                            <div class="category-score">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${workethicPercent}%"></div>
                                </div>
                                <span>${workethicPercent}% - ${getLevel(workethicPercent)}</span>
                            </div>
                        </div>
                        <div class="category-details">
                            <p>${evaluation.analysis.workethic}</p>
                        </div>
                    </div>
                    
                    <div class="category-item">
                        <div class="category-header">
                            <h4>Sadakat</h4>
                            <div class="category-score">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${loyaltyPercent}%"></div>
                                </div>
                                <span>${loyaltyPercent}% - ${getLevel(loyaltyPercent)}</span>
                            </div>
                        </div>
                        <div class="category-details">
                            <p>${evaluation.analysis.loyalty}</p>
                        </div>
                    </div>
                    
                    <div class="category-item">
                        <div class="category-header">
                            <h4>Güçlü Yönler</h4>
                            <div class="category-score">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${strengthsPercent}%"></div>
                                </div>
                                <span>${strengthsPercent}% - ${getLevel(strengthsPercent)}</span>
                            </div>
                        </div>
                        <div class="category-details">
                            <p>${evaluation.analysis.strengths}</p>
                            <h5>En Belirgin Güçlü Yönler:</h5>
                            <ul>
                                ${evaluation.topStrengths.map(strength => `<li>${strength}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="category-item">
                        <div class="category-header">
                            <h4>Zayıf Yönler</h4>
                            <div class="category-score">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${weaknessesPercent}%"></div>
                                </div>
                                <span>${weaknessesPercent}% - ${getLevel(weaknessesPercent)}</span>
                            </div>
                        </div>
                        <div class="category-details">
                            <p>${evaluation.analysis.weaknesses}</p>
                            <h5>Gelişime Açık Alanlar:</h5>
                            <ul>
                                ${evaluation.topWeaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="category-item">
                        <div class="category-header">
                            <h4>Uyumluluk</h4>
                            <div class="category-score">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${compatibilityPercent}%"></div>
                                </div>
                                <span>${compatibilityPercent}% - ${getLevel(compatibilityPercent)}</span>
                            </div>
                        </div>
                        <div class="category-details">
                            <p>${evaluation.analysis.compatibility}</p>
                        </div>
                    </div>
                </div>
                
                <div class="report-recommendations">
                    <h3>Profesyonel Tavsiyeler</h3>
                    <div class="recommendations-content">
                        ${evaluation.recommendations}
                    </div>
                </div>
                
                <div class="report-notes">
                    <h3>Ek Notlar</h3>
                    <p>${evaluation.notes || 'Ek not bulunmamaktadır.'}</p>
                </div>
                
                <div class="report-questions">
                    <h3>Değerlendirme Soruları ve Cevapları</h3>
                    <div class="questions-accordion">
                        <div class="accordion-item">
                            <div class="accordion-header">
                                <h4>Çalışkanlık Soruları</h4>
                                <span class="accordion-toggle">+</span>
                            </div>
                            <div class="accordion-content">
                                <table class="questions-table">
                                    <thead>
                                        <tr>
                                            <th>Soru</th>
                                            <th>Puan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${evaluation.answers.workethic.map(answer => `
                                            <tr>
                                                <td>${answer.question}</td>
                                                <td>${answer.score}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="accordion-item">
                            <div class="accordion-header">
                                <h4>Sadakat Soruları</h4>
                                <span class="accordion-toggle">+</span>
                            </div>
                            <div class="accordion-content">
                                <table class="questions-table">
                                    <thead>
                                        <tr>
                                            <th>Soru</th>
                                            <th>Puan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${evaluation.answers.loyalty.map(answer => `
                                            <tr>
                                                <td>${answer.question}</td>
                                                <td>${answer.score}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="accordion-item">
                            <div class="accordion-header">
                                <h4>Güçlü Yönler Soruları</h4>
                                <span class="accordion-toggle">+</span>
                            </div>
                            <div class="accordion-content">
                                <table class="questions-table">
                                    <thead>
                                        <tr>
                                            <th>Soru</th>
                                            <th>Puan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${evaluation.answers.strengths.map(answer => `
                                            <tr>
                                                <td>${answer.question}</td>
                                                <td>${answer.score}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="accordion-item">
                            <div class="accordion-header">
                                <h4>Zayıf Yönler Soruları</h4>
                                <span class="accordion-toggle">+</span>
                            </div>
                            <div class="accordion-content">
                                <table class="questions-table">
                                    <thead>
                                        <tr>
                                            <th>Soru</th>
                                            <th>Puan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${evaluation.answers.weaknesses.map(answer => `
                                            <tr>
                                                <td>${answer.question}</td>
                                                <td>${answer.score}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="accordion-item">
                            <div class="accordion-header">
                                <h4>Uyumluluk Soruları</h4>
                                <span class="accordion-toggle">+</span>
                            </div>
                            <div class="accordion-content">
                                <table class="questions-table">
                                    <thead>
                                        <tr>
                                            <th>Soru</th>
                                            <th>Puan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${evaluation.answers.compatibility.map(answer => `
                                            <tr>
                                                <td>${answer.question}</td>
                                                <td>${answer.score}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Print evaluation
    function printEvaluation(evaluation) {
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${evaluation.evaluatedName} - Kişilik Analizi Raporu</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        padding: 20px;
                    }
                    
                    h1, h2, h3, h4 {
                        color: #2c3e50;
                    }
                    
                    .report-header {
                        text-align: center;
                        margin-bottom: 30px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #eee;
                    }
                    
                    .category-item {
                        margin-bottom: 20px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #eee;
                    }
                    
                    .category-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .progress-bar {
                        width: 200px;
                        height: 15px;
                        background-color: #ecf0f1;
                        border-radius: 10px;
                        overflow: hidden;
                        margin-bottom: 5px;
                    }
                    
                    .progress-fill {
                        height: 100%;
                        background-color: #3498db;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    
                    th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    
                    th {
                        background-color: #f2f2f2;
                    }
                    
                    @media print {
                        body {
                            padding: 0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="report-header">
                    <h1>${evaluation.evaluatedName} - Kişilik Analizi Raporu</h1>
                    <p><strong>Değerlendiren:</strong> ${evaluation.evaluatorName}</p>
                    <p><strong>Tarih:</strong> ${formatDate(evaluation.date)}</p>
                    <p><strong>Değerlendirme ID:</strong> ${evaluation.id}</p>
                </div>
                
                <h2>Genel Değerlendirme</h2>
                <p><strong>Genel Puan:</strong> ${evaluation.overallScore}%</p>
                <p>${evaluation.summary}</p>
                
                <h2>Kategori Puanları</h2>
                
                <div class="category-item">
                    <div class="category-header">
                        <h3>Çalışkanlık</h3>
                        <p>${Math.round(evaluation.scores.workethic * 100 / 50)}%</p>
                    </div>
                    <p>${evaluation.analysis.workethic}</p>
                </div>
                
                <div class="category-item">
                    <div class="category-header">
                        <h3>Sadakat</h3>
                        <p>${Math.round(evaluation.scores.loyalty * 100 / 50)}%</p>
                    </div>
                    <p>${evaluation.analysis.loyalty}</p>
                </div>
                
                <div class="category-item">
                    <div class="category-header">
                        <h3>Güçlü Yönler</h3>
                        <p>${Math.round(evaluation.scores.strengths * 100 / 75)}%</p>
                    </div>
                    <p>${evaluation.analysis.strengths}</p>
                    <h4>En Belirgin Güçlü Yönler:</h4>
                    <ul>
                        ${evaluation.topStrengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="category-item">
                    <div class="category-header">
                        <h3>Zayıf Yönler</h3>
                        <p>${Math.round(evaluation.scores.weaknesses * 100 / 75)}%</p>
                    </div>
                    <p>${evaluation.analysis.weaknesses}</p>
                    <h4>Gelişime Açık Alanlar:</h4>
                    <ul>
                        ${evaluation.topWeaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="category-item">
                    <div class="category-header">
                        <h3>Uyumluluk</h3>
                        <p>${Math.round(evaluation.scores.compatibility * 100 / 50)}%</p>
                    </div>
                    <p>${evaluation.analysis.compatibility}</p>
                </div>
                
                <h2>Profesyonel Tavsiyeler</h2>
                <div>${evaluation.recommendations}</div>
                
                <h2>Ek Notlar</h2>
                <p>${evaluation.notes || 'Ek not bulunmamaktadır.'}</p>
                
                <h2>Değerlendirme Soruları ve Cevapları</h2>
                
                <h3>Çalışkanlık Soruları</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Soru</th>
                            <th>Puan</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${evaluation.answers.workethic.map(answer => `
                            <tr>
                                <td>${answer.question}</td>
                                <td>${answer.score}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <h3>Sadakat Soruları</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Soru</th>
                            <th>Puan</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${evaluation.answers.loyalty.map(answer => `
                            <tr>
                                <td>${answer.question}</td>
                                <td>${answer.score}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <h3>Güçlü Yönler Soruları</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Soru</th>
                            <th>Puan</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${evaluation.answers.strengths.map(answer => `
                            <tr>
                                <td>${answer.question}</td>
                                <td>${answer.score}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <h3>Zayıf Yönler Soruları</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Soru</th>
                            <th>Puan</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${evaluation.answers.weaknesses.map(answer => `
                            <tr>
                                <td>${answer.question}</td>
                                <td>${answer.score}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <h3>Uyumluluk Soruları</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Soru</th>
                            <th>Puan</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${evaluation.answers.compatibility.map(answer => `
                            <tr>
                                <td>${answer.question}</td>
                                <td>${answer.score}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
    }
    
    // Export evaluation as CSV
    function exportEvaluation(evaluation) {
        // Create CSV content
        let csvContent = 'data:text/csv;charset=utf-8,';
        
        // Add header
        csvContent += 'Değerlendirme Raporu\r\n';
        csvContent += `Değerlendirilen Kişi,${evaluation.evaluatedName}\r\n`;
        csvContent += `Değerlendiren Kişi,${evaluation.evaluatorName}\r\n`;
        csvContent += `Tarih,${formatDate(evaluation.date)}\r\n`;
        csvContent += `ID,${evaluation.id}\r\n\r\n`;
        
        // Add scores
        csvContent += 'Kategori,Puan,Yüzde\r\n';
        csvContent += `Çalışkanlık,${evaluation.scores.workethic},${Math.round(evaluation.scores.workethic * 100 / 50)}%\r\n`;
        csvContent += `Sadakat,${evaluation.scores.loyalty},${Math.round(evaluation.scores.loyalty * 100 / 50)}%\r\n`;
        csvContent += `Güçlü Yönler,${evaluation.scores.strengths},${Math.round(evaluation.scores.strengths * 100 / 75)}%\r\n`;
        csvContent += `Zayıf Yönler,${evaluation.scores.weaknesses},${Math.round(evaluation.scores.weaknesses * 100 / 75)}%\r\n`;
        csvContent += `Uyumluluk,${evaluation.scores.compatibility},${Math.round(evaluation.scores.compatibility * 100 / 50)}%\r\n`;
        csvContent += `Genel Puan,,${evaluation.overallScore}%\r\n\r\n`;
        
        // Add questions and answers
        csvContent += 'Çalışkanlık Soruları,Puan\r\n';
        evaluation.answers.workethic.forEach(answer => {
            csvContent += `"${answer.question}",${answer.score}\r\n`;
        });
        
        csvContent += '\r\nSadakat Soruları,Puan\r\n';
        evaluation.answers.loyalty.forEach(answer => {
            csvContent += `"${answer.question}",${answer.score}\r\n`;
        });
        
        csvContent += '\r\nGüçlü Yönler Soruları,Puan\r\n';
        evaluation.answers.strengths.forEach(answer => {
            csvContent += `"${answer.question}",${answer.score}\r\n`;
        });
        
        csvContent += '\r\nZayıf Yönler Soruları,Puan\r\n';
        evaluation.answers.weaknesses.forEach(answer => {
            csvContent += `"${answer.question}",${answer.score}\r\n`;
        });
        
        csvContent += '\r\nUyumluluk Soruları,Puan\r\n';
        evaluation.answers.compatibility.forEach(answer => {
            csvContent += `"${answer.question}",${answer.score}\r\n`;
        });
        
        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${evaluation.evaluatedName}_Kisilik_Analizi.csv`);
        document.body.appendChild(link);
        
        // Trigger download
        link.click();
        
        // Clean up
        document.body.removeChild(link);
    }
    
    // Reports Data
    function loadReportsData() {
        // Get all evaluations
        const evaluations = getAllEvaluations();
        
        // Populate individual report select
        const individualSelect = document.getElementById('individual-report-select');
        if (individualSelect) {
            individualSelect.innerHTML = '<option value="">Değerlendirme seçin...</option>';
            
            evaluations.forEach(eval => {
                const option = document.createElement('option');
                option.value = eval.id;
                option.textContent = `${eval.evaluatedName} (${formatDate(eval.date)})`;
                individualSelect.appendChild(option);
            });
        }
        
        // Populate comparison report selects
        const comparisonSelect1 = document.getElementById('comparison-report-select1');
        const comparisonSelect2 = document.getElementById('comparison-report-select2');
        
        if (comparisonSelect1 && comparisonSelect2) {
            comparisonSelect1.innerHTML = '<option value="">İlk değerlendirme seçin...</option>';
            comparisonSelect2.innerHTML = '<option value="">İkinci değerlendirme seçin...</option>';
            
            evaluations.forEach(eval => {
                const option1 = document.createElement('option');
                option1.value = eval.id;
                option1.textContent = `${eval.evaluatedName} (${formatDate(eval.date)})`;
                comparisonSelect1.appendChild(option1);
                
                const option2 = document.createElement('option');
                option2.value = eval.id;
                option2.textContent = `${eval.evaluatedName} (${formatDate(eval.date)})`;
                comparisonSelect2.appendChild(option2);
            });
        }
        
        // Show/hide report options based on report type
        const reportType = document.getElementById('report-type');
        const individualSelection = document.getElementById('individual-selection');
        const comparisonSelection = document.getElementById('comparison-selection');
        const summarySelection = document.getElementById('summary-selection');
        
        if (reportType && individualSelection && comparisonSelection && summarySelection) {
            reportType.addEventListener('change', function() {
                const type = this.value;
                
                individualSelection.style.display = type === 'individual' ? 'block' : 'none';
                comparisonSelection.style.display = type === 'comparison' ? 'block' : 'none';
                summarySelection.style.display = type === 'summary' ? 'block' : 'none';
            });
        }
        
        // Generate report button
        const generateReportBtn = document.getElementById('generate-report-btn');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', function() {
                const type = document.getElementById('report-type').value;
                const format = document.getElementById('report-format').value;
                const detailLevel = document.getElementById('report-detail-level').value;
                
                switch (type) {
                    case 'individual':
                        const evalId = document.getElementById('individual-report-select').value;
                        if (!evalId) {
                            alert('Lütfen bir değerlendirme seçin!');
                            return;
                        }
                        
                        const evaluation = evaluations.find(eval => eval.id === evalId);
                        if (evaluation) {
                            if (format === 'pdf') {
                                printEvaluation(evaluation);
                            } else if (format === 'excel') {
                                exportEvaluation(evaluation);
                            } else {
                                openEvaluationModal(evalId);
                            }
                        }
                        break;
                        
                    case 'comparison':
                        const evalId1 = document.getElementById('comparison-report-select1').value;
                        const evalId2 = document.getElementById('comparison-report-select2').value;
                        
                        if (!evalId1 || !evalId2) {
                            alert('Lütfen iki değerlendirme seçin!');
                            return;
                        }
                        
                        if (evalId1 === evalId2) {
                            alert('Lütfen farklı değerlendirmeler seçin!');
                            return;
                        }
                        
                        const eval1 = evaluations.find(eval => eval.id === evalId1);
                        const eval2 = evaluations.find(eval => eval.id === evalId2);
                        
                        if (eval1 && eval2) {
                            generateComparisonReport(eval1, eval2, format);
                        }
                        break;
                        
                    case 'summary':
                        const startDate = document.getElementById('summary-date-start').value;
                        const endDate = document.getElementById('summary-date-end').value;
                        
                        if (!startDate || !endDate) {
                            alert('Lütfen başlangıç ve bitiş tarihlerini seçin!');
                            return;
                        }
                        
                        generateSummaryReport(evaluations, startDate, endDate, format);
                        break;
                }
            });
        }
    }
    
    // Generate comparison report
    function generateComparisonReport(eval1, eval2, format) {
        alert('Karşılaştırma raporu oluşturma özelliği henüz geliştirilme aşamasındadır.');
    }
    
    // Generate summary report
    function generateSummaryReport(evaluations, startDate, endDate, format) {
        alert('Özet rapor oluşturma özelliği henüz geliştirilme aşamasındadır.');
    }
    
    // Settings Data
    function loadSettingsData() {
        // Load admin username
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth) {
            try {
                const auth = JSON.parse(adminAuth);
                if (auth && auth.username) {
                    const usernameInput = document.getElementById('admin-username-change');
                    if (usernameInput) {
                        usernameInput.value = auth.username;
                    }
                }
            } catch (e) {
                console.error('Error parsing admin auth:', e);
            }
        }
        
        // Admin account form
        const adminAccountForm = document.getElementById('admin-account-form');
        if (adminAccountForm) {
            adminAccountForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newUsername = document.getElementById('admin-username-change').value;
                const currentPassword = document.getElementById('admin-current-password').value;
                const newPassword = document.getElementById('admin-new-password').value;
                const confirmPassword = document.getElementById('admin-confirm-password').value;
                
                // Validate current password
                if (currentPassword !== defaultAdmin.password) {
                    alert('Mevcut şifre yanlış!');
                    return;
                }
                
                // Check if new password is provided
                if (newPassword) {
                    // Validate new password
                    if (newPassword.length < 6) {
                        alert('Yeni şifre en az 6 karakter olmalıdır!');
                        return;
                    }
                    
                    // Check if passwords match
                    if (newPassword !== confirmPassword) {
                        alert('Yeni şifreler eşleşmiyor!');
                        return;
                    }
                    
                    // Update password
                    defaultAdmin.password = newPassword;
                }
                
                // Update username
                if (newUsername && newUsername !== defaultAdmin.username) {
                    defaultAdmin.username = newUsername;
                    
                    // Update admin auth in localStorage
                    const adminAuth = localStorage.getItem('adminAuth');
                    if (adminAuth) {
                        try {
                            const auth = JSON.parse(adminAuth);
                            auth.username = newUsername;
                            localStorage.setItem('adminAuth', JSON.stringify(auth));
                            
                            // Update displayed username
                            adminUsernameDisplay.textContent = newUsername;
                        } catch (e) {
                            console.error('Error parsing admin auth:', e);
                        }
                    }
                }
                
                alert('Admin hesap bilgileri başarıyla güncellendi!');
                
                // Clear password fields
                document.getElementById('admin-current-password').value = '';
                document.getElementById('admin-new-password').value = '';
                document.getElementById('admin-confirm-password').value = '';
            });
        }
        
        // System settings form
        const systemSettingsForm = document.getElementById('system-settings-form');
        if (systemSettingsForm) {
            systemSettingsForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const resultVisibility = document.getElementById('result-visibility').value;
                const dataRetention = document.getElementById('data-retention').value;
                
                // Save settings to localStorage
                localStorage.setItem('systemSettings', JSON.stringify({
                    resultVisibility: resultVisibility,
                    dataRetention: dataRetention
                }));
                
                alert('Sistem ayarları başarıyla kaydedildi!');
            });
        }
        
        // Data management buttons
        const exportAllDataBtn = document.getElementById('export-all-data');
        if (exportAllDataBtn) {
            exportAllDataBtn.addEventListener('click', function() {
                exportAllData();
            });
        }
        
        const importDataBtn = document.getElementById('import-data');
        if (importDataBtn) {
            importDataBtn.addEventListener('click', function() {
                alert('Veri içe aktarma özelliği henüz geliştirilme aşamasındadır.');
            });
        }
        
        const clearAllDataBtn = document.getElementById('clear-all-data');
        if (clearAllDataBtn) {
            clearAllDataBtn.addEventListener('click', function() {
                if (confirm('Tüm değerlendirme verilerini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
                    localStorage.removeItem('evaluations');
                    alert('Tüm veriler başarıyla silindi!');
                    loadAdminData();
                }
            });
        }
    }
    
    // Export all data
    function exportAllData() {
        // Get all data from localStorage
        const evaluations = localStorage.getItem('evaluations') || '[]';
        const systemSettings = localStorage.getItem('systemSettings') || '{}';
        
        // Create data object
        const data = {
            evaluations: JSON.parse(evaluations),
            systemSettings: JSON.parse(systemSettings),
            exportDate: new Date().toISOString()
        };
        
        // Convert to JSON
        const jsonData = JSON.stringify(data, null, 2);
        
        // Create download link
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `kisilik_analizi_verileri_${formatDateForFilename(new Date())}.json`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    // Helper Functions
    
    // Get all evaluations from localStorage
    function getAllEvaluations() {
        const evaluationsJson = localStorage.getItem('evaluations');
        return evaluationsJson ? JSON.parse(evaluationsJson) : [];
    }
    
    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    
    // Format date for filename
    function formatDateForFilename(date) {
        return date.toISOString().split('T')[0];
    }
    
    // Initialize admin panel
    checkAdminLogin();
});
