pipeline {
    environment{
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        APP_NAME = "benjaminucn/devops-taller-user-management"
        DOCKER_IMAGE = ''
    }
    agent any
    stages {
        stage('Test') {
            agent {
                docker {
                    image 'node:current-alpine'
                    args '-v .:/app -w /app'
                }
            }
            steps {
                sh 'rm -r -f node_modules; rm -r -f .npm_cache; mkdir .npm_cache'
                sh 'npm install --cache=.npm_cache; rm -r -f .npm_cache'
                sh 'npm run test'
            }
        }
        stage ('Build docker image'){
            steps{ 
                sh 'docker build -t $APP_NAME .'
                sh 'docker tag $APP_NAME $APP_NAME:$BUILD_NUMBER'
            }
        }
        stage('Login to dockerhub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Push image') {
            steps {
                sh 'docker push $APP_NAME'
                sh 'docker push $APP_NAME:$BUILD_NUMBER'
            }
        }
        stage ('Deploy to kubernetes'){
            steps{
                sh 'kubectl apply -f deployment.yaml'
            }
        }
    }
}