// Detaylı Raporlama Modülü
class DetailedReportGenerator {
    constructor() {
        this.reportTemplates = {
            basic: {
                sections: ['summary', 'scores'],
                charts: ['radar'],
                details: false
            },
            standard: {
                sections: ['summary', 'scores', 'strengths', 'weaknesses', 'recommendations'],
                charts: ['radar', 'bar'],
                details: false
            },
            detailed: {
                sections: ['summary', 'scores', 'strengths', 'weaknesses', 'compatibility', 'recommendations', 'notes'],
                charts: ['radar', 'bar', 'line'],
                details: true
            },
            comprehensive: {
                sections: ['summary', 'scores', 'strengths', 'weaknesses', 'compatibility', 'recommendations', 'notes', 'questions', 'answers', 'analysis'],
                charts: ['radar', 'bar', 'line', 'polar', 'doughnut'],
                details: true,
                comparisons: true,
                trends: true
            }
        };
    }

    // Ana rapor oluşturma fonksiyonu
    generateReport(evaluation, format = 'html', detailLevel = 'detailed') {
        if (!evaluation) return null;
        
        const template = this.reportTemplates[detailLevel] || this.reportTemplates.detailed;
        
        switch (format.toLowerCase()) {
            case 'html':
                return this.generateHtmlReport(evaluation, template);
            case 'pdf':
                return this.generatePdfReport(evaluation, template);
            case 'excel':
            case 'csv':
                return this.generateCsvReport(evaluation, template);
            case 'json':
                return this.generateJsonReport(evaluation, template);
            default:
                return this.generateHtmlReport(evaluation, template);
        }
    }
    
    // HTML formatında rapor oluşturma
    generateHtmlReport(evaluation, template) {
        // Temel değerlendirme bilgilerini hazırla
        const basicInfo = this.prepareBasicInfo(evaluation);
        
        // Kategori puanlarını hazırla
        const categoryScores = this.prepareCategoryScores(evaluation);
        
        // Güçlü ve zayıf yönleri hazırla
        const strengths = this.prepareStrengths(evaluation);
        const weaknesses = this.prepareWeaknesses(evaluation);
        
        // Uyumluluk bilgilerini hazırla
        const compatibility = this.prepareCompatibility(evaluation);
        
        // Tavsiyeleri hazırla
        const recommendations = this.prepareRecommendations(evaluation);
        
        // Detaylı analiz hazırla
        const detailedAnalysis = template.details ? this.prepareDetailedAnalysis(evaluation) : '';
        
        // Soru ve cevapları hazırla
        const questionsAndAnswers = template.details ? this.prepareQuestionsAndAnswers(evaluation) : '';
        
        // Grafikleri hazırla
        const charts = this.prepareCharts(evaluation, template.charts);
        
        // Rapor HTML'ini oluştur
        let reportHtml = `
            <div class="detailed-report">
                <div class="report-header">
                    <h1>${evaluation.evaluatedName} - Kişilik Analizi Raporu</h1>
                    <div class="report-meta">
                        <p><strong>Değerlendiren:</strong> ${evaluation.evaluatorName}</p>
                        <p><strong>Tarih:</strong> ${this.formatDate(evaluation.date)}</p>
                        <p><strong>Değerlendirme ID:</strong> ${evaluation.id}</p>
                    </div>
                </div>
                
                <div class="report-summary">
                    <h2>Genel Değerlendirme</h2>
                    <div class="overall-score-container">
                        <div class="score-circle large">
                            <span>${evaluation.overallScore}%</span>
                        </div>
                        <div class="score-level">
                            <h3>${this.getOverallLevel(evaluation.overallScore)}</h3>
                            <p>${evaluation.summary}</p>
                        </div>
                    </div>
                </div>
        `;
        
        // Grafikleri ekle
        if (charts) {
            reportHtml += `
                <div class="report-charts">
                    <h2>Performans Grafikleri</h2>
                    <div class="charts-container">
                        ${charts}
                    </div>
                </div>
            `;
        }
        
        // Kategori puanlarını ekle
        reportHtml += `
            <div class="report-categories">
                <h2>Kategori Puanları</h2>
                ${categoryScores}
            </div>
        `;
        
        // Güçlü yönleri ekle (eğer template'de varsa)
        if (template.sections.includes('strengths')) {
            reportHtml += `
                <div class="report-strengths">
                    <h2>Güçlü Yönler</h2>
                    ${strengths}
                </div>
            `;
        }
        
        // Zayıf yönleri ekle (eğer template'de varsa)
        if (template.sections.includes('weaknesses')) {
            reportHtml += `
                <div class="report-weaknesses">
                    <h2>Gelişime Açık Alanlar</h2>
                    ${weaknesses}
                </div>
            `;
        }
        
        // Uyumluluk bilgilerini ekle (eğer template'de varsa)
        if (template.sections.includes('compatibility')) {
            reportHtml += `
                <div class="report-compatibility">
                    <h2>İş Ortağı Uyumluluğu</h2>
                    ${compatibility}
                </div>
            `;
        }
        
        // Tavsiyeleri ekle (eğer template'de varsa)
        if (template.sections.includes('recommendations')) {
            reportHtml += `
                <div class="report-recommendations">
                    <h2>Profesyonel Tavsiyeler</h2>
                    <div class="recommendations-content">
                        ${recommendations}
                    </div>
                </div>
            `;
        }
        
        // Notları ekle (eğer template'de varsa ve not varsa)
        if (template.sections.includes('notes') && evaluation.notes) {
            reportHtml += `
                <div class="report-notes">
                    <h2>Ek Notlar</h2>
                    <p>${evaluation.notes}</p>
                </div>
            `;
        }
        
        // Detaylı analizi ekle (eğer template'de detaylar varsa)
        if (template.details && template.sections.includes('analysis')) {
            reportHtml += `
                <div class="report-detailed-analysis">
                    <h2>Detaylı Kişilik Analizi</h2>
                    ${detailedAnalysis}
                </div>
            `;
        }
        
        // Soru ve cevapları ekle (eğer template'de detaylar varsa)
        if (template.details && template.sections.includes('questions')) {
            reportHtml += `
                <div class="report-questions">
                    <h2>Değerlendirme Soruları ve Cevapları</h2>
                    ${questionsAndAnswers}
                </div>
            `;
        }
        
        // Raporu kapat
        reportHtml += `
            <div class="report-footer">
                <p>Bu rapor, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulaması tarafından oluşturulmuştur.</p>
                <p>Rapor Oluşturma Tarihi: ${this.formatDate(new Date())}</p>
            </div>
        </div>
        `;
        
        return reportHtml;
    }
    
