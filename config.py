import urllib
import os
# Credentials for MongoDB and Twilio are asked from environment variables for security purposes.
# You can run this command on command line after filling credentials.
# Please check README.md, https://github.com/slmtpz/RaiseIt.
MONGO = {
    'USERNAME': os.environ['MONGO_USERNAME'],
    'PASSWORD': urllib.parse.quote(os.environ['MONGO_PASSWORD']),
    'HOSTPORT': os.environ['MONGO_HOSTPORT'],
    'DATABASE': os.environ['MONGO_DATABASE']
}
MONGO_URI = "mongodb://%s:%s@%s/%s" % (MONGO['USERNAME'], MONGO['PASSWORD'], MONGO['HOSTPORT'], MONGO['DATABASE'])

TWILIO = {
    'ACCOUNT_SID': os.environ['TWILIO_ACCOUNT_SID'],
    'AUTH_TOKEN': os.environ['TWILIO_AUTH_TOKEN'],
    'PHONE_NUMBER': os.environ['TWILIO_PHONE_NUMBER']
}
