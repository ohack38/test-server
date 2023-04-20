const { readUInt4 } = require('uint4');
const { Buffer } = require('node:buffer')

const parser = (body) => {
    try {
        const id = body.id
        const time = body.timestamp
        const type = body.type

        let buffer = Buffer.from(body.data, 'hex');

        const byteSize = Buffer.byteLength(buffer)

        if (byteSize == 10) {
            // MEASUREMENT
            const parsed = {
                'id': id,
                'mac': id,
                'firmware_version': readUInt4(buffer,0),
                'temperature': buffer.readInt16BE(1) / 10,
                'humidity': buffer.readUInt8(3),
                'pm1': buffer.readUInt16BE(4) / 10,
                'pm25': buffer.readUInt16BE(6) / 10,
                'pm10': buffer.readUInt16BE(8) / 10,
                'time': time,
                'type': type,
                'msg_type': 'measurement'
            }
            return parsed

        } else if(byteSize == 11) {
           // SYSTEM FUNCTION 1
            const parsed = {
                'id': id,
                'mac': id,
                'firmware_version': readUInt4(buffer,0),
                'msg1000': buffer.readUint8(1),
                'bat_voltage': buffer.readUInt8(2) / 50,
                'config': buffer.readBigUInt64BE(3),
                'time': time,
                'type': type,
                'msg_type': 'info'
            }
            return parsed

        } else if(byteSize == 5) {
           // SYSTEM FUNCTION 0
           const parsed = {
                'id': id,
                'mac': id,
                'firmware_version': readUInt4(buffer,0),
                'radio_zone': readUInt4(buffer,1),
                'hw_release': buffer.readUInt8(2),
                'device_type': buffer.readUInt8(3),
                'build': buffer.readUInt32BE(4),
                'time': time,
                'type': type,
                'msg_type': 'start'
            }
            return parsed 
        }

    } catch (error) {
        console.log(error)
    }
}
exports.parser = parser