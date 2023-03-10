const { post } = require("@toruslabs/http-helpers")
const keyAssignQueueHost = "https://key-assign.web3auth.com"

const importUser = async (userEmail) => {
    const googleVerifier = "tkey-google-cyan";
    const passwordlessVerifier = "tkey-auth0-email-passwordless-cyan";

    const res1 = await post(
        `${keyAssignQueueHost}/api/keyAssign`,
        {
            verifier: googleVerifier,
            verifierId: userEmail,
            network: "cyan",
            isNewUser: true,
        }
    );

    if (res1?.processingTime > 10) {
        console.warn("Please decrease load!!");
    }
    const res2 = await post(
        `${keyAssignQueueHost}/api/keyAssign`,
        {
            verifier: passwordlessVerifier,
            verifierId: userEmail,
            network: "cyan",
            isNewUser: true,
        }
    );
    if (res2?.processingTime > 10) {
        console.warn("Please decrease load!!");
    }

    if (res2?.processingTime > 15) {
        console.error("Load exceeded beyond limit, please wait for sometime to retry again!!");
        process.exit(1)
    }
    console.log("Key assign request sent for", userEmail)
}


(async ()=>{
    await importUser("h2@example.com")
    process.exit(1)
})()