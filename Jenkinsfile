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
                sh 'yarn'
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
                docker.build(appRegistry + ":$BUILD_NUMBER", '/Dockerfile')
                }
            }
        }

        stage('Push Image to ECR') {
            steps{
            script {
              docker.withRegistry( vprofileRegistry, registryCredential ) {
                dockerImage.push("$BUILD_NUMBER")
                dockerImage.push('latest')
              }
            }
          }
        }
    }
}

// pipeline {
//     agent any
//     environment {
//         registryCredential = 'ecr:us-east-2:awscreds'
//         appRegistry = "951401132355.dkr.ecr.us-east-2.amazonaws.com/vprofileappimg"
//         vprofileRegistry = "https://951401132355.dkr.ecr.us-east-2.amazonaws.com"
//         cluster = "vprofile"
//         service = "vprofileappsvc"
//     }
//   stages {
//     stage('Fetch code'){
//       steps {
//         git branch: 'docker', url: 'https://github.com/devopshydclub/vprofile-project.git'
//       }
//     }


//     stage('Test'){
//       steps {
//         sh 'mvn test'
//       }
//     }

//     stage ('CODE ANALYSIS WITH CHECKSTYLE'){
//             steps {
//                 sh 'mvn checkstyle:checkstyle'
//             }
//             post {
//                 success {
//                     echo 'Generated Analysis Result'
//                 }
//             }
//         }

//         stage('build && SonarQube analysis') {
//             environment {
//              scannerHome = tool 'sonar4.7'
//           }
//             steps {
//                 withSonarQubeEnv('sonar') {
//                  sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=vprofile \
//                    -Dsonar.projectName=vprofile-repo \
//                    -Dsonar.projectVersion=1.0 \
//                    -Dsonar.sources=src/ \
//                    -Dsonar.java.binaries=target/test-classes/com/visualpathit/account/controllerTest/ \
//                    -Dsonar.junit.reportsPath=target/surefire-reports/ \
//                    -Dsonar.jacoco.reportsPath=target/jacoco.exec \
//                    -Dsonar.java.checkstyle.reportPaths=target/checkstyle-result.xml'''
//                 }
//             }
//         }

//         stage("Quality Gate") {
//             steps {
//                 timeout(time: 1, unit: 'HOURS') {
//                     // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
//                     // true = set pipeline to UNSTABLE, false = don't
//                     waitForQualityGate abortPipeline: true
//                 }
//             }
//         }

//     stage('Build App Image') {
//        steps {
       
//          script {
//                 dockerImage = docker.build( appRegistry + ":$BUILD_NUMBER", "./Docker-files/app/multistage/")
//              }

//      }
    
//     }

//     stage('Upload App Image') {
//           steps{
//             script {
//               docker.withRegistry( vprofileRegistry, registryCredential ) {
//                 dockerImage.push("$BUILD_NUMBER")
//                 dockerImage.push('latest')
//               }
//             }
//           }
//      }
     
//      stage('Deploy to ecs') {
//           steps {
//         withAWS(credentials: 'awscreds', region: 'us-east-2') {
//           sh 'aws ecs update-service --cluster ${cluster} --service ${service} --force-new-deployment'
//         }
//       }
//      }

//   }
// }

// stage('Build App Image') {
//     steps {
//         script {
//             withCredentials([usernamePassword(credentialsId: 'ID_DA_CREDENCIAL', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
//                 dockerImage = docker.build(appRegistry + ":$BUILD_NUMBER", "./Docker-files/app/multistage/")
//                 docker.withRegistry(vprofileRegistry, registryCredential) {
//                     dockerImage.push("$BUILD_NUMBER")
//                     dockerImage.push('latest')
//                 }
//             }
//         }
//     }
// }