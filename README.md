# VaxWallet

Are you turned off by how ugly the official Mor Promt certificate issued by Ministry of Public Health looks? This project creates a good-looking pkpass file ready to save to your iPhone/Android wallet.

Moreover, being wallet passes, they have the advantage of popping up when you need them e.g. at airports, or they can be summoned by rapidly pressing the secondary button on Apple Watch twice.

| Ugly | Pretty |
|------|--------|
|<img src="https://i.imgur.com/svibnNW.jpg" height="200">|<img src="https://i.imgur.com/vV1ImGg.jpg" height="200">|

## Development

1. Install Firebase emulator
2. Replace the certificate in `functions/keys` with one from Apple Developer Portal
3. Set the Firebase config `certs.passphrase` to your certificate's passphrase

## Deployment

1. Replace the certificate in `functions/keys` with one from Apple Developer Portal
2. Set the Firebase config `certs.passphrase` to your certificate's passphrase
3. Setup GitHub workflows to point to your Firebase project; this takes care of Firebase Hosting (the static page)
4. Deploy to Firebase Functions manually with `firebase deploy --only functions`
