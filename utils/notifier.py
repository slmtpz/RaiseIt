from twilio.rest import Client


class _Notifier:
    def __init__(self, twilio_account_sid, twilio_auth_token, twilio_phone_number):
        self.client = Client(twilio_account_sid, twilio_auth_token)
        self.phone_number = twilio_phone_number
        pass


class Messenger(_Notifier):
    def _send_sms(self, phone, text):
        try:
            self.client.api.account.messages.create(
                to=phone,
                from_=self.phone_number,
                body=text)
        except:
            print('Fail on Twilio.')
            pass

    def welcome_message(self, user_gsm, username):
        self._send_sms(user_gsm, "Welcome %s, we are happy to see you among us, let's RaiseIt together!, RaiseIt" % username)

    def deposit_message(self, user_gsm, amount):
        self._send_sms(user_gsm, '%s credits are just deposited to your account!, RaiseIt' % amount)

    def bid_raised_message(self, user_gsm):
        self._send_sms(user_gsm, "Your bid is just raised by someone else!, RaiseIt")
