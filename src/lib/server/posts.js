import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
// Import the environment variable handler from SvelteKit
import { env } from '$env/dynamic/private';

// ---- THIS IS THE KEY CHANGE ----
// Read the path from the .env file instead of a hardcoded path.
const postsDirectory = env.POSTS_PATH;
// The old line was:
// const postsDirectory = path.join(process.cwd(), 'src', 'lib', 'posts');

// The rest of the file remains exactly the same!

/**
 * Parses the custom frontmatter from a markdown file.
 * @param {string} fileContent
 * @returns {{ metadata: Record<string, any>, content: string }}
 */
function parseFrontmatter(fileContent) {
    const metadata = {};
    const contentStartIndex = fileContent.indexOf('\n------\n');
    if (contentStartIndex === -1) {
        return { metadata: {}, content: fileContent };
    }
    const metadataLines = fileContent.substring(0, contentStartIndex).split('\n');
    metadataLines.forEach((line) => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            if (key.trim() === "topics") {
                metadata[key.trim()] = valueParts.join(":").split(",");
                console.log(metadata[key.trim()]);
            } else {
                metadata[key.trim()] = valueParts.join(':').trim();
            }

        }
    });
    const content = fileContent.substring(contentStartIndex + 8);
    return { metadata, content };
}

/**
 * Gets a list of all posts with their metadata.
 * @returns {Promise<Array<Object>>}
 */
export async function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const date = fileName.substring(0, 10);
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { metadata } = parseFrontmatter(fileContents);
            return { slug, date, ...metadata };
        });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Gets a single post by slug, including its parsed HTML content.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getPost(slug) {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const date = path.basename(filePath).substring(0, 10);
        const { metadata, content } = parseFrontmatter(fileContents);
        const contentHtml = await marked.parse(content);
        return { slug, date, contentHtml, ...metadata };
    } catch (err) {
        return null;
    }
}