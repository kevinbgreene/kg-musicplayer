/* global module:false */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        datetime: Date.now(),

        sass: {

            build: {

                options: {
                    style: 'none' // Target options style: 'compressed'
                },

                files: {
                    'dist/css/style.css': 'dev/sass/musicplayer.scss'
                }
            }
        },

        uglify: {

            options: {
                mangle: false,
                beautify: true
            },

            build: {

                files: {

                    'dist/js/kg-musicplayer.<%= pkg.version %>.js': [

                        'dev/js/vendor/jquery/jquery.js',

                        'dev/js/core/main.js',
                        'dev/js/core/sniffer.js',
                        'dev/js/core/watcher.js',
                        'dev/js/core/Scope.js',
                        'dev/js/core/Eventer.js',
                        'dev/js/core/View.js',

                        'dev/js/app.js',

                        'dev/js/views/Song.js',
                        'dev/js/views/ProgressBar.js',
                        'dev/js/views/Genre.js',

                        'dev/js/utility/Audio.js'
                    ]
                }
            }
        },

        watch: {

            main: {
                files: ['dev/js/**/*.js', 'dev/sass/*.scss'],
                tasks: ['build'],
                options: {
                    nospawn: true,
                }
            },

            sass: {
                files: ['dev/sass/*.scss'],
                tasks: ['sass'],
                options: {
                    nospawn: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('build', ['sass', 'uglify:build']);
};