
function crc16(buffer) {
    let crc = 0xFFFF;
    for (let i = 0; i < buffer.length; i++) {
        crc ^= (buffer.charCodeAt(i) << 8);
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

function formatField(id, value) {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
}

export class PixPayload {
    constructor({ key, name, city, transactionId, amount }) {
        this.key = key;
        this.name = name;
        this.city = city;
        this.transactionId = transactionId || '***';
        this.amount = amount.toFixed(2);
    }

    generate() {
        const payload = [
            formatField('00', '01'), // Payload Format Indicator
            formatField('26', [ // Merchant Account Information
                formatField('00', 'BR.GOV.BCB.PIX'),
                formatField('01', this.key)
            ].join('')),
            formatField('52', '0000'), // Merchant Category Code
            formatField('53', '986'), // Transaction Currency (BRL)
            formatField('54', this.amount), // Transaction Amount
            formatField('58', 'BR'), // Country Code
            formatField('59', this.name), // Merchant Name
            formatField('60', this.city), // Merchant City
            formatField('62', [ // Additional Data Field Template
                formatField('05', this.transactionId)
            ].join(''))
        ].join('');

        const payloadWithCrcId = `${payload}6304`;
        const crc = crc16(payloadWithCrcId);
        return `${payloadWithCrcId}${crc}`;
    }
}
