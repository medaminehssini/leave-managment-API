import SibApiV3Sdk from "sib-api-v3-sdk";
import { Vonage } from "@vonage/server-sdk";

const defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

export const sendEmail = (to, subject, content) => {
  const transEmail = new SibApiV3Sdk.TransactionalEmailsApi();
  transEmail
    .sendTransacEmail({
      sender: {
        email: "support@leavemanagement.com",
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      textContent: content,
    })
    .then(console.log)
    .catch(console.log);
};

export const sendSMS = async (text) => {
  const vonage = new Vonage({
    apiKey: "a8f08afc",
    apiSecret: "DYJHMXWNZjxzmVr8",
  });

  const from = "Leavemangement";
  const to = "21629472994";

  const resp = await vonage.sms.send({ from, to, text });
  console.log(resp);
};
