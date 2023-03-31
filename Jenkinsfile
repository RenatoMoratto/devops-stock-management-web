pipeline {
    agent any

    stages {
        stage('Fetch code') {
            steps {
                git branch: 'main', url: 'https://github.com/RenatoMoratto/devops-stock-management-web.git'
            }
        }

        stage('Build') {
            steps {
                sh 'yarn install'
            }
        }

        stage('Test') {
            steps {
                sh 'yarn coverage'
            }
        }

        stage('Analysis') {
            environment {
                scannerHome = tool 'sonar'
            }
            steps {
                withSonarQubeEnv('sonar') {
                sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=devops-stock-management-web \
                    -Dsonar.projectName=devops-stock-management-web \
                    -Dsonar.projectVersion=1.0
                '''
                }
            }
        }

        stage('Quality Gate') {
          steps {
            timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
            }
          }
        }

        stage('Build Docker image') {
            steps {
                script {
                docker.build('devops-stock-management-web:latest', '-f Dockerfile .')
                }
            }
        }
    }
}