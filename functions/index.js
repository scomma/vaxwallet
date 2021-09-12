const functions = require("firebase-functions");

const createTemplate = require("passbook");
const uuid = require("uuid");

exports.generate = functions.region("asia-southeast1").https.onRequest((req, res) => {
  const template = createTemplate("generic", {
    passTypeIdentifier: "pass.co.softbaked.test",
    teamIdentifier:     "MXL",
    backgroundColor:    "rgb(46,102,61)",
    foregroundColor:    "rgb(255,255,255)",
    labelColor:         "rgb(255,255,255)",
    organizationName:   "Ministry of Public Health",
    teamIdentifier:     "WLJT52SZU8",
    webServiceURL:      "https://vaxwallet.xyz/",
    logoText:           "Certificate of Vaccination",
    associatedStoreIdentifiers: [1559337829],
    associatedApps: [{"idGooglePlay":"com.mor.promplus"}],
    associatedPlayIdentifiers: ["com.mor.promplus"],
    locations: [
      {
        "latitude": 13.6899991,
        "longitude": 100.7501124,
        "relevantText": "BKK"
      },
      {
        "latitude": 13.9132602,
        "longitude": 100.6041987,
        "relevantText": "DMK"
      },
      {
        "latitude": 8.1110951,
        "longitude": 98.3064646,
        "relevantText": "HKT"
      }
    ],
  });

  template.keys("./keys", functions.config().certs.passphrase);
  template.loadImagesFrom("./images");

  const pass = template.createPass({
    serialNumber: uuid.v4(),
    authenticationToken: uuid.v4(),
    description: "Certificate of Vaccination",
    sharing: {
      method: "PKPassSharingMethodURL",
      url: req.url,
    },
  });

  pass.headerFields.add("DOSAGE", "DOSAGE", req.query.dose3 ? "3/3" : "2/2");

  const idLabel = {nationalid: "Thai National ID ", passportno: "Passport No. ", specify: ""}[req.query.idtype]
  pass.primaryFields.add("member", idLabel + req.query.id, req.query.name);

  const dose1 = req.query.dose1lot ? `${req.query.dose1vac} (${req.query.dose1lot})` : req.query.dose1vac;
  const dose2 = req.query.dose2lot ? `${req.query.dose2vac} (${req.query.dose2lot})` : req.query.dose2vac;
  pass.secondaryFields.add("level", new Date(req.query.dose1date).toDateString(), dose1);
  pass.auxiliaryFields.add("aux", new Date(req.query.dose2date).toDateString(), dose2);
  pass.backFields.add("timeFull", "Created by VaxWallet at", new Date().toISOString());

  pass.barcode({
    "format": "PKBarcodeFormatQR",
    "messageEncoding": "iso-8859-1",
    "altText": "co19cert.moph.go.th",
    "message": req.query.url,
  });

  res.set("Content-Type", "application/vnd.apple.pkpass");
  pass.pipe(res);
});
