// 获取 gulp
var gulp = require('gulp');
var del = require('del');
// 获取 gulp-imagemin 模块
var imagemin = require('gulp-imagemin')
var curPath;
// 压缩图片任务
// 在命令行输入 gulp images 启动此任务
gulp.task('images', function () {
    // 1. 找到图片
    return gulp.src('temp/*.*')
    // 2. 压缩图片
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    // 3. 另存图片
    .pipe(gulp.dest('dist'))
});

gulp.task('clean',['singleimg'],function(){
    del([curPath]);
})

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    var watcher = gulp.watch('temp/*.*',['singleimg','clean']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        curPath = event.path;
        if (event.type === 'added') {
            gulp.task('singleimg',function(){
                return gulp.src(curPath)
                // 2. 压缩图片
                .pipe(imagemin([
                    imagemin.gifsicle({interlaced: true}),
                    imagemin.jpegtran({progressive: true}),
                    imagemin.optipng({optimizationLevel: 5}),
                    imagemin.svgo({
                        plugins: [
                            {removeViewBox: true},
                            {cleanupIDs: false}
                        ]
                    })
                ]))
                // 3. 另存图片
                .pipe(gulp.dest('dist'));
            });
        }
    });

});


// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 images 任务和 auto 任务
gulp.task('default', ['images', 'auto'])
