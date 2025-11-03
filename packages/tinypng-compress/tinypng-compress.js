import { promises as fs } from 'node:fs';
import { join, extname, basename, normalize } from 'node:path';
import tinify from 'tinify';
import { createHash } from 'node:crypto';

// 配置文件和记录文件路径
const CONFIG_PATH = './tinypng.config.json';
const RECORD_PATH = './tinypng.record.json';

// 默认配置
const defaultConfig = {
  apiKey: '',
  compressDir: './images',
  extensions: ['.png', '.jpg', '.jpeg'],
  concurrentLimit: 5,
};

// 加载或创建配置文件
async function loadConfig() {
  try {
    const configData = await fs.readFile(CONFIG_PATH, 'utf-8');
    return { ...defaultConfig, ...JSON.parse(configData) };
  } catch {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(defaultConfig, null, 2));
    return defaultConfig;
  }
}

// 加载压缩记录
async function loadRecords() {
  try {
    const recordData = await fs.readFile(RECORD_PATH, 'utf-8');
    return JSON.parse(recordData);
  } catch {
    return {};
  }
}

// 保存压缩记录
async function saveRecords(records) {
  await fs.writeFile(RECORD_PATH, JSON.stringify(records, null, 2));
}


// 计算文件 MD5
async function getFileMD5(filePath) {
  const content = await fs.readFile(filePath);
  return createHash('md5').update(content).digest('hex');
}

// 控制台输出日志
function logMessage(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// 压缩单个文件
async function compressFile(filePath, config, records) {
  const ext = extname(filePath).toLowerCase();
  if (!config.extensions.includes(ext)) return false;

  const normalizedPath = normalize(filePath); // 标准化路径
  const fileName = basename(normalizedPath);
  const fileMD5 = await getFileMD5(normalizedPath);

  // 检查是否已记录且 MD5 未变
  if (records[normalizedPath] && records[normalizedPath].md5 === fileMD5) {
    logMessage(`跳过已压缩: ${fileName} (记录存在且内容未变)`);
    return false;
  }
  try {
    const source = tinify.fromFile(normalizedPath);
    const originalSize = (await fs.stat(normalizedPath)).size;

    // 压缩并覆盖原文件
    await source.toFile(normalizedPath);

    // 计算压缩后文件的 MD5
    const compressedMD5 = await getFileMD5(normalizedPath);
    const compressedSize = (await fs.stat(normalizedPath)).size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

    // 记录压缩结果（使用压缩后的 MD5）
    records[normalizedPath] = {
      md5: compressedMD5, // 记录压缩后的 MD5
      compressedSize,
      compressionRatio,
      timestamp: new Date().toISOString(),
    };

    // 判断是否为有效压缩
    const isValidCompression = compressionRatio > 10 || (compressionRatio < 10 && compressedSize > 5 * 1024);

    if (isValidCompression) {
      logMessage(`压缩完成: ${fileName} (节省 ${compressionRatio.toFixed(2)}%)`);
    } else {
      logMessage(`压缩跳过记录: ${fileName} (压缩比例 ${compressionRatio.toFixed(2)}% 压缩尺寸 ${compressedSize})`);
    }

    return isValidCompression;
  } catch (error) {
    logMessage(`压缩失败: ${fileName} - ${error.message}`);
    return false;
  }
}

// 获取目录下所有文件，忽略 .next 目录
async function getAllFiles(dir, extensions) {
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });

  for (const item of list) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      // 忽略 .next 目录
      if (basename(fullPath) === '.next') {
        logMessage(`忽略目录: ${fullPath}`);
        continue;
      }
      results = [...results, ...(await getAllFiles(fullPath, extensions))];
    } else if (extensions.includes(extname(item.name).toLowerCase())) {
      results.push(normalize(fullPath)); // 标准化路径
    }
  }
  return results;
}

// 按批次并发压缩
async function compressFilesInBatches(files, config, records) {
  const batchSize = config.concurrentLimit;
  let compressedCount = 0;

  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);

    const results = await Promise.allSettled(
        batch.map(file => compressFile(file, config, records))
    );

    compressedCount += results.filter(
        result => result.status === 'fulfilled' && result.value === true
    ).length;

    // 批次完成后保存记录
    await saveRecords(records);

  }

  return compressedCount;
}

// 主函数
async function main() {
  const config = await loadConfig();

  if (!config.apiKey) {
    console.error('请在 tinypng.config.json 中配置 API Key');
    return;
  }

  tinify.key = config.apiKey;
  const records = await loadRecords();

  try {
    // 确保压缩目录存在
    await fs.mkdir(config.compressDir, { recursive: true });

    // 获取所有需要压缩的文件
    const files = await getAllFiles(config.compressDir, config.extensions);

    logMessage(`发现 ${files.length} 个图片文件`);

    // 并发压缩文件
    const compressedCount = await compressFilesInBatches(files, config, records);

    logMessage(`压缩完成，共处理 ${compressedCount} 个文件`);
  } catch (error) {
    logMessage(`处理失败: ${error.message}`);
  }
}

// 运行脚本
main().catch(error => console.error(error));