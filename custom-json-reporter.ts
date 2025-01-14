import { Reporter, TestCase, TestResult, Suite } from '@playwright/test/reporter';
import * as fs from 'fs';

class CustomJsonReporter implements Reporter {
    private results: any[] = [];
    private runStartTime: Date;
    private failedTests = 0;
    private skippedTests = 0;

    onBegin(config, suite: Suite) {
        this.runStartTime = new Date();
        console.log(`Test run started at ${this.runStartTime}`);
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

        
        fs.writeFileSync('custom-report.json', JSON.stringify(summary, null, 2), 'utf-8');
        console.log(`Custom JSON report generated at custom-report.json`);
    }
}

export default CustomJsonReporter;

