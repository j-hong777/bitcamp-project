# requires: Nodejs/NPM, PowerShell
# Permission to run PS scripts (for this session only):
# Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# exit if cmdlet gives error
$ErrorActionPreference = "Stop"

# Check to see if root CA file exists, download if not
If (!(Test-Path ".\root-CA.crt")) {
    "`nDownloading AWS IoT Root CA certificate from Symantec..."
    Invoke-WebRequest -Uri https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem -OutFile root-CA.crt
}

# install AWS Device SDK for NodeJS if not already installed
If (!(Test-Path ".\node_modules")) {
    "`nInstalling AWS SDK..."
    npm install aws-iot-device-sdk
}

"`nRunning pub/sub sample application..."
node .\node_modules\aws-iot-device-sdk\examples\device-example.js --host-name a1lqcwo4cmer5o.iot.ap-northeast-2.amazonaws.com --private-key .\dev01.private.key --client-certificate .\dev01.cert.pem --ca-certificate .\root-CA.crt
