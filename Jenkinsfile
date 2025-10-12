pipeline {
    agent any

    parameters {
        booleanParam(name: 'BUILD_IMAGE', defaultValue: true, description: 'Build Docker Image?')
        booleanParam(name: 'PUSH_IMAGE', defaultValue: true, description: 'Push Docker Image to Docker Hub?')
        booleanParam(name: 'DEPLOY_K8S', defaultValue: true, description: 'Deploy to Kubernetes?')
        booleanParam(name: 'VERIFY_DEPLOYMENT', defaultValue: true, description: 'Verify Deployment?')
    }

    environment {
        IMAGE_NAME = 'udaraweb/ecommerce-api'
        IMAGE_TAG = 'latest'
        K8S_NAMESPACE = 'ecommerce'
    }

    stages {
        stage('Build Docker Image') {
            when {
                expression { return params.BUILD_IMAGE }
            }
            steps {
                script {
                    echo "Building Docker image..."
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            when {
                expression { return params.PUSH_IMAGE }
            }
            steps {
                script {
                    echo "Pushing Docker image to Docker Hub..."
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-cred', 
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
            when {
                expression { return params.DEPLOY_K8S }
            }
            steps {
                script {
                    echo "Applying Kubernetes manifests..."
                    sh "kubectl apply -f kubernetes/deployment.yaml -n ${K8S_NAMESPACE}"
                    sh "kubectl apply -f kubernetes/service.yaml -n ${K8S_NAMESPACE}"
                    sh "kubectl apply -f kubernetes/ingress.yaml -n ${K8S_NAMESPACE}"
                }
            }
        }

        stage('Verify Deployment') {
            when {
                expression { return params.VERIFY_DEPLOYMENT }
            }
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
