import Signature from './signature'
import Policy from './policy'
import {
    xAmzDate,
    dateYMD
} from './utill'
import { IConfig } from './types';

class S3React {
    static upload(file: File, config: IConfig) {
        const fd = new FormData();
        const key = `${config.albumName ? config.albumName + '/' : ''}${config.fileName ? config.fileName : file.name}`;
        const url = `https://${config.bucketName}.s3.amazonaws.com/`
        fd.append('key', key);
        fd.append('acl', 'public-read');
        fd.append('Content-Type', file.type);
        fd.append('x-amz-meta-uuid', '14365123651274');
        fd.append('x-amz-server-side-encryption', 'AES256')
        fd.append('X-Amz-Credential', `${config.accessKeyId}/${dateYMD}/${config.region}/s3/aws4_request`);
        fd.append('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
        fd.append('X-Amz-Date', xAmzDate)
        fd.append('x-amz-meta-tag', '');
        fd.append('Policy', Policy.getPolicy(config))
        fd.append('X-Amz-Signature', Signature.getSignature(config, dateYMD, Policy.getPolicy(config)));
        fd.append("file", file);
        return new Promise(async (resolve, reject) => {
            const errorHandler = async (fn: Promise<any>) => {
                try {
                    const data = await fn;
                    return [null, data];
                } catch (err) {
                    return [err];
                }
            }
            const uploadResult = async () => {
                let err, result;
                [err, result] = await errorHandler(fetch(url, {
                    method: 'post',
                    body: fd
                }))
                if (err) reject(err)
                resolve({
                    bucket: config.bucketName,
                    key: `${config.albumName ? config.albumName + '/' : ''}${file.name}`,
                    location: `${url}${config.albumName ? config.albumName + '/' : ''}${file.name}`,
                    result: result
                })
            }
            uploadResult()
        })
    }
    static delete(config: IConfig) {
        const fd = new FormData();
        const url = `https://${config.bucketName}.s3.amazonaws.com/${config.albumName ? config.albumName + '/' : ''}${config.fileName}`
        fd.append('Date', xAmzDate)
        fd.append('X-Amz-Date', xAmzDate);
        fd.append('Authorization', Signature.getSignature(config, dateYMD, Policy.getPolicy(config)));
        fd.append('Content-Type', 'text/plain')
        return new Promise(async (resolve, reject) => {
            const errorHandler = async (fn: Promise<any>) => {
                try {
                    const data = await fn;
                    return [null, data];
                } catch (err) {
                    return [err];
                }
            }
            const deleteResult = async () => {
                let err, result;
                [err, result] = await errorHandler(fetch(url, {
                    method: 'delete',
                    body: fd
                }))
                if (err) reject(err)
                resolve({
                    ok: result.ok,
                    status: result.status,
                    message: 'File Deleted',
                    fileName: config.fileName
                })
            }
            deleteResult()
        })
    }
}
export default S3React
