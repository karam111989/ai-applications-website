// ملف JavaScript الموحد للوظائف المشتركة

// بيانات التطبيقات الافتراضية
let applications = [
    {
        id: 1,
        name: "ChatGPT",
        company: "OpenAI",
        website: "https://chat.openai.com",
        field: "Education",
        isFree: "مجاني",
        description: "شات بوت ذكي يمكنه الإجابة على الأسئلة والمساعدة في الكتابة والبرمجة",
        logo: "📝"
    },
    {
        id: 2,
        name: "Midjourney",
        company: "Midjourney",
        website: "https://midjourney.com",
        field: "Design",
        isFree: "غير مجاني",
        description: "أداة توليد الصور باستخدام الذكاء الاصطناعي",
        logo: "🎨"
    },
    {
        id: 3,
        name: "Grammarly",
        company: "Grammarly",
        website: "https://grammarly.com",
        field: "Education",
        isFree: "مجاني",
        description: "مساعد كتابة ذكي لتحسين القواعد والنحو والأسلوب",
        logo: "✍️"
    },
    {
        id: 4,
        name: "TensorFlow",
        company: "Google",
        website: "https://tensorflow.org",
        field: "Development",
        isFree: "مجاني",
        description: "مكتبة مفتوحة المصدر للتعلم الآلي والذكاء الاصطناعي",
        logo: "⚡"
    },
    {
        id: 5,
        name: "DALL-E",
        company: "OpenAI",
        website: "https://openai.com/dall-e",
        field: "Design",
        isFree: "غير مجاني",
        description: "نموذج توليد الصور من النصوص",
        logo: "🖼️"
    }
];

//  JQuery. دالة للتحميل الأولي
$(document).ready(function() {
    console.log("تم تحميل الموقع بنجاح");
    
    // تهيئة الموقع حسب الصفحة
    initializeWebsite();
});

// دالة التهيئة
function initializeWebsite() {
    // تحميل التطبيقات في صفحة apps.html
    if (window.location.pathname.includes('apps.html') || 
        window.location.pathname === '/apps.html') {
        loadApplications();
    }
    
    // إعداد النموذج في صفحة add_app.html
    if (window.location.pathname.includes('add_app.html') || 
        window.location.pathname === '/add_app.html') {
        setupForm();
    }
    
    setupNavigation();
}

//   jQuery تحميل التطبيقات في الجدول
function loadApplications() {
    const tableBody = $('#apps-table-body');
    tableBody.empty();
    
    applications.forEach(app => {
        const row = `
            <tr data-app-id="${app.id}">
                <td>${app.name}</td>
                <td>${app.company}</td>
                <td>${app.field}</td>
                <td>${app.isFree}</td>
                <td>
                    <button class="toggle-details" onclick="toggleAppDetails(${app.id})">
                        إظهار التفاصيل
                    </button>
                </td>
            </tr>
        `;
        tableBody.append(row);
    });
}

// إظهار/إخفاء تفاصيل التطبيق
function toggleAppDetails(appId) {
    const app = applications.find(a => a.id === appId);
    const detailsContainer = $('#apps-details-container');
    const existingDetails = $(`#app-details-${appId}`);
    const button = $(`[data-app-id="${appId}"] .toggle-details`);
    
    if (existingDetails.length > 0) {
        // إذا التفاصيل ظاهرة، اخفها
        existingDetails.remove();
        button.text('إظهار التفاصيل');
        button.removeClass('active');
    } else {
        // إذا التفاصيل مخفية، أظهرها
        const detailsHTML = createAppDetailsHTML(app);
        detailsContainer.append(detailsHTML);
        button.text('إخفاء التفاصيل');
        button.addClass('active');
    }
}

