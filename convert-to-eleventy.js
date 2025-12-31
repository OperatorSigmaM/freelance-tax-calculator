const fs = require('fs');
const path = require('path');

// Конфигурация
const INPUT_DIR = '.'; // Текущая папка с HTML файлами
const OUTPUT_DIR = './src'; // Папка для Eleventy

// Файлы для конвертации
const FILES_TO_CONVERT = [
    'home.html',
    'index.html',
    'bmi.html',
    'loan-calculator.html',
    'salary-hourly.html',
    'tip-calculator.html',
    'retirement.html',
    'tax-calculators.html'
];

// Папки со штатами/странами
const FOLDERS = [
    { path: 'us-states', outputPath: 'us-states' },
    { path: 'europe', outputPath: 'europe' },
    { path: 'other', outputPath: 'other' }
];

// Маппинг имен файлов на URL
const FILE_MAPPING = {
    'home.html': { name: 'home.njk', permalink: '/home/' },
    'index.html': { name: 'index.njk', permalink: '/' },
    'bmi.html': { name: 'bmi.njk', permalink: '/bmi/' },
    'loan-calculator.html': { name: 'loan-calculator.njk', permalink: '/loan-calculator/' },
    'salary-hourly.html': { name: 'salary-hourly.njk', permalink: '/salary-hourly/' },
    'tip-calculator.html': { name: 'tip-calculator.njk', permalink: '/tip-calculator/' },
    'retirement.html': { name: 'retirement.njk', permalink: '/retirement/' },
    'tax-calculators.html': { name: 'tax-calculators.njk', permalink: '/tax-calculators/' }
};

// Извлечение метаданных из HTML
function extractMetadata(html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="(.*?)"/);
    const keywordsMatch = html.match(/<meta name="keywords" content="(.*?)"/);
    
    return {
        title: titleMatch ? titleMatch[1].replace(' | FinTools', '').replace(' | Free calculators for everyone', '') : 'Calculator',
        description: descMatch ? descMatch[1] : '',
        keywords: keywordsMatch ? keywordsMatch[1] : ''
    };
}

// Извлечение стилей из <style> тегов
function extractStyles(html) {
    const styleMatches = html.match(/<style>([\s\S]*?)<\/style>/g);
    if (!styleMatches) return '';
    
    return styleMatches
        .map(match => match.replace(/<\/?style>/g, ''))
        .join('\n\n');
}

// Извлечение скриптов из <script> тегов (кроме Google Analytics и MegaNav.js)
function extractScripts(html) {
    const scriptMatches = html.match(/<script(?![^>]*src=["'].*?gtag.*?["'])(?![^>]*src=["'].*?MegaNav\.js["'])>([\s\S]*?)<\/script>/g);
    if (!scriptMatches) return '';
    
    return scriptMatches
        .map(match => match.replace(/<\/?script>/g, ''))
        .join('\n\n');
}

// Извлечение контента body
function extractBody(html) {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
    if (!bodyMatch) return html;
    
    let body = bodyMatch[1];
    
    // Удаляем комментарий о MegaNav.js
    body = body.replace(/<!-- Navigation will be injected by MegaNav\.js -->/g, '');
    
    // Убираем лишние пробелы
    body = body.trim();
    
    return body;
}

// Создание .njk файла
function createNjkFile(htmlContent, outputPath, permalink) {
    const metadata = extractMetadata(htmlContent);
    const body = extractBody(htmlContent);
    const styles = extractStyles(htmlContent);
    const scripts = extractScripts(htmlContent);
    
    // Front matter
    let njkContent = '---\n';
    njkContent += 'layout: base.njk\n';
    njkContent += `title: ${metadata.title}\n`;
    if (metadata.description) {
        njkContent += `description: ${metadata.description}\n`;
    }
    if (metadata.keywords) {
        njkContent += `keywords: ${metadata.keywords}\n`;
    }
    if (permalink) {
        njkContent += `permalink: ${permalink}\n`;
    }
    njkContent += '---\n\n';
    
    // Если есть уникальные стили страницы, добавляем их
    if (styles && !styles.includes('/* Page Styles */')) {
        njkContent += '<style>\n' + styles + '\n</style>\n\n';
    }
    
    // Контент страницы
    njkContent += body;
    
    // Если есть скрипты, добавляем их в конец
    if (scripts) {
        njkContent += '\n\n<script>\n' + scripts + '\n</script>';
    }
    
    // Сохраняем файл
    fs.writeFileSync(outputPath, njkContent, 'utf8');
    console.log(`✅ Создан: ${outputPath}`);
}

// Конвертация файла
function convertFile(inputPath, outputPath, permalink) {
    try {
        const html = fs.readFileSync(inputPath, 'utf8');
        createNjkFile(html, outputPath, permalink);
    } catch (error) {
        console.error(`❌ Ошибка при конвертации ${inputPath}:`, error.message);
    }
}

// Создание структуры папок
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Главная функция
function main() {
    console.log('🚀 Начинаем конвертацию HTML → Eleventy...\n');
    
    // Создаем структуру папок
    ensureDir(OUTPUT_DIR);
    
    // Конвертируем основные файлы
    console.log('📄 Конвертируем основные страницы:');
    FILES_TO_CONVERT.forEach(file => {
        const inputPath = path.join(INPUT_DIR, file);
        if (fs.existsSync(inputPath)) {
            const mapping = FILE_MAPPING[file];
            const outputPath = path.join(OUTPUT_DIR, mapping.name);
            convertFile(inputPath, outputPath, mapping.permalink);
        } else {
            console.log(`⚠️  Файл не найден: ${file}`);
        }
    });
    
    console.log('\n📁 Конвертируем папки:');
    // Конвертируем файлы в папках
    FOLDERS.forEach(folder => {
        const inputFolder = path.join(INPUT_DIR, folder.path);
        const outputFolder = path.join(OUTPUT_DIR, folder.outputPath);
        
        if (fs.existsSync(inputFolder)) {
            ensureDir(outputFolder);
            
            const files = fs.readdirSync(inputFolder).filter(f => f.endsWith('.html'));
            files.forEach(file => {
                const inputPath = path.join(inputFolder, file);
                const outputName = file.replace('.html', '.njk');
                const outputPath = path.join(outputFolder, outputName);
                const permalink = `/${folder.outputPath}/${file.replace('.html', '')}/`;
                
                convertFile(inputPath, outputPath, permalink);
            });
        } else {
            console.log(`⚠️  Папка не найдена: ${folder.path}`);
        }
    });
    
    console.log('\n✨ Конвертация завершена!');
    console.log('\n📝 Следующие шаги:');
    console.log('1. Проверь файлы в папке ./src');
    console.log('2. Запусти: npm start');
    console.log('3. Открой: http://localhost:8080');
}

// Запуск
main();