    // PDF formatında rapor oluşturma (HTML'i PDF'e dönüştürme)
    generatePdfReport(evaluation, template) {
        // HTML raporu oluştur
        const htmlReport = this.generateHtmlReport(evaluation, template);
        
        // PDF için stil ekle
        const pdfStyles = `
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
        `;
        
        // PDF için tam HTML
        const pdfHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${evaluation.evaluatedName} - Kişilik Analizi Raporu</title>
                ${pdfStyles}
            </head>
            <body>
                ${htmlReport}
                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
            </body>
            </html>
        `;
        
        return pdfHtml;
    }
    
    // CSV formatında rapor oluşturma
    generateCsvReport(evaluation, template) {
        // CSV içeriğini oluştur
        let csvContent = 'data:text/csv;charset=utf-8,';
        
        // Başlık bilgilerini ekle
        csvContent += 'Değerlendirme Raporu\r\n';
        csvContent += `Değerlendirilen Kişi,${evaluation.evaluatedName}\r\n`;
        csvContent += `Değerlendiren Kişi,${evaluation.evaluatorName}\r\n`;
        csvContent += `Tarih,${this.formatDate(evaluation.date)}\r\n`;
        csvContent += `ID,${evaluation.id}\r\n\r\n`;
        
        // Puanları ekle
        csvContent += 'Kategori,Puan,Yüzde\r\n';
        csvContent += `Çalışkanlık,${evaluation.scores.workethic},${Math.round(evaluation.scores.workethic * 100 / 50)}%\r\n`;
        csvContent += `Sadakat,${evaluation.scores.loyalty},${Math.round(evaluation.scores.loyalty * 100 / 50)}%\r\n`;
        csvContent += `Güçlü Yönler,${evaluation.scores.strengths},${Math.round(evaluation.scores.strengths * 100 / 75)}%\r\n`;
        csvContent += `Zayıf Yönler,${evaluation.scores.weaknesses},${Math.round(evaluation.scores.weaknesses * 100 / 75)}%\r\n`;
        csvContent += `Uyumluluk,${evaluation.scores.compatibility},${Math.round(evaluation.scores.compatibility * 100 / 50)}%\r\n`;
        csvContent += `Genel Puan,,${evaluation.overallScore}%\r\n\r\n`;
        
        // Güçlü yönleri ekle
        if (template.sections.includes('strengths')) {
            csvContent += 'Güçlü Yönler\r\n';
            evaluation.topStrengths.forEach(strength => {
                csvContent += `${strength}\r\n`;
            });
            csvContent += '\r\n';
        }
        
        // Zayıf yönleri ekle
        if (template.sections.includes('weaknesses')) {
            csvContent += 'Gelişime Açık Alanlar\r\n';
            evaluation.topWeaknesses.forEach(weakness => {
                csvContent += `${weakness}\r\n`;
            });
            csvContent += '\r\n';
        }
        
        // Detaylı analizi ekle
        if (template.details && template.sections.includes('analysis')) {
            csvContent += 'Detaylı Analiz\r\n';
            csvContent += `Çalışkanlık,${evaluation.analysis.workethic}\r\n`;
            csvContent += `Sadakat,${evaluation.analysis.loyalty}\r\n`;
            csvContent += `Güçlü Yönler,${evaluation.analysis.strengths}\r\n`;
            csvContent += `Zayıf Yönler,${evaluation.analysis.weaknesses}\r\n`;
            csvContent += `Uyumluluk,${evaluation.analysis.compatibility}\r\n\r\n`;
        }
        
        // Soruları ve cevapları ekle
        if (template.details && template.sections.includes('questions')) {
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
        }
        
        return csvContent;
    }
    
    // JSON formatında rapor oluşturma
    generateJsonReport(evaluation, template) {
        // Temel rapor verilerini oluştur
        const reportData = {
            basicInfo: {
                evaluatedName: evaluation.evaluatedName,
                evaluatorName: evaluation.evaluatorName,
                date: evaluation.date,
                id: evaluation.id
            },
            summary: {
                overallScore: evaluation.overallScore,
                level: this.getOverallLevel(evaluation.overallScore),
                summaryText: evaluation.summary
            },
            scores: {
                workethic: {
                    raw: evaluation.scores.workethic,
                    percentage: Math.round(evaluation.scores.workethic * 100 / 50),
                    level: this.getLevel(Math.round(evaluation.scores.workethic * 100 / 50))
                },
                loyalty: {
                    raw: evaluation.scores.loyalty,
                    percentage: Math.round(evaluation.scores.loyalty * 100 / 50),
                    level: this.getLevel(Math.round(evaluation.scores.loyalty * 100 / 50))
                },
                strengths: {
                    raw: evaluation.scores.strengths,
                    percentage: Math.round(evaluation.scores.strengths * 100 / 75),
                    level: this.getLevel(Math.round(evaluation.scores.strengths * 100 / 75))
                },
                weaknesses: {
                    raw: evaluation.scores.weaknesses,
                    percentage: Math.round(evaluation.scores.weaknesses * 100 / 75),
                    level: this.getLevel(Math.round(evaluation.scores.weaknesses * 100 / 75))
                },
                compatibility: {
                    raw: evaluation.scores.compatibility,
                    percentage: Math.round(evaluation.scores.compatibility * 100 / 50),
                    level: this.getLevel(Math.round(evaluation.scores.compatibility * 100 / 50))
                }
            }
        };
        
        // Template'e göre ek bilgileri ekle
        if (template.sections.includes('strengths')) {
            reportData.strengths = {
                analysis: evaluation.analysis.strengths,
                topStrengths: evaluation.topStrengths
            };
        }
        
        if (template.sections.includes('weaknesses')) {
            reportData.weaknesses = {
                analysis: evaluation.analysis.weaknesses,
                topWeaknesses: evaluation.topWeaknesses
            };
        }
        
        if (template.sections.includes('compatibility')) {
            reportData.compatibility = {
                analysis: evaluation.analysis.compatibility
            };
        }
        
        if (template.sections.includes('recommendations')) {
            reportData.recommendations = evaluation.recommendations;
        }
        
        if (template.sections.includes('notes') && evaluation.notes) {
            reportData.notes = evaluation.notes;
        }
        
        // Detaylı bilgileri ekle
        if (template.details && template.sections.includes('analysis')) {
            reportData.detailedAnalysis = {
                workethic: evaluation.analysis.workethic,
                loyalty: evaluation.analysis.loyalty,
                strengths: evaluation.analysis.strengths,
                weaknesses: evaluation.analysis.weaknesses,
                compatibility: evaluation.analysis.compatibility
            };
        }
        
        // Soru ve cevapları ekle
        if (template.details && template.sections.includes('questions')) {
            reportData.questionsAndAnswers = {
                workethic: evaluation.answers.workethic,
                loyalty: evaluation.answers.loyalty,
                strengths: evaluation.answers.strengths,
                weaknesses: evaluation.answers.weaknesses,
                compatibility: evaluation.answers.compatibility
            };
        }
        
        // JSON'a dönüştür
        return JSON.stringify(reportData, null, 2);
    }
    
    // Karşılaştırmalı rapor oluşturma
    generateComparisonReport(eval1, eval2, format = 'html', detailLevel = 'detailed') {
        if (!eval1 || !eval2) return null;
        
        const template = this.reportTemplates[detailLevel] || this.reportTemplates.detailed;
        
        // Karşılaştırma verilerini hazırla
        const comparisonData = this.prepareComparisonData(eval1, eval2);
        
        switch (format.toLowerCase()) {
            case 'html':
                return this.generateComparisonHtmlReport(eval1, eval2, comparisonData, template);
            case 'pdf':
                return this.generateComparisonPdfReport(eval1, eval2, comparisonData, template);
            case 'excel':
            case 'csv':
                return this.generateComparisonCsvReport(eval1, eval2, comparisonData, template);
            case 'json':
                return this.generateComparisonJsonReport(eval1, eval2, comparisonData, template);
            default:
                return this.generateComparisonHtmlReport(eval1, eval2, comparisonData, template);
        }
    }
    
    // Karşılaştırma verilerini hazırlama
    prepareComparisonData(eval1, eval2) {
        // Kategori puanlarını karşılaştır
        const scoreComparison = {
            workethic: {
                eval1: Math.round(eval1.scores.workethic * 100 / 50),
                eval2: Math.round(eval2.scores.workethic * 100 / 50),
                difference: Math.round(eval1.scores.workethic * 100 / 50) - Math.round(eval2.scores.workethic * 100 / 50)
            },
            loyalty: {
                eval1: Math.round(eval1.scores.loyalty * 100 / 50),
                eval2: Math.round(eval2.scores.loyalty * 100 / 50),
                difference: Math.round(eval1.scores.loyalty * 100 / 50) - Math.round(eval2.scores.loyalty * 100 / 50)
            },
            strengths: {
                eval1: Math.round(eval1.scores.strengths * 100 / 75),
                eval2: Math.round(eval2.scores.strengths * 100 / 75),
                difference: Math.round(eval1.scores.strengths * 100 / 75) - Math.round(eval2.scores.strengths * 100 / 75)
            },
            weaknesses: {
                eval1: Math.round(eval1.scores.weaknesses * 100 / 75),
                eval2: Math.round(eval2.scores.weaknesses * 100 / 75),
                difference: Math.round(eval1.scores.weaknesses * 100 / 75) - Math.round(eval2.scores.weaknesses * 100 / 75)
            },
            compatibility: {
                eval1: Math.round(eval1.scores.compatibility * 100 / 50),
                eval2: Math.round(eval2.scores.compatibility * 100 / 50),
                difference: Math.round(eval1.scores.compatibility * 100 / 50) - Math.round(eval2.scores.compatibility * 100 / 50)
            },
            overall: {
                eval1: eval1.overallScore,
                eval2: eval2.overallScore,
                difference: eval1.overallScore - eval2.overallScore
            }
        };
        
        // Ortak güçlü yönleri bul
        const commonStrengths = eval1.topStrengths.filter(strength => 
            eval2.topStrengths.includes(strength)
        );
        
        // Ortak zayıf yönleri bul
        const commonWeaknesses = eval1.topWeaknesses.filter(weakness => 
            eval2.topWeaknesses.includes(weakness)
        );
        
        // Tamamlayıcı güçlü yönleri bul
        const complementaryStrengths = {
            eval1: eval1.topStrengths.filter(strength => !eval2.topStrengths.includes(strength)),
            eval2: eval2.topStrengths.filter(strength => !eval1.topStrengths.includes(strength))
        };
        
        // Tamamlayıcı zayıf yönleri bul
        const complementaryWeaknesses = {
            eval1: eval1.topWeaknesses.filter(weakness => !eval2.topWeaknesses.includes(weakness)),
            eval2: eval2.topWeaknesses.filter(weakness => !eval1.topWeaknesses.includes(weakness))
        };
        
        // Uyumluluk analizi
        const compatibilityAnalysis = this.analyzeCompatibility(eval1, eval2);
        
        return {
            scoreComparison,
            commonStrengths,
            commonWeaknesses,
            complementaryStrengths,
            complementaryWeaknesses,
            compatibilityAnalysis
        };
    }
    
    // Uyumluluk analizi
    analyzeCompatibility(eval1, eval2) {
        // Genel uyumluluk puanı hesapla (0-100 arası)
        const overallCompatibility = Math.round(
            (100 - Math.abs(eval1.scores.workethic - eval2.scores.workethic) * 100 / 50 * 0.2) *
            (100 - Math.abs(eval1.scores.loyalty - eval2.scores.loyalty) * 100 / 50 * 0.2) *
            (100 - Math.abs(eval1.scores.strengths - eval2.scores.strengths) * 100 / 75 * 0.2) *
            (100 - Math.abs(eval1.scores.weaknesses - eval2.scores.weaknesses) * 100 / 75 * 0.2) *
            (100 - Math.abs(eval1.scores.compatibility - eval2.scores.compatibility) * 100 / 50 * 0.2) / 10000000
        );
        
        // Uyumluluk seviyesi
        let compatibilityLevel;
        if (overallCompatibility >= 80) {
            compatibilityLevel = 'Mükemmel Uyum';
        } else if (overallCompatibility >= 60) {
            compatibilityLevel = 'İyi Uyum';
        } else if (overallCompatibility >= 40) {
            compatibilityLevel = 'Orta Uyum';
        } else if (overallCompatibility >= 20) {
            compatibilityLevel = 'Düşük Uyum';
        } else {
            compatibilityLevel = 'Uyumsuz';
        }
        
        // Uyumluluk analizi
        let compatibilityAnalysisText;
        if (overallCompatibility >= 80) {
            compatibilityAnalysisText = `${eval1.evaluatedName} ve ${eval2.evaluatedName} arasında mükemmel bir uyum bulunmaktadır. Benzer güçlü yönlere sahip olmalarının yanı sıra, birbirlerinin zayıf yönlerini tamamlayabilecek özelliklere de sahiptirler. Bu iki kişi bir iş ortaklığında çok başarılı olabilirler.`;
        } else if (overallCompatibility >= 60) {
            compatibilityAnalysisText = `${eval1.evaluatedName} ve ${eval2.evaluatedName} arasında iyi bir uyum bulunmaktadır. Bazı ortak güçlü yönlere sahip olmalarının yanı sıra, birbirlerini tamamlayabilecek farklı özelliklere de sahiptirler. Bu iki kişi bir iş ortaklığında başarılı olabilirler, ancak bazı alanlarda uyum sağlamak için çaba göstermeleri gerekebilir.`;
        } else if (overallCompatibility >= 40) {
            compatibilityAnalysisText = `${eval1.evaluatedName} ve ${eval2.evaluatedName} arasında orta düzeyde bir uyum bulunmaktadır. Bazı alanlarda uyumlu çalışabilirler, ancak diğer alanlarda zorluklar yaşayabilirler. Bu iki kişi bir iş ortaklığında başarılı olabilmek için açık iletişim kurmalı ve farklılıklarını yönetmelidirler.`;
        } else if (overallCompatibility >= 20) {
            compatibilityAnalysisText = `${eval1.evaluatedName} ve ${eval2.evaluatedName} arasında düşük bir uyum bulunmaktadır. Çok farklı çalışma stillerine ve kişilik özelliklerine sahip olmaları, iş ortaklığında zorluklar yaratabilir. Başarılı bir ortaklık için yoğun çaba ve profesyonel destek gerekebilir.`;
        } else {
            compatibilityAnalysisText = `${eval1.evaluatedName} ve ${eval2.evaluatedName} arasında uyumsuzluk bulunmaktadır. Çok farklı çalışma stillerine ve kişilik özelliklerine sahip olmaları, iş ortaklığında ciddi sorunlar yaratabilir. Bu iki kişinin bir iş ortaklığı kurması önerilmez.`;
        }
        
        return {
            score: overallCompatibility,
            level: compatibilityLevel,
            analysis: compatibilityAnalysisText
        };
    }
    
    // Karşılaştırmalı HTML raporu oluşturma
    generateComparisonHtmlReport(eval1, eval2, comparisonData, template) {
        // HTML raporu oluştur
        let reportHtml = `
            <div class="comparison-report">
                <div class="report-header">
                    <h1>Kişilik Analizi Karşılaştırma Raporu</h1>
                    <div class="report-meta">
                        <p><strong>Kişi 1:</strong> ${eval1.evaluatedName}</p>
                        <p><strong>Kişi 2:</strong> ${eval2.evaluatedName}</p>
                        <p><strong>Rapor Tarihi:</strong> ${this.formatDate(new Date())}</p>
                    </div>
                </div>
                
                <div class="comparison-summary">
                    <h2>Uyumluluk Özeti</h2>
                    <div class="compatibility-score-container">
                        <div class="score-circle large">
                            <span>${comparisonData.compatibilityAnalysis.score}%</span>
                        </div>
                        <div class="compatibility-level">
                            <h3>${comparisonData.compatibilityAnalysis.level}</h3>
                            <p>${comparisonData.compatibilityAnalysis.analysis}</p>
                        </div>
                    </div>
                </div>
                
                <div class="score-comparison">
                    <h2>Puan Karşılaştırması</h2>
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Kategori</th>
                                <th>${eval1.evaluatedName}</th>
                                <th>${eval2.evaluatedName}</th>
                                <th>Fark</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Çalışkanlık</td>
                                <td>${comparisonData.scoreComparison.workethic.eval1}%</td>
                                <td>${comparisonData.scoreComparison.workethic.eval2}%</td>
                                <td class="${comparisonData.scoreComparison.workethic.difference > 0 ? 'positive' : comparisonData.scoreComparison.workethic.difference < 0 ? 'negative' : 'neutral'}">
                                    ${comparisonData.scoreComparison.workethic.difference > 0 ? '+' : ''}${comparisonData.scoreComparison.workethic.difference}%
                                </td>
                            </tr>
                            <tr>
                                <td>Sadakat</td>
                                <td>${comparisonData.scoreComparison.loyalty.eval1}%</td>
                                <td>${comparisonData.scoreComparison.loyalty.eval2}%</td>
                                <td class="${comparisonData.scoreComparison.loyalty.difference > 0 ? 'positive' : comparisonData.scoreComparison.loyalty.difference < 0 ? 'negative' : 'neutral'}">
                                    ${comparisonData.scoreComparison.loyalty.difference > 0 ? '+' : ''}${comparisonData.scoreComparison.loyalty.difference}%
                                </td>
                            </tr>
                            <tr>
                                <td>Güçlü Yönler</td>
                                <td>${comparisonData.scoreComparison.strengths.eval1}%</td>
                                <td>${comparisonData.scoreComparison.strengths.eval2}%</td>
                                <td class="${comparisonData.scoreComparison.strengths.difference > 0 ? 'positive' : comparisonData.scoreComparison.strengths.difference < 0 ? 'negative' : 'neutral'}">
                                    ${comparisonData.scoreComparison.strengths.difference > 0 ? '+' : ''}${comparisonData.scoreComparison.strengths.difference}%
                                </td>
                            </tr>
                            <tr>
                                <td>Zayıf Yönler</td>
                                <td>${comparisonData.scoreComparison.weaknesses.eval1}%</td>
                                <td>${comparisonData.scoreComparison.weaknesses.eval2}%</td>
                                <td class="${comparisonData.scoreComparison.weaknesses.difference > 0 ? 'positive' : comparisonData.scoreComparison.weaknesses.difference < 0 ? 'negative' : 'neutral'}">
                                    ${comparisonData.scoreComparison.weaknesses.difference > 0 ? '+' : ''}${comparisonData.scoreComparison.weaknesses.difference}%
                                </td>
                            </tr>
                            <tr>
                                <td>Uyumluluk</td>
                                <td>${comparisonData.scoreComparison.compatibility.eval1}%</td>
                                <td>${comparisonData.scoreComparison.compatibility.eval2}%</td>
                                <td class="${comparisonData.scoreComparison.compatibility.difference > 0 ? 'positive' : comparisonData.scoreComparison.compatibility.difference < 0 ? 'negative' : 'neutral'}">
                                    ${comparisonData.scoreComparison.compatibility.difference > 0 ? '+' : ''}${comparisonData.scoreComparison.compatibility.difference}%
                                </td>
                            </tr>
                            <tr class="overall-row">
                                <td>Genel Puan</td>
                                <td>${comparisonData.scoreComparison.overall.eval1}%</td>
                                <td>${comparisonData.scoreComparison.overall.eval2}%</td>
                                <td class="${comparisonData.scoreComparison.overall.difference > 0 ? 'positive' : comparisonData.scoreComparison.overall.difference < 0 ? 'negative' : 'neutral'}">
                                    ${comparisonData.scoreComparison.overall.difference > 0 ? '+' : ''}${comparisonData.scoreComparison.overall.difference}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        `;
        
        // Ortak güçlü yönleri ekle
        reportHtml += `
            <div class="common-strengths">
                <h2>Ortak Güçlü Yönler</h2>
                ${comparisonData.commonStrengths.length > 0 ? 
                    `<ul>${comparisonData.commonStrengths.map(strength => `<li>${strength}</li>`).join('')}</ul>` : 
                    '<p>Ortak güçlü yön bulunmamaktadır.</p>'}
            </div>
        `;
        
        // Tamamlayıcı güçlü yönleri ekle
        reportHtml += `
            <div class="complementary-strengths">
                <h2>Tamamlayıcı Güçlü Yönler</h2>
                <div class="complementary-columns">
                    <div class="complementary-column">
                        <h3>${eval1.evaluatedName}</h3>
                        ${comparisonData.complementaryStrengths.eval1.length > 0 ? 
                            `<ul>${comparisonData.complementaryStrengths.eval1.map(strength => `<li>${strength}</li>`).join('')}</ul>` : 
                            '<p>Özel güçlü yön bulunmamaktadır.</p>'}
                    </div>
                    <div class="complementary-column">
                        <h3>${eval2.evaluatedName}</h3>
                        ${comparisonData.complementaryStrengths.eval2.length > 0 ? 
                            `<ul>${comparisonData.complementaryStrengths.eval2.map(strength => `<li>${strength}</li>`).join('')}</ul>` : 
                            '<p>Özel güçlü yön bulunmamaktadır.</p>'}
                    </div>
                </div>
            </div>
        `;
        
        // Ortak zayıf yönleri ekle
        reportHtml += `
            <div class="common-weaknesses">
                <h2>Ortak Gelişime Açık Alanlar</h2>
                ${comparisonData.commonWeaknesses.length > 0 ? 
                    `<ul>${comparisonData.commonWeaknesses.map(weakness => `<li>${weakness}</li>`).join('')}</ul>` : 
                    '<p>Ortak gelişime açık alan bulunmamaktadır.</p>'}
            </div>
        `;
        
        // Tamamlayıcı zayıf yönleri ekle
        reportHtml += `
            <div class="complementary-weaknesses">
                <h2>Farklı Gelişime Açık Alanlar</h2>
                <div class="complementary-columns">
                    <div class="complementary-column">
                        <h3>${eval1.evaluatedName}</h3>
                        ${comparisonData.complementaryWeaknesses.eval1.length > 0 ? 
                            `<ul>${comparisonData.complementaryWeaknesses.eval1.map(weakness => `<li>${weakness}</li>`).join('')}</ul>` : 
                            '<p>Özel gelişime açık alan bulunmamaktadır.</p>'}
                    </div>
                    <div class="complementary-column">
                        <h3>${eval2.evaluatedName}</h3>
                        ${comparisonData.complementaryWeaknesses.eval2.length > 0 ? 
                            `<ul>${comparisonData.complementaryWeaknesses.eval2.map(weakness => `<li>${weakness}</li>`).join('')}</ul>` : 
                            '<p>Özel gelişime açık alan bulunmamaktadır.</p>'}
                    </div>
                </div>
            </div>
        `;
        
        // İş ortaklığı tavsiyeleri ekle
        reportHtml += `
            <div class="partnership-recommendations">
                <h2>İş Ortaklığı Tavsiyeleri</h2>
                <div class="recommendations-content">
                    ${this.generatePartnershipRecommendations(eval1, eval2, comparisonData)}
                </div>
            </div>
        `;
        
        // Raporu kapat
        reportHtml += `
            <div class="report-footer">
                <p>Bu rapor, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulaması tarafından oluşturulmuştur.</p>
                <p>Rapor Oluşturma Tarihi: ${this.formatDate(new Date())}</p>
            </div>
        </div>
        `;
        
        return reportHtml;
    }
    
    // İş ortaklığı tavsiyeleri oluşturma
    generatePartnershipRecommendations(eval1, eval2, comparisonData) {
        const compatibilityScore = comparisonData.compatibilityAnalysis.score;
        
        let recommendations = '';
        
        if (compatibilityScore >= 80) {
            recommendations = `
                <p>${eval1.evaluatedName} ve ${eval2.evaluatedName} arasındaki yüksek uyumluluk, başarılı bir iş ortaklığı için mükemmel bir temel oluşturmaktadır. Aşağıdaki tavsiyeleri dikkate alarak bu potansiyeli en üst düzeye çıkarabilirsiniz:</p>
                
                <h3>Güçlü Yönleri Kullanma</h3>
                <ul>
                    <li>Ortak güçlü yönlerinizi temel alarak iş stratejinizi geliştirin.</li>
                    <li>Tamamlayıcı güçlü yönlerinizi kullanarak görev dağılımı yapın.</li>
                    <li>Birbirinizin uzmanlık alanlarına saygı gösterin ve bu alanlarda karar verme yetkisini paylaşın.</li>
                </ul>
                
                <h3>İletişim</h3>
                <ul>
                    <li>Düzenli toplantılar yaparak açık iletişimi sürdürün.</li>
                    <li>Beklentilerinizi ve hedeflerinizi net bir şekilde ifade edin.</li>
                    <li>Olası anlaşmazlıkları erken aşamada çözümleyin.</li>
                </ul>
                
                <h3>Gelişim Alanları</h3>
                <ul>
                    <li>Ortak zayıf yönlerinizi geliştirmek için birlikte çalışın veya bu alanlarda destek alın.</li>
                    <li>Birbirinizin gelişim alanlarında destekleyici olun.</li>
                </ul>
            `;
        } else if (compatibilityScore >= 60) {
            recommendations = `
                <p>${eval1.evaluatedName} ve ${eval2.evaluatedName} arasındaki iyi uyumluluk, başarılı bir iş ortaklığı için sağlam bir temel oluşturmaktadır. Aşağıdaki tavsiyeleri dikkate alarak potansiyel zorlukları aşabilir ve uyumunuzu güçlendirebilirsiniz:</p>
                
                <h3>Güçlü Yönleri Kullanma</h3>
                <ul>
                    <li>Tamamlayıcı güçlü yönlerinize göre görev ve sorumlulukları paylaşın.</li>
                    <li>Ortak güçlü yönlerinizi kullanarak iş stratejinizi geliştirin.</li>
                </ul>
                
                <h3>İletişim ve İşbirliği</h3>
                <ul>
                    <li>Düzenli toplantılar yaparak açık iletişimi sürdürün.</li>
                    <li>Farklı çalışma stillerinizi anlamak için zaman ayırın.</li>
                    <li>Anlaşmazlıkları yapıcı bir şekilde çözümleyin.</li>
                    <li>Karar alma süreçlerinde her iki tarafın da görüşlerini dikkate alın.</li>
                </ul>
                
                <h3>Gelişim Alanları</h3>
                <ul>
                    <li>Ortak zayıf yönleriniz için dış destek almayı düşünün.</li>
                    <li>Farklı bakış açılarınızı bir zenginlik olarak görün ve bunlardan yararlanın.</li>
                </ul>
            `;
        } else if (compatibilityScore >= 40) {
            recommendations = `
                <p>${eval1.evaluatedName} ve ${eval2.evaluatedName} arasındaki orta düzeydeki uyumluluk, bazı zorluklar içerebilir ancak doğru yaklaşımla başarılı bir iş ortaklığı kurulabilir. Aşağıdaki tavsiyeleri dikkate alarak potansiyel zorlukları aşabilirsiniz:</p>
                
                <h3>Açık İletişim</h3>
                <ul>
                    <li>Beklentilerinizi, çalışma stilinizi ve tercihlerinizi açıkça paylaşın.</li>
                    <li>Düzenli geri bildirim toplantıları yapın.</li>
                    <li>Anlaşmazlıkları erken aşamada ve yapıcı bir şekilde çözümleyin.</li>
                </ul>
                
                <h3>Roller ve Sorumluluklar</h3>
                <ul>
                    <li>Güçlü yönlerinize göre net roller ve sorumluluklar belirleyin.</li>
                    <li>Karar alma süreçlerini ve yetki alanlarını açıkça tanımlayın.</li>
                    <li>Ortak zayıf yönleriniz için dış destek alın.</li>
                </ul>
                
                <h3>İşbirliği Yapısı</h3>
                <ul>
                    <li>Resmi bir ortaklık anlaşması yapın.</li>
                    <li>Düzenli değerlendirme toplantıları planlayın.</li>
                    <li>Gerektiğinde profesyonel arabuluculuk hizmeti alın.</li>
                </ul>
            `;
        } else if (compatibilityScore >= 20) {
            recommendations = `
                <p>${eval1.evaluatedName} ve ${eval2.evaluatedName} arasındaki düşük uyumluluk, iş ortaklığında önemli zorluklar yaratabilir. Bir ortaklık kurmaya karar verirseniz, aşağıdaki tavsiyeleri dikkate almanız önemlidir:</p>
                
                <h3>Kapsamlı Hazırlık</h3>
                <ul>
                    <li>Detaylı bir ortaklık anlaşması hazırlayın.</li>
                    <li>Roller, sorumluluklar ve karar alma süreçlerini net bir şekilde tanımlayın.</li>
                    <li>Anlaşmazlık çözüm mekanizmaları oluşturun.</li>
                </ul>
                
                <h3>Profesyonel Destek</h3>
                <ul>
                    <li>İş koçu veya danışman desteği alın.</li>
                    <li>Düzenli arabuluculuk seansları planlayın.</li>
                    <li>Ortak zayıf yönleriniz için uzman çalışanlar istihdam edin.</li>
                </ul>
                
                <h3>İletişim ve Değerlendirme</h3>
                <ul>
                    <li>Çok sık ve yapılandırılmış iletişim kanalları oluşturun.</li>
                    <li>Düzenli değerlendirme toplantıları yapın.</li>
                    <li>Gerektiğinde ortaklığı gözden geçirmeye ve değiştirmeye açık olun.</li>
                </ul>
                
                <p><strong>Not:</strong> Bu uyumluluk seviyesinde, alternatif işbirliği modelleri (tam ortaklık yerine belirli projelerde işbirliği gibi) düşünmeniz daha uygun olabilir.</p>
            `;
        } else {
            recommendations = `
                <p>${eval1.evaluatedName} ve ${eval2.evaluatedName} arasındaki çok düşük uyumluluk, geleneksel bir iş ortaklığı için önemli riskler taşımaktadır. Aşağıdaki tavsiyeleri dikkate almanızı öneririz:</p>
                
                <h3>Alternatif İşbirliği Modelleri</h3>
                <ul>
                    <li>Tam ortaklık yerine, belirli projelerde sınırlı işbirliği düşünün.</li>
                    <li>Resmi bir danışmanlık ilişkisi kurmayı değerlendirin.</li>
                    <li>Farklı iş ortakları aramayı düşünün.</li>
                </ul>
                
                <h3>Yine de Ortaklık Kurmak İsterseniz</h3>
                <ul>
                    <li>Çok detaylı bir ortaklık anlaşması hazırlayın.</li>
                    <li>Profesyonel arabuluculuk ve danışmanlık desteği alın.</li>
                    <li>Çıkış stratejileri belirleyin.</li>
                    <li>Ortak zayıf yönlerinizi dengeleyecek ek ortaklar veya çalışanlar bulun.</li>
                </ul>
                
                <p><strong>Uyarı:</strong> Bu uyumluluk seviyesinde, bir iş ortaklığı kurmak her iki taraf için de stresli ve verimsiz olabilir. Alternatif işbirliği modellerini ciddi şekilde değerlendirmenizi öneririz.</p>
            `;
        }
        
        return recommendations;
    }
    
    // Özet rapor oluşturma
    generateSummaryReport(evaluations, startDate, endDate, format = 'html', detailLevel = 'detailed') {
        if (!evaluations || evaluations.length === 0) return null;
        
        // Tarih aralığındaki değerlendirmeleri filtrele
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999); // Bitiş tarihinin sonuna kadar
        
        const filteredEvaluations = evaluations.filter(eval => {
            const evalDate = new Date(eval.date);
            return evalDate >= startDateObj && evalDate <= endDateObj;
        });
        
        if (filteredEvaluations.length === 0) return null;
        
        const template = this.reportTemplates[detailLevel] || this.reportTemplates.detailed;
        
        // Özet verileri hazırla
        const summaryData = this.prepareSummaryData(filteredEvaluations);
        
        switch (format.toLowerCase()) {
            case 'html':
                return this.generateSummaryHtmlReport(filteredEvaluations, summaryData, startDate, endDate, template);
            case 'pdf':
                return this.generateSummaryPdfReport(filteredEvaluations, summaryData, startDate, endDate, template);
            case 'excel':
            case 'csv':
                return this.generateSummaryCsvReport(filteredEvaluations, summaryData, startDate, endDate, template);
            case 'json':
                return this.generateSummaryJsonReport(filteredEvaluations, summaryData, startDate, endDate, template);
            default:
                return this.generateSummaryHtmlReport(filteredEvaluations, summaryData, startDate, endDate, template);
        }
    }
    
    // Özet verileri hazırlama
    prepareSummaryData(evaluations) {
        // Toplam değerlendirme sayısı
        const totalEvaluations = evaluations.length;
        
        // Ortalama puanları hesapla
        let totalWorkethic = 0;
        let totalLoyalty = 0;
        let totalStrengths = 0;
        let totalWeaknesses = 0;
        let totalCompatibility = 0;
        let totalOverallScore = 0;
        
        evaluations.forEach(eval => {
            totalWorkethic += eval.scores.workethic;
            totalLoyalty += eval.scores.loyalty;
            totalStrengths += eval.scores.strengths;
            totalWeaknesses += eval.scores.weaknesses;
            totalCompatibility += eval.scores.compatibility;
            totalOverallScore += eval.overallScore;
        });
        
        const avgWorkethic = Math.round((totalWorkethic / totalEvaluations) * 100 / 50);
        const avgLoyalty = Math.round((totalLoyalty / totalEvaluations) * 100 / 50);
        const avgStrengths = Math.round((totalStrengths / totalEvaluations) * 100 / 75);
        const avgWeaknesses = Math.round((totalWeaknesses / totalEvaluations) * 100 / 75);
        const avgCompatibility = Math.round((totalCompatibility / totalEvaluations) * 100 / 50);
        const avgOverallScore = Math.round(totalOverallScore / totalEvaluations);
        
        // En yüksek ve en düşük puanları bul
        const highestScore = Math.max(...evaluations.map(eval => eval.overallScore));
        const lowestScore = Math.min(...evaluations.map(eval => eval.overallScore));
        
        const highestEval = evaluations.find(eval => eval.overallScore === highestScore);
        const lowestEval = evaluations.find(eval => eval.overallScore === lowestScore);
        
        // En sık görülen güçlü ve zayıf yönleri bul
        const allStrengths = [];
        const allWeaknesses = [];
        
        evaluations.forEach(eval => {
            eval.topStrengths.forEach(strength => allStrengths.push(strength));
            eval.topWeaknesses.forEach(weakness => allWeaknesses.push(weakness));
        });
        
        const strengthCounts = {};
        const weaknessCounts = {};
        
        allStrengths.forEach(strength => {
            strengthCounts[strength] = (strengthCounts[strength] || 0) + 1;
        });
        
        allWeaknesses.forEach(weakness => {
            weaknessCounts[weakness] = (weaknessCounts[weakness] || 0) + 1;
        });
        
        // En sık görülen 5 güçlü yön
        const topStrengths = Object.entries(strengthCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(entry => ({
                strength: entry[0],
                count: entry[1],
                percentage: Math.round(entry[1] * 100 / totalEvaluations)
            }));
        
        // En sık görülen 5 zayıf yön
        const topWeaknesses = Object.entries(weaknessCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(entry => ({
                weakness: entry[0],
                count: entry[1],
                percentage: Math.round(entry[1] * 100 / totalEvaluations)
            }));
        
        // Aylık değerlendirme sayıları
        const monthlyEvaluations = {};
        
        evaluations.forEach(eval => {
            const date = new Date(eval.date);
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            monthlyEvaluations[monthYear] = (monthlyEvaluations[monthYear] || 0) + 1;
        });
        
        // Aylık ortalama puanlar
        const monthlyScores = {};
        
        evaluations.forEach(eval => {
            const date = new Date(eval.date);
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!monthlyScores[monthYear]) {
                monthlyScores[monthYear] = {
                    totalScore: 0,
                    count: 0
                };
            }
            
            monthlyScores[monthYear].totalScore += eval.overallScore;
            monthlyScores[monthYear].count += 1;
        });
        
        // Ortalama puanları hesapla
        Object.keys(monthlyScores).forEach(month => {
            monthlyScores[month].averageScore = Math.round(monthlyScores[month].totalScore / monthlyScores[month].count);
        });
        
        return {
            totalEvaluations,
            averageScores: {
                workethic: avgWorkethic,
                loyalty: avgLoyalty,
                strengths: avgStrengths,
                weaknesses: avgWeaknesses,
                compatibility: avgCompatibility,
                overall: avgOverallScore
            },
            highestScore: {
                score: highestScore,
                evaluation: highestEval
            },
            lowestScore: {
                score: lowestScore,
                evaluation: lowestEval
            },
            topStrengths,
            topWeaknesses,
            monthlyEvaluations,
            monthlyScores
        };
    }
    
    // Özet HTML raporu oluşturma
    generateSummaryHtmlReport(evaluations, summaryData, startDate, endDate, template) {
        // Tarih aralığını formatla
        const formattedStartDate = this.formatDate(new Date(startDate));
        const formattedEndDate = this.formatDate(new Date(endDate));
        
        // HTML raporu oluştur
        let reportHtml = `
            <div class="summary-report">
                <div class="report-header">
                    <h1>Kişilik Analizi Özet Raporu</h1>
                    <div class="report-meta">
                        <p><strong>Tarih Aralığı:</strong> ${formattedStartDate} - ${formattedEndDate}</p>
                        <p><strong>Toplam Değerlendirme:</strong> ${summaryData.totalEvaluations}</p>
                        <p><strong>Rapor Tarihi:</strong> ${this.formatDate(new Date())}</p>
                    </div>
                </div>
                
                <div class="summary-overview">
                    <h2>Genel Bakış</h2>
                    <div class="overview-stats">
                        <div class="stat-card">
                            <div class="stat-title">Ortalama Puan</div>
                            <div class="stat-value">${summaryData.averageScores.overall}%</div>
                            <div class="stat-level">${this.getOverallLevel(summaryData.averageScores.overall)}</div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-title">En Yüksek Puan</div>
                            <div class="stat-value">${summaryData.highestScore.score}%</div>
                            <div class="stat-name">${summaryData.highestScore.evaluation.evaluatedName}</div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-title">En Düşük Puan</div>
                            <div class="stat-value">${summaryData.lowestScore.score}%</div>
                            <div class="stat-name">${summaryData.lowestScore.evaluation.evaluatedName}</div>
                        </div>
                    </div>
                </div>
                
                <div class="category-averages">
                    <h2>Kategori Ortalamaları</h2>
                    <table class="summary-table">
                        <thead>
                            <tr>
                                <th>Kategori</th>
                                <th>Ortalama Puan</th>
                                <th>Seviye</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Çalışkanlık</td>
                                <td>${summaryData.averageScores.workethic}%</td>
                                <td>${this.getLevel(summaryData.averageScores.workethic)}</td>
                            </tr>
                            <tr>
                                <td>Sadakat</td>
                                <td>${summaryData.averageScores.loyalty}%</td>
                                <td>${this.getLevel(summaryData.averageScores.loyalty)}</td>
                            </tr>
                            <tr>
                                <td>Güçlü Yönler</td>
                                <td>${summaryData.averageScores.strengths}%</td>
                                <td>${this.getLevel(summaryData.averageScores.strengths)}</td>
                            </tr>
                            <tr>
                                <td>Zayıf Yönler</td>
                                <td>${summaryData.averageScores.weaknesses}%</td>
                                <td>${this.getLevel(summaryData.averageScores.weaknesses)}</td>
                            </tr>
                            <tr>
                                <td>Uyumluluk</td>
                                <td>${summaryData.averageScores.compatibility}%</td>
                                <td>${this.getLevel(summaryData.averageScores.compatibility)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="top-strengths-weaknesses">
                    <h2>En Sık Görülen Özellikler</h2>
                    
                    <div class="top-features-container">
                        <div class="top-features-column">
                            <h3>En Sık Görülen Güçlü Yönler</h3>
                            <table class="summary-table">
                                <thead>
                                    <tr>
                                        <th>Güçlü Yön</th>
                                        <th>Sayı</th>
                                        <th>Yüzde</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${summaryData.topStrengths.map(item => `
                                        <tr>
                                            <td>${item.strength}</td>
                                            <td>${item.count}</td>
                                            <td>${item.percentage}%</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="top-features-column">
                            <h3>En Sık Görülen Gelişime Açık Alanlar</h3>
                            <table class="summary-table">
                                <thead>
                                    <tr>
                                        <th>Gelişime Açık Alan</th>
                                        <th>Sayı</th>
                                        <th>Yüzde</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${summaryData.topWeaknesses.map(item => `
                                        <tr>
                                            <td>${item.weakness}</td>
                                            <td>${item.count}</td>
                                            <td>${item.percentage}%</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="monthly-trends">
                    <h2>Aylık Trendler</h2>
                    
                    <table class="summary-table">
                        <thead>
                            <tr>
                                <th>Ay</th>
                                <th>Değerlendirme Sayısı</th>
                                <th>Ortalama Puan</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.keys(summaryData.monthlyEvaluations).sort().map(month => `
                                <tr>
                                    <td>${this.formatMonth(month)}</td>
                                    <td>${summaryData.monthlyEvaluations[month]}</td>
                                    <td>${summaryData.monthlyScores[month].averageScore}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="evaluations-list">
                    <h2>Değerlendirme Listesi</h2>
                    
                    <table class="summary-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Değerlendirilen</th>
                                <th>Değerlendiren</th>
                                <th>Tarih</th>
                                <th>Genel Puan</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${evaluations.sort((a, b) => new Date(b.date) - new Date(a.date)).map(eval => `
                                <tr>
                                    <td>${eval.id}</td>
                                    <td>${eval.evaluatedName}</td>
                                    <td>${eval.evaluatorName}</td>
                                    <td>${this.formatDate(new Date(eval.date))}</td>
                                    <td>${eval.overallScore}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="report-footer">
                    <p>Bu rapor, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulaması tarafından oluşturulmuştur.</p>
                    <p>Rapor Oluşturma Tarihi: ${this.formatDate(new Date())}</p>
                </div>
            </div>
        `;
        
        return reportHtml;
    }
    
    // Yardımcı fonksiyonlar
    
    // Temel değerlendirme bilgilerini hazırlama
    prepareBasicInfo(evaluation) {
        return `
            <div class="basic-info">
                <p><strong>Değerlendirilen:</strong> ${evaluation.evaluatedName}</p>
                <p><strong>Değerlendiren:</strong> ${evaluation.evaluatorName}</p>
                <p><strong>Tarih:</strong> ${this.formatDate(evaluation.date)}</p>
                <p><strong>ID:</strong> ${evaluation.id}</p>
            </div>
        `;
    }
    
    // Kategori puanlarını hazırlama
    prepareCategoryScores(evaluation) {
        // Puanları yüzdeye çevir
        const workethicPercent = Math.round(evaluation.scores.workethic * 100 / 50);
        const loyaltyPercent = Math.round(evaluation.scores.loyalty * 100 / 50);
        const strengthsPercent = Math.round(evaluation.scores.strengths * 100 / 75);
        const weaknessesPercent = Math.round(evaluation.scores.weaknesses * 100 / 75);
        const compatibilityPercent = Math.round(evaluation.scores.compatibility * 100 / 50);
        
        return `
            <div class="category-scores">
                <div class="category-item">
                    <div class="category-header">
                        <h3>Çalışkanlık</h3>
                        <div class="category-score">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${workethicPercent}%"></div>
                            </div>
                            <span>${workethicPercent}% - ${this.getLevel(workethicPercent)}</span>
                        </div>
                    </div>
                    <div class="category-details">
                        <p>${evaluation.analysis.workethic}</p>
                    </div>
                </div>
                
                <div class="category-item">
                    <div class="category-header">
                        <h3>Sadakat</h3>
                        <div class="category-score">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${loyaltyPercent}%"></div>
                            </div>
                            <span>${loyaltyPercent}% - ${this.getLevel(loyaltyPercent)}</span>
                        </div>
                    </div>
                    <div class="category-details">
                        <p>${evaluation.analysis.loyalty}</p>
                    </div>
                </div>
                
                <div class="category-item">
                    <div class="category-header">
                        <h3>Güçlü Yönler</h3>
                        <div class="category-score">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${strengthsPercent}%"></div>
                            </div>
                            <span>${strengthsPercent}% - ${this.getLevel(strengthsPercent)}</span>
                        </div>
                    </div>
                    <div class="category-details">
                        <p>${evaluation.analysis.strengths}</p>
                    </div>
                </div>
                
                <div class="category-item">
                    <div class="category-header">
                        <h3>Zayıf Yönler</h3>
                        <div class="category-score">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${weaknessesPercent}%"></div>
                            </div>
                            <span>${weaknessesPercent}% - ${this.getLevel(weaknessesPercent)}</span>
                        </div>
                    </div>
                    <div class="category-details">
                        <p>${evaluation.analysis.weaknesses}</p>
                    </div>
                </div>
                
                <div class="category-item">
                    <div class="category-header">
                        <h3>Uyumluluk</h3>
                        <div class="category-score">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${compatibilityPercent}%"></div>
                            </div>
                            <span>${compatibilityPercent}% - ${this.getLevel(compatibilityPercent)}</span>
                        </div>
                    </div>
                    <div class="category-details">
                        <p>${evaluation.analysis.compatibility}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Güçlü yönleri hazırlama
    prepareStrengths(evaluation) {
        return `
            <div class="strengths-content">
                <p>${evaluation.analysis.strengths}</p>
                <h3>En Belirgin Güçlü Yönler:</h3>
                <ul>
                    ${evaluation.topStrengths.map(strength => `<li>${strength}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Zayıf yönleri hazırlama
    prepareWeaknesses(evaluation) {
        return `
            <div class="weaknesses-content">
                <p>${evaluation.analysis.weaknesses}</p>
                <h3>Gelişime Açık Alanlar:</h3>
                <ul>
                    ${evaluation.topWeaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Uyumluluk bilgilerini hazırlama
    prepareCompatibility(evaluation) {
        return `
            <div class="compatibility-content">
                <p>${evaluation.analysis.compatibility}</p>
            </div>
        `;
    }
    
    // Tavsiyeleri hazırlama
    prepareRecommendations(evaluation) {
        return evaluation.recommendations || 'Tavsiye bulunmamaktadır.';
    }
    
    // Detaylı analiz hazırlama
    prepareDetailedAnalysis(evaluation) {
        return `
            <div class="detailed-analysis-content">
                <div class="analysis-section">
                    <h3>Çalışkanlık Analizi</h3>
                    <p>${evaluation.analysis.workethic}</p>
                </div>
                
                <div class="analysis-section">
                    <h3>Sadakat Analizi</h3>
                    <p>${evaluation.analysis.loyalty}</p>
                </div>
                
                <div class="analysis-section">
                    <h3>Güçlü Yönler Analizi</h3>
                    <p>${evaluation.analysis.strengths}</p>
                </div>
                
                <div class="analysis-section">
                    <h3>Zayıf Yönler Analizi</h3>
                    <p>${evaluation.analysis.weaknesses}</p>
                </div>
                
                <div class="analysis-section">
                    <h3>Uyumluluk Analizi</h3>
                    <p>${evaluation.analysis.compatibility}</p>
                </div>
            </div>
        `;
    }
    
    // Soru ve cevapları hazırlama
    prepareQuestionsAndAnswers(evaluation) {
        return `
            <div class="questions-accordion">
                <div class="accordion-item">
                    <div class="accordion-header">
                        <h3>Çalışkanlık Soruları</h3>
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
                        <h3>Sadakat Soruları</h3>
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
                        <h3>Güçlü Yönler Soruları</h3>
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
                        <h3>Zayıf Yönler Soruları</h3>
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
                        <h3>Uyumluluk Soruları</h3>
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
        `;
    }
    
    // Grafikleri hazırlama
    prepareCharts(evaluation, chartTypes) {
        if (!chartTypes || chartTypes.length === 0) return '';
        
        let chartsHtml = '<div class="charts-container">';
        
        // Radar grafiği
        if (chartTypes.includes('radar')) {
            chartsHtml += `
                <div class="chart-item">
                    <h3>Kategori Dağılımı</h3>
                    <div class="chart-placeholder radar-chart">
                        <div class="chart-data" data-type="radar" data-evaluation-id="${evaluation.id}"></div>
                    </div>
                </div>
            `;
        }
        
        // Çubuk grafiği
        if (chartTypes.includes('bar')) {
            chartsHtml += `
                <div class="chart-item">
                    <h3>Kategori Puanları</h3>
                    <div class="chart-placeholder bar-chart">
                        <div class="chart-data" data-type="bar" data-evaluation-id="${evaluation.id}"></div>
                    </div>
                </div>
            `;
        }
        
        chartsHtml += '</div>';
        
        return chartsHtml;
    }
    
    // Seviye belirleme
    getLevel(percent) {
        if (percent >= 80) return 'Çok Yüksek';
        if (percent >= 60) return 'Yüksek';
        if (percent >= 40) return 'Orta';
        if (percent >= 20) return 'Düşük';
        return 'Çok Düşük';
    }
    
    // Genel seviye belirleme
    getOverallLevel(score) {
        if (score >= 85) return 'Mükemmel';
        if (score >= 70) return 'İyi';
        if (score >= 50) return 'Ortalama';
        if (score >= 30) return 'Ortalamanın Altı';
        return 'Zayıf';
    }
    
    // Tarih formatı
    formatDate(date) {
        if (!date) return '';
        
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    
    // Ay formatı
    formatMonth(monthYear) {
        const [year, month] = monthYear.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, 1);
        
        return date.toLocaleDateString('tr-TR', {
            month: 'long',
            year: 'numeric'
        });
    }
}

// Raporlama modülünü dışa aktar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DetailedReportGenerator;
}
