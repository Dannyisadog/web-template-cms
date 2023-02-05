import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

interface sendParams {
  template: string;
  subject: string;
  to: string;
}

class Mailer {
  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;
  mailer: any;

  constructor() {
    this.MAILGUN_API_KEY = process.env.MAILGUN_API_KEY ?? '';
    this.MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN ?? '';
    this.mailer = {};
    this.setup();
  }

  private setup() {
    if (process.env.NODE_ENV === 'production') {
      if (!this.MAILGUN_API_KEY) {
        throw new Error("MAIL API KEY SHOULD NOT BE EMPTY");
      }
    
      if (!this.MAILGUN_DOMAIN) {
        throw new Error("MAIL DOMAIN SHOULD NOT BE EMPTY");
      }
    
      const auth = {
        auth: {
          api_key: this.MAILGUN_API_KEY,
          domain: this.MAILGUN_DOMAIN
        }
      }
      this.mailer = nodemailer.createTransport(mg(auth));
    } else {
      this.mailer = nodemailer.createTransport({
        host: 'mailhog',
        port: 1025,
        ignoreTLS: true
      });
    }
  }

  async send({
    template,
    subject,
    to
  }: sendParams) {
    try {
      await this.mailer.sendMail({
        from: 'no-reply@template.dannyisadog.com',
        to: to,
        subject: subject,
        html: template
      });
  
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default Mailer;