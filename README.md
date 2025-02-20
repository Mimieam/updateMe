# Update Me

`update-me` is a tiny npm package that allows you to update the version of any JSON file that contains a version property. It supports various methods for version incrementing, including masking and bumping.

## Installation

To install the package globally, run:

```bash
npm install -g update-me
```

## Usage

You can use the `update-me` package directly from the command line. Here are the available commands:

### Incrementing the Version

1. **Using Masking**: You can increment the version arbitrarily using a mask.

   ```bash
   updateMe ./path/to/your/manifest.json --x x.x.+3
   ```

2. **Bumping the Version**: You can increment the version by one for major, minor, or patch.

   ```bash
   updateMe ./path/to/your/manifest.json --bump major
   updateMe ./path/to/your/manifest.json --bump minor
   updateMe ./path/to/your/manifest.json --bump patch
   ```

3. **Lazy Increment**: This will increment the patch version by one with a rolling increment.

   ```bash
   updateMe ./path/to/your/manifest.json
   ```

## Command Options

- `--x [versionMask]`: Use a version mask to specify how to increment the version. The mask should follow the `x.x.x` format, where `x` can be replaced with a number or `+` to indicate an increment.
  
- `--bump <major|minor|patch>`: Specify which part of the version to increment. This will increment the specified part by one.

## Example

Given a `manifest.json` file with the following content:

```json
{
  "version": "1.2.3"
}
```

Running the command:

```bash
updateMe ./manifest.json --bump minor
```

Will update the `version` to `1.3.0`.

## Error Handling

If you do not provide a filename or if the command options are invalid, the package will throw an error with a message indicating the issue.

## TODO

- Sync multiple files to the same version.
- Implement additional features as needed.

## License

This project is licensed under the MIT License.
