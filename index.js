#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { updateVersion, updateVersionWithMask } from './updateMe.js';

const args = process.argv.slice(2);

const getPackageJson = () => {
    const packagePath = path.join(process.cwd(), 'package.json');
    return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
};

const showUsage = () => {
    console.log(`
Usage: versionVibe [filename] [options]

Options:
  --x [versionMask]   Set the version using a mask (e.g., x.x.+3).
  --bump [type]       Bump the version (type can be major, minor, or patch).
  --help              Display this help message.
  --version           Display the version of the package.

Examples:
  versionVibe ./manifest.json --x 2.3.4
  versionVibe ./manifestmv3.json --bump major
  versionVibe ./manifest.json --bump minor
  versionVibe ./manifest.json --bump patch
  versionVibe ./manifest.mv3.json --x x.x.+3

  See test/index.test.js for more examples
`);

    // console.log("Usage:");
    // console.log("  updateMe <filename> --x [versionMask]");
    // console.log("  updateMe <filename> --bump <major|minor|patch>");
    // console.log("\nExamples:");
    // console.log("  updateMe ./manifest.json --bump major", "increases the major version by 1 (e.g., from 1.2.3 to 2.0.0).");
    // console.log("  updateMe ./manifest.json --bump minor", "increases the minor version by 1 (e.g., from 1.2.3 to 1.3.0).");
    // console.log("  updateMe ./manifest.json --bump patch", "increases the patch version by 1 (e.g., from 1.2.3 to 1.2.4).");
    // console.log("  updateMe ./manifest.json --x 1.2.3", "sets the version to 1.2.3 explicitly.");
    // console.log("  updateMe ./manifest.json --x x.x.+3", "increments the current patch version by 3, keeping major and minor unchanged.");
    // console.log("  updateMe ./_package.json --x 2.0.0", "sets the version to 2.0.0 explicitly.");
    // console.log("  updateMe ./app.json --x 0.1.5", "sets the version to 0.1.5 explicitly.");
    // console.log("  updateMe ./data.json --x x.3.0", "sets the major version to the current value and set the minor version to 3, and the patch to 0.");
    // console.log("  updateMe ./_version.json --x 1.x.+1", "keeps the major version as 1, increments the minor version by 1, and increases the patch by 1.");
    // console.log("  updateMe ./_release.json --x x.0.0", "sets the minor version to 0 and the patch version to 0, keeping the major version unchanged.");
};

const main = async () => {
    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        showUsage();
        process.exit(0);
    }
    // Check for version command
    if (args.includes('--version') || args.includes('-v') || args.includes('--Version') || args.includes('-V')) {
        const packageJson = getPackageJson();
        console.log(packageJson.version);
        process.exit(0);
    }


    const [filename, subcmd, subcmd_arg] = args;

    if (!filename) {
        console.error('Please provide a filename. \n\tEx: updateMe ./manifest.json --x [versionMask]');
        process.exit(1);
    }
    try {
        if (subcmd === '--x') {
            if (!subcmd_arg || subcmd_arg.length < 5) {
                throw new Error("Invalid versionMask, expects x.x.x syntax");
            }
            await updateVersionWithMask(filename, subcmd_arg);
        } else if (subcmd === '--bump') {
            if (!["major", "minor", "patch"].includes(subcmd_arg)) {
                console.error("Usage: updateMe <filename> --bump <major|minor|patch>");
                throw new Error("Invalid bump argument...");
            }
            const masks = {
                major: "+1.x.x",
                minor: "x.+1.x",
                patch: "x.x.+1"
            };
            await updateVersionWithMask(filename, masks[subcmd_arg]);
        } else {
            throw new Error("Unknown command...");
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

await main();