// إنشاء HTML لتفاصيل التطبيق
function createAppDetailsHTML(app) {
    return `
        <div class="app-details" id="app-details-${app.id}">
            <div class="details-header">
                <h3>تفاصيل التطبيق: ${app.name}</h3>
                <button class="close-details" onclick="closeAppDetails(${app.id})">✕</button>
            </div>
            
            <table class="details-table">
                <thead>
                    <tr>
                        <th>اسم التطبيق</th>
                        <th>اسم الشركة المطورة</th>
                        <th>مجال الاستخدام</th>
                        <th>مجاني/غير مجاني</th>
                        <th>اختيار</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${app.name}</td>
                        <td>${app.company}</td>
                        <td>${app.field}</td>
                        <td>${app.isFree}</td>
                        <td>○</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="additional-details">
                <div class="detail-item">
                    <strong>عنوان الموقع الإلكتروني:</strong>
                    <a href="${app.website}" target="_blank">${app.website}</a>
                </div>
                
                <div class="detail-item">
                    <strong>شرح مختصر:</strong>
                    <p>${app.description}</p>
                </div>
                
                <div class="media-gallery">
                    <div class="media-item">
                        <div class="media-placeholder">${app.logo}</div>
                        <span>صورة (logo)</span>
                    </div>
                    <div class="media-item">
                        <div class="media-placeholder">🎵</div>
                        <span>ملف صوتي</span>
                    </div>
                    <div class="media-item">
                        <div class="media-placeholder">🎬</div>
                        <span>ملف فيديو</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// إغلاق تفاصيل التطبيق
function closeAppDetails(appId) {
    $(`#app-details-${appId}`).remove();
    const button = $(`[data-app-id="${appId}"] .toggle-details`);
    button.text('إظهار التفاصيل');
    button.removeClass('active');
}

// jQuery  إعداد نموذج إضافة تطبيق جديد
function setupForm() {
    $('#add-app-form').on('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            addNewApplication();
        }
    });
    
    // إعادة تعيين النموذج
    $('.btn-reset').on('click', function() {
        resetForm();
    });
    
    // التحقق أثناء الكتابة
    $('#app-name').on('input', function() {
        validateAppName();
    });
    
    $('#company-name').on('input', function() {
        validateCompanyName();
    });
    
    $('#website-url').on('input', function() {
        validateWebsite();
    });
}

// التحقق من صحة اسم التطبيق
function validateAppName() {
    const appName = $('#app-name').val();
    const errorElement = $('#app-name-error');
    
    if (!/^[A-Za-z]+$/.test(appName)) {
        errorElement.show();
        return false;
    } else {
        errorElement.hide();
        return true;
    }
}

// التحقق من صحة اسم الشركة
function validateCompanyName() {
    const companyName = $('#company-name').val();
    const errorElement = $('#company-name-error');
    
    if (!/^[A-Za-z]+$/.test(companyName)) {
        errorElement.show();
        return false;
    } else {
        errorElement.hide();
        return true;
    }
}

// التحقق من صحة الموقع الإلكتروني
function validateWebsite() {
    const website = $('#website-url').val();
    const errorElement = $('#website-url-error');
    
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    
    if (!urlPattern.test(website)) {
        errorElement.show();
        return false;
    } else {
        errorElement.hide();
        return true;
    }
}

// التحقق من النموذج كامل
function validateForm() {
    const isAppNameValid = validateAppName();
    const isCompanyNameValid = validateCompanyName();
    const isWebsiteValid = validateWebsite();
    
    // التحقق من الحقول الإجبارية
    const isFree = $('#is-free').val();
    const usageField = $('#usage-field').val();
    const description = $('#app-description').val();
    
    if (!isFree) {
        alert('يرجى اختيار نوع التطبيق (مجاني/غير مجاني)');
        return false;
    }
    
    if (!usageField) {
        alert('يرجى اختيار مجال الاستخدام');
        return false;
    }
    
    if (!description.trim()) {
        alert('يرجى إدخال شرح مختصر عن التطبيق');
        return false;
    }
    
    return isAppNameValid && isCompanyNameValid && isWebsiteValid;
}

// إضافة تطبيق جديد
function addNewApplication() {
    const newApp = {
        id: applications.length + 1,
        name: $('#app-name').val(),
        company: $('#company-name').val(),
        website: $('#website-url').val(),
        field: $('#usage-field').val(),
        isFree: $('#is-free').val(),
        description: $('#app-description').val(),
        logo: '🆕'
    };
    
    applications.push(newApp);
    
    // حفظ في localStorage لنقل البيانات بين الصفحات
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // عرض رسالة نجاح
    alert('تم إضافة التطبيق بنجاح! سيتم نقلك إلى صفحة التطبيقات.');
    
    // الانتقال إلى صفحة التطبيقات
    window.location.href = 'apps.html';
}

