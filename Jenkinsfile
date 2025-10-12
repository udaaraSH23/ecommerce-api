pipeline {
    agent any

    environment {
        IMAGE_NAME = 'udaraweb/ecommerce-api' 
        IMAGE_TAG  = 'latest'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Pushing Docker image to Docker Hub..."
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-cred', // Jenkins credential ID
                        usernameVariable: 'DOCKER_USERNAME', 
                        passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                        sh "docker logout"
                    }
                }
            }
        }
    }
}
