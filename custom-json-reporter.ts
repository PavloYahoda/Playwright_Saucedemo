import { Reporter, TestCase, TestResult, Suite } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import { DateTime } from 'luxon';

class CustomJsonReporter implements Reporter {
    private results: any[] = [];
    private runStartTime: Date;
    private failedTests = 0;
    private skippedTests = 0;

    // Мапа для зберігання результатів по проекту
    private projectResults: { [key: string]: any[] } = {};

    // Київський часовий пояс
    private timeZone = 'Europe/Kiev';

    onBegin(config: any, suite: Suite) {
        this.runStartTime = new Date();
        console.log(`Test run started at ${this.formatTime(this.runStartTime)}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const testStartTime = new Date(result.startTime);
        const testEndTime = new Date(result.startTime.getTime() + result.duration);

        const status = result.status;

        // Отримання назви проекту з анотацій
        const projectNameAnnotation = test.annotations.find(a => a.type === 'projectName');
        const projectName = projectNameAnnotation?.description || 'unknown';

        if (status === 'failed') {
            this.failedTests++;
        } else if (status === 'skipped') {
            this.skippedTests++;
        }

        // Додаємо результат тесту в мапу по проекту
        if (!this.projectResults[projectName]) {
            this.projectResults[projectName] = [];
        }

        this.projectResults[projectName].push({
            description: test.parent?.title || 'No description',
            testName: test.title,
            startTime: this.formatTime(testStartTime),
            endTime: this.formatTime(testEndTime),
            status: status,
            project: projectName, // Назва проекту
        });
    }

    onEnd(result: any) {
        const runEndTime = new Date();
        const runStatus = result.status;

        // Створюємо репорти для кожного проекту
        for (const projectName in this.projectResults) {
            const projectTests = this.projectResults[projectName];
            const summary = {
                totalTests: projectTests.length,
                failedTests: this.failedTests,
                skippedTests: this.skippedTests,
                overallStatus: runStatus,
                startTime: this.formatTime(this.runStartTime),
                endTime: this.formatTime(runEndTime),
                tests: projectTests,
            };

            const resultsDir = path.resolve(process.cwd(), 'test-results');
            const filePath = path.join(resultsDir, `${projectName}-custom-report.json`);

            // Створення папки, якщо вона не існує
            if (!fs.existsSync(resultsDir)) {
                fs.mkdirSync(resultsDir, { recursive: true });
            }

            // Запис у файл
            fs.writeFileSync(filePath, JSON.stringify(summary, null, 2), 'utf-8');
            console.log(`Custom JSON report for project ${projectName} generated at ${filePath}`);
        }
    }

    // Форматуємо час у Київському часовому поясі
    private formatTime(date: Date): string {
        return DateTime.fromJSDate(date)
            .setZone(this.timeZone)  // Встановлюємо часовий пояс Київ
            .toFormat('dd/MM/yyyy HH:mm:ss');  // Форматуємо у потрібний формат
    }
}

export default CustomJsonReporter;