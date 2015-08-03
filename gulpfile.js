var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    var nodemonConfig = {
        script: 'src/app.js',
        ext: 'js',
        env:{
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    };

    nodemon(nodemonConfig)
        .on('restart', function(){
            console.log('restarting...');
        });
})