# meet me
Hey there! This is a little Angular application I made to allow people a chance to get to know me via my Instagram feed. Due to the updates to the Instagram API (since I played with it last), this will be a Sandbox-mode app, and as such, is far more limited in scope than if this was a production-ready and approved by Instagram.

This project assumes you have npm, gulp, and python ready to go on your local machine. If you do not, please install those first.

Because this project is in Instagram Sandbox mode, you will need to be registered as a developer on Instagram before you will be able to do anything. I will need to add you to the sandbox client before you will be able to authenticate within the application. After I add you, you will need to accept the developer invitation [here](https://www.instagram.com/developer/clients/sandbox_invites/). Please reach out to me at juliepranger@gmail.com and let me know you'd like to play around with the application. If you try to authenticate without these permissions, you will receive this error:

```
{"error_message": "You are not a sandbox user of this client", "error_type": "OAuthForbiddenException", "code": 403}
```

To make sure you have all necessary dependencies, please run the following command:

```
npm install
```

To run this project locally, please run the following commands in your project root (open 2 separate tabs, one for each):

```
gulp
python -m SimpleHTTPServer 3000
```

You can then hit the following URL in your browser:
```
http://0.0.0.0:3000/
```
