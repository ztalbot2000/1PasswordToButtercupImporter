# 1Password to Buttercup Vault Importer
> 1Password to Buttercup Vault Importer


## About

This vault importer uses the API from buttercup importer to import and create a
buttercup vault archive.

## My Impressions of Buttercup after Import

This is my impression and does not reflect the great work of Buttercup.  1Password
has a field called "Notes", which was not imported into Buttercup.  The great thing
about Open Source is that I actually modified the 1PasswordEntry.js of the Buttercup
1Password Importer to include Notes with these following lines:<BR>

```
  if (rawItem.secureContents.notesPlain) {
     entry.meta.notes = rawItem.secureContents.notesPlain;
  }

```
  The result was that my notes were now placed into Buttercup!  However, Since
Buttercup is HTML based, my imported notes did not have any newline formatting and
was just one big long input box.  Further changes that I am not willing to pursue.
For this reason only, I will try other password managers before continuing with Buttercup.

### Usage

This tool is a standalone node.js application since I could not get the Buttercup
GUI to import my exported 1Password vault.

See the inline help or read the code for yourself.  This is a very small tool.

Eg.

```shell>
node ./OnePasswordVaultImporter.js -h

   This tool converts an exported 1Password vault to a vault that can be imported
into buttercup.  For whatever reason buttercup could not do this from the GUI and
while there are API's out there, nothing was automatic.  This tool uses those API's
of "buttercup" and "@buttercup/importer" that you must require.

   1Password on IOS does not seem to have the vault export capabilities.  My 1Password
vault was synced to my iMac using 1Passwords WLAN feature. It is beyond the scope of
this tool to explain how that was done.  You would need to check the 1Password forums
to do this if you do not know how.

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

### After Thoughts

 * It is possible that the Buttercup GUI would not import the 1Password.1pif file because
of the way Buttercup says to export it.  I am not sure. I am currently trying KeePassXC.
KeePassXC would also not read the 1Password.1pif file.  It wanted an OPVault format. To
create this file I had to turn off WLAN and backup the vault to a file.  I created a
directory ~/Documents/OPVault and moved the 'default' directory of the exported data
into it.  This I imported into KeePassXC, including all the notes! At first glance
KeePassXC has all the features of 1Password that I was looking for.  This will then end
my endeavors with Buttercup.

If this helps you in any way; Please star this repository.

John Talbot

