# AWS S3 React

S3React is package for uploading images to Amazon AWS S3

```
npm install --save s3-react
```


# Examples

## ***Uploading to S3***
```javascript
import S3React from 's3-react';

const config = {
    bucketName: 'myBucket',
    albumName: 'photos',
    fileName: 'me.png',
    region: 'eu-west-1',
    accessKeyId: 'JUSTSOME22RANDOM5EXAMPLEID',
    secretAccessKey: 'ms21eg20+uMxçduyUxYjDANOTHERRANDOMEXAMPLESECRET',
}

/*  Notice that if you don't provide an albumName, the file will be automatically uploaded to the root of your bucket */



S3React.upload(file, config)
.then((data) => console.log(data))
.catch((err) => console.error(err))


  /**
   * {
   *   Response: {
   *     bucket: "your-bucket-name",
   *     key: "photos/image.jpg",
   *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
   *   }
   * }
   */
});
```

## ***Deleting an existing file from your bucket***

In this case the file that we want to delete is in the folder 'photos'

```javascript
import S3React from 's3-react';

const config = {
    bucketName: 'myBucket',
    albumName: 'photos',
    fileName: "my-image.png",
    region: 'eu-west-1',
    accessKeyId: 'JUSTSOME22RANDOM5EXAMPLEID',
    secretAccessKey: 'ms21eg20+uMxçduyUxYjDANOTHERRANDOMEXAMPLESECRET',
}


/* If the file that you want to delete it's in your bucket's root folder, don't provide any albumName in the config object */

//In this case the file that we want to delete is in the folder 'photos' that we referred in the config object as the albumName

S3React.delete(config)
.then((response) => console.log(response))
.catch((err) => console.error(err))


  /**
   * {
   *   Response: {
   *      ok: true,
          status: 204,
          message: 'File deleted',
          fileName: 'my-image.png'
   *   }
   * }
   */
});
```

## ***S3 Bucket Policy***

Doc: http://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html

```
{
    "Version": "2024-02-28",
    "Id": "http referer policy example",
    "Statement": [
        {
            "Sid": "Allow all kind of http requests originating from http://www.your-website.com and https://www.your-website.com",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::myBucket/*",
            "Condition": {
                "StringLike": {
                    "aws:Referer": [
                        "https://www.your-website.com",
                        "http://www.your-website.com"
                    ]
                }
            }
        }
    ]
}
```



Defaults your bucket to `public-read` : http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html


`config`
  * `bucketName` **required** - Your S3 bucket
  * `albumName` **optional** - Your S3 folderName/albumName
  * `fileName` **optional** - Your S3 folderName/albumName/fileName
  * `region` **required** - Your S3 bucket's region
  * `accessKeyId` **required** - Your S3 `AccessKeyId`
  * `secretAccessKey` **required** - Your S3 `SecretAccessKey`

## License

MIT
    
Reference given to https://github.com/Fausto95/react-s3

## What's Changed ?
*  Converted to typescript
*  Addition of custom filename
*  Update of dependencies and removal of legacy deps
*  Clean up of stale code and types introduction
*  More to come..