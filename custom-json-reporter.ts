import { Reporter, TestCase, TestResult, Suite } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class CustomJsonReporter implements Reporter {
    private results: any[] = [];
    private runStartTime: Date;
    private failedTests = 0;
    private skippedTests = 0;
    private projectName: string = 'unknown';

    onBegin(config, suite: Suite) {
        this.runStartTime = new Date();
        console.log(`Test run started at ${this.runStartTime}`);

        // Встановлюємо назву проекту з конфігурації Playwright
        if (config.projects && config.projects.length > 0) {
            this.projectName = config.projects[0].name;  // Отримуємо назву першого проекту
        }
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const testStartTime = new Date(result.startTime).toISOString();
        const testEndTime = new Date(result.startTime.getTime() + result.duration).toISOString();
        const status = result.status;

        if (status === 'failed') {
            this.failedTests++;
        } else if (status === 'skipped') {
            this.skippedTests++;
        }

        this.results.push({
            description: test.parent?.title || 'No description',
            testName: test.title,
            startTime: testStartTime,
            endTime: testEndTime,
            status: status,
            project: this.projectName,  // Додаємо інформацію про проект
        });
    }

    onEnd(result) {
        const runEndTime = new Date();
        const runStatus = result.status;

        const summary = {
            totalTests: this.results.length,
            failedTests: this.failedTests,
            skippedTests: this.skippedTests,
            overallStatus: runStatus,
            startTime: this.runStartTime.toISOString(),
            endTime: runEndTime.toISOString(),
            tests: this.results,
        };

        // Збірка результатів по кожному проекту
        const resultsDir = path.resolve(process.cwd(), 'test-results');
        
        // Для кожного проекту створюємо окремий файл
        const filePath = (projectName: string) => path.join(resultsDir, `${projectName}-custom-report.json`);

        // Логування для перевірки правильності шляху
        console.log(`Results directory: ${resultsDir}`);

        // Створення папки, якщо вона не існує
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }

        // Запис у файл для кожного проекту
        try {
            const projectFilePath = filePath(this.projectName);
            fs.writeFileSync(projectFilePath, JSON.stringify(summary, null, 2), 'utf-8');
            console.log(`Custom JSON report for project ${this.projectName} generated at ${projectFilePath}`);
        } catch (error) {
            console.error(`Error writing report for project ${this.projectName} to ${filePath(this.projectName)}`, error);
        }
    }
}

export default CustomJsonReporter;







// import { Reporter, TestCase, TestResult, Suite } from '@playwright/test/reporter';
// import * as fs from 'fs';
// import * as path from 'path';

// class CustomJsonReporter implements Reporter {
//     private results: any[] = [];
//     private runStartTime: Date;
//     private failedTests = 0;
//     private skippedTests = 0;

//     onBegin(config, suite: Suite) {
//         this.runStartTime = new Date();
//         console.log(`Test run started at ${this.runStartTime}`);
//     }

//     onTestEnd(test: TestCase, result: TestResult) {
//         const testStartTime = new Date(result.startTime).toISOString();
//         const testEndTime = new Date(result.startTime.getTime() + result.duration).toISOString();
//         const status = result.status;

//         if (status === 'failed') {
//             this.failedTests++;
//         } else if (status === 'skipped') {
//             this.skippedTests++;
//         }

//         this.results.push({
//             description: test.parent?.title || 'No description',
//             testName: test.title,
//             startTime: testStartTime,
//             endTime: testEndTime,
//             status: status,
//         });
//     }

//     onEnd(result) {
//         const runEndTime = new Date();
//         const runStatus = result.status;

//         const summary = {
//             totalTests: this.results.length,
//             failedTests: this.failedTests,
//             skippedTests: this.skippedTests,
//             overallStatus: runStatus,
//             startTime: this.runStartTime.toISOString(),
//             endTime: runEndTime.toISOString(),
//             tests: this.results,
//         };

//         // Замість того, щоб використовувати відносні шляхи, використовуємо абсолютний шлях
//         const resultsDir = path.resolve(process.cwd(), 'test-results');
//         const filePath = path.join(resultsDir, 'custom-report.json'); // Абсолютний шлях

//         // Логування для перевірки правильності шляху
//         console.log(`Results directory: ${resultsDir}`);
//         console.log(`File path: ${filePath}`);

//         // Створення папки, якщо вона не існує
//         if (!fs.existsSync(resultsDir)) {
//             fs.mkdirSync(resultsDir, { recursive: true });
//         }

//         // Запис у файл
//         try {
//             fs.writeFileSync(filePath, JSON.stringify(summary, null, 2), 'utf-8');
//             console.log(`Custom JSON report generated at ${filePath}`);
//         } catch (error) {
//             console.error(`Error writing report to ${filePath}`, error);
//         }
//     }
// }

// export default CustomJsonReporter;