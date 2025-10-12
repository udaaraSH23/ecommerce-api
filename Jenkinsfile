pipeline {
    agent any

    environment {
        IMAGE_NAME = 'udaraweb/ecommerce-api' 
        IMAGE_TAG  = 'latest'
        K8S_NAMESPACE = 'ecommerce' 
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

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "Applying Kubernetes manifests..."
                    // Apply Deployment and Service
                    sh "kubectl apply -f k8s/deployment.yaml -n ${K8S_NAMESPACE}"
                    sh "kubectl apply -f k8s/service.yaml -n ${K8S_NAMESPACE}"
                    // Optional: Apply Ingress
                    sh "kubectl apply -f k8s/ingress.yaml -n ${K8S_NAMESPACE}"
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "Checking pod status..."
                    sh "kubectl get pods -n ${K8S_NAMESPACE}"
                    echo "Checking service status..."
                    sh "kubectl get svc -n ${K8S_NAMESPACE}"
                }
            }
        }
    }
}
