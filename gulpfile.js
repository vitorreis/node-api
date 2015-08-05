var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha');

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

gulp.task('test', function(){
    gulp.src('src/tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
});