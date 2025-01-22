import { readFileSync } from 'fs';
import { parse } from 'yaml';
export function loadConfig(configPath) {
    try {
        const fileContents = readFileSync(configPath, 'utf8');
        const config = parse(fileContents);
        // Validate required fields
        if (!config.dify_base_url) {
            throw new Error('Missing required field: dify_base_url');
        }
        if (!Array.isArray(config.dify_app_sks) || config.dify_app_sks.length === 0) {
            throw new Error('Missing or invalid field: dify_app_sks must be a non-empty array');
        }
        return config;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to load config: ${error.message}`);
        }
        throw new Error('Failed to load config: Unknown error');
    }
}
