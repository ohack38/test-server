const byteSize = str => new Blob([str]).size;

const parser = (data) => {

    const bytes = byteSize(data)

    console.log('Got hex', data, 'bytes: ', bytes)
    //https://help.tago.io/portal/en/community/topic/how-to-build-a-lorawan-sigfox-payload-parser


}
exports.parser = parser