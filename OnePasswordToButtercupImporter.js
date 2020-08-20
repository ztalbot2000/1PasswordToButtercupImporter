#!/usr/local/bin/node

if ( process.argv.length > 2 )
{
   console.log(`
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
   `);
    process.exit( 0 );
}

DEBUG = false;

console.log( "Requiring @buttercup/importer" );
const importer = require( "@buttercup/importer" );
DEBUG && console.debug( "importer" );
DEBUG && console.debug( importer );
DEBUG && console.debug( "\n" );

console.log( "Requiring buttercup" );
const buttercup = require( "buttercup" );
DEBUG && console.debug( "buttercup" );
DEBUG && console.debug(buttercup);
DEBUG && console.debug( "\n" );


const buttercupOutputVaultFileName="user.bcup";
const buttercupOutputVaultMasterPassword="MasterPassword!";
const onePasswordInputFile = "./data.1pif";


console.log( "Initializing buttercup environment" );
let buttercupInit = buttercup.init;
DEBUG && console.debug( "buttercupInit" );
DEBUG && console.debug(buttercupInit);
DEBUG && console.debug( "\n" );
buttercupInit();

console.log( "Creating buttercup datasource Credentials" );
let Credentials = buttercup.Credentials;
const datasourceCredentials = Credentials.fromDatasource({
    path: buttercupOutputVaultFileName
}, buttercupOutputVaultMasterPassword );
DEBUG && console.debug( "datasourceCredentials: " );
DEBUG && console.debug(datasourceCredentials);
DEBUG && console.debug( "\n" );
;

console.log( "Creating buttercup vault Credentials" );
const vaultCredentials = Credentials.fromPassword( buttercupOutputVaultMasterPassword );
DEBUG && console.debug( "vaultCredentials" );
DEBUG && console.debug(vaultCredentials);
DEBUG && console.debug( "\n" );

console.log( "Creating buttercup FileDataSource from dataSourceCredentials" );
let buttercupFileDatasource = new buttercup.FileDatasource( datasourceCredentials );
DEBUG && console.debug( "buttercupFileDatasource" );
DEBUG && console.debug(buttercupFileDatasource);
DEBUG && console.debug( "\n" );

console.log( "Importing 1PasswordVault from: " +  onePasswordInputFile )
let onePassImportPromise = importer.OnePasswordImporter.loadFromFile( onePasswordInputFile);
DEBUG && console.debug( "onePassImportPromise" );
DEBUG && console.debug( onePassImportPromise );
DEBUG && console.debug( "\n" );


onePassImportPromise.then( function(onePassImportData)
{
   console.log( "1Password vault imported successfully" )

   console.log( "Exporting 1Password vault to Buttercup Vault in memory" )
   buttercupVaultPromise = onePassImportData.export();
   buttercupVaultPromise.then( function( buttercupVault )
   {
      console.log( "ButtercupVault created in memory" );
      DEBUG && console.debug( "buttercupVault" );
      DEBUG && console.debug(buttercupVault);
      DEBUG && console.debug( "\n" );

      console.log( "Saving Buttercup Vault with Credentials to: " + buttercupOutputVaultFileName )
      let buttercupSavePromise =  buttercupFileDatasource.save(buttercupVault.format.history, vaultCredentials);
      DEBUG && console.debug( "buttercupSavePromise" );
      DEBUG && console.debug( buttercupSavePromise );
      DEBUG && console.debug( "\n" );

      buttercupSavePromise.then( function( ) {
         console.log( "buttercupVault has been Saved" );
      }, function( reject )
      {
         console.log( "Failed: " + reject );
         process.exit( -1 );
      });
   }, function( reject )
   {
      console.error( "Failed: " + reject );
      process.exit( -1 );
   });
}, function( reject ) {
    console.log( "Failed: " + reject );
    process.exit( -1 );
});

console.log("Done");
