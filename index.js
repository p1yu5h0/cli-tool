#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// console.log(chalk.bgCyan('Piyush Agrawal'));

let random, playerName;

const sleep = (ms=1000) => new Promise((r) => setTimeout(r,ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        "Welcome to Piyushs World \n"
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('PLAY HERE')}
        I am a process on your computer.
        If you get any question wrong, I will be ${chalk.bgRed('killed')}
        So try to get all the questions right...
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
    await sleep();

}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'My favourite actor \n',
        choices: [
            'Salman Khan',
            'Akshay Kumar',
            'ShahRukh Khan',
            'Hritik Roshan',
        ],
    });

    return handleAnswer(answers.question_1 == 'ShahRukh Khan');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'My best friend \n',
        choices: [
            'Aagat Choubey',
            'Amola Chouhan',
            'Nishant Sharma',
        ],
    });

    return handleAnswer(answers.question_2 == 'Amola Chouhan');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'My favourite actress \n',
        choices: [
            'Alia Bhatt',
            'Anushka Sharma',
            'Katrina Kaif',
            'Deepika Padukone',
        ],
    });

    return handleAnswer(answers.question_3 == 'Deepika Padukone');
}

async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking Answer...').start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `Nice Work ${playerName}. That's a legit answer`});
    } else {
        spinner.error({text: `Game over, you lose ${playerName}!`});
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congrats, ${playerName}!\n You Won $ 1 , 0 0 0 , 0 0 0`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome()
await askName();
await question1();
await question2();
await question3();
await winner();