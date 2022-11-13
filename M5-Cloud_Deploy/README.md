# M5-Cloud_Deploy
Fifth Module from LemonCode's Bootcamp

---

# Steps for each branch

---

## `despliegue-manual-mock`

https://m5cloud-manual-mock.herokuapp.com/

If you want to use a AWS S3 storage, you must perform what's next:
 - At your backend folder's terminal, type: `npm install @aws-sdk/client-s3 --save`.

First of all we must compile our TypeScript project into JavaScipt:
 - Install this library at your backend folder:
    - `npm install rimraf cross-env --save-dev`.
 - Create these commands inside "package.json": 
    - `"build" : "npm run type-check && npm run clean && npm run build:prod"`.
    - `"build:prod": "cross-env NODE_ENV=production babel src -d dist --extensions \".ts\""`.
    - `"clean" : "rimraf dist"`.
 - Run `npm run build`.

 Now lets deploy it into heroku:
- Install heroku globally: `npm install -g heroku`.
- Log in: `heroku login`.
- Copy Heroku git URL and clone it to your folder: `git clone heretherepositoryurl .` Mind the last dot.
- Add into this folder all the files from the previously compiled "dist" folder.
- Copy also: "package.json" and "public" folder.
- Inside the cloned repository create a .gitignore, where we'll ignore "node_modules", just in case, heroku will perform the `npm i`.
- Inside the "package.json" file: 
    - Erase all the "scripts" commands and add: `"start": "node index"`.
    - Erase the "devDependencies" object.
- Then write in the terminal: `git add .` then `git commit -m "hereistheinfomsg"` and then `git push`.

