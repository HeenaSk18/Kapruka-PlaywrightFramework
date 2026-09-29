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
                bat 'npm install'
                bat 'npx playwright install chrome'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true
            )
        }
    }
}