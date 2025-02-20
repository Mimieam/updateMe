import fs from 'fs';
import path from 'path';
import { updateVersionWithMask } from '../updateMe.js';

const testFilePath = path.join('./test/dummy.json');

// Helper function to create a test manifest file
const createTestManifest = (version) => {
    const manifest = { version };
    fs.writeFileSync(testFilePath, JSON.stringify(manifest, null, 2));
};

// Clean up the test file after tests
afterAll(() => {
    fs.unlinkSync(testFilePath);
});

describe('updateMe versioning tests', () => {
    beforeEach(() => {
        // Reset the test file before each test
        createTestManifest('1.0.0');
    });

    test.each([
        ['1.0.0', '1.2.3', '1.2.3', 'sets the version to 1.2.3 explicitly.'],
        ['1.0.0', '1.0.3', 'x.x.+3', 'increments the current patch version by 3, keeping major and minor unchanged.'],
        ['1.2.3', '2.2.3', '+1.x.x', 'bumps the major version by 1 (e.g., from 1.2.3 to 2.2.3).'],
        ['1.2.3', '1.7.3', 'x.+5.x', 'bumps the minor version by 5 (e.g., from 1.2.3 to 1.7.3).'],
        ['1.2.3', '1.2.4', 'x.x.+1', 'bumps the patch version by 1 (e.g., from 1.2.3 to 1.2.4).'],
        ['1.0.0', '2.0.0', '2.0.0', 'sets the version to 2.0.0 explicitly.'],
        ['0.1.0', '0.2.0', 'x.+1.x', 'bumps the minor version by 1 (e.g., from 0.1.0 to 0.2.0).'],
        ['0.1.0', '0.1.5', '0.1.5', 'sets the version to 0.1.5 explicitly.'],
        ['0.1.5', '0.1.6', 'x.x.+1', 'bumps the patch version by 1 (e.g., from 0.1.5 to 0.1.6).'],
        ['1.2.3', '1.3.0', 'x.3.0', 'sets the major version to the current value and the minor version to 3, with the patch set to 0.'],
        ['1.0.0', '1.1.0', '1.+1.x', 'increments the minor version by 1 from 1.0.0 (to 1.1.0).'],
        ['1.2.3', '1.0.0', 'x.0.0', 'sets the minor version to 0 and the patch version to 0, keeping the major version unchanged.'],
    ])('updates version from %s to %s using mask %s', async (startVersion, expectedVersion, mask, description) => {
        createTestManifest(startVersion);
        updateVersionWithMask(testFilePath, mask);
        // read the file and parse it as json
        const updatedManifest = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
        expect(updatedManifest.version).toBe(expectedVersion);
    });

    // Tests for --bump functionality
    test.each([
        ['1.0.0', '2.0.0',  'major' ,'bumps the major version from 1.0.0 to 2.0.0.'],
        ['1.2.3', '2.2.3',  'major' ,'bumps the major version from 1.2.3 to 2.2.3.'],
        ['1.2.3', '1.3.3',  'minor' ,'bumps the minor version from 1.2.3 to 1.3.3.'],
        ['1.2.3', '1.2.4',  'patch' ,'bumps the patch version from 1.2.3 to 1.2.4.'],
        ['0.1.0', '0.2.0',  'minor' ,'bumps the minor version from 0.1.0 to 0.2.0.'],
        ['0.1.5', '0.1.6',  'patch' ,'bumps the patch version from 0.1.5 to 0.1.6.'],
    ])('bumps version from %s to %s', async(startVersion, expectedVersion, bumpType, description) => {
        createTestManifest(startVersion);
        const mask = bumpType === 'major' ? '+1.x.x' : bumpType === 'minor' ? 'x.+1.x' : 'x.x.+1';
        updateVersionWithMask(testFilePath, mask);
        const updatedManifest = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
        expect(updatedManifest.version).toBe(expectedVersion);
    });
});