All above steps are for the deployment, now let's get to the configuration:
- Go to heroku web page and go to your app.
- Click: Settings>Config Vars.
- Here you'll create all the variables listed next:
    - STATIC_FILES_PATH (path to the "public" folder)
    - CORS_ORIGIN (we don't use CORS, so set it to false)
    - API_MOCK (if we want to use mocked data)
    - AUTH_SECRET (must be changed every now and then)
    // Next values are not neccesary if you don't use AWS S3 storage service
    - AWS_ACCESS_KEY_ID (aws key id)
    - AWS_SECRET_ACCESS_KEY (aws access key)
    - AWS_S3_BUCKET (name of the aws bucket)


Once you added all the data, you can already go to your web page.

## `despliegue-manual-mongo`

https://m5cloud-manual-mongo.herokuapp.com/

First we must create and deploy an app into Heroku the same way as seen previously.

Then we must configure mongoDB Atlas:
- Create an account.
- Create a new project.
- Build a new Database (if using AWS, base it on the same server as your AWS database).
- Go to "Network Access" and allow all the IPs that you want.
- Create a user (type name and password) in "Database Access", with the "Specific Privileges" of "readWrite" in your database.

Now, still in your MongoDB Atlas account, lets add your mock users:
- Go to "Deployment>Database" and in your cluster click "Connect".
- A window will pop-up. Choose "MongoDBDrivers".
- Copy the url listed.
- Close it and go to your development app workspace, and in the ".env" file, change the value of "MONGODB_URI" with the URL, where you must change the password and add the name of the database after "...mongodb.net/thenameofyourdatabasegoeshere". (This is performed to add your mock users into your database)
- Inside your development app workspace, go to: src>console-runners>seed-data.runner.ts, and modify the code to add user's data.
- Then, with the git bash terminal, go to the backend folder and write `npm run start:console-runners` and execute the 'seed-data".
    - If data is not beeing updated, erase "?retryWrites=true&w=majority" from the URI.

Now let's go to Heroku:
- Go to "Config Vars" and:
    - Set API_MOCK to false.
    - Add "MONGODB_URI" and write as its value the complete URL from Mongo.

Done! You can access your web page by following your web page Heroku Domain. If everything went properly, you shouldn't see any books. Try adding a new book, the collection should be created inside the Mondo Cluster.
You can use, in the terminal, the next command: `heroku logs -a thenameofyourherokudb --tail`. This will allow you to visualize all the server requests.

## `despliegue-automatico-heroku-docker`

https://m5cloud-automatico.herokuapp.com/
 
First you must have two things:
 - Project created in Heroku
 - Repository created in github

Then, in the terminal, type:
`(If using SSH)`
 - `git init` to initiate github.
 - `git remote add origin heretheurlofyourgitrepository`.
 - `git add .`.
 - `git commit -m "herethemessage"`.
 - `git push -u origin main` If your main is "master" or other, change "main" with that one.

`(If using HTTPS)`
 - `git init` to initiate github.
 - `git commit -m "herethemessage"`.
 - `git push heretheurlofyourrepository`.

Now we must create and save a valid token to automatically log into heroku:
 - Type: `heroku authorizations:create -d herearandomname`.
 - Copy the returned token.

Lets add it and other things to our github repository:
 - Go to github repository's settings.
 - Go to Secrets>Actions>NewRepositorySecret.
 - Add the name that you want and paste the token inside the secret box.
 - Now add another secret, whith whichever name and, as secret, the name of your Heroku app.

Time to create the workflow:
 - Create a folder, inside root, called ".github" and inside "workflows".
 - Add a new file called "cd.yml" (cd stands for continuous deployment).
    - Copy all the code from an example or use the official webpage.
    - Heroku uses its own ports, that's why we don't need to add them.

## `despliegue-aws-manual-mock`

M5cloudmanualmock-env-1.eba-kggrkesa.eu-west-3.elasticbeanstalk.com

Inside AWS:
- Search for "Elastic Beanstalk" and click it.
- Create a new Application.
- Write your desired App name.
- Next lets import our source code:
    - Go to VSCode and create a new folder
    - Move "dist" folder content to this new folder.
    - Add the "public" folder.
    - Add the previously simplified "package.json" file.
    - Once everything is in place, compress these files into a .zip folder, called as you want.
- Upload this folder.
- Choose a version label.
- Click in "Configure more options".
- Go to "Software>Environment properties" and configure the same variables as in Heroku.
    - API_MOCK MUST be set to true.
    - In order to have the 'https" in our web page, we need other things. If not, add "NODE_ENV" to that list and set it to "development".
    - Next vars will be if using S3 storage
        - AWS_ACCESS_KEY_ID (aws key id)
        - AWS_SECRET_ACCESS_KEY (aws access key)
        - AWS_S3_BUCKET (name of the aws bucket)
- Click "Save" and then "Create app/environment".

This will create an EC2 (virtual machine). Also a Security Group, and other things.

## `despliegue-aws-manual-mongo`

M5cloudmanualmongo-env.eba-9drrvb5v.eu-west-3.elasticbeanstalk.com

As previously showed, create a MongoDB Atlas Database.

Inside AWS:
- Search for "Elastic Beanstalk" and click it.
- Create a new Application.
- Write your desired Application name.
- Next lets import our source code:
    - Go to VSCode and create a new folder
    - Move "dist" folder content to this new folder.
    - Add the "public" folder.
    - Add the previously simplified "package.json" file.
    - Once everything is in place, compress these files into a .zip folder, called as you want.
- Upload this folder.
- Choose a version label.
- Click in "Configure more options".
- Go to "Software>Environment properties" and configure the same variables as in Heroku.
    - MONGODB_URI must be set to your mongoDB Atlas project's URI.
    - API_MOCK MUST be set to false.
    - In order to have the 'https" in our web page, we need other things. If not, add "NODE_ENV" to that list and set it to "development".
- Click "Save" and then "Create app/environment".

This will create an EC2 (virtual machine). Also a Security Group, and other things.

## `despliegue-aws-automatico`

M5cloudauto-env.eba-pzqw3gwe.eu-west-3.elasticbeanstalk.com

First, head out to aws, and go to "Elastic Beanstalk":
 - Create a new Environment (if it isn't already created).
 - Create a new Web App inside (if none).
    - Choose "Docker" as Platform.
    - In "Application code" choose your prefered option:
        - If chosen "Upload your code":
            - Erase "node_modules" folders.
            - Then Zip all back, front folders and Dockerfile and .dockerignore files.
    - Go to "More options" and:
        - Inside Software>Environment properties add:
            - NODE_ENV as development.
            - API_MOCK as false.
            - AUTH_SECRET as AUTH_SECRET.
            - AWS_ACCESS_KEY_ID as yourawsaccesskey.
            - AWS_SECRET_ACCESS_KEY as yourawssecretacesskey.
            - AWS_S3_BUCKET as yourawss3bucketname.
    - Now click "Create".
 - Create a new user by using IAM:
    - Attach "AdministratorAccess-AWSElasticBeanstalk" policies.
    - Save both access key and access key secret.
 - Go to your github's app repository>Settings>Secrets>Actions>New Repository Secrets:
    - Add AWS_DEPLOY_ACCESS_KEY_ID as yourawsaccesskey.
    - Add AWS_DEPLOY_SECRET_ACCESS_KEY as yourawssecretacesskey.
    - Add AWS_EB_APP_NAME as yourappnameinsideelasticbeanstalk.
    - Add AWS_EB_ENV_NAME as yourelasticbeanstalkenvironmentprojectsname.
    - Add AWS_REGION as yourappsregion.
    - Add AWS_DEPLOY_S3_BUCKET as yours3appdeploybucket.
 - You may need to change the port, go to Dockerfile:
    - Both before "ENV" variables.
    - Add: "EXPOSE 80"
    - Add: "ENV PORT=80"
 - Let's modify github's workflow:
    - Leave:
        name: Continuous Deployment Workflow
        on:
          push:
            branches:
              - main
        jobs:
            cd:
              runs-on: ubuntu-latest
              steps:
                - name: Checkout repository 
                  uses: actions/checkout@v3
    - Lets add:
        (Before "jobs")
        env:
            APP_VERSION_LABEL: ${{secrets.AWS_EB_APP_NAME}}-${{GITHUB_SHA}}-${{GITHUB_RUN_ATTEMPT}}

        (As steps inside jobs)
        - name: AWS login
           uses: aws-actions/configure-aws-credentials@v1
           with:
               aws-access-key-id: ${{secrets.AWS_DEPLOY_ACCESS_KEY_ID}}
               aws-secret-access-key: ${{secrets.AWS_DEPLOY_SECRET_ACCESS_KEY}}
               aws-region: ${{secrets.AWS_REGION}}
        - name: Upload files to s3
            run: |
                zip -r ${{env.APP_VERSION_LABEL}}.zip * .dockerignore
                aws s3 cp ${{env.APP_VERSION_LABEL}}.zip s3://${{secrets.AWS_DEPLOY_S3_BUCKET}}/${{env.APP_VERSION_LABEL}}.zip
        - name: Create EB App version
           run: aws elasticbeanstalk create-application-version --application-name ${{ secrets.AWS_EB_APP_NAME }} --version-label ${{ env.APP_VERSION_LABEL }} --source-bundle S3Bucket=${{ secrets.AWS_DEPLOY_S3_BUCKET }},S3Key=${{ env.APP_VERSION_LABEL }}.zip --no-auto-create-application
        - name: Update environment
          run: aws elasticbeanstalk update-environment --environment-name ${{ secrets.AWS_EB_ENV_NAME }} --version-label ${{ env.APP_VERSION_LABEL }}
