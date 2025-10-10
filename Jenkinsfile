pipeline {
    agent any

    environment {
        // Docker Hub credentials (optional) stored in Jenkins
        DOCKER_HUB_CREDENTIALS = 'docker-hub-creds'
        IMAGE_NAME = 'username/myapp'   // Replace with your Docker Hub repo
        IMAGE_TAG = 'latest'

        // Kubernetes context (for Minikube, make sure kubeconfig is configured)
        KUBE_CONFIG = '/home/jenkins/.kube/config'  // Adjust path if different
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub using credentials
                git branch: 'main',
                    url: 'https://github.com/username/repo.git',
                    credentialsId: 'github-pat'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS}", 
                                                      usernameVariable: 'DOCKER_USER', 
                                                      passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Apply Kubernetes deployment and service YAMLs
                    sh "kubectl --kubeconfig=${KUBE_CONFIG} apply -f k8s/deployment.yaml"
                    sh "kubectl --kubeconfig=${KUBE_CONFIG} apply -f k8s/service.yaml"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