// إعادة تعيين النموذج
function resetForm() {
    $('#app-name').val('');
    $('#company-name').val('');
    $('#website-url').val('');
    $('#is-free').val('');
    $('#usage-field').val('');
    $('#app-description').val('');
    
    // إخفاء رسائل الخطأ
    $('.error-message').hide();
    
    console.log('تم إعادة تعيين النموذج');
}

// إعداد القوائم التنقلية
function setupNavigation() {
    console.log("تم إعداد القوائم التنقلية");
    
    // إضافة تأثير نشط للقائمة الحالية
    const currentPage = window.location.pathname.split('/').pop();
    $('nav a').each(function() {
        if ($(this).attr('href') === currentPage) {
            $(this).addClass('active');
        }
    });
    
    // تحميل البيانات من localStorage إذا وجدت
    loadFromLocalStorage();
}

// تحميل البيانات من localStorage
function loadFromLocalStorage() {
    const savedApplications = localStorage.getItem('applications');
    if (savedApplications) {
        applications = JSON.parse(savedApplications);
        
        // إذا كنا في صفحة التطبيقات، أعد تحميل الجدول
        if (window.location.pathname.includes('apps.html') || 
            window.location.pathname === '/apps.html') {
            loadApplications();
        }
    }
}

// دالة للتحقق من المدخلات النصية
function validateTextInput(input) {
    return /^[A-Za-z]+$/.test(input);
}

// دالة مساعدة لعرض الرسائل
function showMessage(message, type = 'info') {
    const messageDiv = $('<div>')
        .addClass(`message message-${type}`)
        .text(message)
        .hide()
        .appendTo('body')
        .fadeIn();
    
    setTimeout(() => {
        messageDiv.fadeOut(() => {
            messageDiv.remove();
        });
    }, 3000);
}

// تهيئة التطبيقات عند تحميل الصفحة
function initializeApplications() {
    if (applications.length === 0) {
        // إذا لم توجد تطبيقات، استخدم الافتراضية
        applications = [
            {
                id: 1,
                name: "ChatGPT",
                company: "OpenAI",
                website: "https://chat.openai.com",
                field: "Education",
                isFree: "مجاني",
                description: "شات بوت ذكي يمكنه الإجابة على الأسئلة والمساعدة في الكتابة والبرمجة",
                logo: "📝"
            },
            {
                id: 2,
                name: "Midjourney",
                company: "Midjourney",
                website: "https://midjourney.com",
                field: "Design",
                isFree: "غير مجاني",
                description: "أداة توليد الصور باستخدام الذكاء الاصطناعي",
                logo: "🎨"
            },
            {
                id: 3,
                name: "Grammarly",
                company: "Grammarly",
                website: "https://grammarly.com",
                field: "Education",
                isFree: "مجاني",
                description: "مساعد كتابة ذكي لتحسين القواعد والنحو والأسلوب",
                logo: "✍️"
            },
            {
                id: 4,
                name: "TensorFlow",
                company: "Google",
                website: "https://tensorflow.org",
                field: "Development",
                isFree: "مجاني",
                description: "مكتبة مفتوحة المصدر للتعلم الآلي والذكاء الاصطناعي",
                logo: "⚡"
            },
            {
                id: 5,
                name: "DALL-E",
                company: "OpenAI",
                website: "https://openai.com/dall-e",
                field: "Design",
                isFree: "غير مجاني",
                description: "نموذج توليد الصور من النصوص",
                logo: "🖼️"
            }
        ];
    }
}

// استدعاء التهيئة عند التحميل
initializeApplications();
// إعداد الوسائط في نموذج إضافة التطبيق
function setupMediaUpload() {
    // تحميل الصورة
    $('#image-upload').on('change', function(e) {
        handleMediaUpload(e, 'image');
    });
    
    // تحميل الصوت
    $('#audio-upload').on('change', function(e) {
        handleMediaUpload(e, 'audio');
    });
    
    // تحميل الفيديو
    $('#video-upload').on('change', function(e) {
        handleMediaUpload(e, 'video');
    });
}

// معالجة تحميل الوسائط
function handleMediaUpload(event, mediaType) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const mediaData = {
            type: mediaType,
            data: e.target.result,
            name: file.name,
            size: file.size
        };
        
        // حفظ الوسائط في localStorage مؤقتاً
        saveMediaToTemp(mediaType, mediaData);
        displayMediaPreview(mediaType, mediaData);
    };
    
    if (mediaType === 'image') {
        reader.readAsDataURL(file);
    } else {
        // للصوت والفيديو، نخزن معلومات الملف فقط
        const mediaData = {
            type: mediaType,
            name: file.name,
            size: file.size,
            file: file
        };
        saveMediaToTemp(mediaType, mediaData);
        displayMediaPreview(mediaType, mediaData);
    }
}

