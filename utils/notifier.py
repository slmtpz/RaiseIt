from twilio.rest import Client


class _Notifier:
    def __init__(self, twilio_account_sid, twilio_auth_token, twilio_phone_number):
        self.client = Client(twilio_account_sid, twilio_auth_token)
        self.phone_number = twilio_phone_number
        pass


class Messenger(_Notifier):
    def _send_sms(self, phone, text):
        self.client.api.account.messages.create(
            to=phone,
            from_=self.phone_number,
            body=text)

    def deposit_message(self, user_gsm, amount):
        self._send_sms(user_gsm, '%s credits are just deposited in your account!, RaiseIt' % amount)

