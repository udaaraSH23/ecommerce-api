pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "udaraweb/ecommerce-api:latest"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Pushing image to Docker Hub..."
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-cred') {
                        docker.image(DOCKER_IMAGE).push()
                    }
                }
            }
        }
    }
}
