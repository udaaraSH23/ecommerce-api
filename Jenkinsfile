pipeline {
    agent any
    environment {
        DOCKER_HOST = "tcp://localhost:2375"
    }
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker version'
                sh 'docker build -t my-app:latest .'
            }
        }
    }
}
