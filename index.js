const inquirer = require('inquirer');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateQRCode() {
    try {
        const answers = await inquirer.default.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Digite o texto ou URL para gerar o QR Code:',
                validate: (input) => input.length > 0 || 'Por favor, digite algum texto!'
            },
            {
                type: 'list',
                name: 'format',
                message: 'Escolha o formato de saída:',
                choices: ['Terminal', 'Imagem PNG', 'Imagem SVG']
            },
            {
                type: 'input',
                name: 'filename',
                message: 'Nome do arquivo (sem extensão):',
                default: 'qrcode',
                when: (answers) => answers.format !== 'Terminal'
            }
        ]);

        const { text, format, filename } = answers;

        switch (format) {
            case 'Terminal':
                const terminalQR = await QRCode.toString(text, { type: 'terminal' });
                console.log('\nQR Code no Terminal:\n');
                console.log(terminalQR);
                break;

            case 'Imagem PNG':
                const pngPath = path.join(__dirname, `${filename}.png`);
                await QRCode.toFile(pngPath, text, {
                    type: 'png',
                    width: 500,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });
                console.log(`\n✅ QR Code salvo como: ${pngPath}`);
                break;

            case 'Imagem SVG':
                const svgPath = path.join(__dirname, `${filename}.svg`);
                await QRCode.toFile(svgPath, text, {
                    type: 'svg',
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });
                console.log(`\n✅ QR Code salvo como: ${svgPath}`);
                break;
        }

    } catch (error) {
        console.error('❌ Erro ao gerar QR Code:', error.message);
    }
}

async function main() {
    console.log('🚀 Gerador de QR Code com Node.js\n');
    
    while (true) {
        await generateQRCode();
        
        const { continueGenerating } = await inquirer.default.prompt([
            {
                type: 'confirm',
                name: 'continueGenerating',
                message: 'Deseja gerar outro QR Code?',
                default: true
            }
        ]);

        if (!continueGenerating) {
            console.log('👋 Até logo!');
            break;
        }
        
        console.clear();
        console.log('🚀 Gerador de QR Code com Node.js\n');
    }
}

// Executar o programa
main();
