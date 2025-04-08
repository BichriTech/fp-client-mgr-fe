const express = required('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist/client-mgr-fe')));

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname+'/dist/client-mgr-fe/index.html'));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});