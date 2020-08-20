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

   This tool converts an exported 1Password vault to a vault that can be imported into buttercup.  For whatever reason buttercup could not do this from the GUI and while there are API's out there, nothing was automatic.  This tool uses those API's of "buttercup" and "@buttercup/importer" that you must require.

   1Password on IOS does not seem to have the vault export capabilities.  My 1Password vault was synced to my iMac using 1Passwords WLAN feature. It is beyond the scope of this tool to explain how that was done.  You would need to check the 1Password forums to do this if you do not know how.

Usage:
Step 1. Export the 1Password vault to a file by:
        File->export->all items
        This will bring up a dialog about where to save the .1pif data file.
Note1:  The data is unsecure and you will be told as such.
Note2:  The actual vault is called data.1pif in a time stamped sub-directory
        with an extension also of .1pif.  The data.1pif file is what you
        will need for this conversion program.

Step 2. Run this program with the data.1pif file in the same directory or
        change the constants below.

Step 3. The output of this tool is "./user.bcup" with a default master
        password of "MasterPassword!". You can change the constants here or
        later after you import it to buttercup.

Step 4. From Buttercup select
        Archive->Import->From 1Password Archive (.1pif) and then select
        "user.bcup"

Step 5. Enter the defaut master password of 'MasterPassword!" and your
        all done.  Enjoy.

Step 6. IT IS VERY IMPORTANT THAT YOU REMEMBER TO DELETE THE UNENCRYPTED /
        UNSECURE / 1PASSWORD VAULT THAT YOU EXPORTED FROM 1PASSWORD.

    John Talbot
    ztalbot2000@gmail.com
   
```

### Supported password vault formats

 * 1Password (1pif) exports

### Output Example

```shell>./OnePaswordVaultImporter.js
Requiring @buttercup/importer
Requiring buttercup
Initializing buttercup environment
Creating buttercup datasource Credentials
Creating buttercup vault Credentials
Creating buttercup FileDataSource from dataSourceCredentials
Importing 1PasswordVault from: ./data.1pif
1Password vault imported successfully
Exporting 1Password vault to Buttercup Vault in memory
ButtercupVault created in memory
Saving Buttercup Vault with Credentials to: user.bcup
buttercupVault has been Saved
```

### Issues

 * Either it works or it doesn't for you.  Sorry as it works for me ;-)

### Disclaimer

 * This tool will not harm your 1Password vault as it works on the exported
   vault that you created from 1Password.  It is not my responsibility to
   delete this file afterwards.  Your security and use of this tool is your
   own responsibility..

