pipeline {
    agent any

    environment {
        CI            = 'true'
        TEST_ENV      = 'qa'
        BASE_URL      = credentials('kapruka-base-url')
        TEST_EMAIL    = credentials('kapruka-test-email')
        TEST_PASSWORD = credentials('kapruka-test-password')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checked out by Jenkins'
            }
        }

        stage('Check Environment') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Tests and Generate Reports') {
            steps {
                bat 'npm run test:allure'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**, allure-results/**, allure-report/**, test-results/**',
                allowEmptyArchive: true
            )
        }
    }
}