import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import DataConverter from '../../infrastructure/dataConverter';

AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east-1',
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01',
  }),
});
const teste = "tessd";
// send some mail
console.log('enviando ', DataConverter.getDataNow());

transporter.sendMail(
  {
    from: 'gguilhermepires@gmail.com',
    to: 'gpires@primeit.pt',
    subject: 'Message',
    html: `<h1>teste</h1>`,
    attachments: [
      {
        // file on disk as an attachment
        filename: 'grade_report_Student_1_1659647982888.pdf',
        path: 'tmp/events/sendEmail/grade_report_Student_1_1659647982888.pdf',
      },
      {
        filename: 'teste.zip',
        path: 'tmp/events/sendEmail/zip_1659647983473.zip'
      }
    ],
  },
  (err, info) => {
    console.log(`testE:${teste}`);

    console.log(err);
    console.log(info.envelope);
    console.log(info.messageId);
  },
);

console.log('ENVIADO ', DataConverter.getDataNow());

