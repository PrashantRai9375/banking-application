# banking-application
basic banking transaction functionality

base url - localhost:8088/banking/assignment/v1/

user urls-
user creation and login--
localhost:8088/banking/assignment/v1/user/login
body -{
    "email": "abc3@gmail.com",
    "password": "Qwerty@1"
}

localhost:8088/banking/assignment/v1/user/create
body - {
    "email": "abc3@gmail.com",
    "password": "Qwerty@1",
    "name": " abc3",
    "role": 1
}


transaction urls--
token to be passed in header key -"Authorization"
localhost:8088/banking/assignment/v1/transaction/deposit
body -{
    "amount": 90
}

localhost:8088/banking/assignment/v1/transaction/withdraw
body -{
    "amount": 90
}
localhost:8088/banking/assignment/v1/transaction/balanceEnquiry

localhost:8088/banking/assignment/v1/transaction/report?from_date=2021-01-28&to_date=2021-01-288&user_id=1


.env file variables---------

NODE_ENV = development
PORT = 8088
DB_NAME = banking_app
DB_HOST = localhost
DB_PORT = 3306
DB_USER = root
DB_USER_PWD = root

REDIS_DB_INDEX = 1
REDIS_DB_PORT = 6379
REDIS_DB_HOST = localhost

EMAIL = "your email" // less secure apps need to be enabled in google accounts seetting
PASSWORD = "your pass"

JWT_SECRET_KEY =  BANKING
