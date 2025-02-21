# VersionVibe

**VersionVibe** is a powerful npm package designed to manage semantic versioning of JSON files. It allows you to easily update the version property in any JSON file using various methods, including version masking and bumping.

## Installation

To install VersionVibe globally, run the following command:

```bash
npm install -g version-vibe
```

## Usage

You can use the `version-vibe` package directly from the command line. Here are the available commands:

### Incrementing the Version

1. **Using Masking**: Increment the version using a specific mask.

   ```bash
   versionVibe ./path/to/your/manifest.json --x x.x.+3
   ```

2. **Bumping the Version**: Increment the version by one for major, minor, or patch.

   ```bash
   versionVibe ./path/to/your/manifest.json --bump major
   versionVibe ./path/to/your/manifest.json --bump minor
   versionVibe ./path/to/your/manifest.json --bump patch
   ```

3. **Lazy Increment**: This will increment the patch version by one with a rolling increment.

   ```bash
   versionVibe ./path/to/your/manifest.json
   ```

## Command Options

- `--x [versionMask]`: Use a version mask to specify how to increment the version. The mask should follow the `x.x.x` format, where `x` can be replaced with a number or `+` to indicate an increment.
  
- `--bump <major|minor|patch>`: Specify which part of the version to increment. This will increment the specified part by one.

- `--help`: Display the help message with usage instructions.

## Examples

Given a `manifest.json` file with the following content:

```json
{
  "version": "1.2.3"
}
```

Running the command:

```bash
versionVibe ./manifest.json --bump minor
```

Will update the `version` to `1.3.3`.

### Additional Examples

- Set the version explicitly:

  ```bash
  versionVibe ./manifest.json --x 2.3.4
  ```

- Bump the major version:

  ```bash
  versionVibe ./manifest.json --bump major
  ```

- Increment the patch version by 3:

  ```bash
  versionVibe ./manifest.json --x x.x.+3
  ```

## Error Handling

If you do not provide a filename or if the command options are invalid, VersionVibe will throw an error with a message indicating the issue.

## Future Enhancements

- Sync multiple files to the same version.


## License

This project is licensed under the MIT License.
