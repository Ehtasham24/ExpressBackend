const crypto = require("crypto");

const generateSignature = (data, passPhrase = null) => {
  try {
    let pfOutput = "";
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] !== "") {
          // Ensure the value is a string before calling trim
          let value = data[key];
          if (typeof value !== "string") {
            value = String(value);
          }
          console.log("inside nested if:", key, value);
          pfOutput += `${key}=${encodeURIComponent(value.trim()).replace(
            /%20/g,
            "+"
          )}&`;
          console.log("Current pfOutput:", pfOutput);
        }
      }
    }

    let getString = pfOutput.slice(0, -1);
    console.log("String before adding passphrase:", getString);

    if (passPhrase !== null) {
      getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
        /%20/g,
        "+"
      )}`;
      console.log("String after adding passphrase:", getString);
    }

    console.log("Generated String for Signature:", getString);

    const signature = crypto.createHash("md5").update(getString).digest("hex");
    console.log("Generated Signature:", signature);

    return signature;
  } catch (error) {
    console.error("Error in generateSignature function:", error);
    throw error; // Re-throw the error after logging it
  }
};

module.exports = { generateSignature };
