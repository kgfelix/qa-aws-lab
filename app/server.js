const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const app = express();
app.use(express.json());

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
 });

 app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
 });
 
app.post('/upload', async (req, res) => {
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: 'test-file.txt',
            Body: 'Hello, this is a test file uploaded to S3!'
        });
        await s3.send(command);
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

