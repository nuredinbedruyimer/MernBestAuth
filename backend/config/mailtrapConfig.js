import { MailtrapClient } from "mailtrap";
const TOKEN = "9c0ec816fd689e0bd7c46610dfc58bd7";

export const mailtrapCliet = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Nuredin Bedru",
};

