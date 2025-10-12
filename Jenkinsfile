pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('udaraweb/ecommerce-api:latest')
                }
            }
        }
    }
}
