pipeline {
    // agent {
    //     label 'Slave5'
    // }
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '${BRANCH_NAME}']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    gitTool: 'Git_Centos',
                    submoduleCfg: [],
                    userRemoteConfigs: [[
                        // credentialsId: '<git credentials>',
                        url: 'https://github.com/mateoortizcano/AngularPwa.git'
                    ]]
                ])
            }
        }
        stage('Install modules') {
            steps {
                sh '''
                cd ./pwaPrueba/
                npm install
                '''
            }
        }
        stage('Unit tests') {
            steps {
                sh '''
                ng test --code-coverage
                '''
            }
        }
        // stage('Sonar analysis') {
        //     steps {
        //         sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=co.com.ceiba.proteccion:perfilamiento.web.${BRANCH_NAME} -Dsonar.projectName=Proteccion-PerfilamientoWeb.${BRANCH_NAME} -Dproject.settings=./sonar-project.properties"
        //     }
        // }

        stage('Deployment: Development') {
            when {
                branch 'develop'
            }
            steps {
                withAwsCli(credentialsId: 'proteccion-development-credentials', defaultRegion: 'us-east-1']) {
                    //instalar comano jq en terminal jenkins
                    //estando en el directorio donde se encuentre el Jenkinsfile, obtener el distconfig con: aws cloudfront get-distribution-config --id <distribution-id> | jq -r '.DistributionConfig' > distconfig.json
                    sh '''
                    aws s3 cp ./dist/pwa/ s3://proteccion-web-profilling --recursive --acl public-read
                    '''
                    //No es necesario haceer redesplliegue de cloudfront, se actualiza al ver nuevs versión en s3
                    //etag=$(aws cloudfront get-distribution-config --id <distribution-id>  | jq -r '.ETag')
                    //aws cloudfront update-distribution --id <distribution-id> --distribution-config file://distconfig.json --if-match $etag
                }
                // mail(subject: '[Protección-Perfilamiento en web] Nueva versión (Develop)',
                //     body: 'Hay una nueva versión  en proceso de despliegue en ambiente Develop, en unos minutos podrá acceder a ella',
                //     to: 'mateo.ortiz@ceiba.com.co jose.sanchez@ceiba.com.co'
                // )
            }
        }
        stage('End to end tests') {
            steps {
                sh '''
                ng e2e
                '''
            }
        }
    }
    post {
        failure {
            // mail( 
            //     to: 'jose.sanchez@ceiba.com.co mateo.ortiz@ceiba.com.co' ,
            //     body: "Build failed in Jenkins: Project: ${env.JOB_NAME} Build \n Number: ${env.BUILD_NUMBER} \n Please go to ${env.BUILD_URL} and verify the build",
            //     subject: "ERROR CI: Project name → ${env.JOB_NAME}"
            // )
        }
    }
}
