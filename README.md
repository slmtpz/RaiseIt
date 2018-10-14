### Pisano Hackathon Project
#### Group Name: SofaKingCool
#### Group Members: [Seleme Topuz](https://github.com/slmtpz) - [Orbay Altuntoprak](https://github.com/norubai)

<p align="center">
  <img src="https://github.com/slmtpz/RaiseIt/blob/master/raiseit.jpg?raw=true" height="100">
</p>

RaiseIt is an online auction house for real estates where people can bid on postings and win auctions.
You can also learn the value of your property as RaiseIt estimates its price.
You will know when your bid on a posting is raised by someone else as RaiseIt notifies you by SMS!

---------------

### User Features

  - Register and deposit credits to your account.
  - Learn the value of your property.
  - Post your property on auction.
  - Raise the bid on a posting.
  
### System Features

  - Offers a user-friendly website.
  - Estimates the value of a property.
  - Send SMS for various situations (Register / Deposit / When someone raises your bid).

### Technologies

  #### Backend
  
  - *Python/Flask* for server-side coding.
  - *pip* as a package manager.
  - *MongoDB* for NoSQL database engine.
  - *Twilio* for messaging system.  
  - *pandas* for handling data.
  
  #### Frontend
  
  - *Javascript/Reactjs* for frontend coding.
  - *npm* as a package manager.
  - *Axios* for HTTP requests.
  - *Babel* for transpiling jsx into js.
  - *Webpack* for bundling the frontend files.\
  - *antd* as a UI library.
  
### Dependencies
- Python 3.6.2+
- Pip 18.1+
- Node 6.12.3+
- Npm 6.4.1+

### Installation
- It is always supported to build a project on a virtual environment:
```
pip install virtualenv
virtualenv venv; source venv/bin/activate
```
- Using *pip* and *npm*, download and build packages which the project requires.
```
pip install -r requirements.txt
npm install
```
- You can build and bundle frontend files by this command.
```
npm run build
```
- You can start the server by this command.
```
npm run start
```
- **NOTE: Credentials for MongoDB and Twilio are asked from environment variables for security purposes. You can run this command on command line after filling credentials.**
```
export TWILIO_ACCOUNT_SID=''; export TWILIO_AUTH_TOKEN=''; export TWILIO_PHONE_NUMBER=''; export MONGO_DATABASE=''; export MONGO_PASSWORD=''; export MONGO_USERNAME=''; export MONGO_HOSTPORT='';
```

### Future Work
- Maps support can be added to visualize postings on a map.
- Localization can be done for website usage and SMS's.
- Live auctions can be stored in *redis* for scalability.
- Filtering future can be added for postings.