// حفظ الوسائط مؤقتاً
function saveMediaToTemp(mediaType, mediaData) {
    let tempMedia = JSON.parse(localStorage.getItem('tempMedia') || '{}');
    tempMedia[mediaType] = mediaData;
    localStorage.setItem('tempMedia', JSON.stringify(tempMedia));
}

// عرض معاينة الوسائط
function displayMediaPreview(mediaType, mediaData) {
    const previewContainer = $(`#${mediaType}-preview`);
    previewContainer.empty();
    
    if (mediaType === 'image') {
        previewContainer.html(`
            <div class="media-preview">
                <img src="${mediaData.data}" alt="معاينة الصورة">
                <button type="button" class="remove-media" onclick="removeMedia('${mediaType}')">✕</button>
                <span>${mediaData.name}</span>
            </div>
        `);
    } else {
        const icon = mediaType === 'audio' ? '🎵' : '🎬';
        previewContainer.html(`
            <div class="media-preview">
                <div class="media-icon">${icon}</div>
                <button type="button" class="remove-media" onclick="removeMedia('${mediaType}')">✕</button>
                <span>${mediaData.name}</span>
                <small>(${formatFileSize(mediaData.size)})</small>
            </div>
        `);
    }
}

// إزالة الوسائط
function removeMedia(mediaType) {
    let tempMedia = JSON.parse(localStorage.getItem('tempMedia') || '{}');
    delete tempMedia[mediaType];
    localStorage.setItem('tempMedia', JSON.stringify(tempMedia));
    
    $(`#${mediaType}-preview`).empty();
    $(`#${mediaType}-upload`).val('');
}

// تنسيق حجم الملف
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// تحديث دالة إضافة التطبيق لدعم الوسائط
function addNewApplication() {
    const tempMedia = JSON.parse(localStorage.getItem('tempMedia') || '{}');
    
    const newApp = {
        id: applications.length + 1,
        name: $('#app-name').val(),
        company: $('#company-name').val(),
        website: $('#website-url').val(),
        field: $('#usage-field').val(),
        isFree: $('#is-free').val(),
        description: $('#app-description').val(),
        logo: '🆕',
        media: tempMedia // إضافة الوسائط
    };
    
    applications.push(newApp);
    
    // حفظ في localStorage
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // مسح الوسائط المؤقتة
    localStorage.removeItem('tempMedia');
    
    // عرض رسالة نجاح
    alert('تم إضافة التطبيق بنجاح! سيتم نقلك إلى صفحة التطبيقات.');
    
    // الانتقال إلى صفحة التطبيقات
    window.location.href = 'apps.html';
}

