const shell = require('shelljs');

shell.exec('npm run test exercise.controller.test.ts');
shell.exec('npm run test justification.controller.test.ts');
shell.exec('npm run test relation.controller.test.ts');
shell.exec('npm run test solution.controller.test.ts');
shell.exec('npm run test unit.controller.test.ts');