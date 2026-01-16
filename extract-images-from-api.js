import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, 'public', 'img');
const baseUrl = 'https://www.drugsafe.or.kr';

// outputDir이 없으면 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// HTML에서 이미지 URL 추출
function extractImageUrls(html) {
  const imageUrls = new Set();
  
  // <img src="..."> 태그에서 추출
  const imgRegex = /<img[^>]+src\s*=\s*["']([^"']+\.(png|jpg|jpeg|gif|svg|webp|bmp))["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    imageUrls.add(match[1]);
  }
  
  // <img src=...> (따옴표 없음)
  const imgRegex2 = /<img[^>]+src\s*=\s*([^\s>]+\.(png|jpg|jpeg|gif|svg|webp|bmp))/gi;
  while ((match = imgRegex2.exec(html)) !== null) {
    imageUrls.add(match[1]);
  }
  
  // CSS background-image: url(...)에서 추출
  const bgRegex = /background(?:-image)?:\s*url\(["']?([^"')]+\.(png|jpg|jpeg|gif|svg|webp|bmp))["']?\)/gi;
  while ((match = bgRegex.exec(html)) !== null) {
    imageUrls.add(match[1]);
  }
  
  // style 속성 내의 background-image
  const styleRegex = /style\s*=\s*["'][^"']*background(?:-image)?:\s*url\(["']?([^"')]+\.(png|jpg|jpeg|gif|svg|webp|bmp))["']?\)/gi;
  while ((match = styleRegex.exec(html)) !== null) {
    imageUrls.add(match[1]);
  }
  
  return Array.from(imageUrls);
}

// URL을 절대 경로로 변환
function resolveUrl(baseUrl, relativeUrl) {
  try {
    // 이미 절대 URL인 경우
    if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
      return relativeUrl;
    }
    // 상대 경로인 경우
    if (relativeUrl.startsWith('/')) {
      return new URL(relativeUrl, baseUrl).href;
    }
    // 상대 경로 (현재 디렉토리 기준)
    return new URL(relativeUrl, baseUrl + '/').href;
  } catch (e) {
    return null;
  }
}

// 파일 다운로드
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    
    const request = client.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // 리다이렉트 처리
        return downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    });
    
    request.on('error', (err) => {
      reject(err);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

// 메인 실행
console.log('='.repeat(60));
console.log('이미지 추출 스크립트');
console.log('='.repeat(60));
console.log('\n이 스크립트는 API 응답의 HTML 내용에서 이미지를 찾습니다.');
console.log('사용 방법:');
console.log('1. 브라우저에서 약관보기 팝업을 열고 개발자 도구(F12)를 엽니다.');
console.log('2. Network 탭에서 API 응답을 확인하거나,');
console.log('3. Elements 탭에서 약관 내용 HTML을 복사합니다.');
console.log('4. 복사한 HTML을 html-content.txt 파일로 저장합니다.');
console.log('5. 이 스크립트를 다시 실행하면 이미지를 다운로드합니다.\n');

const htmlContentFile = path.join(__dirname, 'html-content.txt');

if (fs.existsSync(htmlContentFile)) {
  console.log('html-content.txt 파일을 찾았습니다. 이미지 추출을 시작합니다...\n');
  
  const html = fs.readFileSync(htmlContentFile, 'utf8');
  const imageUrls = extractImageUrls(html);
  
  console.log(`발견된 이미지 URL (${imageUrls.length}개):`);
  imageUrls.forEach((url, index) => {
    console.log(`  ${index + 1}. ${url}`);
  });
  
  if (imageUrls.length === 0) {
    console.log('\n⚠ 이미지를 찾을 수 없습니다.');
    console.log('HTML 내용을 확인하거나 다른 형식의 이미지 참조가 있는지 확인해주세요.');
  } else {
    console.log('\n이미지 다운로드를 시작합니다...\n');
    
    // 이미지 다운로드
    (async () => {
      for (const relativeUrl of imageUrls) {
        const absoluteUrl = resolveUrl(baseUrl, relativeUrl);
        if (!absoluteUrl) {
          console.log(`✗ 잘못된 URL 건너뛰기: ${relativeUrl}`);
          continue;
        }
        
        const urlPath = new URL(absoluteUrl).pathname;
        const filename = path.basename(urlPath) || `image_${Date.now()}.png`;
        const filepath = path.join(outputDir, filename);
        
        // 이미 파일이 있으면 건너뛰기
        if (fs.existsSync(filepath)) {
          console.log(`⊘ 이미 존재: ${filename}`);
          continue;
        }
        
        try {
          await downloadFile(absoluteUrl, filepath);
        } catch (err) {
          console.error(`✗ 다운로드 실패 ${absoluteUrl}:`, err.message);
        }
      }
      
      console.log('\n완료!');
    })();
  }
} else {
  console.log('html-content.txt 파일을 찾을 수 없습니다.\n');
  console.log('다음 단계를 따라주세요:');
  console.log('1. 브라우저에서 약관보기 팝업을 엽니다.');
  console.log('2. 개발자 도구(F12) > Elements 탭을 엽니다.');
  console.log('3. 약관 내용이 표시된 HTML 요소를 찾습니다.');
  console.log('4. 해당 HTML을 복사하여 html-content.txt 파일로 저장합니다.');
  console.log('5. 이 스크립트를 다시 실행합니다.\n');
  console.log('또는 API 응답의 trmsSttCn 필드 값을 html-content.txt에 저장해주세요.');
}
