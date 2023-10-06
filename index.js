const inquirer = require('inquirer');
const fs = require('fs');

class LogoGenerator {
  constructor() {
    this.shapeOptions = [
      {
        name: 'Square',
        value: this.generateSquare.bind(this),
      },
      {
        name: 'Triangle',
        value: this.generateTriangle.bind(this),
      },
      {
        name: 'Circle',
        value: this.generateCircle.bind(this),
      },
    ];
  }

  generateSquare(shapeColor, textColor, characters) {
    return `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="${shapeColor}" />
        <text x="150" y="100" font-size="60" text-anchor="middle" fill="${textColor}">${characters}</text>
      </svg>
    `;
  }

  generateTriangle(shapeColor, textColor, characters) {
    return `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="150,20 20,180 280,180" fill="${shapeColor}" />
        <text x="150" y="140" font-size="60" text-anchor="middle" fill="${textColor}">${characters}</text>
      </svg>
    `;
  }

  generateCircle(shapeColor, textColor, characters) {
    return `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="100" r="80" fill="${shapeColor}" />
        <text x="150" y="120" font-size="60" text-anchor="middle" fill="${textColor}">${characters}</text>
      </svg>
    `;
  }

  async promptUser() {
    try {
      const response = await inquirer.prompt([
        {
          type: 'list',
          message: 'Which shape would you like for your logo?',
          name: 'shape',
          choices: this.shapeOptions.map((option) => option.name),
        },
        {
          type: 'input',
          message: 'What color would you like for the shape?',
          name: 'shapeColor',
        },
        {
          type: 'input',
          message: 'What color would you like for the text?',
          name: 'textColor',
        },
        {
          type: 'input',
          message: 'What characters would you like to use?',
          name: 'characters',
        },
      ]);

      const selectedShape = this.shapeOptions.find((option) => option.name === response.shape);
      const logo = selectedShape.value(response.shapeColor, response.textColor, response.characters);

      fs.writeFileSync('logo.svg', logo);
      console.log('Logo generated successfully!');
    } catch (error) {
      console.error(error);
    }
  }
}

const logoGenerator = new LogoGenerator();
logoGenerator.promptUser();
