// Configurações do projeto QR Code

module.exports = {
    // Configurações padrão do QR Code
    qrCode: {
        width: 500,
        height: 500,
        margin: 1,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M' // L, M, Q, H
    },
    
    // Configurações de salvamento
    output: {
        directory: './output',
        formats: ['png', 'svg', 'terminal']
    },
    
    // Configurações da interface
    interface: {
        language: 'pt-BR',
        theme: 'default'
    }
};
