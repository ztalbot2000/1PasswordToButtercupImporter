# 1Password to Buttercup Vault Importer
> 1Password to Buttercup Vault Importer


## About

This vault importer uses the API from buttercup importer to import and create a buttercup vault archive.

### Usage

This tool is a standalone node.js application since I could not get the Buttercup GUI to import my exported 1Password vault.

See the inline help or read the code for yourself.  This is a very small tool.

Eg.

```shell>
node ./OnePasswordVaultImporter.js -h

```

### Supported password vault formats

 * 1Password (1pif) exports

### Issues

 * Either it works or it doesn't for you.  Sorry as it works for me ;-)

### Disclaimer

 * This tool will not harm your 1Password vault as it works on the exported
   vault that you created from 1Password.  It is not my responsibility to
   delete this file afterwards.  Your security and use of this tool is your
   own responsibility..

