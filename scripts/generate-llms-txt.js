import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function extractMDXContent(filePath) {
  try {
    const content = readFileSync(filePath, "utf-8");

    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    let frontmatter = {};
    let mdxContent = content;

    if (frontmatterMatch) {
      const frontmatterText = frontmatterMatch[1];
      mdxContent = content.replace(frontmatterMatch[0], "").trim();

      // Parse basic YAML frontmatter
      frontmatterText.split("\n").forEach((line) => {
        const [key, ...valueParts] = line.split(":");
        if (key && valueParts.length > 0) {
          const value = valueParts.join(":").trim();
          frontmatter[key.trim()] = value;
        }
      });
    }

    // remove import statements
    mdxContent = mdxContent.replace(/^import\s+.*$/gm, "");

    // remove JSX components but keep their content
    mdxContent = mdxContent.replace(/<([A-Z][^>]*)>/g, "");
    mdxContent = mdxContent.replace(/<\/[A-Z][^>]*>/g, "");

    // whitespace cleanup
    mdxContent = mdxContent.replace(/\n\s*\n\s*\n/g, "\n\n").trim();

    return {
      title: frontmatter.title || "",
      description: frontmatter.description || "",
      content: mdxContent,
      path: filePath,
    };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

function getAllMDXFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const entries = readdirSync(currentDir);

    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (entry.endsWith(".mdx")) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

function generateLLMSTxt() {
  const contentDir = join(__dirname, "..", "content");
  const outputDir = join(__dirname, "..", "out/docs/");
  const outputFile = join(outputDir, "llms.txt");

  // Get all MDX files
  const mdxFiles = getAllMDXFiles(contentDir);
  console.log(`Found ${mdxFiles.length} MDX files`);

  let llmsContent = `# Sharetribe Developer Documentation

This file contains the content of all documentation pages for use by LLMs.
Generated on: ${new Date().toISOString()}

---

`;

  // Process each MDX file
  let processedCount = 0;
  for (const filePath of mdxFiles) {
    const extracted = extractMDXContent(filePath);
    if (extracted) {
      // Create relative path for reference
      const relativePath = filePath.replace(contentDir, "").replace(/^\//, "");

      llmsContent += `## ${extracted.title || relativePath}\n\n`;

      if (extracted.description) {
        llmsContent += `Description: ${extracted.description}\n\n`;
      }

      llmsContent += `Path: ${relativePath}\n\n`;
      llmsContent += `${extracted.content}\n\n`;
      llmsContent += `---\n\n`;

      processedCount++;
    }
  }

  writeFileSync(outputFile, llmsContent, "utf-8");

  console.log(
    `Successfully generated llms.txt with content from ${processedCount} MDX files`,
  );
}

generateLLMSTxt();