// تحديث دالة إنشاء تفاصيل التطبيق لعرض الوسائط
function createAppDetailsHTML(app) {
    let mediaHTML = '';
    
    if (app.media) {
        mediaHTML = `
            <div class="media-gallery">
                ${app.media.image ? `
                    <div class="media-item">
                        <div class="media-preview">
                            <img src="${app.media.image.data}" alt="صورة التطبيق" style="max-width: 100px; max-height: 100px;">
                        </div>
                        <span>صورة (logo)</span>
                    </div>
                ` : `
                    <div class="media-item">
                        <div class="media-placeholder">🖼️</div>
                        <span>صورة (logo)</span>
                    </div>
                `}
                
                ${app.media.audio ? `
                    <div class="media-item">
                        <div class="media-preview">
                            <div class="media-icon">🎵</div>
                            <p>${app.media.audio.name}</p>
                        </div>
                        <span>ملف صوتي</span>
                    </div>
                ` : `
                    <div class="media-item">
                        <div class="media-placeholder">🎵</div>
                        <span>ملف صوتي</span>
                    </div>
                `}
                
                ${app.media.video ? `
                    <div class="media-item">
                        <div class="media-preview">
                            <div class="media-icon">🎬</div>
                            <p>${app.media.video.name}</p>
                        </div>
                        <span>ملف فيديو</span>
                    </div>
                ` : `
                    <div class="media-item">
                        <div class="media-placeholder">🎬</div>
                        <span>ملف فيديو</span>
                    </div>
                `}
            </div>
        `;
    } else {
        mediaHTML = `
            <div class="media-gallery">
                <div class="media-item">
                    <div class="media-placeholder">🖼️</div>
                    <span>صورة (logo)</span>
                </div>
                <div class="media-item">
                    <div class="media-placeholder">🎵</div>
                    <span>ملف صوتي</span>
                </div>
                <div class="media-item">
                    <div class="media-placeholder">🎬</div>
                    <span>ملف فيديو</span>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="app-details" id="app-details-${app.id}">
            <div class="details-header">
                <h3>تفاصيل التطبيق: ${app.name}</h3>
                <button class="close-details" onclick="closeAppDetails(${app.id})">✕</button>
            </div>
            
            <table class="details-table">
                <thead>
                    <tr>
                        <th>اسم التطبيق</th>
                        <th>اسم الشركة المطورة</th>
                        <th>مجال الاستخدام</th>
                        <th>مجاني/غير مجاني</th>
                        <th>اختيار</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${app.name}</td>
                        <td>${app.company}</td>
                        <td>${app.field}</td>
                        <td>${app.isFree}</td>
                        <td>○</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="additional-details">
                <div class="detail-item">
                    <strong>عنوان الموقع الإلكتروني:</strong>
                    <a href="${app.website}" target="_blank">${app.website}</a>
                </div>
                
                <div class="detail-item">
                    <strong>شرح مختصر:</strong>
                    <p>${app.description}</p>
                </div>
                
                ${mediaHTML}
            </div>
        </div>
    `;
}

// تحديث دالة setupForm لإضافة الوسائط
function setupForm() {
    $('#add-app-form').on('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            addNewApplication();
        }
    });
    
    // إعادة تعيين النموذج
    $('.btn-reset').on('click', function() {
        resetForm();
    });
    
    // التحقق أثناء الكتابة
    $('#app-name').on('input', function() {
        validateAppName();
    });
    
    $('#company-name').on('input', function() {
        validateCompanyName();
    });
    
    $('#website-url').on('input', function() {
        validateWebsite();
    });
    
    // إعداد تحميل الوسائط
    setupMediaUpload();
}
// تحسين استخدام jQuery لإضافة تأثيرات أكثر
function enhanceWithJQuery() {
    // إضافة تأثيرات للقوائم
    $('nav a').hover(
        function() {
            $(this).animate({ paddingLeft: '20px' }, 200);
        },
        function() {
            $(this).animate({ paddingLeft: '10px' }, 200);
        }
    );
    
    // إضافة تأثيرات للجدول
    $('.apps-table tr').hover(
        function() {
            $(this).css('transform', 'scale(1.02)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );
    
    // تأثيرات للأزرار
    $('.toggle-details').click(function() {
        $(this).toggleClass('clicked');
    });
    
    // تحميل الصفحة بسلاسة
    $('body').hide().fadeIn(1000);
}

// استخدام jQuery للتحقق من الصحة بشكل متقدم
function setupAdvancedValidation() {
    // التحقق في الوقت الحقيقي
    $('#app-name').on('keyup', function() {
        const value = $(this).val();
        if (/^[A-Za-z]+$/.test(value)) {
            $(this).css('border-color', '#28a745');
        } else {
            $(this).css('border-color', '#dc3545');
        }
    });
    
    // تأثيرات للتحميل
    $('#add-app-form').on('submit', function() {
        $('.btn-submit').html('<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...');
    });
}

// تحديث دالة التهيئة
function initializeWebsite() {
    // التحميل الأولي
    if (window.location.pathname.includes('apps.html')) {
        loadApplications();
    }
    
    if (window.location.pathname.includes('add_app.html')) {
        setupForm();
        setupAdvancedValidation();
    }
    
    setupNavigation();
    enhanceWithJQuery(); // إضافة التحسينات
}
$(document).ready(function () {
    $('#deployment-url').on('click', function (e) {
        e.preventDefault(); // منع الانتقال الفوري للرابط

        // عرض رسالة تأكيد قبل فتح الرابط
        const userConfirmed = confirm("هل ترغب في فتح رابط النشر في نافذة جديدة؟");

        if (userConfirmed) {
            window.open('https://karam111989.github.io/ai-applications-website/', '_blank');
        }
    });
});
